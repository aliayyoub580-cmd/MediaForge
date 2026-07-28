import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { logger } from './logger';

export interface YtDlpFormatOption {
  quality: string;
  format: string;
  url: string;
  hasAudio: boolean;
  hasVideo: boolean;
  fileSize?: number;
}

export interface YtDlpMetadata {
  title: string;
  author: string;
  thumbnail: string;
  duration?: number;
  formats: YtDlpFormatOption[];
  audioUrl?: string;
}

export async function extractYtDlpMetadata(url: string, timeoutMs = 12000): Promise<YtDlpMetadata | null> {
  return new Promise((resolve) => {
    try {
      const localBinary = path.resolve(process.cwd(), 'bin', process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp');
      const usePythonModule = !process.env.YTDLP_PATH && process.platform !== 'win32' && !existsSync(localBinary);
      const binary = process.env.YTDLP_PATH || (existsSync(localBinary) ? localBinary : 'python3');
      const binaryArgs = usePythonModule ? ['-m', 'yt_dlp'] : [];

      const child = spawn(
        binary,
        [...binaryArgs, '--dump-json', '--no-playlist', '--no-warnings', '--skip-download', url],
        { timeout: timeoutMs }
      );

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString(); });
      child.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });

      child.on('error', (err) => {
        logger.debug(`yt-dlp spawn error: ${err.message}`);
        resolve(null);
      });

      child.on('close', (code) => {
        if (code !== 0 || !stdout.trim()) {
          logger.debug(`yt-dlp exited with code ${code}: ${stderr.slice(-300)}`);
          resolve(null);
          return;
        }

        try {
          const rawJson = JSON.parse(stdout);
          const title = rawJson.title || rawJson.fulltitle || 'Social Video';
          const author = rawJson.uploader || rawJson.creator || rawJson.channel || rawJson.uploader_id || 'Creator';
          const thumbnail = rawJson.thumbnail || (rawJson.thumbnails && rawJson.thumbnails[0]?.url) || '';
          const duration = typeof rawJson.duration === 'number' ? Math.round(rawJson.duration) : undefined;

          // Parse formats
          const formats: YtDlpFormatOption[] = [];
          if (Array.isArray(rawJson.formats) && rawJson.formats.length > 0) {
            const videoFormats = rawJson.formats.filter((f: { vcodec?: string; height?: number }) =>
              f.vcodec && f.vcodec !== 'none'
            );

            // High quality format
            const hdFormat = videoFormats.find((f: { height?: number }) => (f.height || 0) >= 1080)
              || videoFormats[videoFormats.length - 1];
            if (hdFormat) {
              formats.push({
                quality: hdFormat.height ? `${hdFormat.height}p HD` : 'HD',
                format: hdFormat.ext || 'mp4',
                url,
                hasAudio: true,
                hasVideo: true,
                fileSize: hdFormat.filesize || hdFormat.filesize_approx,
              });
            }

            // Standard quality format
            const sdFormat = videoFormats.find((f: { height?: number }) => (f.height || 0) <= 720 && (f.height || 0) >= 480)
              || videoFormats[0];
            if (sdFormat && sdFormat !== hdFormat) {
              formats.push({
                quality: sdFormat.height ? `${sdFormat.height}p SD` : 'SD',
                format: sdFormat.ext || 'mp4',
                url,
                hasAudio: true,
                hasVideo: true,
                fileSize: sdFormat.filesize || sdFormat.filesize_approx,
              });
            }
          }

          if (formats.length === 0) {
            formats.push(
              { quality: 'HD', format: 'mp4', url, hasAudio: true, hasVideo: true },
              { quality: 'SD', format: 'mp4', url, hasAudio: true, hasVideo: true }
            );
          }

          resolve({
            title,
            author,
            thumbnail,
            duration,
            formats,
            audioUrl: url,
          });
        } catch (parseErr) {
          logger.debug(`yt-dlp JSON parse failed: ${String(parseErr)}`);
          resolve(null);
        }
      });
    } catch (err) {
      logger.debug(`extractYtDlpMetadata error: ${String(err)}`);
      resolve(null);
    }
  });
}
