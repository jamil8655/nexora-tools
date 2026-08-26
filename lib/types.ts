export type ToolCategory =
  | 'pdf'
  | 'image'
  | 'document'
  | 'convert'
  | 'compress'
  | 'ocr'
  | 'text'
  | 'calculator'
  | 'dev'
  | 'security'
  | 'qr'
  | 'ai'
  | 'utility';

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: ToolCategory;
  icon: string;
  badge?: string;
  popular?: boolean;
  featured?: boolean;
  isClientSide: boolean;
  acceptedMimeTypes: string[];
  acceptedExtensions: string[];
  maxFiles: number;
  maxFileSizeMB: number;
  outputExtension: string;
  outputMimeType: string;
  options?: ToolOption[];
  tags: string[];
  faq?: { question: string; answer: string }[];
}

export interface ToolOption {
  id: string;
  label: string;
  type: 'select' | 'slider' | 'text' | 'password' | 'checkbox' | 'color' | 'radio' | 'number';
  defaultValue: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

export interface ProcessedFile {
  id: string;
  name: string;
  originalSize: number;
  processedSize?: number;
  type: string;
  blob?: Blob;
  dataUrl?: string;
  textResult?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  downloadUrl?: string;
  previewUrl?: string;
  createdAt: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: 'free' | 'pro' | 'enterprise';
  createdAt: number;
  favoriteTools: string[];
  settings: {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'ar' | 'ur' | 'hi';
    autoDeleteMinutes: number;
    showClientBadge: boolean;
    apiKey?: string;
  };
}

export interface ProcessingHistoryItem {
  id: string;
  toolId: string;
  toolName: string;
  fileName: string;
  originalSize: number;
  outputSize?: number;
  timestamp: number;
  success: boolean;
}

export interface SystemMetrics {
  totalConversions: number;
  totalBytesProcessed: number;
  uptimeSeconds: number;
  activeUsers: number;
  clientSidePercentage: number;
  toolUsageCounts: Record<string, number>;
  errorLogs: { id: string; toolId: string; error: string; timestamp: number }[];
}
