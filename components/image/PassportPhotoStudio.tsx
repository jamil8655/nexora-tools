'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Upload,
  Download,
  Image as ImageIcon,
  Sliders,
  RefreshCw,
  Eye,
  Check,
  Zap,
  Layers,
  Palette,
  Printer,
  Grid,
  Crop,
  Type,
  User,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';

interface PassportPreset {
  id: string;
  name: string;
  country: string;
  widthCm: number;
  heightCm: number;
  widthPx: number;
  heightPx: number;
  aspect: number;
}

const PASSPORT_PRESETS: PassportPreset[] = [
  {
    id: 'in-passport',
    name: 'India Passport / Govt Exam',
    country: '🇮🇳 India',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 413,
    heightPx: 531,
    aspect: 3.5 / 4.5,
  },
  {
    id: 'us-visa',
    name: 'US Visa / Green Card (2x2")',
    country: '🇺🇸 USA',
    widthCm: 5.1,
    heightCm: 5.1,
    widthPx: 600,
    heightPx: 600,
    aspect: 1,
  },
  {
    id: 'schengen-visa',
    name: 'Schengen / UK / Europe Visa',
    country: '🇪🇺 Europe / UK',
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 413,
    heightPx: 531,
    aspect: 3.5 / 4.5,
  },
  {
    id: 'gulf-visa',
    name: 'UAE / Saudi / Gulf Visa',
    country: '🇦🇪 Gulf / UAE',
    widthCm: 4.0,
    heightCm: 6.0,
    widthPx: 472,
    heightPx: 708,
    aspect: 4 / 6,
  },
];

export function PassportPhotoStudio() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resultSrc, setResultSrc] = useState<string | null>(null);
  const [printSheetSrc, setPrintSheetSrc] = useState<string | null>(null);

  // Settings
  const [tolerance, setTolerance] = useState<number>(35);
  const [bgColor, setBgColor] = useState<string>('#ffffff'); // Default official white
  const [selectedPreset, setSelectedPreset] = useState<string>('in-passport');
  const [addNameDate, setAddNameDate] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>('YOUR NAME');
  const [photoDate, setPhotoDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [printLayout, setPrintLayout] = useState<'single' | 'grid-6' | 'grid-8' | 'grid-a4'>('single');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setResultSrc(null);
      setPrintSheetSrc(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setResultSrc(null);
      setPrintSheetSrc(null);
    }
  };

  // Generate Single Cutout Passport Photo
  const processPassportPhoto = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const preset = PASSPORT_PRESETS.find((p) => p.id === selectedPreset) || PASSPORT_PRESETS[0];

      // 1. First crop into standard passport aspect ratio centered on face
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = preset.widthPx;
      canvas.height = preset.heightPx;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const targetAspect = preset.aspect;

      let srcW = img.naturalWidth;
      let srcH = img.naturalHeight;
      let srcX = 0;
      let srcY = 0;

      if (imgAspect > targetAspect) {
        // Image is wider than passport
        srcW = img.naturalHeight * targetAspect;
        srcX = (img.naturalWidth - srcW) / 2;
      } else {
        // Image is taller than passport (top-bias for head)
        srcH = img.naturalWidth / targetAspect;
        srcY = (img.naturalHeight - srcH) * 0.15;
      }

      ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, canvas.width, canvas.height);

      // 2. Perform AI / Color Distance Background Cutout
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample corners
      const sampleCorners = [
        [data[0], data[1], data[2]],
        [data[(canvas.width - 1) * 4], data[(canvas.width - 1) * 4 + 1], data[(canvas.width - 1) * 4 + 2]],
      ];

      const avgBgR = Math.round((sampleCorners[0][0] + sampleCorners[1][0]) / 2);
      const avgBgG = Math.round((sampleCorners[0][1] + sampleCorners[1][1]) / 2);
      const avgBgB = Math.round((sampleCorners[0][2] + sampleCorners[1][2]) / 2);

      const thresh = tolerance * 2.6;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dist = Math.sqrt(
          (r - avgBgR) * (r - avgBgR) +
          (g - avgBgG) * (g - avgBgG) +
          (b - avgBgB) * (b - avgBgB)
        );

        if (dist < thresh) {
          data[i + 3] = 0;
        } else if (dist < thresh + 20) {
          const alpha = (dist - thresh) / 20;
          data[i + 3] = Math.round(alpha * 255);
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // 3. Composite with Selected Solid Backdrop (White, Blue, Red, etc.)
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      const finalCtx = finalCanvas.getContext('2d');

      if (finalCtx) {
        if (bgColor !== 'transparent') {
          finalCtx.fillStyle = bgColor;
          finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        }

        finalCtx.drawImage(canvas, 0, 0);

        // 4. Add Name & Date of Photo Stamp if enabled (For UPSC, SSC, Govt exams)
        if (addNameDate) {
          const stripHeight = Math.round(finalCanvas.height * 0.14);
          finalCtx.fillStyle = '#ffffff';
          finalCtx.fillRect(0, finalCanvas.height - stripHeight, finalCanvas.width, stripHeight);
          finalCtx.fillStyle = '#000000';
          finalCtx.font = 'bold 16px sans-serif';
          finalCtx.textAlign = 'center';
          finalCtx.fillText(candidateName.toUpperCase(), finalCanvas.width / 2, finalCanvas.height - stripHeight + 20);
          finalCtx.font = 'bold 14px sans-serif';
          finalCtx.fillText(`DOP: ${photoDate}`, finalCanvas.width / 2, finalCanvas.height - 8);
        }

        // Add 1px subtle photo border
        finalCtx.strokeStyle = '#cbd5e1';
        finalCtx.lineWidth = 2;
        finalCtx.strokeRect(0, 0, finalCanvas.width, finalCanvas.height);

        const singleDataUrl = finalCanvas.toDataURL('image/jpeg', 0.95);
        setResultSrc(singleDataUrl);

        // 5. Generate Multi-Photo Print Sheets
        generatePrintSheet(finalCanvas);
        setIsProcessing(false);
      }
    };
  };

  // Generate 4x6" or A4 Print Grid Sheet
  const generatePrintSheet = (singlePhotoCanvas: HTMLCanvasElement) => {
    // 4x6 inch canvas at 300 DPI = 1200 x 1800 px
    const sheet4x6 = document.createElement('canvas');
    sheet4x6.width = 1800;
    sheet4x6.height = 1200;
    const ctx = sheet4x6.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, sheet4x6.width, sheet4x6.height);

    const photoW = singlePhotoCanvas.width;
    const photoH = singlePhotoCanvas.height;

    // 8 Photos Grid on 4x6" Sheet (2 rows x 4 cols)
    const startX = 60;
    const startY = 50;
    const gapX = 30;
    const gapY = 40;

    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        const x = startX + c * (photoW + gapX);
        const y = startY + r * (photoH + gapY);
        ctx.drawImage(singlePhotoCanvas, x, y, photoW, photoH);

        // Cutting guides
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, photoW, photoH);
      }
    }

    setPrintSheetSrc(sheet4x6.toDataURL('image/jpeg', 0.95));
  };

  useEffect(() => {
    if (imageSrc) {
      processPassportPhoto();
    }
  }, [tolerance, bgColor, selectedPreset, addNameDate, candidateName, photoDate]);

  const handleDownloadSingle = () => {
    if (!resultSrc) return;
    const byteString = atob(resultSrc.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });
    const name = (imageFile?.name || 'photo').replace(/\.[^/.]+$/, '');
    downloadSingleFile(blob, `${name}_passport_photo.jpg`);
  };

  const handleDownloadPrintSheet = () => {
    if (!printSheetSrc) return;
    const byteString = atob(printSheetSrc.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });
    const name = (imageFile?.name || 'photo').replace(/\.[^/.]+$/, '');
    downloadSingleFile(blob, `${name}_4x6_print_sheet_8photos.jpg`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span>Official Passport Size Photo & Background Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Passport Photo Maker & Background Color Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Convert any normal selfie or portrait into an official White/Blue background Passport Photo (3.5x4.5cm, 2x2") and create 8-Photo 4x6" Printable Grid Sheets.
        </p>
      </div>

      {/* Upload Dropzone */}
      {!imageSrc ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('passport-upload')?.click()}
          className="p-12 sm:p-16 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-4 hover:border-brand-500 transition-all cursor-pointer"
        >
          <input
            id="passport-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-16 h-16 rounded-3xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-md">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-base">
              Select or Drop Your Portrait / Selfie
            </h3>
            <p className="text-xs text-slate-500">100% In-Browser Privacy • Zero Cloud Storage</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Settings */}
          <div className="lg:col-span-5 space-y-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-600" />
              <span>Passport Photo Customization</span>
            </h3>

            {/* 1. Country / Dimension Preset */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Country & Dimension Preset:</label>
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              >
                {PASSPORT_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.country} - {p.name} ({p.widthCm}x{p.heightCm} cm)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Background Color */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Official Background Color:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '#ffffff', label: 'White (Official)', icon: '⚪' },
                  { id: '#0284c7', label: 'Passport Blue', icon: '🔵' },
                  { id: '#0ea5e9', label: 'Sky Blue', icon: '🔹' },
                  { id: '#dc2626', label: 'Studio Red', icon: '🔴' },
                  { id: '#94a3b8', label: 'Light Gray', icon: '◽' },
                  { id: 'transparent', label: 'Transparent PNG', icon: '🏁' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBgColor(b.id)}
                    className={`p-2 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      bgColor === b.id
                        ? 'bg-brand-50 dark:bg-brand-950 border-brand-500 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{b.icon}</span>
                    <span className="text-[10px]">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AI Cutout Sensitivity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>AI Background Removal Tolerance:</span>
                <span className="font-mono text-brand-600">{tolerance}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={tolerance}
                onChange={(e) => setTolerance(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
            </div>

            {/* 4. Name & Date of Photo (Govt Exam Format) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addNameDate}
                  onChange={(e) => setAddNameDate(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <span>Add Name & Date Strip (Govt Exam Format)</span>
              </label>

              {addNameDate && (
                <div className="space-y-2 pt-1 animate-in fade-in">
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Candidate Name"
                    className="w-full px-3 py-2 text-xs font-bold uppercase rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                  <input
                    type="date"
                    value={photoDate}
                    onChange={(e) => setPhotoDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Download Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadSingle}
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Single Passport Photo (HD)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPrintSheet}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-extrabold text-xs sm:text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Download 8-Photo 4x6" Printable Sheet</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setImageSrc(null);
                  setResultSrc(null);
                }}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-center block pt-1"
              >
                Upload Another Photo
              </button>
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Single Passport Photo Preview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-center">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-900 dark:text-white">
                <span>Single Passport Photo Preview (3.5x4.5 cm)</span>
                <span className="text-emerald-600 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" /> 300 DPI Official
                </span>
              </div>

              <div className="w-48 h-64 mx-auto rounded-xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                {resultSrc ? (
                  <img src={resultSrc} alt="Passport Preview" className="w-full h-full object-cover" />
                ) : (
                  <RefreshCw className="w-6 h-6 text-brand-600 animate-spin" />
                )}
              </div>
            </div>

            {/* 2. 8-Photo Print Grid Sheet Preview */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-extrabold text-slate-900 dark:text-white">
                <span className="flex items-center gap-1.5">
                  <Grid className="w-4 h-4 text-brand-600" />
                  <span>8-Photos on 4x6" Ready-to-Print Sheet</span>
                </span>
                <span className="text-slate-400 text-[11px]">Standard Studio Paper</span>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 aspect-[3/2] bg-slate-100 dark:bg-slate-950 p-2 flex items-center justify-center">
                {printSheetSrc ? (
                  <img src={printSheetSrc} alt="Print Sheet Preview" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <RefreshCw className="w-6 h-6 text-brand-600 animate-spin" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
