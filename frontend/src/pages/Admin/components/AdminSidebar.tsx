import React from 'react';
import {
  Sun,
  ChevronsUpDown,
  LayoutDashboard,
  ChevronRight,
  FileText,
  BookOpen,
  Globe,
  ArrowUpRight,
  LogOut
} from 'lucide-react';
import { AdminTab, StatusFilter } from '../types';
const logo = '/logo.png';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setStatusFilterKnowledge: (filter: StatusFilter) => void;
  adminUser: any;
  handleLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  activeTab,
  setActiveTab,
  setStatusFilter,
  setStatusFilterKnowledge,
  adminUser,
  handleLogout
}) => {
  return (
    <aside
      className={`w-64 bg-white border-r border-neutral-200/80 flex flex-col shrink-0 fixed inset-y-0 left-0 z-30 transition-transform duration-200 shadow-2xs ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
    >
      {/* Brand Area */}
      <div className="h-16 px-5 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className='w-15' />
        </div>
        <h1 className="text-xl font-bold font-serif">Admin penal</h1>
      </div>

      {/* Navigation Sections */}
      <div data-lenis-prevent className="p-3 flex-1 overflow-y-auto space-y-6">
        {/* Section 1: Ecommerce / Overview */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Ecommerce
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'overview'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-neutral-500" />
                <span>Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('articles');
                setStatusFilter('all');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'articles'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-neutral-500" />
                <span>Blog</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('knowledge');
                setStatusFilterKnowledge('all');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${activeTab === 'knowledge'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-neutral-500" />
                <span>Knowledge Hub</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <a
              href="/learn/blog"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-neutral-500" />
                <span>Live Blog</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              href="/learn/knowledge-hub"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-neutral-500" />
                <span>Live Knowledge Hub</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom User Area */}
      <div className="p-3 border-t border-neutral-100 bg-white">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              {adminUser?.name ? adminUser.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
            <div className="overflow-hidden min-w-0">
              <span className="text-xs font-bold text-neutral-900 block truncate">
                {adminUser?.name || 'ausrobdev'}
              </span>
              <span className="text-[10px] text-neutral-400 block truncate">
                {adminUser?.email || 'admin@sunnysolar.com.au'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer ml-1 shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
