import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — MediaForge Pro</title>
        <meta name="description" content="MediaForge Pro privacy policy detailing zero tracking, IP hashing, and data security." />
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacy & Security</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
              Privacy Policy
            </h1>
            <p className="text-slate-600 dark:text-dark-300 text-sm sm:text-base">
              Last updated: July 2026. We respect your privacy and protect your data.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 text-primary-500">
                <Lock className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">1. Zero Personal Data Collection</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed">
                MediaForge Pro does not require user accounts, emails, or personal information to extract and download media. You can use the service completely anonymously.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 text-cyan-500">
                <Database className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">2. Cryptographic IP Hashing</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed">
                To prevent rate abuse and maintain system stability, incoming IP addresses are salted and cryptographically hashed before memory allocation. Raw IP addresses are never logged or stored in plain text.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3 text-purple-500">
                <EyeOff className="w-5 h-5" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">3. Cookies & Tracking</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed">
                We do not use advertising cookies, cross-site tracking scripts, or sell data to third parties. Local storage is strictly used for saving user UI preferences (such as light/dark mode and language choice).
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
