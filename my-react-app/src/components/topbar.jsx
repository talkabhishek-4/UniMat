import React from 'react';
import { Search, Bell, ChevronRight } from 'lucide-react';

const TopBar = ({ activePage }) => {
  return (
    <header className="h-16 border-b border-slate-200/80 bg-white px-8 flex items-center justify-between sticky top-0 z-10 shadow-xs">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <span>Workspace</span>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className="text-slate-900 font-semibold capitalize">{activePage.replace('-', ' ')}</span>
      </div>

      {/* Right Search & Profile Action Section */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search materials"
            className="w-full bg-slate-100/70 border border-slate-200/80 rounded-lg pl-9 pr-12 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
            ⌘ K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 border border-white"></span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700 cursor-pointer">
          AK
        </div>
      </div>
    </header>
  );
};

export default TopBar;