import { ProcessingHistoryItem, ProcessedFile } from '../types';

const HISTORY_KEY = 'docuomni_history';
const FAVORITES_KEY = 'docuomni_favorites';
const WORKSPACE_KEY = 'docuomni_workspace';

export function getHistory(): ProcessingHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addHistoryItem(item: Omit<ProcessingHistoryItem, 'id' | 'timestamp'>) {
  if (typeof window === 'undefined') return;
  try {
    const history = getHistory();
    const newItem: ProcessingHistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    const updated = [newItem, ...history.slice(0, 49)];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function clearHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return ['pdf-merge', 'image-to-pdf', 'image-compressor', 'file-size-converter', 'ocr-image-to-text', 'qr-generator'];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['pdf-merge', 'image-to-pdf', 'image-compressor', 'file-size-converter', 'ocr-image-to-text', 'qr-generator'];
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(toolId: string): string[] {
  if (typeof window === 'undefined') return [];
  const current = getFavorites();
  const exists = current.includes(toolId);
  const updated = exists ? current.filter((id) => id !== toolId) : [...current, toolId];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
