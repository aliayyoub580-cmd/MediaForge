import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import axios from 'axios';

export class TikTokExtractor implements IExtractor {
  platform: Platform = 'tiktok';

  canHandle(url: string): boolean {
    return /tiktok\.com/.test(url);
  }

  async resolve(url: string): Promise<ExtractorResult> {
    try {
      // Resolve short URLs first
      let resolvedUrl = url;
      if (url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com')) {
        try {
          const resp = await axios.get(url, { maxRedirects: 5, timeout: 8000 });
          resolvedUrl = resp.request.res?.responseUrl || url;
        } catch {
          resolvedUrl = url;
        }
      }

      // Use noembed for metadata
      const noembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(resolvedUrl)}`;
      const { data: oembed } = await axios.get(noembedUrl, { timeout: 8000 });

      const thumbnail = oembed.thumbnail_url || '';
      const videoIdMatch = resolvedUrl.match(/video\/(\d+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';

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
          author: oembed.author_name || 'Unknown',
          thumbnail,
          hdThumbnail: thumbnail,
          duration: undefined,
          formats,
          audioUrl: resolvedUrl,
        },
      };
    } catch (err: unknown) {
      logger.error('TikTok extractor error', err);
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr?.response?.status === 404) {
        return { success: false, error: { type: 'deleted', message: 'TikTok video not found' } };
      }
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract TikTok video' } };
    }
  }
}
