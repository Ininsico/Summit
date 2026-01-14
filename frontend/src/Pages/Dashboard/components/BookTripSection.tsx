import { theme } from '../../../theme/ThemeSystem';
import { CarIcon, MapPinIcon, CompassIcon } from './DashboardIcons';

interface BookTripSectionProps {
    onOpenFlow: (type: 'trip' | 'vehicle') => void;
}

const BookTripSection = ({ onOpenFlow }: BookTripSectionProps) => {
    const colors = theme.getColors();
    const fonts = theme.getFonts();

    const quickActions = [
        { label: 'Book Vehicle', type: 'vehicle' as const, icon: <CarIcon size={32} />, color: '#3b82f6' },
        { label: 'Plan Trip', type: 'trip' as const, icon: <MapPinIcon size={32} />, color: '#10b981' },
        { label: 'New Adventure', type: 'trip' as const, icon: <CompassIcon size={32} />, color: '#f59e0b' },
    ];

    return (
        <div style={{
            background: `${colors.surface}B0`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: colors.textPrimary, fontFamily: fonts.title, marginBottom: '24px' }}>
                Instant Booking
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                {quickActions.map((action, idx) => (
                    <button
                        key={idx}
                        onClick={() => onOpenFlow(action.type)}
                        style={{
                            padding: '32px 20px',
                            background: `linear-gradient(135deg, ${colors.background} 0%, ${action.color}10 100%)`,
                            borderRadius: '20px',
                            border: `1px solid ${colors.border}`,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            position: 'relative',
                            overflow: 'hidden',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = action.color;
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = `0 12px 24px ${action.color}20`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{
                            color: action.color,
                            padding: '12px',
                            background: `${action.color}15`,
                            borderRadius: '16px'
                        }}>
                            {action.icon}
                        </div>
                        <span style={{ fontWeight: '800', color: colors.textPrimary, textAlign: 'center', fontSize: '1rem' }}>{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookTripSection;
