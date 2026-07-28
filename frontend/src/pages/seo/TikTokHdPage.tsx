import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'How do I download TikTok videos in 1080p HD?', a: 'Paste the TikTok video link into MediaForge Pro, click Download, and select the 1080p HD option.' },
  { q: 'Is there any quality loss when downloading?', a: 'No, MediaForge Pro extracts raw source bitrate so your videos remain crystal clear.' },
  { q: 'Can I download TikTok HD audio MP3 separately?', a: 'Yes, you can extract 320kbps MP3 audio separately from any video.' },
];

export default function TikTokHdPage() {
  const title = 'Download TikTok Video HD — TikTok Downloader 1080p';
  const description = 'Download TikTok videos in 1080p HD quality. Save full resolution TikTok videos without watermark for free online.';
  const path = '/tiktok-downloader/hd';

  const breadcrumbs = [
    { name: 'TikTok Downloader', url: '/tiktok-downloader' },
    { name: 'TikTok HD', url: path },
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
              Download TikTok Videos in Full 1080p HD Resolution
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base mb-4">
              High definition video preservation is vital for creators and viewers alike. Standard mobile downloads compress video bitrate and reduce sharpness. MediaForge Pro locates original 1080p HD video manifests for download.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/tiktok-downloader/no-watermark" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              TikTok No Watermark →
            </Link>
            <Link to="/hd-video-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Universal HD Video Downloader →
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
