import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — MediaForge Pro</title>
        <meta name="description" content="Learn about MediaForge Pro, the professional universal video and audio downloader." />
      </Helmet>
      <div className="min-h-screen pt-24 pb-16 section-padding">
        <div className="container-max max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark-900 dark:text-white mb-4">
              About <span className="gradient-text">MediaForge Pro</span>
            </h1>
            <p className="text-lg text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
              A professional-grade universal media downloader built for everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Download, title: 'Our Mission', desc: 'To provide a fast, reliable, and privacy-respecting tool for downloading media from the world\'s most popular social platforms.' },
              { icon: Shield, title: 'Privacy Commitment', desc: 'We hash IP addresses and never store them. No user accounts, no tracking, no selling data. Your downloads are your business.' },
              { icon: Zap, title: 'Technical Excellence', desc: 'Built on a modern stack with React 19, Node.js, and a modular extractor architecture that isolates platform-specific logic for reliability.' },
              { icon: Globe, title: 'Global Reach', desc: 'Available in 8 languages with full RTL support for Arabic and Urdu, making MediaForge Pro accessible worldwide.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card glass className="p-6 h-full">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-card p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-3">Built by Nexora Technologies</h2>
            <p className="text-dark-500 dark:text-dark-400 max-w-lg mx-auto text-sm leading-relaxed">
              MediaForge Pro is developed and maintained by Nexora Technologies, focused on building useful, accessible web tools that respect user privacy and deliver professional quality at no cost.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
