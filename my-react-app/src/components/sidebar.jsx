import React from 'react';
import { 
  LayoutDashboard, 
  Boxes, 
  Layers, 
  Tags, 
  Sparkles, 
  GitCompare, 
  AlertTriangle, 
  ClipboardCheck, 
  Network, 
  BarChart3, 
  HelpCircle, 
  ChevronDown, 
  Settings 
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
        { id: 'all-materials', label: 'All Materials', icon: Boxes },
        { id: 'standard-materials', label: 'Standard Materials', icon: Layers },
        { id: 'categories', label: 'Categories', icon: Tags }
      ]
    },
    {
      title: 'AI MATCHING',
      items: [
        { id: 'run-matching', label: 'Run Matching', icon: Sparkles },
        { id: 'match-results', label: 'Match Results', icon: GitCompare },
        { id: 'conflicts', label: 'Conflicts', icon: AlertTriangle, badge: '12', badgeColor: 'bg-amber-500/20 text-amber-400' }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'review-queue', label: 'Review Queue', icon: ClipboardCheck, badge: '38', badgeColor: 'bg-amber-500/20 text-amber-400' },
        { id: 'cpse-mapping', label: 'CPSE Mapping', icon: Network },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800 font-sans select-none">
      <div className="overflow-y-auto">
        {/* Logo */}
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">
            M
          </div>
          <div>
            <h1 className="font-bold text-white text-lg tracking-tight leading-none">MatAlign</h1>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Unified Material Intelligence</p>
          </div>
        </div>

        {/* Workspace Selector */}
        <div className="px-4 py-4">
          <div className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl p-2.5 flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-slate-700 border border-slate-600 text-xs font-semibold flex items-center justify-center text-slate-200">
                CP
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-100 leading-tight">CPSE Consortium</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Enterprise workspace</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="px-3 pb-6 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <h2 className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-sky-600/20 text-white border-l-2 border-sky-400'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Documentation</span>
          </button>
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center">
            AK
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200 leading-tight">Ananya Kapoor</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Administrator</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-200 p-1.5 hover:bg-slate-800 rounded-md">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;