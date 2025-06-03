'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from 'next/dynamic';
// Lazy load providers with code splitting
var ClerkProvider = dynamic(function () { return import('@/providers/clerk-provider').then(function (mod) { return mod.ClerkProvider; }); }, { ssr: true, loading: function () { return null; } });
var QueryProvider = dynamic(function () { return import('@/providers/query-provider').then(function (mod) { return mod.QueryProvider; }); }, { ssr: true, loading: function () { return null; } });
var PostHogProvider = dynamic(function () { return import('@/providers/posthog-provider').then(function (mod) { return mod.PostHogProvider; }); }, { ssr: true, loading: function () { return null; } });
export function Providers(_a) {
    var children = _a.children;
    return (_jsx(PostHogProvider, { children: _jsx(ClerkProvider, { children: _jsx(QueryProvider, { children: children }) }) }));
}
//# sourceMappingURL=providers.js.map