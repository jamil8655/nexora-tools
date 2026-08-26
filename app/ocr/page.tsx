'use client';

import React from 'react';
import { OcrStudio } from '@/components/ocr/OcrStudio';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { ScanText, Languages, ShieldCheck, Zap } from 'lucide-react';

export default function OcrPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'OCR & Text', href: '/tools?cat=ocr' }, { label: 'OCR Text Recognition Studio' }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Optical Character Recognition (OCR) Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Extract text instantly from scanned documents, receipts, screenshots, and photos with support for English, Arabic, Urdu, Hindi, Spanish, French, and German.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        <OcrStudio />
      </div>
    </div>
  );
}
