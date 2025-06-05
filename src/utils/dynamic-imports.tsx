import { Loader2 } from 'lucide-react';
import React, { Suspense, lazy, ComponentType, ReactNode } from 'react';

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

class ErrorBoundary extends React.Component<{
  fallback: (error: Error) => ReactNode;
  children: ReactNode;
}, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

export function dynamicImport<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  { loading, error = defaultError }: DynamicImportOptions = {}
) {
  const Component = lazy(importFn);
  const LoadingComponent = loading || defaultLoading;
  
  return function DynamicComponent(props: unknown) {
    return (
      <ErrorBoundary fallback={error}>
        <Suspense fallback={<LoadingComponent />}>
          <Component {...(props as object)} />
        </Suspense>
      </ErrorBoundary>
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
