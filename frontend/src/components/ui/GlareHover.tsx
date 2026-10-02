import type { ComponentProps, CSSProperties } from 'react';
import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';

export interface GlareHoverProps extends ComponentProps<'div'> {
  width?: string;
  height?: string;
  background?: string;
  color?: `#${string}`;
  opacity?: number;
  angle?: number;
  size?: number;
  duration?: number;
  playOnce?: boolean;
}

type Color = `#${string}`;
type RGBA = `rgba(${number},${number},${number},${number})`;

function parseHEX(color: Color, opacity: number): RGBA | Color {
  const hex = color.replace('#', '');
  const parse = (h: string) => Number.parseInt(h, 16);
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `rgba(${parse(hex.slice(0, 2))},${parse(hex.slice(2, 4))},${parse(hex.slice(4, 6))},${opacity})`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    return `rgba(${parse(hex[0] + hex[0])},${parse(hex[1] + hex[1])},${parse(hex[2] + hex[2])},${opacity})`;
  }
  return color;
}

export function GlareHover({
  background = 'transparent',
  children,
  color = '#ffffff',
  opacity = 0.4,
  angle = -45,
  size = 250,
  duration = 700,
  playOnce = false,
  className,
  style,
  width,
  height,
  ...props
}: GlareHoverProps) {
  const rgba = useMemo(() => parseHEX(color, opacity), [color, opacity]);

  const cssVars = {
    '--gh-angle': `${angle}deg`,
    '--gh-duration': `${duration}ms`,
    '--gh-size': `${size}%`,
    '--gh-rgba': rgba,
    background,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  } as CSSProperties;

  return (
    <div
      {...props}
      className={cn(
        'relative overflow-hidden',
        // BEFORE ELEMENT (GLARE LAYER)
        "before:pointer-events-none before:absolute before:inset-0 before:z-20 before:bg-no-repeat before:content-['']",
        // GRADIENT
        'before:bg-[linear-gradient(var(--gh-angle),transparent_40%,var(--gh-rgba)_50%,transparent_60%)]',
        // SIZE + POSITION
        'before:bg-size-[var(--gh-size)_var(--gh-size),100%_100%]',
        'before:bg-position-[-120%_-120%,0_0]',
        // TRANSITION
        !playOnce &&
          'before:transition-[background-position] before:duration-(--gh-duration) before:ease-out',
        playOnce &&
          'before:transition-none hover:before:transition-[background-position] hover:before:duration-(--gh-duration)',
        // HOVER EFFECT
        'hover:before:bg-position-[140%_140%,0_0]',
        className
      )}
      style={cssVars}
    >
      {children}
    </div>
  );
}

export default GlareHover;
