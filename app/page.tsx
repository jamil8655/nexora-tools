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
  Video,
  Music,
  Download,
  Share2,
  TrendingUp,
  Activity,
  Check,
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
  const featuredMedia = TOOLS_LIST.find((t) => t.id === 'media-downloader') || popularTools[0];
  const featuredPdf = TOOLS_LIST.find((t) => t.id === 'pdf-merge') || popularTools[1];
  const sideFeatured = popularTools.filter((t) => t.id !== featuredMedia?.id && t.id !== featuredPdf?.id).slice(0, 4);

  const floatingChips = [
    { label: '📝 PDF to Word (DOCX)', href: '/tools/pdf-to-docx' },
    { label: '⚡ Compress PDF', href: '/tools/pdf-compress' },
    { label: '📄 Merge PDF', href: '/tools/pdf-merge' },
    { label: '🖼️ JPG to PNG', href: '/tools/jpg-to-png' },
    { label: '🎬 4K Video Downloader', href: '/tools/media-downloader' },
    { label: '💬 WhatsApp Status', href: '/tools/whatsapp-status-saver' },
    { label: '📊 JSON Validator', href: '/tools/json-formatter' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 overflow-hidden">
      {/* 1. ANIMATED HIGH-TECH HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/80 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 pt-12 sm:pt-20 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800">
        {/* Ambient Animated Mesh Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[320px] bg-gradient-to-tr from-brand-500/15 via-purple-500/15 to-pink-500/15 blur-3xl pointer-events-none rounded-full animate-pulse-glow" />
        <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-800/90 text-brand-600 dark:text-brand-400 border border-brand-500/30 shadow-md backdrop-blur-md hover:scale-105 transition-transform cursor-pointer">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span>65+ Real Utilities & Social Media 4K Downloader</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              The Ultimate Hub for <br />
              <span className="shimmer-text">Files, Media & Productivity.</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Download 4K videos from YouTube & Reels, compress heavy PDFs, convert images, format code, and manage documents with zero server storage.
            </p>
          </div>

          {/* Large Hero Search Bar */}
          <div className="max-w-xl mx-auto relative pt-1">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xl focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 65+ tools (Video Downloader, PDF Merge, JPG, Word, MP3)..."
                className="w-full px-3.5 py-3.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 mr-3 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white shadow-sm"
              >
                ⌘K
              </button>
            </div>
          </div>

          {/* Floating Interactive Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {floatingChips.map((chip, i) => (
              <Link
                key={chip.label}
                href={chip.href}
                className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950/60 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200/90 dark:border-slate-700 shadow-sm transition-all hover:scale-105 hover:-translate-y-0.5 ${
                  i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'
                }`}
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live System Stats Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
          <div className="space-y-0.5">
            <div className="text-base sm:text-xl font-black text-brand-600 dark:text-brand-400">65+</div>
            <div className="text-[11px] text-slate-500 font-medium">Built-in Utilities</div>
          </div>
          <div className="space-y-0.5 border-l border-slate-100 dark:border-slate-800">
            <div className="text-base sm:text-xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-[11px] text-slate-500 font-medium">Private & Client-Side</div>
          </div>
          <div className="space-y-0.5 border-l border-slate-100 dark:border-slate-800">
            <div className="text-base sm:text-xl font-black text-purple-600 dark:text-purple-400">4K & 1080p</div>
            <div className="text-[11px] text-slate-500 font-medium">Video Downloader</div>
          </div>
          <div className="space-y-0.5 border-l border-slate-100 dark:border-slate-800">
            <div className="text-base sm:text-xl font-black text-amber-600 dark:text-amber-400">0 MB</div>
            <div className="text-[11px] text-slate-500 font-medium">Server Storage Logged</div>
          </div>
        </div>
      </div>

      {/* Responsive In-Feed Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header" />
      </div>

      {/* 2. POPULAR TOOLS WITH FEATURED SPOTLIGHT */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Trending & Popular Utilities
              </h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* 1 Large Spotlight Card for Social Media Video Downloader */}
            {featuredMedia && (
              <div className="lg:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-brand-700 text-white shadow-xl flex flex-col justify-between space-y-6 hover:shadow-purple-500/20 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 text-white border border-white/30 flex items-center justify-center shadow-md">
                      <Video className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md">
                      🔥 NEW FEATURE
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {featuredMedia.name}
                    </h3>
                    <p className="text-xs text-purple-100 leading-relaxed">
                      Download HD/4K videos from YouTube, Instagram Reels, TikTok (no watermark), Facebook, and WhatsApp Status.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/20 text-xs text-purple-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>4K Ultra HD & 1080p Full HD Downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>320kbps Studio Audio MP3 Extraction</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/tools/${featuredMedia.id}`}
                  className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-purple-50 text-purple-700 text-xs font-bold text-center transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <span>Launch Video Downloader</span>
                  <ArrowRight className="w-4 h-4" />
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
            Explore dedicated work environments tailored for every document and media workflow
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
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold group-hover:scale-110 group-hover:rotate-3 transition-transform">
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

                <div className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Browse Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
