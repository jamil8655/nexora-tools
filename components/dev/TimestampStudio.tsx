'use client';

import React, { useState, useEffect } from 'react';
import { parseTimestamp, TimestampInfo } from '@/lib/dev/dev-utilities';
import { Clock, RefreshCw, Copy, Check, Calendar } from 'lucide-react';

export function TimestampStudio() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputVal, setInputVal] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [info, setInfo] = useState<TimestampInfo>(parseTimestamp(Math.floor(Date.now() / 1000)));
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConvert = (val: string) => {
    setInputVal(val);
    setInfo(parseTimestamp(val));
  };

  const handleSetNow = () => {
    const nowSec = Math.floor(Date.now() / 1000);
    setInputVal(nowSec.toString());
    setInfo(parseTimestamp(nowSec));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Live Epoch Counter Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-brand-500/20">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-blue-100 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Current Unix Epoch Time
          </span>
          <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight">
            {currentEpoch}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSetNow}
          className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Insert Current Time</span>
        </button>
      </div>

      {/* Input */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Enter Unix Timestamp (Seconds / Milliseconds) or Date String (ISO / UTC)
        </label>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => handleConvert(e.target.value)}
          placeholder="e.g. 1772000000 or 2026-08-26T18:00:00Z"
          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-base font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: 'sec', label: 'Timestamp (Seconds)', value: info.timestampSeconds.toString() },
          { key: 'ms', label: 'Timestamp (Milliseconds)', value: info.timestampMs.toString() },
          { key: 'iso', label: 'ISO 8601 Format', value: info.iso },
          { key: 'utc', label: 'UTC / GMT Date String', value: info.utc },
          { key: 'local', label: 'Your Local Timezone', value: info.local },
          { key: 'rel', label: 'Relative Duration', value: info.relative },
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
                {copiedKey === item.key ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 font-mono break-all">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
