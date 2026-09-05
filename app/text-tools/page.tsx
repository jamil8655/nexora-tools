'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { TextStudio } from '@/components/text/TextStudio';
import { TextDiffViewer } from '@/components/text/TextDiffViewer';
import { Type, GitCompare } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

const TEXT_PAGE_LOCALES = {
  en: {
    title: 'Text & Writing Utility Studio',
    desc: 'Analyze word count, convert letter cases, deduplicate lists, format and clean text, or compare differences side-by-side.',
    tabs: {
      editor: 'Word Counter & Case Studio',
      diff: 'Text Compare & Diff Checker',
    },
  },
  ur: {
    title: 'ٹیکسٹ اور تحریری یوٹیلٹیز اسٹوڈیو',
    desc: 'الفاظ کی گنتی، کیس کنورٹر، ڈپلیکیٹ لائنز ہٹائیں، ٹیکسٹ صاف کریں، اور دو تحریروں کا موازنہ کریں۔',
    tabs: {
      editor: 'ورڈ کاؤنٹر اور کیس اسٹوڈیو',
      diff: 'ٹیکسٹ کا موازنہ (Diff Checker)',
    },
  },
  ar: {
    title: 'استوديو أدوات النصوص والكتابة',
    desc: 'إحصائيات الكلمات والأحرف، تحويل حالة الأحرف، إزالة التكرارات، تنظيف النصوص، ومقارنة الفروق بين النصوص.',
    tabs: {
      editor: 'عداد الكلمات وتنسيق النصوص',
      diff: 'مقارنة النصوص وفحص الفروق',
    },
  },
  hi: {
    title: 'टेक्स्ट और लेखन यूटिलिटी स्टूडियो',
    desc: 'शब्द गणना, केस रूपांतरण, डुप्लिकेट पंक्तियों को हटाना, टेक्स्ट क्लीनर, और दो टेक्स्ट की तुलना (डिफ चेकर)।',
    tabs: {
      editor: 'वर्ड काउंटर और केस स्टूडियो',
      diff: 'टेक्स्ट तुलना और डिफ चेकर',
    },
  },
};

export default function TextToolsPage() {
  const { language } = useI18n();
  const loc = TEXT_PAGE_LOCALES[language as keyof typeof TEXT_PAGE_LOCALES] || TEXT_PAGE_LOCALES.en;

  const [activeTab, setActiveTab] = useState<'editor' | 'diff'>('editor');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: loc.title }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center justify-center gap-2.5">
          <Type className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>{loc.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {loc.desc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'editor'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>{loc.tabs.editor}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('diff')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'diff'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>{loc.tabs.diff}</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'editor' ? <TextStudio /> : <TextDiffViewer />}
      </div>
    </div>
  );
}
