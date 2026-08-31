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
} from 'lucide-react';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from '@/components/shared/ToolIcon';

interface IntentMapping {
  keywords: string[];
  toolId: string;
  recommendedReason: string;
}

const NATURAL_LANGUAGE_INTENTS: IntentMapping[] = [
  {
    keywords: ['make pdf smaller', 'compress pdf', 'reduce pdf size', 'shrink pdf', 'compress my pdf', 'pdf under 1mb', 'pdf mb to kb'],
    toolId: 'compress-pdf',
    recommendedReason: 'Best for reducing PDF file size without quality loss',
  },
  {
    keywords: ['pdf to editable word', 'pdf to docx', 'convert pdf to word', 'ocr pdf', 'pdf to doc', 'scan to word'],
    toolId: 'pdf-to-docx',
    recommendedReason: 'Best for extracting text and layout into editable Word DOCX',
  },
  {
    keywords: ['make image 50kb', 'resize image to 100kb', 'image under 100kb', 'shrink photo', 'passport signature resize', 'image mb to kb'],
    toolId: 'image-resizer',
    recommendedReason: 'Best for resizing photos to exact KB/MB official limits',
  },
  {
    keywords: ['remove background', 'transparent png', 'erase background', 'photo cutout', 'remove bg', 'white background photo'],
    toolId: 'background-remover',
    recommendedReason: 'Best for in-browser AI background cutout with zero uploads',
  },
  {
    keywords: ['passport size photo', 'passport photo maker', '3.5x4.5 cm', '2x2 visa photo', 'upsc photo with date', '8 photos print sheet'],
    toolId: 'passport-photo-maker',
    recommendedReason: 'Best for official passport dimensions & printable 4x6" multi-photo sheets',
  },
  {
    keywords: ['extract audio from video', 'video to mp3', 'mp4 to mp3', 'video to audio', 'convert video to song'],
    toolId: 'video-to-mp3',
    recommendedReason: 'Best for high-speed 320kbps MP3 audio extraction',
  },
  {
    keywords: ['4k video downloader', 'download reels', 'instagram video', 'tiktok no watermark', 'youtube 1080p', 'save video'],
    toolId: 'media-downloader',
    recommendedReason: 'Best for multi-engine 4K video downloads from 100+ sites',
  },
  {
    keywords: ['cut audio', 'trim song', 'make ringtone', 'audio cutter', 'slice mp3'],
    toolId: 'audio-cutter',
    recommendedReason: 'Best for visual waveform audio trimming & ringtones',
  },
  {
    keywords: ['call without number', 'mask phone number', 'anonymous call', 'parking qr', 'webrtc call'],
    toolId: 'qr-generator',
    recommendedReason: 'Best for zero-number in-browser WebRTC voice calling',
  },
  {
    keywords: ['combine pdfs', 'join pdf', 'merge documents', 'merge pdf'],
    toolId: 'merge-pdf',
    recommendedReason: 'Best for combining multiple PDF files into one',
  },
  {
    keywords: ['pdf to images', 'pdf to jpg', 'pdf to png', 'extract pages as images', '300 dpi pdf'],
    toolId: 'pdf-to-image',
    recommendedReason: 'Best for 300 DPI high-res page extraction & ZIP download',
  },
];

export function UniversalSearchEngine({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      try {
        const saved = localStorage.getItem('nexora_recent_searches');
        if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {}
    }
  }, [isOpen]);

  const cleanQuery = query.trim().toLowerCase();

  // 1. Natural Language Intent Matching
  const matchedIntent = NATURAL_LANGUAGE_INTENTS.find((intent) =>
    intent.keywords.some((k) => cleanQuery.includes(k) || k.includes(cleanQuery))
  );

  const recommendedTool = matchedIntent
    ? TOOLS_LIST.find((t) => t.id === matchedIntent.toolId || t.slug === matchedIntent.toolId)
    : null;

  // 2. Keyword & Fuzzy Matching across all tools
  const searchResults = TOOLS_LIST.filter((tool) => {
    if (!cleanQuery) return true;
    if (recommendedTool && tool.id === recommendedTool.id) return false; // Show in top spotlight

    const nameMatch = tool.name.toLowerCase().includes(cleanQuery);
    const descMatch = tool.shortDesc.toLowerCase().includes(cleanQuery);
    const tagMatch = tool.tags.some((t) => t.toLowerCase().includes(cleanQuery));
    const catMatch = tool.category.toLowerCase().includes(cleanQuery);
    return nameMatch || descMatch || tagMatch || catMatch;
  }).slice(0, 8);

  const handleSelectTool = (tool: ToolDefinition) => {
    // Save to recents
    try {
      const updated = [tool.name, ...recentSearches.filter((s) => s !== tool.name)].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('nexora_recent_searches', JSON.stringify(updated));
    } catch (e) {}

    onClose();
    router.push(`/tools/${tool.slug || tool.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden space-y-0"
        onKeyDown={handleKeyDown}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/40">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to do? (e.g. compress my PDF, make image 50kb, remove bg)..."
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* AI / Natural Language Top Recommendation Spotlight */}
          {recommendedTool && (
            <div className="space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 flex items-center gap-1.5 px-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended for your request:</span>
              </div>
              <div
                onClick={() => handleSelectTool(recommendedTool)}
                className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-brand-950/40 dark:to-indigo-950/40 border border-brand-300 dark:border-brand-700 hover:border-brand-500 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md">
                    <ToolIcon name={recommendedTool.icon} className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{recommendedTool.name}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-brand-600 text-white">
                        BEST MATCH
                      </span>
                    </div>
                    <p className="text-xs text-brand-700 dark:text-brand-300 font-medium">
                      {matchedIntent?.recommendedReason}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          )}

          {/* Regular Results List */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1 flex justify-between">
              <span>{query ? 'Matching Tools' : 'Popular Tools'}</span>
              <span>{searchResults.length} tools</span>
            </div>

            {searchResults.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    <ToolIcon name={tool.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {tool.name}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{tool.shortDesc}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                  {tool.category}
                </span>
              </div>
            ))}
          </div>

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> Recent Searches
              </span>
              <div className="flex flex-wrap gap-1.5 px-1">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between px-5">
          <span>Tip: Try natural phrases like &quot;make pdf smaller&quot;</span>
          <span className="font-mono">75+ In-Browser Tools</span>
        </div>
      </div>
    </div>
  );
}
