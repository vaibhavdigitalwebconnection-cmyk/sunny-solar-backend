import React from 'react';
import { motion, type Transition } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  reverse?: boolean;
  initialOffset?: number;
  transition?: Transition;
  style?: React.CSSProperties;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 140,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = '#2B3CB8',
  colorTo = '#6F8EE7',
  delay = 0,
  reverse = false,
  initialOffset = 0,
  transition,
  style,
}) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10"
      style={
        {
          padding: `${borderWidth}px`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          ...style,
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cn('absolute aspect-square', className)}
        style={{
          width: size,
          height: size,
          offsetPath: 'rect(0 100% 100% 0 round 1rem)',
          background: `radial-gradient(circle at center, ${colorTo}, ${colorFrom} 40%, transparent 70%)`,
          filter: 'blur(1.5px)',
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};
