import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../../lib/api';

const defaultStats = [
  { label: 'Total Downloads', value: 2000000, suffix: '+', prefix: '' },
  { label: 'Supported Platforms', value: 4, suffix: '', prefix: '' },
  { label: 'Happy Users', value: 500000, suffix: '+', prefix: '' },
  { label: 'Success Rate', value: 99.9, suffix: '%', prefix: '' },
];

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { data: stats } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });

  const displayStats = stats
    ? [
        { label: 'Total Downloads', value: stats.totalDownloads || 2000000, suffix: '+', prefix: '' },
        { label: 'Supported Platforms', value: 4, suffix: '', prefix: '' },
        { label: 'Videos Processed', value: (stats.totalDownloads || 0) * 1.2, suffix: '+', prefix: '' },
        { label: 'Success Rate', value: 99.9, suffix: '%', prefix: '' },
      ]
    : defaultStats;

  return (
    <section ref={ref} className="py-16 section-padding">
      <div className="container-max">
        <div className="glass-card p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className="font-display font-black text-3xl sm:text-4xl gradient-text mb-1">
                  {stat.prefix}
                  {inView ? (
                    <CountUp end={stat.value} duration={2} separator="," decimals={stat.value % 1 !== 0 ? 1 : 0} />
                  ) : '0'}
                  {stat.suffix}
                </div>
                <p className="text-sm text-dark-500 dark:text-dark-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
