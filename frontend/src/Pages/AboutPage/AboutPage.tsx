// AboutPage.tsx - Complete About page with 4 sections
import Header from '../../Componenets/Header';
import Footer from '../LandingPage/Footer';
import { theme } from '../../theme/ThemeSystem';

const AboutPage = () => {
    const colors = theme.getColors();
    const fonts = theme.getFonts();

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
                {/* Background Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
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
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        fontWeight: '900',
                        color: colors.textPrimary,
                        fontFamily: fonts.title,
                        marginBottom: '24px',
                        letterSpacing: '-0.02em'
                    }}>
                        About <span style={{
                            background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.accent})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Summit</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        color: colors.textSecondary,
                        maxWidth: '800px',
                        margin: '0 auto 48px',
                        lineHeight: '1.8'
                    }}>
                        We're on a mission to make Pakistan's breathtaking landscapes accessible to everyone through expertly curated travel experiences.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '32px',
                        marginTop: '60px'
                    }}>
                        {[
                            { number: '500+', label: 'Destinations' },
                            { number: '10K+', label: 'Happy Travelers' },
                            { number: '50+', label: 'Expert Guides' },
                            { number: '5★', label: 'Average Rating' }
                        ].map((stat, idx) => (
                            <div key={idx} style={{
                                padding: '32px',
                                background: `${colors.surface}80`,
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                border: `1px solid ${colors.border}`,
                                transition: 'transform 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    fontWeight: '900',
                                    background: theme.getGradient(),
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    fontFamily: fonts.title,
                                    marginBottom: '8px'
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    color: colors.textSecondary,
                                    fontWeight: '500'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section style={{
                padding: '120px 20px',
                backgroundColor: colors.surface,
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '60px',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: '800',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '24px',
                            letterSpacing: '-0.02em'
                        }}>
                            Our Story
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textSecondary,
                            lineHeight: '1.8',
                            marginBottom: '20px'
                        }}>
                            Founded in 2020, Summit was born from a simple belief: Pakistan's natural beauty deserves to be explored safely and sustainably. Our founders, a group of passionate mountaineers and travel enthusiasts, noticed a gap in the market for premium, well-organized adventure travel experiences.
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textSecondary,
                            lineHeight: '1.8',
                            marginBottom: '20px'
                        }}>
                            What started as weekend trips to the northern areas has grown into a full-fledged travel company, serving thousands of adventurers annually. We've built partnerships with local communities, ensuring that tourism benefits everyone involved.
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textSecondary,
                            lineHeight: '1.8'
                        }}>
                            Today, Summit stands as Pakistan's premier adventure travel company, combining safety, sustainability, and unforgettable experiences.
                        </p>
                    </div>

                    <div style={{
                        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                        borderRadius: '30px',
                        padding: '60px 40px',
                        border: `1px solid ${colors.border}`,
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h3 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '24px'
                        }}>
                            Our Mission
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textSecondary,
                            lineHeight: '1.8',
                            marginBottom: '32px'
                        }}>
                            To make Pakistan's natural wonders accessible to everyone while preserving the environment and supporting local communities.
                        </p>

                        <h3 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '24px'
                        }}>
                            Our Vision
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            color: colors.textSecondary,
                            lineHeight: '1.8'
                        }}>
                            To become the world's most trusted adventure travel company, setting the standard for sustainable tourism in South Asia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section style={{
                padding: '120px 20px',
                backgroundColor: colors.background,
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: '800',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '20px',
                            letterSpacing: '-0.02em'
                        }}>
                            Our Core Values
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: colors.textSecondary,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            {
                                icon: '🏔️',
                                title: 'Safety First',
                                description: 'Your safety is our top priority. All our trips are led by certified guides with comprehensive safety protocols.'
                            },
                            {
                                icon: '🌱',
                                title: 'Sustainability',
                                description: 'We practice responsible tourism, minimizing our environmental impact and supporting conservation efforts.'
                            },
                            {
                                icon: '🤝',
                                title: 'Community Focus',
                                description: 'We partner with local communities, ensuring tourism benefits the people who call these places home.'
                            },
                            {
                                icon: '⭐',
                                title: 'Excellence',
                                description: 'We strive for excellence in every aspect of our service, from planning to execution.'
                            },
                            {
                                icon: '🎯',
                                title: 'Authenticity',
                                description: 'We provide genuine cultural experiences, connecting you with the real Pakistan.'
                            },
                            {
                                icon: '💡',
                                title: 'Innovation',
                                description: 'We continuously improve our services using technology and customer feedback.'
                            }
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '40px 32px',
                                    background: `${colors.surface}80`,
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '24px',
                                    border: `1px solid ${colors.border}`,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.borderColor = colors.primary;
                                    e.currentTarget.style.boxShadow = `0 20px 40px ${colors.primary}20`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = colors.border;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '20px'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: colors.textPrimary,
                                    fontFamily: fonts.title,
                                    marginBottom: '12px'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: colors.textSecondary,
                                    lineHeight: '1.6'
                                }}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section style={{
                padding: '120px 20px',
                backgroundColor: colors.surface,
                position: 'relative'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: '800',
                            color: colors.textPrimary,
                            fontFamily: fonts.title,
                            marginBottom: '20px',
                            letterSpacing: '-0.02em'
                        }}>
                            Meet Our Team
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: colors.textSecondary,
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}>
                            The passionate people behind your adventures
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px'
                    }}>
                        <div
                            style={{
                                background: `${colors.background}80`,
                                backdropFilter: 'blur(10px)',
                                borderRadius: '24px',
                                border: `1px solid ${colors.border}`,
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                maxWidth: '400px',
                                width: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.borderColor = colors.primary;
                                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                                if (img) img.style.filter = 'grayscale(0%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = colors.border;
                                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                                if (img) img.style.filter = 'grayscale(100%)';
                            }}
                        >
                            {/* Image */}
                            <div style={{
                                width: '100%',
                                height: '400px',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <img
                                    src="/ArslanPic.jpeg"
                                    alt="Arslan Rathore"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: 'grayscale(100%)',
                                        transition: 'filter 0.5s ease'
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div style={{ padding: '32px' }}>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '700',
                                    color: colors.textPrimary,
                                    fontFamily: fonts.title,
                                    marginBottom: '8px'
                                }}>
                                    Arslan Rathore
                                </h3>
                                <p style={{
                                    fontSize: '1.1rem',
                                    color: colors.primary,
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }}>
                                    Lead Developer
                                </p>
                                <p style={{
                                    fontSize: '1rem',
                                    color: colors.textSecondary,
                                    lineHeight: '1.6'
                                }}>
                                    Full-stack developer and tech enthusiast passionate about creating exceptional digital experiences. Specializes in modern web technologies and scalable solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default AboutPage;