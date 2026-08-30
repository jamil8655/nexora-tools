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
  Scissors,
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
  const featuredPdfToWord = TOOLS_LIST.find((t) => t.id === 'pdf-to-docx') || popularTools[1];
  const sideFeatured = popularTools.filter((t) => t.id !== featuredMedia?.id && t.id !== featuredPdfToWord?.id).slice(0, 4);

  const floatingChips = [
    { label: '📝 PDF to Word (DOCX)', href: '/tools/pdf-to-docx', color: 'from-rose-500/20 to-orange-500/20 border-rose-500/30 text-rose-300' },
    { label: '✂️ Audio Cutter & Trimmer', href: '/tools/audio-cutter', color: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300' },
    { label: '🎵 Video to MP3', href: '/tools/video-to-mp3', color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300' },
    { label: '✨ Favicon Pack Maker', href: '/tools/favicon-generator', color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300' },
    { label: '⚡ Compress PDF (500MB)', href: '/tools/pdf-compress', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300' },
    { label: '📄 Merge PDF', href: '/tools/pdf-merge', color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-300' },
    { label: '🔑 JWT Inspector', href: '/tools/jwt-decoder', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300' },
    { label: '🎬 4K Video Downloader', href: '/tools/media-downloader', color: 'from-red-500/20 to-rose-500/20 border-red-500/30 text-rose-300' },
    { label: '🆔 UUID Generator', href: '/tools/uuid-generator', color: 'from-sky-500/20 to-cyan-500/20 border-sky-500/30 text-sky-300' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 overflow-hidden bg-slate-950 text-slate-100 min-h-screen">
      {/* 1. ANIMATED HIGH-TECH HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-mesh-glow">
        {/* Ambient Animated Mesh Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-tr from-brand-500/20 via-purple-600/20 to-pink-500/20 blur-3xl pointer-events-none rounded-full animate-pulse-glow" />
        <div className="absolute inset-0 bg-grid-soft opacity-70 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
          {/* Animated Glowing Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900/90 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 backdrop-blur-xl hover:scale-105 transition-transform cursor-pointer">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="tracking-wide">70+ Pro Utilities • 500MB Size Limit • 100% Client-Side Private</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3.5 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
              The Ultimate Powerhouse for <br />
              <span className="shimmer-text">Files, Media & Productivity.</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Convert PDF to editable Word with AI OCR, extract audio from videos, slice ringtones, download 4K media, compress heavy files up to 500MB with zero cloud logs.
            </p>
          </div>

          {/* Large Hero Search Bar */}
          <div className="max-w-2xl mx-auto relative pt-1">
            <div className="relative flex items-center bg-slate-900/90 rounded-2xl border-2 border-slate-700/80 shadow-2xl focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-500/20 backdrop-blur-xl transition-all">
              <Search className="w-5 h-5 text-cyan-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 70+ tools (PDF to Word, Audio Cutter, Video to MP3, 4K Downloader, Favicon)..."
                className="w-full px-3.5 py-4 text-xs sm:text-sm bg-transparent text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 mr-3 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700 hover:text-white hover:border-slate-600 shadow-sm"
              >
                ⌘K Quick Search
              </button>
            </div>
          </div>

          {/* Floating Interactive Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {floatingChips.map((chip, i) => (
              <Link
                key={chip.label}
                href={chip.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r ${chip.color} border shadow-md backdrop-blur-md transition-all hover:scale-105 hover:-translate-y-1 ${
                  i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'
                }`}
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live System Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl text-center">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-black text-cyan-400">70+ Tools</div>
            <div className="text-xs text-slate-400 font-medium">100% Genuine Utilities</div>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-rose-400">500 MB</div>
            <div className="text-xs text-slate-400 font-medium">Max Processing Limit</div>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">100% Client-Side</div>
            <div className="text-xs text-slate-400 font-medium">Total Document Privacy</div>
          </div>
          <div className="space-y-1 border-l border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-purple-400">4K & 1080p</div>
            <div className="text-xs text-slate-400 font-medium">HD Media Downloader</div>
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
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-5 h-5 fill-current animate-bounce" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Trending & High-Power Utilities
                </h2>
                <p className="text-xs text-slate-400">Most popular tools used by creators, students, and engineers</p>
              </div>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 group"
            >
              <span>Explore all {TOOLS_LIST.length} tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Featured Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* 1 Large Spotlight Card for Social Media Video Downloader */}
            {featuredMedia && (
              <div className="lg:col-span-1 p-7 rounded-3xl bg-gradient-to-br from-purple-900/90 via-indigo-950 to-slate-950 border border-purple-500/40 text-white shadow-2xl flex flex-col justify-between space-y-6 hover:shadow-purple-500/20 hover:border-purple-400/60 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white border border-purple-400/40 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Video className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                      🔥 4K ENGINE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {featuredMedia.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                      Download HD and 4K videos from YouTube, Instagram Reels, TikTok (no watermark), Facebook, and WhatsApp Status.
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-purple-500/20 text-xs text-purple-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>4K Ultra HD & 1080p Full HD Downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>320kbps Studio Audio MP3 Extraction</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/tools/${featuredMedia.id}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold text-center transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 relative z-10"
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

      {/* 3. CATEGORY SUITES NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Specialized Tool Suites
            </h2>
            <p className="text-xs text-slate-400">
              Explore dedicated high-performance environments tailored for every workflow
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES_CONFIG.map((cat) => {
            const count = TOOLS_LIST.filter((t) => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  document.getElementById('all-tools-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between space-y-4 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 text-cyan-400 border border-slate-700 flex items-center justify-center font-bold group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md">
                      <ToolIcon name={cat.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-cyan-400/80 font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      {count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1.5 transition-all pt-2 border-t border-slate-800/80">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              All Available Tools
            </h2>
            <p className="text-xs text-slate-400">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'utility' : 'utilities'}
            </p>
          </div>

          {/* Swipeable Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    activeCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="ml-1 opacity-75 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
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
