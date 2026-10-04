import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
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
    <div className="flex flex-col items-center justify-center min-h-[65vh] gap-3">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-sm" />
      </div>
      <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Loading</span>
    </div>
  );
}

function ScrollToTop({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);
  return null;
}

function App() {
  const location = useLocation();
  const lenisRef = { current: null as Lenis | null };

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackEvent('page_visit', { path: location.pathname });
  }, [location.pathname]);

  // Unified Lenis Smooth Scrolling Momentum
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#070709] text-[#f4f4f5] selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
      {/* Fixed Ambient Chromatic Underglows for Everywhere Glassmorphism */}
      <div className="fixed top-[-8%] left-[-8%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-indigo-600/14 blur-[140px] pointer-events-none -z-10 animate-float-1" />
      <div className="fixed top-[35%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none -z-10 animate-float-2" />
      <div className="fixed bottom-[-10%] left-[15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-pink-600/8 blur-[160px] pointer-events-none -z-10 animate-float-1" />
      <div className="fixed inset-0 bg-radial-mesh opacity-40 pointer-events-none -z-10" />

      <ScrollToTop lenisRef={lenisRef} />
      <Header />
      <main className="flex-1 relative z-10">
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
