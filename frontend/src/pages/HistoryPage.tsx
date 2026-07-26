import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { History, Clock, ExternalLink } from 'lucide-react';
import { fetchHistory } from '../lib/api';
import { PlatformIcon } from '../components/download/PlatformIcon';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { formatRelativeTime } from '../lib/utils';

export default function HistoryPage() {
  const { data, isLoading } = useQuery({ queryKey: ['history'], queryFn: () => fetchHistory(1) });

  const items = data?.items || [];

  return (
    <>
      <Helmet>
        <title>Download History — MediaForge Pro</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 section-padding">
        <div className="container-max max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
                <History className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-display text-2xl font-bold text-dark-900 dark:text-white">Download History</h1>
            </div>
            <p className="text-sm text-dark-400 dark:text-dark-500 ml-13">Your recent downloads from this device</p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
            </div>
          ) : items.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-card p-16 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                <Clock className="w-8 h-8 text-dark-400" />
              </div>
              <div>
                <h3 className="font-semibold text-dark-700 dark:text-dark-300 mb-1">No history yet</h3>
                <p className="text-sm text-dark-400 dark:text-dark-500">Downloads you make will appear here</p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {items.map((item: {
                id: string; platform: string; title?: string; author?: string;
                thumbnail?: string; createdAt: string; quality?: string; format?: string; originalUrl: string;
              }, i: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card glass className="p-4">
                    <div className="flex items-start gap-4">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-dark-100 dark:bg-dark-800 flex-shrink-0 flex items-center justify-center">
                          <PlatformIcon platform={item.platform} size={20} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark-800 dark:text-dark-200 truncate">{item.title || 'Untitled'}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <PlatformIcon platform={item.platform} size={12} />
                              <span className="text-xs capitalize text-dark-400">{item.platform}</span>
                              {item.quality && <Badge variant="neutral">{item.quality}</Badge>}
                              <span className="text-xs text-dark-400">{formatRelativeTime(item.createdAt)}</span>
                            </div>
                          </div>
                          <a href={item.originalUrl} target="_blank" rel="noopener noreferrer"
                            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-dark-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
