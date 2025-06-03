const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

// Import the base config
const nextConfig = require('./next.config');

// Create a new config object to avoid reference issues
const config = {
  ...nextConfig,
  // Override any settings specific to the analyzer build
  productionBrowserSourceMaps: true,
};

// Apply the bundle analyzer plugin
module.exports = withBundleAnalyzer(config);
