import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BarChart3, Download, Trash2, RefreshCw, LogOut, Activity } from 'lucide-react';
import { fetchStats, fetchAdminHistory, adminFlushCache } from '../../lib/api';
import { PlatformIcon } from '../../components/download/PlatformIcon';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatRelativeTime, formatNumber } from '../../lib/utils';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) navigate('/admin');
  }, [navigate]);

  const { data: stats } = useQuery({ queryKey: ['admin-stats'], queryFn: fetchStats });
  const { data: history } = useQuery({ queryKey: ['admin-history'], queryFn: () => fetchAdminHistory(1) });

  const flushMutation = useMutation({
    mutationFn: adminFlushCache,
    onSuccess: () => { toast.success('Cache flushed!'); qc.invalidateQueries(); },
    onError: () => toast.error('Failed to flush cache'),
  });

  const logout = () => { localStorage.removeItem('admin_token'); navigate('/admin'); };

  const statCards = [
    { label: 'Total Downloads', value: formatNumber(stats?.totalDownloads || 0), icon: Download, color: 'text-primary-500' },
    { label: 'TikTok', value: formatNumber(stats?.platformBreakdown?.tiktok || 0), icon: () => <PlatformIcon platform="tiktok" size={20} />, color: 'text-dark-700 dark:text-dark-300' },
    { label: 'Instagram', value: formatNumber(stats?.platformBreakdown?.instagram || 0), icon: () => <PlatformIcon platform="instagram" size={20} />, color: 'text-pink-500' },
    { label: 'Facebook', value: formatNumber(stats?.platformBreakdown?.facebook || 0), icon: () => <PlatformIcon platform="facebook" size={20} />, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-dark-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-xs text-dark-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                System operational
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<Trash2 className="w-3.5 h-3.5" />} loading={flushMutation.isPending} onClick={() => flushMutation.mutate()}>
              Flush Cache
            </Button>
            <Button variant="ghost" size="sm" icon={<LogOut className="w-3.5 h-3.5" />} onClick={logout}>Logout</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card glass className="p-5">
                <div className={`mb-3 ${s.color}`}><s.icon /></div>
                <p className="font-display font-bold text-2xl text-dark-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-dark-400 mt-1">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent downloads */}
        <Card glass className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-dark-900 dark:text-dark-100">Recent Downloads</h2>
            <button onClick={() => qc.invalidateQueries({ queryKey: ['admin-history'] })}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-dark-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2.5">
            {history?.items?.map((item: {
              id: string; platform: string; title?: string; thumbnail?: string;
              createdAt: string; quality?: string;
            }) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-dark-50/60 dark:bg-dark-800/40">
                {item.thumbnail && <img src={item.thumbnail} alt="" referrerPolicy="no-referrer" className="w-10 h-8 rounded-lg object-cover flex-shrink-0" />}
                <PlatformIcon platform={item.platform} size={16} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark-700 dark:text-dark-200 truncate">{item.title || 'Untitled'}</p>
                  <p className="text-xs text-dark-400">{formatRelativeTime(item.createdAt)}</p>
                </div>
                {item.quality && <Badge variant="neutral">{item.quality}</Badge>}
              </div>
            ))}
            {!history?.items?.length && (
              <p className="text-center text-sm text-dark-400 py-8">No download records found.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
