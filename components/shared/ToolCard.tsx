'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from './ToolIcon';
import { FavoriteButton } from './FavoriteButton';

interface CategoryTheme {
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  badgeBg: string;
  badgeText: string;
  hoverBorder: string;
  glowShadow: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  media: {
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBorder: 'border-purple-200/80 dark:border-purple-800/60',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
    badgeText: 'text-purple-700 dark:text-purple-300',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]',
  },
  pdf: {
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
    iconColor: 'text-rose-600 dark:text-rose-400',
    iconBorder: 'border-rose-200/80 dark:border-rose-800/60',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/50',
    badgeText: 'text-rose-700 dark:text-rose-300',
    hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(244,63,94,0.12)]',
  },
  image: {
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBorder: 'border-blue-200/80 dark:border-blue-800/60',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
    badgeText: 'text-blue-700 dark:text-blue-300',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]',
  },
  document: {
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBorder: 'border-indigo-200/80 dark:border-indigo-800/60',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]',
  },
  text: {
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBorder: 'border-emerald-200/80 dark:border-emerald-800/60',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
  },
  compress: {
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBorder: 'border-amber-200/80 dark:border-amber-800/60',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
    badgeText: 'text-amber-700 dark:text-amber-300',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]',
  },
  ocr: {
    iconBg: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/15',
    iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    iconBorder: 'border-fuchsia-200/80 dark:border-fuchsia-800/60',
    badgeBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/50',
    badgeText: 'text-fuchsia-700 dark:text-fuchsia-300',
    hoverBorder: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(217,70,239,0.12)]',
  },
  calculator: {
    iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    iconBorder: 'border-cyan-200/80 dark:border-cyan-800/60',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/50',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]',
  },
  dev: {
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    iconColor: 'text-violet-600 dark:text-violet-400',
    iconBorder: 'border-violet-200/80 dark:border-violet-800/60',
    badgeBg: 'bg-violet-50 dark:bg-violet-950/50',
    badgeText: 'text-violet-700 dark:text-violet-300',
    hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]',
  },
  security: {
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/15',
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBorder: 'border-orange-200/80 dark:border-orange-800/60',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/50',
    badgeText: 'text-orange-700 dark:text-orange-300',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)]',
  },
  qr: {
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/15',
    iconColor: 'text-teal-600 dark:text-teal-400',
    iconBorder: 'border-teal-200/80 dark:border-teal-800/60',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
    badgeText: 'text-teal-700 dark:text-teal-300',
    hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(20,184,166,0.12)]',
  },
  ai: {
    iconBg: 'bg-sky-500/10 dark:bg-sky-500/15',
    iconColor: 'text-sky-600 dark:text-sky-400',
    iconBorder: 'border-sky-200/80 dark:border-sky-800/60',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/50',
    badgeText: 'text-sky-700 dark:text-sky-300',
    hoverBorder: 'hover:border-sky-400 dark:hover:border-sky-700',
    glowShadow: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  iconBg: 'bg-slate-100 dark:bg-slate-800',
  iconColor: 'text-slate-700 dark:text-slate-300',
  iconBorder: 'border-slate-200 dark:border-slate-700',
  badgeBg: 'bg-slate-100 dark:bg-slate-800',
  badgeText: 'text-slate-600 dark:text-slate-400',
  hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-600',
  glowShadow: 'hover:shadow-md',
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const theme = CATEGORY_THEMES[tool.category] || DEFAULT_THEME;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 transition-all duration-300 ${theme.hoverBorder} ${theme.glowShadow}`}
    >
      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={tool.name} />

      <div className="space-y-3.5 relative z-10 pointer-events-none">
        {/* Header: Icon, Tags, Favorite */}
        <div className="flex items-start justify-between gap-2">
          <div
            className={`w-11 h-11 rounded-xl ${theme.iconBg} ${theme.iconColor} border ${theme.iconBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm shrink-0`}
          >
            <ToolIcon name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}
            >
              {tool.category}
            </span>
            <FavoriteButton toolId={tool.id} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 tracking-tight transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {tool.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <span className="text-[11px] font-medium text-slate-400">
          {tool.acceptedExtensions && tool.acceptedExtensions.length > 0
            ? tool.acceptedExtensions.slice(0, 2).join(' ')
            : 'Fast Utility'}
        </span>

        <div className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
          <span>Open</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
