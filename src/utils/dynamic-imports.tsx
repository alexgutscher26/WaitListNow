import { Suspense, lazy, ComponentType, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface DynamicImportOptions {
  loading?: () => ReactNode;
  error?: (error: Error) => ReactNode;
}

const defaultLoading = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

const defaultError = (error: Error) => (
  <div className="text-red-500 p-4">
    <p>Failed to load component</p>
    {process.env.NODE_ENV === 'development' && (
      <pre className="text-xs mt-2">{error.message}</pre>
    )}
  </div>
);

export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  { loading, error }: DynamicImportOptions = {}
) {
  const Component = lazy(importFn);
  
  return function DynamicComponent(props: any) {
    const LoadingComponent = loading || defaultLoading;
    const ErrorComponent = error || defaultError;

    return (
      <Suspense fallback={<LoadingComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Example usage:
/*
const HeavyComponent = dynamicImport(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <div>Loading...</div>,
    error: (error) => <div>Error loading component: {error.message}</div>
  }
);
*/
