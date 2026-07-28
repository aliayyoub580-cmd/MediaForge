import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const faqs = [
  { q: 'How to download Facebook Reels?', a: 'Copy the Facebook Reel URL, paste it into MediaForge Pro, and click Download.' },
  { q: 'Can I extract MP3 audio from Facebook Reels?', a: 'Yes, select the Audio tab to download the audio track.' },
];

export default function FacebookReelsPage() {
  const title = 'Facebook Reels Downloader — Download Facebook Reels in HD';
  const description = 'Download Facebook Reels videos in high definition HD quality. Free online Facebook reel downloader with no app required.';
  const path = '/facebook-reels-downloader';

  const breadcrumbs = [
    { name: 'Facebook Downloader', url: '/facebook-downloader' },
    { name: 'Facebook Reels', url: path },
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
              Download Facebook Reels Short Videos Online
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base">
              Save trending Facebook Reels and short videos in clear 1080p or 720p HD resolution directly to your phone or desktop.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/facebook-video-downloader-hd" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Facebook HD MP4 Downloader →
            </Link>
            <Link to="/facebook-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
              Facebook Downloader →
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
