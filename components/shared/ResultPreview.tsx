'use client';

import React, { useEffect, useState } from 'react';
import { Download, RefreshCw, Copy, Check, FileCheck, Eye, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatBytes, calculatePercentageSaved } from '@/lib/utils/formatters';
import { useI18n } from '@/lib/i18n/i18n-context';

interface ResultPreviewProps {
  files: {
    name: string;
    originalSize: number;
    processedSize?: number;
    blob?: Blob;
    dataUrl?: string;
    textResult?: string;
    downloadUrl?: string;
  }[];
  onDownloadSingle: (index: number) => void;
  onDownloadAllZip?: () => void;
  onReset: () => void;
}

export function ResultPreview({
  files,
  onDownloadSingle,
  onDownloadAllZip,
  onReset,
}: ResultPreviewProps) {
  const { t } = useI18n();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fire celebratory confetti on finish
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const totalOriginal = files.reduce((acc, f) => acc + (f.originalSize || 0), 0);
  const totalProcessed = files.reduce((acc, f) => acc + (f.processedSize || f.blob?.size || 0), 0);
  const totalSavedPercent = calculatePercentageSaved(totalOriginal, totalProcessed);

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Top Banner with celebration / savings */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-brand-500/10 border border-emerald-500/20 text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 mb-1 shadow-sm">
          <FileCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Conversion Completed Successfully!
        </h3>
        {totalSavedPercent > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {t.savedPercentage}: {totalSavedPercent}% ({formatBytes(totalOriginal)} → {formatBytes(totalProcessed)})
            </span>
          </div>
        )}
      </div>

      {/* Files List & Previews */}
      <div className="space-y-4">
        {files.map((file, idx) => {
          const processedBytes = file.processedSize || file.blob?.size;
          const isImage = file.dataUrl || (file.blob && file.blob.type.startsWith('image/'));

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                    {file.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {file.originalSize > 0 && <span>Original: {formatBytes(file.originalSize)}</span>}
                    {processedBytes !== undefined && (
                      <>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          Result: {formatBytes(processedBytes)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {file.textResult && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(file.textResult!, idx)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDownloadSingle(idx)}
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-semibold shadow-md shadow-brand-500/20 inline-flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.download}</span>
                  </button>
                </div>
              </div>

              {/* Text Result Preview */}
              {file.textResult && (
                <div className="relative">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-h-48 overflow-y-auto text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {file.textResult}
                  </div>
                </div>
              )}

              {/* Image Preview */}
              {isImage && file.dataUrl && (
                <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 max-h-64">
                  <img
                    src={file.dataUrl}
                    alt={file.name}
                    className="max-h-60 w-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{t.startAgain}</span>
        </button>

        {files.length > 1 && onDownloadAllZip && (
          <button
            type="button"
            onClick={onDownloadAllZip}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 inline-flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadAllZip}</span>
          </button>
        )}
      </div>
    </div>
  );
}
