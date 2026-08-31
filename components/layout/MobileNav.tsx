'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, GraduationCap, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';

export function MobileNav() {
  const pathname = usePathname();
  const { isAdmin, isAuthenticated } = useAuth();
  const { t } = useI18n();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const baseTabs = [
    { label: t.nav.home, href: '/', icon: Home },
    { label: t.nav.allTools || 'Tools', href: '/tools', icon: Grid },
    { label: t.nav.courses || 'Courses', href: '/courses', icon: GraduationCap },
    { label: t.nav.myProfile || 'Account', href: '/account', icon: User },
  ];

  const tabs = isAdmin
    ? [...baseTabs.slice(0, 3), { label: t.nav.admin || 'Admin', href: '/admin', icon: ShieldCheck }, baseTabs[3]]
    : baseTabs;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 lg:hidden px-2 py-1.5 shadow-lg shadow-black/10">
        <div className="flex items-center justify-around">
          {tabs.slice(0, 2).map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate max-w-[60px]">{tab.label}</span>
              </Link>
            );
          })}

          {/* Center Search Action */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center w-10 h-10 -mt-3 rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/40 active:scale-95 transition-transform"
            aria-label="Open Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {tabs.slice(2).map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate max-w-[60px]">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <UnifiedSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
