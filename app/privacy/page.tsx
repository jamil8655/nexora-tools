'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Privacy Guarantee
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 1, 2026</p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {/* Highlight Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <Lock className="w-4 h-4" />
              Core Principle: Zero File Uploads & Zero Server Retention
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              When you convert a PDF, compress an image, or format code on NEXORA PRO, the processing happens 100% locally on your device via in-browser WebAssembly. Your files are never sent over the wire or stored on any server.
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Do NOT Collect</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>We do NOT collect, inspect, or copy your uploaded documents, images, audio, or PDFs.</li>
              <li>We do NOT store your passwords in plain text.</li>
              <li>We do NOT sell, rent, or trade your personal information to data brokers or third parties.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Information Collected for Authentication & Account Features</h3>
            <p>
              If you optionally create an account, we store minimal profile details (email address, full name, profile picture) via Google Firebase Authentication. This information is strictly used to authenticate your session, sync your course progress, and protect your account preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Local Storage & Device Preferences</h3>
            <p>
              We use your browser’s `localStorage` to save your UI preferences (dark/light theme, language selection: English, Urdu, Arabic, Hindi, and bookmarked favorite tools). This data remains on your local machine and can be cleared anytime in Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Your Data Rights & Deletion</h3>
            <p>
              You have the right to inspect, export, or permanently delete your account and all associated Firestore records at any time from your Account Settings.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Have privacy questions?</span>
            <Link href="/contact" className="text-xs font-bold text-brand-600 hover:underline">
              Contact Privacy Officer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
