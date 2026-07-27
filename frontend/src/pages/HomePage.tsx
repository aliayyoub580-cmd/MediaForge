import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/home/HeroSection';
import { PlatformsSection } from '../components/home/PlatformsSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { StatsSection } from '../components/home/StatsSection';
import { FAQSection } from '../components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>MediaForge Pro — Universal Video & Audio Downloader</title>
        <meta name="description" content="Download HD videos and audio from TikTok, Instagram & Facebook. No watermarks, no signup, 100% free." />
        <meta property="og:title" content="MediaForge Pro — Universal Video & Audio Downloader" />
        <meta property="og:description" content="Download HD videos and audio from TikTok, Instagram & Facebook for free." />
        <link rel="canonical" href="https://mediaforge.pro/" />
      </Helmet>
      <HeroSection />
      <PlatformsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <FAQSection />
    </>
  );
}
