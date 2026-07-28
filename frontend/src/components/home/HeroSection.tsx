import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Download, CheckCircle2 } from 'lucide-react';
import { UrlInput } from '../download/UrlInput';
import { DownloadResult } from '../download/DownloadResult';
import { DownloadResultSkeleton } from '../ui/Skeleton';
import { useDownload } from '../../hooks/useDownload';
import { PlatformIcon } from '../download/PlatformIcon';

export function HeroSection() {
  const { submit, result, qrCode, isLoading, requestQR, reset } = useDownload();

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-50/50 dark:bg-dark-900">
      {/* Deep Ocean Teal Background Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[360px] bg-gradient-to-r from-teal-500/15 via-cyan-500/15 to-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max section-padding relative w-full z-10">
        {/* Header Block taking 90% screen width */}
        <div className="text-center w-full max-w-5xl mx-auto mb-8">
          {/* Friendly Teal Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 dark:bg-dark-800/90 border border-teal-500/20 dark:border-teal-400/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400" />
            <span>Fast, Free & Watermark-Free Downloader</span>
          </motion.div>

          {/* Expanded 90% Screen Width Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-teal-50 mb-4 leading-[1.12]"
          >
            Download HD Videos & Audio <br />
            <span className="gradient-text">TikTok, Instagram & Facebook</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-base sm:text-xl text-slate-600 dark:text-teal-100/80 leading-relaxed max-w-4xl mx-auto mb-6"
          >
            Paste any link below to save clean videos or high-quality MP3 audio files instantly. No registration or software installation required.
          </motion.p>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex items-center justify-center flex-wrap gap-6 text-sm font-medium text-slate-600 dark:text-teal-200/90 mb-8"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>No Watermark</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-500 dark:text-teal-300" />
              <span>100% Free & Private</span>
            </div>
          </motion.div>
        </div>

        {/* Search URL Input - Expanded to 90% Container Width */}
        <UrlInput onSubmit={submit} isLoading={isLoading} />

        {/* Download Result OR Simple Platform Overview */}
        <div className="mt-8">
          {isLoading && <DownloadResultSkeleton />}
          {!isLoading && result && (
            <DownloadResult
              data={result}
              qrCode={qrCode}
              onRequestQR={requestQR}
              onReset={reset}
            />
          )}

          {!isLoading && !result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-full max-w-5xl mx-auto mt-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    platform: 'tiktok',
                    title: 'TikTok Downloader',
                    desc: 'Download TikTok videos without watermark in HD MP4 or MP3 sound tracks.',
                    color: 'from-cyan-500/10 to-teal-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-300',
                  },
                  {
                    platform: 'instagram',
                    title: 'Instagram Reels',
                    desc: 'Save Instagram Reels, video posts, and IGTV clips in original quality.',
                    color: 'from-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-600 dark:text-pink-300',
                  },
                  {
                    platform: 'facebook',
                    title: 'Facebook Videos',
                    desc: 'Download Facebook Reels and video watch clips cleanly to your phone or desktop.',
                    color: 'from-blue-500/10 to-teal-500/10 border-blue-500/20 text-blue-600 dark:text-teal-300',
                  },
                ].map((item) => (
                  <div
                    key={item.platform}
                    className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center`}>
                          <PlatformIcon platform={item.platform} size={20} />
                        </div>
                        <h3 className="font-display font-bold text-base text-slate-900 dark:text-teal-50">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center gap-1 text.xs font-semibold text-teal-600 dark:text-teal-300">
                      <Download className="w-3.5 h-3.5" />
                      <span>HD & MP3 Supported</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
