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
  Camera,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useUserStore } from '@/lib/user/user-store';

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
  const { profilePhoto, updateProfilePhoto } = useUserStore();
  const { t, isRtl } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = user?.name || userName || 'User';
  const displayEmail = user?.email || userEmail || '';

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 256;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          updateProfilePhoto(compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const menuItems = [
    { label: t.nav.myProfile || 'Dashboard & Profile', href: '/account', icon: LayoutDashboard },
    { label: t.courses.myCourses || 'My Courses', href: '/courses', icon: GraduationCap },
    { label: t.nav.allTools || 'Tools Directory', href: '/tools', icon: Wrench },
    { label: t.userDashboard.favoritesTitle || 'My Favorites', href: '/favorites', icon: Star },
    { label: t.userDashboard.historyTitle || 'Activity History', href: '/history', icon: Clock },
    { label: t.userDashboard.downloadsTitle || 'Downloads', href: '/downloads', icon: Download },
    { label: t.userDashboard.notificationsTitle || 'Notifications', href: '/notifications', icon: Bell },
    { label: t.nav.settings || 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden File Input for Avatar Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Profile Trigger Button (Visible, Polished, High Contrast) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border-2 border-brand-500/30 hover:border-brand-500 transition-all text-slate-800 dark:text-slate-100 font-bold text-xs shadow-md shadow-brand-500/5 focus:outline-hidden active:scale-95"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open User Profile Menu"
      >
        <div className="relative shrink-0">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Avatar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border-2 border-brand-500 shadow-xs"
            />
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-linear-to-tr from-brand-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
        </div>

        <div className="hidden sm:flex flex-col items-start min-w-0 text-left">
          <span className="max-w-[110px] truncate text-xs font-black text-slate-900 dark:text-white leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] text-brand-600 dark:text-brand-400 font-bold leading-none">
            {isAdmin ? 'Super Admin' : 'Pro Member'}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div
          className={`absolute mt-2 w-72 max-w-[calc(100vw-20px)] rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isRtl ? 'left-0' : 'right-0'
          }`}
        >
          {/* User Info Header with 1-Click Photo Upload */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-linear-to-br from-slate-50 to-brand-50/30 dark:from-slate-800/60 dark:to-brand-950/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative group shrink-0">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Avatar"
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-brand-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center text-base font-black shadow-md">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 text-white rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  title="Upload Profile Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{displayEmail}</p>

                <div className="mt-1 flex items-center gap-1.5">
                  {isAdmin ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black border border-purple-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      <span>SUPER ADMIN</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-black border border-brand-500/20">
                      <Sparkles className="w-3 h-3" />
                      <span>PRO MEMBER</span>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] font-bold text-brand-600 hover:underline inline-flex items-center gap-0.5"
                  >
                    <Camera className="w-2.5 h-2.5" />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <div className="py-2 px-1.5 space-y-0.5 max-h-[340px] overflow-y-auto">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}

            {/* Admin Control Center Link if Admin */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-black text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors border border-purple-200/60 dark:border-purple-800/60 mt-1"
              >
                <ShieldCheck className="w-4 h-4 shrink-0 text-purple-600 dark:text-purple-400" />
                <span>{t.nav.admin || 'Admin Control Center'}</span>
              </Link>
            )}
          </div>

          {/* Logout Section */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>{t.nav.logout || 'Log Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
