import React from 'react';
import { motion, useScroll, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ScrollProgressProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  className?: string;
}

export const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#2B3CB8] via-[#6F8EE7] to-[#A4B9F1]',
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />
    );
  }
);

ScrollProgress.displayName = 'ScrollProgress';

export default ScrollProgress;
