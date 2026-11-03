import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * MetaPixelTracker
 * Tracks SPA page views with fbq('track', 'PageView') on client-side route changes.
 * Skips the very first render to prevent double-firing with index.html's initial snippet.
 */
export const MetaPixelTracker: React.FC = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial render as index.html already fired the initial fbq('track', 'PageView')
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Do not track internal admin portal pages
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname, location.search]);

  return null;
};

