// Global store for Summit application using Zustand
import { create } from 'zustand';

interface User {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
}

interface AppState {
    // Auth State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;

    // UI State
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;

    // Scroll State
    scrollY: number;
    setScrollY: (y: number) => void;

    // Navigation State
    activeSection: string;
    setActiveSection: (section: string) => void;

    // Animation State
    animationsEnabled: boolean;
    setAnimationsEnabled: (enabled: boolean) => void;

    // Performance State
    reducedMotion: boolean;
    setReducedMotion: (reduced: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Auth State
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    setUser: (user) => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
        set({ user, isAuthenticated: !!user });
    },
    setToken: (token) => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
        set({ token, isAuthenticated: !!token });
    },
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    // UI State
    isLoading: true,
    setIsLoading: (loading) => set({ isLoading: loading }),

    // Scroll State
    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),

    // Navigation State
    activeSection: 'hero',
    setActiveSection: (section) => set({ activeSection: section }),

    // Animation State
    animationsEnabled: true,
    setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),

    // Performance State
    reducedMotion: false,
    setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
}));
