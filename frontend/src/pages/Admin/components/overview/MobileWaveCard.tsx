import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

export interface MobileWaveCardProps {
  cardBorderClass: string;
  badgeBgClass: string;
  badgeTextColor: string;
  badgeLabel: string;
  arrowColorClass: string;
  title: string;
  subtitle: string;
  topValue: string;
  bottomValue: string;
  valueColorClass: string;
  waveGradientId: string;
  gradientColors: [string, string];
  dateStr: string;
  onClick?: () => void;
}

export const MobileWaveCard: React.FC<MobileWaveCardProps> = ({
  cardBorderClass,
  badgeBgClass,
  badgeTextColor,
  badgeLabel,
  arrowColorClass,
  title,
  subtitle,
  topValue,
  bottomValue,
  valueColorClass,
  waveGradientId,
  gradientColors,
  dateStr,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl ${cardBorderClass} shadow-xs flex flex-col justify-between overflow-hidden relative min-h-48.75 sm:min-h-55 ${
        onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''
      }`}
    >
      {/* Top Header */}
      <div className="p-3.5 sm:p-4 pb-0 flex items-start justify-between">
        {/* Circular Icon Badge */}
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${badgeBgClass}`}
        >
          <div
            className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md border-1.5 flex items-center justify-center font-black text-[10px] tracking-tight leading-none ${badgeTextColor}`}
          >
            {badgeLabel}
          </div>
        </div>

        {/* Diagonal Arrow Icon */}
        <ArrowUpRight className={`w-6 h-6 stroke-[2.5] ${arrowColorClass}`} />
      </div>

      {/* Middle Content */}
      <div className="px-3.5 sm:px-4 pt-3 pb-1 flex items-baseline justify-between gap-1 z-10">
        <div className="min-w-0">
          <div className="text-xl sm:text-2xl font-black text-neutral-900 leading-none tracking-tight truncate">
            {title}
          </div>
          <div className="text-[11px] sm:text-xs text-neutral-500 font-normal mt-1 block truncate">
            {subtitle}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className={`text-xl sm:text-2xl font-black tracking-tight leading-none ${valueColorClass}`}>
            {topValue}
          </div>
          <div className={`text-sm sm:text-base font-bold leading-tight mt-0.5 ${valueColorClass}`}>
            {bottomValue}
          </div>
        </div>
      </div>

      {/* Bottom Wave Container */}
      <div className="relative mt-2">
        <svg
          viewBox="0 0 200 90"
          preserveAspectRatio="none"
          className="w-full h-20 sm:h-22 block"
        >
          <defs>
            <linearGradient id={waveGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColors[0]} stopOpacity="0.9" />
              <stop offset="100%" stopColor={gradientColors[1]} stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M 0,90 L 0,55 C 20,55 35,68 55,68 C 75,68 85,28 110,28 C 130,28 145,62 165,62 C 185,62 195,35 200,22 L 200,90 Z"
            fill={`url(#${waveGradientId})`}
          />
        </svg>

        {/* Date Tag at bottom */}
        <div className="absolute bottom-2.5 left-3 sm:left-4 flex items-center gap-1.5 text-xs font-semibold text-neutral-900 pointer-events-none">
          <Calendar className="w-4 h-4 text-neutral-900 stroke-[2.2]" />
          <span>{dateStr}</span>
        </div>
      </div>
    </div>
  );
};
