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
  Bookmark,
  Download,
  Smartphone,
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { QuickSearchModal } from '@/components/shared/QuickSearchModal';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme, isDark } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
      alert('To install NEXORA App:\n• Chrome/Edge: Click the install icon in your address bar or menu.\n• Safari/iOS: Tap Share ➔ "Add to Home Screen".');
    }
  };

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
    { label: 'Passport Photo', href: '/tools/passport-photo-maker', badge: 'AI' },
    { label: 'PDF to Word', href: '/tools/pdf-to-docx', badge: 'OCR' },
    { label: 'Image Resizer', href: '/tools/image-resizer', badge: 'KB/MB' },
    { label: 'Audio Cutter', href: '/tools/audio-cutter', badge: 'NEW' },
    { label: 'Video to MP3', href: '/tools/video-to-mp3' },
    { label: '4K Downloader', href: '/tools/media-downloader' },
    { label: 'PDF Suite', href: '/tools?category=pdf' },
    { label: 'Privacy QR', href: '/qr-barcode' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-md shadow-slate-200/50'
            : 'bg-white/90 border-b border-slate-200/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform border border-brand-400/20">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight">
                NEXORA<span className="text-brand-600 text-xs ml-1 font-mono uppercase font-black">PRO</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-100 text-rose-700 border border-rose-200">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* 1-Click Install App Trigger */}
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all shadow-xs"
              title="Install NEXORA App on Mobile or Desktop"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xs:inline">Install App</span>
            </button>

            {/* Quick Search Bar Trigger (Ctrl+K) */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 border border-slate-200 text-xs font-semibold transition-all shadow-sm"
              aria-label="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-brand-600" />
              <span className="hidden sm:inline-block">Search 70+ tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-slate-500 border border-slate-200 shadow-xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Workspace Link */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-extrabold transition-all shadow-md shadow-brand-500/20 hover:scale-105 active:scale-95"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
