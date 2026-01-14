import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Componenets/Header';
import Footer from '../LandingPage/Footer';
import { theme } from '../../theme/ThemeSystem';
import { useAppStore } from '../../store/useAppStore';
import { bookingAPI, destinationAPI } from '../../services/api';

const DestinationsPage = () => {
    const { isAuthenticated } = useAppStore();
    const colors = theme.getColors();
    const fonts = theme.getFonts();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [destinations, setDestinations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res: any = await destinationAPI.getAll();
                if (res.success) {
                    setDestinations(res.destinations);
                }
            } catch (error) {
                console.error('Failed to fetch destinations', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    const handleBooking = async (dest: any) => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }

        try {
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + 7); // 7 days default

            const bookingData = {
                type: 'destination',
                itemName: dest.name,
                destination: dest.location,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                guests: 2, // Default
                totalPrice: 50000 // Placeholder price for destinations
            };

            const response: any = await bookingAPI.create(bookingData);
            if (response.success) {
                alert(`Successfully booked trip to ${dest.name}!`);
            }
        } catch (error: any) {
            console.error('Booking error:', error);
            alert(error.message || 'Error creating booking');
        }
    };

    const categories = ['All', 'Mountains', 'Valleys', 'Lakes', 'Historical'];



    const filteredDestinations = selectedCategory === 'All'
        ? destinations
        : destinations.filter(d => d.category === selectedCategory);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return '#10b981';
            case 'Moderate': return colors.primary;
            case 'Hard': return '#ef4444';
            default: return colors.textSecondary;
        }
    };

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
                {/* Background Effects */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '-10%',
                    width: '800px',
                    height: '800px',
                    background: `radial-gradient(circle, ${colors.primary}12 0%, transparent 70%)`,
                    filter: 'blur(120px)',
                    zIndex: 0
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
                    filter: 'blur(100px)',
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
                        Explore <span style={{
                            background: theme.getGradient(),
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Pakistan</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                        color: colors.textSecondary,
                        maxWidth: '900px',
                        margin: '0 auto 60px',
                        lineHeight: '1.8'
                    }}>
                        From towering peaks to ancient civilizations, discover the diverse beauty and rich heritage of Pakistan's most stunning destinations.
                    </p>

                    {/* Category Filter */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginTop: '40px'
                    }}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                style={{
                                    padding: '14px 32px',
                                    borderRadius: '50px',
                                    border: `2px solid ${selectedCategory === category ? colors.primary : colors.border}`,
                                    background: selectedCategory === category
                                        ? theme.getGradient()
                                        : 'transparent',
                                    color: colors.textPrimary,
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: fonts.body
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedCategory !== category) {
                                        e.currentTarget.style.borderColor = colors.primary;
                                        e.currentTarget.style.background = `${colors.primary}20`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedCategory !== category) {
                                        e.currentTarget.style.borderColor = colors.border;
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
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
                        {filteredDestinations.map((destination, idx) => (
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
                                {/* Image */}
                                <div style={{
                                    width: '100%',
                                    height: '280px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />

                                    {/* Category Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        padding: '8px 20px',
                                        borderRadius: '50px',
                                        background: `${colors.background}e0`,
                                        backdropFilter: 'blur(10px)',
                                        border: `1px solid ${colors.primary}40`,
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        color: colors.primary
                                    }}>
                                        {destination.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '32px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        marginBottom: '12px'
                                    }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            color: colors.textSecondary,
                                            fontWeight: '500'
                                        }}>
                                            {destination.location}
                                        </span>
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.8rem',
                                        fontWeight: '800',
                                        color: colors.textPrimary,
                                        fontFamily: fonts.title,
                                        marginBottom: '16px'
                                    }}>
                                        {destination.name}
                                    </h3>

                                    <p style={{
                                        fontSize: '1rem',
                                        color: colors.textSecondary,
                                        lineHeight: '1.7',
                                        marginBottom: '24px'
                                    }}>
                                        {destination.description}
                                    </p>

                                    {/* Info Grid */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px',
                                        marginBottom: '24px',
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
                                                Best Time
                                            </div>
                                            <div style={{
                                                fontSize: '0.95rem',
                                                color: colors.textPrimary,
                                                fontWeight: '600'
                                            }}>
                                                {destination.bestTime}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: colors.textSecondary,
                                                marginBottom: '4px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                Duration
                                            </div>
                                            <div style={{
                                                fontSize: '0.95rem',
                                                color: colors.textPrimary,
                                                fontWeight: '600'
                                            }}>
                                                {destination.duration}
                                            </div>
                                        </div>
                                        <div style={{ gridColumn: 'span 2' }}>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: colors.textSecondary,
                                                marginBottom: '8px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                Difficulty
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '6px 16px',
                                                borderRadius: '50px',
                                                background: `${getDifficultyColor(destination.difficulty)}20`,
                                                color: getDifficultyColor(destination.difficulty),
                                                fontSize: '0.85rem',
                                                fontWeight: '700'
                                            }}>
                                                {destination.difficulty}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: colors.textSecondary,
                                            marginBottom: '12px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Highlights
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '8px'
                                        }}>
                                            {destination.highlights.slice(0, 3).map((highlight: string, i: number) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        padding: '6px 14px',
                                                        borderRadius: '50px',
                                                        background: `${colors.primary}15`,
                                                        border: `1px solid ${colors.primary}30`,
                                                        color: colors.primaryLight,
                                                        fontSize: '0.8rem',
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => handleBooking(destination)}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            background: theme.getGradient(),
                                            border: 'none',
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            fontFamily: fonts.body,
                                            boxShadow: `0 8px 20px ${colors.primary}30`
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.02)';
                                            e.currentTarget.style.boxShadow = `0 12px 30px ${colors.primary}50`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}30`;
                                        }}
                                    >
                                        Explore Destination →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredDestinations.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            color: colors.textSecondary,
                            fontSize: '1.2rem'
                        }}>
                            No destinations found in this category.
                        </div>
                    )}
                </div>
            </section>

            {/* Customize Your Trip Section */}
            <section style={{
                padding: '120px 20px',
                backgroundColor: colors.background,
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: '800',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '20px',
                            letterSpacing: '-0.02em'
                        }}>
                            Customize Your <span style={{
                                background: theme.getGradient(),
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>Trip</span>
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: colors.textSecondary,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            Tell us about your dream adventure and we'll create a personalized itinerary just for you
                        </p>
                    </div>

                    <div style={{
                        background: `${colors.surface}80`,
                        backdropFilter: 'blur(20px)',
                        borderRadius: '30px',
                        padding: '60px 40px',
                        border: `1px solid ${colors.border}`
                    }}>
                        <form style={{
                            display: 'grid',
                            gap: '32px'
                        }}>
                            {/* Name and Email Row */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '24px'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: colors.textPrimary,
                                        marginBottom: '12px',
                                        fontFamily: fonts.body
                                    }}>Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.background}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: colors.textPrimary,
                                        marginBottom: '12px',
                                        fontFamily: fonts.body
                                    }}>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.background}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Destination and Duration Row */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '24px'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: colors.textPrimary,
                                        marginBottom: '12px',
                                        fontFamily: fonts.body
                                    }}>Preferred Destination</label>
                                    <select
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.background}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option>Select a destination</option>
                                        {destinations.map((dest, i) => (
                                            <option key={i} value={dest.name}>{dest.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: colors.textPrimary,
                                        marginBottom: '12px',
                                        fontFamily: fonts.body
                                    }}>Trip Duration</label>
                                    <select
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.background}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option>Select duration</option>
                                        <option>1-3 Days</option>
                                        <option>4-7 Days</option>
                                        <option>8-14 Days</option>
                                        <option>15+ Days</option>
                                    </select>
                                </div>
                            </div>

                            {/* Budget and Group Size Row */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '24px'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: colors.textPrimary,
                                        marginBottom: '12px',
                                        fontFamily: fonts.body
                                    }}>Budget Range</label>
                                    <select
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.background}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option>Select budget</option>
                                        <option>Under PKR 50,000</option>
                                        <option>PKR 50,000 - 100,000</option>
                                        <option>PKR 100,000 - 200,000</option>
                                        <option>Above PKR 200,000</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: colors.textPrimary,
                                        marginBottom: '12px',
                                        fontFamily: fonts.body
                                    }}>Group Size</label>
                                    <input
                                        type="number"
                                        placeholder="Number of travelers"
                                        min="1"
                                        style={{
                                            width: '100%',
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.background}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '12px',
                                    fontFamily: fonts.body
                                }}>Special Requests or Preferences</label>
                                <textarea
                                    placeholder="Tell us about any specific requirements, activities you'd like to include, dietary restrictions, etc."
                                    rows={5}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: '12px',
                                        border: `1px solid ${colors.border}`,
                                        background: `${colors.background}80`,
                                        color: colors.textPrimary,
                                        fontSize: '1rem',
                                        fontFamily: fonts.body,
                                        outline: 'none',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                style={{
                                    padding: '18px 48px',
                                    borderRadius: '12px',
                                    background: theme.getGradient(),
                                    border: 'none',
                                    color: colors.textPrimary,
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontFamily: fonts.body,
                                    boxShadow: `0 8px 20px ${colors.primary}30`,
                                    width: '100%'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                    e.currentTarget.style.boxShadow = `0 12px 30px ${colors.primary}50`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}30`;
                                }}
                            >
                                Get Custom Itinerary →
                            </button>
                        </form>
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

        @media (max-width: 480px) {
          section > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default DestinationsPage;
