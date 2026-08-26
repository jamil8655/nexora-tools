'use client';

import React, { useState } from 'react';
import { runOcr, OcrResult } from '@/lib/ocr/ocr-engine';
import { FileUploader } from '@/components/shared/FileUploader';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { ScanText, Copy, Check, Download, Languages, Sparkles } from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';
import { addHistoryItem } from '@/lib/storage/file-store';

export function OcrStudio() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [language, setLanguage] = useState<string>('eng');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStartOcr = async () => {
    if (selectedFiles.length === 0) return;
    setIsProcessing(true);
    setProgress(10);
    setStatusText('Initializing OCR Web Worker engine...');
    setErrorMsg(null);
    setOcrResult(null);

    try {
      const file = selectedFiles[0];
      const result = await runOcr(file, language, (pct, status) => {
        setProgress(pct);
        setStatusText(status);
      });

      setOcrResult(result);
      addHistoryItem({
        toolId: 'ocr-image-to-text',
        toolName: 'OCR Image to Text',
        fileName: file.name,
        originalSize: file.size,
        outputSize: result.text.length,
        success: true,
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'OCR Recognition failed. Please try a clearer image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!ocrResult?.text) return;
    navigator.clipboard.writeText(ocrResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!ocrResult?.text) return;
    const blob = new Blob([ocrResult.text], { type: 'text/plain;charset=utf-8' });
    downloadSingleFile(blob, `ocr-extracted-text.txt`);
  };

  return (
    <div className="space-y-6">
      {/* Upload & Config Area */}
      {!ocrResult && !isProcessing && (
        <div className="space-y-6">
          <FileUploader
            acceptedExtensions={['.jpg', '.jpeg', '.png', '.webp', '.bmp']}
            acceptedMimeTypes={['image/*']}
            maxFiles={1}
            maxFileSizeMB={25}
            selectedFiles={selectedFiles}
            onFilesSelected={setSelectedFiles}
            onRemoveFile={() => setSelectedFiles([])}
          />

          {selectedFiles.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-brand-500" />
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Document Text Language
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Select the primary language of the text in your image
                  </p>
                </div>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-100"
              >
                <option value="eng">English (Latin)</option>
                <option value="ara">العربية (Arabic)</option>
                <option value="urd">اردو (Urdu)</option>
                <option value="hin">हिन्दी (Hindi)</option>
                <option value="spa">Spanish (Español)</option>
                <option value="fra">French (Français)</option>
                <option value="deu">German (Deutsch)</option>
              </select>
            </div>
          )}

          {selectedFiles.length > 0 && (
            <button
              type="button"
              onClick={handleStartOcr}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 text-white font-bold text-base shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2"
            >
              <ScanText className="w-5 h-5" />
              <span>Extract Text with OCR</span>
            </button>
          )}
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="py-12 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 dark:bg-brand-950/40 border-2 border-brand-500 border-t-transparent animate-spin flex items-center justify-center" />
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Extracting Text with OCR...
            </h3>
            <ProgressBar progress={progress} statusText={statusText} />
          </div>
        </div>
      )}

      {/* Result Display */}
      {ocrResult && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
                {ocrResult.confidence}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  OCR Recognition Completed
                </h4>
                <p className="text-xs text-slate-500">
                  Confidence score: {ocrResult.confidence}% • {ocrResult.text.length} characters extracted
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadTxt}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-brand-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Export .TXT</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={12}
              value={ocrResult.text}
              onChange={(e) => setOcrResult({ ...ocrResult, text: e.target.value })}
              className="w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setOcrResult(null);
                setSelectedFiles([]);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200"
            >
              Scan Another Document
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
