'use client';

import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface PrivacyBadgeProps {
  isClientSide?: boolean;
  className?: string;
}

export function PrivacyBadge({ isClientSide = true, className = '' }: PrivacyBadgeProps) {
  const { t } = useI18n();

  if (isClientSide) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm backdrop-blur-sm ${className}`}
        title="Files are processed directly in your browser using WebAssembly. No files are uploaded to any server."
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>{t.clientSideBadge}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm ${className}`}
      title="This complex operation is processed securely in an encrypted temporary server sandbox."
    >
      <Server className="w-3.5 h-3.5 text-amber-500" />
      <span>{t.serverSideBadge}</span>
    </div>
  );
}
