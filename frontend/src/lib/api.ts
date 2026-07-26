import axios from 'axios';
import toast from 'react-hot-toast';

const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
export const apiRoot = configuredApiUrl ? `${configuredApiUrl}/api` : '/api';

const api = axios.create({
  baseURL: apiRoot,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT for admin routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token && config.url?.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 429) {
      toast.error('Too many requests. Please wait a moment.');
    }
    return Promise.reject(err);
  }
);

export default api;

export function getApiUrl(path: string) {
  return `${apiRoot}${path}`;
}

// ---- API functions ----

export interface MediaFormat {
  quality: string;
  format: string;
  url: string;
  fileSize?: number;
  mimeType?: string;
}

export interface MediaMetadata {
  platform: string;
  originalUrl: string;
  title: string;
  author: string;
  thumbnail: string;
  hdThumbnail?: string;
  duration?: number;
  uploadDate?: string;
  viewCount?: number;
  formats: MediaFormat[];
  audioUrl?: string;
}

export async function resolveMedia(url: string): Promise<MediaMetadata> {
  const { data } = await api.post('/download', { url });
  return data.data;
}

export async function generateQR(url: string): Promise<string> {
  const { data } = await api.post('/download/qr', { url });
  return data.data.qrCode;
}

export async function fetchHistory(page = 1) {
  const { data } = await api.get(`/download/history?page=${page}`);
  return data.data;
}

export async function fetchStats() {
  const { data } = await api.get('/stats');
  return data.data;
}

export async function fetchPlatforms() {
  const { data } = await api.get('/platforms');
  return data.data;
}

export async function adminLogin(email: string, password: string) {
  const { data } = await api.post('/admin/login', { email, password });
  return data.data;
}

export async function adminFlushCache() {
  const { data } = await api.delete('/admin/cache');
  return data.data;
}

export async function fetchAdminHistory(page = 1, platform?: string) {
  const params = new URLSearchParams({ page: String(page) });
  if (platform) params.set('platform', platform);
  const { data } = await api.get(`/admin/history?${params}`);
  return data.data;
}
