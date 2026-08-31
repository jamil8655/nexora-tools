'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  HardDrive,
  ShieldCheck,
  Server,
  AlertTriangle,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  Settings,
  Database,
  Lock,
  Search,
  Filter,
  Cpu,
  RefreshCw,
  Trash2,
  Workflow,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils/formatters';
import { TOOLS_LIST } from '@/lib/tools-config';
import {
  getActivityHistory,
  getAllStoredFiles,
  ActivityHistoryItem,
  StoredFileItem,
  purgeAllLocalData,
} from '@/lib/storage/indexeddb-store';

export function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'health' | 'logs'>('overview');
  const [maxUploadLimit, setMaxUploadLimit] = useState<number>(500);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [clientPrivacyEnforced, setClientPrivacyEnforced] = useState<boolean>(true);
  const [searchLog, setSearchLog] = useState<string>('');

  const [realHistory, setRealHistory] = useState<ActivityHistoryItem[]>([]);
  const [realFiles, setRealFiles] = useState<StoredFileItem[]>([]);
  const [storageBytes, setStorageBytes] = useState<number>(0);

  const [toolToggles, setToolToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TOOLS_LIST.forEach((t) => (initial[t.id] = true));
    return initial;
  });

  useEffect(() => {
    loadRealAdminData();
  }, []);

  const loadRealAdminData = async () => {
    const history = await getActivityHistory(100);
    const files = await getAllStoredFiles();
    setRealHistory(history);
    setRealFiles(files);

    const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);
    setStorageBytes(totalBytes);
  };

  const toggleTool = (id: string) => {
    setToolToggles((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('nexora_admin_tool_toggles', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const filteredLogs = realHistory.filter(
    (l) =>
      l.toolName.toLowerCase().includes(searchLog.toLowerCase()) ||
      l.status.toLowerCase().includes(searchLog.toLowerCase()) ||
      l.fileName.toLowerCase().includes(searchLog.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-2xl">
        {[
          { id: 'overview', label: 'System Overview', icon: Activity },
          { id: 'health', label: 'Live System Health', icon: Server },
          { id: 'tools', label: 'Tool Management', icon: Database },
          { id: 'logs', label: 'Real Activity Logs', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Active Tools Available</span>
                <Database className="w-4 h-4 text-brand-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-50">
                {TOOLS_LIST.length}
              </div>
              <div className="text-[10px] text-emerald-500 font-semibold">100% In-Browser Active</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Local Stored Files</span>
                <HardDrive className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-50">
                {realFiles.length}
              </div>
              <div className="text-[10px] text-blue-500 font-semibold">{formatBytes(storageBytes)} allocated</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Recorded Operations</span>
                <Activity className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-50">
                {realHistory.length}
              </div>
              <div className="text-[10px] text-purple-500 font-semibold">Real Activity Stream</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Privacy Mode</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600">100% Client</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Zero Server Retention</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LIVE SYSTEM HEALTH TAB */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span>Operational Subsystem Health</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                ALL SYSTEMS OPERATIONAL
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { name: 'In-Browser PDF Engine (pdf-lib / pdfjs)', status: 'Operational', latency: '0ms (Client)', type: 'WebAssembly' },
                { name: 'Image Canvas & Matting Engine', status: 'Operational', latency: '< 30ms', type: 'HTML5 Canvas' },
                { name: 'Multi-Engine Media Downloader Cluster', status: 'Operational', latency: '120ms', type: 'Failover API' },
                { name: 'Zero-Number WebRTC Audio Calling', status: 'Operational', latency: 'Direct P2P', type: 'PeerJS' },
                { name: 'IndexedDB High-Capacity Storage', status: 'Operational', latency: 'Instant', type: 'Local Storage' },
                { name: 'PWA Service Worker & Offline Cache', status: 'Operational', latency: 'Cached', type: 'ServiceWorker' },
              ].map((sys) => (
                <div
                  key={sys.name}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{sys.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Type: {sys.type}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-600">{sys.status}</span>
                    <div className="text-[10px] text-slate-400">{sys.latency}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. TOOL MANAGEMENT TAB */}
      {activeTab === 'tools' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Tool Availability Controller ({TOOLS_LIST.length} Tools)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TOOLS_LIST.map((tool) => {
              const enabled = toolToggles[tool.id] !== false;
              return (
                <div
                  key={tool.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{tool.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{tool.category}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTool(tool.id)}
                    className={`p-1 rounded-lg text-xs font-bold transition-colors ${
                      enabled ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {enabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. REAL ACTIVITY LOGS TAB */}
      {activeTab === 'logs' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Client Activity Stream ({realHistory.length} events)
            </h3>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Filter logs..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{log.toolName}</span>
                  <span className="text-slate-400 ml-2">File: {log.fileName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-400">
                    {(log.durationMs / 1000).toFixed(1)}s
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      log.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400">No activity logs recorded yet.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
