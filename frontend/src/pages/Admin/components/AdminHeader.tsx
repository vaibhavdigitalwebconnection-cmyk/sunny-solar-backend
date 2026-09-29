import React from 'react';
import { Folder, Search, RefreshCw } from 'lucide-react';
import { AdminTab } from '../types';

interface AdminHeaderProps {
  activeTab: AdminTab;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  searchKnowledge: string;
  setSearchKnowledge: (val: string) => void;
  loadDashboardData: (silent?: boolean) => Promise<void>;
  loadingBlogs: boolean;
  loadingKnowledge: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  searchTerm,
  setSearchTerm,
  searchKnowledge,
  setSearchKnowledge,
  loadDashboardData,
  loadingBlogs,
  loadingKnowledge
}) => {
  return (
    <header className="h-14 bg-white border-b border-neutral-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <Folder className="w-4 h-4 text-neutral-500" />
          <span>
            {activeTab === 'articles'
              ? 'Blog'
              : activeTab === 'knowledge'
                ? 'Knowledge Hub '
                : 'Dashboard Analytics'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick search with shortcut badge (⌘ K) */}
        <div className="relative hidden md:flex items-center">
          <Search className="w-3.5 h-3.5 text-black absolute left-3" />
          <input
            type="text"
            value={activeTab === 'knowledge' ? searchKnowledge : searchTerm}
            onChange={(e) =>
              activeTab === 'knowledge'
                ? setSearchKnowledge(e.target.value)
                : setSearchTerm(e.target.value)
            }
            placeholder="Search projects..."
            className="w-44 lg:w-56 pl-8 pr-11 py-1.5 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-200 rounded-lg text-xs transition-colors focus:outline-none focus:border-neutral-400"
          />
          <kbd className="absolute right-2 px-1.5 py-0.5 text-[9px] font-mono font-medium text-neutral-400 bg-neutral-200/60 rounded border border-neutral-300/60 pointer-events-none  ">
            ⌘ K
          </kbd>
        </div>

        {/* Refresh button */}
        <button
          type="button"
          onClick={() => loadDashboardData(false)}
          disabled={loadingBlogs || loadingKnowledge}
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          title="Refresh Data Now"
        >
          <RefreshCw
            className={`w-4 h-4 ${loadingBlogs || loadingKnowledge ? 'animate-spin text-amber-600' : ''
              }`}
          />
        </button>
      </div>
    </header>
  );
};
