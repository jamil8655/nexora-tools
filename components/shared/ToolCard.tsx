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
    iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-purple-400/30',
    badgeBg: 'bg-purple-100/80',
    badgeText: 'text-purple-800',
    badgeBorder: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(147,51,234,0.14)]',
    topAccent: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    bgSubtle: 'group-hover:bg-purple-50/40',
  },
  pdf: {
    iconBg: 'bg-gradient-to-tr from-rose-600 to-red-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-rose-400/30',
    badgeBg: 'bg-rose-100/80',
    badgeText: 'text-rose-800',
    badgeBorder: 'border-rose-200',
    hoverBorder: 'hover:border-rose-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(225,29,72,0.14)]',
    topAccent: 'bg-gradient-to-r from-rose-500 to-red-500',
    bgSubtle: 'group-hover:bg-rose-50/40',
  },
  image: {
    iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-blue-400/30',
    badgeBg: 'bg-blue-100/80',
    badgeText: 'text-blue-800',
    badgeBorder: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(37,99,235,0.14)]',
    topAccent: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    bgSubtle: 'group-hover:bg-blue-50/40',
  },
  document: {
    iconBg: 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-indigo-400/30',
    badgeBg: 'bg-indigo-100/80',
    badgeText: 'text-indigo-800',
    badgeBorder: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(79,70,229,0.14)]',
    topAccent: 'bg-gradient-to-r from-indigo-500 to-violet-500',
    bgSubtle: 'group-hover:bg-indigo-50/40',
  },
  text: {
    iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-emerald-400/30',
    badgeBg: 'bg-emerald-100/80',
    badgeText: 'text-emerald-800',
    badgeBorder: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(5,150,105,0.14)]',
    topAccent: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    bgSubtle: 'group-hover:bg-emerald-50/40',
  },
  compress: {
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-amber-400/30',
    badgeBg: 'bg-amber-100/80',
    badgeText: 'text-amber-800',
    badgeBorder: 'border-amber-200',
    hoverBorder: 'hover:border-amber-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(217,119,6,0.14)]',
    topAccent: 'bg-gradient-to-r from-amber-500 to-orange-500',
    bgSubtle: 'group-hover:bg-amber-50/40',
  },
  ocr: {
    iconBg: 'bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-fuchsia-400/30',
    badgeBg: 'bg-fuchsia-100/80',
    badgeText: 'text-fuchsia-800',
    badgeBorder: 'border-fuchsia-200',
    hoverBorder: 'hover:border-fuchsia-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(192,38,211,0.14)]',
    topAccent: 'bg-gradient-to-r from-fuchsia-500 to-pink-500',
    bgSubtle: 'group-hover:bg-fuchsia-50/40',
  },
  calculator: {
    iconBg: 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-cyan-400/30',
    badgeBg: 'bg-cyan-100/80',
    badgeText: 'text-cyan-800',
    badgeBorder: 'border-cyan-200',
    hoverBorder: 'hover:border-cyan-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(8,145,178,0.14)]',
    topAccent: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    bgSubtle: 'group-hover:bg-cyan-50/40',
  },
  dev: {
    iconBg: 'bg-gradient-to-tr from-violet-600 to-purple-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-violet-400/30',
    badgeBg: 'bg-violet-100/80',
    badgeText: 'text-violet-800',
    badgeBorder: 'border-violet-200',
    hoverBorder: 'hover:border-violet-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(124,58,237,0.14)]',
    topAccent: 'bg-gradient-to-r from-violet-500 to-purple-500',
    bgSubtle: 'group-hover:bg-violet-50/40',
  },
  security: {
    iconBg: 'bg-gradient-to-tr from-orange-600 to-amber-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-orange-400/30',
    badgeBg: 'bg-orange-100/80',
    badgeText: 'text-orange-800',
    badgeBorder: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(234,88,12,0.14)]',
    topAccent: 'bg-gradient-to-r from-orange-500 to-amber-500',
    bgSubtle: 'group-hover:bg-orange-50/40',
  },
  qr: {
    iconBg: 'bg-gradient-to-tr from-teal-600 to-emerald-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-teal-400/30',
    badgeBg: 'bg-teal-100/80',
    badgeText: 'text-teal-800',
    badgeBorder: 'border-teal-200',
    hoverBorder: 'hover:border-teal-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(13,148,136,0.14)]',
    topAccent: 'bg-gradient-to-r from-teal-500 to-emerald-500',
    bgSubtle: 'group-hover:bg-teal-50/40',
  },
  ai: {
    iconBg: 'bg-gradient-to-tr from-sky-500 to-indigo-600 text-white',
    iconColor: 'text-white',
    iconBorder: 'border-sky-400/30',
    badgeBg: 'bg-sky-100/80',
    badgeText: 'text-sky-800',
    badgeBorder: 'border-sky-200',
    hoverBorder: 'hover:border-sky-400',
    hoverShadow: 'hover:shadow-[0_12px_30px_rgba(2,132,199,0.14)]',
    topAccent: 'bg-gradient-to-r from-sky-500 to-indigo-500',
    bgSubtle: 'group-hover:bg-sky-50/40',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  iconBg: 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white',
  iconColor: 'text-white',
  iconBorder: 'border-slate-300',
  badgeBg: 'bg-slate-100',
  badgeText: 'text-slate-700',
  badgeBorder: 'border-slate-200',
  hoverBorder: 'hover:border-brand-400',
  hoverShadow: 'hover:shadow-md',
  topAccent: 'bg-brand-500',
  bgSubtle: 'group-hover:bg-slate-50',
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
      className={`group relative flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 hover:border-transparent p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 ${theme.hoverBorder} ${theme.hoverShadow} ${theme.bgSubtle} overflow-hidden`}
    >
      {/* Top Accent Line on Hover */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Subtle Micro-Dot Card Background Pattern */}
      <div className="absolute inset-0 card-pattern-overlay opacity-40 pointer-events-none" />

      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-0 rounded-3xl" aria-label={localized.name} />

      <div className="space-y-4 relative z-10 pointer-events-none">
        {/* Header: Glowing Icon, Badges, Favorite */}
        <div className="flex items-start justify-between gap-2">
          <div
            className={`w-12 h-12 rounded-2xl ${theme.iconBg} border ${theme.iconBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shrink-0`}
          >
            <ToolIcon name={tool.icon} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
            >
              {localized.categoryLabel}
            </span>
            <FavoriteButton toolId={tool.id} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-[17px] font-extrabold text-slate-900 group-hover:text-brand-600 tracking-tight transition-colors line-clamp-1">
            {localized.name}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-2 leading-relaxed">
            {localized.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {tool.acceptedExtensions && tool.acceptedExtensions.length > 0
            ? tool.acceptedExtensions.slice(0, 3).join(' ')
            : 'Fast Utility'}
        </span>

        <div className="flex items-center gap-1 text-xs font-extrabold text-brand-600 group-hover:text-brand-700 group-hover:translate-x-1 transition-all">
          <span>Open</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
