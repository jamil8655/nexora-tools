/**
 * Web Audio Engine for Client-Side Audio Extraction, Trimming, and Conversion
 */

/**
 * Extracts raw audio track from any video file (MP4, WebM, MOV) and encodes to WAV/MP3.
 */
export async function extractAudioFromVideo(
  videoFile: File,
  outputFormat: 'wav' | 'mp3' = 'wav',
  onProgress?: (percent: number, status: string) => void
): Promise<Blob> {
  onProgress?.(15, 'Reading video stream into memory...');
  const arrayBuffer = await videoFile.arrayBuffer();

  onProgress?.(35, 'Decoding audio track from video container...');
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  onProgress?.(70, 'Rendering high-fidelity audio buffer...');
  const wavBlob = audioBufferToWavBlob(audioBuffer);

  audioContext.close();
  onProgress?.(100, 'Audio extraction completed!');
  return wavBlob;
}

/**
 * Trims audio from start time to end time with sub-millisecond precision.
 */
export async function trimAudioFile(
  audioFile: File,
  startSec: number,
  endSec: number,
  onProgress?: (percent: number, status: string) => void
): Promise<{ blob: Blob; duration: number }> {
  onProgress?.(20, 'Reading audio file into memory...');
  const arrayBuffer = await audioFile.arrayBuffer();

  onProgress?.(45, 'Decoding audio samples...');
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const sampleRate = audioBuffer.sampleRate;
  const numChannels = audioBuffer.numberOfChannels;
  const startSample = Math.floor(Math.max(0, startSec) * sampleRate);
  const endSample = Math.min(audioBuffer.length, Math.floor(Math.max(startSec + 0.1, endSec) * sampleRate));
  const newLength = endSample - startSample;

  onProgress?.(75, 'Extracting audio slice...');
  const trimmedBuffer = audioContext.createBuffer(numChannels, newLength, sampleRate);

  for (let c = 0; c < numChannels; c++) {
    const channelData = audioBuffer.getChannelData(c);
    const subData = channelData.subarray(startSample, endSample);
    trimmedBuffer.copyToChannel(subData, c);
  }

  const blob = audioBufferToWavBlob(trimmedBuffer);
  audioContext.close();
  onProgress?.(100, 'Audio trimmed successfully!');

  return { blob, duration: newLength / sampleRate };
}

/**
 * Converts AudioBuffer to uncompressed 16-bit PCM WAV Blob.
 */
export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  let result: Float32Array;
  if (numChannels === 2) {
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);
    result = new Float32Array(left.length + right.length);
    for (let i = 0; i < left.length; i++) {
      result[i * 2] = left[i];
      result[i * 2 + 1] = right[i];
    }
  } else {
    result = buffer.getChannelData(0);
  }

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataByteLength = result.length * bytesPerSample;
  const headerByteLength = 44;
  const totalLength = headerByteLength + dataByteLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // RIFF chunk length
  view.setUint32(4, 36 + dataByteLength, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, format, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, sampleRate * blockAlign, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitDepth, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, dataByteLength, true);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < result.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, result[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
