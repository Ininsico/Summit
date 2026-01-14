// Advanced Theme System using OOP principles
// Encapsulation: All theme-related data and methods in one class
// Abstraction: Hide complex theme logic behind simple methods

export class ThemeSystem {
    private static instance: ThemeSystem;

    // Encapsulated theme data
    private readonly colors = {
        background: '#0a0e27',
        surface: '#141b3d',
        primary: '#4A90E2',
        primaryLight: '#6BA3E8',
        secondary: '#2E5C8A',
        accent: '#5BA3D0',
        textPrimary: '#ffffff',
        textSecondary: '#b8c5d6',
        border: '#2d3e5f',
        gradientStart: '#4A90E2',
        gradientEnd: '#2E5C8A',
    } as const;

    private readonly fonts = {
        title: "'Outfit', 'Inter', sans-serif",
        body: "'Inter', sans-serif",
    } as const;

    private readonly spacing = {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        xxl: '80px',
    } as const;

    private readonly breakpoints = {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        wide: 1440,
    } as const;

    // Singleton pattern for performance
    private constructor() { }

    public static getInstance(): ThemeSystem {
        if (!ThemeSystem.instance) {
            ThemeSystem.instance = new ThemeSystem();
        }
        return ThemeSystem.instance;
    }

    // Abstraction: Simple getters
    public getColors() {
        return this.colors;
    }

    public getFonts() {
        return this.fonts;
    }

    public getSpacing() {
        return this.spacing;
    }

    public getBreakpoints() {
        return this.breakpoints;
    }

    // Utility methods
    public getGradient(angle: number = 135): string {
        return `linear-gradient(${angle}deg, ${this.colors.gradientStart}, ${this.colors.gradientEnd})`;
    }

    public getTextGradient(): React.CSSProperties {
        return {
            background: this.getGradient(),
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        };
    }

    public getGlassmorphism(opacity: number = 0.8): React.CSSProperties {
        return {
            background: `${this.colors.surface}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${this.colors.border}`,
        };
    }

    public getMediaQuery(breakpoint: keyof typeof this.breakpoints): string {
        return `@media (max-width: ${this.breakpoints[breakpoint]}px)`;
    }
}

// Export singleton instance
export const theme = ThemeSystem.getInstance();
