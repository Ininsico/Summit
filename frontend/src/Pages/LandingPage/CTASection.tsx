import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        destination: '',
        travelDate: '',
        travelers: '1',
        message: ''
    });

    const colors = {
        white: '#ffffff',
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
            if (formRef.current) {
                // Ensure it's visible by default, animate FROM hidden
                gsap.set(formRef.current, { visibility: 'visible' });

                gsap.from(formRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 85%',
                        // Play when entering, reverse when leaving upwards, but stay visible otherwise
                        toggleActions: 'play none none none',
                    }
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
        alert('Thank you! We will contact you soon.');
    };

    const destinations = [
        'Nanga Parbat',
        'Rakaposhi Base Camp',
        'Shangrila Desert (Skardu)',
        'Hunza Valley',
        'Fairy Meadows',
        'Kaghan Valley',
        'Naran',
        'Other'
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            style={{
                position: 'relative',
                padding: '120px 20px',
                backgroundColor: colors.white,
                overflow: 'hidden',
            }}
        >
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
          linear-gradient(${colors.primary}10 1px, transparent 1px),
          linear-gradient(90deg, ${colors.primary}10 1px, transparent 1px)
        `,
                backgroundSize: '50px 50px',
                opacity: 0.3,
                zIndex: 0
            }} />

            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '60px',
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
                        Start Your Journey
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
                        Ready to Explore Pakistan?
                    </h2>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        color: '#4a5568',
                        lineHeight: '1.8',
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontFamily: fonts.body,
                    }}>
                        Fill out the form below and our travel experts will contact you within 24 hours
                        to plan your perfect adventure in Northern Pakistan.
                    </p>
                </div>

                {/* Form Container */}
                <div
                    ref={formRef}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        background: `linear-gradient(135deg, ${colors.surface}f5, ${colors.background}f5)`,
                        borderRadius: '32px',
                        padding: '60px 50px',
                        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)',
                        border: `1px solid ${colors.border}`,
                        opacity: 1
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        {/* Name and Email Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '24px',
                            marginBottom: '24px'
                        }}>
                            {/* Name */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '8px',
                                    fontFamily: fonts.body
                                }}>
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${colors.border}`,
                                        backgroundColor: `${colors.surface}80`,
                                        color: colors.textPrimary,
                                        fontFamily: fonts.body,
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary;
                                        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '8px',
                                    fontFamily: fonts.body
                                }}>
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${colors.border}`,
                                        backgroundColor: `${colors.surface}80`,
                                        color: colors.textPrimary,
                                        fontFamily: fonts.body,
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary;
                                        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Phone and Destination Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '24px',
                            marginBottom: '24px'
                        }}>
                            {/* Phone */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '8px',
                                    fontFamily: fonts.body
                                }}>
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+92 300 1234567"
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${colors.border}`,
                                        backgroundColor: `${colors.surface}80`,
                                        color: colors.textPrimary,
                                        fontFamily: fonts.body,
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary;
                                        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Destination */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '8px',
                                    fontFamily: fonts.body
                                }}>
                                    Preferred Destination *
                                </label>
                                <select
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${colors.border}`,
                                        backgroundColor: `${colors.surface}80`,
                                        color: colors.textPrimary,
                                        fontFamily: fonts.body,
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary;
                                        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    <option value="">Select destination</option>
                                    {destinations.map((dest, idx) => (
                                        <option key={idx} value={dest}>{dest}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Travel Date and Travelers Row */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '24px',
                            marginBottom: '24px'
                        }}>
                            {/* Travel Date */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '8px',
                                    fontFamily: fonts.body
                                }}>
                                    Preferred Travel Date
                                </label>
                                <input
                                    type="date"
                                    name="travelDate"
                                    value={formData.travelDate}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${colors.border}`,
                                        backgroundColor: `${colors.surface}80`,
                                        color: colors.textPrimary,
                                        fontFamily: fonts.body,
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary;
                                        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Number of Travelers */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: colors.textPrimary,
                                    marginBottom: '8px',
                                    fontFamily: fonts.body
                                }}>
                                    Number of Travelers
                                </label>
                                <select
                                    name="travelers"
                                    value={formData.travelers}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${colors.border}`,
                                        backgroundColor: `${colors.surface}80`,
                                        color: colors.textPrimary,
                                        fontFamily: fonts.body,
                                        transition: 'all 0.3s ease',
                                        outline: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary;
                                        e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = colors.border;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num, idx) => (
                                        <option key={idx} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div style={{ marginBottom: '32px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                color: colors.textPrimary,
                                marginBottom: '8px',
                                fontFamily: fonts.body
                            }}>
                                Additional Message (Optional)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Tell us about your travel preferences, budget, or any special requirements..."
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    fontSize: '1rem',
                                    borderRadius: '12px',
                                    border: `2px solid ${colors.border}`,
                                    backgroundColor: `${colors.surface}80`,
                                    color: colors.textPrimary,
                                    fontFamily: fonts.body,
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    resize: 'vertical'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = colors.primary;
                                    e.target.style.boxShadow = `0 0 0 4px ${colors.primary}20`;
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = colors.border;
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '18px 40px',
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                                color: colors.textPrimary,
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontFamily: fonts.body,
                                boxShadow: `0 10px 40px ${colors.primary}40`,
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    y: -4,
                                    scale: 1.02,
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
                            🚀 Start Planning My Trip
                        </button>

                        {/* Privacy Note */}
                        <p style={{
                            marginTop: '20px',
                            fontSize: '0.85rem',
                            color: colors.textSecondary,
                            textAlign: 'center',
                            fontFamily: fonts.body,
                            lineHeight: '1.6'
                        }}>
                            🔒 Your information is secure and will only be used to contact you about your trip.
                            We respect your privacy.
                        </p>
                    </form>
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        /* Responsive */
        @media (max-width: 768px) {
          #contact {
            padding: 80px 20px !important;
          }

          #contact form > div > div {
            padding: 50px 30px !important;
          }
        }

        @media (max-width: 480px) {
          #contact {
            padding: 60px 16px !important;
          }

          #contact form > div > div {
            padding: 40px 24px !important;
          }
        }

        /* Custom Select Arrow */
        select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234A90E2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 20px;
          padding-right: 40px !important;
        }

        /* Placeholder Color */
        input::placeholder,
        textarea::placeholder {
          color: #6b7280;
          opacity: 0.7;
        }
      `}</style>
        </section>
    );
};

export default CTASection;
