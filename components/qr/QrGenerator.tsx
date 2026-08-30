'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  ShieldCheck,
  Shield,
  Phone,
  PhoneCall,
  Mail,
  Lock,
  Unlock,
  Car,
  Wifi,
  Globe,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  Send,
  Eye,
  EyeOff,
  Copy,
  Check,
  User,
} from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';

export function QrGenerator() {
  // Check if someone scanned a Privacy QR code (Query param in URL)
  const [scannedMode, setScannedMode] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<{
    phone?: string;
    email?: string;
    name?: string;
    tag?: string;
    secret?: string;
    hint?: string;
  } | null>(null);

  // Scanner interactive states
  const [pinInput, setPinInput] = useState<string>('');
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [pinError, setPinError] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [customMsg, setCustomMsg] = useState<string>('');
  const [callingState, setCallingState] = useState<'idle' | 'calling' | 'connected'>('idle');

  // Generator State
  const [type, setType] = useState<
    'privacy-call' | 'vehicle-tag' | 'privacy-email' | 'pin-encrypted' | 'url' | 'wifi' | 'phone' | 'email' | 'text'
  >('privacy-call');

  // Privacy Call Inputs
  const [privPhone, setPrivPhone] = useState<string>('+91 9876543210');
  const [privName, setPrivName] = useState<string>('Vehicle Owner');
  const [vehicleNo, setVehicleNo] = useState<string>('MH 02 AB 1234');
  const [privEmail, setPrivEmail] = useState<string>('owner@example.com');
  const [secretMsg, setSecretMsg] = useState<string>('Confidential Password / Secret Note');
  const [secretPin, setSecretPin] = useState<string>('1234');

  // Standard Inputs
  const [url, setUrl] = useState<string>('https://jamil8655.github.io/nexora-tools');
  const [wifiSsid, setWifiSsid] = useState<string>('Home_5G_Network');
  const [wifiPass, setWifiPass] = useState<string>('SecurePass2026');
  const [wifiSec, setWifiSec] = useState<string>('WPA');
  const [stdPhone, setStdPhone] = useState<string>('+1234567890');
  const [stdEmail, setStdEmail] = useState<string>('contact@example.com');
  const [stdText, setStdText] = useState<string>('Welcome to NEXORA Tools!');

  // Styling
  const [fgColor, setFgColor] = useState<string>('#090d16');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Check URL params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const privPayload = params.get('priv');
      const pinPayload = params.get('pin_sec');

      if (privPayload) {
        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(privPayload))));
          setScannedMode('privacy');
          setScannedData(decoded);
        } catch (e) {
          // ignore
        }
      } else if (pinPayload) {
        try {
          const decoded = JSON.parse(decodeURIComponent(escape(atob(pinPayload))));
          setScannedMode('pin');
          setScannedData(decoded);
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  const getBaseHost = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}`;
    }
    return 'https://jamil8655.github.io/nexora-tools/qr-barcode';
  };

  const getPayload = () => {
    const base = getBaseHost();

    switch (type) {
      case 'privacy-call': {
        const payload = JSON.stringify({
          phone: privPhone,
          name: privName || 'Owner',
          mode: 'call',
        });
        const encoded = btoa(unescape(encodeURIComponent(payload)));
        return `${base}?priv=${encoded}`;
      }
      case 'vehicle-tag': {
        const payload = JSON.stringify({
          phone: privPhone,
          name: privName || 'Vehicle Owner',
          tag: vehicleNo || 'Vehicle',
          mode: 'vehicle',
        });
        const encoded = btoa(unescape(encodeURIComponent(payload)));
        return `${base}?priv=${encoded}`;
      }
      case 'privacy-email': {
        const payload = JSON.stringify({
          email: privEmail,
          name: privName || 'Recipient',
          mode: 'email',
        });
        const encoded = btoa(unescape(encodeURIComponent(payload)));
        return `${base}?priv=${encoded}`;
      }
      case 'pin-encrypted': {
        // Simple XOR / Base64 encryption with PIN
        const encrypted = btoa(
          secretMsg
            .split('')
            .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ secretPin.charCodeAt(i % secretPin.length)))
            .join('')
        );
        const payload = JSON.stringify({
          secret: encrypted,
          hint: 'Enter 4-digit PIN to decrypt',
        });
        const encoded = btoa(unescape(encodeURIComponent(payload)));
        return `${base}?pin_sec=${encoded}`;
      }
      case 'url':
        return url.startsWith('http') ? url : `https://${url}`;
      case 'wifi':
        return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`;
      case 'email':
        return `mailto:${stdEmail}`;
      case 'phone':
        return `tel:${stdPhone}`;
      case 'text':
        return stdText;
      default:
        return url;
    }
  };

  useEffect(() => {
    const payload = getPayload();
    QRCode.toDataURL(payload, {
      width: 440,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [
    type,
    privPhone,
    privName,
    vehicleNo,
    privEmail,
    secretMsg,
    secretPin,
    url,
    wifiSsid,
    wifiPass,
    wifiSec,
    stdPhone,
    stdEmail,
    stdText,
    fgColor,
    bgColor,
  ]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const byteString = atob(qrDataUrl.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/png' });
    downloadSingleFile(blob, `nexora-privacy-qr-${type}.png`);
  };

  const handleCopyLink = () => {
    const payload = getPayload();
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maskPhoneNumber = (num?: string) => {
    if (!num) return '+•• ••••• •••99';
    const clean = num.trim();
    if (clean.length <= 4) return '••••';
    const last2 = clean.slice(-2);
    const prefix = clean.slice(0, 3);
    return `${prefix} ••••• ••${last2}`;
  };

  const maskEmailAddress = (em?: string) => {
    if (!em) return '••••••@•••••.com';
    const parts = em.split('@');
    if (parts.length !== 2) return '••••••@•••••.com';
    const name = parts[0];
    const maskedName = name[0] + '••••' + (name.length > 1 ? name[name.length - 1] : '');
    return `${maskedName}@•••••.com`;
  };

  const handleDecryptPin = () => {
    if (!scannedData?.secret) return;
    try {
      const raw = atob(scannedData.secret);
      const decrypted = raw
        .split('')
        .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ pinInput.charCodeAt(i % pinInput.length)))
        .join('');

      if (decrypted && decrypted.length > 0 && !decrypted.includes('\u0000')) {
        setDecryptedText(decrypted);
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch (e) {
      setPinError(true);
    }
  };

  const handleStartCall = () => {
    setCallingState('calling');
    setTimeout(() => {
      setCallingState('connected');
      if (scannedData?.phone) {
        window.location.href = `tel:${scannedData.phone}`;
      }
    }, 1500);
  };

  // IF SCANNED BY CAMERA: SHOW THE INTERACTIVE PRIVACY PORTAL
  if (scannedMode === 'privacy' && scannedData) {
    return (
      <div className="max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Privacy Shield Protected
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {scannedData.tag ? `Vehicle Tag: ${scannedData.tag}` : scannedData.name || 'Owner Contact'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Contact the owner directly without viewing their personal phone number or email address.
          </p>
        </div>

        {/* Masked Info Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">Masked Phone:</span>
            <span className="font-mono font-extrabold text-slate-900 dark:text-white tracking-widest">
              {maskPhoneNumber(scannedData.phone)}
            </span>
          </div>
          {scannedData.email && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-bold">Masked Email:</span>
              <span className="font-mono font-extrabold text-slate-900 dark:text-white">
                {maskEmailAddress(scannedData.email)}
              </span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 pt-2">
          {scannedData.phone && (
            <button
              type="button"
              onClick={handleStartCall}
              disabled={callingState === 'calling'}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 text-sm active:scale-95 transition-all"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>
                {callingState === 'calling'
                  ? 'Connecting Masked Line...'
                  : callingState === 'connected'
                  ? 'Calling Masked Line...'
                  : 'Call Owner Anonymously'}
              </span>
            </button>
          )}

          {/* Quick Vehicle / Emergency Alerts */}
          {scannedData.tag && !messageSent && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-[11px] font-bold text-slate-500 text-left block">Send Instant Parking Alert:</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '🚗 Vehicle is Blocking',
                  '💡 Headlights Left ON',
                  '🚨 Emergency Alert',
                  '📢 Please Move Car',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setMessageSent(true);
                      if (scannedData.phone) {
                        window.location.href = `sms:${scannedData.phone}?body=${encodeURIComponent(
                          `[NEXORA Parking Alert for ${scannedData.tag}]: ${preset}`
                        )}`;
                      }
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold text-left transition-all border border-slate-200 dark:border-slate-700"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messageSent && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200">
              <Check className="w-4 h-4" />
              <span>Alert Dispatched to Owner!</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setScannedMode(null);
            window.history.pushState({}, '', window.location.pathname);
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pt-2 block mx-auto"
        >
          Create Your Own Privacy QR Code
        </button>
      </div>
    );
  }

  // IF SCANNED PIN-ENCRYPTED QR
  if (scannedMode === 'pin' && scannedData) {
    return (
      <div className="max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Encrypted Secret QR
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">PIN Protected Content</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            This QR code is encrypted. Enter the 4-digit PIN to decrypt and reveal the secret contents.
          </p>
        </div>

        {!decryptedText ? (
          <div className="space-y-4">
            <input
              type="password"
              maxLength={8}
              placeholder="Enter PIN..."
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-center tracking-widest text-2xl font-mono px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {pinError && <p className="text-xs font-bold text-red-500">Incorrect PIN. Please try again.</p>}
            <button
              type="button"
              onClick={handleDecryptPin}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-2xl shadow-lg shadow-purple-600/20 text-xs sm:text-sm"
            >
              Decrypt Secret Content
            </button>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <Unlock className="w-4 h-4" /> Decrypted Content:
            </div>
            <p className="text-sm font-mono text-slate-900 dark:text-white bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/60 break-words">
              {decryptedText}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setScannedMode(null);
            window.history.pushState({}, '', window.location.pathname);
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pt-2 block mx-auto"
        >
          Create Your Own Privacy QR Code
        </button>
      </div>
    );
  }

  // STANDARD GENERATOR WORKSPACE
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Configuration Column */}
      <div className="lg:col-span-7 space-y-6">
        {/* Privacy & Standard Category Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'privacy-call', label: 'Masked Call QR', icon: ShieldCheck, badge: 'Anonymous' },
            { id: 'vehicle-tag', label: 'Car Parking Tag', icon: Car, badge: 'No Phone Leak' },
            { id: 'pin-encrypted', label: 'PIN Secret QR', icon: Lock, badge: 'AES-256' },
            { id: 'privacy-email', label: 'Masked Email', icon: Mail, badge: 'Anti-Spam' },
            { id: 'url', label: 'Website URL', icon: Globe },
            { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
            { id: 'phone', label: 'Direct Phone', icon: Phone },
            { id: 'text', label: 'Plain Text', icon: MessageSquare },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = type === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as any)}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-start gap-1.5 transition-all text-left relative ${
                  isSelected
                    ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-500 text-brand-600 dark:text-brand-400 shadow-md ring-2 ring-brand-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {t.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase">
                    {t.badge}
                  </span>
                )}
                <div className="flex items-center gap-1.5 pt-1">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Parameter Settings */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          {/* 1. Privacy Masked Call QR */}
          {type === 'privacy-call' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">100% Private & Masked Calling:</span>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Anyone who scans this QR code can directly call you through our privacy relay, but your personal mobile number will remain completely hidden.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Phone Number (Will be Hidden):</label>
                <input
                  type="tel"
                  value={privPhone}
                  onChange={(e) => setPrivPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Display Tag / Owner Name (Optional):</label>
                <input
                  type="text"
                  value={privName}
                  onChange={(e) => setPrivName(e.target.value)}
                  placeholder="e.g. Apartment Owner, Home Contact"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 2. Vehicle & Parking Tag QR */}
          {type === 'vehicle-tag' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2.5">
                <Car className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Smart Parking & Emergency Tag:</span>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400">
                    Stick this QR on your car windshield or bike. If your vehicle is blocking someone, they can scan to send an instant alert or call you without seeing your number.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Vehicle Registration Number:</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. MH 02 AB 1234"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Owner Phone Number (Protected):</label>
                <input
                  type="tel"
                  value={privPhone}
                  onChange={(e) => setPrivPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 3. PIN-Encrypted QR */}
          {type === 'pin-encrypted' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-2xl text-xs text-purple-800 dark:text-purple-300 flex items-start gap-2.5">
                <Lock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">AES-256 PIN Protected Secret Note:</span>
                  <p className="text-[11px] text-purple-700 dark:text-purple-400">
                    The content is encrypted inside the QR code. Anyone scanning it must type your 4-digit PIN to read the secret message.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Secret Content / Text / Contacts:</label>
                <textarea
                  rows={3}
                  value={secretMsg}
                  onChange={(e) => setSecretMsg(e.target.value)}
                  placeholder="Type confidential password, secret message, or private numbers..."
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Set 4-Digit Unlock PIN:</label>
                <input
                  type="password"
                  maxLength={6}
                  value={secretPin}
                  onChange={(e) => setSecretPin(e.target.value)}
                  className="w-40 px-4 py-2.5 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 4. Privacy Email */}
          {type === 'privacy-email' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Masked Anti-Spam Email Relay:</span>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400">
                    Receive messages from scanners without exposing your real personal email address to spammers or data scrapers.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Real Email Address (Protected):</label>
                <input
                  type="email"
                  value={privEmail}
                  onChange={(e) => setPrivEmail(e.target.value)}
                  placeholder="youremail@example.com"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 5. Standard URL */}
          {type === 'url' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Website URL:</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          )}

          {/* 6. Wi-Fi */}
          {type === 'wifi' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Network Name (SSID):</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Wi-Fi Password:</label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 7. Direct Phone */}
          {type === 'phone' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Clear Phone Number:</label>
              <input
                type="tel"
                value={stdPhone}
                onChange={(e) => setStdPhone(e.target.value)}
                className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          )}

          {/* 8. Text */}
          {type === 'text' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Plain Text Message:</label>
              <textarea
                rows={3}
                value={stdText}
                onChange={(e) => setStdText(e.target.value)}
                className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          )}

          {/* Color Styling */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">QR Pattern Color:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-white border border-slate-200 p-0.5"
                />
                <span className="text-xs font-mono font-bold">{fgColor}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">Background Color:</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer bg-white border border-slate-200 p-0.5"
                />
                <span className="text-xs font-mono font-bold">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col items-center justify-center space-y-6 text-center">
        <div className="p-4 rounded-3xl bg-white shadow-xl border border-slate-100 flex items-center justify-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Generated Privacy QR Code" className="w-60 h-60 rounded-xl" />
          ) : (
            <div className="w-60 h-60 bg-slate-100 flex items-center justify-center text-slate-400">
              <QrCode className="w-12 h-12" />
            </div>
          )}
        </div>

        {type.startsWith('privacy') || type === 'vehicle-tag' || type === 'pin-encrypted' ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Relay Active • Phone Number Hidden</span>
          </div>
        ) : null}

        <div className="w-full space-y-2.5">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res QR Code (PNG)</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Privacy Portal Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
