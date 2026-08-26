'use client';

import React, { useState } from 'react';
import { Percent, Ratio, Calendar, Sparkles } from 'lucide-react';

export function MathCalculators() {
  const [activeTab, setActiveTab] = useState<'percent' | 'ratio' | 'age'>('percent');

  // Percentage states
  const [numA, setNumA] = useState<number>(25);
  const [numB, setNumB] = useState<number>(200);

  // Ratio states (A:B = C:D)
  const [ratioA, setRatioA] = useState<number>(1920);
  const [ratioB, setRatioB] = useState<number>(1080);
  const [ratioC, setRatioC] = useState<number>(1280);

  // Age states
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');

  // Math computations
  const percentResult = (numA / (numB || 1)) * 100;
  const percentOfResult = (numA / 100) * numB;
  const ratioD = (ratioB * ratioC) / (ratioA || 1);

  const calculateAge = () => {
    if (!birthDate) return { years: 0, months: 0, days: 0 };
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  };

  const age = calculateAge();

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('percent')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'percent'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Percentage Calculator
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ratio')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ratio'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Proportion & Ratio (A:B = C:D)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('age')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'age'
              ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Age & Date Difference
        </button>
      </div>

      {/* 1. PERCENTAGE */}
      {activeTab === 'percent' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
              <span>What is</span>
              <input
                type="number"
                value={numA}
                onChange={(e) => setNumA(parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 font-mono text-center"
              />
              <span>% of</span>
              <input
                type="number"
                value={numB}
                onChange={(e) => setNumB(parseFloat(e.target.value) || 0)}
                className="w-28 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 font-mono text-center"
              />
              <span>?</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xl font-black text-brand-600 dark:text-brand-400 font-mono">
              = {percentOfResult.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* 2. RATIO */}
      {activeTab === 'ratio' && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-200">
            <input
              type="number"
              value={ratioA}
              onChange={(e) => setRatioA(parseFloat(e.target.value) || 0)}
              className="w-24 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 font-mono text-center"
            />
            <span>:</span>
            <input
              type="number"
              value={ratioB}
              onChange={(e) => setRatioB(parseFloat(e.target.value) || 0)}
              className="w-24 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 font-mono text-center"
            />
            <span>=</span>
            <input
              type="number"
              value={ratioC}
              onChange={(e) => setRatioC(parseFloat(e.target.value) || 0)}
              className="w-24 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 font-mono text-center"
            />
            <span>:</span>
            <span className="text-xl font-extrabold text-brand-600 font-mono">
              {Math.round(ratioD)}
            </span>
          </div>
        </div>
      )}

      {/* 3. AGE */}
      {activeTab === 'age' && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 font-bold"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs text-slate-400 font-bold">Years</span>
              <div className="text-2xl font-black text-brand-600">{age.years}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs text-slate-400 font-bold">Months</span>
              <div className="text-2xl font-black text-emerald-600">{age.months}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs text-slate-400 font-bold">Days</span>
              <div className="text-2xl font-black text-teal-600">{age.days}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
