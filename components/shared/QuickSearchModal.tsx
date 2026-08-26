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
      ).slice(0, 8)
    : TOOLS_LIST.filter((t) => t.popular).slice(0, 6);

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md transition-opacity">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-brand-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all tools, actions, and formats (e.g. PDF Merge, WebP, Hash, JSON)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 ml-2">
            ESC
          </span>
        </div>

        {/* Results / Suggestions List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>{query ? 'Matching Tools' : 'Popular Utilities'}</span>
            <span className="text-[10px] text-slate-400">Navigate with ↑ ↓ and press ↵</span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-1">
              <p className="text-sm font-medium">No utilities matching &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400">Try searching for &quot;PDF&quot;, &quot;Compress&quot;, or &quot;Convert&quot;</p>
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-brand-600/20 text-white border border-brand-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-brand-400 border border-slate-700/60 flex items-center justify-center shrink-0">
                      <ToolIcon name={tool.icon} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                        {tool.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {tool.shortDesc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                      {tool.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-brand-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Quick Categories */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Quick categories:</span>
            {CATEGORIES_CONFIG.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setQuery(cat.label)}
                className="text-[11px] text-slate-300 hover:text-brand-400 transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-400">60+ Native Utilities</span>
        </div>
      </div>
    </div>
  );
}
