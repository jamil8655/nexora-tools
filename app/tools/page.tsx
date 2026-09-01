'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, Filter } from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { ToolCard } from '@/components/shared/ToolCard';
import { useI18n } from '@/lib/i18n/i18n-context';
import { getLocalizedCategory, getLocalizedTool } from '@/lib/i18n/catalog-translations';

function ToolsDirectory() {
  const { t, language } = useI18n();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const localized = getLocalizedTool(tool, language);
    const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      localized.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      localized.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6 pb-24">
      <div className="hidden sm:block">
        <Breadcrumbs items={[{ label: t.allTools || 'All Tools' }]} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 sm:pb-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>{t.allTools || 'All Document & Productivity Utilities'}</span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 font-mono">({TOOLS_LIST.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.privacyNotice || 'Fast, private and client-side processing utilities with zero cloud uploads.'}
          </p>
        </div>

        {/* Search bar inside tools directory */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within 220+ tools..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-brand-500/30 shadow-xs"
          />
        </div>
      </div>

      {/* Android Horizontal Category Chips Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-3 px-3 sm:mx-0 sm:px-0">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-2 rounded-xl sm:rounded-2xl text-xs font-extrabold transition-all shrink-0 active:scale-95 shadow-xs ${
            activeCategory === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Tools ({TOOLS_LIST.length})
        </button>
        {CATEGORIES_CONFIG.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl sm:rounded-2xl text-xs font-extrabold transition-all shrink-0 active:scale-95 shadow-xs ${
              activeCategory === cat.id
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {getLocalizedCategory(cat.id, language)}
          </button>
        ))}
      </div>

      {/* Tools Cards Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No tools found matching &ldquo;{searchQuery}&rdquo;</p>
          <p className="text-xs text-slate-400">Try checking another category or clearing your search.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading tools directory...</div>}>
      <ToolsDirectory />
    </Suspense>
  );
}
