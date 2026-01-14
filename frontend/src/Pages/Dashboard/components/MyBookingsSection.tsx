import { useEffect, useState } from 'react';
import { theme } from '../../../theme/ThemeSystem';
import { bookingAPI } from '../../../services/api';
import { EditIcon, TrashIcon, CalendarIcon, MapPinIcon, XIcon, CheckCircleIcon, CompassIcon, CarIcon, UserIcon } from './DashboardIcons';

const MyBookingsSection = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingBooking, setEditingBooking] = useState<any>(null);
    const colors = theme.getColors();
    const fonts = theme.getFonts();

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const response: any = await bookingAPI.getAll();
            if (response.success) {
                setBookings(response.bookings);
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (id: string) => {
        if (!window.confirm('Are you sure you want to terminate this mission?')) return;
        try {
            await bookingAPI.cancel(id);
            fetchBookings();
        } catch (error) {
            alert('Failed to update mission status');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await bookingAPI.update(editingBooking._id, editingBooking);
            setEditingBooking(null);
            fetchBookings();
        } catch (error) {
            alert('Mission update failed. Network error.');
        }
    };

    return (
        <div style={{
            background: `${colors.surface}B0`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            height: '100%'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: colors.primary }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: colors.textPrimary, margin: 0 }}>
                        Expedition Logs
                    </h2>
                </div>
                <div style={{ padding: '8px 16px', background: `${colors.primary}20`, borderRadius: '50px', fontSize: '0.75rem', color: colors.primary, fontWeight: '900', letterSpacing: '1px' }}>
                    {bookings.length} TOTAL TRIPS
                </div>
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: colors.textSecondary }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', opacity: 0.5 }}>SYNCHRONIZING WITH SERVER...</div>
                </div>
            ) : bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 40px' }}>
                    <div style={{ opacity: 0.15, marginBottom: '24px' }}>
                        <CompassIcon size={80} />
                    </div>
                    <p style={{ color: colors.textSecondary, fontSize: '1.1rem', fontWeight: '600' }}>No active expeditions in the database.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {bookings.map((booking, idx) => (
                        <div key={idx} style={{
                            padding: '32px',
                            background: `${colors.background}A0`,
                            borderRadius: '24px',
                            border: `1px solid ${colors.border}`,
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                                <div style={{ flex: 1, minWidth: '300px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{ padding: '8px', background: `${colors.primary}15`, borderRadius: '10px', color: colors.primary }}>
                                            {booking.type === 'vehicle' ? <CarIcon size={20} /> : <MapPinIcon size={20} />}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0, color: colors.textPrimary, fontSize: '1.4rem', fontWeight: '900' }}>{booking.itemName}</h4>
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                                                <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px', background: `${colors.primary}20`, color: colors.primary, fontWeight: '900', textTransform: 'uppercase' }}>{booking.tripType}</span>
                                                <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px', background: booking.status === 'confirmed' ? '#10b98120' : '#f59e0b20', color: booking.status === 'confirmed' ? '#10b981' : '#f59e0b', fontWeight: '900', textTransform: 'uppercase' }}>{booking.status}</span>
                                                <span style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px', background: booking.paymentStatus === 'paid' ? '#3b82f620' : '#ef444415', color: booking.paymentStatus === 'paid' ? '#3b82f6' : '#ef4444', fontWeight: '900', textTransform: 'uppercase' }}>Payment: {booking.paymentStatus}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: `1px solid ${colors.border}` }}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <CalendarIcon size={18} color={colors.textSecondary} />
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: colors.textSecondary, fontWeight: '800' }}>SCHEDULE</div>
                                                <div style={{ fontSize: '0.9rem', color: colors.textPrimary, fontWeight: '700' }}>
                                                    {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <UserIcon size={18} color={colors.textSecondary} />
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: colors.textSecondary, fontWeight: '800' }}>UNIT LOAD</div>
                                                <div style={{ fontSize: '0.9rem', color: colors.textPrimary, fontWeight: '700' }}>{booking.guests} {booking.guests > 1 ? 'Explorers' : 'Explorer'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderLeft: `1px solid ${colors.border}`, paddingLeft: '32px' }}>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => setEditingBooking(booking)}
                                            style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, color: colors.textPrimary, cursor: 'pointer' }}
                                        >
                                            <EditIcon size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            style={{ padding: '12px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <TrashIcon size={20} />
                                        </button>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', color: colors.textSecondary, fontWeight: '800', marginBottom: '4px' }}>TOTAL QUOTA</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '900', color: colors.primary }}>
                                            PKR <span style={{ color: colors.textPrimary }}>{booking.totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Mission Modal */}
            {editingBooking && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ background: colors.surface, width: '100%', maxWidth: '500px', borderRadius: '40px', padding: '40px', border: `1px solid ${colors.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: colors.textPrimary }}>Mission Sync</h3>
                            <button onClick={() => setEditingBooking(null)} style={{ background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}>
                                <XIcon size={32} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: colors.textSecondary, marginBottom: '8px', fontWeight: '900' }}>IDENTIFIER</label>
                                <input
                                    type="text"
                                    value={editingBooking.itemName}
                                    onChange={(e) => setEditingBooking({ ...editingBooking, itemName: e.target.value })}
                                    style={{ width: '100%', padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none', fontSize: '1.1rem' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: colors.textSecondary, marginBottom: '8px', fontWeight: '900' }}>UNIT LOAD</label>
                                    <input
                                        type="number"
                                        value={editingBooking.guests}
                                        onChange={(e) => setEditingBooking({ ...editingBooking, guests: parseInt(e.target.value) })}
                                        style={{ width: '100%', padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: colors.textSecondary, marginBottom: '8px', fontWeight: '900' }}>TYPE</label>
                                    <select
                                        value={editingBooking.tripType}
                                        onChange={(e) => setEditingBooking({ ...editingBooking, tripType: e.target.value })}
                                        style={{ width: '100%', padding: '20px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none' }}
                                    >
                                        <option value="private">Private</option>
                                        <option value="shared">Shared</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" style={{ marginTop: '20px', padding: '20px', borderRadius: '18px', background: theme.getGradient(), border: 'none', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                <CheckCircleIcon size={24} />
                                Synchronize Mission
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookingsSection;
