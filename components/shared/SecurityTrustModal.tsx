'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Cpu, EyeOff, ServerOff, CheckCircle2, X } from 'lucide-react';

export function SecurityTrustModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trust Trigger Badge */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold transition-all shadow-xs"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Verified Client-Side Privacy</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in-0 duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Security & Privacy Protocol</h3>
                  <p className="text-xs text-slate-500">Bank-Grade In-Memory WebAssembly Sandbox</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ServerOff className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Zero Server Uploads</p>
                  <p className="text-[11px] text-slate-500">Your documents, pictures, and audio are parsed locally inside your browser and never leave your device.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Hardware-Accelerated Wasm Engine</p>
                  <p className="text-[11px] text-slate-500">Executes high-speed conversions, OCR recognition, and compression in local volatile RAM.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <EyeOff className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Zero Tracking & No File Retention</p>
                  <p className="text-[11px] text-slate-500">No database stores your data. Closing or refreshing your browser immediately wipes all memory buffer allocations.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Close & Continue Safely
            </button>
          </div>
        </div>
      )}
    </>
  );
}
