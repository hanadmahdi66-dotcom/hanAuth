import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ApiKeyCard } from './ApiKeyCard';
import { CreateKeyModal } from './CreateKeyModal';
import { Playground } from './Playground';
import { UsageAnalytics } from './UsageAnalytics';
import { AccessLogs } from './AccessLogs';
import { DeveloperDocs } from './DeveloperDocs';
import { SettingsTab } from './SettingsTab';
import { Footer } from '../Footer';
import { ApiKey, DashboardTab, UserAccount } from '../../types';
import { KeyRound, Plus, ShieldCheck, Terminal, AlertCircle } from 'lucide-react';

interface DashboardViewProps {
  user: UserAccount;
  apiKeys: ApiKey[];
  onKeyCreated: (newKey: ApiKey) => void;
  onRevokeKey: (keyId: string) => void;
  onLogout: () => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onNavigateLanding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  apiKeys,
  onKeyCreated,
  onRevokeKey,
  onLogout,
  onShowToast,
  onUpdateUser,
  onNavigateLanding,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('keys');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [environment, setEnvironment] = useState<'live' | 'test'>('live');
  const [selectedKeyForTest, setSelectedKeyForTest] = useState<ApiKey | undefined>(undefined);

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    onShowToast('Copied to Clipboard', 'API secret key copied successfully.', 'success');
  };

  const handleTestKey = (key: ApiKey) => {
    setSelectedKeyForTest(key);
    setActiveTab('playground');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative">
      
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen justify-between">
        <div>
          {/* Navbar */}
          <Navbar
            activeTab={activeTab}
            user={user}
            onOpenCreateModal={() => setIsModalOpen(true)}
            environment={environment}
            onToggleEnv={() => setEnvironment(environment === 'live' ? 'test' : 'live')}
          />

          {/* Main Tab Views */}
          <main className="pb-16">
            
            {/* 1. API Keys Management Tab */}
            {activeTab === 'keys' && (
              <div className="p-6 max-w-7xl mx-auto space-y-6">
                
                {/* Banner / Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 backdrop-blur-xl shadow-xl">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-blue-400" />
                      Live Secret API Keys
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Keys provisioned here connect to <code className="text-blue-300 font-mono">https://hanos-cloud.onrender.com</code> for user <span className="font-mono text-emerald-400 font-semibold">{user.user_id}</span>.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create API Key</span>
                  </button>
                </div>

                {/* API Keys Grid / List */}
                {apiKeys.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">No API Keys Found</h3>
                    <p className="text-xs text-slate-400 max-w-md">
                      Generate your first secret key to authenticate requests with hanos-cloud.onrender.com
                    </p>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create API Key</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {apiKeys.map((key) => (
                      <ApiKeyCard
                        key={key.id}
                        apiKey={key}
                        onCopy={handleCopyKey}
                        onRevoke={onRevokeKey}
                        onTestKey={handleTestKey}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. Interactive Tester */}
            {activeTab === 'playground' && (
              <Playground
                apiKeys={apiKeys}
                user={user}
                selectedKey={selectedKeyForTest}
                onShowToast={onShowToast}
              />
            )}

            {/* 3. Analytics */}
            {activeTab === 'analytics' && <UsageAnalytics />}

            {/* 4. Logs */}
            {activeTab === 'logs' && <AccessLogs user={user} />}

            {/* 5. Docs */}
            {activeTab === 'docs' && (
              <DeveloperDocs
                user={user}
                apiKeys={apiKeys}
                onShowToast={onShowToast}
              />
            )}

            {/* 6. Settings */}
            {activeTab === 'settings' && (
              <SettingsTab
                user={user}
                onUpdateUser={onUpdateUser}
                onShowToast={onShowToast}
              />
            )}
          </main>
        </div>

        {/* Dashboard Footer with Powered by hanOS */}
        <Footer onNavigate={onNavigateLanding} />
      </div>

      {/* Modal for Creating API Key */}
      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onKeyCreated={onKeyCreated}
        onShowToast={onShowToast}
      />
    </div>
  );
};
