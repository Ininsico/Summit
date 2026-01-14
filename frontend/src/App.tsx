import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from "./Pages/LandingPage/LandingPage";
import AboutPage from './Pages/AboutPage/AboutPage';
import { useAppStore } from './store/useAppStore';
import { shouldReduceAnimations } from './utils/performanceUtils';
import { initGSAPDefaults } from './utils/gsapUtils';
import { performanceMonitor } from './performance/PerformanceMonitor';
import { resourceManager } from './performance/ResourceLoader';
import { cacheManager } from './performance/CacheManager';

const App = () => {
  const { setReducedMotion, setAnimationsEnabled } = useAppStore();

  useEffect(() => {
    performanceMonitor.measure('App Initialization', () => {
      // Initialize GSAP with optimized defaults
      initGSAPDefaults();

      // Preload critical resources
      resourceManager.preloadCriticalResources().catch(console.error);

      // Initialize caches
      cacheManager.createLRUCache('api-cache', { maxAge: 5 * 60 * 1000, maxSize: 50 });
      cacheManager.createLRUCache('image-cache', { maxAge: 10 * 60 * 1000, maxSize: 100 });

      // Check for reduced motion preference or low-end device
      const shouldReduce = shouldReduceAnimations();
      setReducedMotion(shouldReduce);
      setAnimationsEnabled(!shouldReduce);

      // Log performance metrics in development
      if (import.meta.env.DEV) {
        console.log('[Performance] App initialized');
        console.log('[Performance] Reduced Motion:', shouldReduce);
        console.log('[Performance] Low-end device:', performanceMonitor.isLowEndDevice());

        // Log page load metrics after a delay
        setTimeout(() => {
          const loadMetrics = performanceMonitor.getPageLoadMetrics();
          console.log('[Performance] Page Load Metrics:', loadMetrics);
        }, 1000);
      }
    });

    // Cleanup on unmount
    return () => {
      performanceMonitor.cleanup();
    };
  }, [setReducedMotion, setAnimationsEnabled]);

  return (
    <Router>
      <div style={{ backgroundColor: '#0a0e27', minHeight: '100vh' }}>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/About' element={<AboutPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;