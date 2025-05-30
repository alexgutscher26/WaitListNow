/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
