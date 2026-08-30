import imageCompression from 'browser-image-compression';

export async function convertImage(
  file: File,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp',
  quality: number = 0.9
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      // If converting to JPEG, draw white background to avoid black transparency
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Image conversion failed'));
          const dataUrl = canvas.toDataURL(targetFormat, quality);
          resolve({ blob, dataUrl, width: canvas.width, height: canvas.height });
        },
        targetFormat,
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image file'));
    img.src = url;
  });
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  maintainAspect: boolean = true,
  format: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg',
  quality: number = 0.92
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let finalW = targetWidth;
      let finalH = targetHeight;

      if (maintainAspect) {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (targetWidth / targetHeight > ratio) {
          finalW = Math.round(targetHeight * ratio);
        } else {
          finalH = Math.round(targetWidth / ratio);
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, finalW);
      canvas.height = Math.max(1, finalH);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Image resize failed'));
          const dataUrl = canvas.toDataURL(format, quality);
          resolve({ blob, dataUrl, width: canvas.width, height: canvas.height });
        },
        format,
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

/**
 * Resizes and compresses an image to hit an exact Target File Size in KB (e.g. 50 KB, 100 KB, 500 KB, 2000 KB).
 */
export async function compressImageToTargetKB(
  file: File,
  targetKB: number,
  format: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg'
): Promise<{ blob: Blob; dataUrl: string; width: number; height: number; finalKB: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = async () => {
      URL.revokeObjectURL(url);
      const targetBytes = targetKB * 1024;
      let currentWidth = img.naturalWidth;
      let currentHeight = img.naturalHeight;

      // If original image is huge, downscale dimensions proportionally
      const maxDim = targetKB <= 100 ? 1200 : targetKB <= 500 ? 1920 : 3840;
      if (Math.max(currentWidth, currentHeight) > maxDim) {
        const ratio = currentWidth / currentHeight;
        if (currentWidth > currentHeight) {
          currentWidth = maxDim;
          currentHeight = Math.round(maxDim / ratio);
        } else {
          currentHeight = maxDim;
          currentWidth = Math.round(maxDim * ratio);
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = currentWidth;
      canvas.height = currentHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Binary search for optimal quality factor to fit target size
      let low = 0.1;
      let high = 0.95;
      let bestBlob: Blob | null = null;
      let bestQuality = 0.8;

      for (let step = 0; step < 6; step++) {
        const mid = (low + high) / 2;
        const candidateBlob = await new Promise<Blob | null>((res) => {
          canvas.toBlob((b) => res(b), format, mid);
        });

        if (!candidateBlob) break;

        if (candidateBlob.size <= targetBytes) {
          bestBlob = candidateBlob;
          bestQuality = mid;
          low = mid; // Try for higher quality while staying under limit
        } else {
          high = mid; // Too large, reduce quality
        }
      }

      // If even lowest quality is larger than target, downscale resolution further
      if (!bestBlob || bestBlob.size > targetBytes) {
        const scaleFactor = Math.sqrt(targetBytes / (bestBlob?.size || file.size));
        const scaledW = Math.max(100, Math.floor(currentWidth * Math.min(0.9, scaleFactor)));
        const scaledH = Math.max(100, Math.floor(currentHeight * Math.min(0.9, scaleFactor)));

        canvas.width = scaledW;
        canvas.height = scaledH;
        if (format === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        bestBlob = await new Promise<Blob | null>((res) => {
          canvas.toBlob((b) => res(b), format, 0.75);
        });
      }

      const finalResultBlob = bestBlob || file;
      const dataUrl = canvas.toDataURL(format, bestQuality);

      resolve({
        blob: finalResultBlob,
        dataUrl,
        width: canvas.width,
        height: canvas.height,
        finalKB: Math.round(finalResultBlob.size / 1024),
      });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

export async function rotateAndFlipImage(
  file: File,
  action: 'rotate-90' | 'rotate-180' | 'rotate-270' | 'flip-h' | 'flip-v'
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      const isRotated90or270 = action === 'rotate-90' || action === 'rotate-270';
      canvas.width = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
      canvas.height = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

      ctx.save();
      if (action === 'rotate-90') {
        ctx.translate(canvas.width, 0);
        ctx.rotate((90 * Math.PI) / 180);
      } else if (action === 'rotate-180') {
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate((180 * Math.PI) / 180);
      } else if (action === 'rotate-270') {
        ctx.translate(0, canvas.height);
        ctx.rotate((270 * Math.PI) / 180);
      } else if (action === 'flip-h') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else if (action === 'flip-v') {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }

      ctx.drawImage(img, 0, 0);
      ctx.restore();

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Transformation failed'));
          const dataUrl = canvas.toDataURL(file.type || 'image/png');
          resolve({ blob, dataUrl });
        },
        file.type || 'image/png',
        0.95
      );
    };
    img.onerror = () => reject(new Error('Failed to transform image'));
    img.src = url;
  });
}

export async function watermarkImage(
  file: File,
  text: string = 'NEXORA',
  opacity: number = 0.5,
  color: string = '#ffffff'
): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context not available'));

      ctx.drawImage(img, 0, 0);

      // Draw watermark
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      const fontSize = Math.max(24, Math.floor(canvas.width / 20));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 8;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(text, canvas.width - 30, canvas.height - 30);
      ctx.restore();

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Watermarking failed'));
          const dataUrl = canvas.toDataURL('image/png');
          resolve({ blob, dataUrl });
        },
        'image/png',
        0.95
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

export async function stripExifAndMetadata(file: File): Promise<{ blob: Blob; dataUrl: string }> {
  // Drawing on canvas naturally strips all EXIF metadata tags
  return await convertImage(file, 'image/jpeg', 0.95);
}

export async function compressImage(
  file: File,
  qualityFactor: number = 0.75
): Promise<{ blob: Blob; dataUrl: string; savedSize: number; percentSaved: number }> {
  try {
    const options = {
      maxSizeMB: Math.max(0.1, (file.size / (1024 * 1024)) * qualityFactor),
      maxWidthOrHeight: 2560,
      useWebWorker: true,
      initialQuality: qualityFactor,
    };
    const compressedBlob = await imageCompression(file, options);
    const dataUrl = URL.createObjectURL(compressedBlob);
    const savedSize = file.size - compressedBlob.size;
    const percentSaved = Math.max(0, Math.round((savedSize / file.size) * 100));

    return {
      blob: compressedBlob,
      dataUrl,
      savedSize,
      percentSaved,
    };
  } catch (err) {
    // Fallback using HTML5 canvas compression
    const converted = await convertImage(file, 'image/jpeg', qualityFactor);
    const savedSize = Math.max(0, file.size - converted.blob.size);
    const percentSaved = Math.max(0, Math.round((savedSize / file.size) * 100));
    return {
      blob: converted.blob,
      dataUrl: converted.dataUrl,
      savedSize,
      percentSaved,
    };
  }
}
