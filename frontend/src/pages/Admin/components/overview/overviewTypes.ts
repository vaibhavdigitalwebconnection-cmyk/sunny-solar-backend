import { AdminTab, BlogItem, KnowledgeItem } from '../../types';

export interface CountryStatItem {
  code: string;
  name: string;
  flag: string;
  chats: number;
}

export interface MobileDonutCategory {
  name: string;
  color: string;
  count?: number;
  percent?: number;
  views?: number;
}

export interface AdminOverviewProps {
  stats: any;
  activeBlogs: BlogItem[];
  blogs: BlogItem[];
  activeKnowledge: KnowledgeItem[];
  knowledgeItems: KnowledgeItem[];
  publishedBlogs: BlogItem[];
  publishedKnowledge: KnowledgeItem[];
  setActiveTab: (tab: AdminTab) => void;
  handleOpenEdit: (blog: BlogItem) => void;
  handleOpenEditKnowledge: (item: KnowledgeItem) => void;
}

// 24 Hours array for heatmap
export const HOURS = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM',
  '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
];

// Days in exact order (Sat top, Sun bottom)
export const DAYS = ['Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon', 'Sun'];

// Base activity weights by day and hour for solar website traffic
export const HOURLY_WEIGHTS: number[][] = [
  [0, 1, 0, 1, 0, 0, 1, 0, 2, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 3, 0, 1, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 2, 0, 0, 0, 0, 3, 0, 2, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
  [2, 3, 2, 1, 0, 1, 0, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 0],
  [2, 2, 0, 2, 3, 4, 3, 0, 1, 0, 1, 2, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 2, 0, 1, 0, 3, 2, 4, 0, 2, 0, 2, 0, 1, 1, 0, 0, 0, 0, 2, 3, 0, 0],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
];

// Helper to get heatmap cell color
export const getHeatmapColor = (intensity: number) => {
  if (intensity >= 4) return 'bg-[#4338ca] text-white';
  if (intensity === 3) return 'bg-[#6366f1] text-white';
  if (intensity === 2) return 'bg-[#a5b4fc] text-neutral-800';
  if (intensity === 1) return 'bg-[#e0e7ff] text-neutral-600';
  return 'bg-[#f8fafc] text-transparent';
};

// Modern color palette for categories pie chart
export const SUBJECT_COLORS = [
  '#3b82f6', // 1: Vibrant Blue
  '#eab308', // 2: Amber / Gold
  '#8b5cf6', // 3: Violet / Purple
  '#10b981', // 4: Emerald Green
  '#ef4444', // 5: Coral Red
  '#06b6d4', // 6: Cyan
  '#f97316', // 7: Bright Orange
  '#ec4899', // 8: Pink
  '#6366f1', // 9: Indigo
  '#14b8a6', // 10: Teal
  '#84cc16', // 11: Lime Green
  '#f43f5e'  // 12: Rose
];
