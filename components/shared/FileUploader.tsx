'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  File,
  X,
  AlertCircle,
  FileText,
  FileSpreadsheet,
  FolderArchive,
  Image as ImageIcon,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils/formatters';
import { useI18n } from '@/lib/i18n/i18n-context';
import { triggerHaptic } from '@/lib/motion/motion-system';

interface FileUploaderProps {
  acceptedExtensions: string[];
  acceptedMimeTypes: string[];
  maxFiles: number;
  maxFileSizeMB: number;
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile?: (index: number) => void;
  disabled?: boolean;
}

export function FileUploader({
  acceptedExtensions,
  acceptedMimeTypes,
  maxFiles,
  maxFileSizeMB,
  onFilesSelected,
  selectedFiles,
  onRemoveFile,
  disabled = false,
}: FileUploaderProps) {
  const { t } = useI18n();
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndAddFiles = (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles: File[] = [];
    const filesArray = Array.from(fileList);

    if (selectedFiles.length + filesArray.length > maxFiles && maxFiles > 1) {
      setErrorMessage(`You can upload a maximum of ${maxFiles} files at once.`);
      return;
    }

    for (const file of filesArray) {
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setErrorMessage(`File "${file.name}" exceeds the limit of ${maxFileSizeMB} MB.`);
        continue;
      }

      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const hasValidExt =
        acceptedExtensions.length === 0 ||
        acceptedExtensions.some((e) => e.toLowerCase() === ext);
      const hasValidMime =
        acceptedMimeTypes.length === 0 ||
        acceptedMimeTypes.some((m) => file.type.startsWith(m.replace('/*', '')));

      if (acceptedExtensions.length > 0 && !hasValidExt && !hasValidMime) {
        setErrorMessage(`Unsupported file format "${ext}". Allowed: ${acceptedExtensions.join(', ')}`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      triggerHaptic('light');
      if (maxFiles === 1) {
        onFilesSelected([validFiles[0]]);
      } else {
        onFilesSelected([...selectedFiles, ...validFiles]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        validateAndAddFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [selectedFiles, maxFiles]);

  // Helper to render genuine, recognizable file icons
  const renderFileIcon = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    if (file.type.startsWith('image/')) {
      return (
        <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 overflow-hidden">
          <ImageIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      );
    }

    if (ext === 'pdf' || file.type === 'application/pdf') {
      return (
        <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
        </div>
      );
    }

    if (['xlsx', 'xls', 'csv'].includes(ext)) {
      return (
        <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
      );
    }

    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
      return (
        <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-center shrink-0">
          <FolderArchive className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
      );
    }

    return (
      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
        <File className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative rounded-3xl p-6 sm:p-10 text-center transition-all duration-200 cursor-pointer select-none border-2 border-dashed ${
          isDragging
            ? 'border-brand-500 bg-brand-500/10 scale-[1.01] shadow-xl shadow-brand-500/10'
            : 'border-slate-300 dark:border-slate-700/80 hover:border-brand-400 dark:hover:border-brand-500/60 bg-slate-50/80 dark:bg-slate-900/60'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedExtensions.join(',') || acceptedMimeTypes.join(',')}
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              validateAndAddFiles(e.target.files);
              e.target.value = '';
            }
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-600/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 flex items-center justify-center shadow-xs">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="space-y-0.5 max-w-sm">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {isDragging ? 'Drop file to select' : 'Select or drop files'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browse from your device
            </p>
          </div>

          <button
            type="button"
            disabled={disabled}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition-all inline-flex items-center gap-2 select-none"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Choose Files</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 font-medium">
            {acceptedExtensions.length > 0 && (
              <span>Formats: {acceptedExtensions.join(', ').toUpperCase()}</span>
            )}
            <span>•</span>
            <span>Max: {maxFileSizeMB} MB</span>
            {maxFiles > 1 && (
              <>
                <span>•</span>
                <span>Limit: {maxFiles} files</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected Files Queue */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>
              Selected ({selectedFiles.length}{maxFiles > 1 ? ` / ${maxFiles}` : ''})
            </span>
            {onRemoveFile && selectedFiles.length > 1 && (
              <button
                type="button"
                onClick={() => onFilesSelected([])}
                className="text-rose-500 hover:text-rose-600 text-xs font-semibold"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {renderFileIcon(file)}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[180px] sm:max-w-[220px]">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>

                {onRemoveFile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFile(idx);
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
