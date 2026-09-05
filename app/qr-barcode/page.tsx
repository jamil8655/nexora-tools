'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { QrGenerator } from '@/components/qr/QrGenerator';
import { BarcodeStudio } from '@/components/qr/BarcodeStudio';
import { QrCode, Barcode } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

const QR_PAGE_LOCALES = {
  en: {
    title: 'QR Code & Barcode Studio',
    desc: 'Generate custom styled QR codes for URLs, Wi-Fi credentials, and contacts, or create retail and inventory barcodes with instant vector/image download.',
    tabs: {
      qr: 'QR Code Generator',
      barcode: 'Barcode Generator',
    },
  },
  ur: {
    title: 'کیو آر کوڈ اور بارکوڈ اسٹوڈیو',
    desc: 'لنکس، وائی فائی، اور روابط کے لیے اسٹائلش QR کوڈز بنائیں، یا شاپنگ اور انوینٹری بارکوڈز تیار کریں۔',
    tabs: {
      qr: 'کیو آر کوڈ جنریٹر',
      barcode: 'بارکوڈ جنریٹر',
    },
  },
  ar: {
    title: 'استوديو رموز الاستجابة السريعة والباركود',
    desc: 'إنشاء رموز QR مخصصة للروابط وشبكات الواي فاي وجهات الاتصال، وتوليد باركود المنتجات والمخازن.',
    tabs: {
      qr: 'مولد رموز QR',
      barcode: 'مولد الباركود',
    },
  },
  hi: {
    title: 'क्यूआर कोड और बारकोड स्टूडियो',
    desc: 'यूआरएल, वाई-फाई और संपर्कों के लिए कस्टम स्टाइल वाले क्यूआर कोड बनाएं, या इन्वेंट्री और रिटेल बारकोड जनरेट करें।',
    tabs: {
      qr: 'QR कोड जनरेटर',
      barcode: 'बारकोड जनरेटर',
    },
  },
};

export default function QrBarcodePage() {
  const { language } = useI18n();
  const loc = QR_PAGE_LOCALES[language as keyof typeof QR_PAGE_LOCALES] || QR_PAGE_LOCALES.en;

  const [activeTab, setActiveTab] = useState<'qr' | 'barcode'>('qr');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Utilities', href: '/tools' }, { label: loc.title }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center justify-center gap-2.5">
          <QrCode className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>{loc.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {loc.desc}
        </p>
      </div>

      {/* Selector */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'qr'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>{loc.tabs.qr}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('barcode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              activeTab === 'barcode'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>{loc.tabs.barcode}</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'qr' ? <QrGenerator /> : <BarcodeStudio />}
      </div>
    </div>
  );
}
