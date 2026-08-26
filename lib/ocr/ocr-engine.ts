import { createWorker } from 'tesseract.js';

export interface OcrResult {
  text: string;
  confidence: number;
  lines: { text: string; confidence: number }[];
}

export async function runOcr(
  imageSource: string | File | Blob,
  language: string = 'eng',
  onProgress?: (progress: number, status: string) => void
): Promise<OcrResult> {
  const worker = await createWorker(language, 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && m.progress !== undefined) {
        onProgress?.(Math.round(m.progress * 100), 'Recognizing characters...');
      } else if (m.status) {
        onProgress?.(20, `Loading ${m.status}...`);
      }
    },
  });

  const ret = await worker.recognize(imageSource);
  await worker.terminate();

  return {
    text: ret.data.text,
    confidence: Math.round(ret.data.confidence),
    lines: (ret.data.lines || []).map((l) => ({
      text: l.text,
      confidence: Math.round(l.confidence),
    })),
  };
}
