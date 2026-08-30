export function formatJson(
  input: string,
  spaces: number = 2
): { formatted: string; error?: string } {
  try {
    const parsed = JSON.parse(input);
    if (spaces === 0) {
      return { formatted: JSON.stringify(parsed) };
    }
    return { formatted: JSON.stringify(parsed, null, spaces) };
  } catch (err: any) {
    return { formatted: '', error: err.message || 'Invalid JSON syntax' };
  }
}

export function validateJson(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (err: any) {
    return { valid: false, error: err.message || 'Invalid JSON format' };
  }
}

export function encodeBase64(text: string): string {
  try {
    return btoa(
      encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch (e) {
    return btoa(text);
  }
}

export function decodeBase64(base64: string): { text: string; error?: string } {
  try {
    const decoded = atob(base64);
    try {
      return {
        text: decodeURIComponent(
          decoded
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        ),
      };
    } catch {
      return { text: decoded };
    }
  } catch (err: any) {
    return { text: '', error: 'Invalid Base64 string' };
  }
}

export function encodeUrl(str: string, component: boolean = false): string {
  return component ? encodeURIComponent(str) : encodeURI(str);
}

export function decodeUrl(str: string, component: boolean = false): string {
  return component ? decodeURIComponent(str) : decodeURI(str);
}

/**
 * Generate cryptographically random UUID v4 identifiers.
 */
export function generateUuidV4(count: number = 1, uppercase: boolean = false, hyphens: boolean = true): string[] {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    if (!hyphens) id = id.replace(/-/g, '');
    if (uppercase) id = id.toUpperCase();
    uuids.push(id);
  }
  return uuids;
}

/**
 * Decode and inspect JSON Web Tokens (JWT) client-side.
 */
export function decodeJwt(token: string): {
  header: any;
  payload: any;
  isExpired: boolean;
  issuedAt?: string;
  expiresAt?: string;
  error?: string;
} {
  try {
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      return { header: null, payload: null, isExpired: false, error: 'Invalid JWT structure. Expected 3 dot-separated parts.' };
    }

    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? payload.exp < now : false;
    const issuedAt = payload.iat ? new Date(payload.iat * 1000).toLocaleString() : undefined;
    const expiresAt = payload.exp ? new Date(payload.exp * 1000).toLocaleString() : undefined;

    return { header, payload, isExpired, issuedAt, expiresAt };
  } catch (err: any) {
    return { header: null, payload: null, isExpired: false, error: err.message || 'Failed to decode JWT' };
  }
}

/**
 * Generate realistic Lorem Ipsum dummy content.
 */
export function generateLoremIpsum(paragraphs: number = 3, format: 'paragraphs' | 'sentences' | 'words' = 'paragraphs'): string {
  const dictionary = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vel',
    'hendrerit', 'libero', 'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut', 'orci', 'gravida',
    'imperdiet', 'nullam', 'purus', 'lacinia', 'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
    'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros', 'dictum', 'proin', 'accumsan', 'sapien',
    'nec', 'massa', 'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus', 'quisque', 'porttitor'
  ];

  if (format === 'words') {
    const words: string[] = [];
    for (let i = 0; i < paragraphs * 15; i++) {
      words.push(dictionary[Math.floor(Math.random() * dictionary.length)]);
    }
    return words.join(' ');
  }

  const result: string[] = [];
  for (let p = 0; p < paragraphs; p++) {
    const numSentences = Math.floor(Math.random() * 3) + 4;
    const sentences: string[] = [];
    for (let s = 0; s < numSentences; s++) {
      const numWords = Math.floor(Math.random() * 8) + 8;
      const sentenceWords: string[] = [];
      for (let w = 0; w < numWords; w++) {
        sentenceWords.push(dictionary[Math.floor(Math.random() * dictionary.length)]);
      }
      const sentence = sentenceWords.join(' ');
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
    }
    result.push(sentences.join(' '));
  }

  return result.join('\n\n');
}

export interface TimestampInfo {
  timestampSeconds: number;
  timestampMs: number;
  iso: string;
  utc: string;
  local: string;
  relative: string;
}

export function parseTimestamp(input: number | string): TimestampInfo {
  let ms: number;
  if (typeof input === 'string') {
    const num = Number(input);
    if (!isNaN(num)) {
      ms = input.length === 10 ? num * 1000 : num;
    } else {
      ms = new Date(input).getTime();
    }
  } else {
    ms = input < 10000000000 ? input * 1000 : input;
  }

  const date = new Date(ms);
  const now = Date.now();
  const diffSec = Math.round((now - ms) / 1000);

  let relative = '';
  if (Math.abs(diffSec) < 60) relative = 'Just now';
  else if (Math.abs(diffSec) < 3600) relative = `${Math.floor(Math.abs(diffSec) / 60)} mins ago`;
  else if (Math.abs(diffSec) < 86400) relative = `${Math.floor(Math.abs(diffSec) / 3600)} hours ago`;
  else relative = `${Math.floor(Math.abs(diffSec) / 86400)} days ago`;

  return {
    timestampSeconds: Math.floor(ms / 1000),
    timestampMs: ms,
    iso: date.toISOString(),
    utc: date.toUTCString(),
    local: date.toLocaleString(),
    relative,
  };
}

export interface ColorConversion {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  r: number;
  g: number;
  b: number;
}

export function parseHexColor(hex: string): ColorConversion | null {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) return null;

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  const k = 1 - max;
  const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

  return {
    hex: `#${clean.toUpperCase()}`,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
    cmyk: `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`,
    r,
    g,
    b,
  };
}
