import React from 'react';
import { cn } from '../../lib/utils';

export interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
}

export function ShineBorder({
  borderWidth = 1.5,
  duration = 10,
  shineColor = ['#2B3CB8', '#6F8EE7', '#2B3CB8'],
  className,
  style,
  ...props
}: ShineBorderProps) {
  const gradientColor = Array.isArray(shineColor) ? shineColor.join(', ') : shineColor;

  return (
    <div
      aria-hidden="true"
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          backgroundImage: `radial-gradient(transparent, transparent, ${gradientColor}, transparent, transparent)`,
          backgroundSize: '300% 300%',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 'var(--border-width)',
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] animate-shine',
        className
      )}
      {...props}
    />
  );
}

export default ShineBorder;
