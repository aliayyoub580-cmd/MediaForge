import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import axios from 'axios';

export class FacebookExtractor implements IExtractor {
  platform: Platform = 'facebook';

  canHandle(url: string): boolean {
    return /(?:facebook\.com|fb\.watch)/.test(url);
  }

  async resolve(url: string): Promise<ExtractorResult> {
    try {
      // Resolve fb.watch short URLs
      let resolvedUrl = url;
      if (url.includes('fb.watch')) {
        try {
          const resp = await axios.get(url, { maxRedirects: 5, timeout: 8000 });
          resolvedUrl = resp.request.res?.responseUrl || url;
        } catch {
          resolvedUrl = url;
        }
      }

      // Extract video ID from URL
      const videoIdMatch = resolvedUrl.match(/videos\/(\d+)/) || resolvedUrl.match(/v=(\d+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';

      // Try oEmbed for metadata
      let title = 'Facebook Video';
      let author = 'Facebook User';
      let thumbnail = '';

      try {
        const { data } = await axios.get(
          `https://graph.facebook.com/v18.0/oembed_video?url=${encodeURIComponent(resolvedUrl)}&format=json`,
          { timeout: 8000 }
        );
        title = data.title || title;
        author = data.author_name || author;
        thumbnail = data.thumbnail_url || '';
      } catch {
        // oEmbed may require access token — use fallback
      }

      const formats = [
        { quality: 'HD', format: 'mp4', url: resolvedUrl, hasAudio: true, hasVideo: true },
        { quality: 'SD', format: 'mp4', url: resolvedUrl, hasAudio: true, hasVideo: true },
      ];

      return {
        success: true,
        data: {
          platform: this.platform,
          originalUrl: url,
          title,
          author,
          thumbnail,
          hdThumbnail: thumbnail,
          formats,
          audioUrl: resolvedUrl,
        },
      };
    } catch (err: unknown) {
      logger.error('Facebook extractor error', err);
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr?.response?.status === 404) {
        return { success: false, error: { type: 'deleted', message: 'Facebook video not found' } };
      }
      if (axiosErr?.response?.status === 403) {
        return { success: false, error: { type: 'private', message: 'This Facebook video is private' } };
      }
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract Facebook video' } };
    }
  }
}
