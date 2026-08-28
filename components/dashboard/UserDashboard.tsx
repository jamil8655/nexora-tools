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
  Video,
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
    { label: 'Video Downloader', href: '/tools/media-downloader', icon: Video, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Merge PDF', href: '/tools/pdf-merge', icon: FileText, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Compress PDF', href: '/tools/pdf-compress', icon: Zap, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Word Counter', href: '/text-tools', icon: Sparkles, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'OCR Scanner', href: '/ocr', icon: ScanText, color: 'text-fuchsia-500 bg-fuchsia-500/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. WELCOME HERO */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome to Your Workspace
            </h1>
            <p className="text-xs sm:text-sm text-brand-100">
              Access your favorite utilities, history records, and 65+ productivity tools.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Local Browser Workspace</span>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-200">
            Quick Actions
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow-sm backdrop-blur-md hover:scale-105"
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

      {/* 2. DASHBOARD STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Conversions</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{totalFilesCount}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">100% Processed Locally</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tools Used</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{toolsUsedCount}</div>
          <div className="text-[11px] text-slate-400">Across All Categories</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Favorites Saved</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100">{favorites.length}</div>
          <div className="text-[11px] text-slate-400">Pinned for Quick Access</div>
        </div>
      </div>

      {/* 3. FAVORITE TOOLS SECTION */}
      {favorites.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Your Pinned Tools ({favorites.length})
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* 4. RECENT ACTIVITY HISTORY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Recent Conversion Logs
            </h2>
          </div>
          <Link
            href="/history"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {history.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {item.fileName}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{item.toolName}</span>
                    <span>•</span>
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {formatBytes(item.outputSize || item.originalSize)}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Success</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <Clock className="w-8 h-8 mx-auto text-slate-400" />
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">No conversions recorded yet</div>
            <p className="text-[11px] text-slate-400">
              When you convert, compress, or edit files, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
