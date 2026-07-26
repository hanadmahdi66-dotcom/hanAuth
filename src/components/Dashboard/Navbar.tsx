import React from 'react';
import { DashboardTab, UserAccount } from '../../types';
import { KeyRound, Search, Bell, Sparkles, Server, Check } from 'lucide-react';

interface NavbarProps {
  activeTab: DashboardTab;
  user: UserAccount;
  onOpenCreateModal: () => void;
  environment: 'live' | 'test';
  onToggleEnv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  user,
  onOpenCreateModal,
  environment,
  onToggleEnv,
}) => {
  const tabTitles: Record<DashboardTab, string> = {
    keys: 'API Keys Management',
    playground: 'Interactive API Key Tester',
    analytics: 'Usage Analytics & Metrics',
    logs: 'Access & Security Logs',
    docs: 'Developer Documentation & SDKs',
    settings: 'Account & Security Settings',
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20">
      
      {/* Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-400">Dashboard</span>
        <span className="text-slate-600">/</span>
        <h1 className="text-sm font-bold text-white">{tabTitles[activeTab]}</h1>
      </div>

      {/* Right Navbar Controls */}
      <div className="flex items-center gap-3">
        
        {/* Environment Switcher */}
        <button
          onClick={onToggleEnv}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium transition-colors"
        >
          <span className={`w-2 h-2 rounded-full ${environment === 'live' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="text-slate-300">Env:</span>
          <span className="text-white font-semibold uppercase">{environment}</span>
        </button>

        {/* Backend Endpoint Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <Server className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono text-[11px] text-slate-300">hanos-cloud.onrender.com</span>
        </div>

        {/* Create API Key Quick Button */}
        <button
          onClick={onOpenCreateModal}
          className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Create API Key</span>
        </button>
      </div>
    </header>
  );
};
