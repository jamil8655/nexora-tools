'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateTextHash } from '@/lib/security/crypto-engine';
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

// SHA-256 hashes of master admin passkeys: "nexora@2026" & "admin123"
const VALID_ADMIN_HASHES = [
  '46e01a88b50ea8a264a78fb86622ec9e47caeb8a2e578ad4ba91d9b35bcdd61b', // nexora@2026
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // admin123
];

const ADMIN_SESSION_KEY = 'nexora_auth_session_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check Admin Session Token first
    try {
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (token) {
          const [prefix, hash, expStr] = token.split('__');
          const exp = parseInt(expStr, 10);
          if (prefix === 'nx_adm' && VALID_ADMIN_HASHES.includes(hash) && exp > Date.now()) {
            setUser({
              id: 'adm_01',
              name: 'Hafiz Jamilurrahman (Admin)',
              role: 'admin',
              email: 'admin@nexoratools.internal',
            });
            setRole('admin');
            setIsLoading(false);
            return;
          }
        }
      }
    } catch (e) {
      console.error('Session check error:', e);
    }

    // 2. Listen to real Firebase Auth state changes
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const isSuperAdminEmail =
            firebaseUser.email === 'admin@nexoratools.internal' ||
            firebaseUser.email?.toLowerCase().includes('admin');

          const authUser: AuthUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            email: firebaseUser.email || undefined,
            photoURL: firebaseUser.photoURL || undefined,
            role: isSuperAdminEmail ? 'admin' : 'user',
          };
          setUser(authUser);
          setRole(authUser.role);
        } else {
          setUser(null);
          setRole('guest');
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Admin Master Passkey Login
  const loginAdmin = async (passcode: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const inputHash = await generateTextHash(passcode.trim(), 'SHA-256');
      if (VALID_ADMIN_HASHES.includes(inputHash)) {
        const expTime = Date.now() + 8 * 60 * 60 * 1000;
        const sessionToken = `nx_adm__${inputHash}__${expTime}`;
        sessionStorage.setItem(ADMIN_SESSION_KEY, sessionToken);

        const adminUser: AuthUser = {
          id: 'adm_01',
          name: 'Hafiz Jamilurrahman (Admin)',
          role: 'admin',
          email: 'admin@nexoratools.internal',
        };
        setUser(adminUser);
        setRole('admin');
        setIsLoading(false);
        return true;
      }
    } catch (e) {
      console.error('Admin login error:', e);
    }

    setIsLoading(false);
    return false;
  };

  // Firebase Email/Password Sign-In
  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      await signInWithEmailAndPassword(auth, email, pass);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed. Please check credentials.' };
    }
  };

  // Firebase Email/Password Registration
  const signupWithEmail = async (email: string, pass: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user && name) {
        await updateProfile(cred.user, { displayName: name });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed.' };
    }
  };

  // Firebase Google OAuth Sign-In
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Google sign-in cancelled or failed.' };
    }
  };

  // Logout
  const logout = async () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem('nexora_role');
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
  const isAdmin = isAuthenticated && role === 'admin';

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
