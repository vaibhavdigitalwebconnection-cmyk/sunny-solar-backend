import React, { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

export type LatticeStatus = 'working' | 'done' | 'error';
export type LatticePatternName =
  | 'arrow'
  | 'dots'
  | 'orbit'
  | 'ripple'
  | 'snake'
  | 'spiral'
  | 'sweep'
  | 'spin'
  | 'rain'
  | 'pulse';
export type LatticeGrid = 3 | 4;

export interface LatticePattern {
  cells: (number | null)[];
  loop?: number;
  scale?: number;
  lit?: 0.25 | 0.35 | 0.45 | 0.62;
}

export interface LatticeLoaderProps {
  label?: string;
  doneLabel?: string;
  errorLabel?: string;
  status?: LatticeStatus;
  pattern?: LatticePatternName | LatticePattern;
  grid?: LatticeGrid;
  shape?: 'square' | 'round';
  color?: string;
  doneColor?: string;
  errorColor?: string;
  cellSize?: number;
  gap?: number;
  fontSize?: number;
  step?: number;
  idleOpacity?: number;
  glow?: boolean;
  glowColor?: string;
  showTimer?: boolean;
  elapsed?: number;
  className?: string;
  style?: CSSProperties;
}

type ResolvedPattern = { cells: (number | null)[]; loop: number; scale: number; lit?: number };

const PATTERNS: Record<LatticePatternName, Partial<Record<LatticeGrid, ResolvedPattern>>> = {
  arrow: { 3: { cells: [1, 2, 3, 0, 1, 2, 1, 2, 3], loop: 7.2, scale: 1 } },
  dots: { 3: { cells: [0, 1, 2, 0, 1, 2, 0, 1, 2], loop: 3, scale: 2.4 } },
  ripple: { 3: { cells: [2, 1, 2, 1, 0, 1, 2, 1, 2], loop: 4.8, scale: 1.5 } },
  spiral: { 3: { cells: [0, 1, 2, 7, 8, 3, 6, 5, 4], loop: 9, scale: 1.2, lit: 0.35 } },
  orbit: {
    3: { cells: [0, 1, 2, 7, null, 3, 6, 5, 4], loop: 8, scale: 1.2 },
    4: { cells: [0, 1, 2, 3, 11, null, null, 4, 10, null, null, 5, 9, 8, 7, 6], loop: 6, scale: 1.2, lit: 0.45 }
  },
  snake: {
    3: { cells: [0, 1, 2, 5, 4, 3, 6, 7, 8], loop: 9, scale: 1, lit: 0.35 },
    4: { cells: [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11, 15, 14, 13, 12], loop: 16, scale: 1, lit: 0.25 }
  },
  sweep: { 4: { cells: [0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6], loop: 5, scale: 1, lit: 0.45 } },
  spin: { 4: { cells: [0, 0, 1, 1, 0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 2, 2], loop: 4, scale: 1.6, lit: 0.35 } },
  rain: { 4: { cells: [0, 2, 1, 3, 1, 3, 2, 4, 2, 4, 3, 5, 3, 5, 4, 6], loop: 4, scale: 1.2, lit: 0.35 } },
  pulse: { 4: { cells: [2, 1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 1, 2], loop: 2.4, scale: 2.5, lit: 0.45 } }
};

const DEFAULT_PATTERN: Record<LatticeGrid, LatticePatternName> = { 3: 'orbit', 4: 'sweep' };

const MARKS: Record<LatticeGrid, Record<'done' | 'error', number[]>> = {
  3: { done: [2, 3, 5, 7], error: [0, 2, 4, 6, 8] },
  4: { done: [7, 8, 10, 13], error: [0, 3, 5, 6, 9, 10, 12, 15] }
};

const resolvePattern = (pattern: LatticePatternName | LatticePattern, grid: LatticeGrid): ResolvedPattern => {
  if (typeof pattern === 'string') {
    const named = PATTERNS[pattern];
    return (named && named[grid]) || (PATTERNS[DEFAULT_PATTERN[grid]][grid] as ResolvedPattern);
  }
  const cells = Array.from({ length: grid * grid }, (_, i) => pattern.cells[i] ?? null);
  const max = Math.max(0, ...cells.filter(v => v != null));
  return { cells, loop: pattern.loop ?? max + 4.2, scale: pattern.scale ?? 1, lit: pattern.lit ?? 0.62 };
};

const STYLE = `
@keyframes lattice-on { 0%, 100% { opacity: var(--ll-idle); } 18%, 42% { opacity: var(--ll-peak); } 62% { opacity: var(--ll-idle); } }
@keyframes lattice-on-45 { 0%, 100% { opacity: var(--ll-idle); } 13%, 31% { opacity: var(--ll-peak); } 45% { opacity: var(--ll-idle); } }
@keyframes lattice-on-35 { 0%, 100% { opacity: var(--ll-idle); } 10%, 24% { opacity: var(--ll-peak); } 35% { opacity: var(--ll-idle); } }
@keyframes lattice-on-25 { 0%, 100% { opacity: var(--ll-idle); } 7%, 17% { opacity: var(--ll-peak); } 25% { opacity: var(--ll-idle); } }

.ll-cell {
  height: var(--ll-cell);
  width: var(--ll-cell);
  border-radius: max(1px, calc(var(--ll-cell) * 0.25));
  background: var(--ll-color);
  transition: opacity 200ms ease, background-color 200ms ease;
}
.ll-root[data-shape="round"] .ll-cell {
  border-radius: 9999px;
}
.ll-lit-62 {
  animation: lattice-on var(--ll-cycle) infinite var(--ll-ease-in-out);
}
.ll-lit-45 {
  animation: lattice-on-45 var(--ll-cycle) infinite var(--ll-ease-in-out);
}
.ll-lit-35 {
  animation: lattice-on-35 var(--ll-cycle) infinite var(--ll-ease-in-out);
}
.ll-lit-25 {
  animation: lattice-on-25 var(--ll-cycle) infinite var(--ll-ease-in-out);
}
.ll-root[data-glow] .ll-lit {
  box-shadow: 0 0 calc(var(--ll-cell) * 1.2) calc(var(--ll-cell) * 0.12) var(--ll-glow);
}
.ll-root[data-glow] .ll-mark-cell[data-on] {
  box-shadow: 0 0 calc(var(--ll-cell) * 1.2) calc(var(--ll-cell) * 0.12) var(--ll-mark-glow);
}

@media (prefers-reduced-motion: reduce) {
  .ll-run { --ll-peak: 0.7; }
  .ll-run > span { animation-delay: 0ms !important; animation-duration: 1400ms !important; }
  .ll-mark { transform: none !important; }
  .ll-text { filter: none !important; }
}
`;

const fmt = (ds: number) =>
  ds < 600 ? `${(ds / 10).toFixed(1)}s` : `${Math.floor(ds / 600)}m ${((ds % 600) / 10).toFixed(1)}s`;

const spoken = (ds: number) =>
  ds < 600
    ? `${(ds / 10).toFixed(1)} seconds`
    : `${Math.floor(ds / 600)} minutes ${((ds % 600) / 10).toFixed(1)} seconds`;

export const LatticeLoader: React.FC<LatticeLoaderProps> = ({
  label = 'Thinking',
  doneLabel = 'Done in',
  errorLabel = 'Failed after',
  status = 'working',
  pattern = 'orbit',
  grid = 3,
  shape = 'round',
  color = '#f5f5f5',
  doneColor = '#22c55e',
  errorColor = '#ef4444',
  cellSize = 6,
  gap = 2,
  fontSize = 14,
  step = 90,
  idleOpacity = 0.15,
  glow = false,
  glowColor = '',
  showTimer = true,
  elapsed,
  className = '',
  style
}) => {
  const n: LatticeGrid = grid === 4 ? 4 : 3;
  const pat = resolvePattern(pattern, n);
  const marks = MARKS[n];
  const d = step * pat.scale;
  const cycle = Math.round(pat.loop * d);

  const timerRef = useRef<HTMLSpanElement>(null);
  const dsRef = useRef(0);
  const markRef = useRef<'done' | 'error'>('done');
  const mark = status === 'working' ? markRef.current : status;
  markRef.current = mark;
  const [announce, setAnnounce] = useState(`${label}, in progress`);

  const paint = (ds: number) => {
    dsRef.current = ds;
    if (timerRef.current) timerRef.current.textContent = fmt(ds);
  };

  useLayoutEffect(() => {
    if (elapsed != null) {
      paint(Math.round(elapsed * 10));
      return undefined;
    }
    if (status !== 'working') return undefined;
    const startedAt = performance.now();
    paint(0);
    const id = setInterval(() => paint(Math.floor((performance.now() - startedAt) / 100)), 100);
    return () => clearInterval(id);
  }, [status, elapsed]);

  useEffect(() => {
    if (status === 'working') setAnnounce(`${label}, in progress`);
    else setAnnounce(`${status === 'done' ? doneLabel : errorLabel}${showTimer ? ` ${spoken(dsRef.current)}` : ''}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const litKey = Math.round((pat.lit ?? 0.62) * 100);
  const litClass = `ll-lit-${litKey in { 62: 1, 45: 1, 35: 1, 25: 1 } ? litKey : 62}`;

  return (
    <span
      role="status"
      className={`ll-root group relative inline-flex items-center leading-none font-[inherit] gap-[calc(var(--ll-font)*0.625)] [font-size:var(--ll-font)]${className ? ` ${className}` : ''}`}
      data-status={status}
      data-shape={shape}
      data-glow={glow ? '' : undefined}
      style={
        {
          '--ll-n': n,
          '--ll-cell': `${cellSize}px`,
          '--ll-gap': `${gap}px`,
          '--ll-font': `${fontSize}px`,
          '--ll-color': color,
          '--ll-mark': status === 'error' ? errorColor : doneColor,
          '--ll-idle': idleOpacity,
          '--ll-glow': glowColor || color,
          '--ll-mark-glow': glowColor || (status === 'error' ? errorColor : doneColor),
          '--ll-cycle': `${cycle}ms`,
          '--ll-peak': 1,
          '--ll-ease-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
          '--ll-ease-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
          ...style
        } as CSSProperties
      }
    >
      <style>{STYLE}</style>
      <span className="grid shrink-0" aria-hidden="true">
        <span
          className="ll-run [grid-area:1/1] grid grid-cols-[repeat(var(--ll-n),var(--ll-cell))] gap-(--ll-gap) transition-opacity duration-200"
          style={{
            opacity: status === 'done' || status === 'error' ? 0 : 1,
            pointerEvents: status === 'done' || status === 'error' ? 'none' : undefined
          }}
        >
          {pat.cells.map((unit, i) => (
            <span
              key={i}
              className={`ll-cell ${unit != null ? `ll-lit ${litClass}` : ''}`}
              data-hole={unit == null ? '' : undefined}
              data-lit={pat.lit && pat.lit !== 0.62 ? Math.round(pat.lit * 100) : undefined}
              style={{
                opacity: unit == null ? 'calc(var(--ll-idle) * 0.47)' : undefined,
                animationDelay: unit == null ? undefined : `${Math.round(unit * d)}ms`,
                animationPlayState: status === 'done' || status === 'error' ? 'paused' : 'running'
              }}
            />
          ))}
        </span>
        <span
          className="ll-mark [grid-area:1/1] grid grid-cols-[repeat(var(--ll-n),var(--ll-cell))] gap-(--ll-gap) origin-center transition-all duration-200"
          style={{
            opacity: status === 'done' || status === 'error' ? 1 : 0,
            transform: status === 'done' || status === 'error' ? 'none' : 'scale(0.9)'
          }}
        >
          {pat.cells.map((_, i) => {
            const isOn = marks[mark]?.includes(i);
            return (
              <span
                key={i}
                className="ll-cell ll-mark-cell"
                data-on={isOn ? '' : undefined}
                style={{
                  background: isOn ? 'var(--ll-mark)' : 'var(--ll-color)',
                  opacity: isOn ? 'var(--ll-peak)' : 'var(--ll-idle)'
                }}
              />
            );
          })}
        </span>
      </span>

      <span className="relative inline-block font-medium" aria-hidden="true">
        <span
          className="ll-text whitespace-nowrap transition-all duration-200"
          style={{
            display: status === 'working' ? 'inline-block' : 'none',
            opacity: status === 'working' ? 1 : 0,
            filter: status === 'working' ? 'blur(0)' : 'blur(2px)'
          }}
        >
          {label}
        </span>
        <span
          className="ll-text whitespace-nowrap transition-all duration-200"
          style={{
            display: status === 'done' ? 'inline-block' : 'none',
            opacity: status === 'done' ? 1 : 0,
            filter: status === 'done' ? 'blur(0)' : 'blur(2px)'
          }}
        >
          {doneLabel}
        </span>
        <span
          className="ll-text whitespace-nowrap transition-all duration-200"
          style={{
            display: status === 'error' ? 'inline-block' : 'none',
            opacity: status === 'error' ? 1 : 0,
            filter: status === 'error' ? 'blur(0)' : 'blur(2px)'
          }}
        >
          {errorLabel}
        </span>
      </span>

      {showTimer ? (
        <span
          ref={timerRef}
          className="font-mono tabular-nums opacity-60 text-[calc(var(--ll-font)*0.875)]"
          aria-hidden="true"
        >
          0.0s
        </span>
      ) : null}
      <span className="sr-only">{announce}</span>
    </span>
  );
};

export default LatticeLoader;
