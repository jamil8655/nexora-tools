'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase/firebase-client';
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
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type UserRole = 'admin' | 'user' | 'guest';

export interface AuthUser {
  uid: string;
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
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Primary Admin Email List
export const SUPER_ADMIN_EMAILS = [
  'jamil8655@gmail.com',
  'hafizjamilurrahman@gmail.com',
  'jamilurrahman@gmail.com',
  'jamil8655@users.noreply.github.com',
];

export function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  return SUPER_ADMIN_EMAILS.includes(clean);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    // 100% Real Firebase Authentication State Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        let userRole: UserRole = isSuperAdminEmail(email) ? 'admin' : 'user';

        // Check Firestore user document for role (if available)
        try {
          if (db) {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              if (data?.role === 'admin') {
                userRole = 'admin';
              }
            } else {
              // Create user record in Firestore
              await setDoc(
                userDocRef,
                {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email || '',
                  displayName: firebaseUser.displayName || '',
                  role: userRole,
                  createdAt: Date.now(),
                  lastLoginAt: Date.now(),
                },
                { merge: true }
              );
            }
          }
        } catch (e) {
          console.warn('Firestore user profile sync error:', e);
        }

        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || undefined,
          photoURL: firebaseUser.photoURL || undefined,
          role: userRole,
        };

        setUser(authUser);
        setRole(userRole);
      } else {
        setUser(null);
        setRole('guest');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. Real Firebase Email & Password Sign-In
  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      return { success: true };
    } catch (err: any) {
      let message = err.message || 'Login failed.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Please enter a valid email address.';
      }
      return { success: false, error: message };
    }
  };

  // 2. Real Firebase Email & Password Sign-Up
  const signupWithEmail = async (email: string, pass: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (cred.user && name) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      return { success: true };
    } catch (err: any) {
      let message = err.message || 'Registration failed.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already registered. Please sign in.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use at least 6 characters.';
      }
      return { success: false, error: message };
    }
  };

  // 3. Real Firebase Google OAuth Sign-In
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (err: any) {
      let message = err.message || 'Google sign-in failed.';
      if (err.code === 'auth/unauthorized-domain' || err.code === 'auth/internal-error') {
        message =
          'Authorized domain required: Please add "jamil8655.github.io" in Firebase Console -> Authentication -> Settings -> Authorized Domains.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        message = 'Google sign-in popup was closed before completing.';
      } else if (err.code === 'auth/popup-blocked') {
        message = 'Popup was blocked by your browser. Please allow popups for this site.';
      }
      return { success: false, error: message };
    }
  };

  // 4. Real Firebase Sign-Out
  const logout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Sign out error:', e);
      }
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
