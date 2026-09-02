'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { useUserStore } from '@/lib/user/user-store';
import { TOOLS_LIST } from '@/lib/tools-config';
import { triggerHaptic } from '@/lib/motion/motion-system';

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  toolId,
  className = '',
  size = 'md',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite: toggleStoreFav } = useUserStore();
  const isFavorited = isFavorite(toolId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerHaptic(isFavorited ? 'light' : 'selection');
    const tool = TOOLS_LIST.find((t) => t.id === toolId || t.slug === toolId);
    toggleStoreFav({
      id: toolId,
      type: 'tool',
      title: tool?.name || toolId,
      category: tool?.category || 'Utility',
      url: `/tools/${toolId}`,
      iconName: tool?.icon,
    });
  };

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isFavorited ? 'Remove bookmark' : 'Bookmark tool'}
      title={isFavorited ? 'Remove bookmark' : 'Bookmark tool'}
      className={`p-2 rounded-xl transition-all duration-150 active:scale-75 select-none ${
        isFavorited
          ? 'text-brand-600 dark:text-brand-400 bg-brand-500/15 dark:bg-brand-500/25 shadow-xs'
          : 'text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${className}`}
    >
      <Bookmark
        className={`${iconSize} transition-transform duration-200 ${
          isFavorited ? 'fill-current scale-110' : 'scale-100'
        }`}
      />
    </button>
  );
}
