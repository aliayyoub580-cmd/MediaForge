import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'What is an MP4 video downloader?', a: 'An MP4 downloader converts web video links into standardized MP4 files playable on any device.' },
  { q: 'Is MP4 compatible with iPhone and Android?', a: 'Yes, MP4 is the most widely supported video container format globally.' },
];

export default function Mp4DownloaderPage() {
  const title = 'MP4 Video Downloader Online — Free MP4 Downloader';
  const description = 'Download videos in universal MP4 format online for free. Save TikTok, Instagram, and Facebook videos as high quality MP4 files.';
  const path = '/mp4-downloader';

  const breadcrumbs = [{ name: 'MP4 Downloader', url: path }];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalPath={path}
        jsonLd={[generateBreadcrumbSchema(breadcrumbs), generateFAQSchema(faqs), generateWebPageSchema(title, description, path)]}
      />
      <div className="pt-24 pb-12 section-padding bg-slate-50/50 dark:bg-dark-900">
        <div className="container-max">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
      <HeroSection />
      <section className="py-16 section-padding">
        <div className="container-max">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-teal-50 mb-4">
              Universal Online MP4 Video Downloader
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base">
              MP4 is the standard video format for modern playback on mobile phones, tablets, smart TVs, and computers. MediaForge Pro extracts social media clips and encodes clean MP4 files for direct download.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/hd-video-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              HD Video Downloader →
            </Link>
            <Link to="/tiktok-downloader/no-watermark" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              TikTok No Watermark →
            </Link>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-teal-50 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-card p-5 rounded-xl border border-teal-500/20">
                  <h3 className="font-semibold text-slate-900 dark:text-teal-50 mb-1">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
