import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import axios from 'axios';
import { processDownloadRequest, getDownloadHistory } from '../services/download.service';
import { generateQRCode } from '../services/qr.service';
import { hashIp } from '../utils/hash';
import { validate } from '../middleware/validate';
import { createError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { mkdtemp, readdir, rm } from 'fs/promises';
import os from 'os';
import path from 'path';
import ffmpegStatic from 'ffmpeg-static';

export const downloadValidation = [
  body('url').isURL({ require_protocol: true }).withMessage('Please provide a valid URL'),
  validate,
];

export async function handleDownload(req: Request, res: Response, next: NextFunction) {
  try {
    const { url } = req.body;
    const rawIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.ip || '0.0.0.0';
    const result = await processDownloadRequest(url.trim(), rawIp);

    if (!result.success) {
      const statusMap: Record<string, number> = {
        invalid_url: 400, unsupported: 400, private: 403,
        age_restricted: 403, deleted: 404, rate_limited: 429, youtube_unavailable: 503, extraction_failed: 500,
      };
      const status = statusMap[result.error.type] || 500;
      res.status(status).json({ success: false, error: result.error });
      return;
    }

    res.json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
}

/**
 * Downloads supported media with yt-dlp and returns a local attachment.
 */
export async function streamMediaDownload(req: Request, res: Response, next: NextFunction) {
  let tempDirectory: string | undefined;

  try {
    const url = typeof req.query.url === 'string' ? req.query.url : '';
    const requestedQuality = typeof req.query.quality === 'string' ? req.query.quality : undefined;
    const kind = req.query.kind === 'audio' || req.query.kind === 'thumbnail'
      ? req.query.kind
      : 'video';
    if (!url) {
      res.status(400).json({ success: false, error: { message: 'A valid supported video URL is required' } });
      return;
    }
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      res.status(400).json({ success: false, error: { message: 'A valid supported video URL is required' } });
      return;
    }
    const hostname = parsedUrl.hostname.toLowerCase();
    const isYouTube = /(^|\.)youtube\.com$/.test(hostname) || hostname === 'youtu.be';
    if (isYouTube) {
      res.status(503).json({ success: false, error: { code: 'YOUTUBE_UNAVAILABLE', message: 'YouTube downloads are not available yet.' } });
      return;
    }
    const isSupported = [
      'tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com',
      'instagram.com', 'facebook.com', 'fb.watch',
    ].some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));

    if (!isSupported) {
      res.status(400).json({ success: false, error: { message: 'A valid supported video URL is required' } });
      return;
    }

    const requestedHeight = Number.parseInt(requestedQuality || '', 10);
    const qualityLabel = requestedQuality?.toUpperCase();
    const height = qualityLabel === 'HD'
      ? 4320 // TikTok's generic "HD" option means the highest source quality.
      : qualityLabel === 'SD'
        ? 480
        : Number.isFinite(requestedHeight) && requestedHeight >= 144 && requestedHeight <= 4320
          ? requestedHeight
          : 1080;
    const localBinary = path.resolve(process.cwd(), 'bin', process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');
    const usePythonModule = !process.env.YTDLP_PATH && process.platform !== 'win32' && !existsSync(localBinary);
    const binary = process.env.YTDLP_PATH || (existsSync(localBinary) ? localBinary : 'python3');
    const binaryArgs = usePythonModule ? ['-m', 'yt_dlp'] : [];
    const localFfmpeg = path.resolve(process.cwd(), 'bin', process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg');
    // The container image installs FFmpeg at /usr/bin/ffmpeg. Do not point
    // yt-dlp to ffmpeg-static on Linux: that optional npm binary may not be
    // present in a production install and prevents yt-dlp from finding the
    // system FFmpeg. ffmpeg-static remains the Windows development fallback.
    const ffmpegBinary = process.env.FFMPEG_PATH
      || (existsSync(localFfmpeg) ? localFfmpeg : process.platform === 'win32' ? ffmpegStatic : null);
    tempDirectory = await mkdtemp(path.join(os.tmpdir(), 'mediaforge-'));
    // yt-dlp sanitizes the title for the current filesystem. Keeping it in
    // the output template also makes Express send that title as the browser
    // attachment name instead of the generic "media.mp4".
    const outputTemplate = path.join(tempDirectory, '%(title).200B.%(ext)s');
    const formatSelector = kind === 'audio'
      ? 'bestaudio[ext=m4a]/bestaudio'
      : kind === 'thumbnail'
        ? 'best'
      : `bv*[height<=${height}][ext=mp4]+ba[ext=m4a]/b[height<=${height}][ext=mp4]/b[height<=${height}]`;
    const ffmpegArgs = [
      ...(ffmpegBinary ? ['--ffmpeg-location', path.dirname(ffmpegBinary)] : []),
      ...(kind === 'video' ? ['--merge-output-format', 'mp4'] : []),
    ];

    const runYtDlp = (format: string) => new Promise<void>((resolve, reject) => {
      const child = spawn(binary, [
        ...binaryArgs,
        '--no-playlist', '--no-progress', '--no-warnings',
        ...(kind === 'thumbnail' ? ['--skip-download', '--write-thumbnail', '--convert-thumbnails', 'jpg'] : []),
        '--format', format,
        ...ffmpegArgs,
        '--output', outputTemplate,
        url,
      ]);
      let output = '';
      child.stdout.on('data', (chunk: Buffer) => { output += chunk.toString(); });
      child.stderr.on('data', (chunk: Buffer) => { output += chunk.toString(); });
      child.on('error', (error) => reject(error));
      child.on('close', (code) => code === 0 ? resolve() : reject(new Error(output.slice(-4000) || `yt-dlp exited with code ${code}`)));
    });

    await runYtDlp(formatSelector);
    const files = await readdir(tempDirectory);
    const downloadedFile = files.find((file) => kind === 'audio'
      ? /\.(mp3|m4a|opus|webm)$/i.test(file)
      : kind === 'thumbnail'
        ? /\.(jpg|jpeg|png|webp)$/i.test(file)
      : /\.(mp4|mkv|webm)$/i.test(file));
    if (!downloadedFile) throw new Error('yt-dlp did not produce a video file');

    const filePath = path.join(tempDirectory, downloadedFile);
    const cleanup = () => tempDirectory && rm(tempDirectory, { recursive: true, force: true }).catch(() => undefined);
    res.on('finish', cleanup);
    res.on('close', cleanup);
    res.setHeader('Cache-Control', 'no-store');
    res.download(filePath, downloadedFile);
  } catch (err) {
    if (tempDirectory) rm(tempDirectory, { recursive: true, force: true }).catch(() => undefined);
    logger.error(`Media download failed: ${err instanceof Error ? err.message : String(err)}`);
    next(createError(
      'The source video could not be downloaded in the selected format. Please try another quality or video.',
      422,
      'DOWNLOAD_FAILED'
    ));
  }
}

export async function handleHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const rawIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.ip || '0.0.0.0';
    const hashedIp = hashIp(rawIp);
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);
    const result = await getDownloadHistory(hashedIp, page, limit);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function handleQRCode(req: Request, res: Response, next: NextFunction) {
  try {
    const { url } = req.body;
    if (!url) { res.status(400).json({ success: false, error: { message: 'URL required' } }); return; }
    const qr = await generateQRCode(url);
    res.json({ success: true, data: { qrCode: qr } });
  } catch (err) {
    next(err);
  }
}

export async function handleProxyImage(req: Request, res: Response) {
  try {
    const imageUrl = typeof req.query.url === 'string' ? req.query.url : '';
    if (!imageUrl) {
      res.status(400).send('Image URL required');
      return;
    }
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      timeout: 10000,
    });
    const rawType = response.headers['content-type'];
    const contentType = typeof rawType === 'string' ? rawType : 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(response.data));
  } catch (err) {
    logger.warn(`Image proxy failed for ${req.query.url}: ${err instanceof Error ? err.message : String(err)}`);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-store');
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" fill="none">
      <rect width="640" height="360" fill="#0f172a"/>
      <path d="M320 140 L360 210 L280 210 Z" fill="#6366f1"/>
      <circle cx="320" cy="180" r="40" stroke="#818cf8" stroke-width="4" fill="none"/>
    </svg>`);
  }
}
