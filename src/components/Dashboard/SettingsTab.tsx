import React, { useState } from 'react';
import { UserAccount } from '../../types';
import { Settings, Shield, User, Key, Save, Check, Bell } from 'lucide-react';

interface SettingsTabProps {
  user: UserAccount;
  onUpdateUser: (updatedUser: UserAccount) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  user,
  onUpdateUser,
  onShowToast,
}) => {
  const [orgName, setOrgName] = useState(user.organization || `${user.email.split('@')[0]}'s Workspace`);
  const [rateLimit, setRateLimit] = useState('1000 req / minute');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      organization: orgName,
    });
    setSaved(true);
    onShowToast('Settings Saved', 'Your organization settings were updated.', 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-400" />
          Account &amp; Workspace Settings
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage identity, organization parameters, and default API key policies
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* User Identity Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-blue-400" />
            User Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">User ID</label>
              <input
                type="text"
                readOnly
                value={user.user_id}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-mono text-xs focus:outline-none select-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="text"
                readOnly
                value={user.email}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Organization & Policy Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="w-4 h-4 text-indigo-400" />
            Organization &amp; API Policies
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">API Key Default Rate Limit</label>
              <select
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="500 req / minute">500 requests / minute</option>
                <option value="1000 req / minute">1,000 requests / minute (Standard)</option>
                <option value="5000 req / minute">5,000 requests / minute (Enterprise)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
