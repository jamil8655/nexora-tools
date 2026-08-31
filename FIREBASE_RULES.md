# NEXORA Tools Pro — Official Firebase Rules & Configuration Guide

Project ID: `studio-5305763939-bdcf7`

---

## 1. Firebase Authentication — Authorized Domains (सबसे ज़रूरी)
Firebase Console me Google Sign-In (`auth/internal-error`) ko allow karne ke liye:
1. Open **[Firebase Console](https://console.firebase.google.com/)** -> Select project **`studio-5305763939-bdcf7`**.
2. Left Menu me **Authentication** par click karein -> **Settings** tab -> **Authorized Domains**.
3. **Add Domain** par click karein aur ye domains add karein:
   - `jamil8655.github.io`
   - `localhost`

---

## 2. Cloud Firestore Security Rules (`firestore.rules`)
Firebase Console -> **Firestore Database** -> **Rules** tab me ye rules paste karein:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Check if user is logged in
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Check if authenticated user is the Super Administrator
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.email == 'jamil8655@gmail.com' ||
        request.auth.token.email == 'hafizjamilurrahman@gmail.com' ||
        request.auth.token.email == 'jamilurrahman@gmail.com'
      );
    }

    // Users Collection: Users can read/write their own profile, Admins can read all
    match /users/{userId} {
      allow read, write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
    }

    // Telemetry & Logs: Admins can read/write, users can create error reports
    match /audit_logs/{logId} {
      allow read: if isAdmin();
      allow write: if isSignedIn();
    }

    // Public Settings / Feature Flags: Everyone can read, only Admin can edit
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 3. Realtime Database Security Rules (`database.rules.json`)
Firebase Console -> **Realtime Database** -> **Rules** tab me ye paste karein:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$uid": {
        ".read": "auth != null && (auth.uid === $uid || auth.token.email === 'jamil8655@gmail.com')",
        ".write": "auth != null && (auth.uid === $uid || auth.token.email === 'jamil8655@gmail.com')"
      }
    },
    "admin": {
      ".read": "auth != null && auth.token.email === 'jamil8655@gmail.com'",
      ".write": "auth != null && auth.token.email === 'jamil8655@gmail.com'"
    }
  }
}
```

---

## 4. Cloud Storage Security Rules (`storage.rules`)
Firebase Console -> **Storage** -> **Rules** tab me ye paste karein:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'jamil8655@gmail.com';
    }
  }
}
```
