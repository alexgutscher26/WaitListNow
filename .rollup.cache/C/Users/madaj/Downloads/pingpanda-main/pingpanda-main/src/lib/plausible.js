// Initialize Plausible Analytics
/**
 * Loads and initializes the Plausible analytics script asynchronously.
 */
export var initializePlausible = function () {
    var script = document.createElement('script');
    script.src = 'https://plausible.io/js/plausible.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-domain', process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || window.location.hostname);
    document.head.appendChild(script);
};
// Export helper functions
/**
 * Tracks an event using the plausible analytics library if available.
 */
export var trackEvent = function (eventName, options) {
    if (typeof window !== 'undefined' && window.plausible) {
        window.plausible(eventName, options);
    }
};
/**
 * Tracks a page view using the plausible analytics script if available.
 */
export var trackPageview = function () {
    if (typeof window !== 'undefined' && window.plausible) {
        window.plausible('pageview');
    }
};
// Export default as an object with all functions
var plausible = {
    initialize: initializePlausible,
    trackEvent: trackEvent,
    trackPageview: trackPageview,
};
export default plausible;
//# sourceMappingURL=plausible.js.map