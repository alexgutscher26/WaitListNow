import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
/**
 * A higher-order component for lazy loading components with a loading fallback
 * @example
 * const HeavyComponent = lazyLoad(
 *   () => import('./HeavyComponent'),
 *   { ssr: false }
 * );
 */
export function lazyLoad(importFn, options) {
    if (options === void 0) { options = { ssr: false }; }
    var LazyComponent = lazy(importFn);
    return function LazyWrapper(props) {
        return (<Suspense fallback={<Skeleton className="w-full h-full"/>}>
        <LazyComponent {...props}/>
      </Suspense>);
    };
}
/**
 * A component that wraps its children in a Suspense boundary
 */
export function LazyBoundary(_a) {
    var children = _a.children, fallback = _a.fallback;
    return (<Suspense fallback={fallback || <Skeleton className="w-full h-full"/>}>
      {children}
    </Suspense>);
}
//# sourceMappingURL=lazy-load.jsx.map