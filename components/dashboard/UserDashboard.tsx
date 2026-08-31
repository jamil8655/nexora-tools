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
  Download,
  Trash2,
  Play,
  RotateCcw,
  Workflow,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  StoredFileItem,
  ActivityHistoryItem,
  SavedWorkflow,
  getAllStoredFiles,
  deleteStoredFile,
  toggleFileFavorite,
  getActivityHistory,
  clearActivityHistory,
  getSavedWorkflows,
} from '@/lib/storage/indexeddb-store';
import { TOOLS_LIST } from '@/lib/tools-config';
import { formatBytes } from '@/lib/utils/formatters';

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'files' | 'history' | 'workflows'>('files');
  const [storedFiles, setStoredFiles] = useState<StoredFileItem[]>([]);
  const [historyItems, setHistoryItems] = useState<ActivityHistoryItem[]>([]);
  const [savedWorkflows, setSavedWorkflows] = useState<SavedWorkflow[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const files = await getAllStoredFiles();
    const history = await getActivityHistory(50);
    const workflows = await getSavedWorkflows();

    setStoredFiles(files);
    setHistoryItems(history);
    setSavedWorkflows(workflows);
  };

  const handleDeleteFile = async (id: string) => {
    if (confirm('Delete this file from your local storage?')) {
      await deleteStoredFile(id);
      loadDashboardData();
    }
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFileFavorite(id);
    loadDashboardData();
  };

  const handleClearHistory = async () => {
    if (confirm('Clear all activity logs?')) {
      await clearActivityHistory();
      loadDashboardData();
    }
  };

  const filteredFiles = storedFiles.filter((f) =>
    f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    f.toolUsed.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const quickActions = [
    { label: 'Passport Studio', href: '/tools/passport-photo-maker', icon: Sparkles, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Workflows', href: '/workflows', icon: Workflow, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Video Downloader', href: '/tools/media-downloader', icon: Video, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'PDF to Word', href: '/tools/pdf-to-docx', icon: FileText, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Privacy Center', href: '/privacy-center', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* 1. HERO BANNER */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              NEXORA Workspace & My Files Hub
            </h1>
            <p className="text-xs sm:text-sm text-brand-100">
              Manage your local processed files, automated workflows, and conversion history with 100% private in-browser storage.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>IndexedDB Zero-Leakage Storage</span>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-200">
            Quick Launch:
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

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">My Processed Files</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {storedFiles.length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Activity History Items</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {historyItems.length}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Saved Workflows</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Workflow className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {savedWorkflows.length}
          </div>
        </div>
      </div>

      {/* 3. TABS CONTROLLER */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'files', label: `My Files (${storedFiles.length})` },
            { id: 'history', label: `Recent Activity (${historyItems.length})` },
            { id: 'workflows', label: `Saved Workflows (${savedWorkflows.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'files' && (
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search files..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        )}

        {activeTab === 'history' && historyItems.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Clear History
          </button>
        )}
      </div>

      {/* 4. TAB CONTENTS */}
      {/* A. MY FILES TAB */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                        {file.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleFavorite(file.id)}
                        className={`p-1 rounded-lg ${file.isFavorite ? 'text-amber-500' : 'text-slate-400'}`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate" title={file.name}>
                      {file.name}
                    </h4>

                    <div className="text-[11px] text-slate-500">
                      Tool: {file.toolUsed} • {formatBytes(file.size)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      {file.dataUrl && (
                        <a
                          href={file.dataUrl}
                          download={file.name}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <FileCheck className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">No Processed Files Yet</h4>
                <p className="text-xs text-slate-500">
                  Files processed in Passport Studio, Background Remover, or PDF tools will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* B. ACTIVITY HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {historyItems.length > 0 ? (
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        item.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-rose-100 text-rose-600'
                      }`}
                    >
                      {item.status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {item.toolName} — {item.fileName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleTimeString()} • Duration: {(item.durationMs / 1000).toFixed(1)}s
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/tools/${item.toolId}`}
                    className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold rounded-lg hover:text-brand-600"
                  >
                    Run Again
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">No Recent Activity</h4>
            </div>
          )}
        </div>
      )}

      {/* C. SAVED WORKFLOWS TAB */}
      {activeTab === 'workflows' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedWorkflows.map((wf) => (
            <div
              key={wf.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-slate-900 dark:text-white flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-purple-600" />
                    <span>{wf.name}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {wf.steps.length} Steps
                  </span>
                </div>
                <p className="text-xs text-slate-500">{wf.description}</p>
              </div>

              <Link
                href="/workflows"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Launch in Workflow Builder
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
