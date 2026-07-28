import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', rtl: false },
  { code: 'es', name: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'zh', name: '中文', flag: '🇨🇳', rtl: false },
  { code: 'ja', name: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', rtl: true },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleSelect = (lang: typeof LANGUAGES[0]) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.code;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-dark-200 bg-slate-100 dark:bg-dark-800 border border-slate-200/60 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-dark-700 transition-all"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-primary-500" />
        <span>{currentLang.flag} {currentLang.name}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 shadow-xl py-1.5 z-50 overflow-hidden"
          >
            {LANGUAGES.map((lang) => {
              const selected = lang.code === currentLang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                    selected
                      ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 font-bold'
                      : 'text-slate-700 dark:text-dark-200 hover:bg-slate-100 dark:hover:bg-dark-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {selected && <Check className="w-3.5 h-3.5 text-primary-500" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
