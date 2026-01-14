import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../theme/ThemeSystem';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const colors = theme.getColors();
  const fonts = theme.getFonts();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Navigation items with proper routing
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Vehicles', path: '/vehicles' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);

    // Handle hash links for same-page navigation
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (route === '' || route === location.pathname) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `linear-gradient(135deg, ${colors.background}f5, ${colors.surface}f0)`,
          backdropFilter: 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)',
          borderBottom: `1px solid ${colors.primary}40`,
          boxShadow: '0 4px 40px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 clamp(16px, 4vw, 40px)',
            height: 'clamp(65px, 10vw, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(10px, 2vw, 14px)',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div
              style={{
                width: 'clamp(36px, 6vw, 50px)',
                height: 'clamp(36px, 6vw, 50px)',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${colors.primary}25, ${colors.secondary}20)`,
                border: `2px solid ${colors.primary}40`,
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              <img
                src="/Summit.png"
                alt="Summit Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(1.1)',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 'clamp(20px, 4vw, 32px)',
                fontWeight: '900',
                background: theme.getGradient(),
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
                whiteSpace: 'nowrap',
                fontFamily: fonts.title,
              }}
            >
              Summit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              gap: 'clamp(20px, 3vw, 36px)',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                style={{
                  color: isActive(item.path) ? colors.primary : colors.textPrimary,
                  textDecoration: 'none',
                  fontSize: 'clamp(14px, 1.5vw, 16px)',
                  fontWeight: '600',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  fontFamily: fonts.body,
                  background: isActive(item.path)
                    ? `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`;
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = colors.textPrimary;
                    e.currentTarget.style.background = 'transparent';
                  }
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              style={{
                background: theme.getGradient(),
                color: colors.textPrimary,
                border: 'none',
                padding: 'clamp(12px, 1.5vw, 14px) clamp(24px, 3vw, 32px)',
                borderRadius: '50px',
                fontSize: 'clamp(13px, 1.5vw, 15px)',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: `0 6px 20px ${colors.primary}40`,
                fontFamily: fonts.body,
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 12px 30px ${colors.primary}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${colors.primary}40`;
              }}
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="mobile-menu-button"
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              padding: '12px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              width: '24px',
              height: '20px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <span style={{
                display: 'block',
                width: '100%',
                height: '2px',
                background: colors.textPrimary,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block',
                width: '100%',
                height: '2px',
                background: colors.textPrimary,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: isMobileMenuOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block',
                width: '100%',
                height: '2px',
                background: colors.textPrimary,
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
              }} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          style={{
            maxHeight: isMobileMenuOpen ? '500px' : '0',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${colors.background}, ${colors.surface})`,
            backdropFilter: 'blur(30px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            borderBottom: `1px solid ${colors.primary}30`,
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="mobile-nav"
        >
          <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                style={{
                  color: isActive(item.path) ? colors.primary : colors.textPrimary,
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  padding: '20px 0',
                  borderBottom: `1px solid ${colors.primary}20`,
                  transition: 'all 0.3s ease',
                  fontFamily: fonts.body,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: colors.primary,
                  opacity: isActive(item.path) ? 1 : 0.5,
                }} />
                {item.label}
              </Link>
            ))}
            <button
              style={{
                background: theme.getGradient(),
                color: colors.textPrimary,
                border: 'none',
                padding: '18px 32px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                marginTop: '25px',
                fontFamily: fonts.body,
                boxShadow: `0 6px 20px ${colors.primary}40`,
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-button {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
