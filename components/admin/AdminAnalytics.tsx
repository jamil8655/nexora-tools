'use client';

import React, { useState } from 'react';
import {
  Activity,
  Users,
  HardDrive,
  ShieldCheck,
  Server,
  AlertTriangle,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Settings,
  Database,
  Lock,
  Search,
  Filter,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils/formatters';
import { TOOLS_LIST } from '@/lib/tools-config';

export function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'settings' | 'logs'>('overview');
  const [maxUploadLimit, setMaxUploadLimit] = useState<number>(100);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [autoCleanupHours, setAutoCleanupHours] = useState<number>(1);
  const [clientPrivacyEnforced, setClientPrivacyEnforced] = useState<boolean>(true);
  const [searchLog, setSearchLog] = useState<string>('');

  const [toolToggles, setToolToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    TOOLS_LIST.forEach((t) => (initial[t.id] = true));
    return initial;
  });

  const toggleTool = (id: string) => {
    setToolToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sampleLogs = [
    { id: 'log-1', tool: 'PDF Merge', status: 'SUCCESS', size: '14.2 MB', time: '2 mins ago', ip: '192.168.1.44 (Client Local)' },
    { id: 'log-2', tool: 'Image Compressor', status: 'SUCCESS', size: '5.8 MB', time: '5 mins ago', ip: '172.16.0.23 (Client Local)' },
    { id: 'log-3', tool: 'OCR Image to Text', status: 'SUCCESS', size: '1.2 MB', time: '12 mins ago', ip: '10.0.0.12 (Client Local)' },
    { id: 'log-4', tool: 'Word to PDF', status: 'SUCCESS', size: '3.4 MB', time: '18 mins ago', ip: '192.168.1.88 (Client Local)' },
    { id: 'log-5', tool: 'PDF Unlock', status: 'SEC_AUDIT', size: '8.1 MB', time: '25 mins ago', ip: '192.168.1.10 (Client Local)' },
  ];

  const filteredLogs = sampleLogs.filter(
    (l) => l.tool.toLowerCase().includes(searchLog.toLowerCase()) || l.status.toLowerCase().includes(searchLog.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {[
          { id: 'overview', label: 'System Overview', icon: Activity },
          { id: 'tools', label: 'Tool Management', icon: Database },
          { id: 'settings', label: 'Storage & Security Policy', icon: Settings },
          { id: 'logs', label: 'Security & Audit Logs', icon: Lock },
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
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Total Conversions</span>
                <Activity className="w-4 h-4 text-brand-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-50">142,890</div>
              <div className="text-[10px] text-emerald-500 font-semibold">+18.4% this week</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Processed Volume</span>
                <HardDrive className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-50">4.82 TB</div>
              <div className="text-[10px] text-slate-400">Zero cloud storage footprint</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Client WASM Ratio</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">99.2%</div>
              <div className="text-[10px] text-emerald-500 font-semibold">Maximum privacy & 0 server cost</div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Platform Uptime</span>
                <Server className="w-4 h-4 text-teal-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-50">99.99%</div>
              <div className="text-[10px] text-emerald-500 font-semibold">All nodes healthy</div>
            </div>
          </div>

          {/* Popular Tools Usage Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Tool Usage Ranking & Health
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                    <th className="pb-3 font-semibold">Tool Name</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Total Runs</th>
                    <th className="pb-3 font-semibold">Execution Mode</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {TOOLS_LIST.slice(0, 8).map((tool, idx) => (
                    <tr key={tool.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="py-3 font-bold text-slate-800 dark:text-slate-200">
                        {tool.name}
                      </td>
                      <td className="py-3 uppercase text-[10px] font-semibold text-slate-400">
                        {tool.category}
                      </td>
                      <td className="py-3 font-mono font-semibold">
                        {(18400 / (idx + 1)).toFixed(0)}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {tool.isClientSide ? 'Client WASM' : 'Server Sandbox'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Operational</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOOL MANAGEMENT SWITCHBOARD */}
      {activeTab === 'tools' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Global Feature Switchboard
              </h3>
              <p className="text-xs text-slate-500">
                Instantly enable or disable individual tools without redeploying
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLS_LIST.map((tool) => {
              const isEnabled = toolToggles[tool.id] !== false;
              return (
                <div
                  key={tool.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {tool.name}
                    </h4>
                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                      {tool.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTool(tool.id)}
                    className={`p-1 rounded-xl transition-colors ${
                      isEnabled ? 'text-emerald-500' : 'text-slate-400'
                    }`}
                  >
                    {isEnabled ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SETTINGS & SECURITY POLICY */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 max-w-2xl">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
            System & Storage Policy Configuration
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Max File Upload Limit</span>
                <span className="text-brand-600">{maxUploadLimit} MB</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={maxUploadLimit}
                onChange={(e) => setMaxUploadLimit(parseInt(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Temporary File Auto-Delete TTL
              </label>
              <select
                value={autoCleanupHours}
                onChange={(e) => setAutoCleanupHours(parseInt(e.target.value))}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-bold"
              >
                <option value={0.5}>30 Minutes</option>
                <option value={1}>1 Hour (Recommended)</option>
                <option value={6}>6 Hours</option>
                <option value={24}>24 Hours</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Enforce Privacy First Badge
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Display green privacy badges for all 100% browser-side tools
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={clientPrivacyEnforced}
                  onChange={(e) => setClientPrivacyEnforced(e.target.checked)}
                  className="rounded text-brand-600 w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Maintenance Mode
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Temporarily pause public tool processing for scheduled maintenance
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="rounded text-rose-600 w-5 h-5"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 4. SECURITY & AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Security & Processing Logs
            </h3>
            <div className="flex items-center gap-2 w-full sm:w-64">
              <input
                type="text"
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Search audit logs..."
                className="w-full px-3.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">{log.id}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{log.tool}</span>
                  <span className="text-slate-400">{log.size}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-500">
                  <span className="font-mono text-[11px]">{log.ip}</span>
                  <span>{log.time}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
