'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  History,
  ShieldCheck,
  ArrowRight,
  FileText,
  ScanText,
  Clock,
  Layers,
} from 'lucide-react';
import { getFavorites, getHistory } from '@/lib/storage/file-store';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ProcessingHistoryItem, ToolDefinition } from '@/lib/types';
import { formatBytes } from '@/lib/utils/formatters';
import { ToolCard } from '@/components/shared/ToolCard';

export function UserDashboard() {
  const [favorites, setFavorites] = useState<ToolDefinition[]>([]);
  const [history, setHistory] = useState<ProcessingHistoryItem[]>([]);

  useEffect(() => {
    const favIds = getFavorites();
    const favTools = TOOLS_LIST.filter((t) => favIds.includes(t.id));
    setFavorites(favTools);
    setHistory(getHistory().slice(0, 6));
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Workspace Active • 100% Client-Side Privacy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            NEXORA Workspace Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Your personalized digital utility environment. Fast access to pinned favorites, recent activity, and local processing metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/tools/pdf-merge"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Merge PDF</span>
          </Link>
          <Link
            href="/ocr"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ScanText className="w-3.5 h-3.5" />
            <span>OCR Studio</span>
          </Link>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Pinned Favorites ({favorites.length})
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Browse all {TOOLS_LIST.length} tools</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
            No favorite tools pinned yet. Click the star icon on any tool card across the app to pin it here!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>

      {/* Recent History & Workspace Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity List */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-brand-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Recent Processing Activity
              </h3>
            </div>
            <Link href="/history" className="text-xs text-brand-600 font-semibold hover:underline">
              View full log
            </Link>
          </div>

          {history.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No recent files processed yet in this browser session.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {history.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {item.fileName}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.toolName} • {formatBytes(item.originalSize)}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System & Privacy Info Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Privacy & Engine Status
          </h3>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between font-semibold">
                <span>Local Browser Cache</span>
                <span className="text-emerald-500">Encrypted</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All temporary buffers are cleared automatically when you close the tab.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between font-semibold">
                <span>Hardware Acceleration</span>
                <span className="text-brand-500">Active (WASM)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Multi-threaded Web Workers utilize your device GPU and CPU cores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
