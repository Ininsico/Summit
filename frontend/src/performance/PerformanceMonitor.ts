// Performance Manager using OOP principles
// Encapsulation: All performance logic in one class
// Abstraction: Complex performance monitoring hidden behind simple API

export abstract class PerformanceMonitor {
    protected metrics: Map<string, number> = new Map();
    protected observers: IntersectionObserver[] = [];

    // Abstract methods to be implemented by subclasses
    abstract measure(name: string, fn: () => void): void;
    abstract getMetrics(): Record<string, number>;
    abstract cleanup(): void;
}

export class WebPerformanceMonitor extends PerformanceMonitor {
    private static instance: WebPerformanceMonitor;

    private constructor() {
        super();
        this.initializePerformanceObserver();
    }

    public static getInstance(): WebPerformanceMonitor {
        if (!WebPerformanceMonitor.instance) {
            WebPerformanceMonitor.instance = new WebPerformanceMonitor();
        }
        return WebPerformanceMonitor.instance;
    }

    private initializePerformanceObserver(): void {
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.metrics.set(entry.name, entry.duration);
                    }
                });
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (e) {
                console.warn('PerformanceObserver not supported');
            }
        }
    }

    public measure(name: string, fn: () => void): void {
        const start = performance.now();
        fn();
        const end = performance.now();
        const duration = end - start;
        this.metrics.set(name, duration);

        if (import.meta.env.DEV) {
            console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
        }
    }

    public async measureAsync(name: string, fn: () => Promise<void>): Promise<void> {
        const start = performance.now();
        await fn();
        const end = performance.now();
        const duration = end - start;
        this.metrics.set(name, duration);

        if (import.meta.env.DEV) {
            console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
        }
    }

    public getMetrics(): Record<string, number> {
        return Object.fromEntries(this.metrics);
    }

    public getMetric(name: string): number | undefined {
        return this.metrics.get(name);
    }

    public cleanup(): void {
        this.metrics.clear();
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }

    // Utility: Check if device is low-end
    public isLowEndDevice(): boolean {
        const cores = navigator.hardwareConcurrency || 1;
        const memory = (navigator as any).deviceMemory || 4;
        return cores <= 2 || memory <= 2;
    }

    // Utility: Get page load metrics
    public getPageLoadMetrics(): Record<string, number> {
        if (!performance.timing) return {};

        const timing = performance.timing;
        return {
            dns: timing.domainLookupEnd - timing.domainLookupStart,
            tcp: timing.connectEnd - timing.connectStart,
            request: timing.responseStart - timing.requestStart,
            response: timing.responseEnd - timing.responseStart,
            dom: timing.domComplete - timing.domLoading,
            load: timing.loadEventEnd - timing.navigationStart,
        };
    }
}

// Export singleton instance
export const performanceMonitor = WebPerformanceMonitor.getInstance();
