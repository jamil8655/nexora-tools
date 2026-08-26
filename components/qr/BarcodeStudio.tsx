'use client';

import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Barcode, Download } from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';

export function BarcodeStudio() {
  const [format, setFormat] = useState<string>('CODE128');
  const [data, setData] = useState<string>('DOCUOMNI9988');
  const [lineColor, setLineColor] = useState<string>('#000000');
  const [height, setHeight] = useState<number>(80);
  const [displayValue, setDisplayValue] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setErrorMsg(null);
    if (canvasRef.current && data) {
      try {
        JsBarcode(canvasRef.current, data, {
          format: format as any,
          lineColor: lineColor,
          height: height,
          displayValue: displayValue,
          fontSize: 14,
          margin: 10,
          background: '#ffffff',
        });
      } catch (err: any) {
        setErrorMsg(`Invalid data format for ${format}. Please check input.`);
      }
    }
  }, [format, data, lineColor, height, displayValue]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((blob) => {
      if (blob) downloadSingleFile(blob, `barcode-${data}.png`);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Controls */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Barcode Format / Symbology</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-bold"
          >
            <option value="CODE128">Code 128 (Standard alphanumeric)</option>
            <option value="EAN13">EAN-13 (13 Digits)</option>
            <option value="UPC">UPC-A (12 Digits)</option>
            <option value="CODE39">Code 39</option>
            <option value="ITF14">ITF-14</option>
            <option value="MSI">MSI</option>
            <option value="pharmacode">Pharmacode</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Barcode Content</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter barcode string"
            className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-mono"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Height (px)</label>
            <input
              type="number"
              min="30"
              max="200"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || 80)}
              className="w-full px-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Color</label>
            <input
              type="color"
              value={lineColor}
              onChange={(e) => setLineColor(e.target.value)}
              className="w-full h-9 rounded-xl cursor-pointer bg-white border border-slate-300 p-0.5"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={displayValue}
            onChange={(e) => setDisplayValue(e.target.checked)}
            className="rounded text-brand-600 w-4 h-4"
          />
          <span>Show Human Readable Text Below Bars</span>
        </label>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Output Preview */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center justify-center space-y-6 text-center">
        <div className="p-4 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center max-w-full overflow-x-auto">
          <canvas ref={canvasRef} />
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download High-Res Barcode (PNG)</span>
        </button>
      </div>
    </div>
  );
}
