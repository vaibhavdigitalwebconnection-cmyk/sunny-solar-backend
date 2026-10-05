import React from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  className,
  children,
  reverse = false,
  duration = 24,
  radius = 120,
  path = true,
  iconSize = 36,
  speed = 1,
  ...props
}) => {
  const calculatedDuration = duration / speed;
  const childCount = React.Children.count(children);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-blue-200/60 stroke-1 stroke-dashed dark:stroke-blue-900/40"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const initialOffset = (360 / childCount) * index;
        return (
          <m.div
            key={index}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: iconSize,
              height: iconSize,
              marginTop: -iconSize / 2,
              marginLeft: -iconSize / 2,
            }}
            initial={{ rotate: initialOffset }}
            animate={{
              rotate: reverse ? [initialOffset - 360, initialOffset] : [initialOffset, initialOffset + 360],
            }}
            transition={{
              repeat: Infinity,
              duration: calculatedDuration,
              ease: 'linear',
            }}
            className={cn('flex items-center justify-center', className)}
            {...(props as any)}
          >
            <div
              style={{
                transform: `translateX(${radius}px)`,
              }}
            >
              {/* Counter-rotate the child element so icons stay upright */}
              <m.div
                initial={{ rotate: -initialOffset }}
                animate={{
                  rotate: reverse ? [-initialOffset + 360, -initialOffset] : [-initialOffset, -initialOffset - 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: calculatedDuration,
                  ease: 'linear',
                }}
                className="pointer-events-auto flex items-center justify-center"
              >
                {child}
              </m.div>
            </div>
          </m.div>
        );
      })}
    </div>
  );
};

export default OrbitingCircles;
