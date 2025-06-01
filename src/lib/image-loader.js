/**
 * Custom image loader for Next.js that works with CDN
 * This loader ensures that images are properly served from the CDN in production
 */

module.exports = function customLoader({ src, width, quality }) {
  // Get the CDN URL from environment variables
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
  
  // If no CDN URL is set, use the default loader
  if (!cdnUrl) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // Parse the source URL to handle different formats
  let url;
  try {
    url = new URL(src);
  } catch (error) {
    // If it's a relative URL, prepend the origin
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    url = new URL(src, baseUrl);
  }

  // If the image is from an external source, use it as is
  if (!url.hostname.includes(process.env.NEXT_PUBLIC_APP_DOMAIN || 'localhost')) {
    return src;
  }

  // Remove any existing query parameters
  const cleanPath = url.pathname.split('?')[0];
  
  // Build the URL with the CDN prefix and image optimization parameters
  const params = new URLSearchParams();
  params.append('url', cleanPath);
  if (width) params.append('w', width.toString());
  if (quality) params.append('q', quality.toString());
  
  // Add cache busting parameter
  if (process.env.NEXT_PUBLIC_BUILD_ID) {
    params.append('v', process.env.NEXT_PUBLIC_BUILD_ID);
  }

  // Return the CDN URL with the image path and parameters
  return `${cdnUrl}${cleanPath}?${params.toString()}`;
};
