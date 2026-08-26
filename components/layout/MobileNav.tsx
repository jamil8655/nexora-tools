'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, Bookmark, Calculator } from 'lucide-react';
import { QuickSearchModal } from '@/components/shared/QuickSearchModal';

export function MobileNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const tabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Tools', href: '/tools', icon: Grid },
    { label: 'Calculators', href: '/calculators', icon: Calculator },
    { label: 'Workspace', href: '/dashboard', icon: Bookmark },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 lg:hidden px-2 py-1.5 shadow-lg shadow-black">
        <div className="flex items-center justify-around">
          {tabs.slice(0, 2).map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            );
          })}

          {/* Center Search Action */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center justify-center w-10 h-10 -mt-3 rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/40"
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
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
