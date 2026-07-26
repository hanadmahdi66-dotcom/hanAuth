import React from 'react';
import { HanAuthLogo } from './HanAuthLogo';
import { HanOSLogo } from './HanOSLogo';
import { ShieldCheck, Terminal, Cpu, Github, Twitter, Disc as Discord } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: 'landing' | 'register' | 'dashboard') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 relative overflow-hidden">
      {/* Soft gradient ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="cursor-pointer" onClick={() => onNavigate?.('landing')}>
              <HanAuthLogo size="md" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Secure authentication, secret scoping, and global low-latency API key management platform for modern software engineering teams.
            </p>

            {/* Powered by hanOS Badge */}
            <div className="mt-2 inline-flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md w-fit">
              <span className="text-xs text-slate-400 font-medium">Powered by</span>
              <HanOSLogo size="md" variant="full" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 flex flex-col gap-3 text-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</h4>
            <button 
              onClick={() => onNavigate?.('register')} 
              className="text-left text-slate-400 hover:text-blue-400 transition-colors"
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate?.('dashboard')} 
              className="text-left text-slate-400 hover:text-blue-400 transition-colors"
            >
              API Dashboard
            </button>
            <a href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">
              Security Features
            </a>
            <a href="#playground" className="text-slate-400 hover:text-blue-400 transition-colors">
              Interactive Tester
            </a>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 flex flex-col gap-3 text-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Developers</h4>
            <a href="#docs" className="text-slate-400 hover:text-blue-400 transition-colors">
              API Reference
            </a>
            <a href="https://hanos-cloud.onrender.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
              Backend Endpoint
            </a>
            <a href="#status" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              API Status
            </a>
            <a href="#sdk" className="text-slate-400 hover:text-blue-400 transition-colors">
              SDK Libraries
            </a>
          </div>

          {/* Infrastructure Column */}
          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Infrastructure</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AES-256 Key Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Render Cloud Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                <span>hanOS Kernel Gateway</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} hanAuth by hanOS. All rights reserved.</span>
          </div>

          {/* hanOS Banner Credit */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/40 text-blue-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Powered by hanOS
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <Github className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Discord className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
