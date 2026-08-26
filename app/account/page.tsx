'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useTheme } from '@/components/layout/ThemeContext';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Language } from '@/lib/i18n/translations';
import {
  User,
  ShieldCheck,
  Moon,
  Sun,
  Languages,
  Key,
  Trash2,
  CheckCircle2,
  HardDrive,
  Sparkles,
} from 'lucide-react';
import { clearHistory } from '@/lib/storage/file-store';

export default function AccountPage() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useI18n();
  const [apiKey, setApiKey] = useState<string>('');
  const [savedMsg, setSavedMsg] = useState<boolean>(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('nexora_ai_key') || '';
    setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    localStorage.setItem('nexora_ai_key', apiKey);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleClearAllData = () => {
    if (confirm('Are you sure you want to clear all local history, favorites, and cached preferences?')) {
      clearHistory();
      localStorage.clear();
      alert('All local storage cleared successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'User Account & Preferences' }]} />

      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Account & Privacy Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your interface appearance, language, AI keys, and local browser workspace
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Guest User</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Free Unlimited
              </span>
            </div>
            <p className="text-xs text-slate-400">
              No account required. All files are processed locally on your device.
            </p>
          </div>
        </div>

        {/* Appearance & Language */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Interface Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Color Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
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
                className="w-full px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
              >
                <option value="en">English (LTR)</option>
                <option value="ar">العربية (Arabic - RTL)</option>
                <option value="ur">اردو (Urdu - RTL)</option>
                <option value="hi">हिन्दी (Hindi - LTR)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Key Configuration */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-brand-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Personal AI API Key
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Provide your Google Gemini API key to enable direct high-speed document summaries, rewriting, and Q&A. The key is stored securely inside your local browser memory only.
          </p>

          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Gemini API key..."
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono"
            />
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shrink-0"
            >
              {savedMsg ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </div>

        {/* Privacy & Data Management */}
        <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
            <Trash2 className="w-4 h-4" />
            <h3 className="text-sm font-bold">Clear Local Workspace & Cache</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Wipe all locally stored conversion history, pinned favorite tools, and temporary buffers from your browser.
          </p>
          <button
            type="button"
            onClick={handleClearAllData}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
          >
            Wipe All Local Workspace Data
          </button>
        </div>
      </div>
    </div>
  );
}
