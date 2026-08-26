'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Zap } from 'lucide-react';
import { ToolDefinition } from '@/lib/types';
import { ToolIcon } from './ToolIcon';
import { FavoriteButton } from './FavoriteButton';

interface ToolCardProps {
  tool: ToolDefinition;
  compact?: boolean;
}

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 p-5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200">
      <Link href={`/tools/${tool.id}`} className="absolute inset-0 z-0" aria-label={tool.name} />

      <div className="space-y-3 relative z-10 pointer-events-none">
        {/* Top bar: Icon, Badges, Favorite Action */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center group-hover:bg-brand-50 dark:group-hover:bg-brand-950/60 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:border-brand-200 dark:group-hover:border-brand-800/60 transition-all duration-200 shrink-0">
            <ToolIcon name={tool.icon} className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {tool.popular && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Popular
              </span>
            )}
            {tool.isClientSide && (
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                WASM
              </span>
            )}
            <FavoriteButton toolId={tool.id} />
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 tracking-tight transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
            {tool.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pointer-events-none flex items-center justify-between pt-3.5 mt-3 border-t border-slate-100 dark:border-slate-800/70 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {tool.category}
          </span>
          {tool.acceptedExtensions && tool.acceptedExtensions.length > 0 && (
            <span className="text-[10px] text-slate-400 font-mono">
              • {tool.acceptedExtensions.slice(0, 2).join(' ')}
            </span>
          )}
        </div>

        <div className="flex items-center text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all">
          <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        </div>
      </div>
    </div>
  );
}
