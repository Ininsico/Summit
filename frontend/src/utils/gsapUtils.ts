// Optimized GSAP utilities for better performance
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Performance-optimized GSAP defaults
export const initGSAPDefaults = () => {
    gsap.defaults({
        ease: 'power3.out',
        duration: 0.8,
    });

    // Optimize ScrollTrigger for performance
    ScrollTrigger.config({
        limitCallbacks: true, // Limit callbacks to improve performance
        syncInterval: 150, // Sync interval for scroll events
    });
};

// Debounced scroll handler for better performance
export const createOptimizedScrollTrigger = (
    trigger: string,
    animation: gsap.TweenVars,
    options?: ScrollTrigger.Vars
) => {
    return {
        ...animation,
        scrollTrigger: {
            trigger,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true, // Only animate once for better performance
            ...options,
        },
    };
};

// Batch animations for better performance
export const batchAnimate = (
    selector: string,
    animation: gsap.TweenVars,
    stagger: number = 0.1
) => {
    return gsap.fromTo(
        selector,
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger,
            ...animation,
        }
    );
};

// Cleanup function for GSAP contexts
export const cleanupGSAP = (ctx: gsap.Context) => {
    if (ctx) {
        ctx.revert();
    }
};

// Check if reduced motion is preferred
export const shouldReduceMotion = (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Create animation with reduced motion support
export const createAccessibleAnimation = (
    element: string | Element,
    animation: gsap.TweenVars,
    reducedAnimation?: gsap.TweenVars
) => {
    if (shouldReduceMotion() && reducedAnimation) {
        return gsap.to(element, reducedAnimation);
    }
    return gsap.to(element, animation);
};
