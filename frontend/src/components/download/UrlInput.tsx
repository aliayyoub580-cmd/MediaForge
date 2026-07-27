import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Link2, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [youtubeNotice, setYoutubeNotice] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitUrl = (value: string) => {
    if (isYouTubeUrl(value)) {
      setYoutubeNotice(true);
      return;
    }
    setYoutubeNotice(false);
    onSubmit(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitUrl(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      submitUrl(text);
    } catch {
      inputRef.current?.focus();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="mx-auto w-full max-w-3xl"
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:border-dark-700 dark:bg-dark-800">
        <div className="flex flex-col overflow-hidden rounded-xl sm:flex-row sm:items-center">
          <div className="flex-shrink-0 pl-4 text-slate-400 dark:text-dark-500">
            <Link2 className="h-5 w-5" />
          </div>
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(event) => { setUrl(event.target.value); setYoutubeNotice(false); }}
            placeholder="Paste a TikTok, Instagram, or Facebook link"
            className="min-w-0 w-full flex-1 bg-transparent px-4 py-4 text-sm text-dark-900 outline-none placeholder:text-slate-400 sm:text-base dark:text-dark-100 dark:placeholder:text-dark-500"
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
          />
          {url && (
            <button
              type="button"
              onClick={() => { setUrl(''); setYoutubeNotice(false); }}
              aria-label="Clear URL"
              className="mr-1 rounded-lg p-2 text-dark-400 transition-colors hover:bg-slate-100 hover:text-dark-600 dark:text-dark-500 dark:hover:bg-dark-700 dark:hover:text-dark-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="flex w-full flex-shrink-0 items-center gap-2 p-2 pt-0 sm:w-auto sm:pt-2 sm:pr-3">
            {!url && (
              <button type="button" onClick={handlePaste} className="hidden rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:flex dark:text-dark-300 dark:hover:bg-dark-700">
                Paste
              </button>
            )}
            <Button type="submit" size="md" loading={isLoading} icon={<ArrowRight className="h-4 w-4" />} className="w-full whitespace-nowrap sm:w-auto">
              {isLoading ? 'Checking…' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>

      {youtubeNotice ? (
        <div role="status" className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <span><strong className="font-semibold">YouTube is not available yet.</strong> Please use a TikTok, Instagram, or Facebook link instead.</span>
        </div>
      ) : (
        <p className="mt-3 text-center text-xs text-dark-400 dark:text-dark-500">TikTok, Instagram, and Facebook links supported</p>
      )}
    </motion.form>
  );
}

function isYouTubeUrl(value: string) {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === 'youtu.be' || hostname.endsWith('.youtu.be') || hostname === 'youtube.com' || hostname.endsWith('.youtube.com');
  } catch {
    return /youtube\.com|youtu\.be/i.test(value);
  }
}
