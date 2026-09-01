'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initNativeAndroidBridge, syncAndroidStatusBarTheme } from '@/lib/native/android-bridge';
import { useTheme } from './ThemeContext';

export function NativeAndroidRuntime() {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    initNativeAndroidBridge(() => {
      router.back();
    });
  }, [router]);

  useEffect(() => {
    syncAndroidStatusBarTheme(theme);
  }, [theme]);

  return null;
}
