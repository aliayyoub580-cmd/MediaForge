import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Download, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — MediaForge Pro Engine</title>
        <meta name="description" content="Learn about MediaForge Pro, the high-performance universal video & audio extraction suite." />
      </Helmet>
      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-dark-200 text-xs font-mono mb-4">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" />
              <span>ABOUT THE ENGINE</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">
              About <span className="gradient-text">MediaForge Pro</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-dark-300 max-w-2xl mx-auto leading-relaxed">
              A high-performance universal media extraction suite designed for speed, privacy, and zero watermarks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Download, title: 'Our Mission', desc: 'To provide an ultra-fast, reliable, and zero-tracking pipeline for media extraction from popular social platforms.' },
              { icon: ShieldCheck, title: 'Privacy Commitment', desc: 'We hash IP addresses and never log personal details. No mandatory user accounts, no tracking cookies, no data sales.' },
              { icon: Zap, title: 'Technical Architecture', desc: 'Built on a modular extractor engine using React 19, Vite, Node.js, and parallelized demuxing pipelines for line-speed performance.' },
              { icon: Globe, title: 'Global Accessibility', desc: 'Available in 8 languages with full RTL layout support for Arabic and Urdu, ensuring universal global accessibility.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="studio-card p-6 h-full flex flex-col justify-between group hover:border-cyan-500/40">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-500">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="studio-card p-8 text-center"
          >
            <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Engineered by Nexora Technologies
            </h2>
            <p className="text-slate-600 dark:text-dark-300 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed font-sans">
              MediaForge Pro is continuously optimized and maintained by Nexora Technologies. Our target is providing accessible, privacy-respecting, high-performance software tools at no cost.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

