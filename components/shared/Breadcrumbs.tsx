'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useI18n();

  return (
    <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6 rtl:space-x-reverse" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{t.nav.home}</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
