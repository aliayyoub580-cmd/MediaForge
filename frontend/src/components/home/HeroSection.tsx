import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Users } from 'lucide-react';
import { UrlInput } from '../download/UrlInput';
import { DownloadResult } from '../download/DownloadResult';
import { DownloadResultSkeleton } from '../ui/Skeleton';
import { useDownload } from '../../hooks/useDownload';

export function HeroSection() {
  const { submit, result, qrCode, isLoading, requestQR, reset } = useDownload();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-white dark:from-dark-900 to-transparent pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-[10%] w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400/30 to-accent-400/30 backdrop-blur-sm border border-primary-300/20 pointer-events-none"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-48 right-[12%] w-8 h-8 rounded-xl bg-gradient-to-br from-accent-400/30 to-primary-400/30 backdrop-blur-sm border border-accent-300/20 pointer-events-none"
      />

      <div className="container-max section-padding relative w-full">
        <div className="text-center mb-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 border border-primary-200/50 dark:border-primary-700/30 text-primary-600 dark:text-primary-300 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Professional Media Downloader
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-dark-900 dark:text-white mb-4 leading-[1.1]"
          >
            Download Any Video,{' '}
            <span className="gradient-text">Anywhere</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-dark-500 dark:text-dark-400 max-w-2xl mx-auto mb-8 text-balance"
          >
            Download HD videos and audio from TikTok, YouTube, Instagram & Facebook.
            No watermarks. No signup. Completely free.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center justify-center gap-6 text-sm text-dark-400 dark:text-dark-500 mb-10"
          >
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary-400" />
              <span>2M+ users</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-dark-300 dark:bg-dark-600" />
            <span>4 platforms</span>
            <div className="w-1 h-1 rounded-full bg-dark-300 dark:bg-dark-600" />
            <span>100% free</span>
          </motion.div>
        </div>

        {/* URL Input */}
        <UrlInput onSubmit={submit} isLoading={isLoading} />

        {/* Result */}
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
        </div>

        {/* Scroll cue */}
        {!result && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-dark-400 dark:text-dark-500"
            >
              <span className="text-xs font-medium uppercase tracking-widest">Scroll to explore</span>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
