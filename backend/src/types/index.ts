export type Platform = 'tiktok' | 'instagram' | 'facebook';

export interface MediaFormat {
  quality: string;
  format: string;
  url: string;
  fileSize?: number;
  mimeType?: string;
  hasAudio?: boolean;
  hasVideo?: boolean;
}

export interface MediaMetadata {
  platform: Platform;
  originalUrl: string;
  title: string;
  author: string;
  thumbnail: string;
  hdThumbnail?: string;
  duration?: number;
  uploadDate?: string;
  description?: string;
  viewCount?: number;
  formats: MediaFormat[];
  audioUrl?: string;
}

export interface ExtractorError {
  type: 'invalid_url' | 'private' | 'age_restricted' | 'deleted' | 'unsupported' | 'youtube_unavailable' | 'extraction_failed' | 'rate_limited';
  message: string;
}

export type ExtractorResult =
  | { success: true; data: MediaMetadata }
  | { success: false; error: ExtractorError };

export interface IExtractor {
  platform: Platform;
  canHandle(url: string): boolean;
  resolve(url: string): Promise<ExtractorResult>;
}

export interface DownloadHistoryRecord {
  id: string;
  hashedIp: string;
  platform: string;
  originalUrl: string;
  title?: string | null;
  thumbnail?: string | null;
  author?: string | null;
  duration?: number | null;
  quality?: string | null;
  format?: string | null;
  fileSize?: bigint | null;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
