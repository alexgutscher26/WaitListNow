import { useEffect, useState } from 'react';

/**
 * A custom hook to determine the current device type and screen dimensions.
 *
 * This hook uses React's `useState` and `useEffect` hooks to track the device type (mobile, tablet, or desktop)
 * based on window width. It also listens for window resize events to update the device type accordingly.
 */
export const useMediaQuery = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop' | null>(null);

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    /**
     * Determines and sets the device type based on screen width.
     */
    const checkDevice = () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        setDevice('mobile');
      } else if (window.matchMedia('(min-width: 641px) and (max-width: 1024px)')) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    checkDevice();

    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  };
};
