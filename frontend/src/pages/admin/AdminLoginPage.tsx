import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/seo/SEOHead';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await adminLogin(email, password);
      localStorage.setItem('admin_token', result.token);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Admin Login — MediaForge Pro" description="Admin portal" noindex={true} />
      <div className="min-h-screen flex items-center justify-center section-padding bg-dark-50/50 dark:bg-dark-950/50">
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-dark-900 dark:text-white">Admin Login</h1>
              <p className="text-xs text-dark-400">MediaForge Pro Dashboard</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10" placeholder="admin@media-forge-sage.vercel.app" required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10" placeholder="••••••••" required
                />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" loading={loading} className="w-full mt-2">Sign In</Button>
          </form>
        </div>
      </motion.div>
    </div>
    </>
  );
}
