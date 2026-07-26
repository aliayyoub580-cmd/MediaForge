import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clipboard, Settings, Download } from 'lucide-react';

const steps = [
  { icon: Clipboard, step: '01', title: 'Paste Your URL', desc: 'Copy any video link from YouTube, TikTok, Instagram, or Facebook and paste it into the input box above.' },
  { icon: Settings, step: '02', title: 'Select Format', desc: 'Choose your preferred quality (1080p, 720p, etc.) and format — video, audio-only, or thumbnail.' },
  { icon: Download, step: '03', title: 'Download Instantly', desc: 'Hit download and save your media directly to your device. No signup, no watermarks.' },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto">
            Three simple steps to download any media
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 dark:from-primary-700 dark:via-accent-700 dark:to-primary-700 opacity-50" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow-lg">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-white dark:bg-dark-800 border border-primary-200/50 dark:border-primary-700/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-primary-500">{step.step}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-dark-900 dark:text-dark-100 mb-2">{step.title}</h3>
                <p className="text-sm text-dark-500 dark:text-dark-400 leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
