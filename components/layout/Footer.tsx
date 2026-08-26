'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Lock, Zap, FileText } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { siteConfig } from '@/config/site';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-slate-50">
                NEXORA<span className="text-brand-500 text-xs ml-1">TOOLS</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{siteConfig.stats.clientSideRatio} Client WASM Privacy</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>{siteConfig.stats.totalTools} Active Utilities</span>
              </div>
            </div>
          </div>

          {/* PDF & Document */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              PDF & Documents
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/tools/pdf-merge" className="hover:text-brand-600 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-split" className="hover:text-brand-600 transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-compress" className="hover:text-brand-600 transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-brand-600 transition-colors">
                  Image to PDF
                </Link>
              </li>
              <li>
                <Link href="/pdf-editor" className="hover:text-brand-600 transition-colors">
                  Visual PDF Editor
                </Link>
              </li>
              <li>
                <Link href="/tools/docx-to-pdf" className="hover:text-brand-600 transition-colors">
                  Word to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Text & Developer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Text & Developer
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/text-tools" className="hover:text-brand-600 transition-colors">
                  Word Counter & Case Studio
                </Link>
              </li>
              <li>
                <Link href="/dev-tools" className="hover:text-brand-600 transition-colors">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link href="/dev-tools" className="hover:text-brand-600 transition-colors">
                  Base64 & Timestamp Tools
                </Link>
              </li>
              <li>
                <Link href="/security-tools" className="hover:text-brand-600 transition-colors">
                  SHA-256 Hash & Password Generator
                </Link>
              </li>
              <li>
                <Link href="/ocr" className="hover:text-brand-600 transition-colors">
                  Multi-Language OCR Center
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="hover:text-brand-600 transition-colors">
                  AI Document Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* System & Workspace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Workspace & System
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-brand-600 transition-colors">
                  Storage & Unit Calculators
                </Link>
              </li>
              <li>
                <Link href="/qr-barcode" className="hover:text-brand-600 transition-colors">
                  QR & Barcode Studio
                </Link>
              </li>
              <li>
                <Link href="/batch" className="hover:text-brand-600 transition-colors">
                  Batch Processing Queue
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-brand-600 transition-colors">
                  Processing History
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-600 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-500">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>TLS 1.3 / AES-256 Encrypted • Zero Server Retention</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
