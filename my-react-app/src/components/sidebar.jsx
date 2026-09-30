import React from "react";
import {
  LayoutDashboard,
  PackageOpen,
  Layers,
  ListFilter,
  Sparkles,
  GitCompare,
  ClipboardCheck,
  Network,
  BarChart3,
  Server,
  HelpCircle,
  Settings
} from "lucide-react";

export default function Sidebar({ activePage, setActivePage }) {
  const getItemClasses = (pageKey) => {
    const isActive = activePage === pageKey;
    return `w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
      isActive
        ? "bg-indigo-600/30 text-white font-semibold border-l-2 border-indigo-400"
        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
    }`;
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#0F172A] text-slate-300 flex flex-col justify-between shrink-0 select-none">
      {/* Scrollable Container with Custom Tiny Scrollbar Style */}
      <div 
        className="p-3 space-y-2 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-1 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-extrabold text-white text-base shadow-sm shrink-0">
            M
          </div>
          <div>
            <h1 className="font-bold text-white text-sm tracking-tight leading-none">MatAlign</h1>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">Unified Material Intelligence</p>
          </div>
        </div>

        <nav className="space-y-2 text-xs">
          {/* OVERVIEW */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              OVERVIEW
            </p>
            <button onClick={() => setActivePage("dashboard")} className={getItemClasses("dashboard")}>
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* MATERIALS */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              MATERIALS
            </p>
            <div className="space-y-0.5">
              <button onClick={() => setActivePage("all-materials")} className={getItemClasses("all-materials")}>
                <PackageOpen className="w-4 h-4 text-slate-400" />
                <span>All Materials</span>
              </button>
              <button onClick={() => setActivePage("standard-materials")} className={getItemClasses("standard-materials")}>
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Standard Materials</span>
              </button>
              <button onClick={() => setActivePage("categories")} className={getItemClasses("categories")}>
                <ListFilter className="w-4 h-4 text-slate-400" />
                <span>Categories</span>
              </button>
            </div>
          </div>

          {/* AI ENGINE */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              AI ENGINE
            </p>
            <div className="space-y-0.5">
              <button onClick={() => setActivePage("run-matching")} className={getItemClasses("run-matching")}>
                <Sparkles className="w-4 h-4 text-slate-400" />
                <span>Run Matching</span>
              </button>
              <button onClick={() => setActivePage("match-results")} className={getItemClasses("match-results")}>
                <GitCompare className="w-4 h-4 text-slate-400" />
                <span>Match Results</span>
              </button>
            </div>
          </div>

          {/* REVIEW */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              REVIEW
            </p>
            <button onClick={() => setActivePage("review-queue")} className={getItemClasses("review-queue")}>
              <ClipboardCheck className="w-4 h-4 text-slate-400" />
              <span>Review Queue</span>
            </button>
          </div>

          {/* HARMONIZATION */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              HARMONIZATION
            </p>
            <div className="space-y-0.5">
              <button onClick={() => setActivePage("cpse-mapping")} className={getItemClasses("cpse-mapping")}>
                <Network className="w-4 h-4 text-slate-400" />
                <span>CPSE Mapping</span>
              </button>
              <button onClick={() => setActivePage("analytics")} className={getItemClasses("analytics")}>
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* INTEGRATION */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              INTEGRATION
            </p>
            <button
              onClick={() => setActivePage("api-integration")}
              className={getItemClasses("api-integration")}
            >
              <Server className="w-4 h-4 text-indigo-400" />
              <span>API & Data Connections</span>
            </button>
          </div>

          {/* SYSTEM */}
          <div>
            <p className="px-2 text-[9px] font-bold tracking-wider text-slate-500 uppercase mb-0.5">
              SYSTEM
            </p>
            <div className="space-y-0.5">
              <button onClick={() => setActivePage("help")} className={getItemClasses("help")}>
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Help & Documentation</span>
              </button>
              <button onClick={() => setActivePage("settings")} className={getItemClasses("settings")}>
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Footer Profile Box */}
      <div className="p-3 bg-[#0B132B] flex items-center justify-between text-xs border-t border-slate-800/50 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center shrink-0">
            AP
          </div>
          <div className="truncate">
            <p className="font-semibold text-slate-200 leading-tight truncate">CPSE Data Admin</p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Ministry Portal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}