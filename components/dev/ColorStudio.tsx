'use client';

import React, { useState } from 'react';
import { parseHexColor, ColorConversion } from '@/lib/dev/dev-utilities';
import { Palette, Copy, Check } from 'lucide-react';

export function ColorStudio() {
  const [hexColor, setHexColor] = useState<string>('#026FC7');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const parsed = parseHexColor(hexColor) || {
    hex: '#026FC7',
    rgb: 'rgb(2, 111, 199)',
    hsl: 'hsl(207, 98%, 39%)',
    cmyk: 'cmyk(99%, 44%, 0%, 22%)',
    r: 2,
    g: 111,
    b: 199,
  };

  const handleCopy = (text: string, fmt: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(fmt);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Color Swatch & Picker */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6">
        <div
          className="w-28 h-28 rounded-2xl shadow-xl border-4 border-white dark:border-slate-800 shrink-0 transition-transform hover:scale-105"
          style={{ backgroundColor: parsed.hex }}
        />

        <div className="space-y-3 w-full">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Pick Color or Enter HEX Code
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={parsed.hex}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer bg-white border border-slate-300 p-0.5"
            />
            <input
              type="text"
              value={hexColor}
              onChange={(e) => setHexColor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-base font-bold text-slate-900 dark:text-slate-100 uppercase"
            />
          </div>
        </div>
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: 'hex', label: 'HEX Code', value: parsed.hex },
          { key: 'rgb', label: 'RGB Value', value: parsed.rgb },
          { key: 'hsl', label: 'HSL Value', value: parsed.hsl },
          { key: 'cmyk', label: 'CMYK Value (Print)', value: parsed.cmyk },
        ].map((item) => (
          <div
            key={item.key}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>{item.label}</span>
              <button
                type="button"
                onClick={() => handleCopy(item.value, item.key)}
                className="p-1 rounded text-slate-400 hover:text-brand-600 transition-colors"
                title="Copy"
              >
                {copiedFormat === item.key ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
