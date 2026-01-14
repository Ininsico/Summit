// VehiclesSection.tsx - Vehicle rental showcase
import { theme } from '../../theme/ThemeSystem';

const VehiclesSection = () => {
    const colors = theme.getColors();
    const fonts = theme.getFonts();

    const vehicles = [
        {
            name: 'Toyota Land Cruiser',
            type: 'SUV - Premium',
            capacity: '7 Passengers',
            transmission: 'Automatic',
            pricePerDay: 25000,
            features: ['4WD', 'GPS Navigation', 'Climate Control', 'Premium Sound'],
            color: '#1a1a1a'
        },
        {
            name: 'Toyota Prado',
            type: 'SUV - Luxury',
            capacity: '7 Passengers',
            transmission: 'Automatic',
            pricePerDay: 20000,
            features: ['4WD', 'Leather Seats', 'Sunroof', 'Cruise Control'],
            color: '#2c2c2c'
        },
        {
            name: 'Honda Civic',
            type: 'Sedan - Executive',
            capacity: '5 Passengers',
            transmission: 'Automatic',
            pricePerDay: 12000,
            features: ['Fuel Efficient', 'Apple CarPlay', 'Backup Camera', 'Alloy Wheels'],
            color: '#3d3d3d'
        },
        {
            name: 'Toyota Corolla',
            type: 'Sedan - Comfort',
            capacity: '5 Passengers',
            transmission: 'Automatic',
            pricePerDay: 10000,
            features: ['Fuel Efficient', 'Air Conditioning', 'Power Windows', 'ABS'],
            color: '#4a4a4a'
        },
        {
            name: 'Kia Sportage',
            type: 'SUV - Modern',
            capacity: '5 Passengers',
            transmission: 'Automatic',
            pricePerDay: 15000,
            features: ['Panoramic Sunroof', 'LED Lights', 'Smart Key', 'Parking Sensors'],
            color: '#363636'
        },
        {
            name: 'Suzuki Mehran',
            type: 'Hatchback - Economy',
            capacity: '4 Passengers',
            transmission: 'Manual',
            pricePerDay: 4000,
            features: ['Compact Size', 'Easy Parking', 'Low Maintenance', 'Fuel Efficient'],
            color: '#5a5a5a'
        },
        {
            name: 'Suzuki Alto',
            type: 'Hatchback - Budget',
            capacity: '4 Passengers',
            transmission: 'Automatic',
            pricePerDay: 5000,
            features: ['Compact', 'City Friendly', 'Air Conditioning', 'Power Steering'],
            color: '#4d4d4d'
        }
    ];

    // SVG Car Component
    const CarSVG = ({ color }: { color: string }) => (
        <svg viewBox="0 0 200 100" style={{ width: '100%', height: 'auto' }}>
            {/* Car Body */}
            <rect x="30" y="45" width="140" height="35" rx="5" fill={color} />

            {/* Car Top */}
            <path d="M 50 45 L 60 25 L 140 25 L 150 45 Z" fill={color} />

            {/* Windows */}
            <rect x="65" y="30" width="30" height="12" rx="2" fill="#87CEEB" opacity="0.7" />
            <rect x="105" y="30" width="30" height="12" rx="2" fill="#87CEEB" opacity="0.7" />

            {/* Wheels */}
            <circle cx="55" cy="80" r="12" fill="#2c2c2c" />
            <circle cx="55" cy="80" r="7" fill="#4a4a4a" />
            <circle cx="145" cy="80" r="12" fill="#2c2c2c" />
            <circle cx="145" cy="80" r="7" fill="#4a4a4a" />

            {/* Headlights */}
            <circle cx="165" cy="55" r="3" fill="#FFD700" />
            <circle cx="165" cy="65" r="3" fill="#FF4500" />

            {/* Door Lines */}
            <line x1="100" y1="45" x2="100" y2="80" stroke={colors.background} strokeWidth="1" />

            {/* Window Frame */}
            <rect x="50" y="25" width="100" height="20" rx="3" fill="none" stroke={colors.background} strokeWidth="2" />
        </svg>
    );

    return (
        <section
            id="vehicles"
            style={{
                padding: '120px 20px',
                backgroundColor: colors.surface,
                position: 'relative'
            }}
        >
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '900',
                        color: colors.textPrimary,
                        fontFamily: fonts.title,
                        marginBottom: '20px',
                        letterSpacing: '-0.02em'
                    }}>
                        Our <span style={{
                            background: theme.getGradient(),
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Fleet</span>
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        color: colors.textSecondary,
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.8'
                    }}>
                        Choose from our wide range of well-maintained vehicles for your journey across Pakistan
                    </p>
                </div>

                {/* Vehicles Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
                                padding: '40px 30px 20px',
                                background: `linear-gradient(135deg, ${colors.surface}, ${colors.background})`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '180px'
                            }}>
                                <CarSVG color={vehicle.color} />
                            </div>

                            {/* Vehicle Info */}
                            <div style={{ padding: '32px' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '12px'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.6rem',
                                            fontWeight: '800',
                                            color: colors.textPrimary,
                                            fontFamily: fonts.title,
                                            marginBottom: '6px'
                                        }}>
                                            {vehicle.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: colors.textSecondary,
                                            fontWeight: '500'
                                        }}>
                                            {vehicle.type}
                                        </p>
                                    </div>
                                    <div style={{
                                        padding: '8px 16px',
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

                                {/* Specs */}
                                <div style={{
                                    display: 'flex',
                                    gap: '20px',
                                    marginBottom: '24px',
                                    paddingBottom: '20px',
                                    borderBottom: `1px solid ${colors.border}`
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            color: colors.textSecondary,
                                            fontWeight: '500'
                                        }}>
                                            {vehicle.capacity}
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}
                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: colors.textSecondary,
                                        marginBottom: '12px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Features
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '8px'
                                    }}>
                                        {vehicle.features.slice(0, 3).map((feature, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    padding: '6px 12px',
                                                    borderRadius: '50px',
                                                    background: `${colors.surface}80`,
                                                    border: `1px solid ${colors.border}`,
                                                    color: colors.textSecondary,
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Price and CTA */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '20px',
                                    background: `${colors.surface}60`,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.border}`
                                }}>
                                    <div>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: colors.textSecondary,
                                            marginBottom: '4px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Per Day
                                        </div>
                                        <div style={{
                                            fontSize: '1.8rem',
                                            fontWeight: '900',
                                            color: colors.primary,
                                            fontFamily: fonts.title
                                        }}>
                                            PKR {vehicle.pricePerDay.toLocaleString()}
                                        </div>
                                    </div>
                                    <button
                                        style={{
                                            padding: '12px 24px',
                                            borderRadius: '12px',
                                            background: theme.getGradient(),
                                            border: 'none',
                                            color: colors.textPrimary,
                                            fontSize: '0.9rem',
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
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Banner */}
                <div style={{
                    marginTop: '80px',
                    padding: '40px',
                    background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}10)`,
                    borderRadius: '24px',
                    border: `1px solid ${colors.primary}30`,
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: colors.textPrimary,
                        fontFamily: fonts.title,
                        marginBottom: '12px'
                    }}>
                        All Vehicles Include
                    </h3>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '32px',
                        marginTop: '24px'
                    }}>
                        {[
                            '✓ Full Insurance Coverage',
                            '✓ 24/7 Roadside Assistance',
                            '✓ Free Driver (Optional)',
                            '✓ Unlimited Mileage'
                        ].map((item, i) => (
                            <span
                                key={i}
                                style={{
                                    fontSize: '1rem',
                                    color: colors.textSecondary,
                                    fontWeight: '600'
                                }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
};

export default VehiclesSection;
