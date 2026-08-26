import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import jsPDF from 'jspdf';
import { marked } from 'marked';

/**
 * Merge multiple PDF file ArrayBuffers into a single unified PDF.
 */
export async function mergePdfs(pdfBuffers: ArrayBuffer[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const buffer of pdfBuffers) {
    const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Split a PDF into separate pages or ranges.
 */
export async function splitPdf(
  pdfBuffer: ArrayBuffer,
  mode: 'all' | 'range' | 'every',
  rangeStr?: string
): Promise<{ name: string; bytes: Uint8Array }[]> {
  const srcDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();
  const results: { name: string; bytes: Uint8Array }[] = [];

  if (mode === 'all') {
    for (let i = 0; i < totalPages; i++) {
      const newDoc = await PDFDocument.create();
      const [copiedPage] = await newDoc.copyPages(srcDoc, [i]);
      newDoc.addPage(copiedPage);
      const bytes = await newDoc.save();
      results.push({ name: `page-${i + 1}.pdf`, bytes });
    }
  } else if (mode === 'range' && rangeStr) {
    // Parse range e.g. "1-3, 5"
    const targetIndices = new Set<number>();
    const parts = rangeStr.split(',').map((p) => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let p = Math.max(1, start); p <= Math.min(totalPages, end); p++) {
            targetIndices.add(p - 1);
          }
        }
      } else {
        const p = Number(part);
        if (!isNaN(p) && p >= 1 && p <= totalPages) {
          targetIndices.add(p - 1);
        }
      }
    }

    const newDoc = await PDFDocument.create();
    const sorted = Array.from(targetIndices).sort((a, b) => a - b);
    const copied = await newDoc.copyPages(srcDoc, sorted);
    copied.forEach((p) => newDoc.addPage(p));
    const bytes = await newDoc.save();
    results.push({ name: `extracted-pages.pdf`, bytes });
  } else {
    // Default fallback: single pages
    for (let i = 0; i < totalPages; i++) {
      const newDoc = await PDFDocument.create();
      const [copiedPage] = await newDoc.copyPages(srcDoc, [i]);
      newDoc.addPage(copiedPage);
      results.push({ name: `page-${i + 1}.pdf`, bytes: await newDoc.save() });
    }
  }

  return results;
}

/**
 * Rotate all pages of a PDF by a given angle (90, 180, 270).
 */
export async function rotatePdfPages(pdfBuffer: ArrayBuffer, angleDeg: number): Promise<Uint8Array> {
  const doc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const pages = doc.getPages();

  for (const page of pages) {
    const currentAngle = page.getRotation().angle;
    page.setRotation(degrees((currentAngle + angleDeg) % 360));
  }

  return await doc.save();
}

/**
 * Reorder and optionally remove pages from a PDF.
 * @param newIndices 0-indexed array of page orders to keep.
 */
export async function reorderPdfPages(pdfBuffer: ArrayBuffer, newIndices: number[]): Promise<Uint8Array> {
  const srcDoc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const newDoc = await PDFDocument.create();
  const copied = await newDoc.copyPages(srcDoc, newIndices);
  copied.forEach((p) => newDoc.addPage(p));
  return await newDoc.save();
}

/**
 * Add a diagonal or centered text watermark across all pages.
 */
export async function watermarkPdf(
  pdfBuffer: ArrayBuffer,
  text: string,
  opacity: number = 0.3,
  hexColor: string = '#ff0000'
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const pages = doc.getPages();

  // Convert hex color to rgb
  const r = parseInt(hexColor.slice(1, 3), 16) / 255 || 1;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255 || 0;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255 || 0;

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textSize = Math.min(width, height) / 10;
    const textWidth = font.widthOfTextAtSize(text, textSize);
    const textHeight = font.heightAtSize(textSize);

    page.drawText(text, {
      x: width / 2 - textWidth / 2 + 50,
      y: height / 2 - textHeight / 2 - 50,
      size: textSize,
      font,
      color: rgb(r, g, b),
      opacity,
      rotate: degrees(45),
    });
  }

  return await doc.save();
}

/**
 * Add page numbering to header or footer.
 */
export async function addPageNumbers(
  pdfBuffer: ArrayBuffer,
  position: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-right' = 'bottom-center',
  formatStr: string = 'Page {n} of {total}'
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const total = pages.length;

  pages.forEach((page, idx) => {
    const { width, height } = page.getSize();
    const n = idx + 1;
    const label = formatStr.replace('{n}', String(n)).replace('{total}', String(total));
    const fontSize = 10;
    const textWidth = font.widthOfTextAtSize(label, fontSize);

    let x = width / 2 - textWidth / 2;
    let y = 20;

    if (position === 'bottom-right') {
      x = width - textWidth - 30;
      y = 20;
    } else if (position === 'bottom-left') {
      x = 30;
      y = 20;
    } else if (position === 'top-right') {
      x = width - textWidth - 30;
      y = height - 30;
    }

    page.drawText(label, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });

  return await doc.save();
}

/**
 * Update document metadata tags (Title, Author, Subject, Keywords).
 */
export async function editPdfMetadata(
  pdfBuffer: ArrayBuffer,
  meta: { title?: string; author?: string; subject?: string; keywords?: string }
): Promise<Uint8Array> {
  const doc = await PDFDocument.load(pdfBuffer, { ignoreEncryption: true });
  if (meta.title) doc.setTitle(meta.title);
  if (meta.author) doc.setAuthor(meta.author);
  if (meta.subject) doc.setSubject(meta.subject);
  if (meta.keywords) doc.setKeywords(meta.keywords.split(',').map((k) => k.trim()));
  doc.setProducer('DocuOmni Pro Engine');
  return await doc.save();
}

/**
 * Convert multiple image ArrayBuffers into a single styled PDF.
 */
export async function imagesToPdf(
  images: { buffer: ArrayBuffer; mimeType: string }[],
  options?: { orientation?: 'auto' | 'portrait' | 'landscape'; margin?: 'none' | 'small' | 'big' }
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const marginSize = options?.margin === 'none' ? 0 : options?.margin === 'big' ? 40 : 20;

  for (const img of images) {
    let embeddedImg;
    if (img.mimeType.includes('png')) {
      embeddedImg = await doc.embedPng(img.buffer);
    } else {
      embeddedImg = await doc.embedJpg(img.buffer);
    }

    const { width: imgW, height: imgH } = embeddedImg;
    let pageW = imgW + marginSize * 2;
    let pageH = imgH + marginSize * 2;

    if (options?.orientation === 'portrait') {
      pageW = 595.28; // A4 standard
      pageH = 841.89;
    } else if (options?.orientation === 'landscape') {
      pageW = 841.89;
      pageH = 595.28;
    }

    const page = doc.addPage([pageW, pageH]);
    const maxDrawW = pageW - marginSize * 2;
    const maxDrawH = pageH - marginSize * 2;
    const scale = Math.min(maxDrawW / imgW, maxDrawH / imgH, 1);
    const drawW = imgW * scale;
    const drawH = imgH * scale;

    page.drawImage(embeddedImg, {
      x: (pageW - drawW) / 2,
      y: (pageH - drawH) / 2,
      width: drawW,
      height: drawH,
    });
  }

  return await doc.save();
}

/**
 * Convert plain text or TXT file to a clean paginated PDF.
 */
export async function textToPdf(text: string, options?: { fontSize?: number }): Promise<Uint8Array> {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const fontSize = options?.fontSize || 12;
  pdf.setFontSize(fontSize);
  pdf.setFont('helvetica', 'normal');

  const lines = pdf.splitTextToSize(text, 515); // A4 width 595 - 40 margin each side
  const pageHeight = 841;
  const lineHeight = fontSize * 1.5;
  let cursorY = 50;

  for (let i = 0; i < lines.length; i++) {
    if (cursorY + lineHeight > pageHeight - 50) {
      pdf.addPage();
      cursorY = 50;
    }
    pdf.text(lines[i], 40, cursorY);
    cursorY += lineHeight;
  }

  const arrayBuffer = pdf.output('arraybuffer');
  return new Uint8Array(arrayBuffer);
}

/**
 * Convert Markdown string to PDF.
 */
export async function markdownToPdf(markdown: string): Promise<Uint8Array> {
  // Convert markdown to clean structured plain text or styled paragraphs
  const parsedHtml = await marked.parse(markdown);
  // Strip tags for clean structured rendering
  const cleanText = markdown;
  return await textToPdf(cleanText, { fontSize: 11 });
}
