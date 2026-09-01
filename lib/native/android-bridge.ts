'use client';

import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Network } from '@capacitor/network';

export const isNativeAndroid = (): boolean => {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
};

/**
 * Initialize Native Android Runtime (Splash, StatusBar, Hardware Back Button)
 */
export const initNativeAndroidBridge = (routerBack?: () => void) => {
  if (!Capacitor.isNativePlatform()) return;

  // 1. Hide Splash Screen cleanly after app hydrates
  try {
    SplashScreen.hide();
  } catch (e) {}

  // 2. Setup Status Bar
  try {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: '#020617' });
  } catch (e) {}

  // 3. Android Hardware Back Button Listener
  try {
    CapApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack && routerBack) {
        routerBack();
      } else {
        // If at root, exit app or minimize
        CapApp.exitApp();
      }
    });
  } catch (e) {}
};

/**
 * Update Android Status Bar to match Theme
 */
export const syncAndroidStatusBarTheme = (theme: 'light' | 'dark' | 'system') => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    StatusBar.setStyle({
      style: isDark ? Style.Dark : Style.Light,
    });
    StatusBar.setBackgroundColor({
      color: isDark ? '#020617' : '#FFFFFF',
    });
  } catch (e) {}
};

/**
 * Native Android System Share Sheet
 */
export const shareFileNative = async (title: string, text: string, url?: string, filePath?: string): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  try {
    await Share.share({
      title,
      text,
      url,
      files: filePath ? [filePath] : undefined,
      dialogTitle: 'Share with NEXORA',
    });
    return true;
  } catch (e) {
    console.warn('Native share notice:', e);
    return false;
  }
};

/**
 * Save Processed File to Android Device Storage
 */
export const saveFileToDeviceStorage = async (fileName: string, base64Data: string): Promise<{ success: boolean; uri?: string; error?: string }> => {
  if (!Capacitor.isNativePlatform()) {
    return { success: false, error: 'Web environment' };
  }

  try {
    const saved = await Filesystem.writeFile({
      path: `Download/${fileName}`,
      data: base64Data,
      directory: Directory.ExternalStorage,
      recursive: true,
    });

    return { success: true, uri: saved.uri };
  } catch (e: any) {
    try {
      // Fallback to Documents directory
      const savedDoc = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
      });
      return { success: true, uri: savedDoc.uri };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Storage write failed' };
    }
  }
};

/**
 * Native Camera Capture for Passport Photo / Document Scanner
 */
export const captureCameraPhotoNative = async (): Promise<{ success: boolean; dataUrl?: string; error?: string }> => {
  if (!Capacitor.isNativePlatform()) {
    return { success: false, error: 'Web environment' };
  }

  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
      allowEditing: false,
    });

    return { success: true, dataUrl: photo.dataUrl };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Camera cancelled or permission denied' };
  }
};

/**
 * Network Connectivity Check
 */
export const checkNetworkStatusNative = async (): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    return navigator.onLine;
  }

  try {
    const status = await Network.getStatus();
    return status.connected;
  } catch (e) {
    return true;
  }
};
