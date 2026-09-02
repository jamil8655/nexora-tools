'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Zap,
  FileText,
  Minimize2,
  Combine,
  Image as ImageIcon,
  ScanText,
  QrCode,
  Camera,
  Layers,
  FileCheck,
  Type,
  Lock,
  Video,
  Binary,
  Code2,
  Bookmark,
  Clock,
  History,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { ToolCard } from '@/components/shared/ToolCard';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useUserStore } from '@/lib/user/user-store';

const categoryIconMap: Record<string, React.ElementType> = {
  pdf: FileText,
  document: FileCheck,
  image: ImageIcon,
  ocr: ScanText,
  text: Type,
  compress: Minimize2,
  security: Lock,
  media: Video,
  calculator: Binary,
  dev: Code2,
  qr: QrCode,
  ai: Sparkles,
};

const categoryColorMap: Record<string, { bg: string; text: string }> = {
  pdf: { bg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400', text: 'text-rose-600 dark:text-rose-400' },
  document: { bg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400', text: 'text-indigo-600 dark:text-indigo-400' },
  image: { bg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400', text: 'text-blue-600 dark:text-blue-400' },
  ocr: { bg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400', text: 'text-fuchsia-600 dark:text-fuchsia-400' },
  text: { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400', text: 'text-emerald-600 dark:text-emerald-400' },
  compress: { bg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400', text: 'text-amber-600 dark:text-amber-400' },
  security: { bg: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400', text: 'text-orange-600 dark:text-orange-400' },
  media: { bg: 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400', text: 'text-purple-600 dark:text-purple-400' },
  calculator: { bg: 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400', text: 'text-cyan-600 dark:text-cyan-400' },
  dev: { bg: 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400', text: 'text-violet-600 dark:text-violet-400' },
  qr: { bg: 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400', text: 'text-teal-600 dark:text-teal-400' },
  ai: { bg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400', text: 'text-sky-600 dark:text-sky-400' },
};

export default function HomePage() {
  const { t } = useI18n();
  const { favorites, history, pinnedTools, recentTools: trackedRecents } = useUserStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const quickActions = [
    { name: 'Compress PDF', href: '/tools/compress-pdf', icon: Minimize2, color: 'bg-rose-500', desc: 'Reduce file size' },
    { name: 'Merge PDF', href: '/tools/merge-pdf', icon: Combine, color: 'bg-blue-500', desc: 'Combine documents' },
    { name: 'PDF to Word', href: '/tools/pdf-to-word', icon: FileText, color: 'bg-indigo-500', desc: 'Convert to DOCX' },
    { name: 'Word to PDF', href: '/tools/word-to-pdf', icon: FileText, color: 'bg-teal-500', desc: 'Convert to PDF' },
    { name: 'Images to PDF', href: '/tools/images-to-pdf', icon: ImageIcon, color: 'bg-amber-500', desc: 'Convert photos' },
    { name: 'Image Resizer', href: '/tools/image-resizer', icon: Camera, color: 'bg-emerald-500', desc: 'Custom dimensions' },
    { name: 'OCR to Text', href: '/tools/ocr-image-to-text', icon: ScanText, color: 'bg-purple-500', desc: 'Extract text' },
    { name: 'QR Code Studio', href: '/tools/qr-code-generator', icon: QrCode, color: 'bg-cyan-500', desc: 'Create QR codes' },
  ];

  // User's bookmarked favorite tools
  const favoriteTools = TOOLS_LIST.filter(
    (tool) =>
      favorites.some((fav) => fav.id === tool.id || fav.id === tool.slug) ||
      pinnedTools.includes(tool.id)
  );

  // User's real recent tools
  const recentToolIds = Array.from(new Set(history.map((h) => h.url.replace('/tools/', ''))));
  const recentTools = (
    trackedRecents && trackedRecents.length > 0
      ? trackedRecents.map((r) => TOOLS_LIST.find((t) => t.id === r.toolId || t.slug === r.toolId)).filter(Boolean)
      : TOOLS_LIST.filter((tool) =>
          recentToolIds.includes(tool.id) || recentToolIds.includes(tool.slug)
        )
  ).slice(0, 4) as typeof TOOLS_LIST;

  const filteredTools = TOOLS_LIST.filter((tool) => {
    return activeCategory === 'all' || tool.category === activeCategory;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. BOOKMARKED FAVORITES (Conditional on real user saving) */}
      {favoriteTools.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pt-4 max-w-7xl mx-auto space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Bookmarked Tools ({favoriteTools.length})</span>
            </h2>
            <Link href="/favorites" className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Manage Bookmarks →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {favoriteTools.slice(0, 4).map((tool) => (
              <ToolCard key={`fav-${tool.id}`} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* 2. RECENT TOOLS (Conditional on real user execution) */}
      {recentTools.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Recently Used</span>
            </h2>
            <Link href="/history" className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline">
              View History →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentTools.map((tool) => (
              <ToolCard key={`recent-${tool.id}`} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* 3. FREQUENT TOOLS / QUICK ACTIONS */}
      <section className="px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Frequent Utilities</span>
          </h2>
          <Link href="/tools" className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline">
            All 220+ Tools →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                href={action.href}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-brand-500 dark:hover:border-brand-500 active:scale-95 transition-all flex items-center gap-3 group"
              >
                <div className={`w-9 h-9 rounded-xl ${action.color} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {action.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate">
                    {action.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. BALANCED CATEGORIES GRID (12 Symmetrical Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span>Tool Categories</span>
          </h2>
          {activeCategory !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Show All Categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = categoryIconMap[cat.id] || FileText;
            const count = TOOLS_LIST.filter((t) => t.category === cat.id).length;
            const isSelected = activeCategory === cat.id;
            const colors = categoryColorMap[cat.id] || { bg: 'bg-brand-500/10 text-brand-600', text: 'text-brand-600' };

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-150 active:scale-95 flex items-center gap-3 min-h-[64px] ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : colors.bg
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black truncate">{cat.label}</p>
                  <p className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {count} tools
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. TOOL DIRECTORY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            {activeCategory === 'all'
              ? 'Popular Tools'
              : `${CATEGORIES_CONFIG.find((c) => c.id === activeCategory)?.label || 'Selected'} Tools`}
          </h2>
          <span className="text-[11px] text-slate-400 font-semibold">{filteredTools.length} tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredTools.slice(0, 32).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length > 32 && (
          <div className="text-center pt-4">
            <Link
              href={`/tools${activeCategory !== 'all' ? `?cat=${activeCategory}` : ''}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:border-brand-500 shadow-xs active:scale-95 transition-all"
            >
              <span>Explore All {filteredTools.length} Tools in Directory</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
