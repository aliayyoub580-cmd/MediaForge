import { prisma } from '../database/prisma';
import { cacheGet, cacheSet } from '../utils/cache';
import { hashIp, hashUrl } from '../utils/hash';
import { resolveMedia } from '../extractors/detector';
import { ExtractorResult, MediaMetadata } from '../types';
import { logger } from '../utils/logger';

const CACHE_TTL = 300; // 5 minutes

export async function processDownloadRequest(
  url: string,
  rawIp: string
): Promise<ExtractorResult> {
  const urlHash = hashUrl(url);
  const cacheKey = `media:${urlHash}`;

  // Check cache first
  const cached = await cacheGet<ExtractorResult>(cacheKey);
  if (cached) {
    logger.debug(`Cache hit for ${urlHash}`);
    return cached;
  }

  // Resolve from extractor
  const result = await resolveMedia(url);

  // Cache successful results and log history (fire-and-forget)
  if (result.success) {
    await cacheSet(cacheKey, result, CACHE_TTL);
    const hashedIp = hashIp(rawIp);
    logDownloadHistory(hashedIp, result.data).catch((e) =>
      logger.debug('History log skipped — DB unavailable: ' + (e as Error).message)
    );
  }

  return result;
}

async function logDownloadHistory(hashedIp: string, data: MediaMetadata) {
  await prisma.downloadHistory.create({
    data: {
      hashedIp,
      platform: data.platform,
      originalUrl: data.originalUrl,
      title: data.title,
      thumbnail: data.thumbnail,
      author: data.author,
      duration: data.duration,
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const platformField = `${data.platform}Downloads` as
    | 'tiktokDownloads'
    | 'youtubeDownloads'
    | 'instagramDownloads'
    | 'facebookDownloads';

  await prisma.siteStats.upsert({
    where: { date: today },
    create: { date: today, totalDownloads: 1, [platformField]: 1 },
    update: { totalDownloads: { increment: 1 }, [platformField]: { increment: 1 } },
  });
}

export async function getDownloadHistory(hashedIp: string, page = 1, limit = 20) {
  try {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.downloadHistory.findMany({
        where: { hashedIp },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.downloadHistory.count({ where: { hashedIp } }),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  } catch {
    return { items: [], total: 0, page, limit, pages: 0 };
  }
}
