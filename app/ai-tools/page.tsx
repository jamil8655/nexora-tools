'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { AiStudio } from '@/components/ai/AiStudio';
import { Brain, Cpu, Lock } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

const AI_PAGE_LOCALES = {
  en: {
    badge: 'Neural NLP & Smart Document Intelligence',
    title: 'AI Document & Text Intelligence Studio',
    desc: 'Summarize long documents, extract structured key takeaways, rephrase for impact, and fix grammar and style errors with zero data tracking.',
  },
  ur: {
    badge: 'نیورل لینگویج اور اسمارٹ ڈاکومنٹ اسٹوڈیو',
    title: 'اے آئی ڈاکومنٹ اور ٹیکسٹ اسسٹنٹ',
    desc: 'طویل دستاویزات کا خلاصہ بنائیں، اہم نکات نکالیں، لہجہ تبدیل کریں، اور گرامر درست کریں۔',
  },
  ar: {
    badge: 'معالجة اللغة والذكاء الاصطناعي للمستندات',
    title: 'استوديو الذكاء الاصطناعي للمستندات والنصوص',
    desc: 'تلخيص المستندات الطويلة، استخراج النقاط الأساسية، إعادة الصياغة الاحترافية، وتصحيح القواعد.',
  },
  hi: {
    badge: 'न्यूरल लैंग्वेज और स्मार्ट डॉक्यूमेंट इंटेलिजेंस',
    title: 'AI डॉक्यूमेंट और टेक्स्ट इंटेलिजेंस स्टूडियो',
    desc: 'लंबे दस्तावेजों का सारांश बनाएं, मुख्य बिंदु निकालें, पेशेवर भाषा में बदलें और व्याकरण की त्रुटियां ठीक करें।',
  },
};

export default function AiToolsPage() {
  const { language } = useI18n();
  const loc = AI_PAGE_LOCALES[language as keyof typeof AI_PAGE_LOCALES] || AI_PAGE_LOCALES.en;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'AI Workspace', href: '/workflows' }, { label: loc.title }]} />

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
          <Brain className="w-3.5 h-3.5" />
          <span>{loc.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center justify-center gap-2.5">
          <Brain className="w-8 h-8 text-brand-600 dark:text-brand-400" />
          <span>{loc.title}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {loc.desc}
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        <AiStudio />
      </div>
    </div>
  );
}
