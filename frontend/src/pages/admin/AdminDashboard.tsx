import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BarChart3, Download, Trash2, LogOut, Activity } from 'lucide-react';
import { fetchStats, fetchAdminHistory, adminFlushCache } from '../../lib/api';
import { PlatformIcon } from '../../components/download/PlatformIcon';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatRelativeTime, formatNumber } from '../../lib/utils';
import { SEOHead } from '../../components/seo/SEOHead';
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
    { label: 'Total Downloads', value: formatNumber(stats?.totalDownloads || 0), icon: Download, color: 'text-teal-400' },
    { label: 'TikTok', value: formatNumber(stats?.platformBreakdown?.tiktok || 0), icon: () => <PlatformIcon platform="tiktok" size={20} />, color: 'text-cyan-400' },
    { label: 'Instagram', value: formatNumber(stats?.platformBreakdown?.instagram || 0), icon: () => <PlatformIcon platform="instagram" size={20} />, color: 'text-pink-500' },
    { label: 'Facebook', value: formatNumber(stats?.platformBreakdown?.facebook || 0), icon: () => <PlatformIcon platform="facebook" size={20} />, color: 'text-blue-500' },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard — MediaForge Pro" description="Admin portal" noindex={true} />
      <div className="min-h-screen pt-20 pb-16 section-padding bg-dark-900">
        <div className="container-max">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-slate-900 dark:text-teal-50">Admin Dashboard</h1>
                <p className="text-xs text-slate-500 dark:text-teal-200/70 flex items-center gap-1">
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
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-dark-400">{s.label}</span>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="font-display text-2xl font-bold text-dark-900 dark:text-white">{s.value}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Download log */}
          <Card className="p-6">
            <h3 className="font-display font-bold text-lg text-dark-900 dark:text-white mb-4">Live Extraction Log</h3>
            <div className="space-y-3">
              {(history?.items || []).map((item: { id: string; platform: string; title?: string; createdAt: string; quality?: string }) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-dark-100/50 dark:bg-dark-800/50 text-xs">
                  <div className="flex items-center gap-3">
                    <PlatformIcon platform={item.platform} size={16} />
                    <span className="font-medium text-dark-800 dark:text-dark-200 truncate max-w-sm">{item.title || 'Media Stream'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.quality && <Badge variant="primary">{item.quality}</Badge>}
                    <span className="text-dark-400">{formatRelativeTime(item.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
