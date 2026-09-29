import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronRight, X, User, LogOut, Settings, CheckCircle2 } from 'lucide-react';

const TopBar = ({ activePage, setActivePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const searchInputRef = useRef(null);

  // Keyboard shortcut listener for CMD/CTRL + K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    setHasUnread(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E2E8F0] px-8 flex items-center justify-between sticky top-0 z-30 font-sans">
      {/* Dynamic Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <span 
          onClick={() => setActivePage && setActivePage('dashboard')}
          className="hover:text-indigo-600 cursor-pointer transition-colors"
        >
          Workspace
        </span>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-semibold capitalize">
          {activePage ? activePage.replace('-', ' ') : 'Dashboard'}
        </span>
      </div>

      {/* Right Search & Action Section */}
      <div className="flex items-center gap-4 relative">
        
        {/* Functional Search Bar */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search materials..."
            className="w-full bg-slate-50 border border-[#E2E8F0] rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs pointer-events-none">
              ⌘ K
            </kbd>
          )}
        </div>

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button 
            onClick={handleNotificationClick}
            className={`p-2 rounded-lg transition-all relative ${
              showNotifications 
                ? 'bg-slate-100 text-indigo-600' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 border border-white"></span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-lg p-3 z-50 text-xs animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-slate-400">Marked all as read</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-indigo-50/50 border border-indigo-100 rounded-lg flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">AI Matching Complete</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Processed 12,400 CPSE items successfully.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold cursor-pointer transition-all ${
              showProfileMenu 
                ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50 text-indigo-700' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            AK
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-1 z-50 text-xs animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-800">Ananya Kapoor</p>
                <p className="text-[10px] text-slate-400 mt-0.5">ananya@matalign.gov.in</p>
              </div>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  if (setActivePage) setActivePage('settings');
                }}
                className="w-full text-left px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Profile Settings</span>
              </button>
              <button 
                onClick={() => {
                  setShowProfileMenu(false);
                  if (setActivePage) setActivePage('settings');
                }}
                className="w-full text-left px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Preferences</span>
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button 
                onClick={() => alert("Logging out...")}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-red-500" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default TopBar;