import { useEffect, useState } from 'react';
import { theme } from '../../theme/ThemeSystem';
import { useAppStore } from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';

// Components
// Note: We might want to keep the sections modular but the layout will change
import ProfileSection from './components/ProfileSection';
import MyBookingsSection from './components/MyBookingsSection';
import BookTripSection from './components/BookTripSection';
import AvailabilitySection from './components/AvailabilitySection';
import NewBookingFlow from './components/NewBookingFlow';
import { CheckCircleIcon, MapPinIcon, UserIcon, CompassIcon, CalendarIcon } from './components/DashboardIcons';
import { BookingsIcon, StatsIcon } from '../Admin/components/AdminIcons';

const DashboardPage = () => {
    const { isAuthenticated, user, logout } = useAppStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);
    const [bookingInitialType, setBookingInitialType] = useState<'trip' | 'vehicle'>('trip');
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const colors = theme.getColors();

    const openBookingFlow = (type: 'trip' | 'vehicle') => {
        setBookingInitialType(type);
        setIsBookingFlowOpen(true);
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const renderOverview = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <ProfileSection />
                </div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
                <div style={{
                    background: theme.getGradient(),
                    borderRadius: '30px',
                    padding: '40px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px',
                    boxShadow: `0 20px 40px ${colors.primary}30`
                }}>
                    <CompassIcon size={48} color="white" />
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', margin: 0 }}>Join the Elite</h2>
                        <p style={{ opacity: 0.9, fontSize: '1.1rem', margin: '10px 0 0 0' }}>Unlock exclusive Skardu expeditions and priority resource allocation.</p>
                    </div>
                    <button style={{ width: 'fit-content', padding: '12px 24px', borderRadius: '12px', background: 'white', border: 'none', color: colors.primary, fontWeight: '900', cursor: 'pointer' }}>Upgrade Status</button>
                </div>
                <BookTripSection onOpenFlow={openBookingFlow} />
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: colors.background, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Unified Dashboard Header */}
            <header style={{
                padding: '16px 40px',
                background: `${colors.surface}B0`,
                backdropFilter: 'blur(30px)',
                borderBottom: `1px solid ${colors.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                    <div style={{ width: '40px', height: '40px', background: theme.getGradient(), borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/Summit.png" alt="S" style={{ width: '24px' }} />
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900', color: colors.textPrimary, letterSpacing: '-0.5px' }}>SUMMIT</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '20px', borderRight: `1px solid ${colors.border}` }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: colors.textPrimary, fontWeight: '800', fontSize: '0.9rem' }}>{user?.firstName}</div>
                            <div style={{ color: colors.primary, fontWeight: '900', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>TRAVELER</div>
                        </div>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}10)`, border: `1px solid ${colors.primary}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            {user?.profilePicture ? (
                                <img src={user.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <UserIcon size={20} color={colors.primary} />
                            )}
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            padding: '10px 20px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '10px',
                            color: '#ef4444',
                            fontWeight: '700',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                {/* Sidebar Layout matched with Admin */}
                <aside style={{
                    width: '300px',
                    padding: '40px 24px',
                    borderRight: `1px solid ${colors.border}`,
                    background: `${colors.surface}40`,
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                    position: 'sticky',
                    top: '73px',
                    height: 'calc(100vh - 73px)'
                }}>
                    <div>
                        <span style={{ color: colors.primary, fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px' }}>TRIP PLANNING</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: colors.textPrimary, marginTop: '8px' }}>User Dashboard</h2>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { id: 'overview', label: 'Trip Overview', icon: <StatsIcon size={20} /> },
                            { id: 'expeditions', label: 'My Bookings', icon: <BookingsIcon size={20} /> },
                            { id: 'planning', label: 'Plan New Trip', icon: <CalendarIcon size={20} /> },
                            { id: 'profile', label: 'My Profile', icon: <UserIcon size={20} /> },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px 20px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    background: activeTab === item.id ? theme.getGradient() : 'transparent',
                                    color: activeTab === item.id ? 'white' : colors.textSecondary,
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'left'
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div style={{ marginTop: 'auto', padding: '24px', background: `${colors.primary}10`, borderRadius: '24px', border: `1px solid ${colors.primary}20` }}>
                        <p style={{ color: colors.textPrimary, fontSize: '0.85rem', fontWeight: '800', margin: '0 0 12px 0' }}>Need Help?</p>
                        <button
                            onClick={() => navigate('/about')}
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: colors.primary, color: 'white', border: 'none', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                            Contact Support
                        </button>
                    </div>
                </aside>

                <main style={{ flex: 1, padding: '60px 40px', position: 'relative' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                        {/* Header matched with Admin */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                            <div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: colors.textPrimary, margin: 0 }}>
                                    {activeTab === 'overview' ? 'Account Status' :
                                        activeTab === 'expeditions' ? 'Booking History' :
                                            activeTab === 'planning' ? 'Planned Trips' : 'Profile Settings'}
                                </h1>
                                <p style={{ color: colors.textSecondary, fontSize: '1.1rem', marginTop: '8px' }}>
                                    Welcome back, {user?.firstName}. Plan your next adventure.
                                </p>
                            </div>
                            <button
                                onClick={() => openBookingFlow('trip')}
                                style={{
                                    padding: '16px 32px',
                                    borderRadius: '16px',
                                    background: theme.getGradient(),
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: '900',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    boxShadow: `0 10px 30px ${colors.primary}40`
                                }}
                            >
                                <MapPinIcon size={20} />
                                Book a Trip
                            </button>
                        </div>

                        {activeTab === 'overview' && renderOverview()}
                        {activeTab === 'expeditions' && <MyBookingsSection key={refreshKey} />}
                        {activeTab === 'planning' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                <AvailabilitySection />
                                <BookTripSection onOpenFlow={openBookingFlow} />
                            </div>
                        )}
                        {activeTab === 'profile' && <ProfileSection />}
                    </div>
                </main>
            </div>

            {/* Modal Flow */}
            {isBookingFlowOpen && (
                <NewBookingFlow
                    initialType={bookingInitialType}
                    onClose={() => setIsBookingFlowOpen(false)}
                    onSuccess={() => setRefreshKey(prev => prev + 1)}
                />
            )}
        </div>
    );
};

export default DashboardPage;
