import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQSection } from '../components/home/FAQSection';
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '../lib/seo/schema';

const faqs = [
  { q: 'Is MediaForge Pro completely free?', a: 'Yes, MediaForge Pro is 100% free with no hidden fees, subscriptions, or account requirements.' },
  { q: 'Can I download TikTok videos without watermarks?', a: 'Yes, MediaForge Pro extracts clean TikTok videos in original HD resolution.' },
  { q: 'What platforms are supported?', a: 'MediaForge Pro supports video and audio downloads from TikTok, Instagram, and Facebook.' },
  { q: 'Do I need to install any software or mobile app?', a: 'No software installation is required. Everything runs directly in your web browser on mobile or PC.' },
  { q: 'Is downloading videos legal?', a: 'Downloading videos for personal offline backup is generally considered fair use. Always respect copyright and content creator rights.' },
];

export default function FAQPage() {
  const title = 'Frequently Asked Questions & Guide — MediaForge Pro';
  const description = 'Find answers to common questions about downloading TikTok videos without watermark, Instagram Reels, and Facebook videos in HD.';
  const path = '/faq';

  const breadcrumbs = [{ name: 'FAQ', url: path }];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonicalPath={path}
        jsonLd={[generateBreadcrumbSchema(breadcrumbs), generateFAQSchema(faqs), generateWebPageSchema(title, description, path)]}
      />
      <div className="pt-24 pb-8 section-padding bg-slate-50/50 dark:bg-dark-900">
        <div className="container-max">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
      <div className="pt-4">
        <FAQSection />
      </div>
    </>
  );
}
