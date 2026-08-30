import { createWorker, Worker } from 'tesseract.js';

export interface OcrResult {
  text: string;
  confidence: number;
  lines: { text: string; confidence: number }[];
}

let cachedWorker: Worker | null = null;
let workerInitPromise: Promise<Worker> | null = null;

/**
 * Get or initialize a fast, persistent OCR worker.
 */
export async function getOcrWorker(language: string = 'eng', onStatus?: (status: string) => void): Promise<Worker> {
  if (cachedWorker) return cachedWorker;
  if (workerInitPromise) return await workerInitPromise;

  workerInitPromise = (async () => {
    onStatus?.('Loading OCR AI model into browser...');
    const worker = await createWorker(language, 1, {
      workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@v5.1.1/dist/worker.min.js',
      corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v5.1.0/tesseract-core.wasm.js',
      logger: () => {}, // suppress raw progress resetting
    });
    cachedWorker = worker;
    return worker;
  })();

  return await workerInitPromise;
}

/**
 * Execute OCR text recognition on an image canvas or data URL with smooth progress.
 */
export async function runOcr(
  imageSource: string | HTMLCanvasElement | File | Blob,
  language: string = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<OcrResult> {
  onProgress?.(10, 'Initializing OCR character recognition engine...');
  const worker = await getOcrWorker(language, (s) => onProgress?.(20, s));

  onProgress?.(50, 'Analyzing scanned page layout and extracting text...');
  const ret = await worker.recognize(imageSource);
  onProgress?.(100, 'Text recognition completed!');

  return {
    text: ret.data.text || '',
    confidence: Math.round(ret.data.confidence || 0),
    lines: (ret.data.lines || []).map((l) => ({
      text: l.text,
      confidence: Math.round(l.confidence || 0),
    })),
  };
}
