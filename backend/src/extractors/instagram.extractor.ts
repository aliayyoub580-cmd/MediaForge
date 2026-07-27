import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import axios from 'axios';

export class InstagramExtractor implements IExtractor {
  platform: Platform = 'instagram';

  canHandle(url: string): boolean {
    return /instagram\.com\/(p|reel|tv)\//.test(url);
  }

  async resolve(url: string): Promise<ExtractorResult> {
    try {
      // Normalize URL to remove query params for cleaner lookup
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      const shortcodeMatch = cleanUrl.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
      if (!shortcodeMatch) {
        return { success: false, error: { type: 'invalid_url', message: 'Invalid Instagram URL' } };
      }
      const shortcode = shortcodeMatch[2];

      // Use oEmbed endpoint (works for public posts)
      const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&omitscript=true`;

      let title = `Instagram ${shortcodeMatch[1] === 'reel' ? 'Reel' : 'Video'}`;
      let author = 'Instagram User';
      let thumbnail = '';

      try {
        const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
        const { data: embedHtml } = await axios.get(embedUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
          timeout: 8000,
        });
        const match = embedHtml.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/i)
          || embedHtml.match(/display_url":"([^"]+)"/i)
          || embedHtml.match(/meta property="og:image" content="([^"]+)"/i);
        if (match && match[1]) {
          thumbnail = match[1].replace(/\\u0026/g, '&').replace(/&amp;/g, '&');
        }
        const titleMatch = embedHtml.match(/CaptionText[^>]*>([^<]+)</i) || embedHtml.match(/meta property="og:title" content="([^"]+)"/i);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        }
        const authorMatch = embedHtml.match(/UsernameText[^>]*>([^<]+)</i);
        if (authorMatch && authorMatch[1]) {
          author = authorMatch[1].trim();
        }
      } catch {
        // Fallback
      }

      const formats = [
        { quality: 'HD', format: 'mp4', url: cleanUrl, hasAudio: true, hasVideo: true },
        { quality: 'SD', format: 'mp4', url: cleanUrl, hasAudio: true, hasVideo: true },
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
          audioUrl: cleanUrl,
        },
      };
    } catch (err: unknown) {
      logger.error('Instagram extractor error', err);
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr?.response?.status === 404) {
        return { success: false, error: { type: 'deleted', message: 'Instagram post not found' } };
      }
      if (axiosErr?.response?.status === 403) {
        return { success: false, error: { type: 'private', message: 'This Instagram post is private' } };
      }
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract Instagram media' } };
    }
  }
}
