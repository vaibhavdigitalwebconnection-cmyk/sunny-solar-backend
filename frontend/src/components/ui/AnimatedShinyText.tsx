import React, { type ComponentPropsWithoutRef, type FC } from 'react';
import { cn } from '../../lib/utils';
import './AnimatedShinyText.css';

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        'animate-shiny-text inline-block font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
