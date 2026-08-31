'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useTheme } from '@/components/layout/ThemeContext';
import { useI18n } from '@/lib/i18n/i18n-context';
import {
  Settings,
  Languages,
  Sun,
  Moon,
  Laptop,
  Bell,
  ShieldCheck,
  Database,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    if (confirm('Clear local preferences and cached data?')) {
      localStorage.removeItem('nexora_history');
      localStorage.removeItem('nexora_downloads');
      setCacheCleared(true);
      setTimeout(() => setCacheCleared(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0">
      <Breadcrumbs items={[{ label: t.nav.settings }]} />

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.nav.settings}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {t.settings.localStorageNotice}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Selection */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.selectLanguage}</h3>
              <p className="text-[11px] text-slate-500">Instant app-wide localization</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {[
              { id: 'en', label: 'English', native: 'English' },
              { id: 'ur', label: 'Urdu', native: 'اردو' },
              { id: 'ar', label: 'Arabic', native: 'العربية' },
              { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id as any)}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                  language === lang.id
                    ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                }`}
              >
                <p className="text-sm">{lang.native}</p>
                <p className="text-[10px] opacity-75 font-normal">{lang.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Mode */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-500 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.themeMode}</h3>
              <p className="text-[11px] text-slate-500">Personalize lighting mode</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center space-y-1.5 transition-all ${
                theme === 'light'
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Sun className="w-4 h-4 mx-auto" />
              <p>{t.settings.lightTheme}</p>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center space-y-1.5 transition-all ${
                theme === 'dark'
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Moon className="w-4 h-4 mx-auto" />
              <p>{t.settings.darkTheme}</p>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center space-y-1.5 transition-all ${
                theme === 'system'
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Laptop className="w-4 h-4 mx-auto" />
              <p>{t.settings.systemTheme}</p>
            </button>
          </div>
        </div>

        {/* Local Storage & Cache */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.settings.dataStorage}</h3>
                <p className="text-[11px] text-slate-500">Manage device local storage and cached files</p>
              </div>
            </div>

            <button
              onClick={handleClearCache}
              className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              {t.settings.clearCache}
            </button>
          </div>

          {cacheCleared && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {t.settings.cacheCleared}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
