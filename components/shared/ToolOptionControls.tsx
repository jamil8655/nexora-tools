'use client';

import React from 'react';
import { ToolDefinition } from '@/lib/types';
import {
  Sliders,
  Zap,
  Layers,
  RotateCw,
  Stamp,
  Hash,
  Scissors,
  FileImage,
  Sparkles,
  Maximize2,
  Lock,
  Unlock,
  Settings2,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { formatBytes } from '@/lib/utils/formatters';
import { useI18n } from '@/lib/i18n/i18n-context';

interface ToolOptionControlsProps {
  tool: ToolDefinition;
  files: File[];
  options: Record<string, any>;
  onOptionsChange: (newOptions: Record<string, any>) => void;
}

export function ToolOptionControls({
  tool,
  files,
  options,
  onOptionsChange,
}: ToolOptionControlsProps) {
  const { t, language, isRtl } = useI18n();

  const updateOption = (key: string, val: any) => {
    onOptionsChange({ ...options, [key]: val });
  };

  const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
  const isImageCompress = tool.id.includes('compress') && tool.category === 'image';
  const isImageResize = tool.id.includes('resize') && tool.category === 'image';
  const isImageConvert = (tool.id.includes('to-') || tool.id.includes('convert')) && tool.category === 'image';
  const isPdfCompress = tool.id.includes('compress') && tool.category === 'pdf';
  const isPdfSplit = (tool.id.includes('split') || tool.id.includes('extract')) && tool.category === 'pdf';
  const isPdfRotate = tool.id.includes('rotate') && tool.category === 'pdf';
  const isPdfWatermark = tool.id.includes('watermark');
  const isPdfPageNumbers = tool.id.includes('page-numbers') || tool.id.includes('number');
  const isImageToPdf = tool.id.includes('image-to-pdf') || tool.id.includes('images-to-pdf');

  // Multilingual Strings
  const L = {
    settingsTitle: {
      en: 'Tool Customization & Quality Settings',
      ur: 'ٹول سیٹنگز اور کوالٹی کنٹرولز',
      ar: 'إعدادات الجودة وتخصيص الأداة',
      hi: 'टूल कस्टमाइज़ेशन और क्वालिटी सेटिंग्स',
    }[language] || 'Tool Customization & Quality Settings',
    selectedFiles: {
      en: `Selected: ${files.length} file(s) (${formatBytes(totalBytes)})`,
      ur: `منتخب شدہ: ${files.length} فائلیں (${formatBytes(totalBytes)})`,
      ar: `المحدد: ${files.length} ملف (${formatBytes(totalBytes)})`,
      hi: `चयनित: ${files.length} फ़ाइलें (${formatBytes(totalBytes)})`,
    }[language] || `Selected: ${files.length} file(s)`,
    targetSizePreset: {
      en: '🎯 Target File Size Preset (For Govt/Job/Passport Portals):',
      ur: '🎯 مطلوبہ فائل سائز چنیں (سرکاری و پاسپورٹ پورٹل کے لیے):',
      ar: '🎯 الحجم المستهدف المحدد مسبقاً (للبوابات الرسمية والوظائف):',
      hi: '🎯 लक्षित फ़ाइल साइज़ प्रीसेट (सरकारी/नौकरी/पासपोर्ट पोर्टल हेतु):',
    }[language] || 'Target File Size Preset:',
    customSlider: {
      en: 'Custom Slider',
      ur: 'اپنی مرضی کا سلائیڈر',
      ar: 'شريط تمرير مخصص',
      hi: 'कस्टम स्लाइडर',
    }[language] || 'Custom Slider',
    compressionStrength: {
      en: 'Compression Strength:',
      ur: 'کمپریشن کی طاقت:',
      ar: 'قوة الضغط:',
      hi: 'कंप्रेशन की तीव्रता:',
    }[language] || 'Compression Strength:',
    compressed: {
      en: 'Compressed',
      ur: 'کمپریسڈ',
      ar: 'مضغوط',
      hi: 'कंप्रेस किया गया',
    }[language] || 'Compressed',
    quality: {
      en: 'Quality',
      ur: 'کوالٹی',
      ar: 'الجودة',
      hi: 'क्वालिटी',
    }[language] || 'Quality',
    maxCompression: {
      en: 'Maximum Compression (Smaller KB)',
      ur: 'زیادہ سے زیادہ کمپریشن (چھوٹا سائز)',
      ar: 'أقصى ضغط (حجم أصغر)',
      hi: 'अधिकतम कंप्रेशन (छोटा KB साइज़)',
    }[language] || 'Max Compression',
    balanced: {
      en: 'Balanced (Recommended)',
      ur: 'متوازن (تجویز کردہ)',
      ar: 'متوازن (موصى به)',
      hi: 'संतुलित (सुझाया गया)',
    }[language] || 'Balanced',
    highQuality: {
      en: 'High Quality (Preserve detail)',
      ur: 'اعلیٰ کوالٹی (تفصیلات محفوظ)',
      ar: 'جودة عالية (الحفاظ على التفاصيل)',
      hi: 'उच्च गुणवत्ता (डिटेल्स सुरक्षित)',
    }[language] || 'High Quality',
    outputFormat: {
      en: 'Output Format:',
      ur: 'آؤٹ پٹ فارمیٹ:',
      ar: 'صيغة الإخراج:',
      hi: 'आउटपुट फॉर्मेट:',
    }[language] || 'Output Format:',
    resolutionScale: {
      en: 'Resolution Scale:',
      ur: 'ریزولوشن اسکیل:',
      ar: 'مقياس الدقة:',
      hi: 'रिज़ॉल्यूशन स्केल:',
    }[language] || 'Resolution Scale:',
    pdfCompressPreset: {
      en: '⚡ PDF Compression Preset:',
      ur: '⚡ پی ڈی ایف کمپریشن پریسیٹ:',
      ar: '⚡ الإعداد المسبق لضغط PDF:',
      hi: '⚡ PDF कंप्रेशन प्रीसेट:',
    }[language] || 'PDF Compression Preset:',
    extremeCompress: {
      en: 'Extreme (< 200 KB)',
      ur: 'انتہائی کمپریشن (< 200 KB)',
      ar: 'ضغط فائق (< 200 KB)',
      hi: 'अत्यधिक कंप्रेशन (< 200 KB)',
    }[language] || 'Extreme',
    extremeDesc: {
      en: 'Heavy image downsampling, highest compression',
      ur: 'تصاویر کا سائز نمایاں کم، سب سے چھوٹا فائل سائز',
      ar: 'تقليل عالي للصور، أعلى نسبة ضغط',
      hi: 'इमेज का साइज़ अत्यधिक कम, सबसे छोटा फ़ाइल साइज़',
    }[language] || 'Heavy compression',
    recDesc: {
      en: 'Optimal balance between sharpness and small size',
      ur: 'صفائی اور چھوٹے سائز کے درمیان بہترین توازن',
      ar: 'توازن مثالي بين وضوح النصوص وصغر الحجم',
      hi: 'स्पष्टता और छोटे आकार का बेहतरीन संतुलन',
    }[language] || 'Optimal balance',
    lowDesc: {
      en: 'Preserves high-resolution images and vectors',
      ur: 'ہائی ریزولوشن تصاویر اور گرافکس کو مکمل محفوظ رکھے',
      ar: 'يحافظ على الصور والرسومات عالية الدقة',
      hi: 'उच्च रिज़ॉल्यूशन छवियों और ग्राफ़िक्स को सुरक्षित रखें',
    }[language] || 'Preserves high-res',
    targetLimit: {
      en: 'Target Size Limit:',
      ur: 'زیادہ سے زیادہ سائز کی حد:',
      ar: 'الحد الأقصى للحجم:',
      hi: 'अधिकतम साइज़ सीमा:',
    }[language] || 'Target Size Limit:',
    autoFit: {
      en: 'Automatic (Best fit)',
      ur: 'خودکار (بہترین فٹ)',
      ar: 'تلقائي (أفضل ملاءمة)',
      hi: 'स्वचालित (सर्वश्रेष्ठ)',
    }[language] || 'Auto',
    splitMethod: {
      en: 'Split Method:',
      ur: 'تقسیم کا طریقہ:',
      ar: 'طريقة التقسيم:',
      hi: 'विभाजन का तरीका:',
    }[language] || 'Split Method:',
    splitAll: {
      en: 'Split All Pages',
      ur: 'تمام صفحات الگ کریں',
      ar: 'تقسيم جميع الصفحات',
      hi: 'सभी पन्ने अलग करें',
    }[language] || 'Split All',
    pageRange: {
      en: 'Specific Page Range',
      ur: 'مخصوص صفحہ نمبرز',
      ar: 'نطاق صفحات محدد',
      hi: 'विशिष्ट पेज रेंज',
    }[language] || 'Page Range',
    oddEven: {
      en: 'Extract Odd / Even',
      ur: 'طاق اور جفت صفحات نکالیں',
      ar: 'استخراج الفردي / الزوجي',
      hi: 'सम / विषम पेज निकालें',
    }[language] || 'Odd / Even',
    rotationAngle: {
      en: 'Rotation Angle:',
      ur: 'گھمانے کا زاویہ:',
      ar: 'زاوية التدوير:',
      hi: 'रोटेशन एंगल:',
    }[language] || 'Rotation Angle:',
    watermarkText: {
      en: 'Watermark Text:',
      ur: 'واٹر مارک کا متن:',
      ar: 'نص العلامة المائية:',
      hi: 'वॉटरमार्क टेक्स्ट:',
    }[language] || 'Watermark Text:',
    opacity: {
      en: 'Opacity:',
      ur: 'شفافیت (Opacity):',
      ar: 'الشفافية:',
      hi: 'पारदर्शिता (Opacity):',
    }[language] || 'Opacity:',
    pagePosition: {
      en: 'Position:',
      ur: 'مقام:',
      ar: 'الموضع:',
      hi: 'स्थान:',
    }[language] || 'Position:',
    numberFormat: {
      en: 'Numbering Format:',
      ur: 'نمبرنگ فارمیٹ:',
      ar: 'تنسيق الترقيم:',
      hi: 'नंबरिंग फॉर्मेट:',
    }[language] || 'Number Format:',
    orientation: {
      en: 'Page Orientation:',
      ur: 'صفحے کا رخ:',
      ar: 'اتجاه الصفحة:',
      hi: 'पेज ओरिएंटेशन:',
    }[language] || 'Orientation:',
    margin: {
      en: 'Page Margin:',
      ur: 'صفحے کا حاشیہ (Margin):',
      ar: 'هوامش الصفحة:',
      hi: 'पेज मार्जिन:',
    }[language] || 'Margin:',
    pageSize: {
      en: 'Document Page Size:',
      ur: 'دستاویز کے صفحے کا سائز:',
      ar: 'حجم صفحة المستند:',
      hi: 'दस्तावेज़ पेज साइज़:',
    }[language] || 'Page Size:',
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-white">
          <Settings2 className="w-4 h-4 text-brand-500" />
          <span>{L.settingsTitle}</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          {L.selectedFiles}
        </span>
      </div>

      {/* 1. IMAGE COMPRESSION CONTROLS */}
      {isImageCompress && (
        <div className="space-y-4">
          {/* Quick Target Size Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {L.targetSizePreset}
              </label>
              <span className="text-xs font-mono font-bold text-brand-600">
                {options.targetKb ? `< ${options.targetKb} KB` : L.customSlider}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[20, 50, 100, 200, 500, 1000].map((kb) => {
                const isSelected = options.targetKb === kb;
                return (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => {
                      updateOption('targetKb', isSelected ? null : kb);
                      if (!isSelected) {
                        updateOption('quality', Math.max(0.2, Math.min(0.9, (kb * 1024) / totalBytes)));
                      }
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {kb >= 1000 ? `${kb / 1000} MB` : `${kb} KB`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compression Level Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{L.compressionStrength}</span>
              <span className="font-mono text-brand-600 dark:text-brand-400 font-extrabold text-sm">
                {Math.round((1 - (options.quality ?? 0.75)) * 100)}% {L.compressed} ({Math.round((options.quality ?? 0.75) * 100)}% {L.quality})
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.95}
              step={0.05}
              value={options.quality ?? 0.75}
              onChange={(e) => {
                updateOption('quality', parseFloat(e.target.value));
                updateOption('targetKb', null);
              }}
              className="w-full accent-brand-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{L.maxCompression}</span>
              <span>{L.balanced}</span>
              <span>{L.highQuality}</span>
            </div>
          </div>

          {/* Format & Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.outputFormat}</label>
              <select
                value={options.outputFormat || 'image/jpeg'}
                onChange={(e) => updateOption('outputFormat', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="image/jpeg">JPEG / JPG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.resolutionScale}</label>
              <select
                value={options.scale || '1'}
                onChange={(e) => updateOption('scale', parseFloat(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="1">100%</option>
                <option value="0.75">75%</option>
                <option value="0.5">50%</option>
                <option value="0.25">25%</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 2. PDF COMPRESSION CONTROLS */}
      {isPdfCompress && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {L.pdfCompressPreset}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'extreme', label: L.extremeCompress, desc: L.extremeDesc },
                { id: 'medium', label: L.balanced, desc: L.recDesc },
                { id: 'low', label: L.highQuality, desc: L.lowDesc },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => updateOption('level', lvl.id)}
                  className={`p-3 rounded-2xl border text-start transition-all ${
                    (options.level || 'medium') === lvl.id
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">{lvl.label}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{lvl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.targetLimit}</label>
              <select
                value={options.targetSizeLimit || 'auto'}
                onChange={(e) => updateOption('targetSizeLimit', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="auto">{L.autoFit}</option>
                <option value="100kb">&lt; 100 KB</option>
                <option value="200kb">&lt; 200 KB</option>
                <option value="500kb">&lt; 500 KB</option>
                <option value="1mb">&lt; 1 MB</option>
                <option value="2mb">&lt; 2 MB</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">DPI Downsampling:</label>
              <select
                value={options.dpi || '150'}
                onChange={(e) => updateOption('dpi', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="72">72 DPI</option>
                <option value="150">150 DPI</option>
                <option value="300">300 DPI</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. PDF SPLIT & EXTRACT CONTROLS */}
      {isPdfSplit && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.splitMethod}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', label: L.splitAll },
                { id: 'range', label: L.pageRange },
                { id: 'odd-even', label: L.oddEven },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => updateOption('splitMode', m.id)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border ${
                    (options.splitMode || 'all') === m.id
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {options.splitMode === 'range' && (
            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {L.pageRange} (e.g. 1-3, 5, 8-10):
              </label>
              <input
                type="text"
                placeholder="1-3, 5"
                value={options.pageRange || ''}
                onChange={(e) => updateOption('pageRange', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
              />
            </div>
          )}
        </div>
      )}

      {/* 4. PDF ROTATE CONTROLS */}
      {isPdfRotate && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.rotationAngle}</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: '90', label: '90°' },
              { id: '180', label: '180°' },
              { id: '270', label: '270°' },
            ].map((deg) => (
              <button
                key={deg.id}
                type="button"
                onClick={() => updateOption('angle', deg.id)}
                className={`py-2 px-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 ${
                  (options.angle || '90') === deg.id
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{deg.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. PDF WATERMARK CONTROLS */}
      {isPdfWatermark && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.watermarkText}</label>
              <input
                type="text"
                value={options.text || 'CONFIDENTIAL'}
                onChange={(e) => updateOption('text', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {L.opacity} ({Math.round((options.opacity ?? 0.3) * 100)}%):
              </label>
              <input
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={options.opacity ?? 0.3}
                onChange={(e) => updateOption('opacity', parseFloat(e.target.value))}
                className="w-full accent-rose-600 mt-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. PDF PAGE NUMBERS CONTROLS */}
      {isPdfPageNumbers && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.pagePosition}</label>
              <select
                value={options.position || 'bottom-center'}
                onChange={(e) => updateOption('position', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.numberFormat}</label>
              <select
                value={options.format || 'Page {n} of {total}'}
                onChange={(e) => updateOption('format', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
              >
                <option value="Page {n} of {total}">Page 1 of 10</option>
                <option value="{n} / {total}">1 / 10</option>
                <option value="{n}">1, 2, 3...</option>
                <option value="Page {n}">Page 1</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 7. IMAGE TO PDF CONTROLS */}
      {isImageToPdf && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.orientation}</label>
            <select
              value={options.orientation || 'portrait'}
              onChange={(e) => updateOption('orientation', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.margin}</label>
            <select
              value={options.margin || 'none'}
              onChange={(e) => updateOption('margin', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="none">No Margin</option>
              <option value="small">Small Margin</option>
              <option value="large">Big Margin</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{L.pageSize}</label>
            <select
              value={options.pageSize || 'a4'}
              onChange={(e) => updateOption('pageSize', e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            >
              <option value="a4">A4 Standard</option>
              <option value="letter">US Letter</option>
              <option value="fit">Fit to Image</option>
            </select>
          </div>
        </div>
      )}

      {/* Fallback Custom Tool Options if tool defined them */}
      {tool.options && tool.options.length > 0 && !isImageCompress && !isPdfCompress && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {tool.options.map((opt) => (
            <div key={opt.id} className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {opt.label}
              </label>
              {opt.type === 'select' && (
                <select
                  value={options[opt.id] || opt.defaultValue}
                  onChange={(e) => updateOption(opt.id, e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                >
                  {opt.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              )}
              {opt.type === 'text' && (
                <input
                  type="text"
                  value={options[opt.id] ?? opt.defaultValue ?? ''}
                  placeholder={opt.placeholder}
                  onChange={(e) => updateOption(opt.id, e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
