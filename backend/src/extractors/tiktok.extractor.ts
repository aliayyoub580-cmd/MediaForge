import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import { extractYtDlpMetadata } from '../utils/ytdlp';
import axios from 'axios';

export class TikTokExtractor implements IExtractor {
  platform: Platform = 'tiktok';

  canHandle(url: string): boolean {
    return /tiktok\.com/i.test(url);
  }

  async resolve(url: string): Promise<ExtractorResult> {
    try {
      // 1. Try yt-dlp metadata first for full info
      const ytdlpMeta = await extractYtDlpMetadata(url, 10000);
      if (ytdlpMeta) {
        return {
          success: true,
          data: {
            platform: this.platform,
            originalUrl: url,
            title: ytdlpMeta.title,
            author: ytdlpMeta.author,
            thumbnail: ytdlpMeta.thumbnail,
            hdThumbnail: ytdlpMeta.thumbnail,
            duration: ytdlpMeta.duration,
            formats: ytdlpMeta.formats,
            audioUrl: ytdlpMeta.audioUrl || url,
          },
        };
      }

      // 2. Fallback to oEmbed if yt-dlp is slow/unavailable
      let resolvedUrl = url;
      if (url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com')) {
        try {
          const resp = await axios.get(url, { maxRedirects: 5, timeout: 5000 });
          resolvedUrl = resp.request.res?.responseUrl || url;
        } catch {
          resolvedUrl = url;
        }
      }

      const noembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(resolvedUrl)}`;
      const { data: oembed } = await axios.get(noembedUrl, { timeout: 6000 });

      const thumbnail = oembed.thumbnail_url || '';
      const formats = [
        { quality: 'HD', format: 'mp4', url: resolvedUrl, hasAudio: true, hasVideo: true },
        { quality: 'SD', format: 'mp4', url: resolvedUrl, hasAudio: true, hasVideo: true },
      ];

      return {
        success: true,
        data: {
          platform: this.platform,
          originalUrl: url,
          title: oembed.title || `TikTok by @${oembed.author_name}`,
          author: oembed.author_name || 'TikTok User',
          thumbnail,
          hdThumbnail: thumbnail,
          formats,
          audioUrl: resolvedUrl,
        },
      };
    } catch (err: unknown) {
      logger.error('TikTok extractor error', err);
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract TikTok video' } };
    }
  }
}
