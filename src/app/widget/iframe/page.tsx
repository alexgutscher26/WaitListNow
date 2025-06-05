'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { WaitlistWidget, WaitlistWidgetStyle } from '@/components/waitlist-widget';

function parseStyleParams(params: URLSearchParams): Partial<WaitlistWidgetStyle> {
  return {
    buttonText: params.get('buttonText') || undefined,
    buttonColor: params.get('buttonColor') || undefined,
    buttonTextColor: params.get('buttonTextColor') || undefined,
    backgroundColor: params.get('backgroundColor') || undefined,
    textColor: params.get('textColor') || undefined,
    borderRadius: params.get('borderRadius') ? Number(params.get('borderRadius')) : undefined,
    fontFamily: params.get('fontFamily') || undefined,
    showLabels: params.get('showLabels') ? params.get('showLabels') === 'true' : undefined,
    formLayout: params.get('formLayout') as 'stacked' | 'inline' || undefined,
  };
}

export default function WidgetIframePage() {
  const params = useSearchParams();
  const waitlistId = params.get('waitlistId') || 'new';
  const apiKey = params.get('apiKey') || undefined;
  const showBranding = params.get('showBranding') ? params.get('showBranding') === 'true' : true;
  const style = parseStyleParams(params);

  // Minimal iframe-friendly styling
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', margin: 0 }}>
      <style>{"body { margin: 0; background: transparent; }"}</style>
      <WaitlistWidget
        waitlistId={waitlistId}
        style={style}
        apiKey={apiKey}
        showBranding={showBranding}
      />
    </div>
  );
} 