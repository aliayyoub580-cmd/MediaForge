import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Download, History, Home, Info, HelpCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/history', label: 'History', icon: History },
  { to: '/about', label: 'About', icon: Info },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
];

export function Navbar() {
  const { toggle, isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-primary-200/20 dark:border-primary-700/20 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <Download className="w-4.5 h-4.5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg gradient-text">MediaForge</span>
              <span className="text-[10px] font-medium text-dark-400 dark:text-dark-500 tracking-widest uppercase">Pro</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === to
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300'
                    : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 hover:text-dark-900 dark:hover:text-dark-100'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all duration-200"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-all"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-t border-primary-200/20 dark:border-primary-700/20"
          >
            <div className="container-max section-padding py-4 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    location.pathname === to
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300'
                      : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
