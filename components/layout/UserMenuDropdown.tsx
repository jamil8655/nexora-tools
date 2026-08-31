'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Wrench,
  Star,
  Clock,
  Download,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';

interface UserMenuDropdownProps {
  userName?: string;
  userEmail?: string;
}

export function UserMenuDropdown({
  userName,
  userEmail,
}: UserMenuDropdownProps) {
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  const { t, isRtl } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name || userName || 'Hafiz Jamilurrahman';
  const displayEmail = user?.email || userEmail || 'jamil8655@gmail.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push('/');
  };

  const menuItems = [
    { label: t.nav.myProfile, href: '/account', icon: User },
    { label: t.courses.myCourses, href: '/courses', icon: GraduationCap },
    { label: t.nav.myTools, href: '/account', icon: Wrench },
    { label: t.nav.favorites, href: '/favorites', icon: Star },
    { label: t.nav.history, href: '/history', icon: Clock },
    { label: t.nav.downloads, href: '/downloads', icon: Download },
    { label: t.nav.notifications, href: '/notifications', icon: Bell },
    { label: t.nav.settings, href: '/settings', icon: Settings },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all text-slate-800 dark:text-slate-100 font-bold text-xs shadow-xs focus:outline-hidden focus:ring-2 focus:ring-brand-500/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-[11px] font-black shadow-xs shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline-block max-w-[110px] truncate text-xs font-extrabold">
          {displayName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-64 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isRtl ? 'left-0' : 'right-0'
          }`}
        >
          {/* User Info Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-md shrink-0">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
              </div>
            </div>
            {isAdmin && (
              <div className="mt-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black border border-purple-500/20 w-fit">
                <ShieldCheck className="w-3 h-3" />
                <span>SUPER ADMIN</span>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <div className="py-2 px-1.5 space-y-0.5">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}

            {/* Admin Control Center Link if Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-black text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors border border-purple-200/60 dark:border-purple-800/60 mt-1"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{t.nav.admin}</span>
              </Link>
            )}
          </div>

          {/* Logout Section */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>{t.nav.logout}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
