'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Zap, Lock, Heart, Workflow, Terminal } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 text-slate-600 mt-20 transition-colors">
      {/* Top Banner Guarantees */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">500 MB Large File Engine</p>
              <p className="text-[11px] text-slate-500">Process massive documents & media smoothly.</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Client-Side Privacy</p>
              <p className="text-[11px] text-slate-500">Files never touch external servers or get stored.</p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Zero Account Needed</p>
              <p className="text-[11px] text-slate-500">Unlimited free conversion, editing, and downloading.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-brand-500/20">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-black text-slate-900">
                NEXORA<span className="text-brand-600 text-xs ml-1 font-mono uppercase font-black">PRO</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The high-performance suite for multi-tool workflows, PDF editing, 4K video downloading, passport studio photos, audio extraction, and privacy utilities.
            </p>
          </div>

          {/* PDF & Document */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              PDF & Documents
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link href="/tools/pdf-to-docx" className="hover:text-brand-600 transition-colors">
                  PDF to Word (OCR)
                </Link>
              </li>
              <li>
                <Link href="/pdf-editor" className="hover:text-brand-600 transition-colors">
                  PDF Editor Pro
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-merge" className="hover:text-brand-600 transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-compress" className="hover:text-brand-600 transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-to-image" className="hover:text-brand-600 transition-colors">
                  PDF to 300 DPI Images
                </Link>
              </li>
            </ul>
          </div>

          {/* AI & Media */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              AI & Media Studio
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link href="/tools/passport-photo-maker" className="hover:text-brand-600 transition-colors font-bold text-brand-600">
                  📸 Passport Photo Studio
                </Link>
              </li>
              <li>
                <Link href="/tools/background-remover" className="hover:text-brand-600 transition-colors">
                  ✨ Background Cutout
                </Link>
              </li>
              <li>
                <Link href="/tools/audio-cutter" className="hover:text-brand-600 transition-colors">
                  ✂️ Audio Cutter & Trimmer
                </Link>
              </li>
              <li>
                <Link href="/tools/video-to-mp3" className="hover:text-brand-600 transition-colors">
                  🎵 Video to MP3
                </Link>
              </li>
              <li>
                <Link href="/tools/media-downloader" className="hover:text-brand-600 transition-colors">
                  🎬 4K Video Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Workflows & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Workflows & Privacy
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link href="/workflows" className="hover:text-brand-600 transition-colors font-bold text-purple-600">
                  ⚡ Smart Workflows
                </Link>
              </li>
              <li>
                <Link href="/privacy-center" className="hover:text-brand-600 transition-colors font-bold text-emerald-600">
                  🛡️ Privacy & EXIF Center
                </Link>
              </li>
              <li>
                <Link href="/dev-tools" className="hover:text-brand-600 transition-colors">
                  💻 Developer Toolkit
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-brand-600 transition-colors">
                  🗄️ My Files & History
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-brand-600 transition-colors">
                  ⚡ Developer REST API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NEXORA Tools Pro. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Client-side, privacy-first productivity platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
