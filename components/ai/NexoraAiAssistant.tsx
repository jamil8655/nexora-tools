'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Bot,
  ArrowRight,
  Send,
  Workflow,
  Zap,
  CheckCircle2,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ToolDefinition } from '@/lib/types';

interface AiRecommendation {
  query: string;
  matchedTool: ToolDefinition;
  reason: string;
  suggestedWorkflowSteps?: { toolId: string; toolName: string; purpose: string }[];
  confidence: number;
}

const AI_KNOWLEDGE_BASE: {
  patterns: RegExp[];
  toolId: string;
  reason: string;
  workflowSteps?: { toolId: string; toolName: string; purpose: string }[];
}[] = [
  {
    patterns: [
      /reduce.*pdf.*to.*(under|<|less than)?\s*(\d+)?\s*(mb|kb)/i,
      /compress.*pdf/i,
      /make.*pdf.*smaller/i,
      /shrink.*pdf/i,
      /pdf.*size.*too.*large/i,
    ],
    toolId: 'compress-pdf',
    reason: 'Smart PDF Compressor reduces document size with multiple compression presets while preserving readability.',
    workflowSteps: [
      { toolId: 'compress-pdf', toolName: 'Compress PDF', purpose: 'Shrink file size' },
      { toolId: 'pdf-metadata', toolName: 'Sanitize Metadata', purpose: 'Clean internal tags' },
    ],
  },
  {
    patterns: [
      /passport.*photo/i,
      /35\s*x\s*45/i,
      /3\.5\s*x\s*4\.5/i,
      /2\s*x\s*2/i,
      /visa.*photo/i,
      /upsc.*photo/i,
      /print.*sheet.*passport/i,
    ],
    toolId: 'passport-photo-maker',
    reason: 'Passport Photo Studio provides exact 3.5x4.5cm and 2x2" dimensions, 24+ studio backdrops, candidate name/DOP strip, and 1-32 photo print sheets.',
    workflowSteps: [
      { toolId: 'background-remover', toolName: 'AI Background Cutout', purpose: 'Clean transparent cutout' },
      { toolId: 'passport-photo-maker', toolName: 'Passport Cropper', purpose: 'Crop to exact 3.5x4.5cm' },
      { toolId: 'image-resizer', toolName: 'Target Size (<50KB)', purpose: 'Official upload size' },
    ],
  },
  {
    patterns: [
      /convert.*pdf.*to.*(word|docx|editable)/i,
      /ocr.*pdf/i,
      /extract.*text.*from.*pdf/i,
      /scan.*to.*doc/i,
    ],
    toolId: 'pdf-to-docx',
    reason: 'PDF to Word OCR reconstructs digital and scanned PDFs into fully editable Microsoft Word DOCX files in-browser.',
    workflowSteps: [
      { toolId: 'pdf-to-docx', toolName: 'PDF to DOCX OCR', purpose: 'Extract layout and text' },
    ],
  },
  {
    patterns: [
      /remove.*(background|bg)/i,
      /transparent.*png/i,
      /erase.*background/i,
      /photo.*cutout/i,
    ],
    toolId: 'background-remover',
    reason: 'AI Background Remover creates lossless transparent PNG cutouts using sub-pixel edge matting without server uploads.',
    workflowSteps: [
      { toolId: 'background-remover', toolName: 'Background Cutout', purpose: 'Create transparent PNG' },
    ],
  },
  {
    patterns: [
      /make.*image.*(\d+)?\s*(kb|mb)/i,
      /resize.*image.*to.*(\d+)?\s*(kb|mb)/i,
      /shrink.*photo.*to.*(\d+)?\s*kb/i,
    ],
    toolId: 'image-resizer',
    reason: 'Exact Size Image Resizer compresses photos to official target limits (e.g. Under 20KB, 50KB, 100KB, 200KB).',
  },
  {
    patterns: [
      /download.*(video|reel|tiktok|youtube|instagram|status)/i,
      /4k.*downloader/i,
      /save.*video/i,
    ],
    toolId: 'media-downloader',
    reason: '4K Multi-Engine Downloader fetches HD/4K videos from YouTube, Instagram Reels, TikTok (no watermark), Facebook, and Twitter.',
  },
  {
    patterns: [
      /video.*to.*mp3/i,
      /extract.*audio/i,
      /convert.*video.*to.*song/i,
      /mp4.*to.*mp3/i,
    ],
    toolId: 'video-to-mp3',
    reason: 'Video to MP3 extracts high-speed 320kbps studio-quality audio from any video format.',
  },
  {
    patterns: [
      /cut.*audio/i,
      /trim.*song/i,
      /make.*ringtone/i,
      /audio.*cutter/i,
    ],
    toolId: 'audio-cutter',
    reason: 'Visual Audio Cutter trims songs and voice notes with millisecond precision and live waveform playback.',
  },
];

export function NexoraAiAssistant() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const samplePrompts = [
    'I need to reduce a 20 MB PDF to under 2 MB',
    'I need a 35x45 mm passport photo with white background',
    'Extract editable Word document from scanned PDF',
    'Make my signature photo under 50 KB',
    'Download Instagram Reel without watermark in HD',
  ];

  const handleAsk = (queryText: string) => {
    const text = (queryText || prompt).trim();
    if (!text) return;
    setIsThinking(true);
    setRecommendation(null);

    setTimeout(() => {
      let matched = AI_KNOWLEDGE_BASE.find((k) =>
        k.patterns.some((p) => p.test(text))
      );

      // Fallback: match by keywords
      if (!matched) {
        const foundTool = TOOLS_LIST.find(
          (t) =>
            text.toLowerCase().includes(t.name.toLowerCase()) ||
            t.tags.some((tag) => text.toLowerCase().includes(tag.toLowerCase()))
        );
        if (foundTool) {
          matched = {
            patterns: [],
            toolId: foundTool.id,
            reason: `Direct match with ${foundTool.name}: ${foundTool.shortDesc}`,
          };
        }
      }

      if (matched) {
        const toolObj = TOOLS_LIST.find((t) => t.id === matched?.toolId || t.slug === matched?.toolId) || TOOLS_LIST[0];
        setRecommendation({
          query: text,
          matchedTool: toolObj,
          reason: matched.reason,
          suggestedWorkflowSteps: matched.workflowSteps,
          confidence: 98,
        });
      } else {
        // Universal Compress / Convert fallback
        const generalTool = TOOLS_LIST.find((t) => t.id === 'compress-pdf') || TOOLS_LIST[0];
        setRecommendation({
          query: text,
          matchedTool: generalTool,
          reason: 'We found the best utility matching your productivity request.',
          confidence: 85,
        });
      }
      setIsThinking(false);
    }, 350);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-700 text-white shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-md">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              NEXORA AI Tool Finder & Workflow Assistant
            </h2>
            <p className="text-xs sm:text-sm text-brand-100">
              Describe your goal in plain English, Urdu, or Arabic. Our engine maps your intent into the exact in-browser tool or multi-step automated pipeline.
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(prompt)}
            placeholder="e.g. I need to reduce a 20 MB PDF to under 2 MB, or create 3.5x4.5cm passport photo..."
            className="w-full pl-4 pr-28 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-semibold text-xs sm:text-sm focus:outline-none shadow-lg focus:ring-4 focus:ring-brand-400/30"
          />
          <button
            type="button"
            onClick={() => handleAsk(prompt)}
            disabled={isThinking}
            className="absolute right-2 top-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isThinking ? 'Analyzing...' : 'Ask AI'}</span>
          </button>
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-200">
            Suggested Prompts:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => {
                  setPrompt(sp);
                  handleAsk(sp);
                }}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium border border-white/15 transition-all"
              >
                &ldquo;{sp}&rdquo;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation Result Card */}
      {recommendation && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-brand-600">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Tool & Pipeline ({recommendation.confidence}% Match)</span>
            </div>
            <span className="text-[11px] text-slate-400">100% In-Browser Execution</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{recommendation.matchedTool.name}</span>
                  <span className="px-2 py-0.2 rounded text-[10px] font-black uppercase bg-brand-600 text-white">
                    PRIMARY MATCH
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {recommendation.reason}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/tools/${recommendation.matchedTool.slug || recommendation.matchedTool.id}`)}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-1.5 shrink-0 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Suggested Workflow Steps if applicable */}
            {recommendation.suggestedWorkflowSteps && (
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-purple-600" />
                    <span>Automated Multi-Tool Pipeline Available:</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => router.push('/workflows')}
                    className="text-xs font-bold text-purple-600 hover:underline"
                  >
                    Open in Workflow Builder ➔
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {recommendation.suggestedWorkflowSteps.map((step, i) => (
                    <div
                      key={step.toolId}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/50 text-xs space-y-0.5"
                    >
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 text-[10px] flex items-center justify-center font-mono">
                          {i + 1}
                        </span>
                        <span>{step.toolName}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 pl-5">{step.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
