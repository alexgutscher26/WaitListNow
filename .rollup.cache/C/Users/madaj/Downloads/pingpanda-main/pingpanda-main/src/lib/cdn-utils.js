/**
 * Utility functions for working with CDN URLs
 */
/**
 * Get the full URL for a static asset with cache busting
 * @param path Path to the asset (e.g., '/images/logo.png')
 * @returns Full URL to the asset, either from CDN or local
 */
export function getStaticAssetUrl(path) {
    // Remove leading slash if present
    var cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // In development or if no CDN is configured, use the local path
    if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_CDN_URL) {
        return "/".concat(cleanPath);
    }
    // Create URL with cache busting
    var url = new URL(cleanPath, process.env.NEXT_PUBLIC_CDN_URL);
    // Add cache busting parameter if available
    if (process.env.NEXT_PUBLIC_BUILD_ID) {
        url.searchParams.set('v', process.env.NEXT_PUBLIC_BUILD_ID);
    }
    return url.toString();
}
/**
 * Preload a resource to improve performance
 * @param url URL of the resource to preload
 * @param as Type of resource ('script', 'style', 'font', etc.)
 */
export function preloadResource(url, as) {
    if (typeof document === 'undefined')
        return;
    var link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    // Add crossOrigin attribute for fonts
    if (as === 'font') {
        link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
}
/**
 * Preconnect to required origins to improve performance
 * @param urls Array of URLs to preconnect to
 */
export function preconnectToOrigins(urls) {
    if (typeof document === 'undefined')
        return;
    var origins = new Set(urls
        .filter(function (url) { return url.startsWith('http'); })
        .map(function (url) {
        try {
            var origin_1 = new URL(url).origin;
            return origin_1;
        }
        catch (_a) {
            return null;
        }
    })
        .filter(Boolean));
    origins.forEach(function (origin) {
        var link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        document.head.appendChild(link);
    });
}
/**
 * Preload critical assets for faster page loads
 */
export function preloadCriticalAssets() {
    if (typeof document === 'undefined')
        return;
    // Preconnect to required origins
    preconnectToOrigins([
        process.env.NEXT_PUBLIC_APP_URL || '',
        process.env.NEXT_PUBLIC_CDN_URL || '',
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
    ]);
    // Preload critical fonts
    var criticalFonts = [
        // Add paths to your critical fonts here
        '/fonts/inter-var-latin.woff2',
    ];
    criticalFonts.forEach(function (font) {
        preloadResource(getStaticAssetUrl(font), 'font');
    });
}
//# sourceMappingURL=cdn-utils.js.map