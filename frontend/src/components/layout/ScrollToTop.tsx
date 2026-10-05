import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '../common/SmoothScroll.tsx';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  const { lenis } = useSmoothScroll();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Only scroll to top if there is no anchor hash target
    if (!hash) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
    }

    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname, hash, lenis]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <m.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="fixed top-0 left-0 right-0 h-1 bg-[#2B3CB8] z-9999 shadow-sm shadow-[#2B3CB8]/50 pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

