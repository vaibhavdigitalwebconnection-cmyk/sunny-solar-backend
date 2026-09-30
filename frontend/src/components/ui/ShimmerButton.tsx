import React, { type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import { cn } from '../../lib/utils';

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<'button'> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.08em',
      shimmerDuration = '2.5s',
      borderRadius = '16px',
      background = 'linear-gradient(135deg, #2B3CB8 0%, #1D2984 100%)',
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-blue-400/30 px-6 py-3.5 whitespace-nowrap text-white [background:var(--bg)] shadow-lg shadow-[#2B3CB8]/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#2B3CB8]/40 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {/* Spark container */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 overflow-visible [border-radius:var(--radius)]"
        >
          {/* Animated beam spark rotating */}
          <div
            className="absolute -inset-full w-[300%] h-[300%] animate-spin"
            style={{
              animationDuration: shimmerDuration,
              background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--shimmer-color) 45deg, transparent 90deg)`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Highlight inner inset */}
        <div
          aria-hidden="true"
          className="absolute inset-px -z-20 rounded-[calc(var(--radius)-1px)] [background:var(--bg)]"
        />

        {/* Shimmer light sweep on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 size-full rounded-[inherit] px-4 py-1.5 shadow-[inset_0_-4px_10px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:shadow-[inset_0_-6px_14px_rgba(255,255,255,0.35)]"
        />

        <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-wide">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
export default ShimmerButton;
