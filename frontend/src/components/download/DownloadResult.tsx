import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Music, Image, QrCode, Copy, Share2, Clock, User, Play, X, CheckCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import { getApiUrl, MediaMetadata } from '../../lib/api';
import { formatDuration, formatFileSize, cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PlatformIcon } from './PlatformIcon';
import toast from 'react-hot-toast';

interface DownloadResultProps {
  data: MediaMetadata;
  qrCode?: string | null;
  onRequestQR: (url: string) => void;
  onReset: () => void;
}

type Tab = 'video' | 'audio' | 'thumbnail';
type DownloadProgress = {
  key: string;
  status: 'preparing' | 'downloading';
  loaded: number;
  total: number | null;
};

export function DownloadResult({ data, qrCode, onRequestQR, onReset }: DownloadResultProps) {
  const [activeTab, setActiveTab] = useState<Tab>('video');
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.originalUrl);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: data.title, url: data.originalUrl });
    } else {
      handleCopy();
    }
  };

  const handleQR = () => {
    setShowQR(true);
    if (!qrCode) onRequestQR(data.originalUrl);
  };

  const getDownloadUrl = (quality?: string, kind: 'video' | 'audio' | 'thumbnail' = 'video') => {
    const params = new URLSearchParams({ url: data.originalUrl });
    if (quality) params.set('quality', quality);
    if (kind === 'audio') params.set('kind', kind);
    return getApiUrl(`/download/file?${params.toString()}`);
  };

  const handleMediaDownload = async (quality?: string, kind: 'video' | 'audio' | 'thumbnail' = 'video') => {
    const key = `${kind}-${quality || 'best'}`;
    setDownloading(key);
    setDownloadProgress({ key, status: 'preparing', loaded: 0, total: null });

    try {
      const response = await fetch(getDownloadUrl(quality, kind));
      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: { message?: string } } | null;
        throw new Error(payload?.error?.message || 'The server could not prepare this download. Please try again.');
      }

      const totalHeader = response.headers.get('content-length');
      const total = totalHeader && Number.isFinite(Number(totalHeader)) ? Number(totalHeader) : null;
      let blob: Blob;

      if (!response.body) {
        blob = await response.blob();
        setDownloadProgress({ key, status: 'downloading', loaded: blob.size, total: blob.size });
      } else {
        const reader = response.body.getReader();
        const chunks: ArrayBuffer[] = [];
        let loaded = 0;
        setDownloadProgress({ key, status: 'downloading', loaded, total });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            // Copy into a regular ArrayBuffer so it is accepted by Blob across
            // the browser and TypeScript's stricter SharedArrayBuffer types.
            const chunk = new Uint8Array(value.byteLength);
            chunk.set(value);
            chunks.push(chunk.buffer);
            loaded += value.byteLength;
            setDownloadProgress({ key, status: 'downloading', loaded, total });
          }
        }
        blob = new Blob(chunks, { type: response.headers.get('content-type') || 'application/octet-stream' });
      }
      if (!blob.size || blob.type.includes('application/json')) {
        throw new Error('The server did not return a media file. Please try again.');
      }

      const disposition = response.headers.get('content-disposition') || '';
      const filename = disposition.match(/filename="?([^";]+)"?/i)?.[1]
        || `${data.title || 'media'}.${kind === 'audio' ? 'm4a' : kind === 'thumbnail' ? 'jpg' : 'mp4'}`;
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      toast.success('Download started');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Download failed. Please try again.');
    } finally {
      setDownloading(null);
      setDownloadProgress(null);
    }
  };

  const progressPercent = downloadProgress?.total
    ? Math.min(100, Math.round((downloadProgress.loaded / downloadProgress.total) * 100))
    : 0;
  const progressLabel = downloadProgress?.status === 'preparing'
    ? 'Preparing your file on the server…'
    : downloadProgress?.total
      ? `Downloading ${formatFileSize(downloadProgress.loaded)} of ${formatFileSize(downloadProgress.total)} (${progressPercent}%)`
      : `Downloading ${formatFileSize(downloadProgress?.loaded || 0)}…`;

  const platformColors: Record<string, string> = {
    youtube: 'bg-red-500/10 border-red-500/20',
    tiktok: 'bg-dark-900/10 dark:bg-dark-100/10 border-dark-700/20',
    instagram: 'bg-pink-500/10 border-pink-500/20',
    facebook: 'bg-blue-500/10 border-blue-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-card overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-0 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-28 h-18 rounded-xl overflow-hidden bg-dark-200 dark:bg-dark-700 group">
              {data.thumbnail ? (
                <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-dark-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border', platformColors[data.platform] || 'bg-primary-50 border-primary-200/30')}>
                  <PlatformIcon platform={data.platform} size={12} />
                  <span className="capitalize">{data.platform}</span>
                </div>
                {data.duration && (
                  <Badge variant="neutral">
                    <Clock className="w-3 h-3" />
                    {formatDuration(data.duration)}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-dark-900 dark:text-dark-100 text-sm leading-snug line-clamp-2">{data.title}</h3>
              {data.author && (
                <p className="text-xs text-dark-400 dark:text-dark-500 mt-1 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {data.author}
                </p>
              )}
            </div>
          </div>

          <button onClick={onReset} className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-dark-400 hover:text-dark-600 dark:hover:text-dark-200 hover:bg-dark-100 dark:hover:bg-dark-700 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-1 bg-dark-100/60 dark:bg-dark-800/60 p-1 rounded-xl">
            {([
              { key: 'video', label: 'Video', icon: Play },
              { key: 'audio', label: 'Audio', icon: Music },
              { key: 'thumbnail', label: 'Thumbnail', icon: Image },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200',
                  activeTab === key
                    ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Format list */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5"
            >
              {activeTab === 'video' && data.formats.map((fmt, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-dark-50/60 dark:bg-dark-800/40 border border-dark-200/40 dark:border-dark-700/30 hover:border-primary-300/40 dark:hover:border-primary-600/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark-800 dark:text-dark-200">{fmt.quality}</p>
                      <p className="text-xs text-dark-400 uppercase">{fmt.format}{fmt.fileSize ? ` · ${formatFileSize(fmt.fileSize)}` : ''}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    loading={downloading === `video-${fmt.quality}`}
                    onClick={() => handleMediaDownload(fmt.quality)}
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download
                  </Button>
                </div>
              ))}

              {activeTab === 'audio' && data.audioUrl && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-50/60 dark:bg-dark-800/40 border border-dark-200/40 dark:border-dark-700/30">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500/20 to-primary-500/20 flex items-center justify-center">
                      <Music className="w-4 h-4 text-accent-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark-800 dark:text-dark-200">Audio Only</p>
                      <p className="text-xs text-dark-400 uppercase">Best available audio</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    loading={downloading === 'audio-best'}
                    onClick={() => handleMediaDownload(undefined, 'audio')}
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download
                  </Button>
                </div>
              )}

              {activeTab === 'thumbnail' && data.thumbnail && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-dark-50/60 dark:bg-dark-800/40 border border-dark-200/40 dark:border-dark-700/30">
                  <div className="flex items-center gap-3">
                    <img src={data.thumbnail} alt="thumbnail" className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-dark-800 dark:text-dark-200">Thumbnail</p>
                      <p className="text-xs text-dark-400 uppercase">JPG</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    loading={downloading === 'thumbnail-best'}
                    onClick={() => handleMediaDownload(undefined, 'thumbnail')}
                    icon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {downloadProgress && (
            <div className="mt-4 rounded-xl border border-primary-200/60 dark:border-primary-700/40 bg-primary-50/70 dark:bg-primary-900/15 p-3" aria-live="polite">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-primary-700 dark:text-primary-300">
                <span>{progressLabel}</span>
                {downloadProgress.status === 'downloading' && downloadProgress.total && <span>{progressPercent}%</span>}
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary-200/70 dark:bg-primary-950/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={false}
                  animate={downloadProgress.status === 'preparing' ? { width: ['15%', '75%', '15%'] } : { width: `${Math.max(progressPercent, 2)}%` }}
                  transition={downloadProgress.status === 'preparing' ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex items-center gap-2 flex-wrap">
          <Button variant="secondary" size="sm" icon={copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
          <Button variant="secondary" size="sm" icon={<Share2 className="w-3.5 h-3.5" />} onClick={handleShare}>Share</Button>
          <Button variant="ghost" size="sm" icon={<QrCode className="w-3.5 h-3.5" />} onClick={handleQR}>QR Code</Button>
        </div>

        {/* QR Modal */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowQR(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-dark-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-xs w-full"
              >
                <h3 className="font-semibold text-dark-900 dark:text-dark-100">Scan to Download</h3>
                <div className="p-4 bg-white rounded-2xl">
                  <QRCode value={data.originalUrl} size={200} fgColor="#6366f1" bgColor="#ffffff" />
                </div>
                <p className="text-xs text-dark-400 text-center">Scan with your phone camera</p>
                <Button variant="ghost" size="sm" onClick={() => setShowQR(false)}>Close</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
