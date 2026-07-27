import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link2, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setTimeout(() => onSubmit(text), 100);
    } catch {
      inputRef.current?.focus();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-20 group-focus-within:opacity-60 blur transition-all duration-500" />

        <div className="relative flex flex-col sm:flex-row sm:items-center bg-white dark:bg-dark-800 rounded-2xl border border-primary-200/40 dark:border-primary-700/30 shadow-card overflow-hidden">
          <div className="flex-shrink-0 pl-4 text-primary-400 dark:text-primary-500">
            <Link2 className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube, TikTok, Instagram or Facebook URL..."
            className="min-w-0 w-full flex-1 px-4 py-4 bg-transparent text-dark-900 dark:text-dark-100 placeholder-dark-400 dark:placeholder-dark-500 focus:outline-none text-sm sm:text-base"
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
          />

          {url && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setUrl('')}
              className="flex-shrink-0 p-2 mr-1 rounded-lg text-dark-400 hover:text-dark-600 dark:text-dark-500 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 transition-all"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}

          <div className="w-full sm:w-auto flex-shrink-0 p-2 pt-0 sm:pt-2 sm:pr-3 flex items-center gap-2">
            {!url && (
              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-500 dark:text-primary-400 border border-primary-200/50 dark:border-primary-700/30 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
              >
                Paste
              </button>
            )}
            <Button type="submit" size="md" loading={isLoading} icon={<Sparkles className="w-4 h-4" />} className="w-full sm:w-auto whitespace-nowrap">
              {isLoading ? 'Processing...' : 'Download'}
            </Button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-dark-400 dark:text-dark-500 mt-3">
        Supports YouTube, TikTok, Instagram, and Facebook • 100% free
      </p>
    </motion.form>
  );
}
