'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Lock } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { siteConfig } from '@/config/site';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-slate-50">
                NEXORA<span className="text-brand-500 text-xs ml-1">TOOLS</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* PDF & Document */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              PDF & Documents
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
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
                <Link href="/tools/docx-to-pdf" className="hover:text-brand-600 transition-colors">
                  Word to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Text & Developer */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Text & Developer
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
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
                  SHA-256 & Password Tools
                </Link>
              </li>
              <li>
                <Link href="/ocr" className="hover:text-brand-600 transition-colors">
                  OCR Text Recognition
                </Link>
              </li>
            </ul>
          </div>

          {/* Workspace */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Utilities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
                  User Workspace
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-brand-600 transition-colors">
                  Unit Converters
                </Link>
              </li>
              <li>
                <Link href="/qr-barcode" className="hover:text-brand-600 transition-colors">
                  QR & Barcodes
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-brand-600 transition-colors">
                  Activity History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
