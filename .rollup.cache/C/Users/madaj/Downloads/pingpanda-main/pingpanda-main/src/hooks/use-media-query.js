import { useEffect, useState } from 'react';
/**
 * A custom hook to determine the current device type and screen dimensions.
 *
 * This hook uses React's `useState` and `useEffect` hooks to track the device type (mobile, tablet, or desktop)
 * based on window width. It also listens for window resize events to update the device type accordingly.
 */
export var useMediaQuery = function () {
    var _a = useState(null), device = _a[0], setDevice = _a[1];
    // Screen dimensions state (commented out as it's currently unused)
    var dimensions = useState(null)[0];
    useEffect(function () {
        /**
         * Determines and sets the device type based on screen width.
         */
        var checkDevice = function () {
            if (window.matchMedia('(max-width: 640px)').matches) {
                setDevice('mobile');
            }
            else if (window.matchMedia('(min-width: 641px) and (max-width: 1024px)')) {
                setDevice('tablet');
            }
            else {
                setDevice('desktop');
            }
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return function () {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);
    return {
        device: device,
        width: dimensions === null || dimensions === void 0 ? void 0 : dimensions.width,
        height: dimensions === null || dimensions === void 0 ? void 0 : dimensions.height,
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
    };
};
//# sourceMappingURL=use-media-query.js.map