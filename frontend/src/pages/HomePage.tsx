import { SEOHead } from '../components/seo/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { PlatformsSection } from '../components/home/PlatformsSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { StatsSection } from '../components/home/StatsSection';
import { FAQSection } from '../components/home/FAQSection';
import { Link } from 'react-router-dom';
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
} from '../lib/seo/schema';

const homepageFaqs = [
  { q: 'Is MediaForge Pro completely free?', a: 'Yes, MediaForge Pro is 100% free with no hidden fees, subscriptions, or account requirements.' },
  { q: 'Can I download TikTok videos without watermarks?', a: 'Yes! MediaForge Pro extracts clean, no-watermark TikTok videos in original HD resolution.' },
  { q: 'What platforms are supported?', a: 'MediaForge Pro supports video and audio downloads from TikTok, Instagram, and Facebook.' },
  { q: 'Do I need to install any software or mobile app?', a: 'No software installation is required. Everything runs directly in your web browser on mobile or PC.' },
];

export default function HomePage() {
  const title = 'MediaForge Pro – Free TikTok, Instagram & Facebook Video Downloader in HD';
  const description = 'Download TikTok videos without watermark, Instagram Reels, Stories, Photos, and Facebook videos in HD quality. Fast, free, secure online downloader with no signup required.';

  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const appSchema = generateSoftwareApplicationSchema();
  const faqSchema = generateFAQSchema(homepageFaqs);

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalPath="/"
        jsonLd={[orgSchema, websiteSchema, appSchema, faqSchema]}
      />

      <HeroSection />
      <PlatformsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />

      {/* Internal SEO Hub Navigation Block */}
      <section className="py-16 section-padding bg-slate-50/50 dark:bg-dark-950/60 border-t border-slate-200/60 dark:border-teal-500/15">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-teal-50 mb-2">
              Popular Video Downloader Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100/80">
              Explore specialized media extraction tools for TikTok, Instagram, and Facebook.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-semibold">
            {[
              { to: '/tiktok-downloader', label: 'TikTok Downloader' },
              { to: '/tiktok-downloader/hd', label: 'TikTok 1080p HD' },
              { to: '/tiktok-downloader/no-watermark', label: 'TikTok No Watermark' },
              { to: '/instagram-downloader', label: 'Instagram Downloader' },
              { to: '/instagram-reels-downloader', label: 'Instagram Reels' },
              { to: '/instagram-story-downloader', label: 'Instagram Stories' },
              { to: '/instagram-photo-downloader', label: 'Instagram Photos' },
              { to: '/facebook-downloader', label: 'Facebook Downloader' },
              { to: '/facebook-reels-downloader', label: 'Facebook Reels' },
              { to: '/facebook-video-downloader-hd', label: 'Facebook HD MP4' },
              { to: '/mp4-downloader', label: 'MP4 Downloader' },
              { to: '/hd-video-downloader', label: 'HD Video Downloader' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="p-3 rounded-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-teal-100 hover:border-teal-400 hover:text-teal-500 transition-all text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
