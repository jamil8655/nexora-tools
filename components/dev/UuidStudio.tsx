'use client';

import React, { useState } from 'react';
import { Fingerprint, Copy, Check, RefreshCw } from 'lucide-react';
import { generateUuidV4 } from '@/lib/dev/dev-utilities';

export function UuidStudio() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>(() => generateUuidV4(5, false, true));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const handleGenerate = () => {
    setUuids(generateUuidV4(count, uppercase, hyphens));
  };

  const copySingle = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">UUID / GUID Generator (v4)</h2>
            <p className="text-sm text-slate-400">Generate cryptographically secure Version-4 Unique Identifiers in bulk.</p>
          </div>
        </div>

        {/* Options */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-300">Quantity:</label>
              <select
                value={count}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCount(val);
                  setUuids(generateUuidV4(val, uppercase, hyphens));
                }}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value={1}>1 UUID</option>
                <option value={5}>5 UUIDs</option>
                <option value={10}>10 UUIDs</option>
                <option value={25}>25 UUIDs</option>
                <option value={50}>50 UUIDs</option>
                <option value={100}>100 UUIDs</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => {
                  setUppercase(e.target.checked);
                  setUuids(generateUuidV4(count, e.target.checked, hyphens));
                }}
                className="rounded border-slate-700 text-purple-500 focus:ring-0"
              />
              Uppercase
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => {
                  setHyphens(e.target.checked);
                  setUuids(generateUuidV4(count, uppercase, e.target.checked));
                }}
                className="rounded border-slate-700 text-purple-500 focus:ring-0"
              />
              Include Hyphens
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-lg shadow-purple-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
            <button
              onClick={copyAll}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              {allCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {allCopied ? 'All Copied!' : 'Copy All'}
            </button>
          </div>
        </div>

        {/* UUID List */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {uuids.map((id, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-purple-500/40 rounded-xl transition-colors group"
            >
              <span className="text-xs font-mono text-purple-300 selection:bg-purple-500 selection:text-white">
                {id}
              </span>
              <button
                onClick={() => copySingle(id, idx)}
                className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                {copiedIndex === idx ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
