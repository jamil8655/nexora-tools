'use client';

import React from 'react';
import { Heart, Star } from 'lucide-react';
import { useUserStore } from '@/lib/user/user-store';
import { TOOLS_LIST } from '@/lib/tools-config';

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
  variant?: 'heart' | 'star';
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  toolId,
  className = '',
  variant = 'star',
  size = 'md',
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite: toggleStoreFav } = useUserStore();
  const isFavorited = isFavorite(toolId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const Icon = variant === 'heart' ? Heart : Star;
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`p-1.5 rounded-xl transition-transform active:scale-90 ${
        isFavorited
          ? 'text-amber-500 hover:text-amber-600 bg-amber-500/10'
          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${className}`}
    >
      <Icon className={`${iconSize} ${isFavorited ? 'fill-current' : ''}`} />
    </button>
  );
}
