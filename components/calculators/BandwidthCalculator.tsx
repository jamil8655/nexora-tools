'use client';

import React, { useState } from 'react';
import { Activity, Clock, Zap, Download, Upload } from 'lucide-react';
import { formatTimeSeconds, formatBytes } from '@/lib/utils/formatters';

const SPEED_PRESETS = [
  { label: '3G Mobile (3 Mbps)', speedMbps: 3 },
  { label: '4G LTE (25 Mbps)', speedMbps: 25 },
  { label: '5G Fast (150 Mbps)', speedMbps: 150 },
  { label: 'Home Fiber (100 Mbps)', speedMbps: 100 },
  { label: 'High Speed (500 Mbps)', speedMbps: 500 },
  { label: 'Gigabit Fiber (1000 Mbps)', speedMbps: 1000 },
];

export function BandwidthCalculator() {
  const [fileSize, setFileSize] = useState<number>(10);
  const [sizeUnit, setSizeUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speedMbps, setSpeedMbps] = useState<number>(100);

  // Calculate total bits
  const sizeMultiplier = sizeUnit === 'MB' ? 1024 * 1024 : sizeUnit === 'GB' ? 1024 * 1024 * 1024 : 1024 * 1024 * 1024 * 1024;
  const totalBytes = fileSize * sizeMultiplier;
  const totalBits = totalBytes * 8;
  const speedBps = speedMbps * 1000 * 1000;

  const transferTimeSeconds = speedBps > 0 ? totalBits / speedBps : 0;
  const speedMBps = speedMbps / 8;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Download & Upload Time Estimator
            </h3>
            <p className="text-xs text-slate-500">
              Find out exactly how long file transfers, video streams, or backups will take
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              File Size
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0.1"
                step="any"
                value={fileSize}
                onChange={(e) => setFileSize(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <select
                value={sizeUnit}
                onChange={(e) => setSizeUnit(e.target.value as any)}
                className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 font-bold text-slate-800 dark:text-slate-200"
              >
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Internet Speed (Mbps)
            </label>
            <input
              type="number"
              min="1"
              value={speedMbps}
              onChange={(e) => setSpeedMbps(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Speed Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-500">Connection Presets:</span>
          {SPEED_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSpeedMbps(p.speedMbps)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Clock className="w-4 h-4 text-brand-500" />
            <span>Estimated Duration</span>
          </div>
          <div className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
            {formatTimeSeconds(transferTimeSeconds)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>Actual Speed (MB/s)</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {speedMBps.toFixed(2)} MB/s
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Download className="w-4 h-4 text-blue-500" />
            <span>Total Data Volume</span>
          </div>
          <div className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
            {formatBytes(totalBytes)}
          </div>
        </div>
      </div>
    </div>
  );
}
