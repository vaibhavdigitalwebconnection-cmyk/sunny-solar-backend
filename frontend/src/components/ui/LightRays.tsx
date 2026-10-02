import React, { useMemo, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
}

interface LightRay {
  id: string;
  left: number;
  rotate: number;
  width: number;
  swing: number;
  delay: number;
  duration: number;
  intensity: number;
}

const createRays = (count: number, cycle: number): LightRay[] => {
  if (count <= 0) return [];

  return Array.from({ length: count }, (_, index) => {
    const left = 8 + Math.random() * 84;
    const rotate = -28 + Math.random() * 56;
    const width = 140 + Math.random() * 180;
    const swing = 0.8 + Math.random() * 1.8;
    const delay = Math.random() * cycle;
    const duration = cycle * (0.75 + Math.random() * 0.5);
    const intensity = 0.5 + Math.random() * 0.5;

    return {
      id: `${index}-${Math.round(left * 10)}`,
      left,
      rotate,
      width,
      swing,
      delay,
      duration,
      intensity,
    };
  });
};

const Ray: React.FC<LightRay> = ({
  left,
  rotate,
  width,
  swing,
  delay,
  duration,
  intensity,
}) => {
  return (
    <motion.div
      className="pointer-events-none absolute top-[-15%] origin-top -translate-x-1/2 rounded-full opacity-0 mix-blend-screen"
      style={
        {
          left: `${left}%`,
          width: `${width}px`,
          height: 'var(--light-rays-length, 75vh)',
          filter: 'blur(var(--light-rays-blur, 36px))',
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--light-rays-color, rgba(245, 158, 11, 0.25)) 75%, transparent), transparent)',
        } as CSSProperties
      }
      initial={{ rotate }}
      animate={{
        opacity: [0, intensity, 0],
        rotate: [rotate - swing, rotate + swing, rotate - swing],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
        repeatDelay: duration * 0.1,
      }}
    />
  );
};

export const LightRays: React.FC<LightRaysProps> = ({
  className,
  style,
  count = 8,
  color = 'rgba(245, 158, 11, 0.22)',
  blur = 38,
  speed = 12,
  length = '85vh',
  ...props
}) => {
  const cycleDuration = Math.max(speed, 0.1);
  const rays = useMemo(() => createRays(count, cycleDuration), [count, cycleDuration]);

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]',
        className
      )}
      style={
        {
          '--light-rays-color': color,
          '--light-rays-blur': `${blur}px`,
          '--light-rays-length': length,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={
            {
              background:
                'radial-gradient(circle at 25% 12%, color-mix(in srgb, var(--light-rays-color) 45%, transparent), transparent 70%)',
            } as CSSProperties
          }
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={
            {
              background:
                'radial-gradient(circle at 75% 10%, color-mix(in srgb, var(--light-rays-color) 35%, transparent), transparent 75%)',
            } as CSSProperties
          }
        />
        {rays.map((ray) => (
          <Ray key={ray.id} {...ray} />
        ))}
      </div>
    </div>
  );
};

export default LightRays;
