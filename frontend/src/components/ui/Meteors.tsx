import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import './Meteors.css';

interface MeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const Meteors: React.FC<MeteorsProps> = ({
  number = 15,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 3,
  maxDuration = 8,
  angle = 215,
  className,
}) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const styles = [...new Array(number)].map(() => ({
      '--angle': -angle + 'deg',
      top: '-5%',
      left: `calc(0% + ${Math.floor(Math.random() * width)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + 's',
      animationDuration: Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + 's',
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            'animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-[#2B3CB8] shadow-[0_0_0_1px_#2B3CB840]',
            className
          )}
        >
          {/* Meteor Tail with Solar Gradient */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-16 -translate-y-1/2 bg-linear-to-r from-[#2B3CB8] via-[#ED4F11]/60 to-transparent" />
        </span>
      ))}
    </div>
  );
};

export default Meteors;
