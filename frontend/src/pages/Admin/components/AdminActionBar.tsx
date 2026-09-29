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
    <div className="space-y-4 pt-2">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title with Folder Icon */}
        <div className="flex items-center gap-2.5">

          <h1 className="text-lg font-bold font-serif text-neutral-900 tracking-tight">
            {activeTab === 'articles'
              ? 'Blog'
              : activeTab === 'knowledge'
                ? 'Knowledge Hub'
                : 'Analytics & Overview'}
          </h1>
        </div>

        {/* Controls Group (Search, Sort, Filters, View toggle, + Add CTA) */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search input with rounded border */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-black absolute left-3 top-2.5" />
            <input
              type="text"
              value={activeTab === 'knowledge' ? searchKnowledge : searchTerm}
              onChange={(e) =>
                activeTab === 'knowledge'
                  ? setSearchKnowledge(e.target.value)
                  : setSearchTerm(e.target.value)
              }
              placeholder="Search projects..."
              className="bg-white border border-neutral-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-black placeholder:text-black focus:outline-none focus:border-neutral-900 w-40 sm:w-52 shadow-2xs"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-black font-medium focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="views">Most reads</option>
            <option value="title">Alphabetical</option>
          </select>

          {/* Team size / Category Dropdown */}
          <select
            value={activeTab === 'knowledge' ? categoryFilterKnowledge : categoryFilter}
            onChange={(e) =>
              activeTab === 'knowledge'
                ? setCategoryFilterKnowledge(e.target.value)
                : setCategoryFilter(e.target.value)
            }
            className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-black font-medium focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All Categories' ? 'Team size / Category' : c}
              </option>
            ))}
          </select>

          {/* Filters Dropdown */}
          <select
            value={activeTab === 'knowledge' ? statusFilterKnowledge : statusFilter}
            onChange={(e) =>
              activeTab === 'knowledge'
                ? setStatusFilterKnowledge(e.target.value as StatusFilter)
                : setStatusFilter(e.target.value as StatusFilter)
            }
            className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-black font-medium focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs"
          >
            <option value="all">Filters: Active (All)</option>
            <option value="published">Filters: Published</option>
            <option value="draft">Filters: Drafts</option>
            <option value="archived">Filters: Recycle Bin</option>
          </select>

          {/* View Mode Toggle: Grid Cards ⊞ vs Table ☰ */}
          <div className="flex items-center border border-neutral-200 rounded-lg bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'grid'
                  ? 'bg-neutral-900 text-white'
                  : 'text-black hover:text-neutral-900'
                }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === 'table'
                  ? 'bg-neutral-900 text-white'
                  : 'text-black hover:text-neutral-900'
                }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Solid Dark Primary Button: + Add Project / Guide */}
          {activeTab === 'knowledge' ? (
            <button
              type="button"
              onClick={handleOpenCreateKnowledge}
              className="bg-black  text-white font-medium text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Knowledge</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenCreate}
              className="bg-black hover:bg-black text-white font-medium text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Blog</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
