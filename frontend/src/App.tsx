import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

const HomePage      = lazy(() => import('./pages/HomePage'));
const HistoryPage   = lazy(() => import('./pages/HistoryPage'));
const AboutPage     = lazy(() => import('./pages/AboutPage'));
const FAQPage       = lazy(() => import('./pages/FAQPage'));
const AdminLogin    = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFound      = lazy(() => import('./pages/NotFoundPage'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary-300 border-t-primary-600 animate-spin" />
    </div>
  );
}

const adminRoutes = ['/admin', '/admin/dashboard'];

export default function App() {
  const location = useLocation();
  const isAdmin = adminRoutes.some((r) => location.pathname.startsWith(r));

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
              <Route path="/history" element={<PageWrapper><HistoryPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQPage /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><AdminLogin /></PageWrapper>} />
              <Route path="/admin/dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}
