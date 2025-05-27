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
  webpack: (config, {}) => {
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
  // Sentry configuration - only in production
  ...(process.env.SENTRY_DSN && process.env.NODE_ENV === 'production'
    ? {
        sentry: {
          disableServerWebpackPlugin: false,
          disableClientWebpackPlugin: false,
          hideSourceMaps: false,
        },
      }
    : {}),
};

// Conditionally use Sentry configuration if SENTRY_DSN is set
const withSentry =
  process.env.SENTRY_DSN && process.env.NODE_ENV === 'production'
    ? require('@sentry/nextjs').withSentryConfig
    : (config) => config;

export default withSentry(nextConfig);
