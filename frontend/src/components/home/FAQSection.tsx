import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'Is MediaForge Pro completely free?', a: 'Yes, MediaForge Pro is 100% free. There are no hidden fees, subscriptions, or premium tiers. All features are available to everyone.' },
  { q: 'Do I need to create an account?', a: 'No account is required. Just paste your video URL and download instantly. We respect your privacy and do not require any personal information.' },
  { q: 'What video quality can I download?', a: 'We support downloads up to the original quality of the source video — which can be up to 1080p HD or higher depending on the platform and the original upload quality.' },
  { q: 'Can I download TikTok videos without watermarks?', a: 'Yes! MediaForge Pro extracts TikTok videos directly from the source, providing clean no-watermark downloads whenever the original source supports it.' },
  { q: 'Is it legal to download videos?', a: 'Downloading publicly available videos for personal use is generally acceptable. However, you should respect copyright laws and platform terms of service. Do not redistribute downloaded content without permission.' },
  { q: 'Why did my download fail?', a: 'Downloads can fail if the video is private, age-restricted, deleted, or the platform has changed its structure. Our extractors are regularly updated to handle such changes. Try again in a moment.' },
  { q: 'How is my privacy protected?', a: 'IP addresses are hashed (not stored in plain text). We do not track users across sessions or sell any data. Download history is tied only to an anonymous hashed identifier.' },
  { q: 'Do you support Instagram Reels?', a: 'Yes! We support Instagram Reels, regular videos, and IGTV content. Simply paste the URL and select your preferred download format.' },
];

export function FAQSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} id="faq" className="py-24 section-padding relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-dark-200 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-600 dark:text-dark-300 text-sm sm:text-base">
            Everything you need to know about MediaForge Pro processing
          </p>
        </motion.div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04 }}
                className={`studio-card overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-cyan-500/40 shadow-glow-cyan' : ''
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-display font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                    isOpen ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-dark-750 text-slate-500 dark:text-dark-300'
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-5 text-xs sm:text-sm text-slate-600 dark:text-dark-300 leading-relaxed border-t border-slate-200/50 dark:border-white/5 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

