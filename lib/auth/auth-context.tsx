'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/firebase-client';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';

export type UserRole = 'admin' | 'user' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  loginAdmin: (passcode: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Real Admin Email Whitelist & Wildcards
const ADMIN_WHITELIST_EMAILS = [
  'jamil8655@gmail.com',
  'hafizjamilurrahman@gmail.com',
  'jamilurrahman@gmail.com',
  'hafiz.jamil@nexora.pro',
  'jamil8655@users.noreply.github.com',
  'admin@nexoratools.internal',
];

// Helper to check if an email or user has Super Admin authority
export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  if (ADMIN_WHITELIST_EMAILS.includes(clean)) return true;
  if (clean.includes('jamil8655') || clean.includes('jamilurrahman') || clean.includes('hafizjamil')) return true;
  return false;
}

const ADMIN_PERSIST_KEY = 'nexora_real_admin_auth_v3';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and listen to real Firebase Auth
  useEffect(() => {
    let isMounted = true;

    // Check localStorage fallback for admin session
    const savedRole = typeof window !== 'undefined' ? localStorage.getItem(ADMIN_PERSIST_KEY) : null;
    if (savedRole === 'admin') {
      setUser({
        id: 'adm_jamil_01',
        name: 'Hafiz Jamilurrahman',
        role: 'admin',
        email: 'jamil8655@gmail.com',
      });
      setRole('admin');
      setIsLoading(false);
    }

    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (!isMounted) return;

        if (firebaseUser) {
          const email = firebaseUser.email || '';
          const isSuperAdmin = isUserAdmin(email) || localStorage.getItem(ADMIN_PERSIST_KEY) === 'admin';

          const authUser: AuthUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Hafiz Jamilurrahman',
            email: firebaseUser.email || undefined,
            photoURL: firebaseUser.photoURL || undefined,
            role: isSuperAdmin ? 'admin' : 'user',
          };

          if (isSuperAdmin) {
            localStorage.setItem(ADMIN_PERSIST_KEY, 'admin');
          }

          setUser(authUser);
          setRole(authUser.role);
        } else {
          // If no firebase user is logged in, check if manual admin persist exists
          const persist = typeof window !== 'undefined' ? localStorage.getItem(ADMIN_PERSIST_KEY) : null;
          if (persist === 'admin') {
            setUser({
              id: 'adm_jamil_01',
              name: 'Hafiz Jamilurrahman',
              role: 'admin',
              email: 'jamil8655@gmail.com',
            });
            setRole('admin');
          } else {
            setUser(null);
            setRole('guest');
          }
        }
        setIsLoading(false);
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  // Real Email Sign-in
  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const isSuperAdmin = isUserAdmin(res.user.email);
      if (isSuperAdmin && typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_PERSIST_KEY, 'admin');
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed.' };
    }
  };

  // Real Email Registration
  const signupWithEmail = async (email: string, pass: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (cred.user && name) {
        await updateProfile(cred.user, { displayName: name });
      }
      const isSuperAdmin = isUserAdmin(cred.user.email);
      if (isSuperAdmin && typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_PERSIST_KEY, 'admin');
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed.' };
    }
  };

  // Real 1-Click Google OAuth Sign-in
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const isSuperAdmin = isUserAdmin(res.user.email);
      if (isSuperAdmin && typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_PERSIST_KEY, 'admin');
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Google sign-in cancelled or failed.' };
    }
  };

  // Direct Admin Passkey unlock (Backup for owner)
  const loginAdmin = async (passcode: string): Promise<boolean> => {
    const clean = passcode.trim().toLowerCase();
    if (
      clean === 'nexora@2026' ||
      clean === 'admin123' ||
      clean === 'admin' ||
      clean === 'nexora' ||
      clean === 'hafiz2026' ||
      clean === '123456'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_PERSIST_KEY, 'admin');
      }
      setUser({
        id: user?.id || 'adm_jamil_01',
        name: user?.name || 'Hafiz Jamilurrahman',
        role: 'admin',
        email: user?.email || 'jamil8655@gmail.com',
      });
      setRole('admin');
      return true;
    }
    return false;
  };

  // Real Logout
  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_PERSIST_KEY);
      sessionStorage.removeItem('nexora_auth_session_token');
    }
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {}
    }
    setUser(null);
    setRole('guest');
  };

  const isAuthenticated = !!user;
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isAdmin,
        isLoading,
        loginAdmin,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
