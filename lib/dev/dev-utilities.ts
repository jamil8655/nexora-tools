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

  // Calculate HSL
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

  // Calculate CMYK
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
