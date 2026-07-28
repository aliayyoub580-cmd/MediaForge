import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', about: 'About', faq: 'FAQ', history: 'History' },
      hero: {
        badge: 'Fast, Free & Watermark-Free Downloader',
        title: 'Download HD Videos & Audio',
        subtitle: 'TikTok, Instagram & Facebook — 100% Free, Fast & Watermark-Free',
        placeholder: 'Paste your video URL here...',
        cta: 'Download',
      },
    },
  },
  es: {
    translation: {
      nav: { home: 'Inicio', about: 'Nosotros', faq: 'Preguntas', history: 'Historial' },
      hero: {
        badge: 'Descargador Rápido y Gratis sin Marca de Agua',
        title: 'Descarga Videos HD y Audio',
        subtitle: 'TikTok, Instagram y Facebook — 100% Gratis y Rápido',
        placeholder: 'Pega tu URL de video aquí...',
        cta: 'Descargar',
      },
    },
  },
  ar: {
    translation: {
      nav: { home: 'الرئيسية', about: 'حول', faq: 'الأسئلة الشائعة', history: 'السجل' },
      hero: {
        badge: 'أداة تحميل سريعة ومجانية بدون علامة مائية',
        title: 'تحميل فيديوهات وصوت بجودة عالية',
        subtitle: 'تيك توك، إنستغرام وفيس بوك — مجاني 100% وبدون علامة مائية',
        placeholder: 'الصق رابط الفيديو هنا...',
        cta: 'تحميل',
      },
    },
  },
  fr: {
    translation: {
      nav: { home: 'Accueil', about: 'À propos', faq: 'FAQ', history: 'Historique' },
      hero: {
        badge: 'Téléchargeur Rapide, Gratuit et Sans Filigrane',
        title: 'Télécharger Vidéos HD et Audio',
        subtitle: 'TikTok, Instagram & Facebook — 100% Gratuit et Rapide',
        placeholder: 'Collez le lien de votre vidéo ici...',
        cta: 'Télécharger',
      },
    },
  },
  de: {
    translation: {
      nav: { home: 'Startseite', about: 'Über uns', faq: 'FAQ', history: 'Verlauf' },
      hero: {
        badge: 'Schneller, kostenloser Downloader ohne Wasserzeichen',
        title: 'HD Videos & Audio Herunterladen',
        subtitle: 'TikTok, Instagram & Facebook — 100% Kostenlos & Schnell',
        placeholder: 'Fügen Sie Ihren Video-Link hier ein...',
        cta: 'Herunterladen',
      },
    },
  },
  zh: {
    translation: {
      nav: { home: '首页', about: '关于', faq: '常见问题', history: '历史记录' },
      hero: {
        badge: '快速、免费且无水印下载器',
        title: '下载高清视频与音频',
        subtitle: 'TikTok、Instagram 与 Facebook — 100% 免费快速无水印',
        placeholder: '在此粘贴您的视频链接...',
        cta: '立即下载',
      },
    },
  },
  ja: {
    translation: {
      nav: { home: 'ホーム', about: '概要', faq: 'よくある質問', history: '履歴' },
      hero: {
        badge: '高速・無料・透かしなしダウンローダー',
        title: 'HD動画与音声ダウンロード',
        subtitle: 'TikTok、Instagram、Facebook — 100%無料＆高速',
        placeholder: '動画のURLをここに貼り付け...',
        cta: 'ダウンロード',
      },
    },
  },
  ur: {
    translation: {
      nav: { home: 'ہوم', about: 'ہمارے بارے میں', faq: 'سوالات', history: 'ہسٹری' },
      hero: {
        badge: 'تیز، مفت اور بغیر واٹرمارک ڈاؤنلوڈر',
        title: 'ایچ ڈی ویڈیوز اور آڈیو ڈاؤن لوڈ کریں',
        subtitle: 'ٹک ٹاک، انسٹاگرام اور فیس بک — 100% مفت اور تیز',
        placeholder: 'اپنی ویڈیو کا لنک یہاں پیسٹ کریں...',
        cta: 'ڈاؤن لوڈ',
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
