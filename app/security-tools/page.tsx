'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { HashStudio } from '@/components/security/HashStudio';
import { PasswordStudio } from '@/components/security/PasswordStudio';
import { TextCipherStudio } from '@/components/security/TextCipherStudio';
import { Fingerprint, KeyRound, ShieldCheck, Lock, Key } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

const SEC_PAGE_LOCALES = {
  en: {
    title: 'Security, Cryptography & Privacy Studio',
    desc: 'Military-grade cryptographic tools: SHA checksums, AES-256 text encryption, high-entropy password generator, and cryptographic UUIDs.',
    tabs: {
      hash: 'SHA Hash & Checksums',
      cipher: 'AES-256 Text Cipher',
      password: 'Password Generator',
    },
  },
  ur: {
    title: 'سیکیورٹی اور کرپٹوگرافی اسٹوڈیو',
    desc: 'اعلیٰ سیکیورٹی ٹولز: SHA چیک سم، AES-256 ٹیکسٹ انکرپشن، پاس ورڈ جنریٹر، اور سیکیور کیز۔',
    tabs: {
      hash: 'SHA ہیش اور چیک سم',
      cipher: 'AES-256 ٹیکسٹ انکرپشن',
      password: 'پاس ورڈ جنریٹر',
    },
  },
  ar: {
    title: 'استوديو الأمان والتشفير والخصوصية',
    desc: 'أدوات تشفير متقدمة: بصمة الملفات SHA، تشفير النصوص AES-256، ومولد كلمات المرور الآمنة.',
    tabs: {
      hash: 'تجزئة وبصمة SHA',
      cipher: 'تشفير النصوص AES-256',
      password: 'مولد كلمات المرور',
    },
  },
  hi: {
    title: 'सुरक्षा, क्रिप्टोग्राफी और गोपनीयता स्टूडियो',
    desc: 'उन्नत सुरक्षा टूल्स: SHA चेकसम, AES-256 टेक्स्ट एन्क्रिप्शन, मजबूत पासवर्ड जनरेटर और सुरक्षित कीज़।',
    tabs: {
      hash: 'SHA हैश और चेकसम',
      cipher: 'AES-256 टेक्स्ट सिफर',
      password: 'पासवर्ड जनरेटर',
    },
  },
};

export default function SecurityToolsPage() {
  const { language } = useI18n();
  const loc = SEC_PAGE_LOCALES[language as keyof typeof SEC_PAGE_LOCALES] || SEC_PAGE_LOCALES.en;

  const [activeTab, setActiveTab] = useState<'hash' | 'cipher' | 'password'>('hash');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: loc.title }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center justify-center gap-2.5">
          <ShieldCheck className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>{loc.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {loc.desc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('hash')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'hash'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>{loc.tabs.hash}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cipher')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'cipher'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{loc.tabs.cipher}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'password'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{loc.tabs.password}</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'hash' && <HashStudio />}
        {activeTab === 'cipher' && <TextCipherStudio />}
        {activeTab === 'password' && <PasswordStudio />}
      </div>
    </div>
  );
}
