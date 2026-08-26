'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, Star, Filter } from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { siteConfig } from '@/config/site';
import { ToolCard } from '@/components/shared/ToolCard';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const popularTools = TOOLS_LIST.filter((tool) => tool.popular);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* 1. CLEAN HERO & SEARCH */}
      <section className="text-center space-y-4 max-w-2xl mx-auto pt-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          All-in-One Digital Utilities
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Fast tools to convert, edit, calculate, and manage files directly in your browser.
        </p>

        {/* Integrated Unified Search & Filter Input */}
        <div className="relative pt-2">
          <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500">
            <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (Merge, Word Counter, JSON, JPG, MB to KB)..."
              className="w-full px-3 py-3 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1.5 mr-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. SWIPEABLE CATEGORY TABS (MOBILE & DESKTOP) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth w-full">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Tools ({TOOLS_LIST.length})
            </button>

            {CATEGORIES_CONFIG.map((cat) => {
              const count = TOOLS_LIST.filter((t) => t.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1 opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>Showing {filteredTools.length} {filteredTools.length === 1 ? 'utility' : 'utilities'}</span>
          {activeCategory !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* 3. RESPONSIVE CARD GRID */}
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No tools found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-slate-400">
              Try searching for &quot;PDF&quot;, &quot;Merge&quot;, &quot;Word&quot;, &quot;JSON&quot;, or &quot;Compress&quot;
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
