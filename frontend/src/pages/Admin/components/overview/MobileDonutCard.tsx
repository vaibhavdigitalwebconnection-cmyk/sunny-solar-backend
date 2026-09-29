import React, { useMemo } from 'react';
import { MobileDonutCategory } from './overviewTypes';

interface MobileDonutProps {
  totalNumber: string;
  totalLabel: string;
  categories: MobileDonutCategory[];
}

export const MobileDonutCard: React.FC<MobileDonutProps> = ({
  totalNumber,
  totalLabel,
  categories
}) => {
  const radius = 54;
  const strokeWidth = 24;
  const center = 75;
  const circumference = 2 * Math.PI * radius;

  // Process categories dynamically from real database data
  const activeCategories = useMemo(() => {
    if (!categories || categories.length === 0) {
      return [
        { name: 'Solar Basics', percent: 35, color: '#4379ee', count: 0 },
        { name: 'Technical', percent: 25, color: '#52525b', count: 0 },
        { name: 'Buying Solar', percent: 20, color: '#22c55e', count: 0 },
        { name: 'Batteries', percent: 12, color: '#fb7185', count: 0 },
        { name: 'Inverters', percent: 8, color: '#38bdf8', count: 0 }
      ];
    }

    // Sort descending by item count, take top 6 to fit cleanly in mobile legend
    const sorted = [...categories].sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
    const topCategories = sorted.slice(0, 6);
    const totalCount = topCategories.reduce((acc, c) => acc + (c.count ?? 0), 0);

    if (totalCount === 0) {
      const sliceSize = Math.round(100 / topCategories.length);
      return topCategories.map((c) => ({
        ...c,
        percent: c.percent && c.percent > 0 ? c.percent : sliceSize
      }));
    }

    let sum = 0;
    const computed = topCategories.map((c) => {
      const p = Math.max(4, Math.round(((c.count ?? 0) / totalCount) * 100));
      sum += p;
      return { ...c, percent: p };
    });
    if (computed.length > 0) {
      computed[0].percent += (100 - sum);
    }
    return computed;
  }, [categories]);

  let cumulativeAngle = 0;

  return (
    <div className="bg-white rounded-xl border border-neutral-400 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3">
      {/* Left: Donut Chart with Center Text */}
      <div className="relative w-38 h-38 sm:w-42 sm:h-42 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
          {activeCategories.map((cat, idx) => {
            const strokeDasharray = `${(cat.percent / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativeAngle;
            cumulativeAngle += (cat.percent / 100) * circumference;

            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={cat.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span className="text-sm sm:text-base font-black text-neutral-900 leading-tight">
            {totalNumber}
          </span>
          <span className="text-[10px] font-semibold text-neutral-500 mt-0.5">
            {totalLabel}
          </span>
        </div>
      </div>

      {/* Right: Legend showing real categories */}
      <div className="flex-1 min-w-0 space-y-1.5 pl-1">
        {activeCategories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-3.5 h-3.5 rounded-[3px] shrink-0 shadow-2xs"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-xs font-bold text-neutral-800 truncate">
                {cat.name}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-neutral-500 shrink-0">
              {(cat.count ?? 0) > 0 ? `${cat.count}` : `${cat.percent}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
