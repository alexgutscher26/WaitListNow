// @ts-check

/** @type {import('next').NextConfig} */
const baseConfig = {
  // Enable browser source maps in production
  productionBrowserSourceMaps: true,
  // Increase the timeout for builds to 5 minutes
  staticPageGenerationTimeout: 300,
  // Configure page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  // Enable React Strict Mode
  reactStrictMode: true,
  // Configure images
  images: {
    domains: ['localhost'], // Add your image domains here
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Webpack configuration
  webpack: (config) => {
    // Ignore critical dependency warnings from require-in-the-middle and other modules
    config.ignoreWarnings = [
      // Ignore require-in-the-middle warnings
      { module: /require-in-the-middle/ },
    ];

    return config;
  },
  // Environment variables that will be available on the client side
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    // CDN configuration
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL || '',
    // Add build ID for cache busting
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  },
  // PostHog rewrites to proxy analytics requests
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // Enable HTTP/2 server push
  httpAgentOptions: {
    keepAlive: true,
  },
  // Enable static optimization for all pages
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'date-fns', 'lucide-react'],
  },
  // Disable source maps in production
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'production',
};

// Conditionally apply bundle analyzer in development or when ANALYZE is set
if (process.env.ANALYZE) {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
    openAnalyzer: true,
  });
  module.exports = withBundleAnalyzer(baseConfig);
} else {
  module.exports = baseConfig;
}
