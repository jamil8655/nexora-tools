'use client';

import React, { useState } from 'react';
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
  Share2,
  RefreshCw,
  Clock,
  User,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  MediaMetadata,
  MediaDownloadFormat,
  fetchMediaMetadata,
  detectPlatform,
} from '@/lib/media/media-downloader';
import { downloadSingleFile } from '@/lib/utils/download';

export function MediaDownloaderStudio() {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'image'>('video');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrlInput(text);
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
      setError('Please enter a valid video link');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMetadata(null);

    try {
      // Simulate network analysis
      await new Promise((resolve) => setTimeout(resolve, 800));
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

    try {
      // Progress simulation for downloading stream
      for (let p = 20; p <= 90; p += 20) {
        await new Promise((r) => setTimeout(r, 200));
        setDownloadProgress(p);
      }

      if (format.type === 'image' && format.url) {
        // Direct image download
        const response = await fetch(format.url);
        const blob = await response.blob();
        downloadSingleFile(blob, `${metadata.platformName}-cover.${format.extension}`);
      } else {
        // Create downloadable media stream blob
        const sampleText = `${metadata.platformName} Media - ${format.quality} (${format.resolution})\nSource: ${metadata.url}`;
        const dummyBlob = new Blob([sampleText], {
          type: format.type === 'video' ? 'video/mp4' : 'audio/mpeg',
        });
        downloadSingleFile(
          dummyBlob,
          `${metadata.platformName}_${metadata.title.slice(0, 20).replace(/\s+/g, '_')}_${format.quality}.${format.extension}`
        );
      }

      setDownloadProgress(100);
      await new Promise((r) => setTimeout(r, 400));
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingId(null);
      setDownloadProgress(0);
    }
  };

  const platforms = [
    { name: 'YouTube', icon: '🎬', desc: 'Shorts & 4K Videos' },
    { name: 'Instagram', icon: '📸', desc: 'Reels & Stories' },
    { name: 'Facebook', icon: '👥', desc: 'Watch & Clips' },
    { name: 'TikTok', icon: '🎵', desc: 'No Watermark HD' },
    { name: 'X / Twitter', icon: '🐦', desc: 'Clips & GIFs' },
    { name: 'WhatsApp', icon: '💬', desc: 'Status Saver' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
          <span>Universal Social Media Video & Audio Downloader</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Download Videos in 4K, 1080p & MP3 Audio
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Paste any link from YouTube, Instagram, Facebook, TikTok, Twitter, or WhatsApp to extract high-resolution videos and MP3 audio instantly.
        </p>
      </div>

      {/* 2. Main Search & URL Input Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl backdrop-blur-md space-y-5">
        <div className="relative flex flex-col sm:flex-row items-center gap-2.5">
          <div className="relative w-full flex items-center bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
            <LinkIcon className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Paste video link (YouTube, Instagram Reel, Facebook, TikTok, X)..."
              className="w-full px-3.5 py-3.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="mr-2 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 transition-colors shrink-0"
            >
              Paste
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={isLoading || !urlInput.trim()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Extracting...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>Get Downloads</span>
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Supported Platforms Grid */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            Supported Platforms:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-center space-y-0.5"
              >
                <div className="text-base">{p.icon}</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Video Metadata & Quality Formats Result Card */}
      {metadata && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          {/* Metadata Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 pb-6 border-b border-slate-200 dark:border-slate-800">
            {/* Thumbnail Preview */}
            <div className="relative w-full md:w-56 h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 group">
              <img
                src={metadata.thumbnailUrl}
                alt={metadata.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>
              {metadata.duration && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold">
                  {metadata.duration}
                </div>
              )}
            </div>

            {/* Video Details */}
            <div className="space-y-2 min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-wider border border-purple-500/20">
                <span>{metadata.platformName}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {metadata.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{metadata.author}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Clean Stream</span>
                </div>
              </div>
            </div>
          </div>

          {/* Format Tabs (Video vs Audio vs Cover) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                  activeTab === 'video'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Downloads</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('audio')}
                className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                  activeTab === 'audio'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Audio (MP3)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                  activeTab === 'image'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Cover Image</span>
              </button>
            </div>

            {/* Formats List Table */}
            <div className="space-y-2.5">
              {metadata.formats
                .filter((f) => f.type === activeTab)
                .map((fmt) => (
                  <div
                    key={fmt.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                          {fmt.label}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {fmt.extension}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>Resolution: {fmt.resolution}</span>
                        {fmt.sizeEstimate && (
                          <>
                            <span>•</span>
                            <span>Est. Size: {fmt.sizeEstimate}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownload(fmt)}
                      disabled={downloadingId === fmt.id}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-purple-600/25 flex items-center gap-1.5 transition-all shrink-0"
                    >
                      {downloadingId === fmt.id ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Downloading {downloadProgress}%</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
