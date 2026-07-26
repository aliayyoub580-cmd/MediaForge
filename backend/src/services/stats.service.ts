import { prisma } from '../database/prisma';
import { cacheGet, cacheSet } from '../utils/cache';
import { logger } from '../utils/logger';

export async function getAggregateStats() {
  const cacheKey = 'stats:aggregate';
  const cached = await cacheGet<object>(cacheKey);
  if (cached) return cached;

  const stats = {
    totalDownloads: 0,
    platformBreakdown: { tiktok: 0, youtube: 0, instagram: 0, facebook: 0 },
    recentDownloads: [] as unknown[],
    supportedPlatforms: 4,
    uptime: process.uptime(),
  };

  try {
    const [totals, platformBreakdown, recentHistory] = await Promise.all([
      prisma.siteStats.aggregate({ _sum: { totalDownloads: true } }),
      prisma.siteStats.aggregate({
        _sum: {
          tiktokDownloads: true,
          youtubeDownloads: true,
          instagramDownloads: true,
          facebookDownloads: true,
        },
      }),
      prisma.downloadHistory.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { id: true, platform: true, title: true, thumbnail: true, createdAt: true, author: true },
      }),
    ]);

    stats.totalDownloads = totals._sum.totalDownloads || 0;
    stats.platformBreakdown = {
      tiktok: platformBreakdown._sum.tiktokDownloads || 0,
      youtube: platformBreakdown._sum.youtubeDownloads || 0,
      instagram: platformBreakdown._sum.instagramDownloads || 0,
      facebook: platformBreakdown._sum.facebookDownloads || 0,
    };
    stats.recentDownloads = recentHistory;

    await cacheSet(cacheKey, stats, 60);
  } catch (err) {
    logger.warn('Stats DB query failed — returning empty stats', err instanceof Error ? err.message : '');
  }

  return stats;
}

export async function getDailyStats(days = 30) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);
    return await prisma.siteStats.findMany({
      where: { date: { gte: since } },
      orderBy: { date: 'asc' },
    });
  } catch {
    return [];
  }
}
