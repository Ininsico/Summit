import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Header.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Blue travel-themed colors
  const colors = {
    primary: '#4A90E2',
    primaryLight: '#6BA3E8',
    secondary: '#2E5C8A',
    accent: '#5BA3D0',
    dark: '#0a0e27',
    darkBlue: '#141b3d',
    white: '#FFFFFF',
    textLight: '#b8c5d6',
    glass: 'rgba(10, 14, 39, 0.95)'
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.header-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  // Navigation items
  const navItems = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Plan Trip', href: '#plan' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          {/* Logo */}
          <div
            className="logo-container"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="logo-image-wrapper">
              <img
                src="/Summit.png"
                alt="Summit Logo"
                className="logo-image"
              />
              <div className="logo-shine" />
            </div>
            <span className="logo-text">Summit</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <button className="cta-button">
              <span>Book Now</span>
              <div className="button-glow" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-content">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                <div className="mobile-nav-dot" />
                {item.label}
              </a>
            ))}
            <button
              className="mobile-cta-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(135deg, ${colors.glass}, ${colors.darkBlue}ee);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-bottom: 1px solid ${colors.primary}30;
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-container.scrolled {
          box-shadow: 0 8px 50px rgba(0, 0, 0, 0.5);
          border-bottom-color: ${colors.primary}50;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo Styles */
        .logo-container {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .logo-container:hover {
          transform: scale(1.02);
        }

        .logo-image-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}20);
          border: 2px solid ${colors.primary}40;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-image-wrapper:hover {
          transform: scale(1.1) rotate(5deg);
          border-color: ${colors.primary};
          box-shadow: 0 8px 25px ${colors.primary}40;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(1.1);
        }

        .logo-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }

        .logo-image-wrapper:hover .logo-shine {
          left: 150%;
        }

        .logo-text {
          font-size: 32px;
          font-weight: 900;
          background: linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.secondary});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
          white-space: nowrap;
          font-family: 'Outfit', sans-serif;
          text-shadow: 0 2px 10px rgba(74, 144, 226, 0.2);
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          gap: 36px;
          align-items: center;
        }

        .nav-link {
          color: ${colors.white};
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          position: relative;
          font-family: 'Inter', sans-serif;
          background: transparent;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, ${colors.primary}, ${colors.accent});
          border-radius: 2px;
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: ${colors.primary};
          transform: translateY(-3px) scale(1.05);
          background: linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10);
        }

        .nav-link:hover::after {
          width: 80%;
        }

        .cta-button {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
          color: ${colors.white};
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px ${colors.primary}40;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.3px;
        }

        .cta-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 30px ${colors.primary}60;
        }

        .button-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition: all 0.6s ease;
        }

        .cta-button:hover .button-glow {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0;
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: none;
          background: rgba(255,255,255,0.1);
          border: none;
          padding: 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-menu-button:hover {
          background: rgba(255,255,255,0.15);
        }

        .hamburger {
          width: 24px;
          height: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: ${colors.white};
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        /* Mobile Navigation */
        .mobile-nav {
          max-height: 0;
          overflow: hidden;
          background: linear-gradient(135deg, ${colors.dark}, ${colors.darkBlue});
          backdrop-filter: blur(30px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid ${colors.primary}30;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-nav.active {
          max-height: 500px;
        }

        .mobile-nav-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-link {
          color: ${colors.white};
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
          padding: 20px 0;
          border-bottom: 1px solid ${colors.primary}20;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .mobile-nav-link:hover {
          color: ${colors.primary};
          padding-left: 15px;
        }

        .mobile-nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${colors.primary};
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .mobile-nav-link:hover .mobile-nav-dot {
          opacity: 1;
        }

        .mobile-cta-button {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
          color: ${colors.white};
          border: none;
          padding: 18px 32px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 25px;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 6px 20px ${colors.primary}40;
        }

        .mobile-cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px ${colors.primary}60;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .header-content {
            padding: 0 30px;
          }

          .desktop-nav {
            gap: 20px;
          }

          .nav-link {
            font-size: 15px;
            padding: 8px 14px;
          }

          .cta-button {
            padding: 12px 24px;
            font-size: 14px;
          }
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 0 20px;
            height: 70px;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .logo-text {
            font-size: 24px;
          }

          .logo-image-wrapper {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 0 16px;
            height: 65px;
          }

          .logo-text {
            font-size: 20px;
          }

          .logo-image-wrapper {
            width: 36px;
            height: 36px;
          }

          .mobile-nav-link {
            font-size: 16px;
            padding: 16px 0;
          }
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: ${colors.dark};
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent});
        }
      `}</style>
    </>
  );
};

export default Header;
