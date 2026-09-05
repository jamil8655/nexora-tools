'use client';

import React, { useState } from 'react';
import { Percent, Scale, Calendar, ArrowRightLeft, Copy, Check, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';

const MATH_LOCALES = {
  en: {
    tabs: {
      ratio: 'Aspect Ratio & Dimensions',
      percent: 'Percentage & Change',
      date: 'Date & Age Duration',
    },
    aspectRatio: {
      title: 'Aspect Ratio Scaler (W:H)',
      width: 'Width (px)',
      height: 'Height (px)',
      newWidth: 'Target Width (px)',
      newHeight: 'Calculated Height (px)',
      presets: 'Standard Formats',
      preset16_9: '16:9 (HD Video/YouTube)',
      preset9_16: '9:16 (Stories/TikTok/Reels)',
      preset1_1: '1:1 (Square/Instagram)',
      preset4_3: '4:3 (Classic Display)',
      preset21_9: '21:9 (Ultrawide Cinema)',
    },
    percent: {
      calc1Title: 'Percentage of a Number',
      whatIs: 'What is',
      of: '% of',
      calc2Title: 'Percentage Difference & Change',
      from: 'From value',
      to: 'To value',
      change: 'Difference / Change',
    },
    date: {
      birthTitle: 'Age Calculator',
      selectBirth: 'Date of Birth',
      years: 'Years',
      months: 'Months',
      days: 'Days',
      durationTitle: 'Date Interval & Countdown',
      startDate: 'Start Date',
      endDate: 'End Date',
      totalDays: 'Total Days',
    },
  },
  ur: {
    tabs: {
      ratio: 'تناسب اور پیمائش (Aspect Ratio)',
      percent: 'فیصد اور فرق (Percentage)',
      date: 'عمر اور تاریخ کا دورانیہ (Age/Date)',
    },
    aspectRatio: {
      title: 'اسپیکٹ ریشو اسکیلر (W:H)',
      width: 'چوڑائی (px)',
      height: 'اونچائی (px)',
      newWidth: 'مطلوبہ چوڑائی (px)',
      newHeight: 'حساب شدہ اونچائی (px)',
      presets: 'معیاری سائز',
      preset16_9: '16:9 (ایچ ڈی ویڈیو / یوٹیوب)',
      preset9_16: '9:16 (ریلز / ٹک ٹاک)',
      preset1_1: '1:1 (مربع / انسٹاگرام)',
      preset4_3: '4:3 (کلاسک اسکرین)',
      preset21_9: '21:9 (سینما اسکرین)',
    },
    percent: {
      calc1Title: 'عدد کا فیصد نکالیں',
      whatIs: 'کتنا ہے',
      of: '% کا',
      calc2Title: 'فیصد کا فرق اور تبدیلی',
      from: 'ابتدائی قیمت',
      to: 'آخری قیمت',
      change: 'تبدیلی کا فیصد',
    },
    date: {
      birthTitle: 'عمر کا کیلکولیٹر',
      selectBirth: 'تاریخ پیدائش منتخب کریں',
      years: 'سال',
      months: 'مہینے',
      days: 'دن',
      durationTitle: 'تاریخوں کے درمیان دورانیہ',
      startDate: 'شروع کی تاریخ',
      endDate: 'ختم کی تاریخ',
      totalDays: 'کل دن',
    },
  },
  ar: {
    tabs: {
      ratio: 'نسبة الأبعاد والمقاسات',
      percent: 'النسبة المئوية والفرق',
      date: 'حساب العمر والتواريخ',
    },
    aspectRatio: {
      title: 'حاسبة نسبة الأبعاد (العرض:الارتفاع)',
      width: 'العرض (بكسل)',
      height: 'الارتفاع (بكسل)',
      newWidth: 'العرض المستهدف (بكسل)',
      newHeight: 'الارتفاع المحسوب (بكسل)',
      presets: 'المقاسات القياسية',
      preset16_9: '16:9 (فيديو عالي الدقة / يوتيوب)',
      preset9_16: '9:16 (ريلز / تيك توك)',
      preset1_1: '1:1 (مربع / إنستغرام)',
      preset4_3: '4:3 (شاشة تقليدية)',
      preset21_9: '21:9 (شاشة سينمائية عريضة)',
    },
    percent: {
      calc1Title: 'حساب النسبة المئوية من رقم',
      whatIs: 'ما هي قيمة',
      of: '% من',
      calc2Title: 'نسبة التغير والفرق',
      from: 'القيمة الأولى',
      to: 'القيمة الثانية',
      change: 'نسبة التغير',
    },
    date: {
      birthTitle: 'حاسبة العمر الدقيقة',
      selectBirth: 'اختر تاريخ الميلاد',
      years: 'سنوات',
      months: 'أشهر',
      days: 'أيام',
      durationTitle: 'المدة بين تاريخين',
      startDate: 'تاريخ البداية',
      endDate: 'تاريخ النهاية',
      totalDays: 'إجمالي الأيام',
    },
  },
  hi: {
    tabs: {
      ratio: 'आस्पेक्ट रेश्यो और आयाम',
      percent: 'प्रतिशत और अंतर',
      date: 'आयु और दिनांक अवधि',
    },
    aspectRatio: {
      title: 'आस्पेक्ट रेश्यो स्केलर (W:H)',
      width: 'चौड़ाई (px)',
      height: 'ऊंचाई (px)',
      newWidth: 'लक्षित चौड़ाई (px)',
      newHeight: 'परिकलित ऊंचाई (px)',
      presets: 'मानक प्रारूप',
      preset16_9: '16:9 (एचडी वीडियो / यूट्यूब)',
      preset9_16: '9:16 (रील्स / टिकटॉक)',
      preset1_1: '1:1 (वर्गाकार / इंस्टाग्राम)',
      preset4_3: '4:3 (क्लासिक डिस्प्ले)',
      preset21_9: '21:9 (सिनेमा अल्ट्रावाइड)',
    },
    percent: {
      calc1Title: 'संख्या का प्रतिशत निकालें',
      whatIs: 'क्या है',
      of: '% का',
      calc2Title: 'प्रतिशत अंतर और परिवर्तन',
      from: 'प्रारंभिक मान',
      to: 'अंतिम मान',
      change: 'प्रतिशत परिवर्तन',
    },
    date: {
      birthTitle: 'सटीक आयु कैलकुलेटर',
      selectBirth: 'जन्म तिथि चुनें',
      years: 'वर्ष',
      months: 'महीने',
      days: 'दिन',
      durationTitle: 'दो तिथियों के बीच अवधि',
      startDate: 'प्रारंभ तिथि',
      endDate: 'समाप्ति तिथि',
      totalDays: 'कुल दिन',
    },
  },
};

export function MathCalculators() {
  const { language } = useI18n();
  const loc = MATH_LOCALES[language as keyof typeof MATH_LOCALES] || MATH_LOCALES.en;

  const [activeTab, setActiveTab] = useState<'ratio' | 'percent' | 'date'>('ratio');

  // Aspect ratio states
  const [ratioW, setRatioW] = useState<number>(1920);
  const [ratioH, setRatioH] = useState<number>(1080);
  const [targetW, setTargetW] = useState<number>(1280);
  const calculatedH = Math.round((ratioH * targetW) / (ratioW || 1));

  // Percentage states
  const [pctRate, setPctRate] = useState<number>(18);
  const [pctTotal, setPctTotal] = useState<number>(500);
  const pctOfResult = (pctRate / 100) * pctTotal;

  const [valFrom, setValFrom] = useState<number>(100);
  const [valTo, setValTo] = useState<number>(150);
  const pctChange = valFrom !== 0 ? (((valTo - valFrom) / valFrom) * 100).toFixed(2) : '0';

  // Age and date states
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  );

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
    return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    return Math.round(Math.abs(e - s) / (1000 * 60 * 60 * 24));
  };

  const age = calculateAge();
  const totalDays = calculateDuration();

  const applyPreset = (w: number, h: number) => {
    setRatioW(w);
    setRatioH(h);
    setTargetW(w);
  };

  return (
    <div className="space-y-6">
      {/* Mobile-Friendly Sub Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {[
          { id: 'ratio', label: loc.tabs.ratio, icon: Scale },
          { id: 'percent', label: loc.tabs.percent, icon: Percent },
          { id: 'date', label: loc.tabs.date, icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. ASPECT RATIO CALCULATOR */}
      {activeTab === 'ratio' && (
        <div className="space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {loc.aspectRatio.presets}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { label: loc.aspectRatio.preset16_9, w: 1920, h: 1080 },
                { label: loc.aspectRatio.preset9_16, w: 1080, h: 1920 },
                { label: loc.aspectRatio.preset1_1, w: 1080, h: 1080 },
                { label: loc.aspectRatio.preset4_3, w: 1440, h: 1080 },
                { label: loc.aspectRatio.preset21_9, w: 2560, h: 1080 },
              ].map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(p.w, p.h)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                    ratioW === p.w && ratioH === p.h
                      ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-500 text-brand-600 dark:text-brand-400'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {loc.aspectRatio.width}
                </label>
                <input
                  type="number"
                  value={ratioW}
                  onChange={(e) => setRatioW(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {loc.aspectRatio.height}
                </label>
                <input
                  type="number"
                  value={ratioH}
                  onChange={(e) => setRatioH(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {loc.aspectRatio.newWidth}
                </label>
                <input
                  type="number"
                  value={targetW}
                  onChange={(e) => setTargetW(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Live Visual Dimension Result Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 block">{loc.aspectRatio.newHeight}</span>
                <span className="text-3xl font-black text-brand-600 dark:text-brand-400 font-mono">
                  {targetW} × {calculatedH} px
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Aspect Ratio: {(ratioW / (ratioH || 1)).toFixed(2)} : 1
                </span>
              </div>

              {/* Scaled Preview Box */}
              <div className="w-24 h-16 rounded-lg bg-brand-500/10 border-2 border-dashed border-brand-500 flex items-center justify-center text-[10px] font-mono font-bold text-brand-600">
                {targetW}:{calculatedH}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PERCENTAGE CALCULATOR */}
      {activeTab === 'percent' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Percentage of Number */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {loc.percent.calc1Title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500">{loc.percent.whatIs}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={pctRate}
                    onChange={(e) => setPctRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 pr-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500">{loc.percent.of}</label>
                <input
                  type="number"
                  value={pctTotal}
                  onChange={(e) => setPctTotal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold block">Result</span>
              <span className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">
                = {pctOfResult.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Percentage Difference */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {loc.percent.calc2Title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500">{loc.percent.from}</label>
                <input
                  type="number"
                  value={valFrom}
                  onChange={(e) => setValFrom(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500">{loc.percent.to}</label>
                <input
                  type="number"
                  value={valTo}
                  onChange={(e) => setValTo(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-400 font-bold block">{loc.percent.change}</span>
              <span className={`text-2xl font-black font-mono ${Number(pctChange) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {Number(pctChange) >= 0 ? `+${pctChange}%` : `${pctChange}%`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. DATE & AGE DURATION */}
      {activeTab === 'date' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Calculator */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>{loc.date.birthTitle}</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">{loc.date.selectBirth}</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[11px] text-slate-400 font-bold block">{loc.date.years}</span>
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400 font-mono">{age.years}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[11px] text-slate-400 font-bold block">{loc.date.months}</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">{age.months}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="text-[11px] text-slate-400 font-bold block">{loc.date.days}</span>
                <span className="text-2xl font-black text-teal-600 font-mono">{age.days}</span>
              </div>
            </div>
          </div>

          {/* Date Difference */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>{loc.date.durationTitle}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">{loc.date.startDate}</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">{loc.date.endDate}</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold block">{loc.date.totalDays}</span>
                <span className="text-3xl font-black text-brand-600 dark:text-brand-400 font-mono">{totalDays}</span>
                <span className="text-xs text-slate-500 block">≈ {(totalDays / 7).toFixed(1)} Weeks</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
