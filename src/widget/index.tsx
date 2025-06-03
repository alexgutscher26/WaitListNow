import React from 'react';
import { createRoot } from 'react-dom/client';
import { WaitlistWidget, WaitlistWidgetStyle } from '../components/waitlist-widget';

// Find the current script tag
const currentScript = document.currentScript as HTMLScriptElement | null;

if (currentScript) {
  // Extract data attributes
  const getAttr = (name: string, fallback?: string) => currentScript.getAttribute(name) || fallback;
  const waitlistId = getAttr('data-waitlist-id', 'new') ?? 'new';
  const apiKey = getAttr('data-api-key', undefined);

  // Map data attributes to style object
  const style: Partial<WaitlistWidgetStyle> = {
    buttonText: getAttr('data-button-text', undefined) ?? undefined,
    buttonColor: getAttr('data-primary-color', undefined) ?? undefined,
    buttonTextColor: getAttr('data-button-text-color', undefined) ?? undefined,
    backgroundColor: getAttr('data-background-color', undefined) ?? undefined,
    textColor: getAttr('data-text-color', undefined) ?? undefined,
    borderRadius:
      getAttr('data-button-rounded', undefined) === 'md'
        ? 8
        : getAttr('data-button-rounded', undefined) === 'lg'
          ? 16
          : undefined,
    fontFamily: getAttr('data-font-family', undefined) ?? undefined,
    showLabels: getAttr('data-show-labels', 'true') === 'true',
    formLayout: (getAttr('data-form-layout', 'stacked') as 'stacked' | 'inline') ?? undefined,
  };

  // Remove undefined keys in a type-safe way
  Object.keys(style).forEach((key) => {
    const typedKey = key as keyof WaitlistWidgetStyle;
    if (style[typedKey] === undefined) {
      delete style[typedKey];
    }
  });

  // Create a container div
  const container = document.createElement('div');
  container.id = `waitlist-widget-container-${waitlistId}`;
  currentScript.parentNode?.insertBefore(container, currentScript.nextSibling);

  // Get the user's plan from the embed
  const plan = currentScript.getAttribute('data-plan') || 'free';

  // Only allow branding removal for certain plans
  const showBrandingAttr = currentScript.getAttribute('data-show-branding');
  // Plans that are allowed to remove branding
  const canRemoveBranding = ['Starter', 'Growth', 'Pro'].includes(plan);
  // Enforce branding for all other plans
  const showBranding = canRemoveBranding ? showBrandingAttr !== 'false' : true;

  // Pass showBranding to the widget
  createRoot(container).render(
    <WaitlistWidget
      waitlistId={waitlistId}
      style={style}
      apiKey={apiKey}
      showBranding={showBranding}
    />,
  );
}
