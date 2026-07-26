import React, { useState } from 'react';
import { ApiKey, UserAccount } from '../../types';
import { BookOpen, Copy, Check, Terminal, Code, Server, ShieldCheck } from 'lucide-react';

interface DeveloperDocsProps {
  user: UserAccount;
  apiKeys: ApiKey[];
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

export const DeveloperDocs: React.FC<DeveloperDocsProps> = ({
  user,
  apiKeys,
  onShowToast,
}) => {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python' | 'go'>('curl');
  const [copied, setCopied] = useState(false);

  const primaryKey = apiKeys.length > 0 ? apiKeys[0].key : 'han_live_your_generated_api_key';

  const snippets = {
    curl: `# 1. Register User Endpoint
curl -X POST "https://api.hanos.io/register" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "${user.email}",
    "password": "your_secure_password"
  }'

# 2. Create API Key Endpoint
curl -X POST "https://api.hanos.io/create-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "${user.user_id}"
  }'`,
    node: `// Node.js Express / Fetch Implementation
import fetch from 'node-fetch';

const BASE_URL = 'https://api.hanos.io';

// Generate API Key for User
async function generateKey(userId) {
  const response = await fetch(\`\${BASE_URL}/create-api-key\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId })
  });

  const data = await response.json();
  console.log('Generated Key:', data.api_key);
}

generateKey('${user.user_id}');`,
    python: `# Python Requests Example
import requests

BASE_URL = "https://api.hanos.io"

# Create API Key
response = requests.post(
    f"{BASE_URL}/create-api-key",
    json={"user_id": "${user.user_id}"}
)

if response.status_code == 200:
    data = response.json()
    print("API Key:", data.get("api_key"))`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "https://api.hanos.io/create-api-key"
    payload := map[string]string{"user_id": "${user.user_id}"}
    jsonValue, _ := json.Marshal(payload)

    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
    if err == nil {
        fmt.Println("Status Code:", resp.Status)
    }
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    onShowToast('Code Snippet Copied', 'Ready to paste into your codebase.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          Developer Quickstart &amp; REST API Docs
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Complete integration guide for <code className="text-blue-300 font-mono">https://api.hanos.io</code>
        </p>
      </div>

      {/* Code Viewer Panel */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl overflow-hidden">
        
        {/* Language Tabs */}
        <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(['curl', 'node', 'python', 'go'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors ${
                  activeLang === lang
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Block */}
        <div className="p-6 font-mono text-xs leading-relaxed text-blue-300 overflow-x-auto bg-slate-950">
          <pre>
            <code>{snippets[activeLang]}</code>
          </pre>
        </div>
      </div>

      {/* API Reference Table */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">REST Endpoints Reference</h3>

        <div className="space-y-3 font-mono text-xs">
          
          {/* Register Endpoint */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-bold">POST</span>
              <span className="text-white font-bold">https://api.hanos.io/register</span>
            </div>
            <p className="font-sans text-slate-400 text-xs">Registers a new developer account.</p>
            <div className="text-slate-400 text-[11px]">
              Payload: <code className="text-emerald-300">{`{ "email": string, "password": string }`}</code>
            </div>
          </div>

          {/* Create Key Endpoint */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-bold">POST</span>
              <span className="text-white font-bold">https://api.hanos.io/create-api-key</span>
            </div>
            <p className="font-sans text-slate-400 text-xs">Provisions a new live secret API key connected to user_id.</p>
            <div className="text-slate-400 text-[11px]">
              Payload: <code className="text-emerald-300">{`{ "user_id": string }`}</code>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
