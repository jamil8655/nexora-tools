'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, File, X, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { formatBytes } from '@/lib/utils/formatters';
import { useI18n } from '@/lib/i18n/i18n-context';

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
      // Size check
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        setErrorMessage(`File "${file.name}" exceeds the maximum limit of ${maxFileSizeMB} MB.`);
        continue;
      }

      // Extension / Mime validation
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const hasValidExt = acceptedExtensions.length === 0 || acceptedExtensions.some((e) => e.toLowerCase() === ext);
      const hasValidMime = acceptedMimeTypes.length === 0 || acceptedMimeTypes.some((m) => file.type.startsWith(m.replace('/*', '')));

      if (acceptedExtensions.length > 0 && !hasValidExt && !hasValidMime) {
        setErrorMessage(`Unsupported file format "${ext}". Allowed formats: ${acceptedExtensions.join(', ')}`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
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

  // Clipboard paste support for images
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        validateAndAddFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [selectedFiles, maxFiles]);

  return (
    <div className="w-full space-y-4">
      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none ${
          isDragging
            ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 bg-slate-50/50 dark:bg-slate-900/30'
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
          <div className="w-16 h-16 rounded-2xl bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t.dropzoneTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.dropzoneSubtitle}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={disabled}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-medium text-sm shadow-md hover:shadow-brand-500/25 transition-all inline-flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{t.chooseFiles}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-2">
            {acceptedExtensions.length > 0 && (
              <span>Supported: {acceptedExtensions.join(', ').toUpperCase()}</span>
            )}
            <span>•</span>
            <span>Max file size: {maxFileSizeMB} MB</span>
            {maxFiles > 1 && (
              <>
                <span>•</span>
                <span>Max files: {maxFiles}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected Files Queue */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>
              Selected Files ({selectedFiles.length}{maxFiles > 1 ? ` / ${maxFiles}` : ''})
            </span>
            {onRemoveFile && selectedFiles.length > 1 && (
              <button
                type="button"
                onClick={() => onFilesSelected([])}
                className="text-rose-500 hover:text-rose-600 text-xs font-normal"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto p-1">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300">
                    {file.type.startsWith('image/') ? (
                      <ImageIcon className="w-4 h-4 text-brand-500" />
                    ) : (
                      <File className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-800 dark:text-slate-100 truncate">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
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
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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
