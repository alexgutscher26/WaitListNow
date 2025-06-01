# Image Optimization

This document outlines the image optimization strategy implemented in the application.

## Features

- Automatic WebP and AVIF format conversion
- Responsive image sizing
- Lazy loading
- Blur-up placeholders
- Optimized caching
- Proper aspect ratios
- Accessibility support

## Usage

### Basic Usage

```tsx
import { Image } from '@/components/ui/image';

// Basic usage
<Image
  src="/path/to/image.jpg"
  alt="Description of image"
  width={800}
  height={600}
/>;
```

### With Custom Class

```tsx
<Image
  src="/path/to/image.jpg"
  alt="Description of image"
  width={800}
  height={600}
  className="rounded-lg shadow-md"
/>
```

### Remote Images

For remote images, make sure the domain is whitelisted in `next.config.mjs`:

```javascript
images: {
  domains: ['your-domain.com'],
  // ... other config
}
```

## Best Practices

1. **Always specify width and height** to prevent layout shifts
2. **Provide meaningful alt text** for accessibility
3. **Use appropriate sizes** for different viewports
4. **Leverage the `sizes` attribute** for responsive images
5. **Use the `placeholder` prop** for blur-up placeholders

## Configuration

Image optimization is configured in `next.config.mjs` with the following settings:

- **formats**: Supports WebP and AVIF formats
- **minimumCacheTTL**: 30 days
- **deviceSizes**: Common device widths for responsive images
- **imageSizes**: Common image dimensions for various UI elements
- **remotePatterns**: Allows images from any HTTPS source

## Performance Impact

The image optimization provides:

- Faster page loads with modern formats (WebP/AVIF)
- Reduced bandwidth usage
- Improved Core Web Vitals
- Better user experience with blur-up placeholders

## Testing

To verify image optimization is working:

1. Check network requests in DevTools for `_next/image`
2. Look for `Content-Type: image/webp` or `image/avif`
3. Verify proper caching headers
4. Test different viewports to ensure responsive images work
