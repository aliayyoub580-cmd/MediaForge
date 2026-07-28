import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { History, Clock, ExternalLink } from 'lucide-react';
import { fetchHistory } from '../lib/api';
import { PlatformIcon } from '../components/download/PlatformIcon';
import { Skeleton } from '../components/ui/Skeleton';
import { formatRelativeTime } from '../lib/utils';

export default function HistoryPage() {
  const { data, isLoading } = useQuery({ queryKey: ['history'], queryFn: () => fetchHistory(1) });

  const items = data?.items || [];

  return (
    <>
      <Helmet>
        <title>Extraction History — MediaForge Pro</title>
      </Helmet>

      <div className="min-h-screen pt-28 pb-20 section-padding relative">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shadow-glow">
                <History className="w-5 h-5" />
              </div>
              <h1 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">Extraction History</h1>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-dark-400">
              Recent media downloads processed from this device session
            </p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
            </div>
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="studio-card p-16 text-center flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-dark-800 flex items-center justify-center text-slate-400">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-800 dark:text-dark-200 mb-1">No extraction logs yet</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-400">Media links you process will appear here</p>
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
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="studio-card p-4 hover:border-cyan-500/40">
                    <div className="flex items-start gap-4">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200 dark:border-white/10" loading="lazy" />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-slate-100 dark:bg-dark-800 flex-shrink-0 flex items-center justify-center text-slate-400">
                          <PlatformIcon platform={item.platform} size={20} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{item.title || 'Untitled Stream'}</p>
                            <div className="flex items-center gap-2 mt-1 font-mono text-xs text-slate-500">
                              <PlatformIcon platform={item.platform} size={12} />
                              <span className="capitalize">{item.platform}</span>
                              {item.quality && (
                                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-750 text-[10px] font-bold text-slate-700 dark:text-dark-200">
                                  {item.quality}
                                </span>
                              )}
                              <span>•</span>
                              <span>{formatRelativeTime(item.createdAt)}</span>
                            </div>
                          </div>
                          <a
                            href={item.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-dark-750 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

