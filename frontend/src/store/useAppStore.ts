// Global store for Summit application using Zustand
import { create } from 'zustand';

interface AppState {
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
