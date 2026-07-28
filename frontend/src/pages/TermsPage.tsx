import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — MediaForge Pro</title>
        <meta name="description" content="Terms of service and usage conditions for MediaForge Pro." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Terms & Governance</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
              Terms of Service
            </h1>
            <p className="text-slate-600 dark:text-dark-300 text-sm sm:text-base">
              Please review our terms of usage and service policies.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">1. Personal Non-Commercial Use</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed">
                MediaForge Pro is provided as a utility tool for personal use. Users are responsible for complying with the copyright laws of their local jurisdiction and the terms of service of respective media platforms.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 text-amber-500">
                <AlertCircle className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">2. Copyright Responsibility</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed">
                We do not host or store copyrighted media files on our servers. Media extraction is processed dynamically on behalf of the user request. Users must respect content creators&apos; rights and intellectual property.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
