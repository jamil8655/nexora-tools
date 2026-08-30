'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  FileText,
  Image,
  Layers,
  ArrowRight,
  Sparkles,
  Clock,
  Star,
  CornerDownLeft,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { ToolIcon } from './ToolIcon';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTools = query.trim()
    ? TOOLS_LIST.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : TOOLS_LIST.filter((t) => t.popular).slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          const target = `/tools/${filteredTools[selectedIndex].id}`;
          onClose();
          router.push(target);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredTools, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-200 bg-slate-50/80">
          <Search className="w-5 h-5 text-brand-600 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 75+ tools (PDF to Word, Audio Booster, Speed, 4K Downloader)..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-xs">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{query ? `Matching Tools (${filteredTools.length})` : 'Popular & Trending Tools'}</span>
            {!query && (
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Flame className="w-3.5 h-3.5" /> High Demand
              </span>
            )}
          </div>

          {filteredTools.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-bold text-slate-700">No matching utility found</p>
              <p className="text-xs text-slate-400">Try searching for &quot;PDF&quot;, &quot;Audio&quot;, &quot;Video&quot;, &quot;Image&quot; or &quot;Convert&quot;</p>
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => {
                    onClose();
                    router.push(`/tools/${tool.id}`);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-50 border border-brand-200 text-brand-900 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-transform ${
                        isSelected ? 'bg-brand-600 text-white scale-105' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <ToolIcon name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                          {tool.name}
                        </span>
                        <span className="px-2 py-0.2 rounded-md text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-md">
                        {tool.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-bold text-brand-600">
                        <span>Press Enter</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-brand-600 translate-x-0.5' : 'text-slate-300'} transition-transform`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client-Side Sandbox • 500MB Size Limit</span>
          </span>
          <span className="text-[11px]">
            Use <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↑</kbd> <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">↓</kbd> to navigate
          </span>
        </div>
      </div>
    </div>
  );
}
