'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateTextHash } from '@/lib/security/crypto-engine';

export type UserRole = 'admin' | 'user' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  loginAdmin: (passcode: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Secure SHA-256 hash of the default administrative master passkey ("admin123" / "nexora@2026")
// Hex of SHA-256("nexora@2026"): 46e01a88b50ea8a264a78fb86622ec9e47caeb8a2e578ad4ba91d9b35bcdd61b
// Hex of SHA-256("admin123"): 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
const VALID_ADMIN_HASHES = [
  '46e01a88b50ea8a264a78fb86622ec9e47caeb8a2e578ad4ba91d9b35bcdd61b', // nexora@2026
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // admin123
];

const SESSION_KEY = 'nexora_auth_session_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and verify session on load
  useEffect(() => {
    const verifySession = async () => {
      try {
        if (typeof window !== 'undefined') {
          const token = sessionStorage.getItem(SESSION_KEY);
          if (token) {
            // Verify token format and validity
            const [prefix, hash, expStr] = token.split('__');
            const exp = parseInt(expStr, 10);
            if (prefix === 'nx_adm' && VALID_ADMIN_HASHES.includes(hash) && exp > Date.now()) {
              setUser({
                id: 'adm_01',
                name: 'Verified Administrator',
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
        console.error('Session verification error:', e);
      }

      // Default state is guest / normal user (Never default to admin)
      setUser(null);
      setRole('guest');
      setIsLoading(false);
    };

    verifySession();
  }, []);

  const loginAdmin = async (passcode: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const inputHash = await generateTextHash(passcode.trim(), 'SHA-256');
      if (VALID_ADMIN_HASHES.includes(inputHash)) {
        const expTime = Date.now() + 8 * 60 * 60 * 1000; // 8 Hour valid session
        const sessionToken = `nx_adm__${inputHash}__${expTime}`;
        sessionStorage.setItem(SESSION_KEY, sessionToken);

        const adminUser: AuthUser = {
          id: 'adm_01',
          name: 'Verified Administrator',
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

  const logout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('nexora_role');
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
