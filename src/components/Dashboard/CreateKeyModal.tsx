import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createApiKeyApi } from '../../config/api';
import { ApiKey, UserAccount } from '../../types';
import { 
  KeyRound, 
  X, 
  Loader2, 
  ShieldCheck, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  AlertCircle 
} from 'lucide-react';

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onKeyCreated: (newKey: ApiKey) => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CreateKeyModal: React.FC<CreateKeyModalProps> = ({
  isOpen,
  onClose,
  user,
  onKeyCreated,
  onShowToast,
}) => {
  const [keyName, setKeyName] = useState('Production API Key');
  const [loading, setLoading] = useState(false);
  const [createdKey, setCreatedKey] = useState<ApiKey | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRawKey, setShowRawKey] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // POST to https://hanos-cloud.onrender.com/create-api-key
      // JSON body: { "user_id": user.user_id }
      const newKey = await createApiKeyApi(user.user_id, keyName);
      setLoading(false);
      setCreatedKey(newKey);
      onKeyCreated(newKey);
      onShowToast('API Key Generated', 'New key successfully provisioned on hanOS backend.', 'success');
    } catch (err: unknown) {
      setLoading(false);
      const errMsg = err instanceof Error ? err.message : 'Failed to generate API Key.';
      setError(errMsg);
      onShowToast('Error creating key', errMsg, 'error');
    }
  };

  const copyKeyToClipboard = () => {
    if (!createdKey) return;
    navigator.clipboard.writeText(createdKey.key);
    setCopied(true);
    onShowToast('Copied to Clipboard', 'Store this key securely. It won\'t be shown again.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDone = () => {
    setCreatedKey(null);
    setKeyName('Production API Key');
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative text-slate-100 overflow-hidden"
        >
          {/* Top Line Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          {/* Close button */}
          <button
            onClick={handleDone}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {createdKey ? (
            /* Key Successfully Created View */
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">API Key Generated!</h3>
                  <p className="text-xs text-slate-400">Service: hanOS Cloud Gateway</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Key Name: <strong className="text-slate-200">{createdKey.name}</strong></span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>

                {/* Key value box */}
                <div className="relative flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm">
                  <span className="text-blue-300 font-bold truncate pr-16 select-all">
                    {showRawKey ? createdKey.key : '••••••••••••••••••••••••••••••••'}
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setShowRawKey(!showRawKey)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                      title={showRawKey ? 'Hide key' : 'Show key'}
                    >
                      {showRawKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={copyKeyToClipboard}
                      className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1 text-xs"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-amber-400/90 leading-relaxed bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                  ⚠️ Make sure to copy your API key now. For security reasons, you won't be able to see the full key again.
                </p>
              </div>

              <button
                onClick={handleDone}
                className="w-full py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                Done &amp; View in Dashboard
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleCreateKey} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Create New API Key</h3>
                  <p className="text-xs text-slate-400">Generates a secret key for user ID: <code className="text-blue-300 font-mono">{user.user_id}</code></p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Key Identifier Name
                </label>
                <input
                  type="text"
                  required
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  placeholder="e.g. Production Mobile App"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Payload Preview */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
                <div className="text-[10px] uppercase font-sans font-bold text-slate-500">POST Payload Preview</div>
                <div className="text-blue-300">
                  {JSON.stringify({ user_id: user.user_id }, null, 2)}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provisioning...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Generate Key</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
