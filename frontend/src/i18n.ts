import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', about: 'About', faq: 'FAQ', history: 'History', admin: 'Admin' },
      hero: {
        badge: 'Professional Media Downloader',
        title: 'Download Any Video,',
        titleHighlight: 'Anywhere',
        subtitle: 'Download HD videos and audio from TikTok, YouTube, Instagram & Facebook. No watermarks. No signup.',
        placeholder: 'Paste your video URL here...',
        cta: 'Download Now',
        ctaSecondary: 'How it works',
        trustedBy: 'Trusted by',
        users: '2M+ users worldwide',
      },
      platforms: { title: 'Supported Platforms', subtitle: 'Works with all major social platforms' },
      features: {
        title: 'Why Choose MediaForge Pro?',
        subtitle: 'Professional-grade features for everyone',
        hd: { title: 'HD Quality', desc: 'Download in original quality up to 1080p' },
        fast: { title: 'Lightning Fast', desc: 'Optimized extraction for instant downloads' },
        safe: { title: 'Privacy First', desc: 'No tracking, no accounts, no data stored' },
        formats: { title: 'Multiple Formats', desc: 'Video, audio-only, or just the thumbnail' },
        qr: { title: 'QR Codes', desc: 'Generate QR codes for mobile downloads' },
        free: { title: '100% Free', desc: 'No hidden fees, no subscriptions needed' },
      },
      howItWorks: {
        title: 'How It Works',
        step1: { title: 'Paste URL', desc: 'Copy the video link from any supported platform' },
        step2: { title: 'Select Format', desc: 'Choose your preferred quality and format' },
        step3: { title: 'Download', desc: 'Click download and save to your device' },
      },
      download: {
        title: 'Download Media',
        processing: 'Processing your URL...',
        selectFormat: 'Select Format & Quality',
        video: 'Video',
        audio: 'Audio Only',
        thumbnail: 'Thumbnail',
        download: 'Download',
        copyLink: 'Copy Link',
        share: 'Share',
        qrCode: 'QR Code',
        by: 'by',
      },
      errors: {
        invalid_url: 'Please enter a valid video URL',
        unsupported: 'This platform is not supported',
        private: 'This video is private',
        age_restricted: 'This video is age-restricted',
        deleted: 'This video has been deleted',
        rate_limited: 'Too many requests. Please try again in a moment.',
        extraction_failed: 'Failed to process this video. Please try again.',
      },
      faq: { title: 'Frequently Asked Questions' },
      history: { title: 'Download History', empty: 'No downloads yet', clear: 'Clear History' },
      footer: {
        tagline: 'Professional Universal Video & Audio Downloader',
        legal: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        dmca: 'DMCA',
        support: 'Support',
        contact: 'Contact',
        about: 'About',
        tools: 'Tools',
        youtube: 'YouTube Downloader',
        tiktok: 'TikTok Downloader',
        instagram: 'Instagram Downloader',
        facebook: 'Facebook Downloader',
      },
    },
  },
  es: {
    translation: {
      hero: {
        title: 'Descarga Cualquier Video,',
        titleHighlight: 'En Cualquier Lugar',
        subtitle: 'Descarga videos HD y audio de TikTok, YouTube, Instagram y Facebook.',
        placeholder: 'Pega tu URL de video aquí...',
        cta: 'Descargar Ahora',
      },
    },
  },
  ar: {
    translation: {
      hero: {
        title: 'تحميل أي فيديو،',
        titleHighlight: 'في أي مكان',
        subtitle: 'تحميل مقاطع الفيديو والصوت بجودة عالية من TikTok وYouTube وInstagram وFacebook.',
        placeholder: 'الصق رابط الفيديو هنا...',
        cta: 'تحميل الآن',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'] },
  });

export default i18n;
