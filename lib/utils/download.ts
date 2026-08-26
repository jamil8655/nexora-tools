import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function downloadSingleFile(blob: Blob, filename: string) {
  saveAs(blob, filename);
}

export async function downloadAsZip(
  files: { name: string; blob: Blob }[],
  zipFilename: string = 'docuomni-processed-files.zip'
) {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file.blob);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, zipFilename);
}
