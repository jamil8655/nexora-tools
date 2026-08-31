'use client';

// NEXORA Production Firebase Client SDK Initialization
// Connected to Studio Project: studio-5305763939-bdcf7

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getDatabase, Database } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyDAphK0M9mz4OPKX-hp7Z56_89E9P4Z8Z4",
  authDomain: "studio-5305763939-bdcf7.firebaseapp.com",
  databaseURL: "https://studio-5305763939-bdcf7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studio-5305763939-bdcf7",
  storageBucket: "studio-5305763939-bdcf7.firebasestorage.app",
  messagingSenderId: "181387905351",
  appId: "1:181387905351:web:3f2f901d98ace5491ee462"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let rtdb: Database;

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  rtdb = getDatabase(app);
} else {
  // Safe mock handles during static build / SSR phase
  app = (!getApps().length ? initializeApp(firebaseConfig) : getApp()) as FirebaseApp;
}

export { app, auth, db, storage, rtdb };
