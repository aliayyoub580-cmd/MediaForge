import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Lazy-loaded Pages
const HomePage                 = lazy(() => import('./pages/HomePage'));
const TikTokDownloaderPage     = lazy(() => import('./pages/seo/TikTokDownloaderPage'));
const TikTokHdPage             = lazy(() => import('./pages/seo/TikTokHdPage'));
const TikTokNoWatermarkPage    = lazy(() => import('./pages/seo/TikTokNoWatermarkPage'));
const InstagramDownloaderPage  = lazy(() => import('./pages/seo/InstagramDownloaderPage'));
const InstagramReelsPage       = lazy(() => import('./pages/seo/InstagramReelsPage'));
const InstagramStoryPage       = lazy(() => import('./pages/seo/InstagramStoryPage'));
const InstagramPhotoPage       = lazy(() => import('./pages/seo/InstagramPhotoPage'));
const FacebookDownloaderPage   = lazy(() => import('./pages/seo/FacebookDownloaderPage'));
const FacebookReelsPage        = lazy(() => import('./pages/seo/FacebookReelsPage'));
const FacebookVideoHdPage      = lazy(() => import('./pages/seo/FacebookVideoHdPage'));
const Mp4DownloaderPage        = lazy(() => import('./pages/seo/Mp4DownloaderPage'));
const HdVideoDownloaderPage    = lazy(() => import('./pages/seo/HdVideoDownloaderPage'));
const BlogIndexPage            = lazy(() => import('./pages/blog/BlogIndexPage'));
const BlogPostPage             = lazy(() => import('./pages/blog/BlogPostPage'));
const HistoryPage              = lazy(() => import('./pages/HistoryPage'));
const AboutPage                = lazy(() => import('./pages/AboutPage'));
const FAQPage                  = lazy(() => import('./pages/FAQPage'));
const PrivacyPage              = lazy(() => import('./pages/PrivacyPage'));
const TermsPage                = lazy(() => import('./pages/TermsPage'));
const DMCAPage                  = lazy(() => import('./pages/DMCAPage'));
const AdminLogin               = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard            = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFound                 = lazy(() => import('./pages/NotFoundPage'));

function RawStaticRedirect() {
  useEffect(() => {
    window.location.reload();
  }, []);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="w-8 h-8 rounded-full border-2 border-teal-300 border-t-teal-500 animate-spin" />
    </div>
  );
}

const adminRoutes = ['/admin', '/admin/dashboard'];

export default function App() {
  const location = useLocation();
  const isAdmin = adminRoutes.some((r) => location.pathname.startsWith(r));

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 text-slate-900 dark:text-teal-50">
      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />

              {/* Dedicated Category & Feature SEO Landing Pages */}
              <Route path="/tiktok-downloader" element={<PageWrapper><TikTokDownloaderPage /></PageWrapper>} />
              <Route path="/tiktok-downloader/hd" element={<PageWrapper><TikTokHdPage /></PageWrapper>} />
              <Route path="/tiktok-downloader/no-watermark" element={<PageWrapper><TikTokNoWatermarkPage /></PageWrapper>} />
              <Route path="/instagram-downloader" element={<PageWrapper><InstagramDownloaderPage /></PageWrapper>} />
              <Route path="/instagram-reels-downloader" element={<PageWrapper><InstagramReelsPage /></PageWrapper>} />
              <Route path="/instagram-story-downloader" element={<PageWrapper><InstagramStoryPage /></PageWrapper>} />
              <Route path="/instagram-photo-downloader" element={<PageWrapper><InstagramPhotoPage /></PageWrapper>} />
              <Route path="/facebook-downloader" element={<PageWrapper><FacebookDownloaderPage /></PageWrapper>} />
              <Route path="/facebook-reels-downloader" element={<PageWrapper><FacebookReelsPage /></PageWrapper>} />
              <Route path="/facebook-video-downloader-hd" element={<PageWrapper><FacebookVideoHdPage /></PageWrapper>} />
              <Route path="/mp4-downloader" element={<PageWrapper><Mp4DownloaderPage /></PageWrapper>} />
              <Route path="/hd-video-downloader" element={<PageWrapper><HdVideoDownloaderPage /></PageWrapper>} />

              {/* Blog System */}
              <Route path="/blog" element={<PageWrapper><BlogIndexPage /></PageWrapper>} />
              <Route path="/blog/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />

              {/* Auxiliary & Legal Pages */}
              <Route path="/history" element={<PageWrapper><HistoryPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
              <Route path="/dmca" element={<PageWrapper><DMCAPage /></PageWrapper>} />

              {/* Static file hard redirect routes */}
              <Route path="/sitemap.xml" element={<RawStaticRedirect />} />
              <Route path="/sitemap-index.xml" element={<RawStaticRedirect />} />
              <Route path="/sitemap-pages.xml" element={<RawStaticRedirect />} />
              <Route path="/sitemap-blog.xml" element={<RawStaticRedirect />} />
              <Route path="/robots.txt" element={<RawStaticRedirect />} />

              {/* Admin Portal */}
              <Route path="/admin" element={<PageWrapper><AdminLogin /></PageWrapper>} />
              <Route path="/admin/dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />

              {/* 404 Handler */}
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}
