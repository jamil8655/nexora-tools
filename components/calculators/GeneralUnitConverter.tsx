'use client';

import React, { useState } from 'react';
import {
  UNIT_CATEGORIES,
  UNITS_DATA,
  convertGeneralUnit,
  UnitCategory,
} from '@/lib/units/unit-converter';
import { Scale, ArrowRightLeft, Copy, Check } from 'lucide-react';

export function GeneralUnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [inputValue, setInputValue] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const categoryUnits = UNITS_DATA[category];

  // Auto update from/to units when category changes
  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const units = UNITS_DATA[newCat];
    if (units.length >= 2) {
      setFromUnit(units[0].id);
      setToUnit(units[1].id);
    }
  };

  const outputValue = convertGeneralUnit(category, fromUnit, toUnit, inputValue);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputValue.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              category === cat.id
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Conversion Dual Input Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
          {/* From */}
          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              From
            </label>
            <input
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
            >
              {categoryUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 shadow-sm transition-transform active:rotate-180"
              title="Swap units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* To */}
          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              To (Result)
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={
                  isNaN(outputValue)
                    ? '0'
                    : parseFloat(outputValue.toFixed(6)).toString()
                }
                className="w-full px-4 py-3 pr-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-lg font-bold text-brand-600 dark:text-brand-400 font-mono"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-brand-600"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100"
            >
              {categoryUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Calculation Formula Display */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 font-mono text-center">
          {inputValue} {categoryUnits.find((u) => u.id === fromUnit)?.symbol} ={' '}
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {isNaN(outputValue) ? '0' : parseFloat(outputValue.toFixed(6)).toString()}
          </span>{' '}
          {categoryUnits.find((u) => u.id === toUnit)?.symbol}
        </div>
      </div>
    </div>
  );
}
