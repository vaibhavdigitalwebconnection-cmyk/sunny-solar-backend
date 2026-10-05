import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface AnimatedGridPatternProps extends ComponentPropsWithoutRef<'svg'> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

type Square = {
  id: number;
  pos: [number, number];
  iteration: number;
};

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 35,
  className,
  maxOpacity = 0.4,
  duration = 3.5,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [squares, setSquares] = useState<Array<Square>>(() => {
    return Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      pos: [i % 15, Math.floor(i / 15)],
      iteration: 0,
    }));
  });

  const dimensionsRef = useRef<{ w: number; h: number }>({ w: 800, h: 600 });

  const getPos = useCallback(
    (w: number, h: number): [number, number] => {
      return [
        Math.floor((Math.random() * (w || 800)) / width),
        Math.floor((Math.random() * (h || 600)) / height),
      ];
    },
    [height, width]
  );

  const updateSquarePosition = useCallback(
    (squareId: number) => {
      const { w, h } = dimensionsRef.current;

      setSquares((currentSquares) => {
        const current = currentSquares[squareId];
        if (!current || current.id !== squareId) return currentSquares;

        const nextSquares = currentSquares.slice();
        nextSquares[squareId] = {
          ...current,
          pos: getPos(w, h),
          iteration: current.iteration + 1,
        };

        return nextSquares;
      });
    },
    [getPos]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          dimensionsRef.current = { w, h };
          setSquares((prev) =>
            prev.map((sq) => ({
              ...sq,
              pos: [
                Math.floor((Math.random() * w) / width),
                Math.floor((Math.random() * h) / height),
              ],
            }))
          );
        }
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [width, height]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-blue-500/10 stroke-blue-200/40',
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [squareX, squareY], id: sqId, iteration }, index) => (
          <m.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: 'reverse',
              repeatDelay,
            }}
            onAnimationComplete={() => updateSquarePosition(sqId)}
            key={`${sqId}-${iteration}`}
            width={width - 1}
            height={height - 1}
            x={squareX * width + 1}
            y={squareY * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}

export default AnimatedGridPattern;
