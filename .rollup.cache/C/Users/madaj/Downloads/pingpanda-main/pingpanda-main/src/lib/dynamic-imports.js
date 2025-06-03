import dynamic from 'next/dynamic';
/**
 * Helper function to create a dynamic import with common options
 * @param importFn - Dynamic import function (e.g., () => import('./Component'))
 * @param options - Dynamic import options
 * @returns A dynamically imported component with proper TypeScript types
 */
export function dynamicImport(importFn, options) {
    if (options === void 0) { options = {}; }
    var loading = options.loading, _a = options.ssr, ssr = _a === void 0 ? false : _a;
    return dynamic(importFn, {
        loading: loading ? function () { return loading(); } : undefined,
        ssr: ssr,
    });
}
/**
 * Preload a dynamic import for better performance
 * @param importFn - Dynamic import function to preload
 */
export function preloadDynamicImport(importFn) {
    return importFn().then(function () { });
}
//# sourceMappingURL=dynamic-imports.js.map