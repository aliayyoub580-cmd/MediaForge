import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'How to download Instagram Reels in HD?', a: 'Copy the Reel link from Instagram, paste it into MediaForge Pro, and save the 1080p MP4 file.' },
  { q: 'Can I download Reels audio as MP3?', a: 'Yes, select the Audio tab after processing to download the MP3 track.' },
];

export default function InstagramReelsPage() {
  const title = 'Instagram Reels Downloader — Save Reels Videos in 1080p HD';
  const description = 'Download Instagram Reels videos in high definition 1080p quality. Fast, free online Instagram Reel downloader with zero account login.';
  const path = '/instagram-reels-downloader';

  const breadcrumbs = [
    { name: 'Instagram Downloader', url: '/instagram-downloader' },
    { name: 'Instagram Reels', url: path },
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
              Download Instagram Reels Videos in Full HD Quality
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base">
              Instagram Reels feature creative trends and inspiring short clips. MediaForge Pro lets you extract and save Reels videos in high definition MP4 format with audio intact.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/instagram-story-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Instagram Story Downloader →
            </Link>
            <Link to="/hd-video-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              HD Video Downloader →
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
