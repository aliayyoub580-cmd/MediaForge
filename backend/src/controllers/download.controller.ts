import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
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
        age_restricted: 403, deleted: 404, rate_limited: 429, extraction_failed: 500,
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
 * Downloads with yt-dlp and returns a local attachment. The browser ignores the
 * `download` attribute for cross-origin YouTube watch pages, which is why the
 * old buttons opened the platform instead of saving a file.
 */
export async function streamMediaDownload(req: Request, res: Response, next: NextFunction) {
  let tempDirectory: string | undefined;

  try {
    const url = typeof req.query.url === 'string' ? req.query.url : '';
    const requestedQuality = typeof req.query.quality === 'string' ? req.query.quality : undefined;
    const kind = req.query.kind === 'audio' ? 'audio' : 'video';
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
    const isSupported = [
      'youtube.com', 'youtu.be',
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
    const outputTemplate = path.join(tempDirectory, 'media.%(ext)s');
    const formatSelector = kind === 'audio'
      ? 'bestaudio[ext=m4a]/bestaudio'
      : `bv*[height<=${height}][ext=mp4]+ba[ext=m4a]/b[height<=${height}][ext=mp4]/b[height<=${height}]`;
    const ffmpegArgs = kind === 'video'
      ? [
          ...(ffmpegBinary ? ['--ffmpeg-location', path.dirname(ffmpegBinary)] : []),
          '--merge-output-format', 'mp4',
        ]
      : [];

    const runYtDlp = (format: string, extractorArgs: string[] = []) => new Promise<void>((resolve, reject) => {
      const child = spawn(binary, [
        ...binaryArgs,
        '--no-playlist', '--no-progress', '--no-warnings',
        // YouTube uses JavaScript challenges for format URLs. Node is already
        // present in the container image and is a supported yt-dlp runtime.
        '--js-runtimes', 'node',
        ...extractorArgs,
        '--format', format,
        ...ffmpegArgs,
        '--output', outputTemplate,
        url,
      ]);
      let stderr = '';
      child.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });
      child.on('error', (error) => reject(error));
      child.on('close', (code) => code === 0 ? resolve() : reject(new Error(stderr || `yt-dlp exited with code ${code}`)));
    });

    const youtubeExtractorArgs = isYouTube
      ? [
          // Include token-protected formats so the provider below can attach
          // the per-video token instead of yt-dlp discarding them up front.
          '--extractor-args', 'youtube:player_client=mweb;formats=missing_pot;pot_trace=true',
          // The production image runs the bgutil HTTP provider locally. It
          // creates a per-video Proof-of-Origin token for mweb requests.
          // Without it, YouTube often exposes only storyboard images from
          // cloud IPs.
          '--extractor-args', 'youtubepot-bgutilhttp:base_url=http://127.0.0.1:4416',
        ]
      : [];

    try {
      await runYtDlp(formatSelector, youtubeExtractorArgs);
    } catch (primaryError) {
      if (!isYouTube || kind !== 'video') throw primaryError;

      // Some public videos have an HLS-only fallback. Preserve the requested
      // maximum height instead of silently returning a lower-quality file.
      const hlsSelector = `best[protocol=m3u8_native][height<=${height}]/best[protocol=m3u8_native]/best[height<=${height}]`;
      logger.warn('Primary YouTube format failed; retrying with web_safari HLS');
      await runYtDlp(hlsSelector, ['--extractor-args', 'youtube:player_client=web_safari']);
    }
    const files = await readdir(tempDirectory);
    const downloadedFile = files.find((file) => kind === 'audio'
      ? /\.(mp3|m4a|opus|webm)$/i.test(file)
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
    logger.error('Media download failed', err instanceof Error ? err.message : String(err));
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
