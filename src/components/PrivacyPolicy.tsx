import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, EyeOff, Server, FileText, ArrowLeft, CheckCircle2, User, Cpu } from 'lucide-react';
import { HanAuthLogo } from './HanAuthLogo';
import { HanOSLogo } from './HanOSLogo';
import { Footer } from './Footer';

interface PrivacyPolicyProps {
  onNavigate: (view: 'landing' | 'register' | 'login' | 'dashboard' | 'privacy' | 'apps') => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-indigo-600/15 via-blue-600/10 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

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
            onClick={() => onNavigate('apps')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 rounded-xl transition-all"
          >
            hanOS Apps
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
      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        {/* Title Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-md"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official hanOS Privacy & Security Statement</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
        >
          Privacy Policy &amp; Data Security
        </motion.h1>

        <p className="text-slate-400 text-base leading-relaxed mb-8">
          Last updated: July 2026. This policy governs data protection across <strong className="text-slate-200">hanAuth</strong> and the <strong className="text-slate-200">hanOS</strong> platform suite founded by <strong className="text-blue-400">Hanath Mahdi Updih</strong>.
        </p>

        {/* Founder & Organization Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 backdrop-blur-xl mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-0.5">Platform Founder &amp; Architect</div>
              <div className="text-lg font-bold text-white">Hanath Mahdi Updih</div>
              <div className="text-xs text-slate-400 mt-0.5">Creator of hanOS Ecosystem (hanAuth, hanFiles, hanBusiness, Somaliland Plates)</div>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Powered by hanOS Kernel</span>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          
          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3 text-white font-bold text-lg">
              <Lock className="w-5 h-5 text-blue-400" />
              <h2>1. Zero Plain-Text Secret Key Storage</h2>
            </div>
            <p className="text-slate-400 mb-3">
              hanAuth strictly operates on zero-knowledge secret key hashing principles. When an API key is created, the plain-text string is presented to the user <strong className="text-slate-200">exactly once</strong>.
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-400">
              <li>Only salted high-entropy SHA-256 hashes are saved to our persistent storage.</li>
              <li>Even system administrators and founders cannot retrieve your raw secret API key once generated.</li>
              <li>Instant key revocation terminates all authentication rights across edge gateways in sub-10ms.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3 text-white font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2>2. Information We Collect</h2>
            </div>
            <p className="text-slate-400 mb-3">
              To provide authentication, API key scoping, and audit logs, hanAuth collects minimal account telemetry:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Account Credentials</strong>
                  Work email address, organization name, and bcrypt/scrypt salted password hashes.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">API Gateway Telemetry</strong>
                  Anonymized request metrics, status codes, latency histograms, and masked caller IP addresses.
                </div>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3 text-white font-bold text-lg">
              <Server className="w-5 h-5 text-purple-400" />
              <h2>3. Ecosystem Integration Across hanOS Applications</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-3">
              hanAuth serves as the central identity &amp; security backbone for all applications engineered under the <strong className="text-white">hanOS</strong> platform suite created by <strong className="text-blue-400">Hanath Mahdi Updih</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-blue-400 text-sm block">1. hanFiles</strong>
                Cloud file storage and encrypted document sharing system.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-purple-400 text-sm block">2. hanBusiness</strong>
                Double-entry financial ledger and business bookkeeping system.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-400 text-sm block">3. Somaliland Plates</strong>
                Automated license plate recognition and vehicle registration database.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-indigo-400 text-sm block">4. hanAuth</strong>
                Developer API key management and identity gateway (this platform).
              </div>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3 text-white font-bold text-lg">
              <EyeOff className="w-5 h-5 text-amber-400" />
              <h2>4. Third-Party Sharing &amp; Data Rights</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We <strong className="text-white">never sell, rent, or trade</strong> your developer credentials or API telemetry to third parties or advertising brokers. You retain 100% ownership of your developer data. You may request account closure and complete data wipe at any time from your settings panel.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3 text-white font-bold text-lg">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h2>5. Contact &amp; Security Compliance</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              For security vulnerability disclosures, privacy inquiries, or enterprise compliance requests regarding <strong className="text-white">hanOS</strong> products, contact Founder <strong className="text-white">Hanath Mahdi Updih</strong> or our team at <code className="text-blue-300 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">security@hanos.io</code>.
            </p>
          </section>

        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
