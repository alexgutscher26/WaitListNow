'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

import { captureException } from '@/lib/sentry';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Returns a new state object indicating an error occurred.
   */
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  /**
   * Captures an error and its associated information using Sentry's captureException method.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    captureException(error, { errorInfo });
  }

  /**
   * Renders children or a fallback UI if an error has occurred.
   */
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}
