// Performance optimization utilities
import { useEffect } from 'react';

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: number;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait) as unknown as number;
    };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Lazy load images with Intersection Observer
export const useLazyLoad = (ref: React.RefObject<HTMLElement>) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        const images = element.querySelectorAll('img[data-src]');
        images.forEach((img) => observer.observe(img));

        return () => observer.disconnect();
    }, [ref]);
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
};

// Optimize font loading
export const preloadFonts = () => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);
};

// Request Idle Callback wrapper for non-critical tasks
export const runWhenIdle = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(callback);
    } else {
        setTimeout(callback, 1);
    }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`);
};

// Check if device is low-end
export const isLowEndDevice = (): boolean => {
    // Check for hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 1;

    // Check for device memory (if available)
    const memory = (navigator as any).deviceMemory || 4;

    return cores <= 2 || memory <= 2;
};

// Reduce animations on low-end devices
export const shouldReduceAnimations = (): boolean => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEnd = isLowEndDevice();

    return prefersReducedMotion || isLowEnd;
};
