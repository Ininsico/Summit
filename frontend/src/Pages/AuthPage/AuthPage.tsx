// AuthPage.tsx - Sign In/Sign Up page for Summit
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../theme/ThemeSystem';
import { authAPI } from '../../services/api';
import { useAppStore } from '../../store/useAppStore';

const AuthPage = () => {
    const { setUser, setToken } = useAppStore();
    const colors = theme.getColors();
    const fonts = theme.getFonts();
    const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (isSignUp && !formData.firstName) {
            setError('First name is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            if (isSignUp) {
                const response: any = await authAPI.register(formData);
                if (response.success) {
                    setToken(response.token);
                    setUser(response.user);
                    // Redirect based on role
                    if (response.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                }
            } else {
                const response: any = await authAPI.login({
                    email: formData.email,
                    password: formData.password
                });
                if (response.success) {
                    setToken(response.token);
                    setUser(response.user);
                    // Redirect based on role
                    if (response.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                }
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Signing in with ${provider}`);
        // For a real app, this would redirect to OAuth flow
        navigate('/');
    };

    // SVG Icons
    const MailIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );

    const KeyIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="m21 2-9.6 9.6" />
            <path d="m15.5 7.5 3 3L22 7l-3-3" />
        </svg>
    );

    const UserIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );

    const EyeIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    const EyeOffIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-.722-3.25" />
            <path d="M2 8a10.645 10.645 0 0 0 20 0" />
            <path d="m20 15-1.726-2.05" />
            <path d="m4 15 1.726-2.05" />
            <path d="m9 18 .722-3.25" />
        </svg>
    );

    const ArrowRightIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );

    const MountainIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            backgroundColor: colors.background,
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Main Container */}
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: isSignUp ? 'row-reverse' : 'row',
                transition: 'all 0.5s ease'
            }}>
                {/* Form Side */}
                <div style={{
                    width: '50%',
                    padding: '80px 64px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div style={{ maxWidth: '480px', width: '100%' }}>
                        {/* Header */}
                        <div style={{ marginBottom: '40px' }}>
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: '900',
                                color: colors.textPrimary,
                                fontFamily: fonts.title,
                                marginBottom: '12px'
                            }}>
                                {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
                            </h1>
                            <p style={{
                                fontSize: '1rem',
                                color: colors.textSecondary,
                                fontFamily: fonts.body
                            }}>
                                {isSignUp ? 'Create your account to book amazing adventures' : 'Sign in to continue your adventure'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={{
                                marginBottom: '24px',
                                padding: '14px 18px',
                                borderRadius: '12px',
                                background: '#ef444420',
                                border: '1px solid #ef444440',
                                color: '#ef4444',
                                fontSize: '0.9rem'
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Name Fields (Sign Up Only) */}
                            {isSignUp && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                        <label style={{
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: colors.textSecondary,
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            First Name
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{
                                                position: 'absolute',
                                                left: '14px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: colors.textSecondary
                                            }}>
                                                <UserIcon />
                                            </div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="John"
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 14px 14px 42px',
                                                    borderRadius: '12px',
                                                    border: `1px solid ${colors.border}`,
                                                    background: `${colors.surface}80`,
                                                    color: colors.textPrimary,
                                                    fontSize: '1rem',
                                                    fontFamily: fonts.body,
                                                    outline: 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                                                onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: colors.textSecondary,
                                            display: 'block',
                                            marginBottom: '8px'
                                        }}>
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                borderRadius: '12px',
                                                border: `1px solid ${colors.border}`,
                                                background: `${colors.surface}80`,
                                                color: colors.textPrimary,
                                                fontSize: '1rem',
                                                fontFamily: fonts.body,
                                                outline: 'none',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                                            onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: colors.textSecondary,
                                    display: 'block',
                                    marginBottom: '8px'
                                }}>
                                    Email
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: colors.textSecondary
                                    }}>
                                        <MailIcon />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="you@example.com"
                                        style={{
                                            width: '100%',
                                            padding: '14px 14px 14px 42px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.surface}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                                        onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: colors.textSecondary,
                                    display: 'block',
                                    marginBottom: '8px'
                                }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: colors.textSecondary
                                    }}>
                                        <KeyIcon />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%',
                                            padding: '14px 48px 14px 42px',
                                            borderRadius: '12px',
                                            border: `1px solid ${colors.border}`,
                                            background: `${colors.surface}80`,
                                            color: colors.textPrimary,
                                            fontSize: '1rem',
                                            fontFamily: fonts.body,
                                            outline: 'none',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                                        onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '14px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: colors.textSecondary,
                                            cursor: 'pointer',
                                            padding: '4px'
                                        }}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            {!isSignUp && (
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: colors.primary,
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontFamily: fonts.body
                                        }}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    background: theme.getGradient(),
                                    border: 'none',
                                    color: colors.textPrimary,
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    fontFamily: fonts.body,
                                    boxShadow: `0 8px 20px ${colors.primary}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.3s ease',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!isLoading) {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                        e.currentTarget.style.boxShadow = `0 12px 30px ${colors.primary}50`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = `0 8px 20px ${colors.primary}30`;
                                }}
                            >
                                {isLoading ? (
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                ) : (
                                    <>
                                        {isSignUp ? 'Create Account' : 'Sign In'}
                                        <ArrowRightIcon />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div style={{ position: 'relative', paddingTop: '16px', paddingBottom: '16px' }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ width: '100%', borderTop: `1px solid ${colors.border}` }} />
                                </div>
                                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <span style={{
                                        padding: '0 16px',
                                        background: colors.background,
                                        color: colors.textSecondary,
                                        fontSize: '0.875rem'
                                    }}>
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Google')}
                                    style={{
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: `1px solid ${colors.border}`,
                                        background: 'transparent',
                                        color: colors.textPrimary,
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontFamily: fonts.body,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `${colors.surface}80`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Facebook')}
                                    style={{
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: `1px solid ${colors.border}`,
                                        background: 'transparent',
                                        color: colors.textPrimary,
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontFamily: fonts.body,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `${colors.surface}80`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>

                            {/* Toggle Sign In/Up */}
                            <div style={{
                                marginTop: '24px',
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}>
                                <span style={{ color: colors.textSecondary }}>
                                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: colors.primary,
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        fontFamily: fonts.body,
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {isSignUp ? 'Sign In' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Branding Side */}
                <div style={{
                    width: '50%',
                    padding: '64px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: theme.getGradient(),
                        zIndex: 0
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(/hunza.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.15,
                        mixBlendMode: 'overlay',
                        zIndex: 1
                    }} />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                <MountainIcon />
                            </div>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: '900',
                                color: 'white',
                                fontFamily: fonts.title,
                                letterSpacing: '1px'
                            }}>
                                SUMMIT
                            </span>
                        </div>
                    </div>

                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '520px' }}>
                        <h2 style={{
                            fontSize: '3rem',
                            fontWeight: '900',
                            color: 'white',
                            fontFamily: fonts.title,
                            marginBottom: '24px',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em'
                        }}>
                            {isSignUp
                                ? 'Discover Pakistan\'s Hidden Gems'
                                : 'Your Adventure Awaits'}
                        </h2>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: '1.8',
                            fontFamily: fonts.body
                        }}>
                            {isSignUp
                                ? 'Join thousands of travelers exploring breathtaking destinations. From towering peaks to ancient valleys, your next adventure begins here.'
                                : 'Continue your journey through Pakistan\'s most stunning landscapes. Your bookings, preferences, and adventures are waiting.'}
                        </p>
                    </div>

                    <div style={{
                        position: 'relative',
                        zIndex: 10,
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.875rem'
                    }}>
                        © 2026 Summit Travel. All rights reserved.
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @media (max-width: 768px) {
          div[style*="width: 50%"] {
            width: 100% !important;
          }
        }
      `}</style>
        </div>
    );
};

export default AuthPage;
