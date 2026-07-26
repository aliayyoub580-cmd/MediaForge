import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

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
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="py-24 section-padding">
      <div className="container-max max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-dark-500 dark:text-dark-400">Everything you need to know about MediaForge Pro</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-dark-800 dark:text-dark-200 text-sm sm:text-base">{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-500">
                  {open === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-sm text-dark-500 dark:text-dark-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
