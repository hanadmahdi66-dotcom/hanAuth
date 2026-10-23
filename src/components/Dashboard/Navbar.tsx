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
    seo: 'Google Search Console & SEO Center',
    apps: 'hanOS Platform Applications',
    privacy: 'Privacy Policy & Data Security',
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

        {/* Founder Pill in Header */}
        <div 
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs shadow-sm hover:border-slate-700 transition-colors"
          title="Founder & Chief Architect: Hanath Mahdi Updih (hanOS)"
        >
          <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-blue-500/70 shrink-0">
            <img 
              src="/assets/aistudio/Screenshot_20261022_231441_Photos_0dd7f497.png" 
              alt="Hanath Mahdi Updih" 
              className="w-full h-full object-cover object-[center_38%] scale-110" 
            />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 border border-slate-950 rounded-full" />
          </div>
          <div className="hidden xl:flex flex-col text-left leading-tight">
            <span className="text-[8px] text-blue-400 font-bold uppercase tracking-wider">Founder</span>
            <span className="text-[11px] text-slate-200 font-medium">Hanath Mahdi Updih</span>
          </div>
        </div>

        {/* Backend Endpoint Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <Server className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono text-[11px] text-slate-300">hanOS Cloud Gateway</span>
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
