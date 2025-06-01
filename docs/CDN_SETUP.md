# CDN Setup Guide

This guide explains how to set up and configure a Content Delivery Network (CDN) for your Next.js application to serve static assets more efficiently.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

A CDN helps improve your application's performance by serving static assets (images, JavaScript, CSS, etc.) from servers that are geographically closer to your users. This reduces latency and improves load times.

## Prerequisites

- A Next.js application (v13+ with App Router)
- A CDN provider (e.g., Vercel, Cloudflare, AWS CloudFront)
- Basic understanding of environment variables

## Configuration

### 1. Environment Variables

Update your `.env.local` file with the following variables:

```env
# Base URL of your application (e.g., https://yourapp.com)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# CDN URL where your static assets will be served from (e.g., https://cdn.yourapp.com)
NEXT_PUBLIC_CDN_URL=

# Domain for your application (without protocol, e.g., yourapp.com)
NEXT_PUBLIC_APP_DOMAIN=localhost

# Vercel deployment specific (automatically set in Vercel)
VERCEL_GIT_COMMIT_SHA=
```

### 2. Next.js Configuration

The application is already configured to work with a CDN through the following files:

- `next.config.mjs`: Contains the main CDN configuration
- `src/lib/cdn-utils.ts`: Utility functions for working with CDN URLs
- `src/components/preload-assets.tsx`: Client component for preloading critical assets
- `src/components/loading-fallback.tsx`: Loading component with asset preloading

## Usage

### Using the CDN for Static Assets

To reference static assets in your components, use the `getStaticAssetUrl` utility function:

```typescript
import { getStaticAssetUrl } from '@/lib/cdn-utils';

// In your component
const imageUrl = getStaticAssetUrl('/images/logo.png');
// Returns: /images/logo.png in development, or https://cdn.yourapp.com/images/logo.png in production
```

### Preloading Critical Assets

Critical assets are automatically preloaded using the `PreloadAssets` component in the root layout. This component is included in `src/app/layout.tsx`.

## Deployment

### Vercel

If you're deploying to Vercel, the CDN is automatically configured. Just set the following environment variables in your Vercel project settings:

- `NEXT_PUBLIC_CDN_URL`: Your CDN URL (e.g., `https://your-vercel-project.vercel.app`)
- `NEXT_PUBLIC_APP_DOMAIN`: Your application's domain (e.g., `yourapp.com`)

### Other Platforms

For other platforms, make sure to:

1. Set up your CDN to point to your application's domain
2. Configure proper caching headers for static assets
3. Set up SSL/TLS for secure connections

## Troubleshooting

### Assets Not Loading from CDN

1. Verify that `NEXT_PUBLIC_CDN_URL` is correctly set in your environment variables
2. Check the browser's network tab to see where assets are being loaded from
3. Ensure your CDN is properly configured to forward requests to your application

### Mixed Content Warnings

If you see mixed content warnings, make sure:

- Your CDN URL uses HTTPS
- All asset URLs use HTTPS or protocol-relative URLs
- The `NEXT_PUBLIC_APP_URL` environment variable uses HTTPS in production

### Cache Invalidation

To force cache invalidation when deploying updates:

1. Update the `VERCEL_GIT_COMMIT_SHA` environment variable (automatically set in Vercel)
2. Append a version query parameter to your asset URLs (already handled by `getStaticAssetUrl`)

## Best Practices

1. **Use the utility functions**: Always use `getStaticAssetUrl` for static assets
2. **Optimize images**: Use Next.js Image component with proper sizing and formats
3. **Preload critical assets**: Let the `PreloadAssets` component handle preloading
4. **Monitor performance**: Use tools like Lighthouse to measure the impact of your CDN setup
5. **Set appropriate cache headers**: Ensure your CDN is configured with proper cache control headers

## CDN Providers

While this setup works with any CDN, here are some recommended providers:

- **Vercel Edge Network**: Automatically configured when deploying to Vercel
- **Cloudflare**: Great performance and security features
- **AWS CloudFront**: Highly customizable and scalable
- **BunnyCDN**: Cost-effective with good global coverage

## Security Considerations

1. **HTTPS**: Always use HTTPS for CDN connections
2. **CORS**: Configure proper CORS headers if serving assets across domains
3. **Access Control**: Restrict access to your CDN if needed
4. **Monitoring**: Monitor CDN usage and performance
