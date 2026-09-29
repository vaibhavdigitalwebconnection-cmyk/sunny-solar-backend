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
  LogOut,
  PanelLeftClose
} from 'lucide-react';
import { AdminTab, StatusFilter } from '../types';
const logo = '/logo.png';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setStatusFilterKnowledge: (filter: StatusFilter) => void;
  adminUser: any;
  handleLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  setStatusFilter,
  setStatusFilterKnowledge,
  adminUser,
  handleLogout
}) => {
  const handleNavClick = (callback: () => void) => {
    callback();
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`bg-white border-r-2 border-neutral-400/80 flex flex-col shrink-0 fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out shadow-lg lg:shadow-none ${
        sidebarOpen
          ? 'w-64 translate-x-0'
          : '-translate-x-full lg:translate-x-0 lg:w-18'
      }`}
    >
      {/* Brand Area */}
      {sidebarOpen ? (
        <div className="h-16 px-4  flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <img src={logo} alt="Sunny Solar" className="w-12 shrink-0 object-contain" />
            <h1 className="text-lg font-bold font-serif text-neutral-900 tracking-tight truncate">
              Admin penal
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="h-16  flex items-center justify-center px-1 shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-neutral-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer group flex items-center justify-center"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <img src={logo} alt="Sunny Solar" className="w-8 h-8 object-contain group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Navigation Sections */}
      <div data-lenis-prevent className="p-2 sm:p-3 flex-1 overflow-y-auto space-y-6">
        {/* Section 1: Ecommerce / Overview */}
        <div>
          {sidebarOpen ? (
            <div className="px-3 pb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Ecommerce
            </div>
          ) : (
            <div className="h-px bg-neutral-200/80 my-2 mx-1.5" title="Ecommerce" />
          )}

          <div className="space-y-1">
            {/* Dashboard */}
            <button
              type="button"
              onClick={() => handleNavClick(() => setActiveTab('overview'))}
              title="Dashboard"
              className={`w-full flex items-center ${
                sidebarOpen ? 'justify-between px-3 py-2' : 'justify-center p-2.5'
              } rounded-lg text-xs font-medium transition-colors cursor-pointer group relative ${
                activeTab === 'overview'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <div className={`flex items-center ${sidebarOpen ? 'gap-2.5' : 'justify-center'}`}>
                <LayoutDashboard
                  className={`w-5 h-5 shrink-0 ${
                    activeTab === 'overview' ? 'text-amber-600' : 'text-neutral-500 group-hover:text-neutral-900'
                  }`}
                />
                {sidebarOpen && <span>Dashboard</span>}
              </div>
              {sidebarOpen && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
            </button>

            {/* Blog */}
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  setActiveTab('articles');
                  setStatusFilter('all');
                })
              }
              title="Blog"
              className={`w-full flex items-center ${
                sidebarOpen ? 'justify-between px-3 py-2' : 'justify-center p-2.5'
              } rounded-lg text-xs font-medium transition-colors cursor-pointer group relative ${
                activeTab === 'articles'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <div className={`flex items-center ${sidebarOpen ? 'gap-2.5' : 'justify-center'}`}>
                <FileText
                  className={`w-5 h-5 shrink-0 ${
                    activeTab === 'articles' ? 'text-amber-600' : 'text-neutral-500 group-hover:text-neutral-900'
                  }`}
                />
                {sidebarOpen && <span>Blog</span>}
              </div>
              {sidebarOpen && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
            </button>

            {/* Knowledge Hub */}
            <button
              type="button"
              onClick={() =>
                handleNavClick(() => {
                  setActiveTab('knowledge');
                  setStatusFilterKnowledge('all');
                })
              }
              title="Knowledge Hub"
              className={`w-full flex items-center ${
                sidebarOpen ? 'justify-between px-3 py-2' : 'justify-center p-2.5'
              } rounded-lg text-xs font-medium transition-colors cursor-pointer group relative ${
                activeTab === 'knowledge'
                  ? 'bg-neutral-100 text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <div className={`flex items-center ${sidebarOpen ? 'gap-2.5' : 'justify-center'}`}>
                <BookOpen
                  className={`w-5 h-5 shrink-0 ${
                    activeTab === 'knowledge' ? 'text-amber-600' : 'text-neutral-500 group-hover:text-neutral-900'
                  }`}
                />
                {sidebarOpen && <span>Knowledge Hub</span>}
              </div>
              {sidebarOpen && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
            </button>

            {/* Live Blog */}
            <a
              href="/learn/blog"
              target="_blank"
              rel="noreferrer"
              title="Live Blog (Opens in new tab)"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center ${
                sidebarOpen ? 'justify-between px-3 py-2' : 'justify-center p-2.5'
              } rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group`}
            >
              <div className={`flex items-center ${sidebarOpen ? 'gap-2.5' : 'justify-center'}`}>
                <Globe className="w-5 h-5 shrink-0 text-neutral-500 group-hover:text-neutral-900" />
                {sidebarOpen && <span>Live Blog</span>}
              </div>
              {sidebarOpen && <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
            </a>

            {/* Live Knowledge Hub */}
            <a
              href="/learn/knowledge-hub"
              target="_blank"
              rel="noreferrer"
              title="Live Knowledge Hub (Opens in new tab)"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center ${
                sidebarOpen ? 'justify-between px-3 py-2' : 'justify-center p-2.5'
              } rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors group`}
            >
              <div className={`flex items-center ${sidebarOpen ? 'gap-2.5' : 'justify-center'}`}>
                <BookOpen className="w-5 h-5 shrink-0 text-neutral-500 group-hover:text-neutral-900" />
                {sidebarOpen && <span>Live Knowledge Hub</span>}
              </div>
              {sidebarOpen && <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom User Area */}
      {sidebarOpen ? (
        <div className="p-3 border-t border-neutral-100 bg-white shrink-0">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {adminUser?.name ? adminUser.name.slice(0, 2).toUpperCase() : 'MA'}
              </div>
              <div className="overflow-hidden min-w-0">
                <span className="text-xs font-bold text-neutral-900 block truncate">
                  {adminUser?.name || 'Master Admin'}
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
      ) : (
        <div className="p-2 border-t border-neutral-100 bg-white flex flex-col items-center gap-2 shrink-0">
          <div
            className="w-9 h-9 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs"
            title={`${adminUser?.name || 'Master Admin'} (${adminUser?.email || 'admin@sunnysolar.com.au'})`}
          >
            {adminUser?.name ? adminUser.name.slice(0, 2).toUpperCase() : 'MA'}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
};
