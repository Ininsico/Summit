import { lazy, Suspense, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import Header from '../../Componenets/Header';
import HeroSection from './HeroSection';

// Lazy load heavy sections for better initial load performance
const AboutSection = lazy(() => import('./AboutSection'));
const TripsSection = lazy(() => import('./TripsSection'));
const HotelsSection = lazy(() => import('./HotelsSection'));
const CTASection = lazy(() => import('./CTASection'));
const Footer = lazy(() => import('./Footer'));

// Loading fallback component
const SectionLoader = () => (
  <div style={{
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0e27'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid rgba(74, 144, 226, 0.2)',
      borderTop: '4px solid #4A90E2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const LandingPage = () => {
  const { setIsLoading, setReducedMotion } = useAppStore();

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Set loading to false once page is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [setIsLoading, setReducedMotion]);

  return (
    <div style={{ backgroundColor: '#0a0e27' }}>
      <Header />
      <HeroSection />

      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TripsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <HotelsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default LandingPage;