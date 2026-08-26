'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ScanText, LayoutDashboard, Type } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const items = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Workspace', icon: LayoutDashboard },
    { href: '/tools', label: 'All Tools', icon: Grid },
    { href: '/text-tools', label: 'Text', icon: Type },
    { href: '/ocr', label: 'OCR', icon: ScanText },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 2xl:hidden bg-white/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 backdrop-blur-xl px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
