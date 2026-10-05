import React, { useEffect, useId, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
}

export const DotPattern: React.FC<DotPatternProps> = ({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}) => {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width: w, height: h } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: w, height: h });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const cols = Math.ceil((dimensions.width || 800) / width);
  const rows = Math.ceil((dimensions.height || 600) / height);
  const total = Math.min(cols * rows, 400);

  const dots = Array.from({ length: total }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: col * width + cx + x,
      y: row * height + cy + y,
      delay: (i % 8) * 0.6,
      duration: 3 + (i % 5) * 0.6,
    };
  });

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full text-slate-300',
        className
      )}
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      {dots.map((dot, idx) => (
        <m.circle
          key={idx}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
          initial={glow ? { opacity: 0.15, scale: 1 } : { opacity: 0.3 }}
          animate={
            glow
              ? {
                  opacity: [0.15, 0.75, 0.15],
                  scale: [1, 1.4, 1],
                }
              : {}
          }
          transition={
            glow
              ? {
                  duration: dot.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: dot.delay,
                  ease: 'easeInOut',
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
};
