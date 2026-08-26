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
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { siteConfig } from '@/config/site';
import { QuickSearchModal } from '@/components/shared/QuickSearchModal';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Global Ctrl+K / Cmd+K listener
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

  // Scroll detection for dynamic header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PDF', href: '/tools?category=pdf', icon: FileText },
    { label: 'Images', href: '/tools?category=image', icon: ImageIcon },
    { label: 'Documents', href: '/tools?category=document', icon: Layers },
    { label: 'Calculators', href: '/calculators', icon: Wrench },
    { label: 'Dev Tools', href: '/dev-tools', icon: LayoutGrid },
    { label: 'Security', href: '/security-tools', icon: Sparkles },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-md shadow-black/20'
            : 'bg-slate-900 dark:bg-slate-950 border-b border-slate-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                NEXORA<span className="text-brand-400 text-xs ml-1 font-mono uppercase">Tools</span>
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-brand-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
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
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs transition-all shadow-sm"
              aria-label="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline-block text-slate-400">Search tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-700">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Dashboard Workspace */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors shadow-sm shadow-brand-600/30"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
