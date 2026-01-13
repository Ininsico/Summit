import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Snowfall from 'react-snowfall';

gsap.registerPlugin(ScrollTrigger);

const TripsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const tripRefs = useRef<(HTMLDivElement | null)[]>([]);

    const colors = {
        white: '#ffffff',
        dark: '#0a0e27',
        primary: '#4A90E2',
        primaryLight: '#6BA3E8',
        secondary: '#2E5C8A',
        accent: '#5BA3D0',
        textDark: '#1a1a1a',
        textGray: '#4a5568',
        border: '#e2e8f0',
    };

    const fonts = {
        title: "'Outfit', 'Inter', sans-serif",
        body: "'Inter', sans-serif",
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            tripRefs.current.forEach((trip) => {
                if (trip) {
                    gsap.fromTo(trip,
                        { opacity: 0.8, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: trip,
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

    const trips = [
        {
            name: 'Rakaposhi Base Camp',
            location: 'Nagar Valley, Gilgit-Baltistan',
            image: '/Rakaposhi.jpg',
            description: 'Experience the majestic Rakaposhi (7,788m), one of the most beautiful peaks in the Karakoram range. Trek through lush green valleys, witness stunning glaciers, and camp under the stars with breathtaking mountain views.',
            duration: '5-7 Days',
            difficulty: 'Moderate',
            bestTime: 'May - October',
            cost: {
                transport: 'PKR 8,000',
                hotel: 'PKR 15,000',
                food: 'PKR 7,000',
                total: 'PKR 30,000'
            },
            highlights: [
                'Stunning views of Rakaposhi peak',
                'Minapin Glacier exploration',
                'Traditional Hunza cuisine',
                'Local village homestays'
            ],
            imagePosition: 'right'
        },
        {
            name: 'Shangrila Desert Safari',
            location: 'Skardu, Gilgit-Baltistan',
            image: '/Sarfranga.jpg',
            description: 'Discover the mesmerizing Shangrila Desert (Sarfaranga Cold Desert) with its unique landscape of golden sand dunes surrounded by snow-capped peaks. Experience the magical contrast of desert and mountains in one unforgettable journey.',
            duration: '4-6 Days',
            difficulty: 'Easy',
            bestTime: 'April - September',
            cost: {
                transport: 'PKR 10,000',
                hotel: 'PKR 20,000',
                food: 'PKR 8,000',
                total: 'PKR 38,000'
            },
            highlights: [
                'Cold desert exploration',
                'Shangrila Resort visit',
                'Upper Kachura Lake',
                'Shigar Fort heritage tour'
            ],
            imagePosition: 'left'
        },
        {
            name: 'Nanga Parbat Expedition',
            location: 'Fairy Meadows, Gilgit-Baltistan',
            image: '/NangaParbat.jpg',
            description: 'Embark on an epic journey to the "Killer Mountain" - Nanga Parbat (8,126m), the 9th highest peak in the world. Trek through the enchanting Fairy Meadows, witness the Raikot Face, and experience the raw power of the Himalayas.',
            duration: '7-10 Days',
            difficulty: 'Challenging',
            bestTime: 'June - September',
            cost: {
                transport: 'PKR 12,000',
                hotel: 'PKR 25,000',
                food: 'PKR 10,000',
                total: 'PKR 47,000'
            },
            highlights: [
                'Fairy Meadows camping',
                'Nanga Parbat base camp',
                'Raikot Glacier trek',
                'Spectacular sunrise views'
            ],
            imagePosition: 'right'
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="trips"
            style={{
                position: 'relative',
                padding: '120px 20px',
                backgroundColor: colors.white,
                overflow: 'hidden',
            }}
        >
            {/* Snow Effect using react-snow */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none'
            }}>
                <Snowfall color="#b8d4f1" snowflakeCount={100} />
            </div>

            <div style={{
                position: 'relative',
                zIndex: 2,
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
                        color: colors.primary,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontFamily: fonts.body
                    }}>
                        Featured Trips
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '900',
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: '1.2',
                        fontFamily: fonts.title,
                        marginBottom: '24px'
                    }}>
                        Explore Pakistan's Wonders
                    </h2>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        color: colors.textGray,
                        lineHeight: '1.8',
                        maxWidth: '800px',
                        margin: '0 auto',
                        fontFamily: fonts.body,
                    }}>
                        All trips start from Abbottabad and include bus/train expenses, hotel accommodation, and meals.
                        Experience the beauty of Northern Pakistan with our carefully curated packages.
                    </p>
                </div>

                {/* Trip Cards */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '100px'
                }}>
                    {trips.map((trip, index) => (
                        <div
                            key={index}
                            ref={(el) => { tripRefs.current[index] = el; }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: trip.imagePosition === 'right' ? '1fr 1fr' : '1fr 1fr',
                                gap: '60px',
                                alignItems: 'center',
                                opacity: 1 // ALWAYS VISIBLE
                            }}
                            className="trip-card"
                        >
                            {/* Content */}
                            <div style={{
                                order: trip.imagePosition === 'right' ? 1 : 2,
                                padding: '20px'
                            }}>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '6px 16px',
                                    background: `${trip.difficulty === 'Easy' ? '#10b981' : trip.difficulty === 'Moderate' ? '#f59e0b' : '#ef4444'}20`,
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: trip.difficulty === 'Easy' ? '#10b981' : trip.difficulty === 'Moderate' ? '#f59e0b' : '#ef4444',
                                    marginBottom: '16px',
                                    fontFamily: fonts.body
                                }}>
                                    {trip.difficulty}
                                </div>

                                <h3 style={{
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: '800',
                                    color: colors.textDark,
                                    marginBottom: '12px',
                                    fontFamily: fonts.title,
                                    lineHeight: '1.2'
                                }}>
                                    {trip.name}
                                </h3>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '20px',
                                    color: colors.textGray,
                                    fontSize: '1rem',
                                    fontFamily: fonts.body
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                            stroke={colors.primary} strokeWidth="2" fill={`${colors.primary}20`} />
                                        <circle cx="12" cy="9" r="2.5" fill={colors.primary} />
                                    </svg>
                                    {trip.location}
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    color: colors.textGray,
                                    lineHeight: '1.8',
                                    marginBottom: '24px',
                                    fontFamily: fonts.body
                                }}>
                                    {trip.description}
                                </p>

                                {/* Trip Details */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '16px',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{
                                        padding: '16px',
                                        background: `${colors.primary}08`,
                                        borderRadius: '12px',
                                        border: `1px solid ${colors.border}`
                                    }}>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: colors.textGray,
                                            marginBottom: '4px',
                                            fontFamily: fonts.body
                                        }}>Duration</div>
                                        <div style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: colors.textDark,
                                            fontFamily: fonts.title
                                        }}>{trip.duration}</div>
                                    </div>

                                    <div style={{
                                        padding: '16px',
                                        background: `${colors.primary}08`,
                                        borderRadius: '12px',
                                        border: `1px solid ${colors.border}`
                                    }}>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: colors.textGray,
                                            marginBottom: '4px',
                                            fontFamily: fonts.body
                                        }}>Best Time</div>
                                        <div style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: colors.textDark,
                                            fontFamily: fonts.title
                                        }}>{trip.bestTime}</div>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div style={{ marginBottom: '24px' }}>
                                    <h4 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: colors.textDark,
                                        marginBottom: '12px',
                                        fontFamily: fonts.title
                                    }}>Highlights</h4>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        {trip.highlights.map((highlight, idx) => (
                                            <li key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                marginBottom: '8px',
                                                fontSize: '1rem',
                                                color: colors.textGray,
                                                fontFamily: fonts.body
                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="10" fill={`${colors.primary}20`} />
                                                    <path d="M8 12l2 2 4-4" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cost Breakdown */}
                                <div style={{
                                    background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)`,
                                    borderRadius: '16px',
                                    padding: '24px',
                                    border: `2px solid ${colors.primary}30`
                                }}>
                                    <h4 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: '700',
                                        color: colors.textDark,
                                        marginBottom: '16px',
                                        fontFamily: fonts.title
                                    }}>Cost Breakdown</h4>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontFamily: fonts.body }}>
                                            <span style={{ color: colors.textGray }}>🚌 Transport (Bus/Train)</span>
                                            <span style={{ fontWeight: '600', color: colors.textDark }}>{trip.cost.transport}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontFamily: fonts.body }}>
                                            <span style={{ color: colors.textGray }}>🏨 Hotel Accommodation</span>
                                            <span style={{ fontWeight: '600', color: colors.textDark }}>{trip.cost.hotel}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontFamily: fonts.body }}>
                                            <span style={{ color: colors.textGray }}>🍽️ Food & Meals</span>
                                            <span style={{ fontWeight: '600', color: colors.textDark }}>{trip.cost.food}</span>
                                        </div>
                                        <div style={{
                                            borderTop: `2px solid ${colors.primary}30`,
                                            paddingTop: '12px',
                                            marginTop: '8px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '1.3rem',
                                            fontFamily: fonts.title
                                        }}>
                                            <span style={{ fontWeight: '800', color: colors.textDark }}>Total Cost</span>
                                            <span style={{
                                                fontWeight: '900',
                                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                            }}>{trip.cost.total}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    style={{
                                        marginTop: '24px',
                                        padding: '16px 40px',
                                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                        color: colors.white,
                                        border: 'none',
                                        borderRadius: '50px',
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        fontFamily: fonts.body,
                                        boxShadow: `0 8px 30px ${colors.primary}40`,
                                        transition: 'all 0.3s ease',
                                        width: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget, {
                                            y: -4,
                                            scale: 1.02,
                                            boxShadow: `0 12px 40px ${colors.primary}60`,
                                            duration: 0.3
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, {
                                            y: 0,
                                            scale: 1,
                                            boxShadow: `0 8px 30px ${colors.primary}40`,
                                            duration: 0.3
                                        });
                                    }}
                                >
                                    Book This Trip
                                </button>
                            </div>

                            {/* Image */}
                            <div style={{
                                order: trip.imagePosition === 'right' ? 2 : 1,
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                height: '600px'
                            }}>
                                <img
                                    src={trip.image}
                                    alt={trip.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: 1.05,
                                            duration: 0.5,
                                            ease: 'power2.out'
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: 1,
                                            duration: 0.5,
                                            ease: 'power2.out'
                                        });
                                    }}
                                />

                                {/* Image Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '32px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    color: colors.white
                                }}>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        marginBottom: '8px',
                                        fontFamily: fonts.body,
                                        opacity: 0.9
                                    }}>Starting from Abbottabad</div>
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '900',
                                        fontFamily: fonts.title
                                    }}>{trip.cost.total}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        /* Tablet */
        @media (max-width: 1024px) {
          .trip-card {
            gap: 40px !important;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          #trips {
            padding: 80px 20px !important;
          }

          .trip-card {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .trip-card > div:first-child,
          .trip-card > div:last-child {
            order: 1 !important;
          }

          .trip-card > div:nth-child(2) {
            order: 2 !important;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          #trips {
            padding: 60px 16px !important;
          }

          .trip-card > div:first-child {
            padding: 10px !important;
          }

          .trip-card > div:last-child {
            height: 400px !important;
          }
        }
      `}</style>
        </section>
    );
};

export default TripsSection;
