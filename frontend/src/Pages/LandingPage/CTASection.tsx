// CTASection.tsx - Premium travel-themed CTA section
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '../../store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useAppStore();

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
  };

  const fonts = {
    title: "'Outfit', 'Inter', sans-serif",
    body: "'Inter', sans-serif",
  };

  useEffect(() => {
    if (reducedMotion) return; // Skip animations if reduced motion is preferred

    const ctx = gsap.context(() => {
      // Main Box Entrance - Optimized
      gsap.fromTo('.cta-main-box',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-main-box',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true, // Only animate once for performance
          }
        }
      );

      // Cards Entrance - Optimized
      gsap.fromTo('.feature-mini-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.feature-mini-card',
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true, // Only animate once for performance
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 4000);
  };

  // Icons
  const CompassIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );

  const MapIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );

  const PlaneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 20px',
        backgroundColor: colors.background,
        overflow: 'hidden',
        fontFamily: fonts.body
      }}
    >
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
        filter: 'blur(60px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Main CTA Box */}
        <div
          className="cta-main-box"
          style={{
            background: `linear-gradient(135deg, ${colors.surface}ee, ${colors.background}ee)`,
            backdropFilter: 'blur(20px)',
            borderRadius: '40px',
            padding: '80px 40px',
            border: `1px solid ${colors.border}`,
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            marginBottom: '60px',
            opacity: 1
          }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '900',
            color: colors.textPrimary,
            fontFamily: fonts.title,
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Ready for Your Next <span style={{
              background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Summit?</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: colors.textSecondary,
            maxWidth: '750px',
            margin: '0 auto 48px',
            lineHeight: '1.6'
          }}>
            Join our community of adventurers and get exclusive access to
            hidden trails, premium lodging, and expert-led expeditions across Pakistan.
          </p>

          {/* Newsletter Form */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative'
            }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isSubmitting || isSubmitted}
                  style={{
                    width: '100%',
                    padding: '20px 28px',
                    borderRadius: '50px',
                    backgroundColor: `${colors.background}80`,
                    border: `1px solid ${isSubmitted ? '#10b981' : colors.border}`,
                    color: colors.textPrimary,
                    fontSize: '1.1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
                {isSubmitted && (
                  <div style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#10b981'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                style={{
                  padding: '18px 48px',
                  borderRadius: '50px',
                  background: isSubmitted
                    ? '#10b981'
                    : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.textPrimary,
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 10px 30px ${isSubmitted ? '#10b98140' : colors.primary + '40'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 15px 40px ${colors.primary}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && !isSubmitted) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = `0 10px 30px ${colors.primary}40`;
                  }
                }}
              >
                {isSubmitting ? (
                  <div className="spinner" />
                ) : isSubmitted ? (
                  "You're on the list!"
                ) : (
                  <>
                    Get Early Access
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>
            <p style={{
              marginTop: '20px',
              fontSize: '0.9rem',
              color: colors.textSecondary,
              opacity: 0.7
            }}>
              *By subscribing, you agree to our Travel Policy and Privacy Terms.
            </p>
          </div>
        </div>

        {/* Feature Mini Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: "Plan Your Journey",
              desc: "Get personalized AI-powered itineraries for any destination in Pakistan.",
              Icon: CompassIcon,
              color: colors.primary
            },
            {
              title: "Verified Safe Hotels",
              desc: "Book with confidence at over 500+ hand-picked & verified locations.",
              Icon: MapIcon,
              color: colors.accent
            },
            {
              title: "24/7 Road Support",
              desc: "Never feel alone. Our local teams are ready to assist you anywhere.",
              Icon: PlaneIcon,
              color: colors.secondary
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="feature-mini-card"
              ref={(el) => { cardsRef.current[idx] = el; }}
              style={{
                background: `${colors.surface}80`,
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: '32px',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                opacity: 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = feature.color;
                e.currentTarget.style.backgroundColor = `${colors.surface}cc`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.backgroundColor = `${colors.surface}80`;
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${feature.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: feature.color,
                marginBottom: '20px'
              }}>
                <feature.Icon />
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: colors.textPrimary,
                marginBottom: '12px',
                fontFamily: fonts.title
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: colors.textSecondary,
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          #cta {
            padding: 80px 16px !important;
          }
          
          .cta-main-box {
            padding: 60px 24px !important;
            border-radius: 30px !important;
          }

          h2 {
            font-size: 2.2rem !important;
          }

          p {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .cta-main-box {
            padding: 40px 20px !important;
          }
          
          input {
            padding: 16px 20px !important;
            font-size: 1rem !important;
          }

          button {
            padding: 16px 24px !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;
