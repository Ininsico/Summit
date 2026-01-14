// Resource Loader using OOP principles
// Encapsulation: All resource loading logic in dedicated classes
// Inheritance: Different loaders extend base ResourceLoader
// Abstraction: Complex loading logic hidden behind simple load() method

export abstract class ResourceLoader<T> {
    protected cache: Map<string, T> = new Map();
    protected loading: Map<string, Promise<T>> = new Map();

    // Abstract method to be implemented by subclasses
    abstract load(url: string): Promise<T>;

    // Template method pattern
    protected async loadWithCache(url: string, loader: () => Promise<T>): Promise<T> {
        // Check cache first
        if (this.cache.has(url)) {
            return this.cache.get(url)!;
        }

        // Check if already loading
        if (this.loading.has(url)) {
            return this.loading.get(url)!;
        }

        // Load resource
        const promise = loader();
        this.loading.set(url, promise);

        try {
            const resource = await promise;
            this.cache.set(url, resource);
            return resource;
        } finally {
            this.loading.delete(url);
        }
    }

    public clearCache(): void {
        this.cache.clear();
        this.loading.clear();
    }

    public preload(urls: string[]): Promise<T[]> {
        return Promise.all(urls.map(url => this.load(url)));
    }
}

// Image Loader - Inheritance
export class ImageLoader extends ResourceLoader<HTMLImageElement> {
    private static instance: ImageLoader;

    private constructor() {
        super();
    }

    public static getInstance(): ImageLoader {
        if (!ImageLoader.instance) {
            ImageLoader.instance = new ImageLoader();
        }
        return ImageLoader.instance;
    }

    public async load(url: string): Promise<HTMLImageElement> {
        return this.loadWithCache(url, () => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        });
    }

    // Lazy load with Intersection Observer
    public lazyLoad(img: HTMLImageElement, src: string): void {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.load(src).then((loadedImg) => {
                            img.src = loadedImg.src;
                            observer.unobserve(img);
                        });
                    }
                });
            },
            { rootMargin: '50px' }
        );

        observer.observe(img);
    }
}

// Font Loader - Inheritance
export class FontLoader extends ResourceLoader<FontFace> {
    private static instance: FontLoader;

    private constructor() {
        super();
    }

    public static getInstance(): FontLoader {
        if (!FontLoader.instance) {
            FontLoader.instance = new FontLoader();
        }
        return FontLoader.instance;
    }

    public async load(url: string): Promise<FontFace> {
        return this.loadWithCache(url, async () => {
            const font = new FontFace('CustomFont', `url(${url})`);
            await font.load();
            document.fonts.add(font);
            return font;
        });
    }

    // Preload critical fonts
    public async preloadCriticalFonts(): Promise<void> {
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap',
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        ];

        // Use link preconnect for better performance
        fonts.forEach(() => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = 'https://fonts.googleapis.com';
            document.head.appendChild(link);

            const link2 = document.createElement('link');
            link2.rel = 'preconnect';
            link2.href = 'https://fonts.gstatic.com';
            link2.crossOrigin = 'anonymous';
            document.head.appendChild(link2);
        });
    }
}

// Script Loader - Inheritance
export class ScriptLoader extends ResourceLoader<void> {
    private static instance: ScriptLoader;

    private constructor() {
        super();
    }

    public static getInstance(): ScriptLoader {
        if (!ScriptLoader.instance) {
            ScriptLoader.instance = new ScriptLoader();
        }
        return ScriptLoader.instance;
    }

    public async load(url: string): Promise<void> {
        return this.loadWithCache(url, () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = reject;
                document.head.appendChild(script);
            });
        });
    }

    // Load script with defer
    public loadDeferred(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
}

// Resource Manager - Facade pattern
export class ResourceManager {
    private static instance: ResourceManager;
    private imageLoader: ImageLoader;
    private fontLoader: FontLoader;
    private scriptLoader: ScriptLoader;

    private constructor() {
        this.imageLoader = ImageLoader.getInstance();
        this.fontLoader = FontLoader.getInstance();
        this.scriptLoader = ScriptLoader.getInstance();
    }

    public static getInstance(): ResourceManager {
        if (!ResourceManager.instance) {
            ResourceManager.instance = new ResourceManager();
        }
        return ResourceManager.instance;
    }

    public getImageLoader(): ImageLoader {
        return this.imageLoader;
    }

    public getFontLoader(): FontLoader {
        return this.fontLoader;
    }

    public getScriptLoader(): ScriptLoader {
        return this.scriptLoader;
    }

    public async preloadCriticalResources(): Promise<void> {
        await this.fontLoader.preloadCriticalFonts();
    }

    public clearAllCaches(): void {
        this.imageLoader.clearCache();
        this.fontLoader.clearCache();
        this.scriptLoader.clearCache();
    }
}

// Export singleton instance
export const resourceManager = ResourceManager.getInstance();
