import React, { useState } from 'react';

export interface SubjectCategoryData {
  name: string;
  count: number;
  views: number;
  percent: number;
  color: string;
}

interface SubjectsPieChartProps {
  top3Categories: SubjectCategoryData[];
  allCategoriesData: SubjectCategoryData[];
  totalCategorizedItems: number;
}

export const SubjectsPieChart: React.FC<SubjectsPieChartProps> = ({
  top3Categories,
  allCategoriesData,
  totalCategorizedItems
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Dynamic SVG Pie Chart Slices showing all categories in color
  const renderPieSlices = () => {
    let cumulativeAngle = 0;
    const radius = 70;
    const center = 85;

    // Filter categories that have items
    const activeSlices = allCategoriesData.filter((item) => item.percent > 0 || item.count > 0);
    if (activeSlices.length === 0) return null;

    const totalSliSAAount =
      activeSlices.reduce((sum, item) => sum + item.count, 0) || totalCategorizedItems || 1;

    return activeSlices.map((item) => {
      const sliceAngle = (item.count / totalSliSAAount) * 360;
      const isHovered = hoveredCategory === item.name;

      // Single slice circle handling
      if (sliceAngle >= 359.9 || activeSlices.length === 1) {
        return (
          <circle
            key={item.name}
            cx={center}
            cy={center}
            r={radius}
            fill={item.color}
            className="transition-all duration-200 cursor-pointer origin-center"
            style={{
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              transformOrigin: `${center}px ${center}px`,
              filter: isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' : 'none'
            }}
            onMouseEnter={() => setHoveredCategory(item.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          />
        );
      }

      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + sliceAngle;
      cumulativeAngle = endAngle;

      const startRad = ((startAngle - 90) * Math.PI) / 180;
      const endRad = ((endAngle - 90) * Math.PI) / 180;

      const x1 = center + radius * Math.cos(startRad);
      const y1 = center + radius * Math.sin(startRad);
      const x2 = center + radius * Math.cos(endRad);
      const y2 = center + radius * Math.sin(endRad);

      const largeArcFlag = sliceAngle > 180 ? 1 : 0;
      const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      return (
        <path
          key={item.name}
          d={pathData}
          fill={item.color}
          className="transition-all duration-200 cursor-pointer origin-center"
          style={{
            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            transformOrigin: `${center}px ${center}px`,
            filter: isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))' : 'none'
          }}
          onMouseEnter={() => setHoveredCategory(item.name)}
          onMouseLeave={() => setHoveredCategory(null)}
        />
      );
    });
  };

  return (
    <div className="lg:col-span-3 bg-white border border-neutral-400/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
            Top Subjects Asked
          </h3>
          <span className="text-[10px] text-blue-600 font-semibold">
            {totalCategorizedItems} Items
          </span>
        </div>

        {/* Real Categories Legend: Only Top 3 in this place */}
        <div className="mt-3 space-y-1.5 text-xs text-neutral-700">
          {top3Categories.map((sub) => {
            const isHovered = hoveredCategory === sub.name;
            return (
              <div
                key={sub.name}
                onMouseEnter={() => setHoveredCategory(sub.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`flex items-center justify-between gap-2 cursor-pointer transition-colors ${isHovered ? 'text-neutral-950 font-bold' : ''
                  }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: sub.color }}
                  />
                  <span className="truncate text-xs font-medium">{sub.name}</span>
                </div>
                <span className="text-[10px] font-semibold text-neutral-500 shrink-0">
                  {sub.count} ({sub.percent}%)
                </span>
              </div>
            );
          })}
        </div>

        {/* Other categories shown as color balls */}
        {allCategoriesData.length > 3 && (
          <div className="mt-2.5 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
            <div className="flex items-center gap-1.5 flex-wrap">
              {allCategoriesData.slice(3).map((cat) => {
                const isHovered = hoveredCategory === cat.name;
                return (
                  <div
                    key={cat.name}
                    title={`${cat.name}: ${cat.count} (${cat.percent}%)`}
                    onMouseEnter={() => setHoveredCategory(cat.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={`flex items-center gap-1 cursor-pointer px-1.5 py-0.5 rounded transition-all ${isHovered
                      ? 'bg-neutral-100 font-bold text-neutral-950 scale-105'
                      : 'hover:bg-neutral-50'
                      }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-[9.5px] truncate max-w-16.25">{cat.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic SVG Pie Chart: Shows ALL categories in color in THIS BALL */}
        <div className="mt-4 flex items-center justify-center">
          <div className="relative w-44 h-44">
            <svg viewBox="0 0 180 180" className="w-full h-full">
              {renderPieSlices()}
            </svg>

            {/* Central hover detail */}
            {hoveredCategory &&
              (() => {
                const activeCat = allCategoriesData.find((c) => c.name === hoveredCategory);
                if (!activeCat) return null;
                return (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded shadow-2xs border border-neutral-100"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.96)',
                        color: activeCat.color
                      }}
                    >
                      {activeCat.percent}%
                    </span>
                    <span className="text-[10px] font-bold text-neutral-800 max-w-22.5 truncate mt-1">
                      {activeCat.name}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-medium">
                      {activeCat.count} {activeCat.count === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
    </div>
  );
};
