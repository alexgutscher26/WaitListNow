import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
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
        return (_jsx(Suspense, { fallback: _jsx(Skeleton, { className: "w-full h-full" }), children: _jsx(LazyComponent, __assign({}, props)) }));
    };
}
/**
 * A component that wraps its children in a Suspense boundary
 */
export function LazyBoundary(_a) {
    var children = _a.children, fallback = _a.fallback;
    return (_jsx(Suspense, { fallback: fallback || _jsx(Skeleton, { className: "w-full h-full" }), children: children }));
}
//# sourceMappingURL=lazy-load.js.map