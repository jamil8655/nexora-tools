'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  GraduationCap,
  HelpCircle,
  Mail,
  FileText,
  CreditCard,
  AlertCircle,
  BookOpen,
  Globe2,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

export function Footer() {
  const { t, language, setLanguage, isRtl } = useI18n();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 mt-20 transition-colors">
      {/* Top Banner Guarantees */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-800 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">500 MB Client-Side Engine</p>
              <p className="text-[11px] text-slate-500">Transform massive documents & media smoothly.</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">100% In-Browser Privacy</p>
              <p className="text-[11px] text-slate-500">Files never touch external servers or get stored.</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Free & Open Learning Paths</p>
              <p className="text-[11px] text-slate-500">Browse curriculums & lessons with zero forced locks.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white">
                NEXORA<span className="text-brand-600 text-xs ml-1 font-mono uppercase font-black">PRO</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>

            {/* Language Quick Switcher */}
            <div className="flex items-center gap-2 pt-2">
              <Globe2 className="w-4 h-4 text-slate-400" />
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'ur', label: 'اردو' },
                  { id: 'ar', label: 'العربية' },
                  { id: 'hi', label: 'हिन्दी' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLanguage(l.id as any)}
                    className={`px-2 py-0.5 rounded-md text-[11px] transition-all ${
                      language === l.id
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 1: Master Courses & Learning */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
              {t.footer.courses}
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/courses/modern-fullstack-web-mastery" className="hover:text-brand-600 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses/python-ai-prompt-engineering-mastery" className="hover:text-brand-600 transition-colors">
                  Python & AI Agents
                </Link>
              </li>
              <li>
                <Link href="/courses/document-pdf-automation-mastery" className="hover:text-brand-600 transition-colors">
                  Document Engineering
                </Link>
              </li>
              <li>
                <Link href="/courses/cybersecurity-privacy-engineering" className="hover:text-brand-600 transition-colors">
                  Cyber Security
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-brand-600 transition-colors font-bold text-brand-600 dark:text-brand-400">
                  ⚡ {t.quiz?.title || 'Knowledge Quizzes'}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
                  {t.common.viewAll} Courses →
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2: Tools & Utilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              {t.footer.tools}
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/tools/pdf-to-docx" className="hover:text-brand-600 transition-colors">
                  PDF to Word (OCR)
                </Link>
              </li>
              <li>
                <Link href="/pdf-editor" className="hover:text-brand-600 transition-colors">
                  PDF Editor Studio
                </Link>
              </li>
              <li>
                <Link href="/image-studio" className="hover:text-brand-600 transition-colors">
                  Image Studio Suite
                </Link>
              </li>
              <li>
                <Link href="/ocr" className="hover:text-brand-600 transition-colors">
                  OCR Image to Text
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">
                  {t.common.viewAll} 75+ Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Information & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-brand-600" />
              {t.footer.helpSupport}
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/about" className="hover:text-brand-600 transition-colors">
                  {t.footer.aboutPlatform}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-600 transition-colors">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-600 transition-colors">
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-600 transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-600 transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-brand-600 transition-colors">
                  {t.footer.refundPolicy}
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-brand-600 transition-colors">
                  {t.footer.userGuidelines}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-brand-600 transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 NEXORA PRO. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.footer.poweredBy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
