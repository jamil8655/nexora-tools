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
  Workflow,
  Terminal,
  EyeOff,
  User,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { siteConfig } from '@/config/site';
import { ToolCard } from '@/components/shared/ToolCard';
import { ToolIcon } from '@/components/shared/ToolIcon';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';
import { NexoraAiAssistant } from '@/components/ai/NexoraAiAssistant';
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
  const featuredPassport = TOOLS_LIST.find((t) => t.id === 'passport-photo-maker') || popularTools[1];
  const sideFeatured = popularTools.filter((t) => t.id !== featuredMedia?.id && t.id !== featuredPassport?.id).slice(0, 4);

  const floatingChips = [
    { label: '📸 Passport Photo Maker (3.5x4.5cm)', href: '/tools/passport-photo-maker', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300' },
    { label: '✨ AI Background Eraser (White / PNG)', href: '/tools/background-remover', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300' },
    { label: '⚡ Smart Multi-Tool Workflows', href: '/workflows', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300' },
    { label: '📝 PDF to Word (DOCX)', href: '/tools/pdf-to-docx', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300' },
    { label: '🖼️ PDF to 300 DPI Images', href: '/tools/pdf-to-image', color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100 hover:border-pink-300' },
    { label: '🔊 Audio Volume Booster', href: '/tools/audio-booster', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300' },
    { label: '✂️ Audio Cutter', href: '/tools/audio-cutter', color: 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 hover:border-violet-300' },
    { label: '🎵 Video to MP3', href: '/tools/video-to-mp3', color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 hover:border-teal-300' },
    { label: '🎬 4K Video Downloader', href: '/tools/media-downloader', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300' },
    { label: '🛡️ Privacy & EXIF Cleaner', href: '/privacy-center', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300' },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 overflow-hidden bg-white text-slate-900 min-h-screen bg-light-pattern">
      {/* 1. ANIMATED CLEAN HERO SECTION WITH AURORA GLOW */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-aurora-glow">
        <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
          {/* Animated Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-brand-700 border border-brand-200 shadow-md shadow-brand-500/5 backdrop-blur-xl hover:scale-105 transition-transform cursor-pointer">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600"></span>
            </span>
            <span className="tracking-wide">75+ Powerful In-Browser Utilities • 500MB Size Limit • 100% Free & Private</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3.5 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.14]">
              The Ultimate Suite for <br />
              <span className="shimmer-text">Files, Media & Productivity.</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Convert PDF to editable Word with AI OCR, generate official 3.5x4.5cm Passport Photos, extract 320kbps MP3s, download 4K media, and automate multi-tool pipelines with zero cloud storage.
            </p>
          </div>

          {/* Large Hero Search Bar (Triggers Universal AI Engine) */}
          <div className="max-w-2xl mx-auto relative pt-1">
            <div
              onClick={() => setIsSearchModalOpen(true)}
              className="relative flex items-center bg-white rounded-2xl border-2 border-slate-200 shadow-xl shadow-slate-200/50 hover:border-brand-500 transition-all cursor-pointer p-1"
            >
              <Search className="w-5 h-5 text-brand-600 ml-4 shrink-0" />
              <input
                type="text"
                readOnly
                placeholder="What do you want to do? (e.g. compress my PDF, make image 50kb, remove bg)..."
                className="w-full px-3.5 py-3.5 text-xs sm:text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none cursor-pointer"
              />
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1 mr-3 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-mono text-slate-600 border border-slate-200 shadow-sm"
              >
                ⌘K Search
              </button>
            </div>
          </div>

          {/* Floating Interactive Quick Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {floatingChips.map((chip, i) => (
              <Link
                key={chip.label}
                href={chip.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${chip.color} border shadow-sm transition-all hover:scale-105 hover:-translate-y-1 ${
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-100 text-center">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-black text-brand-600">75+ Tools</div>
            <div className="text-xs text-slate-500 font-medium">100% Genuine Utilities</div>
          </div>
          <div className="space-y-1 border-l border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-rose-600">500 MB</div>
            <div className="text-xs text-slate-500 font-medium">Max Processing Limit</div>
          </div>
          <div className="space-y-1 border-l border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-emerald-600">100% Client-Side</div>
            <div className="text-xs text-slate-500 font-medium">Total Document Privacy</div>
          </div>
          <div className="space-y-1 border-l border-slate-200">
            <div className="text-xl sm:text-2xl font-black text-purple-600">4K & 1080p</div>
            <div className="text-xs text-slate-500 font-medium">HD Multi-Engine Downloader</div>
          </div>
        </div>
      </div>

      {/* Interactive AI Tool Finder & Assistant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NexoraAiAssistant />
      </div>

      {/* Smart Workflow Pipeline Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-brand-900 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
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

      {/* Responsive In-Feed Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot placement="header" />
      </div>

      {/* 2. POPULAR TOOLS WITH FEATURED SPOTLIGHT */}
      {!searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
                <Flame className="w-5 h-5 fill-current animate-bounce" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Trending & High-Power Utilities
                </h2>
                <p className="text-xs text-slate-500">Most popular tools used by creators, students, and engineers</p>
              </div>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 group"
            >
              <span>Explore all {TOOLS_LIST.length} tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Featured Spotlight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* 1 Large Spotlight Card for Social Media Video Downloader */}
            {featuredMedia && (
              <div className="lg:col-span-1 p-7 rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-brand-700 text-white shadow-xl shadow-purple-500/20 flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all relative overflow-hidden group">
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

      {/* 3. CATEGORY SUITES NAVIGATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Specialized Tool Suites
            </h2>
            <p className="text-xs text-slate-500">
              Filter by category or explore all {TOOLS_LIST.length} utilities
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Tools ({TOOLS_LIST.length})
            </button>
            {CATEGORIES_CONFIG.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
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
