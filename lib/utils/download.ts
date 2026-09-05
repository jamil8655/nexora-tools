'use client';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { isNativeAndroid, saveFileToDeviceStorage } from '@/lib/native/android-bridge';
import { Share } from '@capacitor/share';

/**
 * Convert a Blob to Base64 string for native Capacitor Filesystem storage
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      if (!res) {
        resolve('');
        return;
      }
      const base64 = res.includes(',') ? res.split(',')[1] : res;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Unified, 100% Reliable File Download & Storage Engine
 * Saves directly to Android Scoped Storage and triggers the native system Save/Open sheet.
 */
export async function downloadSingleFile(blob: Blob, filename: string) {
  if (!blob || blob.size === 0) {
    console.warn('Attempted to download empty or invalid file:', filename);
    return;
  }

  // 1. Android Native Platform: Write to Storage & Open Native Save/Share Sheet
  if (isNativeAndroid()) {
    try {
      const base64 = await blobToBase64(blob);
      const saveResult = await saveFileToDeviceStorage(filename, base64);
      if (saveResult.success && saveResult.uri) {
        try {
          await Share.share({
            title: filename,
            text: `Download / Save ${filename}`,
            url: saveResult.uri,
            dialogTitle: `Save / Open ${filename}`,
          });
          return;
        } catch (shareErr) {
          console.log('Share dismissed or completed:', shareErr);
          return;
        }
      }
    } catch (nativeErr) {
      console.warn('Native storage save notice, falling back to blob anchor:', nativeErr);
    }
  }

  // 2. Standard Browser / WebView Download Fallback
  try {
    saveAs(blob, filename);
  } catch (e) {
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (err) {
      console.error('Download anchor failed:', err);
    }
  }
}

/**
 * Download multiple files packed into a single zip archive
 */
export async function downloadAsZip(
  files: { name: string; blob: Blob }[],
  zipFilename: string = 'nexora-processed-files.zip'
) {
  if (!files || files.length === 0) return;

  const zip = new JSZip();
  files.forEach((file) => {
    if (file.blob && file.blob.size > 0) {
      zip.file(file.name, file.blob);
    }
  });

  const content = await zip.generateAsync({ type: 'blob' });
  await downloadSingleFile(content, zipFilename);
}
