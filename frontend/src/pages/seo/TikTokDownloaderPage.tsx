import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { HeroSection } from '../../components/home/HeroSection';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Zap, Download } from 'lucide-react';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../../lib/seo/schema';

const pageFaqs = [
  { q: 'How to download TikTok videos online?', a: 'Copy the TikTok video URL, paste it into MediaForge Pro search bar, and click Download to save the video.' },
  { q: 'Is this TikTok downloader free?', a: 'Yes, MediaForge Pro is 100% free with unlimited downloads.' },
  { q: 'Does it remove TikTok watermarks?', a: 'Yes, our extractor saves videos cleanly without the bouncing TikTok logo.' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes, it runs in any web browser on iOS, Android, Mac, and Windows.' },
];

export default function TikTokDownloaderPage() {
  const title = 'TikTok Downloader — Download TikTok Video Online Free';
  const description = 'Download TikTok videos online for free. Save TikTok videos in high quality MP4 format without watermarks or app installation.';
  const path = '/tiktok-downloader';

  const breadcrumbs = [{ name: 'TikTok Downloader', url: path }];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQSchema(pageFaqs);
  const webPageSchema = generateWebPageSchema(title, description, path);

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalPath={path}
        jsonLd={[breadcrumbSchema, faqSchema, webPageSchema]}
      />

      <div className="pt-24 pb-12 section-padding bg-slate-50/50 dark:bg-dark-900">
        <div className="container-max">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <HeroSection />

      {/* SEO Body Content & FAQ */}
      <section className="py-16 section-padding">
        <div className="container-max space-y-12">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-teal-50 mb-4">
              Download TikTok Videos Online in High Quality
            </h2>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed mb-4 text-sm sm:text-base">
              TikTok is home to millions of short-form creative videos, viral trends, and educational clips. MediaForge Pro provides a fast, free, and secure way to download TikTok videos directly to your device without installing extra apps or registering for an account.
            </p>
            <p className="text-slate-600 dark:text-teal-100/80 leading-relaxed text-sm sm:text-base">
              Whether you are looking to save your favorite dance challenges, recipe guides, or hilarious comedy sketches, our TikTok video downloader processes your links in seconds and serves clean MP4 files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 border border-teal-500/20">
              <Zap className="w-6 h-6 text-teal-400 mb-3" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-teal-50 mb-2">Fast Processing</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80">Direct video link extraction gets your downloads ready instantly.</p>
            </div>
            <div className="glass-card p-6 border border-teal-500/20">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-teal-50 mb-2">No Watermark</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80">Save pristine videos without logo overlays or creator handles.</p>
            </div>
            <div className="glass-card p-6 border border-teal-500/20">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mb-3" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-teal-50 mb-2">100% Secure</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80">No registration, login credentials, or personal tracking required.</p>
            </div>
          </div>

          {/* Related Tools Links */}
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-dark-800 border border-slate-200 dark:border-white/10">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-teal-50 mb-3">Related TikTok Tools</h3>
            <div className="flex flex-wrap gap-3 text-xs font-semibold">
              <Link to="/tiktok-downloader/hd" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-750 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
                Download TikTok Video HD 1080p →
              </Link>
              <Link to="/tiktok-downloader/no-watermark" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-750 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
                TikTok Downloader Without Watermark →
              </Link>
              <Link to="/mp4-downloader" className="px-3.5 py-2 rounded-xl bg-white dark:bg-dark-750 text-teal-600 dark:text-teal-300 border border-teal-500/30 hover:scale-105 transition-all">
                MP4 Video Downloader →
              </Link>
            </div>
          </div>

          {/* Visible FAQ */}
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-teal-50 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {pageFaqs.map((faq, i) => (
                <div key={i} className="glass-card p-5 rounded-xl border border-teal-500/20">
                  <h3 className="font-display font-semibold text-slate-900 dark:text-teal-50 mb-1 flex items-center gap-2">
                    <Download className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
