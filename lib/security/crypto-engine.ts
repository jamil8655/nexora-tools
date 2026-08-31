export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA-1';

// Simple JS SHA-256 fallback if crypto.subtle is unavailable
function simpleSha256Fallback(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

export async function generateTextHash(
  text: string,
  algorithm: HashAlgorithm = 'SHA-256'
): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await window.crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('SubtleCrypto error, falling back:', e);
  }
  return simpleSha256Fallback(text);
}

export async function generateFileHash(
  file: File,
  algorithm: HashAlgorithm = 'SHA-256'
): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await window.crypto.subtle.digest(algorithm, arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (e) {
    console.warn('SubtleCrypto error on file:', e);
  }
  return file.name + '_' + file.size;
}

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  length: number;
  entropy: number;
  crackTime: string;
}

export function checkPasswordStrength(pass: string): PasswordStrength {
  const hasLower = /[a-z]/.test(pass);
  const hasUpper = /[A-Z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);
  const hasSymbol = /[^A-Za-z0-9]/.test(pass);
  const len = pass.length;

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 32;

  const entropy = len > 0 && poolSize > 0 ? Math.round(len * Math.log2(poolSize)) : 0;

  let score = 0;
  if (len >= 8) score += 1;
  if (len >= 12 && entropy >= 50) score += 1;
  if (hasLower && hasUpper && hasNumber) score += 1;
  if (hasSymbol && len >= 14) score += 1;

  let crackTime = 'Instant';
  if (entropy > 80) crackTime = 'Trillions of years';
  else if (entropy > 60) crackTime = 'Centuries';
  else if (entropy > 45) crackTime = 'Few months';
  else if (entropy > 30) crackTime = 'Few hours';

  const labels: Array<PasswordStrength['label']> = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const colors = [
    'text-rose-500 bg-rose-500',
    'text-orange-500 bg-orange-500',
    'text-amber-500 bg-amber-500',
    'text-emerald-500 bg-emerald-500',
    'text-teal-500 bg-teal-500',
  ];

  return {
    score,
    label: labels[score] || 'Very Weak',
    color: colors[score] || colors[0],
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length: len,
    entropy,
    crackTime,
  };
}

export function generateUuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generatePassword(options: PasswordOptions): string {
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lower = 'abcdefghijklmnopqrstuvwxyz';
  let nums = '0123456789';
  let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (options.excludeAmbiguous) {
    upper = upper.replace(/[O]/g, '');
    lower = lower.replace(/[ol]/g, '');
    nums = nums.replace(/[01]/g, '');
    symbols = symbols.replace(/[|]/g, '');
  }

  let pool = '';
  if (options.includeUppercase) pool += upper;
  if (options.includeLowercase) pool += lower;
  if (options.includeNumbers) pool += nums;
  if (options.includeSymbols) pool += symbols;

  if (!pool) pool = lower + nums;

  let password = '';
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomValues = new Uint32Array(options.length);
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < options.length; i++) {
      password += pool[randomValues[i] % pool.length];
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      password += pool[Math.floor(Math.random() * pool.length)];
    }
  }

  return password;
}
