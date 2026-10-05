import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { m, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CursorCardProps {
  children: React.ReactNode;
  image: string;
  description: string;
  href?: string;
  className?: string;
  as?: 'a' | 'div' | 'span';
  onClick?: (e: React.MouseEvent) => void;
}

export function CursorCard({
  children,
  image,
  description,
  href,
  className,
  as = href ? 'a' : 'div',
  onClick,
}: CursorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
      return;
    }

    const cardWidth = 240;
    const cardHeight = 180;
    const padding = 16;

    let targetX = e.clientX - cardWidth / 2;
    if (typeof window !== 'undefined') {
      if (targetX < padding) targetX = padding;
      if (targetX + cardWidth > window.innerWidth - padding) {
        targetX = window.innerWidth - cardWidth - padding;
      }
    }

    let targetY = e.clientY + 20;
    if (typeof window !== 'undefined' && targetY + cardHeight > window.innerHeight - padding) {
      targetY = e.clientY - cardHeight - 15;
    }

    x.set(targetX);
    y.set(targetY);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
      return;
    }
    setIsHovered(true);
  };

  const Component = as;

  return (
    <>
      <Component
        {...(as === 'a' ? { href: href || '#' } : {})}
        onClick={onClick}
        className={cn('relative transition-colors', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </Component>

      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isHovered && (
              <m.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  x: springX,
                  y: springY,
                }}
                className={cn(
                  'fixed top-0 left-0 pointer-events-none z-50 w-60',
                  'bg-white dark:bg-neutral-900 p-3 shadow-2xl rounded-xl border border-neutral-200/90 dark:border-neutral-800 backdrop-blur-xs'
                )}
              >
                <img
                  src={image}
                  alt="hover preview"
                  className="w-full h-28 rounded-md mb-2.5 object-cover shadow-xs"
                />
                <p className="text-xs text-neutral-600 dark:text-neutral-300 m-0 leading-relaxed font-medium">
                  {description}
                </p>
              </m.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default CursorCard;
