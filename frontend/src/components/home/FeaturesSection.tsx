import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Video, Music, QrCode, Gift, Globe, Smartphone } from 'lucide-react';
import { Card } from '../ui/Card';

const features = [
  { icon: Video, title: 'HD Quality', desc: 'Download in original quality up to 4K/1080p. Never compromise on video clarity.', color: 'text-red-400', bg: 'bg-red-500/10' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized extraction engine delivers results in seconds, not minutes.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Shield, title: 'Privacy First', desc: 'Zero tracking. IPs are hashed, never stored. Your downloads stay private.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Music, title: 'Audio Extraction', desc: 'Extract high-quality MP3 audio from any video with a single click.', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { icon: QrCode, title: 'QR Download', desc: 'Generate QR codes to transfer downloads to your phone instantly.', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { icon: Gift, title: 'Forever Free', desc: 'No hidden fees, no subscriptions. Full features always free.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Globe, title: 'Multi-Language', desc: 'Available in 8 languages including Arabic and Urdu with RTL support.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Smartphone, title: 'PWA Support', desc: 'Install as a native app on any device. Works offline with service workers.', color: 'text-violet-400', bg: 'bg-violet-500/10' },
];

export function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="py-24 section-padding bg-dark-50/50 dark:bg-dark-950/50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
            Why Choose <span className="gradient-text">MediaForge Pro?</span>
          </h2>
          <p className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto">
            Professional-grade features that set us apart from the rest
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Card glass hover className="p-5 h-full group">
                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-dark-900 dark:text-dark-100 mb-1.5">{f.title}</h3>
                <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
