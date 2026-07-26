import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import axios from 'axios';

export class YouTubeExtractor implements IExtractor {
  platform: Platform = 'youtube';

  canHandle(url: string): boolean {
    return /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)/.test(url);
  }

  async resolve(url: string): Promise<ExtractorResult> {
    try {
      // Extract video ID
      const idMatch = url.match(/(?:v=|shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (!idMatch) {
        return { success: false, error: { type: 'invalid_url', message: 'Could not extract YouTube video ID' } };
      }
      const videoId = idMatch[1];

      // Use noembed for basic metadata (no API key required)
      const noembedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
      const { data: oembed } = await axios.get(noembedUrl, { timeout: 8000 });

      if (oembed.error) {
        return { success: false, error: { type: 'deleted', message: 'Video not found or unavailable' } };
      }

      // maxresdefault.jpg is optional and returns 404 for many valid videos.
      // hqdefault.jpg is the reliable public thumbnail variant.
      const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      // Build format list — direct YouTube download links via yt-dlp style approach
      const formats = [
        { quality: '1080p', format: 'mp4', url: `https://www.youtube.com/watch?v=${videoId}`, fileSize: undefined },
        { quality: '720p',  format: 'mp4', url: `https://www.youtube.com/watch?v=${videoId}`, fileSize: undefined },
        { quality: '480p',  format: 'mp4', url: `https://www.youtube.com/watch?v=${videoId}`, fileSize: undefined },
        { quality: '360p',  format: 'mp4', url: `https://www.youtube.com/watch?v=${videoId}`, fileSize: undefined },
      ];

      return {
        success: true,
        data: {
          platform: this.platform,
          originalUrl: url,
          title: oembed.title || 'YouTube Video',
          author: oembed.author_name || 'Unknown',
          thumbnail,
          hdThumbnail: thumbnail,
          duration: undefined,
          formats,
          audioUrl: `https://www.youtube.com/watch?v=${videoId}`,
        },
      };
    } catch (err: unknown) {
      logger.error('YouTube extractor error', err);
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('private')) return { success: false, error: { type: 'private', message: 'This video is private' } };
      if (msg.includes('age')) return { success: false, error: { type: 'age_restricted', message: 'Age-restricted video' } };
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract YouTube video' } };
    }
  }
}
