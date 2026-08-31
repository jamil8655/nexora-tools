'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Key, AlertCircle, ArrowLeft, RefreshCw, LogOut } from 'lucide-react';
import { useAuth } from './auth-context';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isAdmin, isLoading, loginAdmin, logout } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Prevent UI flash during auth initialization
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
        <RefreshCw className="w-8 h-8 text-brand-600 animate-spin mx-auto" />
        <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
          Verifying System Credentials...
        </h3>
        <p className="text-xs text-slate-400">Checking cryptographically signed session tokens</p>
      </div>
    );
  }

  // 2. If not a verified administrator, render Admin Authentication Challenge
  if (!isAdmin) {
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg('');
      if (!passcode.trim()) {
        setErrorMsg('Please enter your administrative master passkey.');
        return;
      }

      setIsSubmitting(true);
      const success = await loginAdmin(passcode);
      setIsSubmitting(false);

      if (!success) {
        setErrorMsg('Invalid administrative credentials. Access restricted.');
      } else {
        setPasscode('');
      }
    };

    return (
      <div className="max-w-md mx-auto my-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner border border-rose-200/60 dark:border-rose-900">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Administrator Access Required
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            This section contains internal system controls, live server telemetry, and audit logs. Please enter the master admin passkey to authenticate.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Admin Master Passkey:
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode (e.g. nexora@2026)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            <span>Authenticate Admin Session</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin View: Render children with Admin Bar
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300">Verified Administrative Mode Active</span>
        </div>

        <button
          type="button"
          onClick={logout}
          className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Mode</span>
        </button>
      </div>

      {children}
    </div>
  );
}
