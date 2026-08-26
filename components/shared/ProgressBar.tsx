'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number;
  statusText?: string;
  className?: string;
}

export function ProgressBar({ progress, statusText, className = '' }: ProgressBarProps) {
  const boundedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {statusText && (
        <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
          <span>{statusText}</span>
          <span>{boundedProgress}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-blue-600 rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${boundedProgress}%` }}
        />
      </div>
    </div>
  );
}
