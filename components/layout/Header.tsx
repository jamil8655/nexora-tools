'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Search,
  Moon,
  Sun,
  Languages,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Layers,
  ScanText,
  Binary,
  QrCode,
  PenTool,
  History,
  LayoutDashboard,
  Code2,
  Type,
  Lock,
  Star,
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Language } from '@/lib/i18n/translations';
import { QuickSearchModal } from './QuickSearchModal';
import { siteConfig } from '@/config/site';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { href: '/tools?cat=pdf', label: t.nav.pdfTools, icon: FileText },
    { href: '/tools?cat=image', label: t.nav.imageTools, icon: Layers },
    { href: '/text-tools', label: t.nav.textTools, icon: Type },
    { href: '/dev-tools', label: t.nav.devTools, icon: Code2 },
    { href: '/security-tools', label: t.nav.security, icon: Lock },
    { href: '/calculators', label: t.nav.calculators, icon: Binary },
    { href: '/ocr', label: t.nav.ocr, icon: ScanText },
    { href: '/ai-tools', label: t.nav.aiTools, icon: Sparkles },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-50">
                NEXORA<span className="text-brand-500 font-extrabold text-xs ml-1">TOOLS</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 -mt-1 hidden sm:inline-block">
                Digital Utility Super App
              </span>
            </div>
          </Link>

          {/* Search Trigger Button */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center justify-between w-64 lg:w-72 px-3.5 py-2 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-500" />
              <span>Search 60+ tools...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 rounded border border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-300">
              Ctrl+K
            </kbd>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden 2xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Language, Theme, Dashboard, Admin, Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Search Icon on mobile */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 md:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-xs font-semibold"
                title="Change Language"
              >
                <Languages className="w-4 h-4 text-brand-500" />
                <span className="uppercase text-[11px] font-bold">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setIsLangDropdownOpen(false)}
                >
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'ar', label: 'العربية (Arabic)' },
                    { code: 'ur', label: 'اردو (Urdu)' },
                    { code: 'hi', label: 'हिन्दी (Hindi)' },
                  ].map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLanguage(l.code as Language)}
                      className={`w-full px-3 py-1.5 text-xs text-left font-semibold flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 ${
                        language === l.code
                          ? 'text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/20'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* History */}
            <Link
              href="/history"
              className="hidden sm:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Processing History"
            >
              <History className="w-4 h-4" />
            </Link>

            {/* Dashboard shortcut */}
            <Link
              href="/dashboard"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 hover:bg-brand-100 text-xs font-bold transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 2xl:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="2xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 flex items-center gap-2"
                >
                  <link.icon className="w-4 h-4 text-brand-500" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/history"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
              >
                <History className="w-4 h-4 text-slate-400" />
                <span>History</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
