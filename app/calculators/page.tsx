'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { StorageUnitConverter } from '@/components/calculators/StorageUnitConverter';
import { BandwidthCalculator } from '@/components/calculators/BandwidthCalculator';
import { DpiCalculator } from '@/components/calculators/DpiCalculator';
import { Binary, Activity, Printer } from 'lucide-react';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'storage' | 'bandwidth' | 'dpi'>('storage');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Utilities', href: '/tools' }, { label: 'Digital Calculators Suite' }]} />

      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Digital Utility & Storage Calculators
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Convert storage units, calculate file download / upload transfer times, and compute print DPI and resolution.
        </p>
      </div>

      {/* Calculator Navigation Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {[
            { id: 'storage', label: 'Storage Unit Converter (MB/KB)', icon: Binary },
            { id: 'bandwidth', label: 'Download & Upload Time', icon: Activity },
            { id: 'dpi', label: 'DPI & Print Resolution', icon: Printer },
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

      {/* Main Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'storage' && <StorageUnitConverter />}
        {activeTab === 'bandwidth' && <BandwidthCalculator />}
        {activeTab === 'dpi' && <DpiCalculator />}
      </div>
    </div>
  );
}
