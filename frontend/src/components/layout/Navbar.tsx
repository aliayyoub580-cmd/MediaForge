import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Download, History, Home, Info, HelpCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { LanguageSelector } from './LanguageSelector';
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
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200 py-3',
        scrolled
          ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-12">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 via-accent-600 to-cyan-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <Download className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              MediaForge <span className="gradient-text">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-dark-800/80 border border-slate-200/60 dark:border-white/5 backdrop-blur-md">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-white dark:bg-dark-700 text-slate-900 dark:text-primary-400 shadow-sm'
                      : 'text-slate-600 dark:text-dark-300 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Header Controls: Language + Theme */}
          <div className="flex items-center gap-2.5">
            <LanguageSelector />

            <button
              onClick={toggle}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-dark-300 bg-slate-100 dark:bg-dark-800 border border-slate-200/60 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-dark-700 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-dark-300 bg-slate-100 dark:bg-dark-800 border border-slate-200/60 dark:border-white/10"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-dark-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 mt-2"
          >
            <div className="container-max section-padding py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    location.pathname === to
                      ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-slate-700 dark:text-dark-200 hover:bg-slate-100 dark:hover:bg-dark-800'
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
