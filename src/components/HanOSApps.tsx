import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderLock, 
  Calculator, 
  Car, 
  KeyRound, 
  ArrowLeft, 
  ExternalLink, 
  User, 
  Cpu, 
  Sparkles,
  ShieldCheck,
  Building2,
  FileCheck,
  CheckCircle
} from 'lucide-react';
import { HanAuthLogo } from './HanAuthLogo';
import { HanOSLogo } from './HanOSLogo';
import { Footer } from './Footer';

interface HanOSAppsProps {
  onNavigate: (view: 'landing' | 'register' | 'login' | 'dashboard' | 'privacy' | 'apps') => void;
}

export const HanOSApps: React.FC<HanOSAppsProps> = ({ onNavigate }) => {
  const applications = [
    {
      id: 'hanfiles',
      name: 'hanFiles',
      tagline: 'Encrypted Cloud Storage & Document Vault',
      description: 'Ultra-secure cloud file storage platform featuring client-side end-to-end encryption, multi-tenant file sharing, and instant file access control.',
      category: 'Cloud Storage & Files',
      icon: FolderLock,
      color: 'from-blue-500 to-cyan-500',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      features: ['End-to-End Encryption', 'Granular File Permissions', 'Zero-Knowledge Vault', 'High-Speed CDN Delivery'],
      status: 'Production Live'
    },
    {
      id: 'hanbusiness',
      name: 'hanBusiness',
      tagline: 'Enterprise Financial Ledger & Accounting System',
      description: 'Comprehensive business ledger and financial management tool designed for automated bookkeeping, expense tracking, invoicing, and real-time ledger audits.',
      category: 'Fintech & Accounting',
      icon: Calculator,
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      features: ['Double-Entry Ledger', 'Automated Expense Analytics', 'Multi-currency Auditing', 'Real-time Financial Reports'],
      status: 'Production Live'
    },
    {
      id: 'somaliland-plates',
      name: 'Somaliland Plates',
      tagline: 'Vehicle Registration & License Plate Recognition System',
      description: 'Automated vehicle registration system and intelligent license plate recognition platform engineered for modern traffic administration and transport authorities.',
      category: 'Smart Transportation & Civic Tech',
      icon: Car,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      features: ['Automated Plate Scanning', 'Vehicle Registration Database', 'Real-time Ownership Lookup', 'Official Compliance Audits'],
      status: 'Production Live'
    },
    {
      id: 'hanauth',
      name: 'hanAuth',
      tagline: 'Developer API Key & Identity Infrastructure',
      description: 'High-performance identity gateway and secret API key management platform. Scoped permissions, instant key revocation, and low-latency gateway routing.',
      category: 'Security & Developer Tools',
      icon: KeyRound,
      color: 'from-indigo-500 to-blue-600',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      features: ['Sub-10ms Gateway Latency', 'Salted Key Hashing', 'Developer Playground & SDKs', 'Live Traffic Logs'],
      status: 'Active (Current App)',
      currentApp: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <HanAuthLogo size="md" className="cursor-pointer" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('privacy')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 rounded-xl transition-all"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Banner Pill */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Official Product Portfolio</span> • Powered by hanOS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Applications Created by{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              hanOS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            Explore the ecosystem of software applications engineered on the hanOS kernel. Architected and led by Founder <strong className="text-white">Hanath Mahdi Updih</strong>.
          </motion.p>
        </div>

        {/* Founder Credit Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 backdrop-blur-xl shadow-2xl mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-indigo-500/30 border-2 border-indigo-400/60 shadow-2xl shadow-indigo-500/30 shrink-0 bg-slate-900 group">
              <img 
                src="/assets/aistudio/Screenshot_20261022_231441_Photos_0dd7f497.png" 
                alt="Hanath Mahdi Updih - Founder of hanOS"
                className="w-full h-full object-cover object-[center_38%] scale-110 group-hover:scale-115 transition-transform duration-300"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm" title="Active & Verified Founder" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-mono font-semibold uppercase tracking-wider mb-1">
                Founder &amp; Chief Architect
              </div>
              <h2 className="text-2xl font-bold text-white">Hanath Mahdi Updih</h2>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">
                Creator of hanOS and its flagship applications: <span className="text-blue-400 font-semibold">hanFiles</span>, <span className="text-purple-400 font-semibold">hanBusiness</span>, <span className="text-emerald-400 font-semibold">Somaliland Plates</span>, and <span className="text-indigo-400 font-semibold">hanAuth</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
              <Cpu className="w-4 h-4 text-blue-400 shrink-0" />
              <span>hanOS Platform Gateway</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Operational Ecosystem</span>
            </div>
          </div>
        </motion.div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className={`p-8 rounded-3xl bg-slate-900/70 border backdrop-blur-xl flex flex-col justify-between transition-all hover:border-slate-700 relative overflow-hidden group ${
                  app.currentApp ? 'border-indigo-500/40 shadow-xl shadow-indigo-500/10' : 'border-slate-800/80'
                }`}
              >
                {/* Accent Background Glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${app.color} opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity`} />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} p-0.5 shadow-lg`}>
                        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-white">{app.name}</h3>
                          {app.currentApp && (
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
                              Current App
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{app.category}</span>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${app.badgeColor}`}>
                      {app.status}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-slate-200 mb-2">{app.tagline}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {app.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-8">
                    {app.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Created by <strong className="text-slate-200">hanOS</strong></span>
                  </div>

                  {app.currentApp ? (
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-md flex items-center gap-1.5"
                    >
                      Open hanAuth Dashboard
                    </button>
                  ) : (
                    <span className="text-slate-400 font-mono text-[11px] bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      hanOS Platform Suite
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
