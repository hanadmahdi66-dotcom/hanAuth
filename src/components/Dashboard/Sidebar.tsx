import React from 'react';
import { HanAuthLogo } from '../HanAuthLogo';
import { HanOSLogo } from '../HanOSLogo';
import { DashboardTab, UserAccount } from '../../types';
import { 
  KeyRound, 
  Terminal, 
  Activity, 
  FileText, 
  BookOpen, 
  Settings, 
  LogOut, 
  User, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface SidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  user: UserAccount;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  user,
  onLogout,
}) => {
  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'keys', label: 'API Keys', icon: <KeyRound className="w-4 h-4" /> },
    { id: 'playground', label: 'Interactive Tester', icon: <Terminal className="w-4 h-4" />, badge: 'Live' },
    { id: 'analytics', label: 'Usage & Latency', icon: <Activity className="w-4 h-4" /> },
    { id: 'logs', label: 'Access Audit Logs', icon: <FileText className="w-4 h-4" /> },
    { id: 'docs', label: 'API Docs & SDKs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 text-slate-300">
      
      {/* Top Header */}
      <div className="p-5 flex flex-col gap-6">
        <HanAuthLogo size="md" />

        {/* User Organization Pill */}
        <div className="px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-slate-200 truncate">
              {user.organization || user.email.split('@')[0]}
            </span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 shrink-0">
            {user.plan || 'Free'}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          <div className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & hanOS branding */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950">
        
        {/* Render Cloud Backend link */}
        <a
          href="https://hanos-cloud.onrender.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Backend API Node</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        {/* User Card */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/50">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-xs font-semibold text-white truncate">{user.email}</p>
              <p className="text-[10px] font-mono text-slate-400 truncate">ID: {user.user_id}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Powered by hanOS Footer Badge */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 border-t border-slate-900">
          <span>Powered by</span>
          <HanOSLogo size="sm" variant="badge" />
        </div>
      </div>
    </aside>
  );
};
