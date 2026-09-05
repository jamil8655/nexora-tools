'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { JsonStudio } from '@/components/dev/JsonStudio';
import { Base64Studio } from '@/components/dev/Base64Studio';
import { TimestampStudio } from '@/components/dev/TimestampStudio';
import { ColorStudio } from '@/components/dev/ColorStudio';
import { DeveloperToolkit } from '@/components/dev/DeveloperToolkit';
import { Code2, FileCode, Clock, Palette, Terminal } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

const DEV_PAGE_LOCALES = {
  en: {
    title: 'Developer & Web Utilities Studio',
    desc: 'Essential tools for developers: Regex tester, SQL beautifier, CSV/JSON converter, URL encoder, JSON validator, Base64 encoder/decoder, and Unix Epoch timestamp.',
    tabs: {
      toolkit: 'Pro Code Toolkit',
      json: 'JSON Formatter',
      base64: 'Base64 Encoder',
      timestamp: 'Unix Timestamp',
      color: 'Color Studio',
    },
  },
  ur: {
    title: 'ڈویلپرز اور ویب یوٹیلٹیز اسٹوڈیو',
    desc: 'ڈیولپرز کے لیے لازمی ٹولز: ریجیکس ٹیسٹر، ایس کیو ایل فارمیٹر، CSV/JSON کنورٹر، یو آر ایل اینکوڈر، JSON ویلیڈیٹر، اور بیس64۔',
    tabs: {
      toolkit: 'پرو کوڈ ٹول کٹ',
      json: 'JSON فارمیٹر',
      base64: 'بیس64 اینکوڈر',
      timestamp: 'یونکس ٹائم اسٹیمپ',
      color: 'کلر اسٹوڈیو',
    },
  },
  ar: {
    title: 'استوديو أدوات المطورين والويب',
    desc: 'أدوات أساسية للمطورين: اختبار التعبيرات النمطية Regex، تنسيق SQL، تحويل CSV/JSON، تشفير وفك تشفير الروابط، وBase64.',
    tabs: {
      toolkit: 'حزمة أدوات الأكواد',
      json: 'منسق JSON',
      base64: 'ترميز Base64',
      timestamp: 'الوقت بتوقيت Unix',
      color: 'استوديو الألوان',
    },
  },
  hi: {
    title: 'डेवलपर और वेब यूटिलिटीज स्टूडियो',
    desc: 'डेवलपर्स के लिए आवश्यक टूल्स: रेगेक्स टेस्टर, एसक्यूएल फॉर्मेटर, CSV/JSON कनवर्टर, यूआरएल एनकोडर, JSON वैलिडेटर और बेस64।',
    tabs: {
      toolkit: 'प्रो कोड टूलकिट',
      json: 'JSON फॉर्मेटर',
      base64: 'Base64 एनकोडर',
      timestamp: 'यूनिक्स टाइमस्टैम्प',
      color: 'कलर स्टूडियो',
    },
  },
};

export default function DevToolsPage() {
  const { language } = useI18n();
  const loc = DEV_PAGE_LOCALES[language as keyof typeof DEV_PAGE_LOCALES] || DEV_PAGE_LOCALES.en;

  const [activeTab, setActiveTab] = useState<'toolkit' | 'json' | 'base64' | 'timestamp' | 'color'>('toolkit');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: loc.title }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center justify-center gap-2.5">
          <Terminal className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>{loc.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {loc.desc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'toolkit', label: loc.tabs.toolkit, icon: Terminal },
            { id: 'json', label: loc.tabs.json, icon: Code2 },
            { id: 'base64', label: loc.tabs.base64, icon: FileCode },
            { id: 'timestamp', label: loc.tabs.timestamp, icon: Clock },
            { id: 'color', label: loc.tabs.color, icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'toolkit' && <DeveloperToolkit />}
        {activeTab === 'json' && <JsonStudio />}
        {activeTab === 'base64' && <Base64Studio />}
        {activeTab === 'timestamp' && <TimestampStudio />}
        {activeTab === 'color' && <ColorStudio />}
      </div>
    </div>
  );
}
