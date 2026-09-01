'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Workflow,
  Cpu,
  Lock,
  Layers,
  GraduationCap,
  Sliders,
  CheckCircle2,
  HardDrive,
  Zap,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { ToolCard } from '@/components/shared/ToolCard';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';
import { NexoraAiAssistant } from '@/components/ai/NexoraAiAssistant';
import { useI18n } from '@/lib/i18n/i18n-context';
import { getLocalizedCategory, getLocalizedTool } from '@/lib/i18n/catalog-translations';

export default function HomePage() {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Filter tools based on selected category and live search
  const filteredTools = TOOLS_LIST.filter((tool) => {
    const localized = getLocalizedTool(tool, language);
    const matchesCat = activeCategory === 'all' || tool.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      localized.name.toLowerCase().includes(q) ||
      localized.shortDesc.toLowerCase().includes(q) ||
      tool.name.toLowerCase().includes(q) ||
      tool.shortDesc.toLowerCase().includes(q) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  // 8 Verified Popular Tools for Instant Access
  const POPULAR_TOOL_IDS = [
    'pdf-merge',
    'pdf-compress',
    'image-compressor',
    'passport-photo-maker',
    'background-remover',
    'video-to-mp3',
    'ocr-image-to-text',
    'media-downloader',
  ];

  const popularTools = POPULAR_TOOL_IDS.map((id) => TOOLS_LIST.find((t) => t.id === id))
    .filter(Boolean) as typeof TOOLS_LIST;

  return (
    <div className="space-y-10 sm:space-y-14 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. COMPACT, HIGH-POWER HERO SECTION (Shifted Upwards, No Layout Clutter) */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-linear-to-b from-white via-brand-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950">
        <div className="relative max-w-4xl mx-auto text-center space-y-5 z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-xs backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600" />
            </span>
            <span className="tracking-wide">100% In-Browser Privacy • 500MB Client-Side Engine</span>
          </div>

          {/* Primary Headline & Tagline */}
          <div className="space-y-2 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              75+ Powerful Tools
            </h1>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-brand-600 via-indigo-600 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-300">
              Master Digital Skills with NEXORA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
              High-speed PDF conversion, image optimization, audio extraction, and developer utilities running 100% locally in your browser.
            </p>
          </div>

          {/* Single Universal Search Bar Trigger */}
          <div className="max-w-xl mx-auto pt-1">
            <div
              onClick={() => setIsSearchModalOpen(true)}
              className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-brand-500 dark:hover:border-brand-500 transition-all cursor-pointer p-1"
            >
              <Search className="w-4 h-4 text-brand-600 dark:text-brand-400 ml-3 shrink-0" />
              <input
                type="text"
                readOnly
                placeholder={t.searchPlaceholder || 'Search 75+ tools (e.g. compress PDF, passport photo, crop image)...'}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden cursor-pointer"
              />
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1 mr-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                ⌘K
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR & FEATURED TOOLS (Immediately visible right after Hero!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Popular & Trending Utilities
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Most frequently used tools for daily productivity</p>
            </div>
          </div>

          <Link
            href="/tools"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 group"
          >
            <span>All {TOOLS_LIST.length} tools</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Compact Responsive Popular Grid (4 cols on Desktop, 2 cols on Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 3. MAIN CATEGORIES & REAL TOOL CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {t.exploreCategories || 'All Tools Directory'}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Filter by category or search below ({filteredTools.length} tools found)
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {getLocalizedCategory('all', language)} ({TOOLS_LIST.length})
            </button>
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {getLocalizedCategory(cat.id, language)}
              </button>
            ))}
          </div>
        </div>

        {/* Live Filter Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${activeCategory === 'all' ? 'all' : activeCategory} tools...`}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-brand-500"
          />
        </div>

        {/* Real Tool Grid (4 cols on Desktop, 2 cols on Mobile) */}
        {filteredTools.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-2">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No tools matched your search "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* 4. NEXORA AI ASSISTANT & SMART WORKFLOWS (Compact High-Impact Sections) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* AI Tool Finder Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white">NEXORA AI Tool Finder</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Describe your task in natural language</p>
            </div>
          </div>
          <NexoraAiAssistant />
        </div>

        {/* Smart Workflows Automation Card */}
        <div className="p-6 rounded-3xl bg-linear-to-br from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-purple-200 border border-white/20">
              <Workflow className="w-3 h-3" />
              <span>Multi-Tool Automation</span>
            </div>
            <h4 className="text-xl font-black text-white">NEXORA Smart Workflows</h4>
            <p className="text-xs text-purple-200 leading-relaxed">
              Chain multiple utilities into 1-click pipelines: Upload photo ➔ AI Background Removal ➔ Passport Crop ➔ Compress &lt; 50KB.
            </p>
          </div>

          <Link
            href="/workflows"
            className="w-full sm:w-auto self-start px-5 py-2.5 bg-white text-purple-900 hover:bg-purple-50 font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <span>Launch Workflow Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. PLATFORM HIGHLIGHTS / VERIFIED STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400">75+ Tools</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">In-Browser Utilities</div>
          </div>
          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">500 MB</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Processing Engine Limit</div>
          </div>
          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">100% Private</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Zero Server Storage</div>
          </div>
          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">Unlimited</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Free Client Executions</div>
          </div>
        </div>
      </section>

      {/* 6. EDUCATIONAL COURSES & SKILLS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-7 rounded-3xl bg-linear-to-r from-slate-900 via-brand-950 to-indigo-950 text-white border border-brand-900/50 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-300">
              <GraduationCap className="w-4 h-4" />
              <span>NEXORA Learning Academy</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">Master Full-Stack & Developer Skills</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore comprehensive video courses and skill quizzes in Web Development, TypeScript, and AI Engineering.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/courses"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-md"
            >
              Explore Courses
            </Link>
            <Link
              href="/quiz"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              Take Skill Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Single Unified NEXORA Smart Search Modal */}
      <UnifiedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}
