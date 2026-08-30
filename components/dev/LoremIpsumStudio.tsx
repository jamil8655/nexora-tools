'use client';

import React, { useState } from 'react';
import { AlignLeft, Copy, Check, RefreshCw } from 'lucide-react';
import { generateLoremIpsum } from '@/lib/dev/dev-utilities';

export function LoremIpsumStudio() {
  const [count, setCount] = useState(3);
  const [format, setFormat] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [text, setText] = useState(() => generateLoremIpsum(3, 'paragraphs'));
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setText(generateLoremIpsum(count, format));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <AlignLeft className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Lorem Ipsum Dummy Text Generator</h2>
            <p className="text-sm text-slate-400">Generate placeholder text for design mockups, presentations, and UI wireframes.</p>
          </div>
        </div>

        {/* Options */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-300">Generate:</label>
              <input
                type="number"
                min={1}
                max={50}
                value={count}
                onChange={(e) => {
                  const val = Math.max(1, Math.min(50, Number(e.target.value)));
                  setCount(val);
                  setText(generateLoremIpsum(val, format));
                }}
                className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white text-center focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-300">Type:</label>
              <select
                value={format}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setFormat(val);
                  setText(generateLoremIpsum(count, val));
                }}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
        </div>

        {/* Text Display */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
          <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap font-sans max-h-96 overflow-y-auto">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
