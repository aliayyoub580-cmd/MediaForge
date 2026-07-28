import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, ShieldCheck, Video, Music, QrCode, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'Get your downloads ready in seconds. Direct high-speed processing ensures no waiting.',
    badge: 'Instant',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Sparkles,
    title: 'No Watermarks',
    desc: 'Save videos in their pure original form without TikTok or Reels logo overlays.',
    badge: 'Clean Video',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Music,
    title: 'Audio Extractor',
    desc: 'Extract and convert video background tracks directly into clear MP3 audio files.',
    badge: 'MP3 Supported',
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Video,
    title: 'Full HD & 4K Quality',
    desc: 'Download in original source resolutions up to 1080p Full HD or 4K when available.',
    badge: 'High Quality',
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: ShieldCheck,
    title: '100% Private & Safe',
    desc: 'No registration, no accounts, and no personal tracking. Your downloads stay private.',
    badge: 'Zero Tracking',
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: QrCode,
    title: 'Mobile QR Transfer',
    desc: 'Paste on desktop and scan the generated QR code to save directly onto your mobile phone.',
    badge: 'iOS & Android',
    color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  },
];

export function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="py-20 section-padding bg-slate-50/70 dark:bg-dark-950/60 relative">
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-teal-50 mb-3">
            Everything You Need for <span className="gradient-text">Easy Downloads</span>
          </h2>
          <p className="text-slate-600 dark:text-teal-100/80 max-w-xl mx-auto text-sm sm:text-base">
            Designed for simplicity, speed, and privacy on every device.
          </p>
        </motion.div>

        {/* Clean Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="glass-card p-6 flex flex-col justify-between hover:border-teal-400/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${item.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-teal-200 border border-transparent dark:border-teal-500/20">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-teal-50 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
