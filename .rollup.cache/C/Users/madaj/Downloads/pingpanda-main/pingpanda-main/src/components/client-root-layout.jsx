'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// Client-side layout with dynamic imports
var ClientLayout = dynamic(function () { return import('@/components/client-layout').then(function (mod) { return mod.ClientLayout; }); }, {
    ssr: false,
    loading: function () { return (<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>); }
});
// Server providers with dynamic import
var Providers = dynamic(function () { return import('../app/providers').then(function (mod) { return ({ default: mod.Providers }); }); }, {
    ssr: true,
    loading: function () { return (<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
      </div>); }
});
export function ClientRootLayout(_a) {
    var children = _a.children, modal = _a.modal;
    return (<Providers>
      <ClientLayout modal={modal}>
        {children}
      </ClientLayout>
    </Providers>);
}
//# sourceMappingURL=client-root-layout.jsx.map