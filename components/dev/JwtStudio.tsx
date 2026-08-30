'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldAlert, ShieldCheck, Copy, Check } from 'lucide-react';
import { decodeJwt } from '@/lib/dev/dev-utilities';

export function JwtStudio() {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbWlsIEFobWFkIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4zC0h1hC8g77F_95tTfxD_7XjU...'
  );
  const [copied, setCopied] = useState<string | null>(null);

  const result = decodeJwt(token);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">JWT Token Inspector & Decoder</h2>
            <p className="text-sm text-slate-400">Decode JSON Web Token headers, payload claims, and expiration timestamps securely in browser.</p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Encoded JWT Token String:</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={4}
            placeholder="Paste eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* Output */}
        {result.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{result.error}</span>
          </div>
        )}

        {!result.error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Header */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Header (Algorithm & Token Type)</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(result.header, null, 2), 'header')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copied === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === 'header' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs font-mono text-pink-300 bg-slate-900/60 p-3 rounded-xl overflow-x-auto">
                {JSON.stringify(result.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Payload Data & Claims</span>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(result.payload, null, 2), 'payload')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copied === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === 'payload' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs font-mono text-cyan-300 bg-slate-900/60 p-3 rounded-xl overflow-x-auto">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
            </div>

            {/* Expiry & Time Status */}
            <div className="md:col-span-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {result.isExpired ? (
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-white">
                    {result.isExpired ? 'Token Expired' : 'Valid Signature & Active Token'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {result.expiresAt ? `Expires: ${result.expiresAt}` : 'No expiration timestamp found in claims'}
                  </p>
                </div>
              </div>

              {result.issuedAt && (
                <div className="text-xs text-slate-400">
                  <span className="text-slate-500">Issued at:</span> {result.issuedAt}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
