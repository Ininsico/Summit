import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const colors = {
    background: '#0a0e27',
    surface: '#141b3d',
    primary: '#4A90E2',
    primaryLight: '#6BA3E8',
    secondary: '#2E5C8A',
    accent: '#5BA3D0',
    textPrimary: '#ffffff',
    textSecondary: '#b8c5d6',
    textLight: '#8FA8C8', // Lighter blue for text
    border: '#2d3e5f',
  };

  const fonts = {
    title: "'Outfit', 'Inter', sans-serif",
    body: "'Inter', sans-serif",
  };

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // SVG Icons
  const MountainIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L48 32L56 28L64 40H0L8 28L16 32L32 8Z" fill={`${colors.primary}40`} />
      <path d="M32 8L48 32L56 28L64 40H0L8 28L16 32L32 8Z" stroke={colors.primary} strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 24L28 36L32 32L36 36L44 24" stroke={colors.primaryLight} strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="16" r="4" fill={colors.accent} opacity="0.6" />
    </svg>
  );

  const BeachIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="12" r="8" fill={colors.accent} opacity="0.4" />
      <path d="M8 32C8 32 12 28 20 28C28 28 32 32 32 32" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 36C32 36 36 32 44 32C52 32 56 36 56 36" stroke={colors.primaryLight} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="48" rx="28" ry="4" fill={`${colors.accent}30`} />
      <path d="M16 44L20 24L24 44" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 24L26 24" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill={colors.secondary} />
    </svg>
  );

  const CompassIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" stroke={colors.primary} strokeWidth="2" />
      <circle cx="32" cy="32" r="24" stroke={colors.primaryLight} strokeWidth="1.5" opacity="0.5" />
      <path d="M32 8V16M32 48V56M8 32H16M48 32H56" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M28 24L24 40L40 36L36 20L28 24Z" fill={colors.primary} opacity="0.6" />
      <path d="M28 24L24 40L40 36L36 20L28 24Z" stroke={colors.primary} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="3" fill={colors.textPrimary} />
    </svg>
  );

  const GlobeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" stroke={colors.primary} strokeWidth="2" />
      <ellipse cx="32" cy="32" rx="12" ry="26" stroke={colors.primaryLight} strokeWidth="1.5" />
      <path d="M8 32H56" stroke={colors.accent} strokeWidth="2" />
      <path d="M12 20H52M12 44H52" stroke={colors.accent} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );

  const CameraIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="48" height="32" rx="4" stroke={colors.primary} strokeWidth="2" />
      <path d="M20 20L24 12H40L44 20" stroke={colors.primary} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="36" r="10" stroke={colors.primaryLight} strokeWidth="2" />
      <circle cx="32" cy="36" r="6" fill={`${colors.accent}40`} />
      <circle cx="48" cy="28" r="2" fill={colors.accent} />
    </svg>
  );

  const BackpackIcon = () => (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 16C20 16 24 8 32 8C40 8 44 16 44 16" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      <rect x="16" y="16" width="32" height="40" rx="4" stroke={colors.primary} strokeWidth="2" />
      <rect x="20" y="28" width="24" height="12" rx="2" fill={`${colors.accent}30`} stroke={colors.primaryLight} strokeWidth="1.5" />
      <path d="M16 24H48" stroke={colors.accent} strokeWidth="2" />
      <circle cx="24" cy="34" r="2" fill={colors.primary} />
    </svg>
  );

  const features = [
    {
      title: "Mountain Adventures",
      description: "Explore breathtaking peaks and scenic trails. From the Himalayas to the Alps, discover your next summit with expert guides and curated experiences.",
      Icon: MountainIcon,
      color: colors.primary,
    },
    {
      title: "Beach Escapes",
      description: "Relax on pristine shores and crystal-clear waters. Find your perfect coastal paradise with exclusive beach resorts and water activities.",
      Icon: BeachIcon,
      color: colors.accent,
    },
    {
      title: "Smart Navigation",
      description: "AI-powered trip planning that adapts to your style. Get personalized itineraries, real-time updates, and local recommendations.",
      Icon: CompassIcon,
      color: colors.secondary,
    }
  ];

  const benefits = [
    {
      title: "Global Coverage",
      description: "Access to 195+ countries with verified local guides and authentic experiences",
      Icon: GlobeIcon
    },
    {
      title: "Capture Moments",
      description: "Professional photography services available at every destination",
      Icon: CameraIcon
    },
    {
      title: "Travel Light",
      description: "Curated packing lists and premium gear rental services worldwide",
      Icon: BackpackIcon
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        padding: '120px 20px',
        backgroundColor: colors.background,
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, ${colors.primary}08 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, ${colors.accent}08 0%, transparent 50%)
        `,
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: `${colors.primary}15`,
            borderRadius: '50px',
            border: `1px solid ${colors.primary}30`,
            marginBottom: '24px',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: colors.primaryLight,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: fonts.body
          }}>
            About Summit
          </div>

          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.2',
            fontFamily: fonts.title,
            marginBottom: '24px'
          }}>
            Your Adventure Starts Here
          </h2>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: colors.textLight,
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: fonts.body,
          }}>
            We transform ordinary trips into extraordinary adventures. Whether you're scaling mountains,
            lounging on pristine beaches, or exploring vibrant cities, Summit makes every journey unforgettable.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '100px'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              style={{
                backgroundColor: `${colors.surface}dd`,
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '40px 32px',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  borderColor: feature.color,
                  boxShadow: `0 20px 50px ${feature.color}30`,
                  duration: 0.3
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  borderColor: colors.border,
                  boxShadow: 'none',
                  duration: 0.3
                });
              }}
            >
              {/* Top Border */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${feature.color}, ${colors.primaryLight})`,
                borderRadius: '24px 24px 0 0'
              }} />

              {/* Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                border: `2px solid ${feature.color}30`,
              }}>
                <feature.Icon />
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: '700',
                color: colors.textPrimary,
                marginBottom: '16px',
                fontFamily: fonts.title,
              }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '1rem',
                color: colors.textLight,
                lineHeight: '1.7',
                fontFamily: fonts.body
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose Summit Section */}
        <div style={{
          backgroundColor: `${colors.surface}cc`,
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '60px 40px',
          border: `1px solid ${colors.border}`,
          marginBottom: '80px'
        }}>
          <h3 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '50px',
            fontFamily: fonts.title,
          }}>
            Why Choose Summit?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                ref={addToCardsRef}
                style={{
                  textAlign: 'center',
                  padding: '36px 24px',
                  borderRadius: '20px',
                  background: `${colors.background}60`,
                  border: `1px solid ${colors.border}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -6,
                    borderColor: colors.primary,
                    background: `${colors.background}80`,
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    borderColor: colors.border,
                    background: `${colors.background}60`,
                    duration: 0.3
                  });
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '20px',
                  borderRadius: '16px',
                  background: `${colors.primary}10`,
                  marginBottom: '20px'
                }}>
                  <benefit.Icon />
                </div>

                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: colors.textPrimary,
                  marginBottom: '12px',
                  fontFamily: fonts.title
                }}>
                  {benefit.title}
                </h4>

                <p style={{
                  fontSize: '1rem',
                  color: colors.textLight,
                  lineHeight: '1.7',
                  fontFamily: fonts.body
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {[
            { value: '10M+', label: 'Happy Travelers' },
            { value: '195+', label: 'Countries' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }} ref={addToCardsRef}>
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '900',
                background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: fonts.title,
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: colors.textLight,
                fontFamily: fonts.body,
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              padding: '20px 50px',
              background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent})`,
              color: colors.textPrimary,
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.15rem',
              fontWeight: '700',
              cursor: 'pointer',
              fontFamily: fonts.body,
              boxShadow: `0 10px 40px ${colors.primary}40`,
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -4,
                scale: 1.05,
                boxShadow: `0 15px 50px ${colors.primary}60`,
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                scale: 1,
                boxShadow: `0 10px 40px ${colors.primary}40`,
                duration: 0.3
              });
            }}
          >
            Start Your Journey Today
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        @media (max-width: 768px) {
          #about {
            padding: 80px 16px !important;
          }
        }

        @media (max-width: 480px) {
          #about > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;