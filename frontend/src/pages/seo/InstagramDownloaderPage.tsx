import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'How do I download Instagram videos?', a: 'Copy the Instagram post or reel link, paste it into MediaForge Pro, and click Download.' },
  { q: 'Can I download Instagram Reels and Stories?', a: 'Yes, MediaForge Pro supports Instagram Reels, Stories, Posts, and Photos.' },
  { q: 'Is registration required?', a: 'No, MediaForge Pro operates completely login-free.' },
];

export default function InstagramDownloaderPage() {
  const title = 'Instagram Downloader — Save Instagram Videos, Reels & Stories';
  const description = 'Free Instagram downloader to save Instagram video posts, Reels, Stories, and photos in high definition. Fast, secure online media extraction.';
  const path = '/instagram-downloader';

  const breadcrumbs = [{ name: 'Instagram Downloader', url: path }];

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
              Free Instagram Downloader for Videos, Reels & Stories
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base">
              Save your favorite Instagram content directly to your phone camera roll or computer. MediaForge Pro extracts high resolution video streams and images without requiring any account login.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/instagram-reels-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Instagram Reels Downloader →
            </Link>
            <Link to="/instagram-story-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Instagram Story Downloader →
            </Link>
            <Link to="/instagram-photo-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Instagram Photo Downloader →
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
