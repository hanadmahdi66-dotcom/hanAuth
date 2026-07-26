import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HanAuthLogo } from './HanAuthLogo';
import { HanOSLogo } from './HanOSLogo';
import { 
  KeyRound, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  Lock, 
  Server, 
  Code, 
  CheckCircle2, 
  Layers, 
  Globe2, 
  Activity 
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'register' | 'login' | 'dashboard') => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onShowToast }) => {
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState<'curl' | 'node' | 'python'>('curl');

  const codeSnippets = {
    curl: `curl -X POST "https://hanos-cloud.onrender.com/create-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "usr_9f8a321"}'`,
    node: `import { HanAuth } from '@hanos/auth';

const hanauth = new HanAuth({
  apiKey: process.env.HANAUTH_KEY,
  endpoint: 'https://hanos-cloud.onrender.com'
});

const userKey = await hanauth.createKey({
  userId: 'usr_9f8a321'
});`,
    python: `import requests

response = requests.post(
    "https://hanos-cloud.onrender.com/create-api-key",
    json={"user_id": "usr_9f8a321"}
)

api_key = response.json().get("api_key")`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    onShowToast('Copied to clipboard', 'Code snippet ready to paste in your terminal.', 'success');
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-96 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Subtle Mesh Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* Top Header Navbar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <HanAuthLogo size="md" className="cursor-pointer" />

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#docs" className="hover:text-blue-400 transition-colors">API Docs</a>
          <a href="#endpoint" className="hover:text-blue-400 transition-colors">Cloud Endpoint</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-6 pt-12 pb-20 flex flex-col items-center text-center">
        
        {/* Release Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 backdrop-blur-md mb-8 shadow-inner"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-blue-400 font-semibold">hanAuth v2.4</span> • Powered by hanOS
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </motion.div>

        {/* Brand Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]"
        >
          Developer-first authentication &amp;{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            API key management
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
        >
          Secure authentication and API key management platform. Scoped secrets, instant verification, and zero-latency access control for modern cloud apps.
        </motion.p>

        {/* Hero CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => onNavigate('register')}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl backdrop-blur-xl transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-5 h-5 text-blue-400" />
            <span>Open API Dashboard</span>
          </button>
        </motion.div>

        {/* Developer Terminal Snippet Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          id="docs"
          className="mt-16 w-full max-w-3xl rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-2xl overflow-hidden text-left"
        >
          {/* Card Header Bar */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-slate-400">
                POST /create-api-key
              </span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('curl')}
                className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                  activeTab === 'curl' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setActiveTab('node')}
                className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                  activeTab === 'node' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Node.js
              </button>
              <button
                onClick={() => setActiveTab('python')}
                className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                  activeTab === 'python' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Python
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm overflow-x-auto relative group">
            <button
              onClick={() => copyToClipboard(codeSnippets[activeTab])}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs"
            >
              {copiedSnippet ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <pre className="text-blue-300 leading-relaxed">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          {/* Endpoint Live Status Bar */}
          <div id="endpoint" className="px-5 py-3 bg-slate-950/60 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Base API: <code className="text-slate-200 font-mono">https://hanos-cloud.onrender.com</code></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-medium">Render Cloud Online</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div id="features" className="mt-28 w-full">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Core Security Architecture</h2>
            <p className="text-3xl font-extrabold text-white">Engineered for developer performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-left hover:border-blue-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Key Provisioning</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate production API keys connected directly to user identity with automated endpoint routing and prefix masking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-left hover:border-indigo-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Granular Scopes</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Assign strict read, write, and verification permissions per key. Instant key revocation and security audit logging.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-left hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sub-10ms Latency</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Powered by hanOS high-performance kernel gateway hosted on Render Cloud, ensuring lightning fast authentication loops.
              </p>
            </div>
          </div>
        </div>

        {/* Live Interactive Quick Demo Section */}
        <div className="mt-20 w-full p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs text-blue-300 font-semibold mb-3">
              <Activity className="w-3.5 h-3.5" />
              Ready for Production
            </div>
            <h3 className="text-2xl font-bold text-white">Start managing API keys in under 60 seconds</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Create your account on hanAuth, connect to our REST backend endpoints, and generate secure keys instantly.
            </p>
          </div>

          <button
            onClick={() => onNavigate('register')}
            className="shrink-0 px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center gap-3"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};
