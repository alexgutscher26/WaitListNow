import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Type is used in other files
type LazyLoadProps<T extends object> = {
  load: () => Promise<{ default: ComponentType<T> }>;
  loading?: () => ReactNode;
  componentProps?: T;
};

/**
 * A higher-order component for lazy loading components with a loading fallback
 * @example
 * const HeavyComponent = lazyLoad(
 *   () => import('./HeavyComponent'),
 *   { ssr: false }
 * );
 */
export function lazyLoad<T extends object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: { ssr?: boolean } = { ssr: false }
) {
  const LazyComponent = lazy(importFn);
  
  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * A component that wraps its children in a Suspense boundary
 */
export function LazyBoundary({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <Suspense fallback={fallback || <Skeleton className="w-full h-full" />}>
      {children}
    </Suspense>
  );
}
