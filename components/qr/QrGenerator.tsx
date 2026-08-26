'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, Wifi, Globe, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';

export function QrGenerator() {
  const [type, setType] = useState<'url' | 'wifi' | 'email' | 'phone' | 'vcard' | 'text'>('url');
  const [url, setUrl] = useState<string>('https://docuomni.app');
  const [wifiSsid, setWifiSsid] = useState<string>('MyHomeWiFi');
  const [wifiPass, setWifiPass] = useState<string>('Password123');
  const [wifiSec, setWifiSec] = useState<string>('WPA');
  const [email, setEmail] = useState<string>('contact@example.com');
  const [phone, setPhone] = useState<string>('+1234567890');
  const [text, setText] = useState<string>('Hello from DocuOmni!');
  const [fgColor, setFgColor] = useState<string>('#026fc7');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const getPayload = () => {
    switch (type) {
      case 'url':
        return url.startsWith('http') ? url : `https://${url}`;
      case 'wifi':
        return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`;
      case 'email':
        return `mailto:${email}`;
      case 'phone':
        return `tel:${phone}`;
      case 'text':
        return text;
      default:
        return url;
    }
  };

  useEffect(() => {
    const payload = getPayload();
    QRCode.toDataURL(payload, {
      width: 400,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [type, url, wifiSsid, wifiPass, wifiSec, email, phone, text, fgColor, bgColor]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const byteString = atob(qrDataUrl.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/png' });
    downloadSingleFile(blob, `qrcode-${type}.png`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Configuration Panel */}
      <div className="space-y-6">
        {/* Type Selector Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {[
            { id: 'url', label: 'URL', icon: Globe },
            { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'phone', label: 'Phone', icon: Phone },
            { id: 'text', label: 'Text', icon: MessageSquare },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = type === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-500 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Inputs */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-4">
          {type === 'url' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Website URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Wi-Fi Password</label>
                <input
                  type="password"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          )}

          {type === 'email' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          {type === 'phone' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          {type === 'text' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Plain Text Content</label>
              <textarea
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>
          )}

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">QR Code Color</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-full h-10 rounded-xl cursor-pointer bg-white dark:bg-slate-800 border border-slate-300 p-1"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-xl cursor-pointer bg-white dark:bg-slate-800 border border-slate-300 p-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview and Download Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center justify-center space-y-6 text-center">
        <div className="p-4 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Generated QR Code" className="w-56 h-56 rounded-lg" />
          ) : (
            <div className="w-56 h-56 bg-slate-100 flex items-center justify-center text-slate-400">
              <QrCode className="w-12 h-12" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download High-Res QR Code (PNG)</span>
        </button>
      </div>
    </div>
  );
}
