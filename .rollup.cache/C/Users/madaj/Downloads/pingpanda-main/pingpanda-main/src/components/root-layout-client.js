'use client';
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ClientLayout } from '@/components/client-layout';
// This is a client component that wraps the content with ClientLayout only for non-dashboard routes
function LayoutWrapper(_a) {
    var children = _a.children, modal = _a.modal;
    var pathname = usePathname();
    var isDashboardRoute = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/dashboard');
    if (isDashboardRoute) {
        return _jsx(_Fragment, { children: children });
    }
    return _jsx(ClientLayout, { modal: modal, children: children });
}
export function RootLayoutClient(_a) {
    var children = _a.children, modal = _a.modal;
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "flex h-screen w-full items-center justify-center", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }), children: _jsx(LayoutWrapper, { modal: modal, children: children }) }));
}
//# sourceMappingURL=root-layout-client.js.map