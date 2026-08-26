export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA-1';

export async function generateTextHash(
  text: string,
  algorithm: HashAlgorithm = 'SHA-256'
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function generateFileHash(
  file: File,
  algorithm: HashAlgorithm = 'SHA-256'
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
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

  const randomValues = new Uint32Array(options.length);
  crypto.getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += pool[randomValues[i] % pool.length];
  }

  return password;
}

export interface PasswordStrength {
  score: number; // 0 - 4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  entropy: number;
  feedback: string[];
  crackTime: string;
}

export function checkPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'Very Weak',
      entropy: 0,
      feedback: ['Please enter a password'],
      crackTime: 'Instant',
    };
  }

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const entropy = Math.round(password.length * (Math.log2(poolSize || 1)));
  const feedback: string[] = [];

  if (password.length < 8) feedback.push('Use at least 8 characters');
  if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
  if (!/[0-9]/.test(password)) feedback.push('Add numbers');
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add symbols & special characters');

  let score = 0;
  let label: PasswordStrength['label'] = 'Very Weak';
  let crackTime = 'Instant';

  if (entropy < 28) {
    score = 0;
    label = 'Very Weak';
    crackTime = 'A few seconds';
  } else if (entropy < 36) {
    score = 1;
    label = 'Weak';
    crackTime = 'A few minutes';
  } else if (entropy < 60) {
    score = 2;
    label = 'Fair';
    crackTime = 'A few days to weeks';
  } else if (entropy < 80) {
    score = 3;
    label = 'Strong';
    crackTime = 'A few hundred years';
  } else {
    score = 4;
    label = 'Very Strong';
    crackTime = 'Millions of years';
  }

  return {
    score,
    label,
    entropy,
    feedback: feedback.length > 0 ? feedback : ['Excellent password security'],
    crackTime,
  };
}

export function generateUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
