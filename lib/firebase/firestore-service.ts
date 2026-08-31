'use client';

// NEXORA Production Firestore Data Service
// Real-time operations for Users, Tools, Jobs, Settings, Analytics

import { db, auth } from './firebase-client';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  DocumentData,
  Unsubscribe,
} from 'firebase/firestore';

// 1. Users Schema
export interface FirestoreUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user' | 'guest';
  plan: 'free' | 'pro' | 'enterprise';
  toolsUsedCount: number;
  totalStorageBytes: number;
  createdAt: number;
  lastLoginAt: number;
}

// 2. Tools Schema
export interface FirestoreToolMeta {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  maintenanceMode: boolean;
  totalExecutions: number;
  lastUsedAt?: number;
}

// 3. Jobs Schema
export interface FirestoreJobRecord {
  id: string;
  uid: string;
  toolId: string;
  toolName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  inputFileName?: string;
  inputFileSizeBytes?: number;
  outputFileUrl?: string;
  errorMessage?: string;
  createdAt: number;
  completedAt?: number;
}

// 4. System Settings Schema
export interface FirestoreSystemSettings {
  maintenanceMode: boolean;
  allowNewRegistrations: boolean;
  maxUploadSizeBytes: number;
  rateLimitPerMinute: number;
  aiFeaturesEnabled: boolean;
  updatedAt: number;
  updatedBy: string;
}

// 5. Analytics Telemetry Schema
export interface FirestoreAnalyticsSummary {
  totalUsers: number;
  totalJobs: number;
  totalToolRuns: number;
  activeToday: number;
  lastUpdated: number;
}

// ==================== REAL DATA METHODS ====================

// --- USERS ---
export async function fetchAllUsers(): Promise<FirestoreUserProfile[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, 'users'), orderBy('lastLoginAt', 'desc'), limit(100));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as FirestoreUserProfile);
  } catch (err) {
    console.warn('fetchAllUsers notice:', err);
    return [];
  }
}

export function subscribeToUsers(callback: (users: FirestoreUserProfile[]) => void): Unsubscribe {
  if (!db) return () => {};
  const q = query(collection(db, 'users'), orderBy('lastLoginAt', 'desc'), limit(100));
  return onSnapshot(
    q,
    (snap) => {
      const users = snap.docs.map((d) => d.data() as FirestoreUserProfile);
      callback(users);
    },
    (err) => {
      console.warn('Users listener notice:', err);
      callback([]);
    }
  );
}

// --- TOOLS CONTROL ---
export async function updateToolStatus(toolId: string, enabled: boolean): Promise<boolean> {
  if (!db) return false;
  try {
    const toolRef = doc(db, 'tools', toolId);
    await setDoc(toolRef, { enabled, updatedAt: Date.now() }, { merge: true });
    return true;
  } catch (err) {
    console.error('updateToolStatus error:', err);
    return false;
  }
}

export function subscribeToTools(callback: (tools: FirestoreToolMeta[]) => void): Unsubscribe {
  if (!db) return () => {};
  const q = query(collection(db, 'tools'));
  return onSnapshot(
    q,
    (snap) => {
      const tools = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreToolMeta));
      callback(tools);
    },
    () => callback([])
  );
}

// --- JOBS QUEUE ---
export async function createJobRecord(job: Omit<FirestoreJobRecord, 'id' | 'createdAt'>): Promise<string | null> {
  if (!db) return null;
  try {
    const jobRef = doc(collection(db, 'jobs'));
    const record: FirestoreJobRecord = {
      id: jobRef.id,
      ...job,
      createdAt: Date.now(),
    };
    await setDoc(jobRef, record);
    return jobRef.id;
  } catch (err) {
    console.error('createJobRecord error:', err);
    return null;
  }
}

export function subscribeToRecentJobs(callback: (jobs: FirestoreJobRecord[]) => void): Unsubscribe {
  if (!db) return () => {};
  const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'), limit(50));
  return onSnapshot(
    q,
    (snap) => {
      const jobs = snap.docs.map((d) => d.data() as FirestoreJobRecord);
      callback(jobs);
    },
    () => callback([])
  );
}

// --- SYSTEM SETTINGS ---
export async function getSystemSettings(): Promise<FirestoreSystemSettings> {
  const defaultSettings: FirestoreSystemSettings = {
    maintenanceMode: false,
    allowNewRegistrations: true,
    maxUploadSizeBytes: 100 * 1024 * 1024, // 100MB
    rateLimitPerMinute: 120,
    aiFeaturesEnabled: true,
    updatedAt: Date.now(),
    updatedBy: 'system',
  };

  if (!db) return defaultSettings;
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'));
    if (snap.exists()) {
      return snap.data() as FirestoreSystemSettings;
    }
  } catch (e) {}
  return defaultSettings;
}

export async function updateSystemSettings(settings: Partial<FirestoreSystemSettings>): Promise<boolean> {
  if (!db) return false;
  try {
    const ref = doc(db, 'settings', 'general');
    await setDoc(
      ref,
      {
        ...settings,
        updatedAt: Date.now(),
        updatedBy: auth?.currentUser?.email || 'admin',
      },
      { merge: true }
    );
    return true;
  } catch (err) {
    console.error('updateSystemSettings error:', err);
    return false;
  }
}
