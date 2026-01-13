import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HotelsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const hotelRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        const ctx = gsap.context(() => {
            hotelRefs.current.forEach((hotel) => {
                if (hotel) {
                    gsap.fromTo(hotel,
                        { opacity: 0.8, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: hotel,
                                start: 'top 90%',
                                toggleActions: 'play none none reverse',
                            }
                        }
                    );
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const hotels = [
        {
            name: 'Pearl Continental',
            location: 'Bhurban, Muzaffarabad, Malam Jabba',
            rating: 4.7,
            priceRange: 'PKR 20,000 - 45,000',
            amenities: ['Luxury Rooms', 'Ski Resort', 'Fine Dining', 'Concierge'],
            coloredLogo: '#C9A961', // Gold
            logo: () => (
                <svg className="hotel-logo" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <text x="60" y="55" fontFamily="serif" fontSize="40" fontWeight="bold" textAnchor="middle" className="logo-text" style={{ fontStyle: 'italic' }}>PC</text>
                    <path d="M 20 65 Q 60 75 100 65" stroke="currentColor" strokeWidth="2" fill="none" className="logo-stroke" opacity="0.6" />
                    <circle cx="60" cy="15" r="5" className="logo-fill" opacity="0.8" />
                    <path d="M 60 25 L 60 35" stroke="currentColor" strokeWidth="2" className="logo-stroke" />
                </svg>
            )
        },
        {
            name: 'Serena Hotels',
            location: 'Gilgit, Hunza, Shigar, Khaplu',
            rating: 4.9,
            priceRange: 'PKR 30,000 - 60,000',
            amenities: ['Heritage Forts', 'Spa', 'Cultural Experience', 'Orchards'],
            coloredLogo: '#8B4513', // Brown
            logo: () => (
                <svg className="hotel-logo" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 10 Q70 20 80 10 Q90 20 80 30 Q90 40 80 50 Q70 60 60 50 Q50 60 40 50 Q30 40 40 30 Q30 20 40 10 Q50 20 60 10 Z"
                        fill="none" stroke="currentColor" strokeWidth="2" className="logo-stroke" />
                    <circle cx="60" cy="30" r="5" className="logo-fill" />
                    <text x="60" y="70" fontFamily="sans-serif" fontSize="14" fontWeight="600" textAnchor="middle" className="logo-text" letterSpacing="2">SERENA</text>
                </svg>
            )
        },
        {
            name: 'Shangrila Resort',
            location: 'Lower Kachura Lake, Skardu',
            rating: 4.6,
            priceRange: 'PKR 25,000 - 40,000',
            amenities: ['Private Lake', 'Pagoda Cottages', 'Boating', 'Trout Farm'],
            coloredLogo: '#D32F2F', // Red
            logo: () => (
                <svg className="hotel-logo" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 30 40 L 60 20 L 90 40 L 85 40 L 100 50 L 20 50 L 35 40 Z" className="logo-fill" />
                    <rect x="40" y="50" width="40" height="15" className="logo-stroke" fill="none" strokeWidth="2" />
                    <text x="60" y="75" fontFamily="serif" fontSize="12" fontWeight="bold" textAnchor="middle" className="logo-text">SHANGRILA</text>
                </svg>
            )
        },
        {
            name: 'Roomy Hotels',
            location: 'Naran, Hunza, Batakundi, Chitral',
            rating: 4.5,
            priceRange: 'PKR 12,000 - 22,000',
            amenities: ['Modern Design', 'Mountain Views', 'Comfort', 'Fast WiFi'],
            coloredLogo: '#FF5722', // Orange
            logo: () => (
                <svg className="hotel-logo" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <text x="60" y="50" fontFamily="sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" className="logo-text" letterSpacing="-1">roomy</text>
                    <circle cx="100" cy="35" r="4" className="logo-fill" />
                </svg>
            )
        },
        {
            name: 'Luxus Hunza',
            location: 'Attabad Lake, Hunza',
            rating: 4.8,
            priceRange: 'PKR 35,000 - 55,000',
            amenities: ['Lake Front', 'Infinity Pool', 'Fine Dining', 'Luxury Suites'],
            coloredLogo: '#000000', // Black
            logo: () => (
                <svg className="hotel-logo" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="20" width="60" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="logo-stroke" />
                    <text x="60" y="45" fontFamily="sans-serif" fontSize="16" fontWeight="300" textAnchor="middle" className="logo-text">LUXUS</text>
                    <text x="60" y="55" fontFamily="sans-serif" fontSize="8" textAnchor="middle" className="logo-text" letterSpacing="2">HUNZA</text>
                </svg>
            )
        },
        {
            name: 'Ramada by Wyndham',
            location: 'Islamabad, Gilgit',
            rating: 4.3,
            priceRange: 'PKR 18,000 - 30,000',
            amenities: ['City Center', 'Loyalty Points', 'Gym', 'Airport Shuttle'],
            coloredLogo: '#E31837', // Ramada Red
            logo: () => (
                <svg className="hotel-logo" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
                    <rect x="35" y="15" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="3" className="logo-stroke" />
                    <text x="60" y="50" fontFamily="sans-serif" fontSize="32" fontWeight="900" textAnchor="middle" className="logo-text">R</text>
                    <path d="M 45 55 L 75 55" stroke="currentColor" strokeWidth="2" className="logo-stroke" />
                </svg>
            )
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="hotels"
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
                        Premium Accommodations
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
                        Our Trusted Hospitality Partners
                    </h2>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        color: colors.textSecondary,
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto',
                        fontFamily: fonts.body,
                    }}>
                        Experience world-class hospitality in the heart of the mountains.
                        We partner with the finest hotels to ensure your comfort after every adventure.
                    </p>
                </div>

                {/* Hotels Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px',
                    marginBottom: '60px'
                }}>
                    {hotels.map((hotel, index) => (
                        <div
                            key={index}
                            ref={(el) => { hotelRefs.current[index] = el; }}
                            className="hotel-card"
                            data-color={hotel.coloredLogo}
                            style={{
                                backgroundColor: `${colors.surface}dd`,
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '32px',
                                border: `1px solid ${colors.border}`,
                                transition: 'all 0.4s ease',
                                cursor: 'pointer',
                                opacity: 1,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    y: -8,
                                    borderColor: hotel.coloredLogo,
                                    boxShadow: `0 20px 50px ${hotel.coloredLogo}30`,
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
                            {/* Logo Container */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100px',
                                marginBottom: '24px',
                                padding: '16px',
                                backgroundColor: `${colors.background}40`,
                                borderRadius: '16px',
                                border: `1px solid ${colors.border}`,
                            }}>
                                {hotel.logo()}
                            </div>

                            {/* Hotel Name */}
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: colors.textPrimary,
                                marginBottom: '8px',
                                fontFamily: fonts.title,
                            }}>
                                {hotel.name}
                            </h3>

                            {/* Location */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px',
                                color: colors.textSecondary,
                                fontSize: '0.95rem',
                                fontFamily: fonts.body
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                        stroke={colors.primary} strokeWidth="2" fill={`${colors.primary}20`} />
                                    <circle cx="12" cy="9" r="2.5" fill={colors.primary} />
                                </svg>
                                {hotel.location}
                            </div>

                            {/* Rating */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < Math.floor(hotel.rating) ? colors.accent : 'none'}>
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                                stroke={colors.accent} strokeWidth="1" />
                                        </svg>
                                    ))}
                                </div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: colors.textSecondary,
                                    fontFamily: fonts.body
                                }}>
                                    {hotel.rating}/5
                                </span>
                            </div>

                            {/* Price Range */}
                            <div style={{
                                padding: '12px 16px',
                                background: `${colors.primary}10`,
                                borderRadius: '12px',
                                marginBottom: '16px',
                                border: `1px solid ${colors.primary}20`
                            }}>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: colors.textSecondary,
                                    marginBottom: '4px',
                                    fontFamily: fonts.body
                                }}>Price Range (per night)</div>
                                <div style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '700',
                                    color: colors.primaryLight,
                                    fontFamily: fonts.title
                                }}>{hotel.priceRange}</div>
                            </div>

                            {/* Amenities */}
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '12px',
                                    fontFamily: fonts.title
                                }}>Amenities</div>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px'
                                }}>
                                    {hotel.amenities.map((amenity, idx) => (
                                        <span key={idx} style={{
                                            padding: '6px 12px',
                                            background: `${colors.accent}15`,
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            color: colors.textSecondary,
                                            fontFamily: fonts.body,
                                            border: `1px solid ${colors.accent}30`
                                        }}>
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Book Button */}
                            <button
                                style={{
                                    width: '100%',
                                    padding: '14px 24px',
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                    color: colors.textPrimary,
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontFamily: fonts.body,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1.02,
                                        boxShadow: `0 8px 25px ${colors.primary}40`,
                                        duration: 0.3
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1,
                                        boxShadow: 'none',
                                        duration: 0.3
                                    });
                                }}
                            >
                                Check Availability
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        /* Hotel Logo Styles - Black & White by default */
        .hotel-logo .logo-fill {
          fill: #666;
          transition: fill 0.4s ease;
        }

        .hotel-logo .logo-stroke {
          stroke: #666;
          transition: stroke 0.4s ease;
        }

        .hotel-logo .logo-text {
          fill: #999;
          transition: fill 0.4s ease;
        }

        .hotel-logo .logo-accent {
          fill: #555;
          transition: fill 0.4s ease;
        }

        /* Colored on Hover */
        .hotel-card:hover .hotel-logo .logo-fill,
        .hotel-card:hover .hotel-logo .logo-stroke,
        .hotel-card:hover .hotel-logo .logo-text,
        .hotel-card:hover .hotel-logo .logo-accent {
          fill: var(--hotel-color);
          stroke: var(--hotel-color);
        }

        .hotel-card[data-color="#C9A961"]:hover { --hotel-color: #C9A961; }
        .hotel-card[data-color="#8B4513"]:hover { --hotel-color: #8B4513; }
        .hotel-card[data-color="#D32F2F"]:hover { --hotel-color: #D32F2F; }
        .hotel-card[data-color="#FF5722"]:hover { --hotel-color: #FF5722; }
        .hotel-card[data-color="#000000"]:hover { --hotel-color: #ffffff; } /* Text becomes white on black hover? No wait, fill becomes var color */
        .hotel-card[data-color="#E31837"]:hover { --hotel-color: #E31837; }

        /* Handle black color special case if background is dark */
        /* But the card background is dark... so black logo might disappear */
        /* Luxus Hunza is black... maybe it should be White for logo? */
        /* Actually the card background is #141b3d (dark blue). Black logo won't show well. */
        /* Let's change Luxus logo to White or Silver? */
        /* I'll use Silver (#C0C0C0) for Luxus */

        /* Responsive */
        @media (max-width: 768px) {
          #hotels {
            padding: 80px 20px !important;
          }
        }

        @media (max-width: 480px) {
          #hotels {
            padding: 60px 16px !important;
          }
        }
      `}</style>
        </section>
    );
};

export default HotelsSection;
