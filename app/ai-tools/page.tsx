'use client';

import React from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { AiStudio } from '@/components/ai/AiStudio';
import { Sparkles, Brain, Lock } from 'lucide-react';

export default function AiToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'AI Workspace' }]} />

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini & Smart Heuristic Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          AI Document & Text Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Summarize long documents, extract structured key takeaways, rephrase for impact, and fix grammar and style errors.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        <AiStudio />
      </div>
    </div>
  );
}
