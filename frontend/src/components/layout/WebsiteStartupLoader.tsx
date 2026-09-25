import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import KineticTextLoader from '../ui/KineticTextLoader';

export const WebsiteStartupLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep startup loader visible briefly for smooth initial mount and kinetic animation cycle
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="website-startup-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-neutral-900 selection:bg-transparent"
        >
          {/* Subtle clean ambient lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(43,60,184,0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-7 px-4">
            {/* Sunny Solar Official Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Sunny Solar"
                className="h-9 sm:h-40 w-auto object-contain"
              />
            </div>

            {/* Kinetic Text Loading Animation */}
            <div className="pt-2 flex items-center  justify-center">
              <KineticTextLoader text="Loading" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebsiteStartupLoader;
