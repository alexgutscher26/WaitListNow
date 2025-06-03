'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from 'next/dynamic';
// Client-side layout with dynamic imports
var ClientLayout = dynamic(function () { return import('@/components/client-layout').then(function (mod) { return mod.ClientLayout; }); }, {
    ssr: false,
    loading: function () { return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" }) })); }
});
// Server providers with dynamic import
var Providers = dynamic(function () { return import('../app/providers').then(function (mod) { return ({ default: mod.Providers }); }); }, {
    ssr: true,
    loading: function () { return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" }) })); }
});
export function ClientRootLayout(_a) {
    var children = _a.children, modal = _a.modal;
    return (_jsx(Providers, { children: _jsx(ClientLayout, { modal: modal, children: children }) }));
}
//# sourceMappingURL=client-root-layout.js.map