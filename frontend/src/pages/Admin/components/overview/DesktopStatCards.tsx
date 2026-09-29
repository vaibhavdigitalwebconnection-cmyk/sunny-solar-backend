import React from 'react';
import { Clock, ThumbsDown, Folder, BookOpen } from 'lucide-react';
import { AdminTab } from '../../types';
import { SparklineHistogram } from './SparklineHistogram';

interface DesktopStatCardsProps {
  displayTotalReads: number;
  draftPercentValue: string;
  realActiveBlogCount: number;
  realActiveKnowledgeCount: number;
  startDateStr: string;
  endDateStr: string;
  sparklineBars1: number[];
  sparklineBars2: number[];
  sparklineBars3: number[];
  sparklineBars4: number[];
  setActiveTab: (tab: AdminTab) => void;
}

export const DesktopStatCards: React.FC<DesktopStatCardsProps> = ({
  displayTotalReads,
  draftPercentValue,
  realActiveBlogCount,
  realActiveKnowledgeCount,
  startDateStr,
  endDateStr,
  sparklineBars1,
  sparklineBars2,
  sparklineBars3,
  sparklineBars4,
  setActiveTab
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
      {/* Card 1: Total Organic Reads (Real Reads) */}
      <div className="bg-white border border-neutral-400/90 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl sm:text-[26px] font-extrabold text-neutral-900 tracking-tight leading-none">
              {displayTotalReads.toLocaleString()}
            </div>
            <span className="text-xs text-neutral-500 font-normal mt-1.5 block">
              Total Reads
            </span>
          </div>
          {/* Green clock badge */}
          <div className="w-8.5 h-8.5 rounded-full border border-emerald-400 text-emerald-500 flex items-center justify-center bg-white shrink-0">
            <Clock className="w-4.5 h-4.5" />
          </div>
        </div>
        {/* Sparkline Histogram with Real 30-Day Window */}
        <SparklineHistogram bars={sparklineBars1} startDate={startDateStr} endDate={endDateStr} />
      </div>

      {/* Card 2: % Content in Draft (Real Draft Ratio) */}
      <div className="bg-white border border-neutral-400/90 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl sm:text-[26px] font-extrabold text-neutral-900 tracking-tight leading-none">
              {draftPercentValue}%
            </div>
            <span className="text-xs text-neutral-500 font-normal mt-1.5 block">
              % Content in Draft
            </span>
          </div>
          {/* Red thumbs down badge */}
          <div className="w-8.5 h-8.5 flex items-center justify-center text-rose-500 shrink-0">
            <ThumbsDown className="w-5 h-5" />
          </div>
        </div>
        {/* Sparkline Histogram with Real Draft Spikes */}
        <SparklineHistogram bars={sparklineBars2} startDate={startDateStr} endDate={endDateStr} />
      </div>

      {/* Card 3: Active Blog Articles (Real Blog Count) */}
      <div
        onClick={() => setActiveTab('articles')}
        className="bg-white border border-neutral-400/90 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl sm:text-[26px] font-extrabold text-neutral-900 tracking-tight leading-none">
              {realActiveBlogCount}
            </div>
            <span className="text-xs text-neutral-500 font-normal mt-1.5 block">
              Blog
            </span>
          </div>
          {/* Blue articles icon */}
          <div className="w-8.5 h-8.5 flex items-center justify-center text-blue-600 shrink-0">
            <Folder className="w-5 h-5" />
          </div>
        </div>
        {/* Dense Sparkline Histogram */}
        <SparklineHistogram bars={sparklineBars3} startDate={startDateStr} endDate={endDateStr} />
      </div>

      {/* Card 4: Technical Knowledge Guides (Real Guides Count) */}
      <div
        onClick={() => setActiveTab('knowledge')}
        className="bg-white border border-neutral-400/90 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-2xl sm:text-[26px] font-extrabold text-neutral-900 tracking-tight leading-none">
              {realActiveKnowledgeCount}
            </div>
            <span className="text-xs text-neutral-500 font-normal mt-1.5 block">
              Knowledge Hub
            </span>
          </div>
          {/* Dark technical guide icon */}
          <div className="w-8.5 h-8.5 flex items-center justify-center text-neutral-900 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>
        {/* Spike Sparkline Histogram */}
        <SparklineHistogram bars={sparklineBars4} startDate={startDateStr} endDate={endDateStr} />
      </div>
    </div>
  );
};
