'use client';
import { __extends } from "tslib";
import React, { Component } from 'react';
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    /**
     * Returns a new state object indicating an error occurred.
     */
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true, error: error };
    };
    /**
     * Captures an error and its associated information using PostHog.
     */
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({ error: error, errorInfo: errorInfo });
        // Log error to PostHog if available
        if (typeof window !== 'undefined' && window.posthog) {
            window.posthog.capture('$exception', {
                $exception_message: error.message,
                $exception_type: error.name,
                $exception_stack: error.stack,
                $exception_component_stack: errorInfo.componentStack,
            });
        }
        console.error('Error Boundary caught an error:', error, errorInfo);
    };
    /**
     * Renders children or a fallback UI if an error has occurred.
     */
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            // You can customize the error UI here or use the provided fallback
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (<div className="p-4 text-center">
          <h2 className="text-lg font-medium text-red-600 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-600 mb-4">
            We've been notified about this issue and are working on a fix.
          </p>
          <button onClick={function () { return window.location.reload(); }} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Reload Page
          </button>
        </div>);
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(Component));
export { ErrorBoundary };
//# sourceMappingURL=error-boundary.jsx.map