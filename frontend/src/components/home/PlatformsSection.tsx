import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { fetchPlatforms } from '../../lib/api';
import { PlatformIcon } from '../download/PlatformIcon';
import { Card } from '../ui/Card';

interface PlatformData {
  id: string;
  name: string;
  supported?: string[];
  outputs?: string[];
  color?: string;
  icon?: string;
}

const PLATFORM_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  youtube: { bg: 'bg-red-500/10 dark:bg-red-500/5', border: 'border-red-500/20', text: 'text-red-500' },
  tiktok: { bg: 'bg-slate-900/10 dark:bg-slate-100/5', border: 'border-slate-700/20', text: 'text-dark-700 dark:text-dark-200' },
  instagram: { bg: 'bg-pink-500/10 dark:bg-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-500' },
  facebook: { bg: 'bg-blue-500/10 dark:bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-500' },
};

const staticPlatforms: PlatformData[] = [
  { id: 'youtube', name: 'YouTube', supported: ['Videos', 'Shorts'], outputs: ['Up to 1080p', 'Audio MP3', 'Thumbnail'] },
  { id: 'tiktok', name: 'TikTok', supported: ['Videos', 'Slideshows'], outputs: ['No watermark', 'Audio MP3', 'Thumbnail'] },
  { id: 'instagram', name: 'Instagram', supported: ['Reels', 'Videos'], outputs: ['HD video', 'Audio', 'Thumbnail'] },
  { id: 'facebook', name: 'Facebook', supported: ['Videos', 'Reels'], outputs: ['HD video', 'Audio', 'Thumbnail'] },
];

export function PlatformsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data: platforms } = useQuery<PlatformData[]>({
    queryKey: ['platforms'],
    queryFn: fetchPlatforms,
    staleTime: Infinity,
  });

  const items: PlatformData[] = platforms || staticPlatforms;

  return (
    <section ref={ref} className="py-24 section-padding">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark-900 dark:text-white mb-4">
            Supported <span className="gradient-text">Platforms</span>
          </h2>
          <p className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto">
            Works seamlessly with all major social media platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((platform: PlatformData, i: number) => {
            const colors = PLATFORM_COLORS[platform.id] || PLATFORM_COLORS['youtube'];
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card glass hover className="p-6 h-full">
                  <div className={`w-12 h-12 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4`}>
                    <PlatformIcon platform={platform.id} size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-dark-900 dark:text-dark-100 mb-1">{platform.name}</h3>
                  <p className="text-xs text-dark-400 mb-4">{platform.supported?.join(' · ')}</p>
                  <ul className="space-y-1.5">
                    {platform.outputs?.map((output: string) => (
                      <li key={output} className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
