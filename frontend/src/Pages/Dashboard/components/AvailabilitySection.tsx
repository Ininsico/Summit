import { useState } from 'react';
import { theme } from '../../../theme/ThemeSystem';
import { CompassIcon, CheckCircleIcon } from './DashboardIcons';

const AvailabilitySection = () => {
    const colors = theme.getColors();
    const fonts = theme.getFonts();
    const [searchQuery, setSearchQuery] = useState('');

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
                Availability Scout
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                        <CompassIcon size={20} color={colors.textPrimary} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search routes, peaks or vehicles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 16px 16px 48px',
                            borderRadius: '16px',
                            border: `1px solid ${colors.border}`,
                            background: `${colors.background}80`,
                            color: colors.textPrimary,
                            outline: 'none',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
                        onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
                    />
                </div>
                <button style={{
                    padding: '0 32px',
                    borderRadius: '16px',
                    background: theme.getGradient(),
                    border: 'none',
                    color: 'white',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: `0 4px 15px ${colors.primary}40`,
                    transition: 'all 0.3s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Scout
                </button>
            </div>

            <div style={{
                marginTop: '24px',
                padding: '16px',
                background: `${colors.primary}10`,
                borderRadius: '16px',
                border: `1px dashed ${colors.primary}40`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <CheckCircleIcon size={20} color={colors.primary} />
                <p style={{ margin: 0, fontSize: '0.9rem', color: colors.textSecondary, fontWeight: '500' }}>
                    Peak season windows (April - Oct) are currently open for booking.
                </p>
            </div>
        </div>
    );
};

export default AvailabilitySection;
