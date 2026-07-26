import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { Activity, Zap, ShieldCheck, Cpu } from 'lucide-react';

const mockUsageData = [
  { time: '00:00', requests: 120, latency: 14 },
  { time: '03:00', requests: 240, latency: 12 },
  { time: '06:00', requests: 450, latency: 15 },
  { time: '09:00', requests: 1280, latency: 18 },
  { time: '12:00', requests: 2400, latency: 22 },
  { time: '15:00', requests: 1850, latency: 16 },
  { time: '18:00', requests: 1400, latency: 14 },
  { time: '21:00', requests: 890, latency: 13 },
];

const mockStatusData = [
  { status: '200 OK', count: 8450, fill: '#10B981' },
  { status: '401 Unauthorized', count: 120, fill: '#F59E0B' },
  { status: '429 Rate Limit', count: 45, fill: '#EF4444' },
];

export const UsageAnalytics: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Requests</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">8,615</p>
          <p className="text-xs text-emerald-400 mt-1 font-medium">↑ 12.4% from yesterday</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">14.8 ms</p>
          <p className="text-xs text-emerald-400 mt-1 font-medium">Global p95: 22ms</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Success Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">99.81%</p>
          <p className="text-xs text-slate-400 mt-1">401 Auth blocks active</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Keys</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">4 Keys</p>
          <p className="text-xs text-blue-400 mt-1 font-medium">100% Rate Limit Budget</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Area Chart: Request Volume */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">API Requests Volume (24h)</h3>
            <span className="text-xs text-slate-400 font-mono">Render Gateway Node</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockUsageData}>
                <defs>
                  <linearGradient id="reqGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#reqGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Status Codes */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">HTTP Response Distribution</h3>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="status" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
