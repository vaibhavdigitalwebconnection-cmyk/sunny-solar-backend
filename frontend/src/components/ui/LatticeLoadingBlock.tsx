import React from 'react';
import LatticeLoader, { type LatticeLoaderProps } from './LatticeLoader';

interface LatticeLoadingBlockProps extends Partial<LatticeLoaderProps> {
  className?: string;
  containerClassName?: string;
}

export const LatticeLoadingBlock: React.FC<LatticeLoadingBlockProps> = ({
  label = 'Thinking',
  doneLabel = 'Done in',
  errorLabel = 'Failed after',
  status = 'working',
  pattern = 'orbit',
  grid = 3,
  shape = 'round',
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
  color = '#f5f5f5',
  className = '',
  containerClassName = 'py-16 flex flex-col items-center justify-center',
  ...rest
}) => {
  return (
    <div className={containerClassName}>
      <div className={`inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-slate-900/95 text-slate-100 shadow-xl shadow-slate-900/10 border border-slate-800 backdrop-blur-md transition-all ${className}`}>
        <LatticeLoader
          status={status}
          label={label}
          doneLabel={doneLabel}
          errorLabel={errorLabel}
          pattern={pattern}
          grid={grid}
          shape={shape}
          doneColor={doneColor}
          errorColor={errorColor}
          cellSize={cellSize}
          gap={gap}
          fontSize={fontSize}
          step={step}
          idleOpacity={idleOpacity}
          glow={glow}
          glowColor={glowColor}
          showTimer={showTimer}
          color={color}
          {...rest}
        />
      </div>
    </div>
  );
};

export default LatticeLoadingBlock;
