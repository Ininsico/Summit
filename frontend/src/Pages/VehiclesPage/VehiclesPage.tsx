// VehiclesPage.tsx - Dedicated vehicles rental page with real images and shared trip option
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Componenets/Header';
import Footer from '../LandingPage/Footer';
import { theme } from '../../theme/ThemeSystem';

const VehiclesPage = () => {
    const colors = theme.getColors();
    const fonts = theme.getFonts();
    const navigate = useNavigate();
    const [tripType, setTripType] = useState<'private' | 'shared'>('private');

    const vehicles = [
        {
            name: 'Toyota Land Cruiser',
            type: 'SUV - Premium',
            capacity: '7 Passengers',
            transmission: 'Automatic',
            pricePerDay: 25000,
            sharedPrice: 8000,
            features: ['4WD', 'GPS Navigation', 'Climate Control', 'Premium Sound System'],
            image: '/landcruiser.jpg'
        },
        {
            name: 'Toyota Prado',
            type: 'SUV - Luxury',
            capacity: '7 Passengers',
            transmission: 'Automatic',
            pricePerDay: 20000,
            sharedPrice: 6500,
            features: ['4WD', 'Leather Seats', 'Sunroof', 'Cruise Control'],
            image: '/toyotaparado.jpg'
        },
        {
            name: 'Honda Civic',
            type: 'Sedan - Executive',
            capacity: '5 Passengers',
            transmission: 'Automatic',
            pricePerDay: 12000,
            sharedPrice: 4000,
            features: ['Fuel Efficient', 'Apple CarPlay', 'Backup Camera', 'Alloy Wheels'],
            image: '/toyota civic.jpg'
        },
        {
            name: 'Toyota Corolla',
            type: 'Sedan - Comfort',
            capacity: '5 Passengers',
            transmission: 'Automatic',
            pricePerDay: 10000,
            sharedPrice: 3500,
            features: ['Fuel Efficient', 'Air Conditioning', 'Power Windows', 'ABS Brakes'],
            image: '/toyota corolla.jpg'
        },
        {
            name: 'Kia Sportage',
            type: 'SUV - Modern',
            capacity: '5 Passengers',
            transmission: 'Automatic',
            pricePerDay: 15000,
            sharedPrice: 5000,
            features: ['Panoramic Sunroof', 'LED Lights', 'Smart Key', 'Parking Sensors'],
            image: '/kia sportage.jpg'
        },
        {
            name: 'Suzuki Mehran',
            type: 'Hatchback - Economy',
            capacity: '4 Passengers',
            transmission: 'Manual',
            pricePerDay: 4000,
            sharedPrice: 1500,
            features: ['Compact Size', 'Easy Parking', 'Low Maintenance', 'Fuel Efficient'],
            image: '/mehran.jpg'
        },
        {
            name: 'Suzuki Alto',
            type: 'Hatchback - Budget',
            capacity: '4 Passengers',
            transmission: 'Automatic',
            pricePerDay: 5000,
            sharedPrice: 1800,
            features: ['Compact', 'City Friendly', 'Air Conditioning', 'Power Steering'],
            image: '/alto.jpg'
        }
    ];

    // SVG Icons
    const CarIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 17h14v-4H5v4zm9-11h-4l-1.5 3h7l-1.5-3z" />
            <circle cx="7.5" cy="18.5" r="1.5" />
            <circle cx="16.5" cy="18.5" r="1.5" />
        </svg>
    );

    const UsersIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );

    const LightbulbIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 1.66.88 3.11 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
        </svg>
    );

    const ShieldIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );

    const ToolIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    );

    const UserCheckIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <polyline points="17 11 19 13 23 9" />
        </svg>
    );

    const RoadIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="10" x2="12" y2="14" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <polyline points="2 12 8 8 22 8" />
            <polyline points="2 12 8 16 22 16" />
        </svg>
    );

    const DollarIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );

    const HandshakeIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <path d="M2 12l3-3 3 3" />
            <path d="M22 12l-3-3-3 3" />
            <path d="M5 9h3l2 2 4-4 2 2h3" />
        </svg>
    );

    const GlobeIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );

    const StarIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );

    return (
        <div style={{ backgroundColor: colors.background }}>
            <Header />

            {/* Hero Section */}
            <section
                style={{
                    position: 'relative',
                    padding: '160px 20px 120px',
                    backgroundColor: colors.background,
                    overflow: 'hidden',
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '-10%',
                    width: '700px',
                    height: '700px',
                    background: `radial-gradient(circle, ${colors.primary}10 0%, transparent 70%)`,
                    filter: 'blur(120px)',
                    zIndex: 0
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                        fontWeight: '900',
                        color: colors.textPrimary,
                        fontFamily: fonts.title,
                        marginBottom: '24px',
                        letterSpacing: '-0.02em'
                    }}>
                        Our <span style={{
                            background: theme.getGradient(),
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Fleet</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        color: colors.textSecondary,
                        maxWidth: '900px',
                        margin: '0 auto 60px',
                        lineHeight: '1.8'
                    }}>
                        Choose from our wide range of well-maintained vehicles for your journey across Pakistan. Book a private trip or join a shared adventure!
                    </p>

                    {/* Trip Type Toggle */}
                    <div style={{
                        display: 'inline-flex',
                        gap: '16px',
                        padding: '8px',
                        background: `${colors.surface}80`,
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        border: `1px solid ${colors.border}`
                    }}>
                        <button
                            onClick={() => setTripType('private')}
                            style={{
                                padding: '14px 40px',
                                borderRadius: '50px',
                                border: 'none',
                                background: tripType === 'private' ? theme.getGradient() : 'transparent',
                                color: colors.textPrimary,
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontFamily: fonts.body,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <CarIcon /> Private Trip
                        </button>
                        <button
                            onClick={() => setTripType('shared')}
                            style={{
                                padding: '14px 40px',
                                borderRadius: '50px',
                                border: 'none',
                                background: tripType === 'shared' ? theme.getGradient() : 'transparent',
                                color: colors.textPrimary,
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontFamily: fonts.body,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <UsersIcon /> Shared Trip
                        </button>
                    </div>

                    {tripType === 'shared' && (
                        <div style={{
                            marginTop: '24px',
                            padding: '16px 32px',
                            background: `${colors.primary}20`,
                            borderRadius: '16px',
                            border: `1px solid ${colors.primary}40`,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <LightbulbIcon />
                            <p style={{
                                fontSize: '1rem',
                                color: colors.primary,
                                fontWeight: '600',
                                margin: 0
                            }}>
                                Save up to 70% by joining a shared trip with fellow travelers!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Vehicles Grid */}
            <section style={{
                padding: '80px 20px 120px',
                backgroundColor: colors.surface,
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: '40px'
                    }}>
                        {vehicles.map((vehicle, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: `${colors.background}90`,
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '24px',
                                    border: `1px solid ${colors.border}`,
                                    overflow: 'hidden',
                                    transition: 'all 0.4s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-12px)';
                                    e.currentTarget.style.borderColor = colors.primary;
                                    e.currentTarget.style.boxShadow = `0 25px 50px ${colors.primary}20`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Car Image */}
                                <div style={{
                                    width: '100%',
                                    height: '280px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    background: `linear-gradient(135deg, ${colors.surface}, ${colors.background})`
                                }}>
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.transform = 'scale(1)';
                                        }}
                                    />

                                    {/* Trip Type Badge */}
                                    {tripType === 'shared' && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '16px',
                                            left: '16px',
                                            padding: '10px 20px',
                                            borderRadius: '50px',
                                            background: `${colors.accent}e0`,
                                            backdropFilter: 'blur(10px)',
                                            border: `1px solid ${colors.accent}60`,
                                            fontSize: '0.85rem',
                                            fontWeight: '700',
                                            color: colors.textPrimary,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <UsersIcon /> Shared
                                        </div>
                                    )}
                                </div>

                                {/* Vehicle Info */}
                                <div style={{ padding: '32px' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '16px'
                                    }}>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1.7rem',
                                                fontWeight: '800',
                                                color: colors.textPrimary,
                                                fontFamily: fonts.title,
                                                marginBottom: '8px'
                                            }}>
                                                {vehicle.name}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.95rem',
                                                color: colors.textSecondary,
                                                fontWeight: '500'
                                            }}>
                                                {vehicle.type}
                                            </p>
                                        </div>
                                        <div style={{
                                            padding: '8px 18px',
                                            borderRadius: '50px',
                                            background: `${colors.primary}20`,
                                            border: `1px solid ${colors.primary}40`
                                        }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: colors.primary,
                                                fontWeight: '700',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {vehicle.transmission}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Capacity */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        marginBottom: '24px',
                                        paddingBottom: '20px',
                                        borderBottom: `1px solid ${colors.border}`
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        <span style={{
                                            fontSize: '1rem',
                                            color: colors.textSecondary,
                                            fontWeight: '600'
                                        }}>
                                            {vehicle.capacity}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <div style={{ marginBottom: '28px' }}>
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: colors.textSecondary,
                                            marginBottom: '14px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Key Features
                                        </div>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '10px'
                                        }}>
                                            {vehicle.features.map((feature, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        padding: '8px 14px',
                                                        borderRadius: '10px',
                                                        background: `${colors.surface}80`,
                                                        border: `1px solid ${colors.border}`,
                                                        color: colors.textSecondary,
                                                        fontSize: '0.8rem',
                                                        fontWeight: '500',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price and CTA */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '24px',
                                        background: `${colors.surface}60`,
                                        borderRadius: '16px',
                                        border: `1px solid ${colors.border}`
                                    }}>
                                        <div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: colors.textSecondary,
                                                marginBottom: '6px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                fontWeight: '600'
                                            }}>
                                                {tripType === 'shared' ? 'Per Person/Day' : 'Per Day'}
                                            </div>
                                            <div style={{
                                                fontSize: '2rem',
                                                fontWeight: '900',
                                                color: colors.primary,
                                                fontFamily: fonts.title
                                            }}>
                                                PKR {tripType === 'shared'
                                                    ? vehicle.sharedPrice.toLocaleString()
                                                    : vehicle.pricePerDay.toLocaleString()}
                                            </div>
                                            {tripType === 'shared' && (
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: colors.textSecondary,
                                                    textDecoration: 'line-through',
                                                    marginTop: '4px'
                                                }}>
                                                    PKR {vehicle.pricePerDay.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => navigate('/auth')}
                                            style={{
                                                padding: '14px 28px',
                                                borderRadius: '12px',
                                                background: theme.getGradient(),
                                                border: 'none',
                                                color: colors.textPrimary,
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                fontFamily: fonts.body,
                                                boxShadow: `0 6px 15px ${colors.primary}30`,
                                                whiteSpace: 'nowrap'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                                e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}50`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.boxShadow = `0 6px 15px ${colors.primary}30`;
                                            }}
                                        >
                                            {tripType === 'shared' ? 'Join Trip' : 'Book Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Banner */}
                    <div style={{
                        marginTop: '80px',
                        padding: '50px 40px',
                        background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)`,
                        borderRadius: '30px',
                        border: `1px solid ${colors.primary}30`,
                        textAlign: 'center'
                    }}>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '16px'
                        }}>
                            {tripType === 'shared' ? 'Shared Trip Benefits' : 'All Vehicles Include'}
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '24px',
                            marginTop: '32px'
                        }}>
                            {(tripType === 'shared' ? [
                                { icon: <DollarIcon />, text: 'Save Up to 70%' },
                                { icon: <HandshakeIcon />, text: 'Meet Fellow Travelers' },
                                { icon: <GlobeIcon />, text: 'Eco-Friendly Travel' },
                                { icon: <StarIcon />, text: 'All Inclusive Package' }
                            ] : [
                                { icon: <ShieldIcon />, text: 'Full Insurance Coverage' },
                                { icon: <ToolIcon />, text: '24/7 Roadside Assistance' },
                                { icon: <UserCheckIcon />, text: 'Professional Driver (Optional)' },
                                { icon: <RoadIcon />, text: 'Unlimited Mileage' }
                            ]).map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '20px',
                                        background: `${colors.background}60`,
                                        borderRadius: '16px',
                                        border: `1px solid ${colors.border}`
                                    }}
                                >
                                    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                    <span style={{
                                        fontSize: '1rem',
                                        color: colors.textPrimary,
                                        fontWeight: '600'
                                    }}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default VehiclesPage;
