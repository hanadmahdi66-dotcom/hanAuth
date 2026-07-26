import React, { useState } from 'react';
import { ApiLogEntry, UserAccount } from '../../types';
import { FileText, Search, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface AccessLogsProps {
  user: UserAccount;
}

const generateMockLogs = (userId: string): ApiLogEntry[] => [
  {
    id: 'log_101',
    timestamp: new Date().toISOString(),
    endpoint: '/create-api-key',
    method: 'POST',
    status: 200,
    ip: '192.168.1.42',
    latency: 18,
    key_prefix: 'han_live_9f8',
  },
  {
    id: 'log_102',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    endpoint: '/register',
    method: 'POST',
    status: 200,
    ip: '192.168.1.42',
    latency: 32,
    key_prefix: 'auth_session',
  },
  {
    id: 'log_103',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    endpoint: '/verify-token',
    method: 'POST',
    status: 200,
    ip: '172.16.0.8',
    latency: 12,
    key_prefix: 'han_live_9f8',
  },
  {
    id: 'log_104',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    endpoint: '/protected-resource',
    method: 'GET',
    status: 401,
    ip: '10.0.0.12',
    latency: 8,
    key_prefix: 'invalid_key',
  },
  {
    id: 'log_105',
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    endpoint: '/create-api-key',
    method: 'POST',
    status: 200,
    ip: '192.168.1.42',
    latency: 22,
    key_prefix: 'han_live_4a1',
  },
];

export const AccessLogs: React.FC<AccessLogsProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState<ApiLogEntry[]>(generateMockLogs(user.user_id));

  const filteredLogs = logs.filter(
    (log) =>
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.key_prefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            Access &amp; Security Audit Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time security telemetry for user <code className="text-blue-300 font-mono">{user.user_id}</code>
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter endpoint or IP..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-5 py-3.5">Method &amp; Endpoint</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Key Prefix</th>
                <th className="px-5 py-3.5">IP Address</th>
                <th className="px-5 py-3.5">Latency</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 text-slate-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 font-bold">
                      <span className={log.method === 'POST' ? 'text-blue-400' : 'text-emerald-400'}>
                        {log.method}
                      </span>
                      <span className="text-slate-100">{log.endpoint}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {log.status === 200 ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        200 OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {log.status} Denied
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-slate-300 font-semibold">
                    {log.key_prefix}
                  </td>
                  <td className="px-5 py-3.5 text-slate-400">{log.ip}</td>
                  <td className="px-5 py-3.5 text-blue-300 font-bold">{log.latency}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
