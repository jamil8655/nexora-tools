'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Wrench,
  Star,
  History,
  Download,
  Zap,
  CreditCard,
  Bell,
  Settings,
  Shield,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

interface UserMenuDropdownProps {
  userName?: string;
  userEmail?: string;
}

export function UserMenuDropdown({
  userName = 'Hafiz Jamilurrahman',
  userEmail = 'hafiz.jamil@nexora.pro',
}: UserMenuDropdownProps) {
  const router = useRouter();
  const { isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
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

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  const menuItems = [
    { label: 'My Profile', href: '/account', icon: User },
    { label: 'My Tools', href: '/tools', icon: Wrench },
    { label: 'Favorites', href: '/dashboard?tab=files', icon: Star },
    { label: 'History', href: '/dashboard?tab=history', icon: History },
    { label: 'Downloads', href: '/dashboard?tab=files', icon: Download },
    { label: 'Usage', href: '/dashboard?tab=usage', icon: Zap },
    { label: 'My Plan', href: '/dashboard?tab=plan', icon: CreditCard },
    { label: 'Notifications', href: '/account', icon: Bell },
    { label: 'Settings', href: '/account', icon: Settings },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all text-slate-800 dark:text-slate-100 font-bold text-xs shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-[11px] font-black shadow-xs">
          {userName.charAt(0)}
        </div>
        <span className="hidden sm:inline-block max-w-[120px] truncate text-xs font-extrabold">
          {userName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-white">
          {/* 1. USER HEADER */}
          <div className="p-4 bg-gradient-to-br from-slate-50 to-brand-50/30 dark:from-slate-950 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-sm font-black shadow-md shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="font-black text-sm truncate text-slate-900 dark:text-white">
                👤 {userName}
              </div>
              <div className="text-[11px] text-slate-500 truncate font-medium">
                {isAdmin ? '🛡️ Administrator' : userEmail}
              </div>
            </div>
          </div>

          {/* 2. USER NAVIGATION ITEMS */}
          <div className="p-2 space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* 3. ADMIN CONTROL CENTER (EXCLUSIVELY FOR VERIFIED ADMINS) */}
          {isAdmin && (
            <>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
              <div className="p-2">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>🛡️ Admin Control Center</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-emerald-600 text-white">
                    ADMIN
                  </span>
                </Link>
              </div>
            </>
          )}

          {/* 4. LOG OUT */}
          <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
          <div className="p-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
