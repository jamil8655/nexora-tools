'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useTheme } from '@/components/layout/ThemeContext';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Language } from '@/lib/i18n/translations';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  User,
  ShieldCheck,
  Languages,
  Key,
  Trash2,
  Sparkles,
  LogIn,
  LogOut,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { clearHistory } from '@/lib/storage/file-store';
import { purgeAllLocalData } from '@/lib/storage/indexeddb-store';

export default function AccountPage() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useI18n();
  const [apiKey, setApiKey] = useState<string>('');
  const [savedMsg, setSavedMsg] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('nexora_ai_key') || '';
    setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    localStorage.setItem('nexora_ai_key', apiKey);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleClearAllData = async () => {
    if (confirm('Are you sure you want to clear all local history, stored files, and cached preferences?')) {
      clearHistory();
      await purgeAllLocalData();
      localStorage.clear();
      alert('All local data cleared successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 min-w-0 overflow-x-hidden">
      <Breadcrumbs items={[{ label: 'User Account & Preferences' }]} />

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Account & Workspace Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          All 75+ tools work 100% free without login. Sign in with Firebase to sync preferences or access administrative controls.
        </p>
      </div>

      <div className="space-y-6 min-w-0">
        {/* Profile Card */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0">
              {isAuthenticated ? (user?.name?.charAt(0).toUpperCase() || 'U') : <User className="w-6 h-6" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 truncate">
                  {isAuthenticated ? (user?.name || 'Authenticated User') : 'Guest User (Public Mode)'}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  isAdmin
                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                    : isAuthenticated
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  {isAdmin ? 'ADMINISTRATOR' : isAuthenticated ? 'FIREBASE AUTH' : 'FREE PUBLIC'}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {isAuthenticated ? (user?.email || 'Connected to Firebase') : 'All 75+ tools remain open and unrestricted for all users.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/20 active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>
        </div>

        {/* Appearance & Language */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            Interface & Language Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Color Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode (Default)</option>
                <option value="system">Follow System</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Language (RTL Supported)
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value="en">English (LTR)</option>
                <option value="ur">اردو (Urdu - RTL)</option>
                <option value="ar">العربية (Arabic - RTL)</option>
                <option value="hi">हिन्दी (Hindi - LTR)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Key Configuration */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Personal Gemini AI Key (Optional)
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Provide your Google Gemini API key to enable high-speed document summaries, rewriting, and Q&A. The key is stored securely in your local browser memory only.
          </p>

          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Gemini API key..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shrink-0 shadow-xs"
            >
              {savedMsg ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </div>

        {/* Privacy & Storage Clear */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            Local Data & Device Storage
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All files are processed 100% locally on your device. You can purge all cached temporary files and history at any time.
          </p>

          <button
            type="button"
            onClick={handleClearAllData}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge All Local Device Storage</span>
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
