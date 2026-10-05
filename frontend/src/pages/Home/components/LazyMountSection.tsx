import React, { useState, useEffect, useRef } from 'react';

export interface LazyMountSectionProps {
  children: React.ReactNode;
  /** Reserved height in pixels or Tailwind class so layout does not shift */
  minHeight: number | string;
  /** Margin before viewport to trigger mounting (default: 600px ahead of scroll) */
  rootMargin?: string;
  className?: string;
}

/**
 * Lazy-mounts heavy below-the-fold sections only when approaching the viewport.
 * Crucially preserves the exact minHeight placeholder prior to mounting, completely
 * preventing Layout Shift (CLS) while eliminating main-thread long tasks and TBT on initial load.
 */
export const LazyMountSection: React.FC<LazyMountSectionProps> = ({
  children,
  minHeight,
  rootMargin = '600px',
  className = '',
}) => {
  const [isNearViewport, setIsNearViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNearViewport) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  const heightStyle =
    typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  return (
    <div
      ref={containerRef}
      style={!isNearViewport ? { minHeight: heightStyle } : undefined}
      className={className}
    >
      {isNearViewport ? children : null}
    </div>
  );
};

export default LazyMountSection;
