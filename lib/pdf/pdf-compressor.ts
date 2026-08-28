import { PDFDocument } from 'pdf-lib';

export interface CompressOptions {
  level?: 'extreme' | 'medium' | 'light' | 'custom';
  quality?: number; // 0.1 to 1.0
  scale?: number; // 0.5 to 2.0
}

/**
 * Loads PDF.js client-side library dynamically without bundling issues.
 */
async function loadPdfJsLibrary(): Promise<any> {
  if (typeof window === 'undefined') return null;

  if ((window as any).pdfjsLib) {
    return (window as any).pdfjsLib;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const lib = (window as any).pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(lib);
      } else {
        reject(new Error('Failed to initialize pdfjsLib'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF engine'));
    document.head.appendChild(script);
  });
}

/**
 * High-Ratio Real PDF Compressor
 * Compresses vector PDFs, text PDFs, and scanned image PDFs (like Quran, books, documents).
 */
export async function compressPdfAdvanced(
  pdfBuffer: ArrayBuffer,
  options: CompressOptions = {},
  onProgress?: (percent: number, status: string) => void
): Promise<Uint8Array> {
  const level = options.level || 'medium';

  // Determine quality & scale presets
  let jpegQuality = 0.65;
  let renderScale = 1.25;

  if (level === 'extreme') {
    jpegQuality = 0.45;
    renderScale = 1.0;
  } else if (level === 'medium') {
    jpegQuality = 0.65;
    renderScale = 1.25;
  } else if (level === 'light') {
    jpegQuality = 0.82;
    renderScale = 1.5;
  } else if (options.quality) {
    jpegQuality = options.quality;
    renderScale = options.scale || 1.25;
  }

  onProgress?.(5, 'Loading PDF optimization engine...');

  try {
    const pdfjsLib = await loadPdfJsLibrary();

    if (!pdfjsLib) {
      return await compressPdfStructural(pdfBuffer);
    }

    onProgress?.(12, 'Parsing PDF pages and streams...');

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(pdfBuffer),
      useSystemFonts: true,
      disableFontFace: false,
    });

    const pdfDoc = await loadingTask.promise;
    const totalPages = pdfDoc.numPages;

    if (totalPages === 0) {
      return await compressPdfStructural(pdfBuffer);
    }

    onProgress?.(15, `Compressing ${totalPages} pages (${level.toUpperCase()} mode)...`);

    const newPdf = await PDFDocument.create();

    // Process each page with live progress
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const pct = Math.round(15 + (pageNum / totalPages) * 78);
      onProgress?.(pct, `Compressing & optimizing page ${pageNum} of ${totalPages}...`);

      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: renderScale });

      // Create offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) continue;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      await page.render({
        canvasContext: ctx,
        viewport: viewport,
      }).promise;

      // Convert canvas to compressed JPEG
      const jpegDataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
      const base64Data = jpegDataUrl.split(',')[1];
      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Embed compressed page
      const embeddedImg = await newPdf.embedJpg(bytes);
      const origViewport = page.getViewport({ scale: 1.0 });
      const pdfPage = newPdf.addPage([origViewport.width, origViewport.height]);

      pdfPage.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: origViewport.width,
        height: origViewport.height,
      });

      // Release canvas memory
      canvas.width = 0;
      canvas.height = 0;
    }

    onProgress?.(95, 'Writing compressed PDF file...');
    newPdf.setProducer('NEXORA Pro Compression Engine');
    newPdf.setCreator('NEXORA Tools');

    const compressedBytes = await newPdf.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    onProgress?.(100, 'Compression completed successfully!');
    return compressedBytes;
  } catch (err) {
    console.warn('Visual page re-compression fallback to structural optimizer:', err);
    return await compressPdfStructural(pdfBuffer);
  }
}

/**
 * Fast structural compression fallback using object stream deduplication
 */
export async function compressPdfStructural(pdfBuffer: ArrayBuffer): Promise<Uint8Array> {
  const srcDoc = await PDFDocument.load(pdfBuffer, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  const compressedDoc = await PDFDocument.create();
  const pageIndices = srcDoc.getPageIndices();

  const copiedPages = await compressedDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => compressedDoc.addPage(page));

  compressedDoc.setProducer('NEXORA Optimized Engine');
  compressedDoc.setCreator('NEXORA PDF Compressor');

  return await compressedDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });
}
