'use client';

import React, { useEffect, useRef } from 'react';
import { adConfig } from '@/config/ads';

interface AdSlotProps {
  placement: 'header' | 'in-feed' | 'tool-bottom' | 'result-page';
  className?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
}

export function AdSlot({ placement, className = '', format = 'auto' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adConfig.enabled) return;

    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // safe fallback if ad blocker is enabled
    }
  }, [placement]);

  if (!adConfig.enabled) return null;

  const isTest = adConfig.adsense.client.includes('XXXXXXXX');

  return (
    <div
      ref={adRef}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 p-3 text-center my-4 transition-all ${className}`}
    >
      {/* Small subtle Sponsor / Ad label */}
      <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2 px-1">
        <span>Advertisement</span>
        <span className="text-[9px] text-slate-400">Ad Space</span>
      </div>

      {isTest ? (
        // Clean visual placeholder when API key / Client ID is in setup mode
        <div className="flex flex-col items-center justify-center min-h-[90px] py-4 px-3 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 space-y-1">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Ad Space ({placement.replace('-', ' ').toUpperCase()})
          </div>
          <p className="text-[10px] text-slate-400 max-w-sm">
            Google AdMob & AdSense ready. Ads will display automatically here once configured.
          </p>
        </div>
      ) : (
        // Production Google AdSense Tag
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adConfig.adsense.client}
          data-ad-slot={adConfig.adsense.slots[placement as keyof typeof adConfig.adsense.slots] || ''}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
