'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from './ToolIcon';
import { FavoriteButton } from './FavoriteButton';

interface CategoryTheme {
  gradientBg: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  hoverBorder: string;
  glowShadow: string;
  accentGlow: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  media: {
    gradientBg: 'from-purple-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
    iconColor: 'text-white',
    iconBorder: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/15',
    badgeText: 'text-purple-300',
    badgeBorder: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.22)]',
    accentGlow: 'bg-purple-500/10',
  },
  pdf: {
    gradientBg: 'from-rose-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-rose-600 to-red-600',
    iconColor: 'text-white',
    iconBorder: 'border-rose-500/40',
    badgeBg: 'bg-rose-500/15',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-500/30',
    hoverBorder: 'hover:border-rose-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.22)]',
    accentGlow: 'bg-rose-500/10',
  },
  image: {
    gradientBg: 'from-blue-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-600',
    iconColor: 'text-white',
    iconBorder: 'border-blue-500/40',
    badgeBg: 'bg-blue-500/15',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.22)]',
    accentGlow: 'bg-blue-500/10',
  },
  document: {
    gradientBg: 'from-indigo-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-indigo-600 to-violet-600',
    iconColor: 'text-white',
    iconBorder: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/15',
    badgeText: 'text-indigo-300',
    badgeBorder: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.22)]',
    accentGlow: 'bg-indigo-500/10',
  },
  text: {
    gradientBg: 'from-emerald-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600',
    iconColor: 'text-white',
    iconBorder: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.22)]',
    accentGlow: 'bg-emerald-500/10',
  },
  compress: {
    gradientBg: 'from-amber-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-600',
    iconColor: 'text-white',
    iconBorder: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-500/30',
    hoverBorder: 'hover:border-amber-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.22)]',
    accentGlow: 'bg-amber-500/10',
  },
  ocr: {
    gradientBg: 'from-fuchsia-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-fuchsia-600 to-pink-600',
    iconColor: 'text-white',
    iconBorder: 'border-fuchsia-500/40',
    badgeBg: 'bg-fuchsia-500/15',
    badgeText: 'text-fuchsia-300',
    badgeBorder: 'border-fuchsia-500/30',
    hoverBorder: 'hover:border-fuchsia-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(217,70,239,0.22)]',
    accentGlow: 'bg-fuchsia-500/10',
  },
  calculator: {
    gradientBg: 'from-cyan-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-cyan-600 to-blue-600',
    iconColor: 'text-white',
    iconBorder: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/15',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.22)]',
    accentGlow: 'bg-cyan-500/10',
  },
  dev: {
    gradientBg: 'from-violet-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-violet-600 to-purple-600',
    iconColor: 'text-white',
    iconBorder: 'border-violet-500/40',
    badgeBg: 'bg-violet-500/15',
    badgeText: 'text-violet-300',
    badgeBorder: 'border-violet-500/30',
    hoverBorder: 'hover:border-violet-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.22)]',
    accentGlow: 'bg-violet-500/10',
  },
  security: {
    gradientBg: 'from-orange-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-orange-600 to-amber-600',
    iconColor: 'text-white',
    iconBorder: 'border-orange-500/40',
    badgeBg: 'bg-orange-500/15',
    badgeText: 'text-orange-300',
    badgeBorder: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.22)]',
    accentGlow: 'bg-orange-500/10',
  },
  qr: {
    gradientBg: 'from-teal-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-teal-600 to-emerald-600',
    iconColor: 'text-white',
    iconBorder: 'border-teal-500/40',
    badgeBg: 'bg-teal-500/15',
    badgeText: 'text-teal-300',
    badgeBorder: 'border-teal-500/30',
    hoverBorder: 'hover:border-teal-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.22)]',
    accentGlow: 'bg-teal-500/10',
  },
  ai: {
    gradientBg: 'from-sky-950/40 via-slate-900/90 to-slate-950',
    iconBg: 'bg-gradient-to-tr from-sky-500 to-indigo-600',
    iconColor: 'text-white',
    iconBorder: 'border-sky-500/40',
    badgeBg: 'bg-sky-500/15',
    badgeText: 'text-sky-300',
    badgeBorder: 'border-sky-500/30',
    hoverBorder: 'hover:border-sky-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.22)]',
    accentGlow: 'bg-sky-500/10',
  },
};

const DEFAULT_THEME: CategoryTheme = {
  gradientBg: 'from-slate-900 via-slate-900/90 to-slate-950',
  iconBg: 'bg-gradient-to-tr from-brand-600 to-indigo-600',
  iconColor: 'text-white',
  iconBorder: 'border-slate-700',
  badgeBg: 'bg-slate-800',
  badgeText: 'text-slate-300',
  badgeBorder: 'border-slate-700',
  hoverBorder: 'hover:border-brand-500/50',
  glowShadow: 'hover:shadow-lg',
  accentGlow: 'bg-slate-800/50',
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const theme = CATEGORY_THEMES[tool.category] || DEFAULT_THEME;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b ${theme.gradientBg} border border-slate-800/90 hover:border-slate-700 p-5 sm:p-6 shadow-xl hover:-translate-y-2 transition-all duration-300 ${theme.hoverBorder} ${theme.glowShadow} overflow-hidden`}
    >
      {/* Background Ambient Corner Glow */}
      <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full ${theme.accentGlow} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-0 rounded-3xl" aria-label={tool.name} />

      <div className="space-y-4 relative z-10 pointer-events-none">
        {/* Header: Icon, Tags, Favorite */}
        <div className="flex items-start justify-between gap-2">
          <div
            className={`w-12 h-12 rounded-2xl ${theme.iconBg} ${theme.iconColor} border ${theme.iconBorder} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shrink-0`}
          >
            <ToolIcon name={tool.icon} className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
            >
              {tool.category}
            </span>
            <FavoriteButton toolId={tool.id} />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 tracking-tight transition-colors line-clamp-1">
            {tool.name}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-400 line-clamp-2 leading-relaxed">
            {tool.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {tool.acceptedExtensions && tool.acceptedExtensions.length > 0
            ? tool.acceptedExtensions.slice(0, 3).join(' ')
            : 'Pro Utility'}
        </span>

        <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
          <span>Launch</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
