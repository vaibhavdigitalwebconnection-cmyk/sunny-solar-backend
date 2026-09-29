import React, { useState } from 'react';
import { HOURS, DAYS, getHeatmapColor } from './overviewTypes';

interface TrafficHeatmapProps {
  displayTotalReads: number;
  heatmapMatrix: {
    matrix: number[][];
    countsMatrix: number[][];
  };
}

export const TrafficHeatmap: React.FC<TrafficHeatmapProps> = ({
  displayTotalReads,
  heatmapMatrix
}) => {
  const [hoveredCell, setHoveredCell] = useState<{
    day: string;
    hour: string;
    count: number;
  } | null>(null);

  return (
    <div className="lg:col-span-6 bg-white border border-neutral-400/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
              What Time Are Questions Asked
            </h3>
            <span className="text-[11px] text-neutral-600 font-medium block mt-0.5">
              Reader & Inquiry Volume by Hour
            </span>
          </div>
          {hoveredCell ? (
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
              {hoveredCell.day} {hoveredCell.hour}: {hoveredCell.count} reads
            </span>
          ) : (
            <span className="text-[11px] text-neutral-600 font-mono">
              {displayTotalReads} Total Page Reads
            </span>
          )}
        </div>

        {/* Heatmap Matrix Table */}
        <div className="mt-5 overflow-x-auto pb-2">
          <div className="min-w-125">
            {/* 7 Days Rows (Sat to Sun) */}
            <div className="space-y-1.5">
              {DAYS.map((day, dayIndex) => (
                <div key={day} className="flex items-center">
                  {/* Day Label on Left */}
                  <span className="w-7 text-[11px] font-medium text-neutral-900 select-none text-right pr-2">
                    {day}
                  </span>
                  {/* 24 Hour Cells */}
                  <div
                    className="flex-1 grid gap-0.5"
                    style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
                  >
                    {HOURS.map((hour, hourIndex) => {
                      const weight = heatmapMatrix.matrix[dayIndex][hourIndex] || 0;
                      const cellCount = heatmapMatrix.countsMatrix[dayIndex][hourIndex] || 0;
                      return (
                        <div
                          key={hour}
                          onMouseEnter={() =>
                            setHoveredCell({ day, hour, count: cellCount })
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`h-4 sm:h-5 rounded-xs cursor-pointer transition-all duration-150 hover:scale-125 hover:z-20 hover:ring-2 hover:ring-indigo-500 ${getHeatmapColor(
                            weight
                          )}`}
                          title={`${day} at ${hour}: ${cellCount} reads`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* 24 Hours Column Labels at Bottom */}
            <div className="flex items-start mt-2">
              <span className="w-7" />
              <div
                className="flex-1 grid gap-0.5"
                style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}
              >
                {HOURS.map((hour) => (
                  <div key={hour} className="text-center">
                    <span className="text-[8.5px] text-neutral-900 block whitespace-nowrap [writing-mode:vertical-rl] rotate-180 font-mono select-none">
                      {hour}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
