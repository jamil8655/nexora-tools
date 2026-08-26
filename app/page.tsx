'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Lock,
  Cpu,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { useI18n } from '@/lib/i18n/i18n-context';
import { siteConfig } from '@/config/site';
import { ToolCard } from '@/components/shared/ToolCard';

export default function HomePage() {
  const { t } = useI18n();
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
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center space-y-7">
        {/* Security Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% Private Client-Side WASM Engine • Zero Server Storage</span>
        </div>

        {/* Hero Title & Subheading */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-[1.14]">
            {siteConfig.tagline}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto relative pt-1">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 60+ utilities (e.g. PDF to JPG, Merge, Word Counter, JSON, MB to KB)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-md focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-all"
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 text-xs text-slate-500">
            <span className="text-slate-400 font-semibold mr-1">Quick Access:</span>
            {[
              { label: 'Merge PDF', href: '/tools/pdf-merge' },
              { label: 'Word Counter', href: '/text-tools' },
              { label: 'JSON Formatter', href: '/dev-tools' },
              { label: 'Compress PDF', href: '/tools/pdf-compress' },
              { label: 'JPG to PNG', href: '/tools/jpg-to-png' },
              { label: 'MB to KB', href: '/tools/file-size-converter' },
              { label: 'SHA-256 Hash', href: '/security-tools' },
              { label: 'OCR Scanner', href: '/ocr' },
            ].map((chip, idx) => (
              <Link
                key={idx}
                href={chip.href}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-semibold transition-colors"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {siteConfig.stats.totalTools}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Active Utilities</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">
              {siteConfig.stats.clientSideRatio}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Local WASM Speed</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {siteConfig.stats.conversionsCount}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Files Processed</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              0 KB
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Server Data Storage</div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR TOOLS SHOWCASE */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {t.popularTools}
              </h2>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>View all {TOOLS_LIST.length} tools</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularTools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* 3. CATEGORY EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t.exploreCategories}
            </h2>
            <p className="text-xs text-slate-500">
              Filter by specialized utility suite or browse our comprehensive library
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All ({TOOLS_LIST.length})
            </button>
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 4. PRIVACY & PERFORMANCE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Knowledge Hardware-Accelerated Processing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Enterprise Privacy with Local Speed
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every document conversion, compression algorithm, cryptographic hash digest, and OCR recognition executes 100% locally inside your browser using WebAssembly. No files are ever sent over the network to external servers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Server Uploads</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Files stay in device RAM only and are purged immediately when closed.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-400">
                <Zap className="w-4 h-4" />
                <span>Instant WASM Execution</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Multi-threaded Web Workers run at native CPU and GPU speeds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                <Cpu className="w-4 h-4" />
                <span>Free & Unlimited</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                No signups, subscriptions, watermarks, or file limit paywalls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
