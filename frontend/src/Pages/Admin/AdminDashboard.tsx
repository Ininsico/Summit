import { useEffect, useState } from 'react';
import { theme } from '../../theme/ThemeSystem';
import { useAppStore } from '../../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import {
    UsersIcon,
    BookingsIcon,
    MessagesIcon,
    StatsIcon,
    PlusIcon
} from './components/AdminIcons';
import {
    EditIcon,
    TrashIcon,
    CalendarIcon,
    CheckCircleIcon,
    XIcon
} from '../Dashboard/components/DashboardIcons';

const AdminDashboard = () => {
    const { user, isAuthenticated, logout } = useAppStore();
    const navigate = useNavigate();
    const colors = theme.getColors();

    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter states
    const [bookingFilter, setBookingFilter] = useState('all');

    // Edit states
    const [editingBooking, setEditingBooking] = useState<any>(null);
    const [replyingMessage, setReplyingMessage] = useState<any>(null);
    const [replyText, setReplyText] = useState('');

    // Protection
    useEffect(() => {
        if (!isAuthenticated || user?.email !== 'ininsico@gmail.com') {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [statsRes, bookingsRes, usersRes, messagesRes]: any[] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getAllBookings(),
                adminAPI.getAllUsers(),
                adminAPI.getAllMessages()
            ]);

            setStats(statsRes.stats);
            setBookings(bookingsRes.bookings);
            setUsers(usersRes.users);
            setMessages(messagesRes.messages);
        } catch (error) {
            console.error("Admin fetch error", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email === 'ininsico@gmail.com') {
            fetchData();
        }
    }, [user]);

    const handleUpdateBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminAPI.updateBooking(editingBooking._id, editingBooking);
            setEditingBooking(null);
            fetchData();
            alert('Booking record specialized successfully.');
        } catch (error) {
            alert('Failed to update booking.');
        }
    };

    const handleQuickAction = async (id: string, status: string) => {
        try {
            await adminAPI.updateBooking(id, { status });
            fetchData();
            alert(`Mission status updated to ${status.toUpperCase()}`);
        } catch (error) {
            alert('Status update failed.');
        }
    };

    const handleSendReply = async () => {
        if (!replyText) return;
        try {
            await adminAPI.replyToMessage(replyingMessage._id, replyText);
            setReplyingMessage(null);
            setReplyText('');
            fetchData();
            alert('Reply transmitted to explorer.');
        } catch (error) {
            alert('Transmission failed.');
        }
    };

    if (!isAuthenticated || user?.email !== 'ininsico@gmail.com') return null;

    const filteredBookings = bookings.filter(b => bookingFilter === 'all' ? true : b.status === bookingFilter);

    const renderOverview = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
                { label: 'Total Revenue', value: stats?.totalRevenue?.toLocaleString() + ' PKR', icon: <StatsIcon color={colors.primary} />, color: colors.primary },
                { label: 'Total Users', value: stats?.totalUsers, icon: <UsersIcon color="#3b82f6" />, color: '#3b82f6' },
                { label: 'Total Bookings', value: stats?.totalBookings, icon: <BookingsIcon color="#10b981" />, color: '#10b981' },
                { label: 'Pending Books', value: stats?.pendingBookings, icon: <CalendarIcon color="#f59e0b" />, color: '#f59e0b' },
            ].map((stat, i) => (
                <div key={i} style={{
                    background: `${colors.surface}B0`,
                    padding: '32px',
                    borderRadius: '24px',
                    border: `1px solid ${colors.border}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ padding: '12px', background: `${stat.color}15`, borderRadius: '16px', width: 'fit-content' }}>
                        {stat.icon}
                    </div>
                    <div>
                        <span style={{ color: colors.textSecondary, fontSize: '0.9rem', fontWeight: '700' }}>{stat.label}</span>
                        <h3 style={{ color: colors.textPrimary, fontSize: '1.8rem', fontWeight: '900', margin: '4px 0 0 0' }}>{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderBookings = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: colors.textPrimary, fontSize: '1.5rem', fontWeight: '800' }}>Manage Bookings</h2>
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                    {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
                        <button
                            key={f}
                            onClick={() => setBookingFilter(f)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                background: bookingFilter === f ? colors.primary : 'transparent',
                                color: bookingFilter === f ? 'white' : colors.textSecondary,
                                cursor: 'pointer',
                                fontWeight: '700',
                                textTransform: 'capitalize',
                                fontSize: '0.8rem'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{
                background: `${colors.surface}B0`,
                borderRadius: '24px',
                border: `1px solid ${colors.border}`,
                overflowX: 'auto'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '950px' }}>
                    <thead style={{ background: `${colors.background}A0`, borderBottom: `1px solid ${colors.border}` }}>
                        <tr>
                            {['Customer', 'Mission Details', 'Date Frame', 'Status', 'Decision Control'].map(h => (
                                <th key={h} style={{ padding: '20px', color: colors.textSecondary, fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, i) => (
                            <tr key={i} style={{ borderBottom: i === filteredBookings.length - 1 ? 'none' : `1px solid ${colors.border}` }}>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontWeight: '700', color: colors.textPrimary }}>{booking.user?.firstName} {booking.user?.lastName}</div>
                                    <div style={{ fontSize: '0.8rem', color: colors.textSecondary }}>{booking.user?.email}</div>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ color: colors.textPrimary, fontWeight: '700' }}>{booking.itemName}</div>
                                    <div style={{ fontSize: '0.75rem', color: colors.primary, fontWeight: '800', textTransform: 'uppercase' }}>{booking.type} • {booking.tripType}</div>
                                </td>
                                <td style={{ padding: '20px', color: colors.textSecondary, fontSize: '0.9rem' }}>
                                    {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{
                                        padding: '6px 14px',
                                        borderRadius: '50px',
                                        fontSize: '0.7rem',
                                        fontWeight: '900',
                                        background: booking.status === 'confirmed' ? '#10b98120' : booking.status === 'pending' ? '#f59e0b20' : '#ef444420',
                                        color: booking.status === 'confirmed' ? '#10b981' : booking.status === 'pending' ? '#f59e0b' : '#ef4444',
                                        textTransform: 'uppercase'
                                    }}>{booking.status}</span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {booking.status === 'pending' ? (
                                            <>
                                                <button
                                                    onClick={() => handleQuickAction(booking._id, 'confirmed')}
                                                    style={{ padding: '8px 16px', borderRadius: '10px', background: '#10b98120', border: '1px solid #10b98130', color: '#10b981', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                                >
                                                    <CheckCircleIcon size={14} /> AUTHORIZE
                                                </button>
                                                <button
                                                    onClick={() => handleQuickAction(booking._id, 'cancelled')}
                                                    style={{ padding: '8px 16px', borderRadius: '10px', background: '#ef444415', border: '1px solid #ef444430', color: '#ef4444', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                                >
                                                    <XIcon size={14} /> DECLINE
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => setEditingBooking(booking)} style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, color: colors.textPrimary, cursor: 'pointer' }}><EditIcon size={16} /></button>
                                                <button style={{ padding: '8px', borderRadius: '10px', background: '#ef444405', border: `1px solid ${colors.border}`, color: colors.textSecondary, cursor: 'not-allowed' }}><TrashIcon size={16} /></button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {users.map((u, i) => (
                <div key={i} style={{
                    background: `${colors.surface}B0`,
                    padding: '24px',
                    borderRadius: '20px',
                    border: `1px solid ${colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: theme.getGradient(), display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>
                        {u.firstName[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: colors.textPrimary, fontWeight: '800' }}>{u.firstName} {u.lastName}</div>
                        <div style={{ color: colors.textSecondary, fontSize: '0.85rem' }}>{u.email}</div>
                    </div>
                    <div style={{ color: colors.primary, fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase' }}>{u.role}</div>
                </div>
            ))}
        </div>
    );

    const renderMessages = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.length === 0 ? <p style={{ color: colors.textSecondary }}>No transmissions received.</p> : messages.map((m, i) => (
                <div key={i} style={{
                    background: `${colors.surface}B0`,
                    padding: '24px',
                    borderRadius: '20px',
                    border: `1px solid ${colors.border}`
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div>
                            <span style={{ color: colors.textPrimary, fontWeight: '800' }}>{m.subject}</span>
                            <div style={{ color: colors.textSecondary, fontSize: '0.85rem' }}>from {m.email}</div>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: colors.textSecondary }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p style={{ color: colors.textSecondary, fontSize: '0.95rem', margin: '0 0 16px 0' }}>{m.content}</p>
                    {m.reply ? (
                        <div style={{ background: `${colors.primary}10`, padding: '16px', borderRadius: '12px', border: `1px solid ${colors.primary}20` }}>
                            <span style={{ color: colors.primary, fontWeight: '800', fontSize: '0.8rem' }}>ADMIN REPLY:</span>
                            <p style={{ margin: '4px 0 0 0', color: colors.textPrimary, fontSize: '0.9rem' }}>{m.reply}</p>
                        </div>
                    ) : (
                        <button onClick={() => setReplyingMessage(m)} style={{ padding: '8px 16px', borderRadius: '8px', background: `${colors.primary}20`, color: colors.primary, border: 'none', fontWeight: '700', cursor: 'pointer' }}>Construct Reply</button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ background: colors.background, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
                <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: theme.getGradient(), borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/Summit.png" alt="S" style={{ width: '24px' }} />
                    </div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '900', color: colors.textPrimary }}>SUMMIT SYSTEM CONTROL</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right', borderRight: `1px solid ${colors.border}`, paddingRight: '20px' }}>
                        <div style={{ color: colors.textPrimary, fontWeight: '800', fontSize: '0.9rem' }}>{user?.firstName}</div>
                        <div style={{ color: colors.primary, fontWeight: '900', fontSize: '0.65rem', letterSpacing: '2px' }}>ADMINISTRATOR</div>
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
                            cursor: 'pointer'
                        }}
                    >
                        Disconnect
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>
                <aside style={{
                    width: '280px',
                    padding: '40px 24px',
                    borderRight: `1px solid ${colors.border}`,
                    background: `${colors.surface}40`,
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px'
                }}>
                    <div>
                        <span style={{ color: colors.primary, fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px' }}>CENTRAL SYSTEM</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: colors.textPrimary, marginTop: '8px' }}>Operational</h2>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { id: 'overview', label: 'Systems Status', icon: <StatsIcon size={20} /> },
                            { id: 'bookings', label: 'All Missions', icon: <BookingsIcon size={20} /> },
                            { id: 'users', label: 'Explorer Base', icon: <UsersIcon size={20} /> },
                            { id: 'messages', label: 'Transmissions', icon: <MessagesIcon size={20} /> },
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
                </aside>

                <main style={{ flex: 1, padding: '60px 40px' }}>
                    {isLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100.0%' }}>
                            <p style={{ color: colors.textSecondary, fontWeight: '800', letterSpacing: '2px' }}>CALIBRATING SENSORS...</p>
                        </div>
                    ) : (
                        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                                <div>
                                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: colors.textPrimary, margin: 0 }}>
                                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                    </h1>
                                    <p style={{ color: colors.textSecondary, fontSize: '1.1rem', marginTop: '8px' }}>
                                        Global oversight for all Summit operations.
                                    </p>
                                </div>
                                <button style={{
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
                                }}>
                                    <PlusIcon size={20} />
                                    New Mission
                                </button>
                            </div>

                            {activeTab === 'overview' && renderOverview()}
                            {activeTab === 'bookings' && renderBookings()}
                            {activeTab === 'users' && renderUsers()}
                            {activeTab === 'messages' && renderMessages()}
                        </div>
                    )}
                </main>
            </div>

            {/* Modals */}
            {editingBooking && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ background: colors.surface, width: '100%', maxWidth: '500px', borderRadius: '40px', padding: '40px', border: `1px solid ${colors.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: colors.textPrimary }}>Mission Override</h3>
                            <button onClick={() => setEditingBooking(null)} style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}><XIcon size={32} /></button>
                        </div>
                        <form onSubmit={handleUpdateBooking} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input value={editingBooking.itemName} onChange={(e) => setEditingBooking({ ...editingBooking, itemName: e.target.value })} style={{ padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary }} placeholder="Trip Name" />
                            <input type="number" value={editingBooking.totalPrice} onChange={(e) => setEditingBooking({ ...editingBooking, totalPrice: parseInt(e.target.value) })} style={{ padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary }} placeholder="Price" />
                            <select value={editingBooking.status} onChange={(e) => setEditingBooking({ ...editingBooking, status: e.target.value })} style={{ padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary }}>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <button type="submit" style={{ padding: '20px', background: theme.getGradient(), border: 'none', borderRadius: '16px', color: 'white', fontWeight: '900' }}>Commit Changes</button>
                        </form>
                    </div>
                </div>
            )}

            {replyingMessage && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ background: colors.surface, width: '100%', maxWidth: '500px', borderRadius: '40px', padding: '40px', border: `1px solid ${colors.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: colors.textPrimary }}>Transmit Reply</h3>
                            <button onClick={() => setReplyingMessage(null)} style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}><XIcon size={32} /></button>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
                            <p style={{ color: colors.textSecondary, fontSize: '0.8rem', margin: '0 0 8px 0' }}>Original Transmission:</p>
                            <p style={{ color: colors.textPrimary, margin: 0 }}>{replyingMessage.content}</p>
                        </div>
                        <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ width: '100%', height: '150px', padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none' }} placeholder="Enter reply transmission..." />
                        <button onClick={handleSendReply} style={{ width: '100%', marginTop: '20px', padding: '20px', background: theme.getGradient(), border: 'none', borderRadius: '16px', color: 'white', fontWeight: '900' }}>Transmit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
