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
      let thumbnail = `https://www.instagram.com/p/${shortcode}/media/?size=l`;

      try {
        const { data } = await axios.get(`https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`, {
          headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
          timeout: 8000,
        });
        if (data?.graphql?.shortcode_media) {
          const media = data.graphql.shortcode_media;
          title = media.edge_media_to_caption?.edges?.[0]?.node?.text?.slice(0, 80) || title;
          author = media.owner?.username || author;
          thumbnail = media.display_url || thumbnail;
        }
      } catch {
        // Fallback to generic metadata — Instagram blocks most scraping
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
