import React from 'react';
import { Folder, Search, RefreshCw, PanelLeftClose, PanelLeftOpen, User } from 'lucide-react';
import { AdminTab } from '../types';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
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
  sidebarOpen,
  setSidebarOpen,
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
    <header className="h-14 bg-white border-b-2 border-neutral-400/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Logo & Sidebar Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen((prev: boolean) => !prev)}
          className="lg:hidden flex items-center gap-2 -ml-1 p-1 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          title="Open Admin Navigation"
        >
          <img src="/logo.webp" alt="Sunny Solar" className="h-8 w-auto object-contain" />
        </button>

        {/* Desktop Tab Title */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-neutral-900">
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
        <div className="relative hidden  md:flex items-center">
          <Search className="w-3.5 h-3.5 text-black absolute left-3" />
          <input
            type="text"
            value={activeTab === 'knowledge' ? searchKnowledge : searchTerm}
            onChange={(e) =>
              activeTab === 'knowledge'
                ? setSearchKnowledge(e.target.value)
                : setSearchTerm(e.target.value)
            }
            placeholder={activeTab === 'knowledge' ? 'Search knowledge...' : 'Search articles...'}
            className="w-44 lg:w-66 pl-8 pr-11 py-1.5 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white border border-neutral-300 rounded-full text-xs transition-colors focus:outline-none focus:border-neutral-400"
          />
        
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

        {/* Mobile User Avatar Button matching reference screenshot */}
        <button
          type="button"
          onClick={() => setSidebarOpen((prev: boolean) => !prev)}
          className="lg:hidden w-8 h-8 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer ml-1 transition-transform active:scale-95"
          title="Admin Profile & Menu"
        >
         <User/>
        </button>
      </div>
    </header>
  );
};
