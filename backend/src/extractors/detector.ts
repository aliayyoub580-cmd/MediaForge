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
      color: '#00F2FE',
      supported: ['Videos', 'Slideshows'],
      outputs: ['No-watermark video', 'Audio only (MP3)', 'Thumbnail'],
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      color: '#E1306C',
      supported: ['Reels', 'Videos', 'Stories', 'Photos'],
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
