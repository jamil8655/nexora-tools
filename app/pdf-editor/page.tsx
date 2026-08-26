'use client';

import React from 'react';
import { VisualPdfEditor } from '@/components/pdf/VisualPdfEditor';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { PenTool } from 'lucide-react';

export default function PdfEditorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'PDF Tools', href: '/tools?cat=pdf' }, { label: 'Visual PDF Editor' }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Visual PDF Editor & Annotator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Add custom text, freeform drawing, highlighters, digital signatures, stamps, and shapes to your document.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        <VisualPdfEditor />
      </div>
    </div>
  );
}
