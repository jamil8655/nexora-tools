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
  Heart,
  Clock,
  History,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { ToolCard } from '@/components/shared/ToolCard';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useUserStore } from '@/lib/user/user-store';
import { getLocalizedTool } from '@/lib/i18n/catalog-translations';

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

export default function HomePage() {
  const { t, language } = useI18n();
  const { favorites, history, pinnedTools } = useUserStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const quickActions = [
    { name: 'Compress PDF', href: '/tools/compress-pdf', icon: Minimize2, color: 'bg-rose-500', desc: 'Shrink file size' },
    { name: 'Merge PDF', href: '/tools/merge-pdf', icon: Combine, color: 'bg-blue-500', desc: 'Join PDF sheets' },
    { name: 'PDF to Word', href: '/tools/pdf-to-word', icon: FileText, color: 'bg-indigo-500', desc: 'Editable DOCX' },
    { name: 'Word to PDF', href: '/tools/word-to-pdf', icon: FileText, color: 'bg-teal-500', desc: 'Convert DOCX' },
    { name: 'Images to PDF', href: '/tools/images-to-pdf', icon: ImageIcon, color: 'bg-amber-500', desc: 'JPG/PNG to PDF' },
    { name: 'Image Resizer', href: '/tools/image-resizer', icon: Camera, color: 'bg-emerald-500', desc: 'Exact KB Limits' },
    { name: 'OCR to Text', href: '/tools/ocr-image-to-text', icon: ScanText, color: 'bg-purple-500', desc: 'Extract Text' },
    { name: 'QR Code Studio', href: '/tools/qr-code-generator', icon: QrCode, color: 'bg-cyan-500', desc: 'Custom QR/Barcode' },
  ];

  // User's favorite tools
  const favoriteTools = TOOLS_LIST.filter(
    (tool) =>
      favorites.some((fav) => fav.id === tool.id || fav.id === tool.slug) ||
      pinnedTools.includes(tool.id)
  );

  // User's recent tools from history
  const recentToolIds = Array.from(new Set(history.map((h) => h.url.replace('/tools/', ''))));
  const recentTools = TOOLS_LIST.filter((tool) =>
    recentToolIds.includes(tool.id) || recentToolIds.includes(tool.slug)
  ).slice(0, 4);

  const filteredTools = TOOLS_LIST.filter((tool) => {
    return activeCategory === 'all' || tool.category === activeCategory;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. FAVORITES SECTION (Conditional on user favoriting) */}
      {favoriteTools.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pt-4 max-w-7xl mx-auto space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Your Favorite Tools ({favoriteTools.length})</span>
            </h2>
            <Link href="/favorites" className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Manage Favorites →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {favoriteTools.slice(0, 4).map((tool) => (
              <ToolCard key={`fav-${tool.id}`} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* 2. RECENT TOOLS (Conditional on user usage) */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
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

      {/* 4. ORGANIZED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span>Categories</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-semibold">{filteredTools.length} tools</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`p-2.5 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
              activeCategory === 'all'
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-2 text-current" />
            <div>
              <p className="text-xs font-black truncate">All Tools</p>
              <p className="text-[10px] opacity-75">{TOOLS_LIST.length} tools</p>
            </div>
          </button>

          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = categoryIconMap[cat.id] || FileText;
            const count = TOOLS_LIST.filter((t) => t.category === cat.id).length;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 mb-2 text-current" />
                <div>
                  <p className="text-xs font-black truncate">{cat.label}</p>
                  <p className="text-[10px] opacity-75">{count} tools</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. TOOL CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            {activeCategory === 'all'
              ? 'Popular Tools'
              : `${CATEGORIES_CONFIG.find((c) => c.id === activeCategory)?.label || 'Selected'} Tools`}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
          {filteredTools.slice(0, 32).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length > 32 && (
          <div className="text-center pt-4">
            <Link
              href={`/tools${activeCategory !== 'all' ? `?cat=${activeCategory}` : ''}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:border-brand-500 shadow-xs active:scale-95 transition-all"
            >
              <span>Explore All {filteredTools.length} Tools in Full Directory</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
