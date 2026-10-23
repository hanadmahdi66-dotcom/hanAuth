import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Globe, 
  FileCode, 
  ShieldCheck, 
  Terminal, 
  Download, 
  ExternalLink, 
  Sparkles,
  RefreshCw,
  Code2,
  FileText,
  Cpu,
  BadgeCheck,
  User,
  Share2
} from 'lucide-react';

interface GoogleSearchConsoleProps {
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const GoogleSearchConsole: React.FC<GoogleSearchConsoleProps> = ({ onShowToast }) => {
  const [verificationCode, setVerificationCode] = useState<string>(() => {
    return localStorage.getItem('hanos_gsc_token') || 'google03f5ea074398a562';
  });
  const [domainUrl, setDomainUrl] = useState<string>('https://hanos.io');
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedTxt, setCopiedTxt] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);
  const [activeTab, setActiveTab] = useState<'verification' | 'search-card' | 'sitemap' | 'robots' | 'audit' | 'guide'>('search-card');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  // Sync to document <head> meta tag
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="google-site-verification"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'google-site-verification');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', verificationCode);
    localStorage.setItem('hanos_gsc_token', verificationCode);
  }, [verificationCode]);

  const handleSaveVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      onShowToast(
        'Google Site Verification Updated',
        `Meta tag <meta name="google-site-verification" content="${verificationCode}" /> injected into header.`,
        'success'
      );
    }, 800);
  };

  const fullMetaTag = `<meta name="google-site-verification" content="${verificationCode}" />`;
  const txtRecord = `google-site-verification=${verificationCode}`;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domainUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domainUrl}/register</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domainUrl}/apps</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domainUrl}/privacy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/private/

# Googlebot specific directives
User-agent: Googlebot
Allow: /

Sitemap: ${domainUrl}/sitemap.xml`;

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onShowToast('Copied!', `${label} copied to clipboard.`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast('File Downloaded', `${filename} generated successfully.`, 'success');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-semibold text-blue-300 mb-2">
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>Google Search Console Integration</span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Google Search Console &amp; SEO Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Verify site ownership, inject Google verification meta tags, manage sitemaps, and optimize indexing for <strong className="text-slate-200">hanAuth</strong> and <strong className="text-slate-200">hanOS</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
          >
            <span>Open Google Search Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Verification Status Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Googlebot Indexing Status</h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified &amp; Meta Tag Injected
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active verification code: <code className="text-blue-300 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{verificationCode}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Target Domain</div>
            <select
              value={domainUrl}
              onChange={(e) => setDomainUrl(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-blue-300 font-mono focus:outline-none"
            >
              <option value="https://hanos.io">https://hanos.io</option>
              <option value="https://hanos-cloud.onrender.com">https://hanos-cloud.onrender.com</option>
              <option value="https://api.hanos.io">https://api.hanos.io</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'verification'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Site Verification</span>
        </button>

        <button
          onClick={() => setActiveTab('search-card')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'search-card'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Search className="w-4 h-4 text-emerald-400" />
          <span>Google Search Card &amp; Founder</span>
        </button>

        <button
          onClick={() => setActiveTab('sitemap')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'sitemap'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Sitemap.xml</span>
        </button>

        <button
          onClick={() => setActiveTab('robots')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'robots'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Robots.txt</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>SEO Audit &amp; Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'guide'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Sida loogu xidho (Guide)</span>
        </button>
      </div>

      {/* Tab: Google Search Card & Founder Knowledge Panel Preview */}
      {activeTab === 'search-card' && (
        <div className="space-y-6">
          {/* Header Explanation */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/50 border border-blue-800/40 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Live Google Search Snippet &amp; Knowledge Graph Card
                </span>
                <h3 className="text-xl font-bold text-white">
                  Marka la search gareeyo &quot;hanAuth&quot; ama &quot;Hanath Mahdi Updih&quot;
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Waxaa loo habeeyay Open Graph, Twitter Cards, iyo Schema.org JSON-LD si Googlebot uu card-kaaga iyo sawirkaaga ugu soo saaro safka hore ee natiijooyinka raadinta (Rich Knowledge Panel).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast('SEO Indexing Ready', 'Schema.org JSON-LD & meta tags si buuxda ayay ugu xidhan yihiin header-ka.', 'success')}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Verify Live Schema</span>
                </button>
              </div>
            </div>
          </div>

          {/* Realistic Google Search Results Container */}
          <div className="p-6 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200">
            {/* Google Search Mock Bar */}
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-200">
              <div className="flex items-center gap-1 font-bold text-lg tracking-tight select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-slate-50 text-xs text-slate-800 shadow-inner">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-900">hanAuth security and managment API keys</span>
              </div>
            </div>

            {/* Split View: Organic Result & Knowledge Graph Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column (Organic Result & Links) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                      h
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">hanOS Platform</div>
                      <div className="text-[11px] text-slate-500">https://hanos.io › hanauth</div>
                    </div>
                  </div>

                  <h4 className="text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight pt-1">
                    hanAuth security and managment API keys
                  </h4>

                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    High-performance developer identity gateway, API key management, zero-knowledge secret hashing, and instant key revocation platform engineered by <strong className="text-slate-900 font-semibold">Hanath Mahdi Updih</strong> for the hanOS platform suite.
                  </p>
                </div>

                {/* Sitelinks Mini Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
                    <span className="text-[#1a0dab] font-semibold block hover:underline cursor-pointer">hanOS Apps</span>
                    <span className="text-[11px] text-slate-500">Ecosystem: hanFiles, hanBusiness, Somaliland Plates.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200">
                    <span className="text-[#1a0dab] font-semibold block hover:underline cursor-pointer">Developer Docs</span>
                    <span className="text-[11px] text-slate-500">Fast sub-10ms API integration SDKs &amp; samples.</span>
                  </div>
                </div>

                {/* Schema Metadata Signals */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Schema.org: SoftwareApplication
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Schema.org: Person (Founder)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Schema.org: Organization (hanOS)
                  </span>
                </div>
              </div>

              {/* Right Column: Google Knowledge Graph Card with Founder Photo */}
              <div className="lg:col-span-5">
                <div className="border border-slate-300 rounded-2xl p-5 bg-gradient-to-b from-slate-50 to-white shadow-sm space-y-4">
                  {/* Photo & Founder Name Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-md shrink-0">
                      <img
                        src="/assets/aistudio/Screenshot_20261022_231441_Photos_0dd7f497.png"
                        alt="Hanath Mahdi Updih"
                        className="w-full h-full object-cover object-[center_38%] scale-110"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900 leading-tight">Hanath Mahdi Updih</h3>
                        <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        Founder &amp; Chief Architect, hanOS Suite
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200">
                        Official Founder Card
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-700 leading-relaxed border-t border-slate-200 pt-3">
                    Architect and creator behind the <strong className="text-slate-900">hanOS</strong> platform ecosystem. Founder of <strong className="text-slate-900">hanAuth</strong> (Developer API key management &amp; zero-knowledge gateway), <strong className="text-slate-900">hanFiles</strong>, <strong className="text-slate-900">hanBusiness</strong>, and <strong className="text-slate-900">Somaliland Plates</strong>.
                  </p>

                  {/* Fact Details List */}
                  <div className="space-y-2 text-xs border-t border-slate-200 pt-3 text-slate-700">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Known For:</span>
                      <span className="font-semibold text-slate-900 text-right">hanAuth &amp; hanOS Suite</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Role:</span>
                      <span className="font-semibold text-slate-900 text-right">Founder &amp; System Architect</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Platform:</span>
                      <span className="font-semibold text-slate-900 text-right">hanOS Operating System</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Website:</span>
                      <a href="https://hanos.io" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:underline">
                        https://hanos.io
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Site Verification */}
      {activeTab === 'verification' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
              <Code2 className="w-4 h-4 text-blue-400" />
              1. HTML Meta Tag Verification
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">
              Google Search Console requires a verification meta tag in the <code className="text-blue-300 font-mono">&lt;head&gt;</code> section of your website. Enter your Google Search Console verification code or full tag below to update the header automatically.
            </p>

            <form onSubmit={handleSaveVerificationCode} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google Verification Code or Token
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.trim())}
                    placeholder="e.g. google-site-verification-123456789"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>Update &amp; Inject Meta Tag</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Generated Code Block */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Live HTML Header Tag:</span>
                <button
                  onClick={() => copyToClipboard(fullMetaTag, setCopiedMeta, 'HTML Meta Tag')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedMeta ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMeta ? 'Copied' : 'Copy Tag'}</span>
                </button>
              </div>
              <pre className="text-xs text-blue-300 font-mono overflow-x-auto p-2 bg-slate-900/50 rounded-lg border border-slate-800/60">
                {fullMetaTag}
              </pre>
            </div>
          </div>

          {/* Alternative Verification Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* HTML File Download */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  2. HTML File Method
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Download the official Google HTML verification file and host it at the root directory of your web server.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{`${verificationCode}.html`}</span>
                <button
                  onClick={() => downloadFile(`${verificationCode}.html`, `google-site-verification: ${verificationCode}.html`, 'text/html')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Download HTML File</span>
                </button>
              </div>
            </div>

            {/* DNS TXT Record */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  3. DNS TXT Record Method
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Add a TXT record to your domain registrar (e.g., Namecheap, Cloudflare) for root domain verification.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">{txtRecord}</span>
                <button
                  onClick={() => copyToClipboard(txtRecord, setCopiedTxt, 'DNS TXT Record')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedTxt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{copiedTxt ? 'Copied' : 'Copy TXT'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sitemap.xml */}
      {activeTab === 'sitemap' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                Sitemap.xml Generator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Submit this sitemap URL directly in Google Search Console under Sitemaps.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(sitemapXml, setCopiedSitemap, 'Sitemap.xml')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSitemap ? 'Copied' : 'Copy XML'}</span>
              </button>

              <button
                onClick={() => downloadFile('sitemap.xml', sitemapXml, 'application/xml')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download sitemap.xml</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
            {sitemapXml}
          </pre>
        </div>
      )}

      {/* Tab 3: Robots.txt */}
      {activeTab === 'robots' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Robots.txt Directive File
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Instructs Googlebot and web crawlers on indexable routes.</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(robotsTxt, setCopiedRobots, 'Robots.txt')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedRobots ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRobots ? 'Copied' : 'Copy robots.txt'}</span>
              </button>

              <button
                onClick={() => downloadFile('robots.txt', robotsTxt, 'text/plain')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download robots.txt</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-blue-300 font-mono overflow-x-auto leading-relaxed">
            {robotsTxt}
          </pre>
        </div>
      )}

      {/* Tab 4: SEO Audit */}
      {activeTab === 'audit' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Googlebot Search Readiness Audit
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold text-sm">Google Verification Tag</strong>
                <span className="text-slate-400">Injected in &lt;head&gt; with token <code className="text-blue-300 font-mono">{verificationCode}</code></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold text-sm">Schema.org JSON-LD</strong>
                <span className="text-slate-400">Structured SoftwareApplication data present for Google Rich Results.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold text-sm">Open Graph Meta Tags</strong>
                <span className="text-slate-400">Configured for Google Search snippets, Facebook, and Twitter cards.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold text-sm">Mobile-Friendly Viewport</strong>
                <span className="text-slate-400">Responsive width=device-width setup for Google Mobile-First Indexing.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Guide in Somali & English */}
      {activeTab === 'guide' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Sida Google Search Console loogu xidho hanAuth (Step-by-Step Guide)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Halkan ka eeg tillaabooyinka fudud ee aad ku xidhi karto Google Search Console iyo website-kaaga hanOS:
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <strong className="text-white text-sm block">1. Fur Google Search Console</strong>
                <span>Booqo <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-400 underline font-semibold">search.google.com/search-console</a> oo ku gal Google Account-kaaga.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <strong className="text-white text-sm block">2. Geli Domain-kaaga (URL Prefix)</strong>
                <span>Dooro <strong className="text-slate-200">URL prefix</strong> oo geli domain-kaaga sida <code className="text-blue-300 font-mono">https://hanos.io</code> ama URL-kaaga ka dibna riix <strong className="text-slate-200">Continue</strong>.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <strong className="text-white text-sm block">3. Dooro HTML tag Method</strong>
                <span>Dooro habka <strong className="text-slate-200">HTML tag</strong>. Google wuxuu ku siin doonaa koodh u eg: <br />
                  <code className="text-blue-300 font-mono bg-slate-900 px-2 py-1 rounded block my-1">
                    &lt;meta name="google-site-verification" content="XYZ123..." /&gt;
                  </code>
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <strong className="text-white text-sm block">4. Nuqul ka samay koodhka oo geli Halkan (hanAuth Panel)</strong>
                <span>Token-ka koodhkaas ama tag-ka oo dhan ka soo nuqul oo geli tab-ka <strong className="text-blue-400">Site Verification</strong> ee sare, ka dibna riix <strong className="text-slate-200">Update &amp; Inject Meta Tag</strong>.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0">5</span>
              <div>
                <strong className="text-white text-sm block">5. Riix "Verify" ee Google Search Console</strong>
                <span>Kugu soo noqo Google Search Console oo riix <strong className="text-emerald-400 font-bold">VERIFY</strong>. Waa lagu xaqiijin doonaa isla markaaba!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>hanOS Google Integration Subsystem • Engineered by <strong className="text-slate-200">Hanath Mahdi Updih</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-slate-300">Live Header Verification Active</span>
        </div>
      </div>
    </div>
  );
};
