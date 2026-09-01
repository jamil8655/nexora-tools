'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Sparkles,
  Smartphone,
  Workflow,
  GraduationCap,
  Bell,
  LogIn,
  Info,
  Languages,
  HelpCircle,
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useAuth } from '@/lib/auth/auth-context';
import { useUserStore } from '@/lib/user/user-store';
import { UnifiedSearchModal } from '@/components/search/UnifiedSearchModal';
import { UserMenuDropdown } from './UserMenuDropdown';
import { AuthModal } from '@/components/auth/AuthModal';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, isRtl } = useI18n();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useUserStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstall(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install NEXORA: Tap "Share" or "Menu" in your browser and select "Add to Home Screen".');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: t.nav.allTools || 'All Tools', href: '/tools', icon: Sparkles },
    { label: t.nav.courses || 'Courses', href: '/courses', icon: GraduationCap },
    { label: t.quiz?.title || 'Quizzes', href: '/quiz', icon: HelpCircle },
    { label: t.nav.workflows || 'Workflows', href: '/workflows', icon: Workflow },
    { label: t.footer.aboutPlatform || 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full max-w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
            : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Left Area: Official Brand Logo & Name (Clean, No Duplicate Left Menus) */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 shrink">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group transition-transform active:scale-95 shrink-0"
              aria-label="NEXORA Tools Pro Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-linear-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform shrink-0 border border-white/20">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-brand-900 to-indigo-900 dark:from-white dark:via-brand-200 dark:to-indigo-200">
                    NEXORA
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-brand-500/10 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400 text-[9px] font-black tracking-wider uppercase border border-brand-500/20">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold hidden md:inline leading-none truncate">
                  Master Tools & Developer Learning
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar (The Single Authoritative Profile & Tools Location) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 min-w-0">
            {/* Desktop Install App Trigger */}
            <button
              type="button"
              onClick={handleInstallClick}
              className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs shrink-0"
              title="Install NEXORA App"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Install App</span>
            </button>

            {/* Language Selector */}
            <div className="shrink-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
                title="Change Language"
                aria-label="Select Language"
              >
                <option value="en">EN</option>
                <option value="ur">اردو</option>
                <option value="ar">عربي</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>

            {/* Global Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 text-xs font-mono shrink-0"
              title="Quick Search (⌘K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span className="hidden md:inline font-bold">⌘K</span>
            </button>

            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all shrink-0"
              title={t.userDashboard.notificationsTitle}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-brand-600 ring-2 ring-white dark:ring-slate-900" />
              )}
            </Link>

            {/* The One & Only Authoritative User/Admin Profile Menu OR Log In Button */}
            {isAuthenticated ? (
              <div className="shrink-0">
                <UserMenuDropdown />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs transition-all shadow-md shadow-brand-600/20 active:scale-95 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="text-xs">{t.nav.login || 'Log In'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Unified Search Modal */}
      <UnifiedSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
