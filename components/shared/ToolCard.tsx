'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from './ToolIcon';
import { FavoriteButton } from './FavoriteButton';

interface CategoryTheme {
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  categoryBadgeBg: string;
  categoryBadgeText: string;
  hoverBorder: string;
  accentBar: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  pdf: {
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
    iconColor: 'text-rose-600 dark:text-rose-400',
    iconBorder: 'border-rose-200/80 dark:border-rose-800/60',
    categoryBadgeBg: 'bg-rose-500/10 dark:bg-rose-950/40',
    categoryBadgeText: 'text-rose-700 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-800',
    accentBar: 'from-rose-500 to-rose-600',
  },
  image: {
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBorder: 'border-blue-200/80 dark:border-blue-800/60',
    categoryBadgeBg: 'bg-blue-500/10 dark:bg-blue-950/40',
    categoryBadgeText: 'text-blue-700 dark:text-blue-300',
    hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-800',
    accentBar: 'from-blue-500 to-blue-600',
  },
  document: {
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBorder: 'border-indigo-200/80 dark:border-indigo-800/60',
    categoryBadgeBg: 'bg-indigo-500/10 dark:bg-indigo-950/40',
    categoryBadgeText: 'text-indigo-700 dark:text-indigo-300',
    hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-800',
    accentBar: 'from-indigo-500 to-indigo-600',
  },
  text: {
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBorder: 'border-emerald-200/80 dark:border-emerald-800/60',
    categoryBadgeBg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
    categoryBadgeText: 'text-emerald-700 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-800',
    accentBar: 'from-emerald-500 to-emerald-600',
  },
  compress: {
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBorder: 'border-amber-200/80 dark:border-amber-800/60',
    categoryBadgeBg: 'bg-amber-500/10 dark:bg-amber-950/40',
    categoryBadgeText: 'text-amber-700 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-800',
    accentBar: 'from-amber-500 to-amber-600',
  },
  ocr: {
    iconBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    iconBorder: 'border-fuchsia-200/80 dark:border-fuchsia-800/60',
    categoryBadgeBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-950/40',
    categoryBadgeText: 'text-fuchsia-700 dark:text-fuchsia-300',
    hoverBorder: 'hover:border-fuchsia-300 dark:hover:border-fuchsia-800',
    accentBar: 'from-fuchsia-500 to-fuchsia-600',
  },
  calculator: {
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    iconBorder: 'border-cyan-200/80 dark:border-cyan-800/60',
    categoryBadgeBg: 'bg-cyan-500/10 dark:bg-cyan-950/40',
    categoryBadgeText: 'text-cyan-700 dark:text-cyan-300',
    hoverBorder: 'hover:border-cyan-300 dark:hover:border-cyan-800',
    accentBar: 'from-cyan-500 to-cyan-600',
  },
  dev: {
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    iconColor: 'text-violet-600 dark:text-violet-400',
    iconBorder: 'border-violet-200/80 dark:border-violet-800/60',
    categoryBadgeBg: 'bg-violet-500/10 dark:bg-violet-950/40',
    categoryBadgeText: 'text-violet-700 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-800',
    accentBar: 'from-violet-500 to-violet-600',
  },
  security: {
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBorder: 'border-orange-200/80 dark:border-orange-800/60',
    categoryBadgeBg: 'bg-orange-500/10 dark:bg-orange-950/40',
    categoryBadgeText: 'text-orange-700 dark:text-orange-300',
    hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-800',
    accentBar: 'from-orange-500 to-orange-600',
  },
  qr: {
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/15',
    iconColor: 'text-teal-600 dark:text-teal-400',
    iconBorder: 'border-teal-200/80 dark:border-teal-800/60',
    categoryBadgeBg: 'bg-teal-500/10 dark:bg-teal-950/40',
    categoryBadgeText: 'text-teal-700 dark:text-teal-300',
    hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-800',
    accentBar: 'from-teal-500 to-teal-600',
  },
  ai: {
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/15',
    iconColor: 'text-sky-600 dark:text-sky-400',
    iconBorder: 'border-sky-200/80 dark:border-sky-800/60',
    categoryBadgeBg: 'bg-sky-500/10 dark:bg-sky-950/40',
    categoryBadgeText: 'text-sky-700 dark:text-sky-300',
    hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-800',
    accentBar: 'from-sky-500 to-sky-600',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  iconBg: 'bg-slate-100 dark:bg-slate-800',
  iconColor: 'text-slate-700 dark:text-slate-300',
  iconBorder: 'border-slate-200 dark:border-slate-700',
  categoryBadgeBg: 'bg-slate-100 dark:bg-slate-800',
  categoryBadgeText: 'text-slate-600 dark:text-slate-400',
  hoverBorder: 'hover:border-brand-500/50',
  accentBar: 'from-brand-500 to-indigo-600',
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const theme = CATEGORY_THEMES[tool.category] || DEFAULT_THEME;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-200 ${theme.hoverBorder}`}
    >
      {/* Clickable Full Card Link */}
      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={tool.name} />

      {/* Top Accent Strip */}
      <div
        className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${theme.accentBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="space-y-3.5 relative z-10 pointer-events-none">
        {/* Header: Icon, Tags, Favorite */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-11 h-11 rounded-xl ${theme.iconBg} ${theme.iconColor} border ${theme.iconBorder} flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shrink-0`}
          >
            <ToolIcon name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {tool.isClientSide && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                WASM
              </span>
            )}
            <FavoriteButton toolId={tool.id} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 tracking-tight transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {tool.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.categoryBadgeBg} ${theme.categoryBadgeText}`}
          >
            {tool.category}
          </span>

          {tool.acceptedExtensions && tool.acceptedExtensions.length > 0 && (
            <span className="text-[10px] text-slate-400 font-mono font-medium hidden sm:inline-block">
              {tool.acceptedExtensions.slice(0, 2).join(' ')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          <span>Open</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
