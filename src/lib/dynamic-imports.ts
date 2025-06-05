/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic, { Loader } from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

interface DynamicImportOptions<T = object> {
  loading?: () => ReactNode;
  ssr?: boolean;
  suspense?: boolean;
}

/**
 * Helper function to create a dynamic import with common options
 * @param importFn - Dynamic import function (e.g., () => import('./Component'))
 * @param options - Dynamic import options
 * @returns A dynamically imported component with proper TypeScript types
 */
export function dynamicImport<T extends object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicImportOptions<T> = {}
) {
  const { loading, ssr = false } = options;

  return dynamic(importFn as Loader<T>, {
    loading: loading ? () => loading() : undefined,
    ssr,
  }) as unknown as ComponentType<T>;
}

/**
 * Preload a dynamic import for better performance
 * @param importFn - Dynamic import function to preload
 */
export function preloadDynamicImport<T>(importFn: () => Promise<T>): Promise<void> {
  return importFn().then(() => {});
}
