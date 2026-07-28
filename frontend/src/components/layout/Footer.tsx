import { Link } from 'react-router-dom';
import { Download, Github, Twitter, Heart, Shield, Film } from 'lucide-react';

const platforms = [
  { to: '/', label: 'TikTok Downloader' },
  { to: '/', label: 'Instagram Downloader' },
  { to: '/', label: 'Facebook Downloader' },
];

const legal = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/dmca', label: 'DMCA Notice' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-teal-500/20 bg-slate-50/80 dark:bg-dark-950/80 backdrop-blur-md mt-20">
      <div className="container-max section-padding py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-500 flex items-center justify-center shadow-md">
                <Download className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-teal-50">
                MediaForge <span className="gradient-text">Pro</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 max-w-sm leading-relaxed">
              Universal Video & Audio Downloader. Download HD videos and MP3 audio from TikTok, Instagram & Facebook for free.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-xl bg-white dark:bg-dark-800 border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-teal-300 hover:text-teal-500 dark:hover:text-teal-200 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-xl bg-white dark:bg-dark-800 border border-slate-200/60 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-teal-300 hover:text-teal-500 dark:hover:text-teal-200 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-teal-50 uppercase tracking-wider mb-4 flex items-center gap-1.5 font-mono">
              <Film className="w-3.5 h-3.5 text-teal-400" />
              <span>Downloaders</span>
            </h3>
            <ul className="space-y-2.5">
              {platforms.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-teal-50 uppercase tracking-wider mb-4 flex items-center gap-1.5 font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Legal & FAQ</span>
            </h3>
            <ul className="space-y-2.5">
              {legal.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 hover:text-teal-500 dark:hover:text-teal-300 transition-colors">
                  FAQ & Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-teal-300/70">
          <p>
            © {new Date().getFullYear()} MediaForge Pro. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Nexora Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
