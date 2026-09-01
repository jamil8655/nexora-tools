'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Video,
  Flame,
  Layers,
  Cpu,
  Lock,
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

  const popularTools = TOOLS_LIST.filter((tool) => tool.popular);
  const featuredMedia = TOOLS_LIST.find((t) => t.id === 'media-downloader') || popularTools[0];
  const featuredPassport = TOOLS_LIST.find((t) => t.id === 'passport-photo-maker') || popularTools[1];
  const sideFeatured = popularTools
    .filter((t) => t.id !== featuredMedia?.id && t.id !== featuredPassport?.id)
    .slice(0, 4);

  // Quick Chips neatly positioned inside the container (no floating drift)
  const quickChips = [
    { label: '📸 Passport Photo Maker (3.5x4.5cm)', href: '/tools/passport-photo-maker', color: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
    { label: '✨ AI Background Eraser', href: '/tools/background-remover', color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    { label: '⚡ Smart Workflows', href: '/workflows', color: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
    { label: '📝 PDF to Word (DOCX)', href: '/tools/pdf-to-docx', color: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
    { label: '🖼️ PDF to 300 DPI Images', href: '/tools/pdf-to-image', color: 'bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800' },
    { label: '🎵 Video to MP3', href: '/tools/video-to-mp3', color: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800' },
    { label: '🎬 4K Video Downloader', href: '/tools/media-downloader', color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
    { label: '🗜️ PDF & Image Compressor', href: '/tools/compress-pdf', color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. HERO SECTION (Clean, Shifted Up, No Duplicate Search Bar) */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-linear-to-b from-white via-brand-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950">
        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-xs backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600" />
            </span>
            <span className="tracking-wide">75+ In-Browser Utilities • 500MB Limit • 100% Free & Private</span>
          </div>

          {/* Headline & Tagline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {t.heroTitle || 'The Ultimate Suite for Files, Media & Productivity.'}
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.heroSubtitle || 'Convert PDF to editable Word with AI OCR, generate official 3.5x4.5cm Passport Photos, extract 320kbps MP3s, download 4K media, and automate multi-tool pipelines with zero cloud tracking.'}
            </p>
          </div>

          {/* Clean Contained Quick Chips (Toggled neatly inside, no floating out of bounds) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-3xl mx-auto">
            {quickChips.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${chip.color} border shadow-xs transition-all hover:scale-105 active:scale-95`}
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live System Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none text-center">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-black text-brand-600 dark:text-brand-400">75+ Tools</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">100% In-Browser Utilities</div>
          </div>
          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">500 MB</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Max Processing Limit</div>
          </div>
          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">100% Client-Side</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Document Privacy</div>
          </div>
          <div className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">4K & 1080p</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">HD Multi-Engine Downloader</div>
          </div>
        </div>
      </div>

      {/* Interactive AI Tool Finder & Assistant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NexoraAiAssistant />
      </div>

      {/* Smart Workflow Pipeline Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-purple-900 via-indigo-900 to-brand-900 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-purple-200 border border-white/20">
              <Workflow className="w-3.5 h-3.5 text-purple-300" />
              <span>NEW: Multi-Tool Automation</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white">
              NEXORA Smart Workflows
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Chain multiple tools into 1-click pipelines: e.g. Upload photo ➔ AI Background Remove ➔ 3.5x4.5cm Passport Crop ➔ Compress &lt; 50KB ➔ 8-Photo Print Sheet.
            </p>
          </div>

          <Link
            href="/workflows"
            className="px-6 py-3.5 bg-white hover:bg-purple-50 text-purple-900 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shrink-0 relative z-10"
          >
            <span>Launch Workflow Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. POPULAR TOOLS WITH FEATURED SPOTLIGHT */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Flame className="w-5 h-5 fill-current animate-bounce" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Trending & High-Power Utilities
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Most popular tools used by creators, students, and engineers</p>
              </div>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 group"
            >
              <span>Explore all {TOOLS_LIST.length} tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Featured Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* 1 Large Spotlight Card for Social Media Video Downloader */}
            {featuredMedia && (
              <div className="lg:col-span-1 p-7 rounded-3xl bg-linear-to-br from-purple-700 via-indigo-700 to-brand-700 text-white shadow-xl shadow-purple-500/20 flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all relative overflow-hidden group">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 text-white border border-white/30 flex items-center justify-center shadow-lg">
                      <Video className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md">
                      🔥 4K ENGINE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {featuredMedia.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                      Download HD and 4K videos from YouTube, Instagram Reels, TikTok (no watermark), Facebook, and WhatsApp Status.
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/20 text-xs text-purple-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>4K Ultra HD & 1080p Full HD Downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>320kbps Studio Audio MP3 Extraction</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/tools/${featuredMedia.id}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-purple-50 text-purple-800 text-xs font-bold text-center transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 relative z-10"
                >
                  <span>Launch Video Downloader</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* 4 Surrounding Popular Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {sideFeatured.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CATEGORY SUITES NAVIGATION & TOOL CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
              {t.exploreCategories || 'Specialized Tool Suites'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.privacyNotice || `Filter by category or explore all ${TOOLS_LIST.length} utilities`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
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
