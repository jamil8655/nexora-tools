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
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { siteConfig } from '@/config/site';
import { ToolCard } from '@/components/shared/ToolCard';
import { ToolIcon } from '@/components/shared/ToolIcon';
import { QuickSearchModal } from '@/components/shared/QuickSearchModal';

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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. DARK HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-slate-100 pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Ambient Glows & Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-7 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/25 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Powerful Digital Tools</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Everything You Need to Work With Your Files.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Convert, compress, edit and manage your files with one powerful workspace. 100% native client-side processing.
            </p>
          </div>

          {/* Large Hero Search Bar */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="relative flex items-center bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl shadow-black/60 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to do? (e.g. Merge PDF, Convert JPG, Word Count)"
                className="w-full px-3.5 py-4 text-xs sm:text-sm bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 mr-3 px-2 py-1 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-400 border border-slate-700 hover:text-white"
              >
                ⌘K
              </button>
            </div>
          </div>

          {/* Hero Floating Visual Composition */}
          <div className="pt-8 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-200">PDF Suite</div>
              <div className="text-[11px] text-slate-400">Merge, Split, Watermark</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-200">Image Studio</div>
              <div className="text-[11px] text-slate-400">Convert, Compress, EXIF</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-200">Text & Code</div>
              <div className="text-[11px] text-slate-400">JSON, Diff, Word Count</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-200">Security & Hash</div>
              <div className="text-[11px] text-slate-400">SHA-256, Password Gen</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR TOOLS WITH FEATURED SPOTLIGHT */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
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
              <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-lg flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                      <ToolIcon name={featuredTool.icon} className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Featured
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {featuredTool.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {featuredTool.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reorder pages visually before merging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero size limits & 100% private</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/tools/${featuredTool.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold text-center transition-colors shadow-md shadow-brand-600/30 flex items-center justify-center gap-1.5"
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
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Specialized Category Suites
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
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
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

                <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                  <span>Browse Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. DARK FEATURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl space-y-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          <div className="relative max-w-2xl space-y-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold border border-brand-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>Multi-Threaded Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              One Workspace. Hundreds of Possibilities.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every document manipulation, conversion algorithm, cryptographic digest, and OCR recognition runs locally in your browser memory via WebAssembly with zero data collection.
            </p>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800 z-10">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Lock className="w-4 h-4" />
                <span>Zero Cloud Retention</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Memory is wiped as soon as your tab closes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-400">
                <Zap className="w-4 h-4" />
                <span>Hardware Acceleration</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Native CPU Web Workers handle gigabyte-level tasks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Free & Uncapped</span>
              </div>
              <p className="text-[11px] text-slate-400">
                No quotas, no watermarks, no account required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ALL TOOLS EXPLORER GRID */}
      <section id="all-tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3.5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
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
