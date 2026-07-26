import React, { useState } from 'react';
import { ApiKey } from '../../types';
import { 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Trash2, 
  Terminal, 
  Clock, 
  ShieldCheck, 
  MoreVertical 
} from 'lucide-react';

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onCopy: (key: string) => void;
  onRevoke: (id: string) => void;
  onTestKey: (key: ApiKey) => void;
}

export const ApiKeyCard: React.FC<ApiKeyCardProps> = ({
  apiKey,
  onCopy,
  onRevoke,
  onTestKey,
}) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = new Date(apiKey.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 backdrop-blur-xl shadow-lg transition-all text-slate-100 flex flex-col justify-between gap-4 group">
      
      {/* Top Card Bar */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-snug">{apiKey.name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Created {formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {apiKey.status === 'active' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          )}
          {apiKey.status === 'revoked' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Revoked
            </span>
          )}
        </div>
      </div>

      {/* Secret Key Display Box */}
      <div className="relative p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 font-mono text-sm">
        <div className="overflow-hidden truncate">
          {showKey ? (
            <span className="text-blue-300 font-bold select-all">{apiKey.key}</span>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-slate-200 font-bold">{apiKey.prefix}</span>
              <span>••••••••••••••••••••••••</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title={showKey ? 'Hide key' : 'Show full key'}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Key</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>Permissions: <strong className="text-slate-300 font-mono">full_access</strong></span>
          <span>•</span>
          <span>Last used: <strong className="text-slate-300">{apiKey.last_used || 'Just now'}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTestKey(apiKey)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Test Key</span>
          </button>

          {apiKey.status === 'active' && (
            <button
              onClick={() => onRevoke(apiKey.id)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
              title="Revoke Key"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
