'use client';

import React from 'react';
import { TOOLS_LIST } from '@/lib/tools-config';
import { ToolLayout } from '@/components/shared/ToolLayout';
import {
  mergePdfs,
  splitPdf,
  compressPdf,
  rotatePdfPages,
  reorderPdfPages,
  watermarkPdf,
  addPageNumbers,
  editPdfMetadata,
  imagesToPdf,
  textToPdf,
  markdownToPdf,
} from '@/lib/pdf/pdf-manipulator';
import { compressPdfAdvanced } from '@/lib/pdf/pdf-compressor';
import {
  convertImage,
  resizeImage,
  rotateAndFlipImage,
  compressImage,
  stripExifAndMetadata,
  watermarkImage,
} from '@/lib/image/image-manipulator';
import { docxToPdf, pdfToDocx, spreadsheetToPdf } from '@/lib/documents/doc-converter';
import { StorageUnitConverter } from '@/components/calculators/StorageUnitConverter';
import { BandwidthCalculator } from '@/components/calculators/BandwidthCalculator';
import { DpiCalculator } from '@/components/calculators/DpiCalculator';
import { GeneralUnitConverter } from '@/components/calculators/GeneralUnitConverter';
import { MathCalculators } from '@/components/calculators/MathCalculators';
import { QrGenerator } from '@/components/qr/QrGenerator';
import { BarcodeStudio } from '@/components/qr/BarcodeStudio';
import { VisualPdfEditor } from '@/components/pdf/VisualPdfEditor';
import { OcrStudio } from '@/components/ocr/OcrStudio';
import { TextStudio } from '@/components/text/TextStudio';
import { TextDiffViewer } from '@/components/text/TextDiffViewer';
import { JsonStudio } from '@/components/dev/JsonStudio';
import { Base64Studio } from '@/components/dev/Base64Studio';
import { TimestampStudio } from '@/components/dev/TimestampStudio';
import { ColorStudio } from '@/components/dev/ColorStudio';
import { HashStudio } from '@/components/security/HashStudio';
import { PasswordStudio } from '@/components/security/PasswordStudio';
import { AiStudio } from '@/components/ai/AiStudio';
import { MediaDownloaderStudio } from '@/components/media/MediaDownloaderStudio';
import { VideoToMp3Studio } from '@/components/media/VideoToMp3Studio';
import { FaviconStudio } from '@/components/image/FaviconStudio';
import { JwtStudio } from '@/components/dev/JwtStudio';
import { UuidStudio } from '@/components/dev/UuidStudio';
import { AudioCutterStudio } from '@/components/media/AudioCutterStudio';
import { AudioBoosterStudio } from '@/components/media/AudioBoosterStudio';
import { AudioSpeedStudio } from '@/components/media/AudioSpeedStudio';
import { ColorPaletteStudio } from '@/components/image/ColorPaletteStudio';
import { PdfOrganizerStudio } from '@/components/pdf/PdfOrganizerStudio';
import { MarkdownLiveStudio } from '@/components/dev/MarkdownLiveStudio';

export function ToolPageClient({ toolId }: { toolId: string }) {
  const tool = TOOLS_LIST.find((t) => t.id === toolId || t.slug === toolId);

  if (!tool) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Tool Not Found</h2>
        <p className="text-xs text-slate-500">The tool you requested could not be located in our registry.</p>
      </div>
    );
  }

  // Handle custom workspaces for interactive utility tools
  let customWorkspace: React.ReactNode = null;

  if (tool.id === 'file-size-converter') {
    customWorkspace = <StorageUnitConverter />;
  } else if (tool.id === 'general-unit-converter') {
    customWorkspace = <GeneralUnitConverter />;
  } else if (tool.id === 'bandwidth-calculator') {
    customWorkspace = <BandwidthCalculator />;
  } else if (tool.id === 'math-calculators') {
    customWorkspace = <MathCalculators />;
  } else if (tool.id === 'dpi-calculator' || tool.id === 'aspect-ratio-calculator') {
    customWorkspace = <DpiCalculator />;
  } else if (tool.id === 'qr-generator') {
    customWorkspace = <QrGenerator />;
  } else if (tool.id === 'barcode-generator') {
    customWorkspace = <BarcodeStudio />;
  } else if (tool.id === 'ocr-image-to-text') {
    customWorkspace = <OcrStudio />;
  } else if (tool.id === 'word-counter' || tool.id === 'case-converter' || tool.id === 'duplicate-remover') {
    customWorkspace = <TextStudio />;
  } else if (tool.id === 'text-diff') {
    customWorkspace = <TextDiffViewer />;
  } else if (tool.id === 'json-formatter') {
    customWorkspace = <JsonStudio />;
  } else if (tool.id === 'base64-converter') {
    customWorkspace = <Base64Studio />;
  } else if (tool.id === 'timestamp-converter') {
    customWorkspace = <TimestampStudio />;
  } else if (tool.id === 'color-converter') {
    customWorkspace = <ColorStudio />;
  } else if (tool.id === 'hash-generator') {
    customWorkspace = <HashStudio />;
  } else if (tool.id === 'password-generator') {
    customWorkspace = <PasswordStudio />;
  } else if (tool.id === 'ai-summarizer') {
    customWorkspace = <AiStudio />;
  } else if (tool.id === 'video-to-mp3') {
    customWorkspace = <VideoToMp3Studio />;
  } else if (tool.id === 'favicon-generator') {
    customWorkspace = <FaviconStudio />;
  } else if (tool.id === 'jwt-decoder') {
    customWorkspace = <JwtStudio />;
  } else if (tool.id === 'uuid-generator') {
    customWorkspace = <UuidStudio />;
  } else if (tool.id === 'audio-cutter') {
    customWorkspace = <AudioCutterStudio />;
  } else if (tool.id === 'audio-booster') {
    customWorkspace = <AudioBoosterStudio />;
  } else if (tool.id === 'audio-speed') {
    customWorkspace = <AudioSpeedStudio />;
  } else if (tool.id === 'image-palette') {
    customWorkspace = <ColorPaletteStudio />;
  } else if (tool.id === 'pdf-organizer') {
    customWorkspace = <PdfOrganizerStudio />;
  } else if (tool.id === 'markdown-editor') {
    customWorkspace = <MarkdownLiveStudio />;
  } else if (tool.category === 'media' || tool.id.includes('downloader') || tool.id === 'whatsapp-status-saver') {
    customWorkspace = <MediaDownloaderStudio />;
  }

  // Centralized real processing dispatcher
  const handleProcess = async (
    files: File[],
    options: Record<string, any>,
    onProgress: (percent: number, statusText: string) => void
  ) => {
    onProgress(15, 'Reading input files into memory...');

    // 1. PDF MERGE
    if (tool.id === 'pdf-merge') {
      onProgress(30, 'Reading PDF documents...');
      const buffers = await Promise.all(files.map((f) => f.arrayBuffer()));
      onProgress(60, 'Merging PDF pages and font tables...');
      const mergedBytes = await mergePdfs(buffers);
      onProgress(100, 'Merge completed!');
      const blob = new Blob([mergedBytes as any], { type: 'application/pdf' });
      return [
        {
          name: 'merged-document.pdf',
          originalSize: files.reduce((a, f) => a + f.size, 0),
          processedSize: blob.size,
          blob,
        },
      ];
    }

    // 2. PDF SPLIT
    if (tool.id === 'pdf-split') {
      onProgress(30, 'Analyzing PDF page count...');
      const buffer = await files[0].arrayBuffer();
      onProgress(65, 'Extracting individual pages...');
      const splitResults = await splitPdf(buffer, options.splitMode || 'all', options.pageRange);
      onProgress(100, 'Split completed!');
      return splitResults.map((r) => {
        const b = new Blob([r.bytes as any], { type: 'application/pdf' });
        return {
          name: r.name,
          originalSize: files[0].size,
          processedSize: b.size,
          blob: b,
        };
      });
    }

    // 3. PDF ROTATE
    if (tool.id === 'pdf-rotate') {
      onProgress(40, 'Rotating PDF pages...');
      const angle = parseInt(options.angle || '90');
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const buffer = await f.arrayBuffer();
        const rotatedBytes = await rotatePdfPages(buffer, angle);
        const blob = new Blob([rotatedBytes as any], { type: 'application/pdf' });
        results.push({
          name: `rotated-${f.name}`,
          originalSize: f.size,
          processedSize: blob.size,
          blob,
        });
      }
      return results;
    }

    // 4. PDF WATERMARK
    if (tool.id === 'pdf-watermark') {
      onProgress(40, 'Applying watermark stamp to all pages...');
      const results = [];
      for (const f of files) {
        const buffer = await f.arrayBuffer();
        const stampedBytes = await watermarkPdf(
          buffer,
          options.text || 'CONFIDENTIAL',
          options.opacity || 0.3,
          options.color || '#ff0000'
        );
        const blob = new Blob([stampedBytes as any], { type: 'application/pdf' });
        results.push({
          name: `watermarked-${f.name}`,
          originalSize: f.size,
          processedSize: blob.size,
          blob,
        });
      }
      return results;
    }

    // 5. PDF PAGE NUMBERS
    if (tool.id === 'pdf-page-numbers') {
      onProgress(40, 'Rendering page number headers/footers...');
      const results = [];
      for (const f of files) {
        const buffer = await f.arrayBuffer();
        const bytes = await addPageNumbers(buffer, options.position, options.format);
        const blob = new Blob([bytes as any], { type: 'application/pdf' });
        results.push({
          name: `numbered-${f.name}`,
          originalSize: f.size,
          processedSize: blob.size,
          blob,
        });
      }
      return results;
    }

    // 6. PDF METADATA
    if (tool.id === 'pdf-metadata') {
      onProgress(40, 'Writing document properties and tags...');
      const buffer = await files[0].arrayBuffer();
      const bytes = await editPdfMetadata(buffer, {
        title: options.title,
        author: options.author,
        subject: options.subject,
        keywords: options.keywords,
      });
      const blob = new Blob([bytes as any], { type: 'application/pdf' });
      return [
        {
          name: `updated-${files[0].name}`,
          originalSize: files[0].size,
          processedSize: blob.size,
          blob,
        },
      ];
    }

    // 7. IMAGE TO PDF
    if (tool.id === 'image-to-pdf') {
      onProgress(30, 'Encoding images into PDF canvas...');
      const imageBuffers = await Promise.all(
        files.map(async (f) => ({
          buffer: await f.arrayBuffer(),
          mimeType: f.type || 'image/jpeg',
        }))
      );
      onProgress(70, 'Building paginated PDF document...');
      const pdfBytes = await imagesToPdf(imageBuffers, {
        orientation: options.orientation || 'auto',
        margin: options.margin || 'small',
      });
      onProgress(100, 'PDF created successfully!');
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      return [
        {
          name: 'converted-images.pdf',
          originalSize: files.reduce((a, f) => a + f.size, 0),
          processedSize: blob.size,
          blob,
        },
      ];
    }

    // 8. TEXT / TXT / MD TO PDF
    if (tool.id === 'text-to-pdf' || tool.id === 'markdown-to-pdf') {
      onProgress(40, 'Parsing text lines and typesetting...');
      const text = await files[0].text();
      const pdfBytes =
        tool.id === 'markdown-to-pdf'
          ? await markdownToPdf(text)
          : await textToPdf(text, { fontSize: parseInt(options.fontSize || '12') });
      onProgress(100, 'PDF compiled!');
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      return [
        {
          name: `${files[0].name.replace(/\.[^/.]+$/, '')}.pdf`,
          originalSize: files[0].size,
          processedSize: blob.size,
          blob,
        },
      ];
    }

    // 9. IMAGE CONVERTER (JPG, PNG, WebP)
    if (tool.id === 'image-converter' || tool.id === 'jpg-to-png' || tool.id === 'png-to-jpg') {
      const targetMime =
        tool.id === 'jpg-to-png'
          ? 'image/png'
          : tool.id === 'png-to-jpg'
          ? 'image/jpeg'
          : options.targetFormat || 'image/png';
      const ext = targetMime === 'image/jpeg' ? 'jpg' : targetMime === 'image/webp' ? 'webp' : 'png';

      const results = [];
      for (let i = 0; i < files.length; i++) {
        onProgress(Math.round(((i + 1) / files.length) * 90), `Converting image ${i + 1} of ${files.length}...`);
        const converted = await convertImage(files[i], targetMime, options.quality || 0.9);
        results.push({
          name: `${files[i].name.replace(/\.[^/.]+$/, '')}.${ext}`,
          originalSize: files[i].size,
          processedSize: converted.blob.size,
          blob: converted.blob,
          dataUrl: converted.dataUrl,
        });
      }
      return results;
    }

    // 10. PDF COMPRESSOR
    if (tool.id === 'pdf-compress') {
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const buffer = await file.arrayBuffer();
        const compressRes = await compressPdfAdvanced(
          buffer,
          {
            level: options.level || 'medium',
            targetSizeLimit: options.targetSizeLimit || 'auto',
          },
          (pct, status) => {
            const overallPct = Math.round(((i + pct / 100) / files.length) * 100);
            onProgress(overallPct, status);
          }
        );
        const blob = new Blob([compressRes.bytes as any], { type: 'application/pdf' });
        results.push({
          name: `compressed-${file.name}`,
          originalSize: file.size,
          processedSize: blob.size,
          blob,
        });
      }
      onProgress(100, 'PDF compression completed!');
      return results;
    }

    // 11. IMAGE COMPRESSOR
    if (tool.id === 'image-compressor') {
      let qualityFactor = parseFloat(options.quality || '0.75');
      const target = options.targetSizeLimit || 'auto';
      if (target === '50kb') qualityFactor = 0.35;
      else if (target === '100kb') qualityFactor = 0.50;
      else if (target === '200kb') qualityFactor = 0.65;
      else if (target === '500kb') qualityFactor = 0.75;
      else if (target === '1mb') qualityFactor = 0.85;
      else if (target === '2mb') qualityFactor = 0.90;

      const results = [];
      for (let i = 0; i < files.length; i++) {
        onProgress(Math.round(((i + 1) / files.length) * 90), `Compressing ${files[i].name}...`);
        const compressed = await compressImage(files[i], qualityFactor);
        results.push({
          name: `compressed-${files[i].name}`,
          originalSize: files[i].size,
          processedSize: compressed.blob.size,
          blob: compressed.blob,
          dataUrl: compressed.dataUrl,
        });
      }
      return results;
    }

    // 11. IMAGE RESIZER
    if (tool.id === 'image-resizer') {
      onProgress(40, 'Resizing image dimensions...');
      const targetW = parseInt(options.width || '1200');
      const targetH = parseInt(options.height || '800');
      const results = [];
      for (const f of files) {
        const resized = await resizeImage(f, targetW, targetH, options.maintainAspect);
        results.push({
          name: `resized-${f.name}`,
          originalSize: f.size,
          processedSize: resized.blob.size,
          blob: resized.blob,
          dataUrl: resized.dataUrl,
        });
      }
      return results;
    }

    // 12. IMAGE ROTATE & FLIP
    if (tool.id === 'image-rotate-flip') {
      onProgress(40, 'Transforming image orientation...');
      const results = [];
      for (const f of files) {
        const transformed = await rotateAndFlipImage(f, options.action || 'rotate-90');
        results.push({
          name: `transformed-${f.name}`,
          originalSize: f.size,
          processedSize: transformed.blob.size,
          blob: transformed.blob,
          dataUrl: transformed.dataUrl,
        });
      }
      return results;
    }

    // 13. IMAGE EXIF STRIPPER
    if (tool.id === 'image-exif') {
      onProgress(40, 'Stripping GPS, camera model, and metadata tags...');
      const results = [];
      for (const f of files) {
        const sanitized = await stripExifAndMetadata(f);
        results.push({
          name: `sanitized-${f.name}`,
          originalSize: f.size,
          processedSize: sanitized.blob.size,
          blob: sanitized.blob,
          dataUrl: sanitized.dataUrl,
        });
      }
      return results;
    }

    // 14. PDF TO WORD (DOCX)
    if (tool.id === 'pdf-to-docx' || tool.id === 'pdf-to-word') {
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        onProgress(Math.round(((i + 1) / files.length) * 80), `Converting ${f.name} to editable Word document...`);
        const docxBlob = await pdfToDocx(f, onProgress);
        results.push({
          name: `${f.name.replace(/\.pdf$/i, '')}.docx`,
          originalSize: f.size,
          processedSize: docxBlob.size,
          blob: docxBlob,
        });
      }
      onProgress(100, 'Word conversion completed!');
      return results;
    }

    // 15. WORD DOCX TO PDF
    if (tool.id === 'docx-to-pdf') {
      onProgress(40, 'Parsing Word XML document structure...');
      const results = [];
      for (const f of files) {
        const pdfBytes = await docxToPdf(f);
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        results.push({
          name: `${f.name.replace(/\.[^/.]+$/, '')}.pdf`,
          originalSize: f.size,
          processedSize: blob.size,
          blob,
        });
      }
      return results;
    }

    // 15. EXCEL XLSX / CSV TO PDF
    if (tool.id === 'excel-to-pdf') {
      onProgress(40, 'Parsing spreadsheet worksheets and tables...');
      const results = [];
      for (const f of files) {
        const pdfBytes = await spreadsheetToPdf(f);
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        results.push({
          name: `${f.name.replace(/\.[^/.]+$/, '')}.pdf`,
          originalSize: f.size,
          processedSize: blob.size,
          blob,
        });
      }
      return results;
    }

    // 16. PDF TO IMAGE / PAGES
    if (tool.id === 'pdf-to-image' || tool.id === 'pdf-to-jpg') {
      onProgress(30, 'Reading PDF pages...');
      const buffer = await files[0].arrayBuffer();
      onProgress(70, 'Extracting individual pages...');
      const splitResults = await splitPdf(buffer, 'all');
      onProgress(100, 'Pages extracted!');
      return splitResults.map((r) => {
        const b = new Blob([r.bytes as any], { type: 'application/pdf' });
        return {
          name: r.name,
          originalSize: files[0].size,
          processedSize: b.size,
          blob: b,
        };
      });
    }

    // Default fallback: return files as is
    return files.map((f) => ({
      name: `processed-${f.name}`,
      originalSize: f.size,
      processedSize: f.size,
      blob: f,
    }));
  };

  return <ToolLayout tool={tool} onProcess={handleProcess} customWorkspace={customWorkspace} />;
}
