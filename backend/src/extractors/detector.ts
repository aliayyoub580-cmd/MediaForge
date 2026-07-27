import { IExtractor, ExtractorResult } from '../types';
import { TikTokExtractor } from './tiktok.extractor';
import { InstagramExtractor } from './instagram.extractor';
import { FacebookExtractor } from './facebook.extractor';

const extractors: IExtractor[] = [
  new TikTokExtractor(),
  new InstagramExtractor(),
  new FacebookExtractor(),
];

export function detectPlatform(url: string): IExtractor | null {
  return extractors.find((e) => e.canHandle(url)) ?? null;
}

export async function resolveMedia(url: string): Promise<ExtractorResult> {
  if (isYouTubeUrl(url)) {
    return { success: false, error: { type: 'youtube_unavailable', message: 'YouTube downloads are not available yet.' } };
  }
  const extractor = detectPlatform(url);
  if (!extractor) {
    return {
      success: false,
      error: { type: 'unsupported', message: 'This platform is not supported. We currently support TikTok, Instagram, and Facebook.' },
    };
  }
  return extractor.resolve(url);
}

export function getSupportedPlatforms() {
  return [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'tiktok',
      color: '#010101',
      supported: ['Videos', 'Slideshows'],
      outputs: ['No-watermark video', 'Audio only (MP3)', 'Thumbnail'],
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      color: '#E1306C',
      supported: ['Reels', 'Videos'],
      outputs: ['HD video', 'Audio only', 'Thumbnail'],
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      color: '#1877F2',
      supported: ['Videos', 'Reels'],
      outputs: ['HD video', 'Audio only', 'Thumbnail'],
    },
  ];
}

function isYouTubeUrl(value: string) {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === 'youtu.be' || hostname.endsWith('.youtu.be') || hostname === 'youtube.com' || hostname.endsWith('.youtube.com');
  } catch {
    return /youtube\.com|youtu\.be/i.test(value);
  }
}
