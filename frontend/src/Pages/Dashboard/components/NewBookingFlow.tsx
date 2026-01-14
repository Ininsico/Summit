import { useState, useEffect } from 'react';
import { theme } from '../../../theme/ThemeSystem';
import { bookingAPI } from '../../../services/api';
import { MapPinIcon, CheckCircleIcon, XIcon } from './DashboardIcons';

const VEHICLES = [
    { name: 'Toyota Land Cruiser', price: 25000, sharedPrice: 8000, capacity: 7 },
    { name: 'Toyota Prado', price: 20000, sharedPrice: 6500, capacity: 7 },
    { name: 'Kia Sportage', price: 15000, sharedPrice: 5000, capacity: 5 },
    { name: 'Honda Civic', price: 12000, sharedPrice: 4000, capacity: 5 },
    { name: 'Toyota Corolla', price: 10000, sharedPrice: 3500, capacity: 5 },
    { name: 'Suzuki Alto', price: 5000, sharedPrice: 1800, capacity: 4 },
    { name: 'Suzuki Mehran', price: 4000, sharedPrice: 1500, capacity: 4 },
];

interface NewBookingFlowProps {
    initialType: 'trip' | 'vehicle';
    onClose: () => void;
    onSuccess: () => void;
}

const NewBookingFlow = ({ initialType, onClose, onSuccess }: NewBookingFlowProps) => {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        type: initialType,
        tripType: 'private' as 'private' | 'shared',
        itemName: '',
        destination: '',
        startDate: '',
        endDate: '',
        guests: 1,
        totalPrice: 0,
        specialRequests: ''
    });

    const [hasActiveVehicle, setHasActiveVehicle] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const colors = theme.getColors();

    useEffect(() => {
        const checkActiveBookings = async () => {
            try {
                const res: any = await bookingAPI.getAll();
                if (res.success) {
                    const active = res.bookings.some((b: any) =>
                        b.type === 'vehicle' && (b.status === 'pending' || b.status === 'confirmed')
                    );
                    setHasActiveVehicle(active);
                }
            } catch (err) {
                console.error("Status check failed", err);
            } finally {
                setCheckingStatus(false);
            }
        };
        checkActiveBookings();
    }, []);

    // Update price when selections change
    useEffect(() => {
        if (bookingData.type === 'vehicle') {
            const vehicle = VEHICLES.find(v => v.name === bookingData.itemName);
            if (vehicle) {
                const basePrice = bookingData.tripType === 'shared' ? vehicle.sharedPrice : vehicle.price;
                setBookingData(prev => ({ ...prev, totalPrice: basePrice, guests: vehicle.capacity }));
            }
        } else {
            setBookingData(prev => ({ ...prev, totalPrice: 45000 }));
        }
    }, [bookingData.itemName, bookingData.tripType, bookingData.type]);

    const handleSubmit = async () => {
        if (bookingData.type === 'vehicle' && hasActiveVehicle) {
            alert('SYSTEM RESTRICTION: You already have an active vehicle mission. Only 1 vehicle allowed per deployment.');
            return;
        }

        if (!bookingData.startDate || !bookingData.endDate) {
            alert('Temporal Matrix mismatch: Deployment dates are required.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response: any = await bookingAPI.create(bookingData);
            if (response.success) {
                onSuccess();
                onClose();
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            const errMsg = error.errors ? error.errors.map((e: any) => e.msg).join('\n') : error.message || 'Mission launch failed.';
            alert(`Mission Launch Aborted:\n${errMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (checkingStatus) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(15px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: colors.surface,
                width: '100%',
                maxWidth: '600px',
                borderRadius: '40px',
                border: `1px solid ${colors.border}`,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: `0 32px 64px rgba(0,0,0,0.5)`
            }}>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', display: 'flex' }}>
                    <div style={{ width: `${(step / 3) * 100}%`, background: theme.getGradient(), transition: 'width 0.4s ease' }} />
                </div>

                <div style={{ padding: '48px' }}>
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: '32px', right: '32px', background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}
                    >
                        <XIcon size={24} />
                    </button>

                    {step === 1 && (
                        <div>
                            <span style={{ color: colors.primary, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>STEP 01: Resource Selection</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: colors.textPrimary, marginTop: '12px', marginBottom: '32px' }}>
                                {bookingData.type === 'vehicle' ? 'Select Transport' : 'Expedition Plan'}
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {bookingData.type === 'vehicle' ? (
                                    <>
                                        <div>
                                            <label style={{ color: colors.textSecondary, fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px', display: 'block' }}>AVAILABLE FLEET</label>
                                            <select
                                                value={bookingData.itemName}
                                                onChange={(e) => setBookingData({ ...bookingData, itemName: e.target.value })}
                                                style={{ width: '100%', padding: '20px', borderRadius: '16px', background: `${colors.background}80`, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none', fontSize: '1.1rem' }}
                                            >
                                                <option value="">Select a Vehicle...</option>
                                                {VEHICLES.map(v => (
                                                    <option key={v.name} value={v.name}>{v.name} ({v.capacity} Seats)</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            <button
                                                onClick={() => setBookingData({ ...bookingData, tripType: 'private' })}
                                                style={{ padding: '20px', borderRadius: '16px', background: bookingData.tripType === 'private' ? `${colors.primary}20` : 'transparent', border: `2px solid ${bookingData.tripType === 'private' ? colors.primary : colors.border}`, color: colors.textPrimary, fontWeight: '800', cursor: 'pointer' }}
                                            >
                                                Private Unit
                                            </button>
                                            <button
                                                onClick={() => setBookingData({ ...bookingData, tripType: 'shared' })}
                                                style={{ padding: '20px', borderRadius: '16px', background: bookingData.tripType === 'shared' ? `${colors.primary}20` : 'transparent', border: `2px solid ${bookingData.tripType === 'shared' ? colors.primary : colors.border}`, color: colors.textPrimary, fontWeight: '800', cursor: 'pointer' }}
                                            >
                                                Shared Unit
                                            </button>
                                        </div>
                                        {bookingData.itemName && (
                                            <button onClick={nextStep} style={{ padding: '20px', borderRadius: '18px', background: theme.getGradient(), border: 'none', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}>Continue</button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                                                <MapPinIcon size={20} color={colors.primary} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Destination (e.g. Skardu)"
                                                value={bookingData.destination}
                                                onChange={(e) => setBookingData({ ...bookingData, destination: e.target.value, itemName: `Expedition to ${e.target.value}` })}
                                                style={{ width: '100%', padding: '20px 20px 20px 52px', borderRadius: '18px', background: `${colors.background}80`, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none', fontSize: '1.1rem' }}
                                            />
                                        </div>
                                        {bookingData.destination && (
                                            <button onClick={nextStep} style={{ padding: '20px', borderRadius: '18px', background: theme.getGradient(), border: 'none', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}>Next Phase</button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <span style={{ color: colors.primary, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>STEP 02: Temporal Matrix</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: colors.textPrimary, marginTop: '12px', marginBottom: '32px' }}>Define Timeline</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={{ color: colors.textSecondary, fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px', display: 'block' }}>START DATE</label>
                                        <input
                                            type="date"
                                            value={bookingData.startDate}
                                            onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                                            style={{ width: '100%', padding: '18px', borderRadius: '16px', background: `${colors.background}80`, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ color: colors.textSecondary, fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px', display: 'block' }}>END DATE</label>
                                        <input
                                            type="date"
                                            value={bookingData.endDate}
                                            onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                                            style={{ width: '100%', padding: '18px', borderRadius: '16px', background: `${colors.background}80`, border: `1px solid ${colors.border}`, color: colors.textPrimary, outline: 'none' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <button onClick={prevStep} style={{ flex: 1, padding: '20px', borderRadius: '18px', background: 'transparent', border: `1px solid ${colors.border}`, color: colors.textPrimary, fontWeight: '800', cursor: 'pointer' }}>Back</button>
                                    <button
                                        disabled={!bookingData.startDate || !bookingData.endDate}
                                        onClick={nextStep}
                                        style={{
                                            flex: 2,
                                            padding: '20px',
                                            borderRadius: '18px',
                                            background: (!bookingData.startDate || !bookingData.endDate) ? `${colors.primary}40` : theme.getGradient(),
                                            border: 'none',
                                            color: 'white',
                                            fontWeight: '900',
                                            cursor: (!bookingData.startDate || !bookingData.endDate) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Confirm Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <span style={{ color: colors.primary, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>FINAL: Launch Authorization</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: colors.textPrimary, marginTop: '12px', marginBottom: '32px' }}>Confirm Metadata</h2>
                            <div style={{ background: `${colors.background}80`, padding: '24px', borderRadius: '24px', border: `1px solid ${colors.border}`, marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ color: colors.textSecondary }}>Mission Unit:</span>
                                    <span style={{ color: colors.textPrimary, fontWeight: '800' }}>{bookingData.itemName}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ color: colors.textSecondary }}>Deployment:</span>
                                    <span style={{ color: colors.textPrimary, fontWeight: '700' }}>{bookingData.startDate} ~ {bookingData.endDate}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ color: colors.textSecondary }}>Unit Load:</span>
                                    <span style={{ color: colors.textPrimary, fontWeight: '700' }}>{bookingData.guests} Personnel</span>
                                </div>
                                <div style={{ height: '1px', background: colors.border, margin: '16px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: colors.textSecondary, fontWeight: '700' }}>TOTAL QUOTA:</span>
                                    <span style={{ color: colors.primary, fontWeight: '900', fontSize: '1.4rem' }}>PKR {bookingData.totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button onClick={prevStep} style={{ flex: 1, padding: '20px', borderRadius: '18px', background: 'transparent', border: `1px solid ${colors.border}`, color: colors.textPrimary, fontWeight: '800', cursor: 'pointer' }}>Modify</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    style={{
                                        flex: 2,
                                        padding: '20px',
                                        borderRadius: '18px',
                                        background: theme.getGradient(),
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: '900',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    <CheckCircleIcon size={20} />
                                    {isSubmitting ? 'Authorizing...' : 'Launch Mission'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewBookingFlow;
