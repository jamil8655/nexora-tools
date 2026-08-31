'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, GraduationCap, HelpCircle, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

/**
 * Clean 5-Item Mobile Bottom Navigation Bar (No search circle, no duplicate admin panels).
 * Standard canonical layout: Home | Tools | Learn | Quiz | Profile
 */
export function MobileNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { label: t.nav.home || 'Home', href: '/', icon: Home },
    { label: t.nav.allTools || 'Tools', href: '/tools', icon: Sparkles },
    { label: t.nav.courses || 'Learn', href: '/courses', icon: GraduationCap },
    { label: t.quiz?.title || 'Quiz', href: '/quiz', icon: HelpCircle },
    { label: t.nav.myProfile || 'Profile', href: '/account', icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 lg:hidden px-1.5 py-1 shadow-lg shadow-black/5 safe-bottom"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl text-[10px] font-extrabold transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50/70 dark:bg-brand-950/50'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon
                className={`w-4 h-4 mb-0.5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'
                }`}
              />
              <span className="truncate max-w-[56px] text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
