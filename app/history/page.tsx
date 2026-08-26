'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { getHistory, clearHistory } from '@/lib/storage/file-store';
import { ProcessingHistoryItem } from '@/lib/types';
import { formatBytes } from '@/lib/utils/formatters';
import { History, Trash2, CheckCircle2, ArrowUpRight, Clock } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState<ProcessingHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Processing History' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Processing History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Recent conversions processed locally on your device (stored in local browser memory)
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
        {history.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-3">
            <History className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">No recent conversions</p>
            <p className="text-xs text-slate-400">Your processed files and actions will appear here.</p>
            <Link
              href="/tools"
              className="inline-block px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-md shadow-brand-500/20"
            >
              Explore Tools
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
            {history.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.fileName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-[10px] font-bold">
                      {item.toolName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{formatBytes(item.originalSize)}</span>
                    {item.outputSize !== undefined && (
                      <>
                        <span>→</span>
                        <span className="text-emerald-600 font-semibold">{formatBytes(item.outputSize)}</span>
                      </>
                    )}
                  </div>
                </div>

                <Link
                  href={`/tools/${item.toolId}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>Re-run</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
