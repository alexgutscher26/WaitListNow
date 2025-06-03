/**
 * CDN Configuration
 *
 * This file contains the configuration for the CDN used by the application.
 * In production, this will point to your CDN URL, while in development it will use an empty string.
 */
var isProduction = process.env.NODE_ENV === 'production';
// Default CDN URL (can be overridden by environment variables)
var cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
// Helper function to get the full CDN URL for a given path
export var getCdnUrl = function (path) {
    if (!isProduction || !cdnUrl)
        return path;
    // Remove leading slash from path if present
    var normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    // Ensure CDN URL doesn't end with a slash
    var normalizedCdnUrl = cdnUrl.endsWith('/') ? cdnUrl.slice(0, -1) : cdnUrl;
    return "".concat(normalizedCdnUrl, "/").concat(normalizedPath);
};
// Export the base CDN URL
export var CDN_URL = cdnUrl;
// Export a function to check if CDN is enabled
export var isCdnEnabled = function () {
    return isProduction && !!cdnUrl;
};
//# sourceMappingURL=cdn.js.map