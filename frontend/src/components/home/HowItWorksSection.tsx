import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link2, Sliders, Download } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    step: '1',
    title: 'Copy Link',
    desc: 'Copy the video link from TikTok, Instagram Reels, or Facebook Watch.',
  },
  {
    icon: Sliders,
    step: '2',
    title: 'Paste URL',
    desc: 'Paste the link into the downloader search bar and click Download.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Save File',
    desc: 'Choose your format (HD Video or MP3 Audio) and save directly to your device.',
  },
];

export function HowItWorksSection() {
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
            How to Download in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-slate-600 dark:text-teal-100/80 max-w-lg mx-auto text-sm sm:text-base">
            Quick and effortless media extraction for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="glass-card p-6 flex flex-col items-center text-center relative"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-300 uppercase tracking-wider mb-1 font-mono">
                  Step {step.step}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-teal-50 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
