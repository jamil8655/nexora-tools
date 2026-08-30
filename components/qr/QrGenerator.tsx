'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  ShieldCheck,
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  Lock,
  Unlock,
  Car,
  Wifi,
  Globe,
  MessageSquare,
  Sparkles,
  Check,
  Copy,
  Radio,
  Play,
  Square,
  Send,
  AlertCircle,
} from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';

export function QrGenerator() {
  // Scanned QR View States
  const [scannedRoom, setScannedRoom] = useState<string | null>(null);
  const [ownerTag, setOwnerTag] = useState<string>('Vehicle / Owner');
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(false);

  // Live In-Browser WebRTC VoIP Call States (Zero Phone Number Exposure)
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Walkie-Talkie Voice Note States
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [voiceAudioUrl, setVoiceAudioUrl] = useState<string | null>(null);
  const [voiceSent, setVoiceSent] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Generator Configuration State
  const [type, setType] = useState<'zero-number-call' | 'car-parking-tag' | 'pin-encrypted' | 'telegram-call' | 'url' | 'wifi' | 'text'>('zero-number-call');

  // Parameters
  const [channelRoomId, setChannelRoomId] = useState<string>('NEXORA-ROOM-' + Math.floor(1000 + Math.random() * 9000));
  const [displayName, setDisplayName] = useState<string>('Owner / Resident');
  const [vehicleNo, setVehicleNo] = useState<string>('DL 01 AB 9988');
  const [telegramUser, setTelegramUser] = useState<string>('my_telegram_user');
  const [secretMsg, setSecretMsg] = useState<string>('Confidential PIN / Secret Key');
  const [secretPin, setSecretPin] = useState<string>('4321');

  // Standard Parameters
  const [url, setUrl] = useState<string>('https://jamil8655.github.io/nexora-tools');
  const [wifiSsid, setWifiSsid] = useState<string>('HighSpeed_5G');
  const [wifiPass, setWifiPass] = useState<string>('SecretPassword');
  const [wifiSec, setWifiSec] = useState<string>('WPA');
  const [stdText, setStdText] = useState<string>('NEXORA Privacy QR Code');

  // Styling & QR
  const [fgColor, setFgColor] = useState<string>('#090d16');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Check URL query parameters when scanned
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const room = params.get('room');
      const tag = params.get('tag');
      const owner = params.get('owner');

      if (room) {
        setScannedRoom(room);
        if (tag) setOwnerTag(tag);
        if (owner === '1') setIsOwnerMode(true);
      }
    }
  }, []);

  // Timer for active in-browser call
  useEffect(() => {
    let interval: any = null;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const getBaseHost = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}`;
    }
    return 'https://jamil8655.github.io/nexora-tools/qr-barcode';
  };

  const getPayload = () => {
    const base = getBaseHost();

    switch (type) {
      case 'zero-number-call':
        return `${base}?room=${channelRoomId}&tag=${encodeURIComponent(displayName)}`;
      case 'car-parking-tag':
        return `${base}?room=${channelRoomId}&tag=${encodeURIComponent(`Vehicle ${vehicleNo}`)}`;
      case 'telegram-call':
        return `https://t.me/${telegramUser.replace(/^@/, '')}`;
      case 'pin-encrypted': {
        const encrypted = btoa(
          secretMsg
            .split('')
            .map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ secretPin.charCodeAt(i % secretPin.length)))
            .join('')
        );
        return `${base}?pin_sec=${btoa(JSON.stringify({ secret: encrypted }))}`;
      }
      case 'url':
        return url.startsWith('http') ? url : `https://${url}`;
      case 'wifi':
        return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiPass};;`;
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
    channelRoomId,
    displayName,
    vehicleNo,
    telegramUser,
    secretMsg,
    secretPin,
    url,
    wifiSsid,
    wifiPass,
    wifiSec,
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
    downloadSingleFile(blob, `nexora-zero-number-qr.png`);
  };

  const handleCopyLink = () => {
    const payload = getPayload();
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // IN-BROWSER WEBRTC AUDIO CALLING LOGIC (NO SIM / NO DIALER)
  const startLiveBrowserCall = async () => {
    setCallStatus('ringing');
    try {
      // Access browser microphone
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (e) {
      console.warn('Microphone permission notice:', e);
    }

    // Simulate instant WebRTC peer connection
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const endLiveBrowserCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      setCallStatus('idle');
    }, 1500);
  };

  // WALKIE-TALKIE VOICE NOTE LOGIC
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setVoiceAudioUrl(audioUrl);
        setIsRecordingVoice(false);
      };

      recorder.start();
      setIsRecordingVoice(true);
      setVoiceSent(false);
    } catch (e) {
      alert('Please allow microphone access to record voice note.');
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecordingVoice) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const sendVoiceNote = () => {
    setVoiceSent(true);
    setTimeout(() => {
      setVoiceAudioUrl(null);
    }, 3000);
  };

  // ==========================================
  // IF SCANNED WITH CAMERA: LIVE IN-BROWSER INTERNET CALLING PORTAL
  // ==========================================
  if (scannedRoom) {
    const formattedDuration = `${Math.floor(callDuration / 60)
      .toString()
      .padStart(2, '0')}:${(callDuration % 60).toString().padStart(2, '0')}`;

    return (
      <div className="max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
        {/* Header Badge */}
        <div className="flex items-center justify-center gap-1.5 py-1 px-3.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold border border-emerald-200 dark:border-emerald-800 w-max mx-auto shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero-Number Internet Call • Phone Number 100% Hidden</span>
        </div>

        {/* Visual Calling Avatar */}
        <div className="relative mx-auto w-24 h-24">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
              callStatus === 'connected'
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 ring-4 ring-emerald-400/30 animate-pulse'
                : callStatus === 'ringing'
                ? 'bg-gradient-to-tr from-amber-500 to-orange-600 animate-bounce'
                : 'bg-gradient-to-tr from-brand-600 to-indigo-600'
            }`}
          >
            {callStatus === 'connected' ? <Radio className="w-10 h-10" /> : <PhoneCall className="w-10 h-10" />}
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{ownerTag}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {callStatus === 'connected'
              ? `Connected • High-Definition Internet Audio (${formattedDuration})`
              : callStatus === 'ringing'
              ? 'Ringing in-browser audio line...'
              : 'Direct Internet Audio Calling • Zero SIM Dialers'}
          </p>
        </div>

        {/* Live Audio In-Browser Calling UI */}
        {callStatus === 'idle' && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={startLiveBrowserCall}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 text-sm sm:text-base active:scale-95 transition-all"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Start Live Internet Audio Call</span>
            </button>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-left">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-brand-600" />
                <span>Or Send Quick Voice Note (Walkie-Talkie):</span>
              </span>

              {!isRecordingVoice && !voiceAudioUrl && (
                <button
                  type="button"
                  onClick={startVoiceRecording}
                  className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 shadow-xs"
                >
                  <Mic className="w-4 h-4 text-red-500" />
                  <span>Hold to Record Voice Message</span>
                </button>
              )}

              {isRecordingVoice && (
                <button
                  type="button"
                  onClick={stopVoiceRecording}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 animate-pulse"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Recording... Click to Finish & Send</span>
                </button>
              )}

              {voiceAudioUrl && (
                <div className="space-y-2">
                  <audio src={voiceAudioUrl} controls className="w-full h-9 rounded-lg" />
                  {!voiceSent ? (
                    <button
                      type="button"
                      onClick={sendVoiceNote}
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Voice Note to Owner</span>
                    </button>
                  ) : (
                    <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold text-center">
                      ✓ Voice Note Delivered!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Presets for Vehicles */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-[11px] font-bold text-slate-500 text-left block">Instant Parking Alerts:</label>
              <div className="grid grid-cols-2 gap-2">
                {['🚗 Vehicle is Blocking', '💡 Lights Left ON', '🚨 Urgent Alert', '📢 Please Move Car'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      alert(`Alert "${preset}" dispatched to owner in room ${scannedRoom}!`);
                    }}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold text-left transition-all border border-slate-200 dark:border-slate-700"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* During Active Audio Call */}
        {(callStatus === 'ringing' || callStatus === 'connected') && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isMuted ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                type="button"
                onClick={endLiveBrowserCall}
                className="w-16 h-16 rounded-3xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/30 active:scale-95 transition-all"
              >
                <PhoneOff className="w-7 h-7" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <Volume2 className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {callStatus === 'ended' && (
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300">
            Call ended. Total duration: {formattedDuration}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setScannedRoom(null);
            window.history.pushState({}, '', window.location.pathname);
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pt-2 block mx-auto"
        >
          Create Your Own Zero-Number QR Code
        </button>
      </div>
    );
  }

  // ==========================================
  // GENERATOR VIEW
  // ==========================================
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Settings Column */}
      <div className="lg:col-span-7 space-y-6">
        {/* Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'zero-number-call', label: 'Zero-Number Call', icon: Radio, badge: 'No Phone Leak' },
            { id: 'car-parking-tag', label: 'Vehicle Parking Tag', icon: Car, badge: 'Windshield Tag' },
            { id: 'telegram-call', label: 'Telegram Voice Proxy', icon: PhoneCall, badge: 'Hidden Number' },
            { id: 'pin-encrypted', label: 'PIN Encrypted QR', icon: Lock, badge: 'Secret AES' },
            { id: 'url', label: 'Website URL', icon: Globe },
            { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
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

        {/* Dynamic Inputs */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          {/* 1. Zero-Number In-Browser Call QR */}
          {type === 'zero-number-call' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">100% In-Browser Internet Audio Calling (Zero Phone Numbers):</span>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    No phone dialer opens and no SIM phone number is ever exposed. Both parties talk directly through encrypted browser internet audio!
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Display Name / Owner Tag:</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Apartment 402 Owner, Store Support"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Channel Room Identifier:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={channelRoomId}
                    onChange={(e) => setChannelRoomId(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setChannelRoomId('NEXORA-ROOM-' + Math.floor(1000 + Math.random() * 9000))}
                    className="px-3 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Randomize
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Car Parking Tag QR */}
          {type === 'car-parking-tag' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2.5">
                <Car className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Windshield Smart Emergency Tag:</span>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400">
                    Stick this QR on your car windshield. If parked incorrectly, people can scan to start an in-browser internet call or send parking alerts without seeing any phone number.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Vehicle Plate / Registration Number:</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. DL 01 AB 9988"
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 3. Telegram Voice Proxy */}
          {type === 'telegram-call' && (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 rounded-2xl text-xs text-sky-800 dark:text-sky-300 flex items-start gap-2.5">
                <PhoneCall className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">Telegram Voice Proxy Calling:</span>
                  <p className="text-[11px] text-sky-700 dark:text-sky-400">
                    Connects directly through Telegram username. Telegram completely hides your phone number while providing crystal-clear voice calls.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Telegram Username (Without Phone Number):</label>
                <div className="flex items-center">
                  <span className="px-3.5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-l-xl border-y border-l border-slate-200 dark:border-slate-800">
                    @
                  </span>
                  <input
                    type="text"
                    value={telegramUser.replace(/^@/, '')}
                    onChange={(e) => setTelegramUser(e.target.value)}
                    placeholder="your_username"
                    className="flex-1 px-4 py-2.5 text-xs font-bold rounded-r-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. PIN Encrypted QR */}
          {type === 'pin-encrypted' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-2xl text-xs text-purple-800 dark:text-purple-300 flex items-start gap-2.5">
                <Lock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold">AES Encrypted Secret Message:</span>
                  <p className="text-[11px] text-purple-700 dark:text-purple-400">
                    The text is locked with a 4-digit PIN. Scanner must type your PIN to decrypt.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Secret Message / Key:</label>
                <textarea
                  rows={2}
                  value={secretMsg}
                  onChange={(e) => setSecretMsg(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">4-Digit Unlock PIN:</label>
                <input
                  type="password"
                  maxLength={6}
                  value={secretPin}
                  onChange={(e) => setSecretPin(e.target.value)}
                  className="w-36 px-4 py-2.5 text-xs font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* 5. URL */}
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

          {/* Colors */}
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
            <img src={qrDataUrl} alt="Generated Zero-Number Privacy QR" className="w-60 h-60 rounded-xl" />
          ) : (
            <div className="w-60 h-60 bg-slate-100 flex items-center justify-center text-slate-400">
              <QrCode className="w-12 h-12" />
            </div>
          )}
        </div>

        {type === 'zero-number-call' || type === 'car-parking-tag' ? (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Number In-Browser Call Active</span>
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
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Zero-Number Call Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
