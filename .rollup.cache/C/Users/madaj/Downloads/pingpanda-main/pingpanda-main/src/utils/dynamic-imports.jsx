import { __extends } from "tslib";
import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
var defaultLoading = function () { return (<div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="h-8 w-8 animate-spin"/>
  </div>); };
var defaultError = function (error) { return (<div className="text-red-500 p-4">
    <p>Failed to load component</p>
    {process.env.NODE_ENV === 'development' && (<pre className="text-xs mt-2">{error.message}</pre>)}
  </div>); };
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { hasError: false, error: null };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true, error: error };
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError && this.state.error) {
            return this.props.fallback(this.state.error);
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
export function dynamicImport(importFn, _a) {
    var _b = _a === void 0 ? {} : _a, loading = _b.loading, _c = _b.error, error = _c === void 0 ? defaultError : _c;
    var Component = lazy(importFn);
    var LoadingComponent = loading || defaultLoading;
    return function DynamicComponent(props) {
        return (<ErrorBoundary fallback={error}>
        <Suspense fallback={<LoadingComponent />}>
          <Component {...props}/>
        </Suspense>
      </ErrorBoundary>);
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
//# sourceMappingURL=dynamic-imports.jsx.map