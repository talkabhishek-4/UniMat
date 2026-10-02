import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PackageOpen, 
  Layers, 
  ListFilter, 
  Sparkles, 
  GitCompare, 
  AlertTriangle, 
  ClipboardCheck, 
  Network, 
  BarChart3, 
  HelpCircle, 
  ChevronDown, 
  Settings,
  Activity,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MATERIALS',
      items: [
        { id: 'all-materials', label: 'All Materials', icon: PackageOpen },
        { id: 'standard-materials', label: 'Standard Materials', icon: Layers },
        { id: 'categories', label: 'Categories', icon: ListFilter }
      ]
    },
    {
      title: 'AI MATCHING',
      items: [
        { id: 'run-matching', label: 'Run Matching', icon: Sparkles },
        { id: 'match-results', label: 'Match Results', icon: GitCompare },
        { id: 'conflicts', label: 'Conflicts', icon: AlertTriangle, badge: '12', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'review-queue', label: 'Review Queue', icon: ClipboardCheck, badge: '38', badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
        { id: 'cpse-mapping', label: 'CPSE Mapping', icon: Network },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'api-connection', label: 'API Data Connection', icon: Activity }
      ]
    }
  ];

  const handleSelectPage = (id) => {
    setActivePage(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Responsive Sidebar Container */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-20 bg-[#0F172A] text-slate-300 flex flex-col justify-between shrink-0 h-screen border-r border-[#E2E8F0]/20 font-sans select-none transition-all duration-300 ${
          isCollapsed ? 'lg:w-18' : 'lg:w-64'
        } ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Scrollable Navigation Area */}
        <div className="overflow-y-auto px-2.5 py-4 space-y-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          {/* Header Card (Logo + Workspace Dropdown) */}
          <div className="bg-[#1E293B] border border-[#E2E8F0]/10 rounded-xl p-2.5 flex flex-col gap-2 shadow-xs relative">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              
              {/* Brand Logo & Title */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-xs shrink-0">
                  U
                </div>
                {!isCollapsed && (
                  <div className="min-w-0">
                    <h1 className="font-bold text-white text-sm tracking-tight leading-none">UniMat</h1>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium truncate">Unified Material Intelligence</p>
                  </div>
                )}
              </div>

              {/* Desktop Rail Toggle Button (Expand/Collapse) */}
              {!isCollapsed && (
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="hidden lg:flex p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Mobile Close Button */}
              <button 
                onClick={() => setIsMobileOpen(false)} 
                className="lg:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Collapsed Rail Expand Button Trigger */}
            {isCollapsed && (
              <button
                onClick={() => setIsCollapsed(false)}
                className="hidden lg:flex w-full items-center justify-center py-1 mt-1 rounded bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Workspace Selector Dropdown */}
            {!isCollapsed && (
              <div className="border-t border-[#E2E8F0]/10 pt-2">
                <div className="w-full bg-slate-800/80 hover:bg-slate-800 rounded-lg p-2 flex items-center justify-between text-left transition-all cursor-pointer border border-[#E2E8F0]/5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded bg-slate-700 border border-[#E2E8F0]/10 text-[9px] font-semibold flex items-center justify-center text-slate-200 shrink-0">
                      UW
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-100 leading-tight truncate">Unified Workspace</p>
                      <p className="text-[9px] text-slate-400 font-medium truncate">ALL CPSEs</p>
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-3">
            {navSections.map((section, idx) => (
              <div 
                key={idx} 
                className="bg-[#1E293B]/60 border border-[#E2E8F0]/10 rounded-xl p-1.5 transition-all"
              >
                {!isCollapsed && (
                  <h2 className="px-2 pt-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase mb-1 truncate">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectPage(item.id)}
                        title={isCollapsed ? item.label : undefined}
                        className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2.5 py-2 lg:py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600/30 text-white border-l-2 border-indigo-400 font-semibold'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                          {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </div>
                        {!isCollapsed && item.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Help & Documentation Button */}
            <div className="bg-[#1E293B]/60 border border-[#E2E8F0]/10 rounded-xl p-1.5">
              <button 
                onClick={() => handleSelectPage('help')}
                title={isCollapsed ? "Help & Documentation" : undefined}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'} px-2.5 py-2 lg:py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activePage === 'help'
                    ? 'bg-indigo-600/30 text-white border-l-2 border-indigo-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                }`}
              >
                <HelpCircle className={`w-4 h-4 sm:w-3.5 sm:h-3.5 shrink-0 ${activePage === 'help' ? 'text-indigo-400' : 'text-slate-400'}`} />
                {!isCollapsed && <span>Help & Docs</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* User Footer Section */}
        <div className="p-2.5 border-t border-[#E2E8F0]/15 bg-[#0B132B] flex items-center justify-between">
          <div className={`flex items-center gap-2 min-w-0 ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-[#E2E8F0]/10 text-slate-200 font-semibold text-xs flex items-center justify-center shrink-0">
              AK
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 leading-tight truncate">Ananya Kapoor</p>
                <p className="text-[9px] text-slate-400 leading-none mt-0.5 truncate">Administrator</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={() => handleSelectPage('settings')}
              className="text-slate-400 hover:text-slate-100 p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;