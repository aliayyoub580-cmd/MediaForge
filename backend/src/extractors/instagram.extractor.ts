import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import { extractYtDlpMetadata } from '../utils/ytdlp';
import axios from 'axios';

export class InstagramExtractor implements IExtractor {
  platform: Platform = 'instagram';

  canHandle(url: string): boolean {
    return /(?:instagram\.com|instagr\.am)\/(?:p|reel|reels|tv|share)/i.test(url);
  }

  async resolve(url: string): Promise<ExtractorResult> {
    try {
      // 1. Try yt-dlp metadata first
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

      // 2. Fallback to HTML scraping
      const cleanUrl = url.split('?')[0].replace(/\/$/, '');
      let title = 'Instagram Video';
      let author = 'Instagram User';
      let thumbnail = '';

      try {
        const embedUrl = `${cleanUrl}/embed/captioned/`;
        const { data: embedHtml } = await axios.get(embedUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          timeout: 6000,
        });

        const imgMatch = embedHtml.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/i)
          || embedHtml.match(/display_url":"([^"]+)"/i)
          || embedHtml.match(/meta property="og:image" content="([^"]+)"/i);
        if (imgMatch && imgMatch[1]) {
          thumbnail = imgMatch[1].replace(/\\u0026/g, '&').replace(/&amp;/g, '&');
        }

        const titleMatch = embedHtml.match(/CaptionText[^>]*>([^<]+)</i) || embedHtml.match(/meta property="og:title" content="([^"]+)"/i);
        if (titleMatch && titleMatch[1]) title = titleMatch[1].trim();

        const authorMatch = embedHtml.match(/UsernameText[^>]*>([^<]+)</i);
        if (authorMatch && authorMatch[1]) author = authorMatch[1].trim();
      } catch {
        // Fallback info
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
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract Instagram media' } };
    }
  }
}
