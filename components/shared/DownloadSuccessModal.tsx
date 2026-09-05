'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  FolderCheck,
  Share2,
  X,
  FileText,
  FileImage,
  FileArchive,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  Eye,
} from 'lucide-react';
import { SavedFileInfo, openDownloadedFile } from '@/lib/utils/download';
import { formatBytes } from '@/lib/utils/formatters';
import { shareFileNative, isNativeAndroid } from '@/lib/native/android-bridge';
import { triggerHaptic } from '@/lib/motion/motion-system';

interface DownloadSuccessModalProps {
  fileInfo: SavedFileInfo | null;
  onClose: () => void;
}

export function DownloadSuccessModal({ fileInfo, onClose }: DownloadSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (fileInfo) {
      triggerHaptic('success');
    }
  }, [fileInfo]);

  if (!fileInfo) return null;

  const getFileIcon = (name: string, mime: string) => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp'].includes(ext) || mime.startsWith('image/')) {
      return <FileImage className="w-8 h-8 text-blue-500" />;
    }
    if (['pdf'].includes(ext) || mime.includes('pdf')) {
      return <FileText className="w-8 h-8 text-rose-500" />;
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext) || mime.includes('zip')) {
      return <FileArchive className="w-8 h-8 text-amber-500" />;
    }
    if (['xlsx', 'xls', 'csv'].includes(ext) || mime.includes('spreadsheet') || mime.includes('csv')) {
      return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
    }
    if (['json', 'html', 'js', 'ts', 'txt', 'md'].includes(ext)) {
      return <FileCode className="w-8 h-8 text-indigo-500" />;
    }
    return <FileText className="w-8 h-8 text-brand-500" />;
  };

  const handleOpen = async () => {
    setOpening(true);
    triggerHaptic('light');
    try {
      await openDownloadedFile(fileInfo);
    } finally {
      setTimeout(() => setOpening(false), 500);
    }
  };

  const handleShare = async () => {
    triggerHaptic('light');
    if (isNativeAndroid() && fileInfo.name) {
      await shareFileNative(
        fileInfo.name,
        `Processed file: ${fileInfo.name}`,
        typeof window !== 'undefined' ? window.location.href : undefined
      );
    } else if (navigator.share) {
      try {
        if (fileInfo.blob) {
          const file = new File([fileInfo.blob], fileInfo.name, { type: fileInfo.mimeType });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: fileInfo.name,
            });
            return;
          }
        }
        await navigator.share({
          title: fileInfo.name,
          text: `Processed file with NEXORA Tools Pro: ${fileInfo.name}`,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled share
      }
    } else {
      await navigator.clipboard.writeText(fileInfo.name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white dark:bg-slate-900 border-t sm:border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Indicator */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>DOWNLOAD COMPLETE</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Detail Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-xs">
            {getFileIcon(fileInfo.name, fileInfo.mimeType)}
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
              {fileInfo.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {formatBytes(fileInfo.size)}
              </span>
              <span>•</span>
              <span className="truncate">{fileInfo.mimeType.split('/')[1]?.toUpperCase() || 'FILE'}</span>
            </div>
          </div>
        </div>

        {/* Storage Location Badge */}
        <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 flex items-center gap-2.5 text-xs text-blue-900 dark:text-blue-200 font-medium">
          <FolderCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate">
            Saved to: <strong className="font-bold font-mono">{fileInfo.savedPath}</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleOpen}
            disabled={opening}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>{opening ? 'Opening File...' : 'Open & View File'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Name Copied!' : 'Share File'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center transition-colors active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
