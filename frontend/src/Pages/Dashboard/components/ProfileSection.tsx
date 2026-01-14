import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { theme } from '../../../theme/ThemeSystem';
import { useAppStore } from '../../../store/useAppStore';
import { UserIcon, EditIcon, XIcon, CheckCircleIcon, CameraIcon, CompassIcon } from './DashboardIcons';
import { authAPI } from '../../../services/api';

const ProfileSection = () => {
    const { user, setUser } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        profilePicture: user?.profilePicture || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const colors = theme.getColors();
    const fonts = theme.getFonts();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res: any = await authAPI.updateProfile(formData);
            if (res.success) {
                setUser(res.user);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Update failed', error);
            alert('Profile update failed.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = async (file: File) => {
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const data = new FormData();
        data.append('avatar', file);

        setIsUploading(true);
        try {
            const res: any = await authAPI.uploadAvatar(data);
            if (res.success) {
                setFormData({ ...formData, profilePicture: res.avatarUrl });
                // Also update the global user state immediately for better UX
                if (user) {
                    setUser({ ...user, profilePicture: res.avatarUrl });
                }
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Image upload failed.');
        } finally {
            setIsUploading(false);
        }
    };

    const onDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const modalContent = isEditing && createPortal(
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <style>
                {`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
                `}
            </style>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: colors.surface,
                    padding: '48px',
                    borderRadius: '32px',
                    width: '100%',
                    maxWidth: '480px',
                    border: `1px solid ${colors.border}`,
                    position: 'relative',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                    animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                <button
                    onClick={() => setIsEditing(false)}
                    style={{
                        position: 'absolute',
                        top: '32px',
                        right: '32px',
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: colors.textSecondary,
                        cursor: 'pointer',
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                    <XIcon size={20} />
                </button>

                <h2 style={{ fontSize: '2rem', fontWeight: '900', color: colors.textPrimary, marginBottom: '8px', letterSpacing: '-0.5px' }}>Edit Profile</h2>
                <p style={{ color: colors.textSecondary, marginBottom: '40px', fontSize: '1rem' }}>Update your personal traveler information.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Proper File Upload Area */}
                    <div
                        onDragEnter={onDrag}
                        onDragLeave={onDrag}
                        onDragOver={onDrag}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            background: dragActive ? `${colors.primary}10` : 'rgba(255,255,255,0.03)',
                            padding: '32px',
                            borderRadius: '24px',
                            border: `2px dashed ${dragActive ? colors.primary : colors.border}`,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative'
                        }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                        />

                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: formData.profilePicture ? `url(${formData.profilePicture}) center/cover` : theme.getGradient(),
                            border: `4px solid ${colors.primary}40`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0,
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                            opacity: isUploading ? 0.5 : 1
                        }}>
                            {!formData.profilePicture && !isUploading && <CameraIcon size={32} color="white" />}
                            {formData.profilePicture && !isUploading && (
                                <img src={formData.profilePicture} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                            {isUploading && (
                                <div style={{ animation: 'pulse 1s infinite', color: 'white', fontWeight: '900', fontSize: '0.8rem' }}>SYNCING...</div>
                            )}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ color: colors.textPrimary, fontWeight: '800', margin: '0 0 4px 0' }}>
                                {dragActive ? "Drop to update" : "Browse or drag avatar"}
                            </p>
                            <p style={{ color: colors.textSecondary, fontSize: '0.8rem', margin: 0 }}>PNG, JPG, or WEBP up to 5MB</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ color: colors.textSecondary, fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                style={{ width: '100%', padding: '16px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary, fontSize: '1rem', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ color: colors.textSecondary, fontSize: '0.75rem', fontWeight: '800', marginBottom: '8px', display: 'block', textTransform: 'uppercase' }}>Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                style={{ width: '100%', padding: '16px', borderRadius: '16px', background: colors.background, border: `1px solid ${colors.border}`, color: colors.textPrimary, fontSize: '1rem', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving || isUploading}
                        style={{
                            marginTop: '16px',
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
                            gap: '12px',
                            fontSize: '1.1rem',
                            opacity: (isSaving || isUploading) ? 0.7 : 1,
                            transition: 'transform 0.2s',
                            boxShadow: `0 10px 25px ${colors.primary}40`
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {isSaving ? 'Updating...' : (
                            <>
                                <CheckCircleIcon size={22} />
                                Save Profile
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );

    return (
        <div style={{
            background: `${colors.surface}B0`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            border: `1px solid ${colors.border}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: theme.getGradient(),
                opacity: 0.1,
                borderRadius: '50%',
                filter: 'blur(40px)'
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', position: 'relative' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '22px',
                    background: user?.profilePicture ? `url(${user.profilePicture}) center/cover` : theme.getGradient(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: 'white',
                    boxShadow: `0 8px 20px ${colors.primary}40`,
                    overflow: 'hidden'
                }}>
                    {!user?.profilePicture && user?.firstName?.charAt(0)}
                </div>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: colors.textPrimary, fontFamily: fonts.title, margin: 0 }}>
                        {user ? `${user.firstName} ${user.lastName || ''}` : 'Traveler'}
                    </h2>
                    <p style={{ color: colors.textSecondary, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserIcon size={14} color={colors.textSecondary} />
                        {user?.email}
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                <div style={{
                    padding: '20px',
                    background: `${colors.background}A0`,
                    borderRadius: '18px',
                    border: `1px solid ${colors.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: colors.textSecondary, textTransform: 'uppercase', fontWeight: '800', letterSpacing: '1px' }}>Membership Status</span>
                        <span style={{ display: 'block', fontSize: '1.2rem', color: colors.primary, fontWeight: '900' }}>Summit Legend</span>
                    </div>
                    <div style={{
                        padding: '8px',
                        background: `${colors.primary}20`,
                        borderRadius: '10px'
                    }}>
                        <CompassIcon size={24} color={colors.primary} />
                    </div>
                </div>

                <button
                    onClick={() => setIsEditing(true)}
                    style={{
                        marginTop: '12px',
                        padding: '16px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${colors.border}`,
                        color: colors.textPrimary,
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = colors.border;
                    }}
                >
                    <EditIcon size={18} />
                    Edit Profile
                </button>
            </div>

            {modalContent}
        </div>
    );
};

export default ProfileSection;
