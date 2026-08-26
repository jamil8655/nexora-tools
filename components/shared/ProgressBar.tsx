'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  statusText?: string;
  className?: string;
}

export function ProgressBar({ progress, statusText, className = '' }: ProgressBarProps) {
  const boundedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full space-y-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md ${className}`}>
      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 text-brand-500 animate-spin" />
          <span>{statusText || 'Processing document...'}</span>
        </div>
        <span className="font-mono text-brand-600 dark:text-brand-400">{boundedProgress}%</span>
      </div>

      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${boundedProgress}%` }}
        />
      </div>

      {/* Stage indicators */}
      <div className="grid grid-cols-4 gap-1 text-[10px] text-slate-400 pt-1 text-center font-medium">
        <span className={boundedProgress >= 15 ? 'text-brand-500 font-bold' : ''}>1. Loaded</span>
        <span className={boundedProgress >= 40 ? 'text-brand-500 font-bold' : ''}>2. Analyzing</span>
        <span className={boundedProgress >= 70 ? 'text-brand-500 font-bold' : ''}>3. Processing</span>
        <span className={boundedProgress >= 100 ? 'text-emerald-500 font-bold' : ''}>4. Complete</span>
      </div>
    </div>
  );
}
