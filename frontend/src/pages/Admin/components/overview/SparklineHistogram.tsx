import React from 'react';

interface SparklineHistogramProps {
  bars: number[];
  startDate: string;
  endDate: string;
}

export const SparklineHistogram: React.FC<SparklineHistogramProps> = ({
  bars,
  startDate,
  endDate
}) => {
  return (
    <div className="mt-4">
      <div className="h-13 flex items-end gap-0.5 overflow-hidden pt-1">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-[#5046e5] rounded-t-[1.5px] transition-all duration-300 hover:brightness-125 min-w-[2.5px]"
            style={{
              height: `${Math.max(height, 0)}%`,
              opacity: height === 0 ? 0 : 1
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono mt-1.5 select-none">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
    </div>
  );
};
