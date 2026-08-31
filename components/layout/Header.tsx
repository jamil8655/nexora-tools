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
  Menu,
  X,
  Languages,
  Sun,
  Moon,
  Laptop,
  Star,
  Clock,
  Download,
  Settings as SettingsIcon,
  ShieldCheck,
  HelpCircle,
  Mail,
  User,
  LogOut,
  ChevronRight,
  Check,
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
  const { unreadCount, profilePhoto } = useUserStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);

  // Close mobile drawer on navigation
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

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
    { label: t.nav.workflows || 'Workflows', href: '/workflows', icon: Workflow },
    { label: t.footer.aboutPlatform || 'About', href: '/about', icon: Info },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full max-w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
            : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4 min-w-0">
          {/* Left Area: Hamburger (Mobile) + Logo & Brand */}
          <div className="flex items-center gap-1.5 sm:gap-4 min-w-0 shrink">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="p-2 rounded-xl lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo & Brand */}
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 group transition-transform active:scale-95 shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-linear-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-black text-sm sm:text-lg tracking-tight bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-brand-900 to-indigo-900 dark:from-white dark:via-brand-200 dark:to-indigo-200">
                    NEXORA
                  </span>
                  <span className="px-1 py-0.2 rounded-md bg-brand-500/10 dark:bg-brand-400/10 text-brand-600 dark:text-brand-400 text-[8px] sm:text-[9px] font-black tracking-wider uppercase border border-brand-500/20">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:inline leading-none truncate">
                  Tools & Master Courses
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
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

          {/* Right Action Bar */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 min-w-0">
            {/* Desktop Install App Trigger */}
            <button
              type="button"
              onClick={handleInstallClick}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all shadow-xs shrink-0"
              title="Install NEXORA App"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Install App</span>
            </button>

            {/* Language Selector (Hidden on extra-small screens, available in Mobile Drawer) */}
            <div className="hidden sm:block shrink-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
                title="Change Language"
              >
                <option value="en">EN</option>
                <option value="ur">اردو</option>
                <option value="ar">عربي</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>

            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all shrink-0"
              title={t.userDashboard.notificationsTitle}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-600 ring-2 ring-white dark:ring-slate-900" />
              )}
            </Link>

            {/* Desktop Global Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all items-center gap-1.5 text-xs font-mono shrink-0"
              title="Quick Search (⌘K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-bold">⌘K</span>
            </button>

            {/* User Profile Menu OR Clean Log In Button */}
            {isAuthenticated ? (
              <div className="shrink-0">
                <UserMenuDropdown />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-all shadow-xs active:scale-95 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="text-xs">{t.nav.login}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Drawer (Navigation & Settings Sidebar) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className={`fixed inset-y-0 ${
              isRtl ? 'right-0' : 'left-0'
            } w-full max-w-xs bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-in ${
              isRtl ? 'slide-in-from-right' : 'slide-in-from-left'
            } duration-200`}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md shadow-brand-500/20">
                  <Sparkles className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-black text-base text-slate-900 dark:text-white">NEXORA</span>
                  <span className="px-1 py-0.2 rounded-md bg-brand-500/10 text-brand-600 text-[8px] font-black uppercase">
                    PRO
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 space-y-6 flex-1">
              {/* User Profile Card (if signed in) */}
              {isAuthenticated ? (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Avatar" className="w-9 h-9 rounded-xl object-cover border border-brand-500 shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-brand-600 shrink-0"
                  >
                    <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-linear-to-r from-brand-50 to-indigo-50 dark:from-brand-950/40 dark:to-indigo-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Join NEXORA PRO</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Save progress, track certificates & pin favorite tools.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileDrawerOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-xs hover:bg-brand-700"
                  >
                    {t.nav.login} / {t.nav.signup}
                  </button>
                </div>
              )}

              {/* Main Navigation Links */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Navigation</p>
                <Link
                  href="/tools"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>{t.nav.allTools}</span>
                </Link>
                <Link
                  href="/courses"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>{t.nav.courses}</span>
                </Link>
                <Link
                  href="/workflows"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <Workflow className="w-4 h-4 text-purple-600" />
                  <span>{t.nav.workflows}</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>{t.footer.aboutPlatform}</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>{t.footer.faq}</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span>{t.footer.contactUs}</span>
                </Link>
              </div>

              {/* Language Selection Grid */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" />
                  <span>Language</span>
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'ur', label: 'اردو' },
                    { id: 'ar', label: 'العربية' },
                    { id: 'hi', label: 'हिन्दी' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLanguage(l.id as any)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all ${
                        language === l.id
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Theme Mode</p>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTheme('light')}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      theme === 'light'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      theme === 'dark'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      theme === 'system'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Auto</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-bold text-xs border border-purple-200 dark:border-purple-800"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.nav.admin}</span>
                </Link>
              )}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileDrawerOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.nav.logout}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Unified Search Modal */}
      <UnifiedSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Real Firebase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
