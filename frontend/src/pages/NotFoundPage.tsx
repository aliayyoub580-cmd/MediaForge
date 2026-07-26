import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
        <div className="font-display text-9xl font-black gradient-text mb-4 leading-none">404</div>
        <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-3">Page Not Found</h2>
        <p className="text-dark-500 dark:text-dark-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button icon={<Home className="w-4 h-4" />}>Go Home</Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>Go Back</Button>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
