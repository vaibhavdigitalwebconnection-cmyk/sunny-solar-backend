import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cn } from "../../lib/utils";

export interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  circleColor?: string;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 260,
  mainCircleOpacity = 0.32,
  numCircles = 8,
  circleColor = "#2B3CB8",
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none overflow-hidden",
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes magicui-ripple {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.92);
          }
        }
      `}</style>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 95;
        const opacity = Math.max(0.04, mainCircleOpacity - i * 0.035);
        const animationDelay = `${i * 0.16}s`;

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animation: "magicui-ripple 4.5s ease-in-out infinite",
                animationDelay,
                borderStyle: i % 2 === 0 ? "solid" : "dashed",
                borderWidth: "1.5px",
                borderColor: circleColor,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                boxShadow: `0 0 ${24 + i * 12}px ${circleColor}20`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
export default Ripple;
