export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
}

export function getTextStats(text: string): TextStats {
  if (!text || text.trim() === '') {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
    };
  }

  const trimmed = text.trim();
  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;
  const lines = text.split(/\r\n|\r|\n/).length;
  const readingTimeMinutes = Math.max(0.1, parseFloat((words / 200).toFixed(1)));
  const speakingTimeMinutes = Math.max(0.1, parseFloat((words / 130).toFixed(1)));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes,
    speakingTimeMinutes,
  };
}

export type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'snake'
  | 'kebab'
  | 'pascal'
  | 'constant';

export function convertCase(text: string, type: CaseType): string {
  if (!text) return '';

  switch (type) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      );
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case 'camel': {
      const words = text.replace(/[^a-zA-Z0-9]/g, ' ').split(/\s+/).filter(Boolean);
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join('');
    }
    case 'pascal': {
      const words = text.replace(/[^a-zA-Z0-9]/g, ' ').split(/\s+/).filter(Boolean);
      return words
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
    }
    case 'snake':
      return text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toLowerCase();
    case 'kebab':
      return text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase();
    case 'constant':
      return text
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .toUpperCase();
    default:
      return text;
  }
}

export function removeDuplicateLines(text: string, caseSensitive: boolean = true): string {
  const lines = text.split(/\r\n|\r|\n/);
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(line);
    }
  }

  return result.join('\n');
}

export function removeExtraSpaces(text: string): string {
  return text
    .split(/\r\n|\r|\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export function sortLines(
  text: string,
  mode: 'a-z' | 'z-a' | 'length-asc' | 'length-desc' | 'reverse' | 'shuffle'
): string {
  const lines = text.split(/\r\n|\r|\n/);

  switch (mode) {
    case 'a-z':
      return lines.sort((a, b) => a.localeCompare(b)).join('\n');
    case 'z-a':
      return lines.sort((a, b) => b.localeCompare(a)).join('\n');
    case 'length-asc':
      return lines.sort((a, b) => a.length - b.length).join('\n');
    case 'length-desc':
      return lines.sort((a, b) => b.length - a.length).join('\n');
    case 'reverse':
      return lines.reverse().join('\n');
    case 'shuffle':
      return lines.sort(() => Math.random() - 0.5).join('\n');
    default:
      return text;
  }
}

export interface DiffLineResult {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
}

export function compareTextDiff(textA: string, textB: string): DiffLineResult[] {
  const linesA = textA.split(/\r\n|\r|\n/);
  const linesB = textB.split(/\r\n|\r|\n/);
  const diffs: DiffLineResult[] = [];

  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    const a = linesA[i];
    const b = linesB[i];

    if (a === b) {
      if (a !== undefined) diffs.push({ type: 'unchanged', value: a });
    } else {
      if (a !== undefined) diffs.push({ type: 'removed', value: a });
      if (b !== undefined) diffs.push({ type: 'added', value: b });
    }
  }

  return diffs;
}
