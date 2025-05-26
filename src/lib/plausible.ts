declare global {
  interface Window {
    plausible?: (event: string, options?: { [key: string]: string | number | boolean }) => void;
  }
}

// Initialize Plausible Analytics
/**
 * Loads and initializes the Plausible analytics script asynchronously.
 */
export const initializePlausible = () => {
  const script = document.createElement('script');
  script.src = 'https://plausible.io/js/plausible.js';
  script.async = true;
  script.defer = true;
  script.setAttribute(
    'data-domain',
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || window.location.hostname,
  );
  document.head.appendChild(script);
};

// Export helper functions
/**
 * Tracks an event using the plausible analytics library if available.
 */
export const trackEvent = (
  eventName: string,
  options?: { [key: string]: string | number | boolean },
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, options);
  }
};

/**
 * Tracks a page view using the plausible analytics script if available.
 */
export const trackPageview = () => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview');
  }
};

// Export default as an object with all functions
const plausible = {
  initialize: initializePlausible,
  trackEvent,
  trackPageview,
};

export default plausible;
