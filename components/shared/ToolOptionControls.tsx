'use client';

import React from 'react';
import { ToolDefinition } from '@/lib/types';
import {
  Sliders,
  Zap,
  Layers,
  RotateCw,
  Stamp,
  Hash,
  Scissors,
  FileImage,
  Sparkles,
  Maximize2,
  Lock,
  Unlock,
  Settings2,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils/formatters';

interface ToolOptionControlsProps {
  tool: ToolDefinition;
  files: File[];
  options: Record<string, any>;
  onOptionsChange: (newOptions: Record<string, any>) => void;
}

export function ToolOptionControls({
  tool,
  files,
  options,
  onOptionsChange,
}: ToolOptionControlsProps) {
  const updateOption = (key: string, val: any) => {
    onOptionsChange({ ...options, [key]: val });
  };

  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
  const isImageCompress = tool.id.includes('compress') && tool.category === 'image';
  const isImageResize = tool.id.includes('resize') && tool.category === 'image';
  const isImageConvert = (tool.id.includes('to-') || tool.id.includes('convert')) && tool.category === 'image';
  const isPdfCompress = tool.id.includes('compress') && tool.category === 'pdf';
  const isPdfSplit = (tool.id.includes('split') || tool.id.includes('extract')) && tool.category === 'pdf';
  const isPdfRotate = tool.id.includes('rotate') && tool.category === 'pdf';
  const isPdfWatermark = tool.id.includes('watermark');
  const isPdfPageNumbers = tool.id.includes('page-numbers') || tool.id.includes('number');
  const isImageToPdf = tool.id.includes('image-to-pdf') || tool.id.includes('images-to-pdf');

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-white">
          <Settings2 className="w-4 h-4 text-brand-500" />
          <span>Tool Customization & Quality Settings</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          Selected: {files.length} file(s) ({formatBytes(totalBytes)})
        </span>
      </div>

      {/* 1. IMAGE COMPRESSION CONTROLS */}
      {isImageCompress && (
        <div className="space-y-4">
          {/* Quick Target Size Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                🎯 Target File Size Preset (For Govt/Job/Passport Portals):
              </label>
              <span className="text-xs font-mono font-bold text-brand-600">
                {options.targetKb ? `< ${options.targetKb} KB` : 'Custom Slider'}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[20, 50, 100, 200, 500, 1000].map((kb) => {
                const isSelected = options.targetKb === kb;
                return (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => {
                      updateOption('targetKb', isSelected ? null : kb);
                      if (!isSelected) {
                        updateOption('quality', Math.max(0.2, Math.min(0.9, (kb * 1024) / totalBytes)));
                      }
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compression Level Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Compression Strength:</span>
              <span className="font-mono text-brand-600 dark:text-brand-400 font-extrabold text-sm">
                {Math.round((1 - (options.quality ?? 0.75)) * 100)}% Compressed ({Math.round((options.quality ?? 0.75) * 100)}% Quality)
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.95}
              step={0.05}
              value={options.quality ?? 0.75}
              onChange={(e) => {
                updateOption('quality', parseFloat(e.target.value));
                updateOption('targetKb', null);
              }}
              className="w-full accent-brand-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Maximum Compression (Smaller KB)</span>
              <span>Balanced (Recommended)</span>
              <span>High Quality (Preserve detail)</span>
            </div>
          </div>

          {/* Format & Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Output Format:</label>
              <select
                value={options.outputFormat || 'image/jpeg'}
                onChange={(e) => updateOption('outputFormat', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="image/jpeg">JPEG / JPG (Best Compression)</option>
                <option value="image/webp">WebP (Modern Next-Gen)</option>
                <option value="image/png">PNG (Lossless Quality)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Resolution Scale:</label>
              <select
                value={options.scale || '1'}
                onChange={(e) => updateOption('scale', parseFloat(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="1">100% (Original Dimensions)</option>
                <option value="0.75">75% (3/4 Scale)</option>
                <option value="0.5">50% (Half Resolution)</option>
                <option value="0.25">25% (Quarter Resolution)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 2. PDF COMPRESSION CONTROLS */}
      {isPdfCompress && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              ⚡ PDF Compression Preset:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'extreme', label: 'Extreme (< 200 KB)', desc: 'Heavy image downsampling, highest compression' },
                { id: 'medium', label: 'Recommended', desc: 'Optimal balance between sharpness and small size' },
                { id: 'low', label: 'Less Compression', desc: 'Preserves high-resolution images and vectors' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => updateOption('level', lvl.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    (options.level || 'medium') === lvl.id
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">{lvl.label}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Size Limit:</label>
              <select
                value={options.targetSizeLimit || 'auto'}
                onChange={(e) => updateOption('targetSizeLimit', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="auto">Automatic (Best fit)</option>
                <option value="100kb">Under 100 KB</option>
                <option value="200kb">Under 200 KB</option>
                <option value="500kb">Under 500 KB</option>
                <option value="1mb">Under 1 MB</option>
                <option value="2mb">Under 2 MB</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">DPI Downsampling:</label>
              <select
                value={options.dpi || '150'}
                onChange={(e) => updateOption('dpi', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="72">72 DPI (Web Screen)</option>
                <option value="150">150 DPI (Standard Documents)</option>
                <option value="300">300 DPI (High-Definition Print)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. PDF SPLIT & EXTRACT CONTROLS */}
      {isPdfSplit && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Split Method:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'Split All Pages' },
                { id: 'range', label: 'Specific Page Range' },
                { id: 'odd-even', label: 'Extract Odd / Even' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => updateOption('splitMode', m.id)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border ${
                    (options.splitMode || 'all') === m.id
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {options.splitMode === 'range' && (
            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Page Range (e.g. 1-3, 5, 8-10):
              </label>
              <input
                type="text"
                placeholder="1-3, 5"
                value={options.pageRange || ''}
                onChange={(e) => updateOption('pageRange', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
              />
            </div>
          )}
        </div>
      )}

      {/* 4. PDF ROTATE CONTROLS */}
      {isPdfRotate && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Rotation Angle:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '90', label: '90° Clockwise' },
              { id: '180', label: '180° Flip' },
              { id: '270', label: '270° Counter-Clockwise' },
            ].map((deg) => (
              <button
                key={deg.id}
                type="button"
                onClick={() => updateOption('angle', deg.id)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 ${
                  (options.angle || '90') === deg.id
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{deg.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. PDF WATERMARK CONTROLS */}
      {isPdfWatermark && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Watermark Text:</label>
              <input
                type="text"
                value={options.text || 'CONFIDENTIAL'}
                onChange={(e) => updateOption('text', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Opacity ({Math.round((options.opacity ?? 0.3) * 100)}%):
              </label>
              <input
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={options.opacity ?? 0.3}
                onChange={(e) => updateOption('opacity', parseFloat(e.target.value))}
                className="w-full accent-rose-600 mt-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. PDF PAGE NUMBERS CONTROLS */}
      {isPdfPageNumbers && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Position:</label>
              <select
                value={options.position || 'bottom-center'}
                onChange={(e) => updateOption('position', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Numbering Format:</label>
              <select
                value={options.format || 'Page {n} of {total}'}
                onChange={(e) => updateOption('format', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="Page {n} of {total}">Page 1 of 10</option>
                <option value="{n} / {total}">1 / 10</option>
                <option value="{n}">1, 2, 3...</option>
                <option value="Page {n}">Page 1</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 7. IMAGE TO PDF CONTROLS */}
      {isImageToPdf && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Page Orientation:</label>
            <select
              value={options.orientation || 'portrait'}
              onChange={(e) => updateOption('orientation', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="auto">Auto (Match Image)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Page Margin:</label>
            <select
              value={options.margin || 'none'}
              onChange={(e) => updateOption('margin', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="none">No Margin (Full Bleed)</option>
              <option value="small">Small Margin (10px)</option>
              <option value="large">Big Margin (30px)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Document Page Size:</label>
            <select
              value={options.pageSize || 'a4'}
              onChange={(e) => updateOption('pageSize', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="a4">A4 Standard</option>
              <option value="letter">US Letter</option>
              <option value="fit">Fit to Exact Image</option>
            </select>
          </div>
        </div>
      )}

      {/* Fallback Custom Tool Options if tool defined them */}
      {tool.options && tool.options.length > 0 && !isImageCompress && !isPdfCompress && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {tool.options.map((opt) => (
            <div key={opt.id} className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {opt.label}
              </label>
              {opt.type === 'select' && (
                <select
                  value={options[opt.id] || opt.defaultValue}
                  onChange={(e) => updateOption(opt.id, e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                >
                  {opt.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {opt.type === 'text' && (
                <input
                  type="text"
                  value={options[opt.id] ?? opt.defaultValue ?? ''}
                  placeholder={opt.placeholder}
                  onChange={(e) => updateOption(opt.id, e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
