import React from 'react';
import { cn } from '../../lib/utils';

export interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export const PulsatingButton = React.forwardRef<
  HTMLButtonElement,
  PulsatingButtonProps
>(
  (
    {
      className,
      children,
      pulseColor = 'rgba(43, 60, 184, 0.45)',
      duration = '2s',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative isolate inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#2B3CB8] px-6 py-3.5 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]',
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] animate-ping opacity-40"
          style={{
            backgroundColor: pulseColor,
            animationDuration: duration,
          }}
        />
      </button>
    );
  }
);

PulsatingButton.displayName = 'PulsatingButton';

export default PulsatingButton;
