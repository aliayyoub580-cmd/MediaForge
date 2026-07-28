import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'How to save Instagram Stories before 24 hours expire?', a: 'Copy the story link, paste it into MediaForge Pro, and download the story video or photo.' },
  { q: 'Is story downloading anonymous?', a: 'Yes, MediaForge Pro processes public links without requiring account login or tracking.' },
];

export default function InstagramStoryPage() {
  const title = 'Instagram Story Downloader — Save Instagram Stories Online';
  const description = 'Download Instagram Stories online for free. Save story videos and photos before they expire in high resolution.';
  const path = '/instagram-story-downloader';

  const breadcrumbs = [
    { name: 'Instagram Downloader', url: '/instagram-downloader' },
    { name: 'Instagram Stories', url: path },
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
              Save Instagram Stories Quickly and Anonymously
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base">
              Instagram Stories expire after 24 hours. MediaForge Pro lets you save favorite stories directly to your phone or PC before they disappear.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/instagram-reels-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Instagram Reels Downloader →
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
