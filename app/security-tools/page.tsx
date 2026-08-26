'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { HashStudio } from '@/components/security/HashStudio';
import { PasswordStudio } from '@/components/security/PasswordStudio';
import { Fingerprint, KeyRound, Lock } from 'lucide-react';

export default function SecurityToolsPage() {
  const [activeTab, setActiveTab] = useState<'hash' | 'password'>('hash');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ label: 'Security & Cryptography' }]} />

      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PrivacyBadge isClientSide={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Security & Cryptography Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Generate cryptographic SHA-256 / SHA-512 hashes, verify file checksums, create secure high-entropy passwords, and calculate UUIDs.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('hash')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'hash'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>SHA Hash & File Checksum</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'password'
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Password Generator & Strength</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
        {activeTab === 'hash' ? <HashStudio /> : <PasswordStudio />}
      </div>
    </div>
  );
}
