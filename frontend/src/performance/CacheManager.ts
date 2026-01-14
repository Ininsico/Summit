// Cache Manager using OOP principles
// Encapsulation: All caching logic in one place
// Abstraction: Complex cache operations hidden behind simple API

export interface CacheConfig {
    maxAge: number; // milliseconds
    maxSize: number; // number of items
}

export interface CacheEntry<T> {
    data: T;
    timestamp: number;
    hits: number;
}

export abstract class CacheStrategy<T> {
    protected cache: Map<string, CacheEntry<T>> = new Map();
    protected config: CacheConfig;

    constructor(config: CacheConfig) {
        this.config = config;
    }

    abstract evict(): void;
    abstract set(key: string, value: T): void;

    public get(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) return null;

        // Check if expired
        if (Date.now() - entry.timestamp > this.config.maxAge) {
            this.cache.delete(key);
            return null;
        }

        // Increment hits
        entry.hits++;
        return entry.data;
    }

    public has(key: string): boolean {
        return this.get(key) !== null;
    }

    public clear(): void {
        this.cache.clear();
    }

    public size(): number {
        return this.cache.size;
    }
}

// LRU Cache Strategy - Inheritance
export class LRUCache<T> extends CacheStrategy<T> {
    private accessOrder: string[] = [];

    public set(key: string, value: T): void {
        // Remove if exists
        if (this.cache.has(key)) {
            this.accessOrder = this.accessOrder.filter(k => k !== key);
        }

        // Evict if needed
        if (this.cache.size >= this.config.maxSize) {
            this.evict();
        }

        // Add new entry
        this.cache.set(key, {
            data: value,
            timestamp: Date.now(),
            hits: 0,
        });
        this.accessOrder.push(key);
    }

    public evict(): void {
        if (this.accessOrder.length > 0) {
            const oldest = this.accessOrder.shift();
            if (oldest) {
                this.cache.delete(oldest);
            }
        }
    }

    public get(key: string): T | null {
        const value = super.get(key);

        if (value !== null) {
            // Move to end (most recently used)
            this.accessOrder = this.accessOrder.filter(k => k !== key);
            this.accessOrder.push(key);
        }

        return value;
    }
}

// LFU Cache Strategy - Inheritance
export class LFUCache<T> extends CacheStrategy<T> {
    public set(key: string, value: T): void {
        // Evict if needed
        if (this.cache.size >= this.config.maxSize) {
            this.evict();
        }

        // Add new entry
        this.cache.set(key, {
            data: value,
            timestamp: Date.now(),
            hits: 0,
        });
    }

    public evict(): void {
        let minHits = Infinity;
        let leastUsedKey: string | null = null;

        // Find least frequently used
        for (const [key, entry] of this.cache.entries()) {
            if (entry.hits < minHits) {
                minHits = entry.hits;
                leastUsedKey = key;
            }
        }

        if (leastUsedKey) {
            this.cache.delete(leastUsedKey);
        }
    }
}

// Cache Manager - Facade pattern
export class CacheManager {
    private static instance: CacheManager;
    private caches: Map<string, CacheStrategy<any>> = new Map();

    private constructor() { }

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    public createLRUCache<T>(
        name: string,
        config: CacheConfig = { maxAge: 5 * 60 * 1000, maxSize: 100 }
    ): LRUCache<T> {
        const cache = new LRUCache<T>(config);
        this.caches.set(name, cache);
        return cache;
    }

    public createLFUCache<T>(
        name: string,
        config: CacheConfig = { maxAge: 5 * 60 * 1000, maxSize: 100 }
    ): LFUCache<T> {
        const cache = new LFUCache<T>(config);
        this.caches.set(name, cache);
        return cache;
    }

    public getCache<T>(name: string): CacheStrategy<T> | undefined {
        return this.caches.get(name);
    }

    public clearAll(): void {
        this.caches.forEach(cache => cache.clear());
    }

    public removeCache(name: string): void {
        const cache = this.caches.get(name);
        if (cache) {
            cache.clear();
            this.caches.delete(name);
        }
    }

    // Get cache statistics
    public getStats(): Record<string, { size: number }> {
        const stats: Record<string, { size: number }> = {};

        this.caches.forEach((cache, name) => {
            stats[name] = {
                size: cache.size(),
            };
        });

        return stats;
    }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance();
