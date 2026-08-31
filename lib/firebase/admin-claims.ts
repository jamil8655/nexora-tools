'use client';

// NEXORA Enterprise Admin Custom Claims & Cryptographic Role Validator
import { User, getIdTokenResult, IdTokenResult } from 'firebase/auth';
import { db } from './firebase-client';
import { doc, getDoc } from 'firebase/firestore';

export interface AdminClaims {
  admin?: boolean;
  super_admin?: boolean;
  role?: 'admin' | 'user' | 'moderator';
  permissions?: string[];
}

/**
 * Checks if a Firebase User possesses Admin Custom Claims on their JWT ID Token
 */
export async function verifyUserAdminClaims(user: User | null, forceRefresh = false): Promise<boolean> {
  if (!user) return false;

  try {
    // 1. Check Cryptographic Custom Claims on Firebase ID Token
    const idTokenResult: IdTokenResult = await getIdTokenResult(user, forceRefresh);
    const claims = idTokenResult.claims as AdminClaims;

    if (claims.admin === true || claims.super_admin === true || claims.role === 'admin') {
      return true;
    }

    // 2. Check Firestore /users/{uid} document for verified role
    if (db) {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.role === 'admin' || data.isAdmin === true || data.isSuperAdmin === true) {
          return true;
        }
      }

      // Check /admins/{uid} collection
      const adminRef = doc(db, 'admins', user.uid);
      const adminSnap = await getDoc(adminRef);
      if (adminSnap.exists()) {
        return true;
      }
    }

    // 3. Check Super Admin Email Whitelist
    const email = user.email?.toLowerCase().trim() || '';
    if (
      email === 'jamil8655@gmail.com' ||
      email === 'hafizjamilurrahman@gmail.com' ||
      email === 'jamilurrahman@gmail.com'
    ) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error verifying admin claims:', error);
    return false;
  }
}
