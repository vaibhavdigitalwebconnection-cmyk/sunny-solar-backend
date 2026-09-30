import React, { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = 'rgba(43, 60, 184, 0.12)',
  gradientOpacity = 0.8,
  gradientFrom = 'rgba(43, 60, 184, 0.35)',
  gradientTo = 'rgba(111, 142, 231, 0.15)',
  ...props
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const cardRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl border border-blue-100/80 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-500/10',
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{
        background: useMotionTemplate`
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            transparent 100%
          )
        `,
      }}
      {...(props as any)}
    >
      <div className="absolute inset-[1px] -z-10 rounded-[inherit] bg-white/95 backdrop-blur-xs" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor},
              transparent 80%
            )
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative z-10 size-full">{children}</div>
    </motion.div>
  );
}

export default MagicCard;
