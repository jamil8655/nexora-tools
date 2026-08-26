'use client';

import React, { useState } from 'react';
import { ToolDefinition } from '@/lib/types';
import { Breadcrumbs } from './Breadcrumbs';
import { PrivacyBadge } from './PrivacyBadge';
import { FileUploader } from './FileUploader';
import { ProgressBar } from './ProgressBar';
import { ResultPreview } from './ResultPreview';
import { Play, Settings2, HelpCircle } from 'lucide-react';
import { downloadSingleFile, downloadAsZip } from '@/lib/utils/download';
import { addHistoryItem } from '@/lib/storage/file-store';
import { useI18n } from '@/lib/i18n/i18n-context';

interface ToolLayoutProps {
  tool: ToolDefinition;
  onProcess: (
    files: File[],
    options: Record<string, any>,
    onProgress: (percent: number, statusText: string) => void
  ) => Promise<
    {
      name: string;
      originalSize: number;
      processedSize?: number;
      blob?: Blob;
      dataUrl?: string;
      textResult?: string;
    }[]
  >;
  customWorkspace?: React.ReactNode;
}

export function ToolLayout({ tool, onProcess, customWorkspace }: ToolLayoutProps) {
  const { t } = useI18n();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    tool.options?.forEach((opt) => {
      initial[opt.id] = opt.defaultValue;
    });
    return initial;
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [results, setResults] = useState<
    {
      name: string;
      originalSize: number;
      processedSize?: number;
      blob?: Blob;
      dataUrl?: string;
      textResult?: string;
    }[]
    | null
  >(null);

  const handleStartProcess = async () => {
    if (selectedFiles.length === 0 && tool.maxFiles > 0) return;
    setIsProcessing(true);
    setProgress(10);
    setProgressStatus('Initializing engine...');
    setErrorMessage(null);

    try {
      const outputFiles = await onProcess(selectedFiles, options, (pct, status) => {
        setProgress(pct);
        setProgressStatus(status);
      });

      setResults(outputFiles);

      // Record in history
      outputFiles.forEach((out) => {
        addHistoryItem({
          toolId: tool.id,
          toolName: tool.name,
          fileName: out.name,
          originalSize: out.originalSize || 0,
          outputSize: out.processedSize || out.blob?.size,
          success: true,
        });
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Your file could not be processed. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (index: number) => {
    if (!results || !results[index]) return;
    const file = results[index];
    if (file.blob) {
      downloadSingleFile(file.blob, file.name);
    } else if (file.textResult) {
      const blob = new Blob([file.textResult], { type: 'text/plain;charset=utf-8' });
      downloadSingleFile(blob, file.name);
    }
  };

  const handleDownloadAllZip = () => {
    if (!results) return;
    const zipFiles: { name: string; blob: Blob }[] = [];
    results.forEach((r) => {
      if (r.blob) {
        zipFiles.push({ name: r.name, blob: r.blob });
      } else if (r.textResult) {
        zipFiles.push({ name: r.name, blob: new Blob([r.textResult], { type: 'text/plain' }) });
      }
    });
    downloadAsZip(zipFiles, `${tool.slug}-result.zip`);
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setResults(null);
    setProgress(0);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: tool.category.toUpperCase(), href: `/tools?cat=${tool.category}` },
          { label: tool.name },
        ]}
      />

      {/* Tool Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={tool.isClientSide} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {tool.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {tool.fullDesc || tool.shortDesc}
        </p>
      </div>

      {/* Main Tool Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xl shadow-slate-200/40 dark:shadow-none backdrop-blur-md">
        {/* Custom interactive workspace (for calculators, QR, visual editor) */}
        {customWorkspace ? (
          customWorkspace
        ) : results ? (
          <ResultPreview
            files={results}
            onDownloadSingle={handleDownloadSingle}
            onDownloadAllZip={results.length > 1 ? handleDownloadAllZip : undefined}
            onReset={handleReset}
          />
        ) : isProcessing ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 dark:bg-brand-950/40 border-2 border-brand-500 border-t-transparent animate-spin flex items-center justify-center" />
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                {t.processing}
              </h3>
              <ProgressBar progress={progress} statusText={progressStatus} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Upload Zone */}
            {tool.maxFiles > 0 && (
              <FileUploader
                acceptedExtensions={tool.acceptedExtensions}
                acceptedMimeTypes={tool.acceptedMimeTypes}
                maxFiles={tool.maxFiles}
                maxFileSizeMB={tool.maxFileSizeMB}
                selectedFiles={selectedFiles}
                onFilesSelected={setSelectedFiles}
                onRemoveFile={(idx) => setSelectedFiles((prev) => prev.filter((_, i) => i !== idx))}
              />
            )}

            {/* Configurable Tool Options */}
            {tool.options && tool.options.length > 0 && selectedFiles.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <Settings2 className="w-4 h-4 text-brand-500" />
                  <span>Conversion Settings</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tool.options.map((opt) => (
                    <div key={opt.id} className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {opt.label}
                      </label>

                      {opt.type === 'select' && (
                        <select
                          value={options[opt.id]}
                          onChange={(e) => setOptions({ ...options, [opt.id]: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        >
                          {opt.options?.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {opt.type === 'slider' && (
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={opt.min}
                            max={opt.max}
                            step={opt.step}
                            value={options[opt.id]}
                            onChange={(e) => setOptions({ ...options, [opt.id]: parseFloat(e.target.value) })}
                            className="flex-1 accent-brand-600"
                          />
                          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 min-w-[36px] text-right">
                            {options[opt.id]}
                          </span>
                        </div>
                      )}

                      {opt.type === 'text' && (
                        <input
                          type="text"
                          value={options[opt.id]}
                          placeholder={opt.placeholder}
                          onChange={(e) => setOptions({ ...options, [opt.id]: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      )}

                      {opt.type === 'password' && (
                        <input
                          type="password"
                          value={options[opt.id]}
                          placeholder={opt.placeholder}
                          onChange={(e) => setOptions({ ...options, [opt.id]: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      )}

                      {opt.type === 'color' && (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={options[opt.id]}
                            onChange={(e) => setOptions({ ...options, [opt.id]: e.target.value })}
                            className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-600 p-0.5 bg-white dark:bg-slate-800"
                          />
                          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                            {options[opt.id]}
                          </span>
                        </div>
                      )}

                      {opt.type === 'checkbox' && (
                        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={options[opt.id]}
                            onChange={(e) => setOptions({ ...options, [opt.id]: e.target.checked })}
                            className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                          />
                          <span>Enable option</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
                {errorMessage}
              </div>
            )}

            {/* Action Trigger Button */}
            {(selectedFiles.length > 0 || tool.maxFiles === 0) && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartProcess}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 active:scale-[0.99] text-white font-bold text-base shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2.5"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start {tool.name}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FAQ & Information Section */}
      {tool.faq && tool.faq.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-slate-800 dark:text-slate-100">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <span>Frequently Asked Questions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.faq.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {item.question}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
