import React, { type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<'span'> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = '#2B3CB8',
  colorTo = '#0284C7',
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          '--bg-size': `${speed * 300}%`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties
      }
      className={cn(
        'inline bg-linear-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent animate-gradient',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
