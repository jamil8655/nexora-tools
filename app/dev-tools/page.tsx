'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { JsonStudio } from '@/components/dev/JsonStudio';
import { Base64Studio } from '@/components/dev/Base64Studio';
import { TimestampStudio } from '@/components/dev/TimestampStudio';
import { ColorStudio } from '@/components/dev/ColorStudio';
import { Code2, FileCode, Clock, Palette } from 'lucide-react';

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState<'json' | 'base64' | 'timestamp' | 'color'>('json');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Developer & Web Utilities' }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Developer & Web Utilities Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Essential tools for developers: JSON validator and beautifier, Base64 encoder/decoder, Unix Epoch timestamp converter, and color model switcher.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'json', label: 'JSON Formatter', icon: Code2 },
            { id: 'base64', label: 'Base64 Encoder', icon: FileCode },
            { id: 'timestamp', label: 'Unix Timestamp', icon: Clock },
            { id: 'color', label: 'Color Studio', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
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
        {activeTab === 'json' && <JsonStudio />}
        {activeTab === 'base64' && <Base64Studio />}
        {activeTab === 'timestamp' && <TimestampStudio />}
        {activeTab === 'color' && <ColorStudio />}
      </div>
    </div>
  );
}
