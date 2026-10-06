import React from 'react';
import { Folder, Search, LayoutGrid, List, Plus } from 'lucide-react';
import { AdminTab, SortBy, StatusFilter, ViewMode, categories } from '../types';

interface AdminActionBarProps {
  activeTab: AdminTab;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchKnowledge: string;
  setSearchKnowledge: (term: string) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  categoryFilterKnowledge: string;
  setCategoryFilterKnowledge: (cat: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  statusFilterKnowledge: StatusFilter;
  setStatusFilterKnowledge: (status: StatusFilter) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  handleOpenCreate: () => void;
  handleOpenCreateKnowledge: () => void;
}

export const AdminActionBar: React.FC<AdminActionBarProps> = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  searchKnowledge,
  setSearchKnowledge,
  sortBy,
  setSortBy,
  categoryFilter,
  setCategoryFilter,
  categoryFilterKnowledge,
  setCategoryFilterKnowledge,
  statusFilter,
  setStatusFilter,
  statusFilterKnowledge,
  setStatusFilterKnowledge,
  viewMode,
  setViewMode,
  handleOpenCreate,
  handleOpenCreateKnowledge
}) => {
  return (
    <div className="space-y-3 pt-2">
      {/* Header Row: Title & Primary Action CTA */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 tracking-tight">
          {activeTab === 'articles'
            ? 'Blog'
            : activeTab === 'knowledge'
              ? 'Knowledge Hub'
              : 'Analytics & Overview'}
        </h1>

        {/* Primary Action Button (Side-by-side with Title on mobile and desktop) */}
        {activeTab === 'knowledge' ? (
          <button
            type="button"
            onClick={handleOpenCreateKnowledge}
            className="bg-black hover:bg-neutral-800 active:scale-95 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Knowledge</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="bg-black hover:bg-neutral-800 active:scale-95 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Blog</span>
          </button>
        )}
      </div>

      {/* Controls Container: Search, Filters, Sort, View Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Left Side: Search & Primary Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
          {/* Search Input: full width on mobile, fixed width on tablet/desktop */}
          <div className="relative w-full sm:w-60 md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={activeTab === 'knowledge' ? searchKnowledge : searchTerm}
              onChange={(e) =>
                activeTab === 'knowledge'
                  ? setSearchKnowledge(e.target.value)
                  : setSearchTerm(e.target.value)
              }
              placeholder={activeTab === 'knowledge' ? 'Search knowledge...' : 'Search blogs...'}
              className="w-full bg-white border border-neutral-200 rounded-lg pl-8 pr-3 py-2 sm:py-1.5 text-xs text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 shadow-2xs transition-colors"
            />
          </div>

          {/* Category & Status Dropdowns: 2 columns on mobile, auto-width on tablet/desktop */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            {/* Category Dropdown */}
            <select
              value={activeTab === 'knowledge' ? categoryFilterKnowledge : categoryFilter}
              onChange={(e) =>
                activeTab === 'knowledge'
                  ? setCategoryFilterKnowledge(e.target.value)
                  : setCategoryFilter(e.target.value)
              }
              className="w-full sm:w-auto bg-white border border-neutral-200 rounded-lg px-2.5 py-2 sm:py-1.5 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs truncate"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All Categories' ? 'All Categories' : c}
                </option>
              ))}
            </select>

            {/* Status Filter Dropdown */}
            <select
              value={activeTab === 'knowledge' ? statusFilterKnowledge : statusFilter}
              onChange={(e) =>
                activeTab === 'knowledge'
                  ? setStatusFilterKnowledge(e.target.value as StatusFilter)
                  : setStatusFilter(e.target.value as StatusFilter)
              }
              className="w-full sm:w-auto bg-white border border-neutral-200 rounded-lg px-2.5 py-2 sm:py-1.5 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs truncate"
            >
              <option value="all">Active (All)</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="archived">Recycle Bin</option>
            </select>
          </div>
        </div>

        {/* Right Side: Sort & View Mode Toggle */}
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="flex-1 sm:flex-initial bg-white border border-neutral-200 rounded-lg px-2.5 py-2 sm:py-1.5 text-xs text-neutral-800 font-medium focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="views">Most reads</option>
            <option value="title">Alphabetical</option>
          </select>

          {/* View Mode Toggle: Grid Cards ⊞ vs Table ☰ */}
          <div className="flex items-center border border-neutral-200 rounded-lg bg-white p-0.5 shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
