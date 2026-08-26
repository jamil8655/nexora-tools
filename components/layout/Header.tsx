'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Sparkles,
  Command,
  Sun,
  Moon,
  LayoutGrid,
  FileText,
  Image as ImageIcon,
  Layers,
  Wrench,
  Bookmark,
  Smartphone,
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { siteConfig } from '@/config/site';
import { QuickSearchModal } from '@/components/shared/QuickSearchModal';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PDF Suite', href: '/tools?category=pdf', icon: FileText },
    { label: 'Image Tools', href: '/tools?category=image', icon: ImageIcon },
    { label: 'Documents', href: '/tools?category=document', icon: Layers },
    { label: 'Calculators', href: '/calculators', icon: Wrench },
    { label: 'Dev Tools', href: '/dev-tools', icon: LayoutGrid },
    { label: 'Security', href: '/security-tools', icon: Sparkles },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'glass-nav shadow-sm'
            : 'bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                NEXORA<span className="text-brand-600 dark:text-brand-400 text-xs ml-1 font-mono uppercase">Tools</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Bar Trigger (Ctrl+K) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all shadow-sm"
              aria-label="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline-block">Search 60+ tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-200 dark:border-slate-700">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Workspace Link */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-colors shadow-sm shadow-brand-600/25"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
