import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { initAnalytics, trackEvent } from '@/services/analytics';

// Lazy-load pages for better initial load performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const ConverterPage = lazy(() => import('@/pages/ConverterPage'));
const HowItWorksPage = lazy(() => import('@/pages/HowItWorksPage'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackEvent('page_visit', { path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/converter" element={<ConverterPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
