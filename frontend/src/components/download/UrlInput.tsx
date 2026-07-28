import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clipboard, Sparkles, X, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { PlatformIcon } from './PlatformIcon';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const SAMPLE_LINKS = [
  { label: 'TikTok Video', platform: 'tiktok', url: 'https://www.tiktok.com/@scout2015/video/6718335390845095173' },
  { label: 'Instagram Reel', platform: 'instagram', url: 'https://www.instagram.com/p/B8qK_5_lX9_/' },
  { label: 'Facebook Reel', platform: 'facebook', url: 'https://www.facebook.com/facebook/videos/10153231379946729/' },
];

function detectPlatform(value: string): string | null {
  const lower = value.toLowerCase();
  if (lower.includes('tiktok.com')) return 'tiktok';
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'instagram';
  if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com')) return 'facebook';
  return null;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [justPasted, setJustPasted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const detectedPlatform = detectPlatform(url);

  const submitUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitUrl(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setJustPasted(true);
        setTimeout(() => setJustPasted(false), 2000);
        submitUrl(text);
      }
    } catch {
      inputRef.current?.focus();
    }
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    submitUrl(sampleUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mx-auto w-full max-w-5xl"
    >
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow halo outline */}
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />

        <div className="studio-dock p-2 sm:p-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Input & Platform Detector */}
            <div className="flex flex-1 items-center gap-3 px-3 py-1.5 min-w-0">
              <AnimatePresence mode="wait">
                {detectedPlatform ? (
                  <motion.div
                    key={detectedPlatform}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-xs font-semibold capitalize font-mono text-teal-700 dark:text-teal-300"
                  >
                    <PlatformIcon platform={detectedPlatform} size={14} />
                    <span className="hidden xs:inline">{detectedPlatform}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex-shrink-0 text-teal-500 dark:text-teal-400"
                  >
                    <Sparkles className="w-5 h-5 text-teal-500 dark:text-teal-400 animate-pulse-slow" />
                  </motion.div>
                )}
              </AnimatePresence>

              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Paste TikTok, Instagram, or Facebook link…"
                className="w-full min-w-0 flex-1 bg-transparent py-2.5 text-sm sm:text-base text-slate-900 dark:text-teal-50 placeholder:text-slate-400 dark:placeholder:text-teal-200/50 outline-none"
                disabled={isLoading}
                autoComplete="off"
                spellCheck={false}
              />

              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  aria-label="Clear URL"
                  className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-teal-300 dark:hover:bg-dark-700 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 p-1 pt-0 sm:pt-1">
              {!url && (
                <button
                  type="button"
                  onClick={handlePaste}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-teal-100 bg-slate-100 hover:bg-slate-200 dark:bg-dark-800 dark:hover:bg-dark-700 transition-all border border-slate-200/60 dark:border-white/10"
                >
                  {justPasted ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5 text-teal-400" />}
                  <span>{justPasted ? 'Pasted!' : 'Paste'}</span>
                </button>
              )}

              <Button
                type="submit"
                size="md"
                loading={isLoading}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto px-6 py-3 font-semibold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl shadow-glow transition-all"
              >
                {isLoading ? 'Processing…' : 'Download'}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Sample Links Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-teal-200/70 font-mono text-[11px] uppercase tracking-wider">Try Sample:</span>
        {SAMPLE_LINKS.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => handleSampleClick(sample.url)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-teal-100 hover:border-teal-400 dark:hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-all shadow-sm font-medium"
          >
            <PlatformIcon platform={sample.platform} size={12} />
            <span>{sample.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
