'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  ArrowRight,
  Star,
  FileText,
  Image as ImageIcon,
  Layers,
  Cpu,
  Lock,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Filter,
  Smartphone,
  Flame,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { siteConfig } from '@/config/site';
import { ToolCard } from '@/components/shared/ToolCard';
import { ToolIcon } from '@/components/shared/ToolIcon';
import { QuickSearchModal } from '@/components/shared/QuickSearchModal';
import { AdSlot } from '@/components/ads/AdSlot';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
  const featuredTool = TOOLS_LIST.find((t) => t.id === 'pdf-merge') || popularTools[0];
  const sideFeatured = popularTools.filter((t) => t.id !== featuredTool?.id).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* 1. BALANCED CRISP HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-slate-50 to-white dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-950 pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800">
        <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>All-in-One Digital Productivity Suite</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2.5 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.16]">
              Everything You Need to Work With Files.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Convert, compress, edit, calculate, and manage your documents with 60+ fast utilities running directly in your browser.
            </p>
          </div>

          {/* Large Hero Search Bar */}
          <div className="max-w-xl mx-auto relative pt-1">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 shadow-md focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools (Merge PDF, Word Counter, JSON, JPG to PNG, MB to KB)..."
                className="w-full px-3.5 py-3.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 mr-3 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white"
              >
                ⌘K
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive In-Feed Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header" />
      </div>

      {/* 2. POPULAR TOOLS WITH FEATURED SPOTLIGHT */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Popular Utilities
              </h2>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all {TOOLS_LIST.length} tools</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* Featured Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* 1 Large Spotlight Card */}
            {featuredTool && (
              <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-lg flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/15 text-white border border-white/20 flex items-center justify-center">
                      <ToolIcon name={featuredTool.icon} className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                      Featured
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {featuredTool.name}
                    </h3>
                    <p className="text-xs text-brand-100 leading-relaxed">
                      {featuredTool.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/20 text-xs text-brand-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Reorder pages visually before merging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Zero size limits & 100% private</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/tools/${featuredTool.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-brand-50 text-brand-700 text-xs font-bold text-center transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* 4 Surrounding Popular Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sideFeatured.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CATEGORY SUITES NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Specialized Tool Suites
          </h2>
          <p className="text-xs text-slate-500">
            Explore dedicated work environments tailored for every document workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES_CONFIG.map((cat) => {
            const count = TOOLS_LIST.filter((t) => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  document.getElementById('all-tools-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                      <ToolIcon name={cat.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      {count} Tools
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400">
                  <span>Browse Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* In-Feed Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="in-feed" />
      </div>

      {/* 4. ALL TOOLS EXPLORER GRID */}
      <section id="all-tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              All Available Tools
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'utility' : 'utilities'}
            </p>
          </div>

          {/* Swipeable Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All ({TOOLS_LIST.length})
            </button>

            {CATEGORIES_CONFIG.map((cat) => {
              const count = TOOLS_LIST.filter((t) => t.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    activeCategory === cat.id
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

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  );
}
