import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldAlert, Mail } from 'lucide-react';

export default function DMCAPage() {
  return (
    <>
      <Helmet>
        <title>DMCA Notice — MediaForge Pro</title>
        <meta name="description" content="DMCA and copyright policy for MediaForge Pro." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Copyright Compliance</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
              DMCA Notice Policy
            </h1>
            <p className="text-slate-600 dark:text-dark-300 text-sm sm:text-base">
              Digital Millennium Copyright Act compliance and takedown requests.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-6 sm:p-8">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-3">Content Host Policy</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed mb-4">
                MediaForge Pro does not host, upload, or store any video or audio files on its servers. All media items are extracted directly from public third-party social networks (TikTok, Instagram, Facebook).
              </p>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200/60 dark:border-white/10 text-xs sm:text-sm text-slate-700 dark:text-dark-200 font-medium">
                <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Copyright Contact Email: dmca@media-forge-sage.vercel.app</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
