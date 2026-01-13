import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import DarkVeil from '../../Componenets/DarkVeil/DarkVeil';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLDivElement>(null);


  // Modern travel-themed fonts
  const fontStyles = {
    titleFont: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    bodyFont: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };

  // Blue travel-themed colors
  const colors = {
    background: '#0a0e27',
    surface: '#141b3d',
    primary: '#4A90E2',
    primaryLight: '#6BA3E8',
    secondary: '#2E5C8A',
    accent: '#5BA3D0',
    textPrimary: '#ffffff',
    textSecondary: '#b8c5d6',
    border: '#2d3e5f',
    gradientStart: '#4A90E2',
    gradientEnd: '#2E5C8A',
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }
    )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo('.feature-card',
        { y: 60, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)', stagger: 0.15 },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)' },
        '-=0.4'
      );

    // Floating animation for feature cards
    gsap.to('.feature-card', {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true
      }
    });

    return () => {
      gsap.killTweensOf('.feature-card');
    };
  }, []);

  // Icons
  const PlaneIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
        fill="currentColor" />
    </svg>
  );

  const MapIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M15 5L9 2L3 5V19L9 22L15 19L21 22V8L15 5ZM15 17.5L9 20.5V4.5L15 7.5V17.5Z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );

  const features = [
    {
      icon: <PlaneIcon />,
      title: "Smart Itineraries",
      description: "AI-powered trip planning that adapts to your preferences",
      color: colors.primary
    },
    {
      icon: <MapIcon />,
      title: "Explore Destinations",
      description: "Discover hidden gems and popular attractions worldwide",
      color: colors.secondary
    },
    {
      icon: <CalendarIcon />,
      title: "Easy Booking",
      description: "Book flights, hotels, and activities all in one place",
      color: colors.accent
    }
  ];

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: colors.background,
        padding: '20px'
      }}
    >
      {/* DarkVeil Background */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.08}
          speed={0.8}
        />
      </div>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 30% 50%, ${colors.gradientStart}15 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${colors.gradientEnd}15 0%, transparent 50%)`,
        zIndex: 0
      }} />

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        paddingTop: '100px',
        textAlign: 'center'
      }}>

        {/* Main Heading */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            ref={titleRef}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '900',
              color: colors.textPrimary,
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              margin: 0,
              fontFamily: fontStyles.titleFont,
              marginBottom: '24px'
            }}
          >
            Your Journey
            <span style={{
              display: 'block',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginTop: '0.3rem'
            }}>
              Starts Here
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: colors.textSecondary,
              lineHeight: '1.6',
              margin: '0 auto',
              fontFamily: fontStyles.bodyFont,
              maxWidth: '700px',
              fontWeight: '400'
            }}
          >
            Plan unforgettable adventures with AI-powered itineraries,
            real-time booking, and personalized recommendations for every traveler.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          ref={formRef}
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '80px'
          }}
        >
          <button
            ref={ctaRef}
            style={{
              padding: '20px 48px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
              color: colors.textPrimary,
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: fontStyles.bodyFont,
              boxShadow: `0 10px 40px ${colors.primary}40`,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = `0 15px 50px ${colors.primary}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = `0 10px 40px ${colors.primary}40`;
            }}
          >
            Start Planning Now
          </button>

          <button
            style={{
              padding: '20px 48px',
              backgroundColor: 'transparent',
              color: colors.textPrimary,
              border: `2px solid ${colors.secondary}`,
              borderRadius: '50px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: fontStyles.bodyFont,
              backdropFilter: 'blur(10px)',
              background: `${colors.secondary}15`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.secondary;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 15px 50px ${colors.secondary}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.secondary}15`;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Explore Destinations
          </button>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                backgroundColor: `${colors.surface}cc`,
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '40px 32px',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.borderColor = feature.color;
                e.currentTarget.style.boxShadow = `0 20px 60px ${feature.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Gradient Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
              }} />

              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}10)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                color: feature.color,
                margin: '0 auto 24px'
              }}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.textPrimary,
                marginBottom: '12px',
                fontFamily: fontStyles.titleFont
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '1rem',
                color: colors.textSecondary,
                lineHeight: '1.6',
                margin: 0,
                fontFamily: fontStyles.bodyFont
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          marginTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          gap: '60px',
          flexWrap: 'wrap'
        }}>
          {[
            { value: '10M+', label: 'Happy Travelers' },
            { value: '195', label: 'Countries' },
            { value: '4.9', label: 'Average Rating', icon: <StarIcon /> }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '900',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: fontStyles.titleFont,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                {stat.value}
                {stat.icon && <span style={{ color: colors.accent }}>{stat.icon}</span>}
              </div>
              <div style={{
                fontSize: '1rem',
                color: colors.textSecondary,
                fontFamily: fontStyles.bodyFont,
                marginTop: '8px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Import and Media Queries */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
          
          @media (max-width: 1024px) {
            div[style*="gridTemplateColumns"] {
              gridTemplateColumns: 1fr;
              gap: 24px;
            }
          }
          
          @media (max-width: 768px) {
            section {
              padding: 16px;
            }
            
            h1 {
              font-size: 2.5rem !important;
            }
            
            .feature-card {
              padding: 32px 24px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;