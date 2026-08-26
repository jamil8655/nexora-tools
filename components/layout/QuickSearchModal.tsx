'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight, ShieldCheck, Sparkles, ArrowRight, Star } from 'lucide-react';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ToolDefinition } from '@/lib/types';
import { useI18n } from '@/lib/i18n/i18n-context';
import { getFavorites } from '@/lib/storage/file-store';
import { FavoriteButton } from '@/components/shared/FavoriteButton';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFavoriteIds(getFavorites());
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
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
  const filteredTools = normalizedQuery
    ? TOOLS_LIST.filter(
        (tool) =>
          tool.name.toLowerCase().includes(normalizedQuery) ||
          tool.shortDesc.toLowerCase().includes(normalizedQuery) ||
          tool.slug.toLowerCase().includes(normalizedQuery) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      )
    : TOOLS_LIST.filter((tool) => tool.popular);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{normalizedQuery ? `Matching Tools (${filteredTools.length})` : 'Popular & Trending Tools'}</span>
            {favoriteIds.length > 0 && (
              <span className="text-[10px] text-amber-500 font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500" /> {favoriteIds.length} Pinned
              </span>
            )}
          </div>

          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <p className="text-sm font-medium">No tools found matching &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400">
                Try searching for &quot;PDF&quot;, &quot;Merge&quot;, &quot;Word Counter&quot;, &quot;JSON&quot;, or &quot;MB to KB&quot;
              </p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
              >
                <Link
                  href={`/tools/${tool.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 min-w-0 flex-1"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {tool.name}
                      </h4>
                      {tool.isClientSide && (
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Private
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {tool.shortDesc}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2 shrink-0">
                  <FavoriteButton toolId={tool.id} />
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all rtl:rotate-180" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info in modal */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between px-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero-upload client side privacy</span>
          </div>
          <Link
            href="/tools"
            onClick={onClose}
            className="font-semibold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View All 60+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
