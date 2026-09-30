import React from 'react';
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
  Activity
} from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
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

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-[#E2E8F0]/20 font-sans select-none">
      {/* Scrollable Area with Custom Scrollbar & Relaxed Vertical Spacing */}
      <div className="overflow-y-auto px-3.5 py-4 space-y-3.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-500">
        
        {/* Merged Header & Workspace Selector Container */}
        <div className="bg-[#1E293B] border border-[#E2E8F0]/10 rounded-xl p-3 flex flex-col gap-3 shadow-sm hover:border-indigo-500/40 transition-all duration-200">
          {/* Logo & Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-sm shrink-0">
              U
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-white text-sm tracking-tight leading-none">UniMat</h1>
              <p className="text-[10px] text-slate-400 mt-1 font-medium truncate">Unified Material Intelligence</p>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0]/10 pt-2.5">
            {/* Workspace Selector Dropdown Button */}
            <div className="w-full bg-slate-800/80 hover:bg-slate-800 rounded-lg p-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer group border border-[#E2E8F0]/5">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-slate-700/80 border border-[#E2E8F0]/10 text-[10px] font-semibold flex items-center justify-center text-slate-200">
                  UW
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-100 leading-tight">Unified Workspace</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">ALL CPSEs</p>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-colors" />
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-3">
          {navSections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-[#1E293B]/60 border border-[#E2E8F0]/10 rounded-xl p-2 transition-all duration-200 hover:border-indigo-500/30 hover:bg-[#1E293B]/80 hover:shadow-md"
            >
              <h2 className="px-2 pt-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase mb-1">
                {section.title}
              </h2>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600/30 text-white border-l-2 border-indigo-400 font-semibold'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
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

          {/* Help & Documentation Container */}
          <div className="bg-[#1E293B]/60 border border-[#E2E8F0]/10 rounded-xl p-1.5 transition-all duration-200 hover:border-indigo-500/30 hover:bg-[#1E293B]/80 hover:shadow-md">
            <button 
              onClick={() => setActivePage('help')}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePage === 'help'
                  ? 'bg-indigo-600/30 text-white border-l-2 border-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
              }`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${activePage === 'help' ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>Help & Documentation</span>
            </button>
          </div>
        </nav>
      </div>

      {/* User Footer Container */}
      <div className="p-3 border-t border-[#E2E8F0]/15 bg-[#0B132B] flex items-center justify-between hover:bg-[#0d1633] transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-[#E2E8F0]/10 text-slate-200 font-semibold text-xs flex items-center justify-center">
            AK
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200 leading-tight">Ananya Kapoor</p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Administrator</p>
          </div>
        </div>
        <button 
          onClick={() => setActivePage('settings')}
          className="text-slate-400 hover:text-slate-100 p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;