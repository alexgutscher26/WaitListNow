'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// Lazy load client components with proper code splitting
var PreloadAssets = dynamic(function () { return import('@/components/preload-assets').then(function (mod) { return mod.PreloadAssets; }); }, { ssr: false, loading: function () { return null; } });
var LoadingFallback = dynamic(function () { return import('@/components/loading-fallback').then(function (mod) { return mod.LoadingFallback; }); }, { ssr: false, loading: function () { return null; } });
export function ClientSideComponents() {
    return (<>
      <PreloadAssets />
      <LoadingFallback />
    </>);
}
//# sourceMappingURL=client-side-components.jsx.map