'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from './ToolIcon';
import { FavoriteButton } from './FavoriteButton';
import { useI18n } from '@/lib/i18n/i18n-context';
import { getLocalizedTool } from '@/lib/i18n/catalog-translations';

interface CategoryTheme {
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  hoverBorder: string;
  hoverShadow: string;
  topAccent: string;
  bgSubtle: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  media: {
    iconBg: 'bg-linear-to-tr from-purple-600 to-indigo-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-purple-400/30',
    badgeBg: 'bg-purple-100/80 dark:bg-purple-950/60',
    badgeText: 'text-purple-800 dark:text-purple-300',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(147,51,234,0.14)]',
    topAccent: 'bg-linear-to-r from-purple-500 to-indigo-500',
    bgSubtle: 'group-hover:bg-purple-50/40 dark:group-hover:bg-purple-950/20',
  },
  pdf: {
    iconBg: 'bg-linear-to-tr from-rose-600 to-red-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-rose-400/30',
    badgeBg: 'bg-rose-100/80 dark:bg-rose-950/60',
    badgeText: 'text-rose-800 dark:text-rose-300',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    hoverBorder: 'hover:border-rose-400 dark:hover:border-rose-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(225,29,72,0.14)]',
    topAccent: 'bg-linear-to-r from-rose-500 to-red-500',
    bgSubtle: 'group-hover:bg-rose-50/40 dark:group-hover:bg-rose-950/20',
  },
  image: {
    iconBg: 'bg-linear-to-tr from-blue-600 to-cyan-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-blue-400/30',
    badgeBg: 'bg-blue-100/80 dark:bg-blue-950/60',
    badgeText: 'text-blue-800 dark:text-blue-300',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(37,99,235,0.14)]',
    topAccent: 'bg-linear-to-r from-blue-500 to-cyan-500',
    bgSubtle: 'group-hover:bg-blue-50/40 dark:group-hover:bg-blue-950/20',
  },
  document: {
    iconBg: 'bg-linear-to-tr from-indigo-600 to-violet-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-indigo-400/30',
    badgeBg: 'bg-indigo-100/80 dark:bg-indigo-950/60',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(79,70,229,0.14)]',
    topAccent: 'bg-linear-to-r from-indigo-500 to-violet-500',
    bgSubtle: 'group-hover:bg-indigo-50/40 dark:group-hover:bg-indigo-950/20',
  },
  text: {
    iconBg: 'bg-linear-to-tr from-emerald-600 to-teal-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-emerald-400/30',
    badgeBg: 'bg-emerald-100/80 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    hoverBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(5,150,105,0.14)]',
    topAccent: 'bg-linear-to-r from-emerald-500 to-teal-500',
    bgSubtle: 'group-hover:bg-emerald-50/40 dark:group-hover:bg-emerald-950/20',
  },
  compress: {
    iconBg: 'bg-linear-to-tr from-amber-500 to-orange-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-amber-400/30',
    badgeBg: 'bg-amber-100/80 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    hoverBorder: 'hover:border-amber-400 dark:hover:border-amber-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(217,119,6,0.14)]',
    topAccent: 'bg-linear-to-r from-amber-500 to-orange-500',
    bgSubtle: 'group-hover:bg-amber-50/40 dark:group-hover:bg-amber-950/20',
  },
  ocr: {
    iconBg: 'bg-linear-to-tr from-fuchsia-600 to-pink-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-fuchsia-400/30',
    badgeBg: 'bg-fuchsia-100/80 dark:bg-fuchsia-950/60',
    badgeText: 'text-fuchsia-800 dark:text-fuchsia-300',
    badgeBorder: 'border-fuchsia-200 dark:border-fuchsia-800',
    hoverBorder: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(192,38,211,0.14)]',
    topAccent: 'bg-linear-to-r from-fuchsia-500 to-pink-500',
    bgSubtle: 'group-hover:bg-fuchsia-50/40 dark:group-hover:bg-fuchsia-950/20',
  },
  calculator: {
    iconBg: 'bg-linear-to-tr from-cyan-600 to-blue-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-cyan-400/30',
    badgeBg: 'bg-cyan-100/80 dark:bg-cyan-950/60',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    hoverBorder: 'hover:border-cyan-400 dark:hover:border-cyan-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(8,145,178,0.14)]',
    topAccent: 'bg-linear-to-r from-cyan-500 to-blue-500',
    bgSubtle: 'group-hover:bg-cyan-50/40 dark:group-hover:bg-cyan-950/20',
  },
  dev: {
    iconBg: 'bg-linear-to-tr from-violet-600 to-purple-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-violet-400/30',
    badgeBg: 'bg-violet-100/80 dark:bg-violet-950/60',
    badgeText: 'text-violet-800 dark:text-violet-300',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    hoverBorder: 'hover:border-violet-400 dark:hover:border-violet-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(124,58,237,0.14)]',
    topAccent: 'bg-linear-to-r from-violet-500 to-purple-500',
    bgSubtle: 'group-hover:bg-violet-50/40 dark:group-hover:bg-violet-950/20',
  },
  security: {
    iconBg: 'bg-linear-to-tr from-orange-600 to-amber-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-orange-400/30',
    badgeBg: 'bg-orange-100/80 dark:bg-orange-950/60',
    badgeText: 'text-orange-800 dark:text-orange-300',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(234,88,12,0.14)]',
    topAccent: 'bg-linear-to-r from-orange-500 to-amber-500',
    bgSubtle: 'group-hover:bg-orange-50/40 dark:group-hover:bg-orange-950/20',
  },
  qr: {
    iconBg: 'bg-linear-to-tr from-teal-600 to-emerald-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-teal-400/30',
    badgeBg: 'bg-teal-100/80 dark:bg-teal-950/60',
    badgeText: 'text-teal-800 dark:text-teal-300',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(13,148,136,0.14)]',
    topAccent: 'bg-linear-to-r from-teal-500 to-emerald-500',
    bgSubtle: 'group-hover:bg-teal-50/40 dark:group-hover:bg-teal-950/20',
  },
  ai: {
    iconBg: 'bg-linear-to-tr from-sky-500 to-indigo-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-sky-400/30',
    badgeBg: 'bg-sky-100/80 dark:bg-sky-950/60',
    badgeText: 'text-sky-800 dark:text-sky-300',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
    hoverBorder: 'hover:border-sky-400 dark:hover:border-sky-500',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(2,132,199,0.14)]',
    topAccent: 'bg-linear-to-r from-sky-500 to-indigo-500',
    bgSubtle: 'group-hover:bg-sky-50/40 dark:group-hover:bg-sky-950/20',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  iconBg: 'bg-linear-to-tr from-brand-600 to-indigo-600 text-white',
  iconColor: 'text-white',
  iconBorder: 'border-slate-300 dark:border-slate-700',
  badgeBg: 'bg-slate-100 dark:bg-slate-800',
  badgeText: 'text-slate-700 dark:text-slate-300',
  badgeBorder: 'border-slate-200 dark:border-slate-700',
  hoverBorder: 'hover:border-brand-400 dark:hover:border-brand-500',
  hoverShadow: 'hover:shadow-md',
  topAccent: 'bg-brand-500',
  bgSubtle: 'group-hover:bg-slate-50 dark:group-hover:bg-slate-800/40',
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { language } = useI18n();
  const localized = getLocalizedTool(tool, language);
  const theme = CATEGORY_THEMES[tool.category] || DEFAULT_THEME;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-transparent p-4 sm:p-6 shadow-xs hover:-translate-y-1 transition-all duration-200 active:scale-[0.98] ${theme.hoverBorder} ${theme.hoverShadow} ${theme.bgSubtle} overflow-hidden`}
    >
      {/* Top Accent Line on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 ${theme.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Subtle Micro-Dot Card Background Pattern */}
      <div className="absolute inset-0 card-pattern-overlay opacity-40 pointer-events-none" />

      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl" aria-label={localized.name} />

      <div className="space-y-3 sm:space-y-4 relative z-10 pointer-events-none">
        {/* Header: Glowing Icon, Badges, Favorite */}
        <div className="flex items-start justify-between gap-2">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${theme.iconBg} border ${theme.iconBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shrink-0`}
          >
            <ToolIcon name={tool.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
            <span
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
            >
              {localized.categoryLabel}
            </span>
            <FavoriteButton toolId={tool.id} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base md:text-[17px] font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 tracking-tight transition-colors line-clamp-1">
            {localized.name}
          </h3>
          <p className="text-[11px] sm:text-xs md:text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {localized.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {tool.acceptedExtensions && tool.acceptedExtensions.length > 0
            ? tool.acceptedExtensions.slice(0, 3).join(' ')
            : 'Fast Engine'}
        </span>

        <div className="flex items-center gap-1 text-xs font-extrabold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-all">
          <span>Open</span>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
}
