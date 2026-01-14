import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from "./Pages/LandingPage/LandingPage";
import AboutPage from './Pages/AboutPage/AboutPage';
import { useAppStore } from './store/useAppStore';
import { preloadFonts, shouldReduceAnimations } from './utils/performanceUtils';
import { initGSAPDefaults } from './utils/gsapUtils';

const App = () => {
  const { setReducedMotion, setAnimationsEnabled } = useAppStore();

  useEffect(() => {
    // Initialize GSAP with optimized defaults
    initGSAPDefaults();

    // Preload fonts for better performance
    preloadFonts();

    // Check for reduced motion preference or low-end device
    const shouldReduce = shouldReduceAnimations();
    setReducedMotion(shouldReduce);
    setAnimationsEnabled(!shouldReduce);

    // Log performance metrics in development
    if (import.meta.env.DEV) {
      console.log('[Performance] App initialized');
      console.log('[Performance] Reduced Motion:', shouldReduce);
    }
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