import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEOHead } from '../components/seo/SEOHead';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 — Page Not Found | MediaForge Pro"
        description="The requested page could not be found."
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center section-padding pt-24 pb-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="font-display text-8xl font-black gradient-text mb-2 leading-none">404</div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-teal-50 mb-3">Page Not Found</h1>
          <p className="text-slate-600 dark:text-teal-100/80 mb-6 text-sm">
            The page you are looking for does not exist. Explore our popular video downloading tools below:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold mb-8">
            <Link to="/tiktok-downloader" className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-teal-600 dark:text-teal-300">
              TikTok Downloader
            </Link>
            <Link to="/instagram-downloader" className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-teal-600 dark:text-teal-300">
              Instagram Downloader
            </Link>
            <Link to="/facebook-downloader" className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-teal-600 dark:text-teal-300">
              Facebook Downloader
            </Link>
            <Link to="/mp4-downloader" className="p-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-teal-600 dark:text-teal-300">
              MP4 Downloader
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link to="/">
              <Button icon={<Home className="w-4 h-4" />}>Back to Home</Button>
            </Link>
            <button onClick={() => window.history.back()}>
              <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>Go Back</Button>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
