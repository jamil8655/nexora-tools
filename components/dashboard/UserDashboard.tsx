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
  CreditCard,
  Sliders,
  Share2,
  Eye,
  FileArchive,
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
  deleteWorkflow,
  purgeAllLocalData,
} from '@/lib/storage/indexeddb-store';
import { TOOLS_LIST } from '@/lib/tools-config';
import { formatBytes } from '@/lib/utils/formatters';
import { downloadSingleFile } from '@/lib/utils/download';

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'files' | 'history' | 'workflows' | 'usage' | 'plan' | 'privacy'>('files');
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
    if (confirm('Delete this file from your local workspace storage?')) {
      await deleteStoredFile(id);
      loadDashboardData();
    }
  };

  const handleToggleFavorite = async (id: string) => {
    await toggleFileFavorite(id);
    loadDashboardData();
  };

  const handleClearHistory = async () => {
    if (confirm('Clear all local activity history logs?')) {
      await clearActivityHistory();
      loadDashboardData();
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    if (confirm('Delete this saved workflow?')) {
      await deleteWorkflow(id);
      loadDashboardData();
    }
  };

  const handleExportDataJson = () => {
    const backup = {
      filesCount: storedFiles.length,
      history: historyItems,
      workflows: savedWorkflows,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    downloadSingleFile(blob, 'nexora_user_workspace_backup.json');
  };

  const handlePurgeAll = async () => {
    if (confirm('Purge all stored files, workflows, and history from this device?')) {
      await purgeAllLocalData();
      loadDashboardData();
      alert('Local workspace storage has been cleared.');
    }
  };

  const filteredFiles = storedFiles.filter(
    (f) =>
      f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      f.toolUsed.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const totalBytes = storedFiles.reduce((acc, f) => acc + (f.size || 0), 0);

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
              NEXORA User Workspace Hub
            </h1>
            <p className="text-xs sm:text-sm text-brand-100">
              Manage your local files, automated workflows, and conversion history with 100% private in-browser storage.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>IndexedDB Zero-Leakage Storage</span>
          </div>
        </div>

        {/* Quick Launch Row */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-200">
            Quick Launch:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <Link
                  key={qa.label}
                  href={qa.href}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md flex items-center gap-2.5 transition-all text-xs font-bold text-white hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-brand-200" />
                  <span className="truncate">{qa.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Stored Files</span>
            <FileCheck className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {storedFiles.length}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Ready to download</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Storage Footprint</span>
            <HardDrive className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {formatBytes(totalBytes)}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Private on this device</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Recent Operations</span>
            <History className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {historyItems.length}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Auto-clears in 24h</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Saved Workflows</span>
            <Workflow className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {savedWorkflows.length}
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Automated pipelines</p>
        </div>
      </div>

      {/* 3. USER NAVIGATION TABS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto">
        {[
          { id: 'files', label: 'My Files & Downloads', icon: FileArchive },
          { id: 'history', label: 'Activity History', icon: History },
          { id: 'workflows', label: 'Saved Workflows', icon: Workflow },
          { id: 'usage', label: 'Usage Meter', icon: Zap },
          { id: 'plan', label: 'My Plan', icon: CreditCard },
          { id: 'privacy', label: 'Privacy & Data Export', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}

      {/* TAB A: MY FILES */}
      {activeTab === 'files' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-brand-600" />
              <span>Processed Files ({storedFiles.length})</span>
            </h3>

            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search files..."
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          {filteredFiles.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <p className="font-bold text-slate-500">No processed files currently saved.</p>
              <p>When you compress, convert, or edit files, they will be accessible here for instant download.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white truncate">
                      {file.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {formatBytes(file.size)} • Tool: {file.toolUsed} • {new Date(file.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleFavorite(file.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                      title="Favorite"
                    >
                      <Star
                        className={`w-4 h-4 ${file.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const url = file.blobUrl || file.dataUrl;
                        if (url) {
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = file.name;
                          a.click();
                        }
                      }}
                      className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-xs flex items-center gap-1 text-[11px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB B: HISTORY */}
      {activeTab === 'history' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-4 h-4 text-brand-600" />
              <span>Activity History ({historyItems.length})</span>
            </h3>

            {historyItems.length > 0 && (
              <button
                type="button"
                onClick={handleClearHistory}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Clear History
              </button>
            )}
          </div>

          {historyItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No recent processing history recorded.
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{item.toolName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {item.fileName} • {item.timestamp}
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB C: SAVED WORKFLOWS */}
      {activeTab === 'workflows' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Workflow className="w-4 h-4 text-purple-600" />
              <span>Your Saved Workflows ({savedWorkflows.length})</span>
            </h3>

            <Link
              href="/workflows"
              className="text-xs font-bold text-purple-600 hover:underline"
            >
              + Create New Workflow
            </Link>
          </div>

          {savedWorkflows.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-2">
              <p className="font-bold text-slate-500">No saved workflows yet.</p>
              <p>Chain multiple tools into 1-click automated pipelines in the Smart Workflows builder.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedWorkflows.map((wf) => (
                <div
                  key={wf.id}
                  className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="font-black text-slate-900 dark:text-white text-sm">
                      {wf.name}
                    </div>
                    <div className="text-[11px] text-purple-700 dark:text-purple-300 font-mono">
                      {wf.steps.length} Steps: {wf.steps.map((s) => s.toolName).join(' ➔ ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/workflows"
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-xs"
                    >
                      Run Pipeline
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteWorkflow(wf.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB D: USAGE METER */}
      {activeTab === 'usage' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-600" />
              <span>Real Resource Usage Meter</span>
            </h3>
            <p className="text-xs text-slate-500">Live processing metrics on your active device session.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Daily File Processing</div>
              <div className="text-xl font-black text-brand-600">{historyItems.length} Operations</div>
              <p className="text-[11px] text-emerald-600 font-semibold">Unlimited Free In-Browser Engine</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Local Storage Quota</div>
              <div className="text-xl font-black text-purple-600">{formatBytes(totalBytes)}</div>
              <p className="text-[11px] text-slate-500 font-semibold">Available capacity: ~50 GB in IndexedDB</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB E: MY PLAN */}
      {activeTab === 'plan' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-600" />
              <span>Your Active Plan & Privileges</span>
            </h3>
            <p className="text-xs text-slate-500">Account status and maximum file processing limits.</p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-base text-emerald-900 dark:text-emerald-200">
                NEXORA Community Free Plan
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-600 text-white">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              You have unrestricted free access to all 75+ productivity utilities, in-browser PDF manipulation, 4K video downloading, and Passport Photo Maker with 500 MB per-file processing.
            </p>
          </div>
        </div>
      )}

      {/* TAB F: PRIVACY & DATA EXPORT */}
      {activeTab === 'privacy' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Workspace Privacy & Local Data Management</span>
            </h3>
            <p className="text-xs text-slate-500">
              Export your saved workflows or purge all cached workspace data with 1 click.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Export Workspace Metadata</h4>
                <p className="text-[11px] text-slate-500">
                  Download a JSON backup of your saved workflows and activity history.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportDataJson}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Export JSON
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-rose-900 dark:text-rose-200">Purge Local Workspace</h4>
                <p className="text-[11px] text-rose-700 dark:text-rose-300">
                  Instantly delete all local files, history, and workflows from this browser.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePurgeAll}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Purge All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
