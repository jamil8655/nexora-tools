'use client';

import React, { useState, useEffect } from 'react';
import {
  Link as LinkIcon,
  Download,
  Video,
  Music,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  RefreshCw,
  Clock,
  User,
  ShieldCheck,
  Zap,
  Check,
} from 'lucide-react';
import {
  MediaMetadata,
  MediaDownloadFormat,
  fetchMediaMetadata,
  detectPlatform,
  downloadInSiteMedia,
} from '@/lib/media/media-downloader';
import { downloadSingleFile } from '@/lib/utils/download';

export function MediaDownloaderStudio() {
  const [urlInput, setUrlInput] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'image'>('video');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatusText, setDownloadStatusText] = useState('');

  // Auto-detect platform in real-time as user types or pastes
  useEffect(() => {
    if (!urlInput.trim()) {
      setDetectedPlatform(null);
      return;
    }
    const detected = detectPlatform(urlInput);
    if (detected && detected.platform !== 'generic') {
      setDetectedPlatform(detected.platform);
    } else {
      setDetectedPlatform(null);
    }
  }, [urlInput]);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrlInput(text);
          const detected = detectPlatform(text);
          setDetectedPlatform(detected && detected.platform !== 'generic' ? detected.platform : null);
          handleAnalyze(text);
        }
      }
    } catch (e) {
      // safe fallback
    }
  };

  const handleAnalyze = async (urlToAnalyze?: string) => {
    const targetUrl = urlToAnalyze || urlInput;
    if (!targetUrl.trim()) {
      setError('Please enter a valid video link (e.g. YouTube, Instagram, Facebook, TikTok, X)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMetadata(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await fetchMediaMetadata(targetUrl);
      setMetadata(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch video streams. Please verify the URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: MediaDownloadFormat) => {
    if (!metadata) return;
    setDownloadingId(format.id);
    setDownloadProgress(10);
    setDownloadStatusText('Connecting to in-site stream...');

    try {
      const { blob, fileName } = await downloadInSiteMedia(
        metadata,
        format,
        (pct, status) => {
          setDownloadProgress(pct);
          setDownloadStatusText(status);
        }
      );

      // Trigger direct in-site download without redirecting
      downloadSingleFile(blob, fileName);
    } catch (err) {
      console.error(err);
      setError('Download failed. Please try again.');
    } finally {
      setTimeout(() => {
        setDownloadingId(null);
        setDownloadProgress(0);
        setDownloadStatusText('');
      }, 600);
    }
  };

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: '🎬', desc: 'Shorts, 4K & MP3', color: 'from-red-500 to-rose-600' },
    { id: 'instagram', name: 'Instagram', icon: '📸', desc: 'Reels & Stories', color: 'from-pink-500 to-purple-600' },
    { id: 'facebook', name: 'Facebook', icon: '👥', desc: 'Watch & HD Clips', color: 'from-blue-600 to-indigo-600' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', desc: 'No Watermark HD', color: 'from-cyan-500 to-slate-900' },
    { id: 'twitter', name: 'X / Twitter', icon: '🐦', desc: 'Clips & GIFs', color: 'from-sky-500 to-blue-600' },
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', desc: 'Status Saver', color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-brand-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
          <span>Auto-Detect Platform • 4K UHD & MP3 In-Site Downloader</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Social Video & Audio Downloader
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Paste any link from Instagram, YouTube, TikTok, Facebook, or X. Our engine automatically detects the destination and extracts high-quality streams instantly.
        </p>
      </div>

      {/* 2. Platform Selector / Live Auto-Detected Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {platforms.map((p) => {
          const isDetected = detectedPlatform === p.id;
          return (
            <div
              key={p.name}
              className={`p-3 rounded-2xl border transition-all text-center space-y-1 relative overflow-hidden ${
                isDetected
                  ? 'bg-brand-50/90 dark:bg-brand-950/40 border-brand-500 shadow-lg shadow-brand-500/20 ring-2 ring-brand-500 scale-105'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              {isDetected && (
                <span className="absolute top-1 right-1 px-1.5 py-0.2 rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Auto
                </span>
              )}
              <div className="text-xl sm:text-2xl">{p.icon}</div>
              <div className="font-extrabold text-xs text-slate-900 dark:text-white">{p.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{p.desc}</div>
            </div>
          );
        })}
      </div>

      {/* 3. Input Search Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Paste Instagram Reel, YouTube, TikTok, or FB video URL here..."
              className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-medium"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
            >
              Paste Link
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={isLoading || !urlInput.trim()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-600/25 shrink-0 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Auto-Fetching...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Fetch Media</span>
              </>
            )}
          </button>
        </div>

        {detectedPlatform && (
          <p className="text-xs text-brand-600 dark:text-brand-400 font-bold flex items-center gap-1.5 pl-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Auto-Targeted: {detectedPlatform.toUpperCase()} Media Stream</span>
          </p>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* 4. Fetched Metadata & Streams */}
      {metadata && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <img
              src={metadata.thumbnailUrl}
              alt={metadata.title}
              className="w-full sm:w-40 h-28 object-cover rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0 shadow-sm"
            />
            <div className="space-y-1.5 min-w-0 flex-1">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                {metadata.platform}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white line-clamp-2">
                {metadata.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> {metadata.author}
                </span>
                {metadata.duration && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {metadata.duration}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tab Selector: Video, Audio, Thumbnail */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'video'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Video className="w-4 h-4 text-blue-500" />
              <span>Video Downloads ({metadata.formats.filter((f) => f.type === 'video').length})</span>
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'audio'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Music className="w-4 h-4 text-emerald-500" />
              <span>Audio MP3 ({metadata.formats.filter((f) => f.type === 'audio').length})</span>
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'image'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-pink-500" />
              <span>Cover Image</span>
            </button>
          </div>

          {/* Formats Grid */}
          <div className="space-y-3">
            {metadata.formats
              .filter((f) => f.type === activeTab)
              .map((format) => {
                const isDownloading = downloadingId === format.id;
                return (
                  <div
                    key={format.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {format.label}
                        </span>
                        {(format.resolution?.includes('1080') || format.resolution?.includes('4K') || format.quality?.includes('4K')) && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-black text-[9px] uppercase tracking-wider shadow-xs">
                            HD / 4K
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Format: {format.extension.toUpperCase()} • Approx. {format.sizeEstimate}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownload(format)}
                      disabled={downloadingId !== null}
                      className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-extrabold shadow-md shadow-brand-600/20 inline-flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{downloadProgress}%</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
          </div>

          {/* Download Progress Bar */}
          {downloadingId && (
            <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-brand-900 dark:text-brand-200">
                <span>{downloadStatusText || 'Downloading media file...'}</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-brand-200 dark:bg-brand-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Trust & Speed Guarantees */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">No Watermark</span>
            <span className="text-slate-500">Original studio quality</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">High Speed Serverless</span>
            <span className="text-slate-500">Instant direct extraction</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">100% Free & Unlimited</span>
            <span className="text-slate-500">No registration required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
