'use client';

import React, { useEffect, useState } from 'react';
import { Download, RefreshCw, Copy, Check, CheckCircle2, Share2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatBytes, calculatePercentageSaved } from '@/lib/utils/formatters';
import { useI18n } from '@/lib/i18n/i18n-context';
import { AdSlot } from '@/components/ads/AdSlot';

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
  const [shared, setShared] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 45,
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

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      const shareData = {
        title: 'NEXORA Tools Pro',
        text: 'Processed my files with NEXORA Tools Pro - Fast, private and free!',
        url: window.location.href,
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (e) {
          // ignore share cancel
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    }
  };

  const totalOriginal = files.reduce((acc, f) => acc + (f.originalSize || 0), 0);
  const totalProcessed = files.reduce((acc, f) => acc + (f.processedSize || f.blob?.size || 0), 0);
  const totalSavedPercent = calculatePercentageSaved(totalOriginal, totalProcessed);

  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Success Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl text-center space-y-2.5">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
          Your File is Ready!
        </h3>
        {totalSavedPercent > 0 ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              Reduced by {totalSavedPercent}% ({formatBytes(totalOriginal)} → {formatBytes(totalProcessed)})
            </span>
          </div>
        ) : totalOriginal > 0 && totalProcessed > 0 ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-medium font-mono">
            <span>
              Optimal Fidelity ({formatBytes(totalOriginal)} → {formatBytes(totalProcessed)})
            </span>
          </div>
        ) : null}
      </div>

      {/* Files List */}
      <div className="space-y-3">
        {files.map((file, idx) => {
          const processedBytes = file.processedSize || file.blob?.size;
          const isImage = file.dataUrl || (file.blob && file.blob.type.startsWith('image/'));

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {file.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    {file.originalSize > 0 && <span>Original: {formatBytes(file.originalSize)}</span>}
                    {processedBytes !== undefined && (
                      <>
                        <span>•</span>
                        <span className="font-bold text-emerald-600">
                          Final: {formatBytes(processedBytes)}
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
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors border border-slate-200"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
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
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white text-xs font-bold shadow-md shadow-brand-600/25 inline-flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Text Result Preview */}
              {file.textResult && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 max-h-48 overflow-y-auto text-xs font-mono text-slate-800 whitespace-pre-wrap">
                  {file.textResult}
                </div>
              )}

              {/* Image Preview */}
              {isImage && file.dataUrl && (
                <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-2 max-h-60">
                  <img
                    src={file.dataUrl}
                    alt={file.name}
                    className="max-h-56 w-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result Page Ad Placement */}
      <AdSlot placement="result-page" />

      {/* Global Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Process Another</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            {shared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Tool</span>
              </>
            )}
          </button>
        </div>

        {files.length > 1 && onDownloadAllZip && (
          <button
            type="button"
            onClick={onDownloadAllZip}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 inline-flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All as ZIP</span>
          </button>
        )}
      </div>
    </div>
  );
}
