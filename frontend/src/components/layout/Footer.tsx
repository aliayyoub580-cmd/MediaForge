import { Link } from 'react-router-dom';
import { Download, Github, Twitter, Heart } from 'lucide-react';

const platforms = [
  { to: '/?platform=youtube', label: 'YouTube Downloader' },
  { to: '/?platform=tiktok', label: 'TikTok Downloader' },
  { to: '/?platform=instagram', label: 'Instagram Downloader' },
  { to: '/?platform=facebook', label: 'Facebook Downloader' },
];

const legal = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/dmca', label: 'DMCA' },
];

export function Footer() {
  return (
    <footer className="border-t border-primary-200/20 dark:border-primary-800/20 bg-white/50 dark:bg-dark-950/50 backdrop-blur-sm mt-24">
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
                <Download className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">MediaForge Pro</span>
            </Link>
            <p className="text-sm text-dark-500 dark:text-dark-400 max-w-xs leading-relaxed">
              Professional Universal Video & Audio Downloader. Download HD videos from TikTok, YouTube, Instagram & Facebook instantly.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-dark-100 dark:bg-dark-800 flex items-center justify-center text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-dark-800 dark:text-dark-200 mb-4 text-sm uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5">
              {platforms.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-dark-800 dark:text-dark-200 mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              {legal.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/about" className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-dark-500 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-200/20 dark:border-primary-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-400 dark:text-dark-500">
            © {new Date().getFullYear()} MediaForge Pro. All rights reserved.
          </p>
          <p className="text-xs text-dark-400 dark:text-dark-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400" /> by Nexora Technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
