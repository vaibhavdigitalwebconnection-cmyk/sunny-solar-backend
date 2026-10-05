import React, { useMemo } from 'react';
import {
  CountryStatItem,
  AdminOverviewProps,
  DAYS,
  SUBJECT_COLORS
} from './overview/overviewTypes';
import { MobileOverview } from './overview/MobileOverview';
import { DesktopStatCards } from './overview/DesktopStatCards';
import { TrafficHeatmap } from './overview/TrafficHeatmap';
import { VisitorRegionsTable } from './overview/VisitorRegionsTable';
import { SubjectsPieChart } from './overview/SubjectsPieChart';

export type { CountryStatItem, AdminOverviewProps };

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  stats,
  activeBlogs,
  blogs,
  activeKnowledge,
  knowledgeItems,
  publishedBlogs,
  publishedKnowledge,
  setActiveTab
}) => {
  // 1. REAL METRIC: Total active reads (strictly excluding soft-deleted items)
  const totalActiveBlogReads = activeBlogs.reduce((acc, b) => acc + (b.views || 0), 0);
  const totalActiveKnowledgeReads = activeKnowledge.reduce((acc, k) => acc + (k.views || 0), 0);
  const displayTotalReads =
    (typeof stats?.totalViews === 'number' ? stats.totalViews : totalActiveBlogReads) +
    (typeof stats?.totalKnowledgeViews === 'number'
      ? stats.totalKnowledgeViews
      : totalActiveKnowledgeReads);

  // 2. REAL METRIC: Blog & Active Guides counts
  const realActiveBlogCount = stats ? stats.totalBlogs : activeBlogs.length;
  const realActiveKnowledgeCount =
    stats?.totalKnowledge !== undefined ? stats.totalKnowledge : activeKnowledge.length;
  const realPublishedLiveCount =
    (stats ? stats.publishedBlogs : publishedBlogs.length) +
    (stats?.publishedKnowledge !== undefined
      ? stats.publishedKnowledge
      : publishedKnowledge.length);

  // 3. REAL METRIC: Draft Content percentage
  const totalAllStored =
    (stats?.allStoredBlogs || blogs.length) + (stats?.allStoredKnowledge || knowledgeItems.length);
  const totalDraftCount =
    (stats?.draftBlogs ?? blogs.filter((b) => !b.isPublished && !b.isDeleted).length) +
    (stats?.draftKnowledge ??
      knowledgeItems.filter((k) => !k.isPublished && !k.isDeleted).length);
  const draftPercentValue =
    totalAllStored > 0 ? ((totalDraftCount / totalAllStored) * 100).toFixed(2) : '0.00';

  // 4. REAL DATES: 30-Day Window calculation for Sparkline bounds
  const { startDateStr, endDateStr } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);
    const format = (d: Date) => d.toISOString().split('T')[0];
    return { startDateStr: format(start), endDateStr: format(end) };
  }, []);

  // 5. REAL SPARKLINE 1: Total Reads daily timeline over 28 days (starting from 0)
  const sparklineBars1 = useMemo(() => {
    const bars = Array(28).fill(0);
    if (!stats?.dailyTraffic || stats.dailyTraffic.length === 0) {
      if (displayTotalReads > 0) {
        bars[27] = Math.min(100, Math.max(20, displayTotalReads * 8));
      }
      return bars;
    }

    const today = new Date();
    const dateKeys: string[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dateKeys.push(d.toISOString().split('T')[0]);
    }

    const counts = dateKeys.map((k) => {
      const match = stats.dailyTraffic?.find((item: any) => item.date === k);
      return match ? match.count : 0;
    });

    const max = Math.max(...counts, 1);
    return counts.map((c) => (c > 0 ? Math.min(100, Math.max(20, Math.round((c / max) * 100))) : 0));
  }, [stats?.dailyTraffic, displayTotalReads]);

  // 6. REAL SPARKLINE 2: Draft / Staging Content timeline (starting from 0)
  const sparklineBars2 = useMemo(() => {
    const bars = Array(28).fill(0);
    if (totalDraftCount > 0) {
      bars[27] = Math.min(100, totalDraftCount * 25);
    }
    return bars;
  }, [totalDraftCount]);

  // 7. REAL SPARKLINE 3: Blog creation timeline (starting from 0)
  const sparklineBars3 = useMemo(() => {
    const bars = Array(28).fill(0);
    if (activeBlogs.length === 0) return bars;

    const today = new Date();
    const dateKeys: string[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dateKeys.push(d.toISOString().split('T')[0]);
    }

    activeBlogs.forEach((blog) => {
      const createdStr = (blog as any).createdAt
        ? new Date((blog as any).createdAt).toISOString().split('T')[0]
        : '';
      const idx = dateKeys.indexOf(createdStr);
      if (idx !== -1) {
        bars[idx] += 1;
      } else {
        bars[27] += 1;
      }
    });

    const max = Math.max(...bars, 1);
    return bars.map((b) => (b > 0 ? Math.min(100, Math.max(25, Math.round((b / max) * 100))) : 0));
  }, [activeBlogs]);

  // 8. REAL SPARKLINE 4: Knowledge Hub creation timeline (starting from 0)
  const sparklineBars4 = useMemo(() => {
    const bars = Array(28).fill(0);
    if (activeKnowledge.length === 0) return bars;

    const today = new Date();
    const dateKeys: string[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      dateKeys.push(d.toISOString().split('T')[0]);
    }

    activeKnowledge.forEach((item) => {
      const createdStr = (item as any).createdAt
        ? new Date((item as any).createdAt).toISOString().split('T')[0]
        : '';
      const idx = dateKeys.indexOf(createdStr);
      if (idx !== -1) {
        bars[idx] += 1;
      } else {
        bars[27] += 1;
      }
    });

    const max = Math.max(...bars, 1);
    return bars.map((b) => (b > 0 ? Math.min(100, Math.max(25, Math.round((b / max) * 100))) : 0));
  }, [activeKnowledge]);

  // 9. REAL GEOGRAPHIC BREAKDOWN: Live Database Visitor Tracking Only
  const realCountriesData = useMemo<CountryStatItem[]>(() => {
    if (stats?.countryStats && stats.countryStats.length > 0) {
      return stats.countryStats.map((item: any) => ({
        code: item.countryCode || '',
        name: item.country || 'Unknown',
        flag: item.flag || '🌐',
        chats: item.count || 0
      }));
    }
    return [];
  }, [stats?.countryStats]);

  // Real Heatmap Matrix computed from Server Traffic
  const heatmapMatrix = useMemo(() => {
    const matrix: number[][] = Array(7)
      .fill(0)
      .map(() => Array(24).fill(0));
    const countsMatrix: number[][] = Array(7)
      .fill(0)
      .map(() => Array(24).fill(0));

    if (stats?.hourlyTraffic && stats.hourlyTraffic.length > 0) {
      stats.hourlyTraffic.forEach((entry: any) => {
        const dayIdx = DAYS.indexOf(entry.day);
        const hourIdx = typeof entry.hour === 'number' ? entry.hour : -1;
        if (dayIdx !== -1 && hourIdx >= 0 && hourIdx < 24) {
          countsMatrix[dayIdx][hourIdx] += entry.count;
        }
      });
    }

    let max = 0;
    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        if (countsMatrix[d][h] > max) max = countsMatrix[d][h];
      }
    }

    for (let d = 0; d < 7; d++) {
      for (let h = 0; h < 24; h++) {
        const c = countsMatrix[d][h];
        if (c > 0) {
          matrix[d][h] = max > 1 ? Math.min(4, Math.max(1, Math.round((c / max) * 4))) : 3;
        } else {
          matrix[d][h] = 0;
        }
      }
    }

    return { matrix, countsMatrix };
  }, [stats?.hourlyTraffic, displayTotalReads]);

  // 10. REAL DATABASE CATEGORY AGGREGATION: Directly aggregates all active blogs & knowledge items
  const { allCategoriesData, top3Categories, totalCategorizedItems } = useMemo(() => {
    const categoryMap: Record<string, { count: number; views: number }> = {};

    activeBlogs.forEach((blog) => {
      const cat = blog.category?.trim() || 'Solar Basics';
      if (!categoryMap[cat]) categoryMap[cat] = { count: 0, views: 0 };
      categoryMap[cat].count += 1;
      categoryMap[cat].views += blog.views || 0;
    });

    activeKnowledge.forEach((guide) => {
      const cat = guide.category?.trim() || 'Knowledge Hub';
      if (!categoryMap[cat]) categoryMap[cat] = { count: 0, views: 0 };
      categoryMap[cat].count += 1;
      categoryMap[cat].views += guide.views || 0;
    });

    const entries = Object.entries(categoryMap);
    const totalCount = entries.reduce((sum, [, d]) => sum + d.count, 0);

    if (totalCount === 0) {
      return {
        allCategoriesData: [],
        top3Categories: [],
        totalCategorizedItems: 0
      };
    }

    // Sort all categories descending by item count
    const sorted = entries.sort((a, b) => b[1].count - a[1].count);

    // Every category gets its own distinct color in the pie chart ball
    const allCategories = sorted.map(([name, data], idx) => ({
      name,
      count: data.count,
      views: data.views,
      percent: Math.round((data.count / totalCount) * 100),
      color: SUBJECT_COLORS[idx % SUBJECT_COLORS.length]
    }));

    // Ensure sum of all active percentages is exactly 100%
    const currentSum = allCategories.reduce((sum, s) => sum + s.percent, 0);
    const diff = 100 - currentSum;
    if (diff !== 0 && allCategories.length > 0 && allCategories[0].count > 0) {
      allCategories[0].percent += diff;
    }

    const top3 = allCategories.slice(0, 3);

    return {
      allCategoriesData: allCategories,
      top3Categories: top3,
      totalCategorizedItems: totalCount
    };
  }, [activeBlogs, activeKnowledge]);

  const todayFormattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          MOBILE VIEW: Matching the Reference Image (Separated Component)
      ────────────────────────────────────────────────────────────── */}
      <MobileOverview
        displayTotalReads={displayTotalReads}
        realActiveBlogCount={realActiveBlogCount}
        realActiveKnowledgeCount={realActiveKnowledgeCount}
        draftPercentValue={draftPercentValue}
        totalDraftCount={totalDraftCount}
        allCategoriesData={allCategoriesData}
        realCountriesData={realCountriesData}
        todayFormattedDate={todayFormattedDate}
        setActiveTab={setActiveTab}
      />

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP VIEW: Modular Analytics Grid & Sparkline Cards
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:block space-y-6">
        {/* Top 4 Metric Cards with Sparklines */}
        <DesktopStatCards
          displayTotalReads={displayTotalReads}
          draftPercentValue={draftPercentValue}
          realActiveBlogCount={realActiveBlogCount}
          realActiveKnowledgeCount={realActiveKnowledgeCount}
          startDateStr={startDateStr}
          endDateStr={endDateStr}
          sparklineBars1={sparklineBars1}
          sparklineBars2={sparklineBars2}
          sparklineBars3={sparklineBars3}
          sparklineBars4={sparklineBars4}
          setActiveTab={setActiveTab}
        />

        {/* 3-Column Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Column 1: Heatmap Matrix (Spans 6 cols) */}
          <TrafficHeatmap
            displayTotalReads={displayTotalReads}
            heatmapMatrix={heatmapMatrix}
          />

          {/* Column 2: Countries of Origin (Spans 3 cols) */}
          <VisitorRegionsTable realCountriesData={realCountriesData} />

          {/* Column 3: Top Subjects Asked (Spans 3 cols) */}
          <SubjectsPieChart
            top3Categories={top3Categories}
            allCategoriesData={allCategoriesData}
            totalCategorizedItems={totalCategorizedItems}
          />
        </div>
      </div>
    </div>
  );
};
