import { Helmet } from 'react-helmet-async';
import { FAQSection } from '../components/home/FAQSection';

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>FAQ — MediaForge Pro</title>
        <meta name="description" content="Frequently asked questions about MediaForge Pro video downloader." />
      </Helmet>
      <div className="pt-16">
        <FAQSection />
      </div>
    </>
  );
}
