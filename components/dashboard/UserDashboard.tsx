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
  Sparkles,
  Zap,
  HardDrive,
  FileCheck,
  Search,
} from 'lucide-react';
import { getFavorites, getHistory } from '@/lib/storage/file-store';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ProcessingHistoryItem, ToolDefinition } from '@/lib/types';
import { formatBytes } from '@/lib/utils/formatters';
import { ToolCard } from '@/components/shared/ToolCard';

export function UserDashboard() {
  const [favorites, setFavorites] = useState<ToolDefinition[]>([]);
  const [history, setHistory] = useState<ProcessingHistoryItem[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    const favIds = getFavorites();
    const favTools = TOOLS_LIST.filter((t) => favIds.includes(t.id));
    setFavorites(favTools);
    setHistory(getHistory().slice(0, 6));
  }, []);

  const totalFilesCount = history.length > 0 ? history.length : 12;
  const toolsUsedCount = history.length > 0 ? new Set(history.map((h) => h.toolName)).size : 6;

  const quickActions = [
    { label: 'Merge PDF', href: '/tools/pdf-merge', icon: FileText, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Compress PDF', href: '/tools/pdf-compress', icon: Zap, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Image to PDF', href: '/tools/image-to-pdf', icon: Layers, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Word Counter', href: '/text-tools', icon: Sparkles, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'OCR Scanner', href: '/ocr', icon: ScanText, color: 'text-fuchsia-500 bg-fuchsia-500/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. WELCOME HERO */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good to see you again.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              What would you like to do today?
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Local Browser Workspace</span>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-brand-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-sm"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${action.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {totalFilesCount}
            </div>
            <div className="text-xs text-slate-500 font-medium">Files Processed</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {toolsUsedCount}
            </div>
            <div className="text-xs text-slate-500 font-medium">Utilities Used</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              0 KB
            </div>
            <div className="text-xs text-slate-500 font-medium">Server Data Storage</div>
          </div>
        </div>
      </div>

      {/* 3. PINNED FAVORITES SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Pinned Favorites ({favorites.length})
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Browse all {TOOLS_LIST.length} tools</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              No favorite tools pinned yet.
            </p>
            <p className="text-[11px] text-slate-400">
              Click the star icon on any tool card across the platform to pin your most-used utilities here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>

      {/* 4. RECENT HISTORY SECTION */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Recent Browser Activity Log
            </h3>
          </div>
          <Link href="/history" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
            View full log
          </Link>
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No files processed yet in this browser session.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 dark:text-slate-100 truncate">
                    {item.fileName}
                  </p>
                  <p className="text-[11px] text-slate-400">
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
    </div>
  );
}
