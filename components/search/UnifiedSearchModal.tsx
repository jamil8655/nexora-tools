'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  Command,
  ArrowRight,
  Clock,
  Zap,
  Layers,
  CheckCircle2,
  X,
  FileText,
  Image as ImageIcon,
  Video,
  Code,
  Shield,
  Calculator,
  Workflow,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from '@/components/shared/ToolIcon';
import { useAuth } from '@/lib/auth/auth-context';

interface IntentMapping {
  keywords: string[];
  toolId: string;
  recommendedReason: string;
  workflowSteps?: { toolName: string; purpose: string }[];
}

const NATURAL_LANGUAGE_INTENTS: IntentMapping[] = [
  {
    keywords: [
      'make pdf smaller',
      'compress pdf',
      'reduce pdf size',
      'shrink pdf',
      'compress my pdf',
      'pdf under 1mb',
      'pdf mb to kb',
      'reduce pdf',
    ],
    toolId: 'compress-pdf',
    recommendedReason: 'Best for reducing PDF file size without quality loss',
  },
  {
    keywords: [
      'pdf to editable word',
      'pdf to docx',
      'convert pdf to word',
      'ocr pdf',
      'pdf to doc',
      'scan to word',
      'extract text from pdf',
    ],
    toolId: 'pdf-to-docx',
    recommendedReason: 'Best for extracting text and layout into editable Word DOCX',
  },
  {
    keywords: [
      'make image 50kb',
      'make image 100kb',
      'resize image to 100kb',
      'image under 100kb',
      'shrink photo',
      'passport signature resize',
      'image mb to kb',
      'image exactly 100kb',
      'make photo smaller',
    ],
    toolId: 'image-resizer',
    recommendedReason: 'Best for resizing photos to exact KB/MB official limits',
  },
  {
    keywords: [
      'remove background',
      'transparent png',
      'erase background',
      'photo cutout',
      'remove bg',
      'white background photo',
    ],
    toolId: 'background-remover',
    recommendedReason: 'Best for in-browser AI background cutout with zero uploads',
    workflowSteps: [
      { toolName: 'Background Cutout', purpose: 'Transparent PNG' },
      { toolName: 'Image Resizer', purpose: 'Target Size (<50KB)' },
    ],
  },
  {
    keywords: [
      'passport size photo',
      'passport photo maker',
      '3.5x4.5 cm',
      '35x45',
      '2x2 visa photo',
      'upsc photo with date',
      '8 photos print sheet',
      'create passport photo',
    ],
    toolId: 'passport-photo-maker',
    recommendedReason: 'Best for official passport dimensions & printable multi-photo sheets',
    workflowSteps: [
      { toolName: 'Background Cutout', purpose: 'White Studio Backdrop' },
      { toolName: 'Passport Cropper', purpose: 'Exact 3.5x4.5cm Frame' },
      { toolName: 'Print Sheet', purpose: '8 Photos on 4x6" Sheet' },
    ],
  },
  {
    keywords: [
      'convert picture to webp',
      'convert image to webp',
      'png to webp',
      'jpg to webp',
      'webp converter',
    ],
    toolId: 'image-converter',
    recommendedReason: 'Best for next-gen lossless WebP conversion with 80% smaller size',
  },
  {
    keywords: [
      'extract audio from video',
      'video to mp3',
      'mp4 to mp3',
      'video to audio',
      'convert video to song',
    ],
    toolId: 'video-to-mp3',
    recommendedReason: 'Best for high-speed 320kbps MP3 audio extraction',
  },
  {
    keywords: [
      '4k video downloader',
      'download reels',
      'instagram video',
      'tiktok no watermark',
      'youtube 1080p',
      'save video',
    ],
    toolId: 'media-downloader',
    recommendedReason: 'Best for multi-engine 4K video downloads from 100+ platforms',
  },
  {
    keywords: [
      'combine pdfs',
      'join pdf',
      'merge documents',
      'merge pdf',
      'merge these documents',
    ],
    toolId: 'merge-pdf',
    recommendedReason: 'Best for combining multiple PDF files into one clean document',
  },
  {
    keywords: ['generate qr code', 'qr code', 'make qr', 'barcode generator', 'create qr code'],
    toolId: 'qr-code-generator',
    recommendedReason: 'Best for generating high-res QR codes and barcodes with custom styling',
  },
  {
    keywords: ['percentage calculator', 'calculate percentage', 'math calculator', 'discount calc'],
    toolId: 'percentage-calculator',
    recommendedReason: 'Best for calculating percentages, discounts, and ratio increases',
  },
  {
    keywords: ['json formatter', 'format json', 'beautify json', 'json validator'],
    toolId: 'json-formatter',
    recommendedReason: 'Best for validating and beautifying raw JSON structures',
  },
  {
    keywords: ['password generator', 'password strength', 'strong password', 'secure password'],
    toolId: 'password-generator',
    recommendedReason: 'Best for generating cryptographic high-entropy passwords',
  },
];

interface UnifiedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function UnifiedSearchModal({
  isOpen,
  onClose,
  initialQuery = '',
}: UnifiedSearchModalProps) {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open modal logic handled by trigger or global state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // 1. Natural Language Intent Match
  const matchedIntent = normalizedQuery
    ? NATURAL_LANGUAGE_INTENTS.find((item) =>
        item.keywords.some((kw) => normalizedQuery.includes(kw) || kw.includes(normalizedQuery))
      )
    : null;

  // 2. Direct Tools Search
  const matchingTools = normalizedQuery
    ? TOOLS_LIST.filter((tool) => {
        const nameMatch = tool.name.toLowerCase().includes(normalizedQuery);
        const descMatch = tool.shortDesc.toLowerCase().includes(normalizedQuery);
        const tagMatch = tool.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
        const catMatch = tool.category.toLowerCase().includes(normalizedQuery);
        return nameMatch || descMatch || tagMatch || catMatch;
      }).slice(0, 8)
    : TOOLS_LIST.filter((t) => t.popular).slice(0, 6);

  // 3. Matched Primary Tool
  const primaryTool = matchedIntent
    ? TOOLS_LIST.find((t) => t.id === matchedIntent.toolId || t.slug === matchedIntent.toolId)
    : null;

  // 4. Admin Search Inclusion (Only for verified admin)
  const showAdminOption = isAdmin && normalizedQuery.includes('admin');

  const handleSelectTool = (tool: ToolDefinition) => {
    router.push(`/tools/${tool.slug || tool.id}`);
    onClose();
  };

  const handleNavigateWorkflow = () => {
    router.push('/workflows');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-brand-600 dark:text-brand-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="What do you want to do? (e.g. Compress PDF, Make image 100 KB, Passport photo)..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none"
          />

          <div className="flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 font-bold border border-slate-200 dark:border-slate-700"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* A. AI Intent Best Match Card */}
          {primaryTool && matchedIntent && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-brand-950/40 dark:to-indigo-950/40 border border-brand-200 dark:border-brand-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  <span>Best Match for Your Goal</span>
                </span>
                <span className="px-2 py-0.2 rounded text-[9px] font-black uppercase bg-brand-600 text-white">
                  RECOMMENDED
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {primaryTool.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {matchedIntent.recommendedReason}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectTool(primaryTool)}
                  className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Multi-step Workflow Suggestion if intent matches multi-tool */}
              {matchedIntent.workflowSteps && (
                <div className="pt-2 border-t border-brand-200/60 dark:border-brand-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-bold">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Automated Workflow: {matchedIntent.workflowSteps.map((s) => s.toolName).join(' ➔ ')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNavigateWorkflow}
                    className="font-bold text-purple-600 dark:text-purple-400 hover:underline text-[11px]"
                  >
                    Open Workflow ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* B. Admin Center Match (Only for verified Admin) */}
          {showAdminOption && (
            <div
              onClick={() => {
                router.push('/admin');
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-bold text-xs">NEXORA Admin Control Center</div>
                  <div className="text-[10px] text-slate-400">System Telemetry, User Roles, and Tool Switches</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-600 text-white">
                ADMIN ONLY
              </span>
            </div>
          )}

          {/* C. Matching Tools List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <span>{query ? `Matching Tools (${matchingTools.length})` : 'Popular Tools'}</span>
              <span>100% In-Browser</span>
            </div>

            {matchingTools.length === 0 && !primaryTool ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  No exact tool matched &ldquo;{query}&rdquo;
                </p>
                <p className="text-[11px] text-slate-400">
                  Try searching for: <span className="text-brand-600 font-semibold cursor-pointer" onClick={() => setQuery('compress pdf')}>Compress PDF</span>, <span className="text-brand-600 font-semibold cursor-pointer" onClick={() => setQuery('passport photo')}>Passport Photo</span>, or <span className="text-brand-600 font-semibold cursor-pointer" onClick={() => setQuery('remove background')}>Remove Background</span>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500 hover:bg-brand-50/40 dark:hover:bg-brand-950/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ToolIcon name={tool.icon} className="w-4 h-4 text-brand-600 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 dark:text-white truncate group-hover:text-brand-600">
                          {tool.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {tool.shortDesc}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Guidance */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Type your task in plain words</span>
            <span>•</span>
            <span>Zero cloud uploads</span>
          </div>
          <span className="font-mono text-[10px]">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
