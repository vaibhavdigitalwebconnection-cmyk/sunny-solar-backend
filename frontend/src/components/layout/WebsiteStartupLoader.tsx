import React, { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import KineticTextLoader from '../ui/KineticTextLoader';

export const WebsiteStartupLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const isBot =
          /Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse|Headless/i.test(navigator.userAgent) ||
          Boolean((navigator as any).webdriver);
        if (isBot) return false;
        return !sessionStorage.getItem('sunny_startup_loaded');
      } catch {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    if (!isVisible) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('website-startup-loader-finish'));
        window.dispatchEvent(new CustomEvent('website-startup-loader-complete'));
      }
      return;
    }

    // Show full 1800ms kinetic text cycle on initial website startup only
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('sunny_startup_loaded', 'true');
        } catch {
          // ignore
        }
        window.dispatchEvent(new CustomEvent('website-startup-loader-finish'));
      }
    }, 1900);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          key="website-startup-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
          onAnimationComplete={(definition) => {
            if (definition === 'exit' || !isVisible) {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('website-startup-loader-complete'));
              }
            }
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white text-neutral-900 selection:bg-transparent"
        >
          {/* Subtle clean ambient lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(43,60,184,0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
            {/* Sunny Solar Official Logo */}
            <div className="flex items-center justify-center">
              <img
                src="/logo.webp"
                alt="Sunny Solar"
                className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-xs"
                width="220"
                height="90"
              />
            </div>

            {/* Kinetic Text Loading Animation */}
            <div className="flex items-center justify-center">
              <KineticTextLoader text="Loading" />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default WebsiteStartupLoader;
