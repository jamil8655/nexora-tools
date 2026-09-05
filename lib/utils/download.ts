'use client';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

/**
 * Convert a Blob to Base64 string for native file saving
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
 * Direct File Downloader for Android & Web
 * Directly saves to device Public Downloads folder without showing any share sheet.
 */
export async function downloadSingleFile(blob: Blob, filename: string) {
  if (!blob || blob.size === 0) {
    console.warn('Attempted to download empty or invalid file:', filename);
    return;
  }

  // 1. Android Native: Direct MediaStore Download to Public "Downloads" folder
  if (typeof window !== 'undefined' && (window as any).AndroidDownloader) {
    try {
      const base64 = await blobToBase64(blob);
      const saved = (window as any).AndroidDownloader.saveBase64File(base64, filename, blob.type);
      if (saved) return;
    } catch (e) {
      console.warn('AndroidDownloader interface warning:', e);
    }
  }

  // 2. Capacitor Filesystem Direct Write to Documents / External Storage
  if (Capacitor.isNativePlatform()) {
    try {
      const base64 = await blobToBase64(blob);
      await Filesystem.writeFile({
        path: `Download/${filename}`,
        data: base64,
        directory: Directory.ExternalStorage,
        recursive: true,
      });
      return;
    } catch (fsErr) {
      try {
        await Filesystem.writeFile({
          path: filename,
          data: await blobToBase64(blob),
          directory: Directory.Documents,
          recursive: true,
        });
        return;
      } catch (docErr) {
        console.warn('Capacitor direct write warning:', docErr);
      }
    }
  }

  // 3. Web & WebView Blob Anchor Fallback
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
