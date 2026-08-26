'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { QrGenerator } from '@/components/qr/QrGenerator';
import { BarcodeStudio } from '@/components/qr/BarcodeStudio';
import { QrCode, Barcode } from 'lucide-react';

export default function QrBarcodePage() {
  const [activeTab, setActiveTab] = useState<'qr' | 'barcode'>('qr');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Utilities', href: '/tools' }, { label: 'QR & Barcode Studio' }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          QR Code & Barcode Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Generate custom styled QR codes for URLs, Wi-Fi credentials, and contacts, or create retail and inventory barcodes.
        </p>
      </div>

      {/* Selector */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'qr'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QR Code Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('barcode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'barcode'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>Barcode Generator</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'qr' ? <QrGenerator /> : <BarcodeStudio />}
      </div>
    </div>
  );
}
