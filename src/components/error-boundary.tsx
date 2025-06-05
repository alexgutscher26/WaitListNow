'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Returns a new state object indicating an error occurred.
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * Captures an error and its associated information using PostHog.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to PostHog if available
    if (typeof window !== 'undefined') {
      const posthog = (window as any).posthog;
      if (posthog) {
        posthog.capture('$exception', {
          $exception_message: error.message,
          $exception_type: error.name,
          $exception_stack: error.stack,
        $exception_component_stack: errorInfo.componentStack,
      });
    }
    
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  /**
   * Renders children or a fallback UI if an error has occurred.
   */
  render() {
    if (this.state.hasError) {
      // You can customize the error UI here or use the provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-4 text-center">
          <h2 className="text-lg font-medium text-red-600 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-600 mb-4">
            We've been notified about this issue and are working on a fix.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

