import React from 'react';
import { AdminTab } from '../../types';
import { MobileDonutCard } from './MobileDonutCard';
import { MobileWaveCard } from './MobileWaveCard';
import { CountryStatItem, MobileDonutCategory } from './overviewTypes';

interface MobileOverviewProps {
  displayTotalReads: number;
  realActiveBlogCount: number;
  realActiveKnowledgeCount: number;
  draftPercentValue: string;
  totalDraftCount: number;
  allCategoriesData: MobileDonutCategory[];
  realCountriesData: CountryStatItem[];
  todayFormattedDate: string;
  setActiveTab: (tab: AdminTab) => void;
}

export const MobileOverview: React.FC<MobileOverviewProps> = ({
  displayTotalReads,
  realActiveBlogCount,
  realActiveKnowledgeCount,
  draftPercentValue,
  totalDraftCount,
  allCategoriesData,
  realCountriesData,
  todayFormattedDate,
  setActiveTab
}) => {
  return (
    <div className="block lg:hidden space-y-3.5">
      {/* 1. Mobile Donut Card */}
      <MobileDonutCard
        totalNumber={
          displayTotalReads >= 1000000
            ? `${(displayTotalReads / 1000000).toFixed(2)} M.`
            : displayTotalReads >= 1000
              ? `${(displayTotalReads / 1000).toFixed(1)} K.`
              : displayTotalReads > 0
                ? `${displayTotalReads.toLocaleString()}`
                : `${realActiveBlogCount + realActiveKnowledgeCount}`
        }
        totalLabel={displayTotalReads > 0 ? 'Total Reads' : 'Total Articles'}
        categories={allCategoriesData}
      />

      {/* 2. 2-Column Grid of Wave Cards */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        {/* Card 1: Blog Articles (Dark Grey) */}
        <MobileWaveCard
          cardBorderClass="border-2 border-[#52525b]"
          badgeBgClass="bg-[#f4f4f5]"
          badgeTextColor="border-[#52525b] text-[#52525b]"
          badgeLabel="BLOG"
          arrowColorClass="text-[#27272a]"
          title="Blog Posts"
          subtitle="Active Articles"
          topValue={realActiveBlogCount.toString()}
          bottomValue={realActiveBlogCount === 1 ? 'Article' : 'Articles'}
          valueColorClass="text-[#18181b]"
          waveGradientId="mobileWaveBlog"
          gradientColors={['#3f3f46', '#a1a1aa']}
          dateStr={todayFormattedDate}
          onClick={() => setActiveTab('articles')}
        />

        {/* Card 2: Technical Knowledge Guides (Green) */}
        <MobileWaveCard
          cardBorderClass="border-2 border-[#22c55e]"
          badgeBgClass="bg-[#f0fdf4]"
          badgeTextColor="border-[#16a34a] text-[#16a34a]"
          badgeLabel="GUIDE"
          arrowColorClass="text-[#16a34a]"
          title="Knowledge"
          subtitle="Tech Guides"
          topValue={realActiveKnowledgeCount.toString()}
          bottomValue={realActiveKnowledgeCount === 1 ? 'Guide' : 'Guides'}
          valueColorClass="text-[#16a34a]"
          waveGradientId="mobileWaveKnowledge"
          gradientColors={['#22c55e', '#86efac']}
          dateStr={todayFormattedDate}
          onClick={() => setActiveTab('knowledge')}
        />

        {/* Card 3: Total Reads (Blue) */}
        <MobileWaveCard
          cardBorderClass="border-2 border-[#4379ee]"
          badgeBgClass="bg-[#eef4ff]"
          badgeTextColor="border-[#4379ee] text-[#4379ee]"
          badgeLabel="READS"
          arrowColorClass="text-[#4379ee]"
          title="Total Reads"
          subtitle="Organic Traffic"
          topValue={
            displayTotalReads >= 1000000
              ? (displayTotalReads / 1000000).toFixed(2)
              : displayTotalReads >= 1000
                ? (displayTotalReads / 1000).toFixed(1)
                : displayTotalReads.toLocaleString()
          }
          bottomValue={
            displayTotalReads >= 1000000
              ? 'Millions'
              : displayTotalReads >= 1000
                ? 'Thousand'
                : 'Reads'
          }
          valueColorClass="text-[#4379ee]"
          waveGradientId="mobileWaveReads"
          gradientColors={['#4379ee', '#93bbfd']}
          dateStr={todayFormattedDate}
          onClick={() => setActiveTab('overview')}
        />

        {/* Card 4: Staging / Draft Content (Orange / Amber) */}
        <MobileWaveCard
          cardBorderClass="border-2 border-[#fb923c]"
          badgeBgClass="bg-[#fff7ed]"
          badgeTextColor="border-[#ea580c] text-[#ea580c]"
          badgeLabel="DRAFT"
          arrowColorClass="text-[#ea580c]"
          title="Draft %"
          subtitle="In Review"
          topValue={`${draftPercentValue}%`}
          bottomValue={`${totalDraftCount} Pending`}
          valueColorClass="text-[#ea580c]"
          waveGradientId="mobileWaveDraft"
          gradientColors={['#fb923c', '#fed7aa']}
          dateStr={todayFormattedDate}
        />
      </div>

      {/* 3. Mobile Live Visitor Regions Card */}
      <div className="bg-white rounded-xl border border-neutral-400 p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-400">
          <h4 className="text-xs font-bold text-neutral-900 tracking-tight">
            Live Visitor Regions
          </h4>
          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
            Live Traffic
          </span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          {realCountriesData.slice(0, 4).map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-neutral-50"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs font-bold text-neutral-900 w-5 shrink-0">
                  {item.code}
                </span>
                <span className="truncate text-neutral-700">{item.name}</span>
              </div>
              <span className="font-bold text-neutral-900 ml-2 shrink-0">
                {item.chats}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
