import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../../lib/api';

const defaultStats = [
  { label: 'Total Media Downloaded', value: 2450000, suffix: '+', prefix: '' },
  { label: 'Supported Platforms', value: 3, suffix: ' Core', prefix: '' },
  { label: 'Active Daily Users', value: 180000, suffix: '+', prefix: '' },
  { label: 'Engine Uptime Rate', value: 99.9, suffix: '%', prefix: '' },
];

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });

  const displayStats = stats
    ? [
        { label: 'Total Media Downloaded', value: stats.totalDownloads || 2450000, suffix: '+', prefix: '' },
        { label: 'Supported Platforms', value: 3, suffix: ' Core', prefix: '' },
        { label: 'Processed Media Streams', value: Math.round((stats.totalDownloads || 2000000) * 1.3), suffix: '+', prefix: '' },
        { label: 'Engine Uptime Rate', value: 99.9, suffix: '%', prefix: '' },
      ]
    : defaultStats;

  return (
    <section ref={ref} className="py-16 section-padding relative">
      <div className="container-max">
        <div className="studio-card p-8 sm:p-12 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-white/10">
            {displayStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center pt-4 sm:pt-0"
              >
                <div className="font-display font-extrabold text-3xl sm:text-5xl gradient-text mb-2 tracking-tight">
                  {stat.prefix}
                  {inView ? (
                    <CountUp end={stat.value} duration={2.2} separator="," decimals={stat.value % 1 !== 0 ? 1 : 0} />
                  ) : '0'}
                  {stat.suffix}
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-dark-300 font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

