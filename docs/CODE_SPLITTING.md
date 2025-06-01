# Code Splitting & Lazy Loading

This document outlines the code splitting and lazy loading strategy implemented in the application to improve performance and reduce initial load time.

## Table of Contents
- [Implementation Details](#implementation-details)
  - [1. Dynamic Imports](#1-dynamic-imports)
  - [2. Lazy Loading Components](#2-lazy-loading-components)
  - [3. Client-Side Components](#3-client-side-components)
  - [4. Route-based Code Splitting](#4-route-based-code-splitting)
- [Usage](#usage)
  - [Basic Lazy Loading](#basic-lazy-loading)
  - [With Suspense Boundary](#with-suspense-boundary)
  - [Client-Only Components](#client-only-components)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Implementation Details

### 1. Dynamic Imports

We're using Next.js's built-in `dynamic` import function to split code at the component level. This allows components to be loaded only when they're needed.

### 2. Lazy Loading Components

We've created a utility function `lazyLoad` in `src/components/ui/lazy-load.tsx` that makes it easy to lazy load components with a loading fallback. The utility includes:

- TypeScript support
- Loading states
- Error boundaries
- Suspense integration

### 3. Client-Side Components

For client-side only components, we use the `ClientProviders` pattern to group and lazy load them together. This is especially useful for components that:

- Use browser APIs
- Include third-party libraries that depend on `window`
- Contain interactive elements that don't need server-side rendering

The `ClientProviders` component is defined in `src/components/providers/client-providers.tsx`.

### 4. Route-based Code Splitting

Next.js automatically handles route-based code splitting. Each page in the `app` directory is split into its own JavaScript bundle.

## Usage

### Basic Lazy Loading

```tsx
'use client';

import { lazyLoad } from '@/components/ui/lazy-load';

// Lazy load a component
const HeavyComponent = lazyLoad(
  () => import('@/components/HeavyComponent'),
  { ssr: false } // Disable SSR for this component if needed
);

// Use the lazy-loaded component
function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
      <HeavyComponent someProp="value" />
    </div>
  );
}
```

### Lazy Loading with Suspense

```tsx
import { Suspense } from 'react';
import { LazyBoundary } from '@/components/ui/lazy-load';

function PageWithLazyContent() {
  return (
    <div>
      <h1>My Page</h1>
      <LazyBoundary fallback={<div>Loading...</div>}>
        <LazyComponent />
      </LazyBoundary>
    </div>
  );
}
```

### Dynamic Imports in Next.js

```tsx
import dynamic from 'next/dynamic';

// Basic dynamic import
const DynamicComponent = dynamic(() => import('../components/Hello'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable server-side rendering for this component
});

// With named exports
const NamedComponent = dynamic(
  () => import('../components/Hello').then((mod) => mod.NamedComponent),
  {
    loading: () => <p>Loading...</p>,
  }
);
```

## Best Practices

1. **Lazy Load Heavy Components**: Use `lazyLoad` for components that are not immediately visible or below the fold.
2. **Use Suspense Boundaries**: Wrap lazy-loaded components with `Suspense` to show a fallback while loading.
3. **Preload Critical Components**: Use `preloadDynamicImport` to preload components that will be needed soon.
4. **Disable SSR When Possible**: For components that don't need server-side rendering, disable it with `ssr: false`.
5. **Group Related Components**: Use dynamic imports for entire feature modules when possible.

## Performance Impact

- **Reduced Initial Bundle Size**: Only load the JavaScript needed for the current page.
- **Faster Time to Interactive**: The main thread is less blocked by large JavaScript bundles.
- **Better User Experience**: Loading indicators provide feedback while components are being loaded.

## Monitoring

Monitor the effectiveness of code splitting using:

- Webpack Bundle Analyzer
- Lighthouse performance audits
- Next.js Analytics

## Troubleshooting

If a component doesn't load:
1. Check the network tab for failed chunk loads
2. Verify the import path is correct
3. Ensure the component is exported as default
4. Check for any circular dependencies
