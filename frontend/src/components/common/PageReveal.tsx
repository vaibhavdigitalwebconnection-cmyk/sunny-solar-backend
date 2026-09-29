import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface PageRevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Distance from bottom to start sliding from (e.g. '80vh', '100vh', 150).
   * Default is '80vh' for a prominent, cinematic bottom-to-top slide.
   */
  slideDistance?: string | number;
  /**
   * Duration of the slide animation in seconds. Default is 1.1s.
   */
  duration?: number;
  /**
   * Delay before sliding starts (in ms) after loader finishes. Default is 50ms.
   */
  delay?: number;
}

// Global in-memory flag so navigating between pages in the same session doesn't delay
let hasWebsiteStartupFinished = false;

export const PageReveal: React.FC<PageRevealProps> = ({
  children,
  className = '',
  slideDistance = '80vh',
  duration = 1.65,
  delay = 600,
}) => {
  // If the website startup loader has already finished in this session, start ready immediately
  const [isReady, setIsReady] = useState(hasWebsiteStartupFinished);
  const [isAnimationDone, setIsAnimationDone] = useState(hasWebsiteStartupFinished);

  useEffect(() => {
    if (hasWebsiteStartupFinished) {
      setIsReady(true);
      setIsAnimationDone(true);
      return;
    }

    let isMounted = true;
    let fallbackTimeout: ReturnType<typeof setTimeout> | null = null;
    let startTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleLoaderFinish = () => {
      if (!isMounted) return;
      // Mark global flag
      hasWebsiteStartupFinished = true;

      // Small delay for smooth handoff as startup loader begins fading out
      startTimeout = setTimeout(() => {
        if (isMounted) {
          setIsReady(true);
        }
      }, delay);
    };

    // 1. Listen for custom event from WebsiteStartupLoader
    window.addEventListener('website-startup-loader-finish', handleLoaderFinish, { once: true });
    window.addEventListener('website-startup-loader-complete', handleLoaderFinish, { once: true });

    // 2. Resilient fallback timeout (matching the 1500ms startup loader duration)
    fallbackTimeout = setTimeout(() => {
      handleLoaderFinish();
    }, 1500);

    return () => {
      isMounted = false;
      window.removeEventListener('website-startup-loader-finish', handleLoaderFinish);
      window.removeEventListener('website-startup-loader-complete', handleLoaderFinish);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (startTimeout) clearTimeout(startTimeout);
    };
  }, [delay]);

  return (
    <motion.div
      initial={
        hasWebsiteStartupFinished
          ? false
          : {
            y: slideDistance,
            opacity: 0,
          }
      }
      animate={
        isReady
          ? {
            y: 0,
            opacity: 2,
          }
          : {
            y: slideDistance,
            opacity: 0,
          }
      }
      transition={{
        y: {
          duration,
          ease: [0.16, 1, 0.3, 1], // Luxury deceleration curve (Apple / Stripe style)
        },
        opacity: {
          duration: 0.5,
          ease: 'easeOut',
        },
      }}
      onAnimationComplete={() => {
        setIsAnimationDone(true);
        hasWebsiteStartupFinished = true;
      }}
      style={{
        // Remove CSS transform once complete so position:sticky, fixed, and Lenis scroll behave normally
        transform: isAnimationDone ? 'none' : undefined,
        willChange: isAnimationDone ? 'auto' : 'transform, opacity',
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageReveal;
