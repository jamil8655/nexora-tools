import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

/**
 * Parse Word DOCX file into HTML and plain text.
 */
export async function parseDocx(file: File): Promise<{ html: string; text: string; messages: string[] }> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const rawTextResult = await mammoth.extractRawText({ arrayBuffer });

  return {
    html: result.value,
    text: rawTextResult.value,
    messages: result.messages.map((m) => m.message),
  };
}

/**
 * Convert DOCX file to a clean PDF.
 */
export async function docxToPdf(file: File): Promise<Uint8Array> {
  const { text } = await parseDocx(file);
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const lines = pdf.splitTextToSize(text || 'Empty Document', 515);

  let cursorY = 50;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');

  for (let i = 0; i < lines.length; i++) {
    if (cursorY + 16 > 800) {
      pdf.addPage();
      cursorY = 50;
    }
    pdf.text(lines[i], 40, cursorY);
    cursorY += 16;
  }

  return new Uint8Array(pdf.output('arraybuffer'));
}

/**
 * Parse Excel XLSX or CSV file into tabular JSON data.
 */
export async function parseSpreadsheet(file: File): Promise<{ sheetNames: string[]; data: any[][] }> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

  return {
    sheetNames: workbook.SheetNames,
    data: jsonData,
  };
}

/**
 * Convert Excel / CSV spreadsheet data into a styled PDF table.
 */
export async function spreadsheetToPdf(file: File): Promise<Uint8Array> {
  const { data, sheetNames } = await parseSpreadsheet(file);
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'landscape' });

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Spreadsheet Export: ${sheetNames[0] || 'Sheet 1'}`, 40, 40);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');

  let cursorY = 70;
  const maxRowsPerPage = 25;
  const colWidth = 100;

  data.forEach((row, rowIdx) => {
    if (cursorY > 540) {
      pdf.addPage();
      cursorY = 50;
    }

    // Row background highlight for header
    if (rowIdx === 0) {
      pdf.setFillColor(240, 244, 248);
      pdf.rect(35, cursorY - 12, 770, 18, 'F');
      pdf.setFont('helvetica', 'bold');
    } else {
      pdf.setFont('helvetica', 'normal');
    }

    const rowCells = (row || []).slice(0, 7); // Max 7 columns for landscape fit
    rowCells.forEach((cell, colIdx) => {
      const text = String(cell !== undefined && cell !== null ? cell : '').slice(0, 18);
      pdf.text(text, 40 + colIdx * colWidth, cursorY);
    });

    cursorY += 18;
  });

  return new Uint8Array(pdf.output('arraybuffer'));
}
