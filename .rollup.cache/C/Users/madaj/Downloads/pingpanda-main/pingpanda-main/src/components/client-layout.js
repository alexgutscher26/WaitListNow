'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
// Import providers
var ClerkProvider = dynamic(function () { return import('@/providers/clerk-provider').then(function (mod) { return mod.ClerkProvider; }); }, { ssr: true, loading: function () { return null; } });
var QueryProvider = dynamic(function () { return import('@/providers/query-provider').then(function (mod) { return mod.QueryProvider; }); }, { ssr: true, loading: function () { return null; } });
var PostHogProvider = dynamic(function () { return import('@/providers/posthog-provider').then(function (mod) { return mod.PostHogProvider; }); }, { ssr: true, loading: function () { return null; } });
// Lazy load client providers with proper code splitting
var ClientProviders = dynamic(function () { return import('@/components/providers/client-providers').then(function (mod) { return ({
    default: function DynamicClientProviders(_a) {
        var children = _a.children;
        return _jsx(mod.ClientProviders, { children: children });
    }
}); }); }, {
    ssr: false,
    loading: function () { return (_jsx("div", { className: "flex h-screen w-full items-center justify-center", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) })); }
});
// Client components with dynamic imports
var ClientSideComponents = dynamic(function () { return import('@/components/client-side-components').then(function (mod) { return ({
    default: function DynamicClientComponents() {
        return _jsx(mod.ClientSideComponents, {});
    }
}); }); }, {
    ssr: false,
    loading: function () { return null; }
});
export function ClientLayout(_a) {
    var children = _a.children, modal = _a.modal;
    var _b = useState(false), mounted = _b[0], setMounted = _b[1];
    var pathname = usePathname();
    var isDashboardRoute = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/dashboard');
    useEffect(function () {
        setMounted(true);
    }, []);
    // Don't render anything until the component is mounted on the client
    if (!mounted) {
        return (_jsx("div", { className: "flex h-screen w-full items-center justify-center", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }));
    }
    // For dashboard routes, only render the children as they have their own layout
    if (isDashboardRoute) {
        return (_jsx(ClerkProvider, { children: _jsx(QueryProvider, { children: _jsx(PostHogProvider, { children: _jsxs(ClientProviders, { children: [children, modal, _jsx(ClientSideComponents, {})] }) }) }) }));
    }
    // For non-dashboard routes, use the default layout
    return (_jsx(ClerkProvider, { children: _jsx(QueryProvider, { children: _jsx(PostHogProvider, { children: _jsxs(ClientProviders, { children: [_jsx("div", { className: "flex min-h-screen flex-col", children: _jsxs("main", { className: "flex-1", children: [children, modal] }) }), _jsx(ClientSideComponents, {})] }) }) }) }));
}
//# sourceMappingURL=client-layout.js.map