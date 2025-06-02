'use client';
import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ClientLayout } from '@/components/client-layout';
// This is a client component that wraps the content with ClientLayout only for non-dashboard routes
function LayoutWrapper(_a) {
    var children = _a.children, modal = _a.modal;
    var pathname = usePathname();
    var isDashboardRoute = pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/dashboard');
    if (isDashboardRoute) {
        return <>{children}</>;
    }
    return <ClientLayout modal={modal}>{children}</ClientLayout>;
}
export function RootLayoutClient(_a) {
    var children = _a.children, modal = _a.modal;
    return (<Suspense fallback={<div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"/>
      </div>}>
      <LayoutWrapper modal={modal}>
        {children}
      </LayoutWrapper>
    </Suspense>);
}
//# sourceMappingURL=root-layout-client.jsx.map