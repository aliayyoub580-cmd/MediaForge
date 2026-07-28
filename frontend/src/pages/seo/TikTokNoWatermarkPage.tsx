import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'How to save TikTok video without logo?', a: 'Paste the TikTok video link into MediaForge Pro, click Download, and get a clean MP4 file without bouncing TikTok logos.' },
  { q: 'Is it free to remove TikTok watermark?', a: 'Yes, MediaForge Pro removes watermarks 100% free with unlimited downloads.' },
];

export default function TikTokNoWatermarkPage() {
  const title = 'Download TikTok Video Without Watermark — Save TikTok No Logo';
  const description = 'Download TikTok videos without watermark online for free. Save TikTok videos cleanly without bouncing logos in high definition MP4.';
  const path = '/tiktok-downloader/no-watermark';

  const breadcrumbs = [
    { name: 'TikTok Downloader', url: '/tiktok-downloader' },
    { name: 'No Watermark', url: path },
  ];

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
              Save Clean TikTok Videos Without Logos or Watermarks
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base mb-4">
              When storing video content for offline viewing or editing backups, removing logo overlays ensures a clean viewing experience. MediaForge Pro bypasses visual overlays to deliver pure source MP4 video streams.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/tiktok-downloader/hd" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              TikTok HD 1080p →
            </Link>
            <Link to="/mp4-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              MP4 Downloader →
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
