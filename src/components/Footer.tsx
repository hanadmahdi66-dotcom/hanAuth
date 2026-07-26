import React from 'react';
import { HanAuthLogo } from './HanAuthLogo';
import { HanOSLogo } from './HanOSLogo';
import { ShieldCheck, Terminal, Cpu, Github, Twitter, Disc as Discord } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: 'landing' | 'register' | 'login' | 'dashboard' | 'privacy' | 'apps') => void;
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

            <div className="flex flex-wrap items-center gap-3">
              {/* Powered by hanOS Badge */}
              <div className="inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md w-fit text-xs text-slate-300">
                <span className="text-slate-400 font-medium">Powered by</span>
                <HanOSLogo size="md" variant="full" />
              </div>

              {/* Founder Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-medium">
                <span>Founder: <strong className="text-white">Hanath Mahdi Updih</strong></span>
              </div>
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
            <button 
              onClick={() => onNavigate?.('apps')} 
              className="text-left text-slate-400 hover:text-blue-400 transition-colors font-semibold text-blue-400 flex items-center gap-1"
            >
              <span>hanOS Suite Apps</span>
            </button>
            <button 
              onClick={() => onNavigate?.('privacy')} 
              className="text-left text-slate-400 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
          </div>

          {/* Links Column 2: hanOS Apps Suite */}
          <div className="md:col-span-2 flex flex-col gap-3 text-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">hanOS Apps</h4>
            <button onClick={() => onNavigate?.('apps')} className="text-left text-slate-400 hover:text-blue-400 transition-colors">
              1. hanFiles
            </button>
            <button onClick={() => onNavigate?.('apps')} className="text-left text-slate-400 hover:text-blue-400 transition-colors">
              2. hanBusiness
            </button>
            <button onClick={() => onNavigate?.('apps')} className="text-left text-slate-400 hover:text-blue-400 transition-colors">
              3. Somaliland Plates
            </button>
            <button onClick={() => onNavigate?.('apps')} className="text-left text-slate-400 hover:text-blue-400 transition-colors">
              4. hanAuth
            </button>
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
                <span>hanOS Cloud Gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Engineered by Hanath Mahdi Updih</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} hanAuth by hanOS. All rights reserved.</span>
            <button onClick={() => onNavigate?.('privacy')} className="hover:text-slate-300 underline">
              Privacy &amp; Policy
            </button>
          </div>

          {/* hanOS Banner Credit */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate?.('apps')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-800/40 text-blue-300 font-medium hover:bg-blue-900/50 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Powered by hanOS Suite
            </button>
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
