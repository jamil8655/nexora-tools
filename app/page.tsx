'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Search,
  FileText,
  Minimize2,
  Combine,
  Image as ImageIcon,
  ScanText,
  QrCode,
  Type,
  Table,
  Lock,
  Camera,
  Star,
  Layers,
} from 'lucide-react';
import { TOOLS_LIST, CATEGORIES_CONFIG } from '@/lib/tools-config';
import { ToolCard } from '@/components/shared/ToolCard';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';
import { useI18n } from '@/lib/i18n/i18n-context';
import { getLocalizedTool } from '@/lib/i18n/catalog-translations';

export default function HomePage() {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  return (
    <div className="space-y-6 sm:space-y-10 pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      {/* 1. TOP QUICK HEADER / APP BAR BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 max-w-7xl mx-auto space-y-4">
        {/* Quick Search Trigger Bar */}
        <button
          type="button"
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between text-slate-400 hover:border-brand-500 dark:hover:border-brand-500 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Search 220+ document, image & text tools...
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 text-[10px] font-black uppercase">
            220+ Tools
          </span>
        </button>

        {/* Quick Action Buttons Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Actions</span>
            </h2>
            <Link href="/tools" className="text-[11px] font-bold text-brand-600 hover:underline">
              View All 220+ →
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
        </div>
      </section>

      {/* 2. CATEGORY TABS (HORIZONTAL SCROLLABLE CHIPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span>Categories</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-semibold">{filteredTools.length} tools available</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold shrink-0 transition-all active:scale-95 ${
              activeCategory === 'all'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            All Tools ({TOOLS_LIST.length})
          </button>

          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold shrink-0 transition-all active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                  : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. TOOL CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredTools.slice(0, 36).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {filteredTools.length > 36 && (
          <div className="text-center pt-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:border-brand-500 shadow-xs active:scale-95 transition-all"
            >
              <span>Explore All {filteredTools.length} Tools in Full Directory</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </Link>
          </div>
        )}
      </section>

      {/* Search Modal */}
      <UnifiedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
}
