/**
 * Utility functions for working with CDN URLs
 */

/**
 * Get the full URL for a static asset with cache busting
 * @param path Path to the asset (e.g., '/images/logo.png')
 * @returns Full URL to the asset, either from CDN or local
 */
export function getStaticAssetUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development or if no CDN is configured, use the local path
  if (process.env.NODE_ENV !== 'production' || !process.env.NEXT_PUBLIC_CDN_URL) {
    return `/${cleanPath}`;
  }
  
  // Create URL with cache busting
  const url = new URL(cleanPath, process.env.NEXT_PUBLIC_CDN_URL);
  
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
export function preloadResource(url: string, as: string): void {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
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
export function preconnectToOrigins(urls: string[]): void {
  if (typeof document === 'undefined') return;
  
  const origins = new Set(
    urls
      .filter(url => url.startsWith('http'))
      .map(url => {
        try {
          const { origin } = new URL(url);
          return origin;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as string[]
  );
  
  origins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.appendChild(link);
  });
}

/**
 * Preload critical assets for faster page loads
 */
export function preloadCriticalAssets(): void {
  if (typeof document === 'undefined') return;
  
  // Preconnect to required origins
  preconnectToOrigins([
    process.env.NEXT_PUBLIC_APP_URL || '',
    process.env.NEXT_PUBLIC_CDN_URL || '',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]);
  
  // Preload critical fonts
  const criticalFonts = [
    // Add paths to your critical fonts here
    '/fonts/inter-var-latin.woff2',
  ];
  
  criticalFonts.forEach(font => {
    preloadResource(getStaticAssetUrl(font), 'font');
  });
}
