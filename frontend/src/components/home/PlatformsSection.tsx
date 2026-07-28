import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';
import { PlatformIcon } from '../download/PlatformIcon';

const platforms = [
  {
    id: 'tiktok',
    name: 'TikTok',
    desc: 'Download videos, sounds, and slideshows clean without watermarks.',
    features: ['No-Watermark MP4 Video', 'Extract Audio (MP3)', 'Original HD Quality'],
    color: 'from-cyan-500/10 to-teal-500/10 border-cyan-500/20 text-cyan-400',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    desc: 'Save Reels, video posts, and IGTV videos directly to your device.',
    features: ['1080p Full HD Video', 'Audio Sound Tracks', 'High Quality Thumbnails'],
    color: 'from-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-400',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    desc: 'Extract Facebook Reels, public watch clips, and user video posts.',
    features: ['HD & SD Video Quality', 'Fast Direct Processing', 'Audio MP3 Conversion'],
    color: 'from-blue-500/10 to-teal-500/10 border-blue-500/20 text-teal-300',
  },
];

export function PlatformsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 section-padding relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-teal-50 mb-3">
            Supported <span className="gradient-text">Platforms</span>
          </h2>
          <p className="text-slate-600 dark:text-teal-100/80 max-w-lg mx-auto text-sm sm:text-base">
            Easily download content from your favorite social media platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${platform.color} border flex items-center justify-center`}>
                    <PlatformIcon platform={platform.id} size={22} />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-teal-50">
                    {platform.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 mb-5 leading-relaxed">
                  {platform.desc}
                </p>

                <ul className="space-y-2.5">
                  {platform.features.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-teal-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
