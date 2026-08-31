# NEXORA Tools Pro — Dedicated Firebase Project Rules & Configuration

Project ID: `studio-3108342384-2960a`

---

## 1. Firebase Authentication — Authorized Domains
Firebase Console -> Project **`studio-3108342384-2960a`** -> **Authentication** -> **Settings** -> **Authorized Domains**:
- `jamil8655.github.io`
- `localhost`

---

## 2. Cloud Firestore Security Rules (`firestore.rules`)
Firebase Console -> **Firestore Database** -> **Rules** tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.email == 'jamil8655@gmail.com' ||
        request.auth.token.email == 'hafizjamilurrahman@gmail.com' ||
        request.auth.token.email == 'jamilurrahman@gmail.com'
      );
    }

    match /users/{userId} {
      allow read, write: if isSignedIn() && (request.auth.uid == userId || isAdmin());
    }

    match /audit_logs/{logId} {
      allow read: if isAdmin();
      allow write: if isSignedIn();
    }

    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 3. Realtime Database Security Rules (`database.rules.json`)
Firebase Console -> **Realtime Database** -> **Rules** tab:

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
