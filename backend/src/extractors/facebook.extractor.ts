import { IExtractor, ExtractorResult, Platform } from '../types';
import { logger } from '../utils/logger';
import { extractYtDlpMetadata } from '../utils/ytdlp';
import axios from 'axios';

export class FacebookExtractor implements IExtractor {
  platform: Platform = 'facebook';

  canHandle(url: string): boolean {
    return /(?:facebook\.com|fb\.watch|fb\.com)/i.test(url);
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
      let resolvedUrl = url;
      if (url.includes('fb.watch')) {
        try {
          const resp = await axios.get(url, { maxRedirects: 5, timeout: 5000 });
          resolvedUrl = resp.request.res?.responseUrl || url;
        } catch {
          resolvedUrl = url;
        }
      }

      let title = 'Facebook Video';
      let author = 'Facebook User';
      let thumbnail = '';

      try {
        const { data: pageHtml } = await axios.get(resolvedUrl, {
          headers: {
            'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          },
          timeout: 6000,
        });

        const imgMatch = pageHtml.match(/meta property="og:image" content="([^"]+)"/i)
          || pageHtml.match(/meta name="twitter:image" content="([^"]+)"/i);
        if (imgMatch && imgMatch[1]) {
          thumbnail = imgMatch[1].replace(/\\/g, '').replace(/&amp;/g, '&');
        }

        const titleMatch = pageHtml.match(/meta property="og:title" content="([^"]+)"/i)
          || pageHtml.match(/<title>([^<]+)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].replace(/ \| Facebook$/i, '').trim();
        }
      } catch {
        // Fallback
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
      return { success: false, error: { type: 'extraction_failed', message: 'Failed to extract Facebook video' } };
    }
  }
}
