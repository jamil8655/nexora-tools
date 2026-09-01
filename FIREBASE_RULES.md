# NEXORA Tools Pro — Production Firebase Rules & Security Configuration

Dedicated Project ID: `studio-3108342384-2960a`

---

## 1. Firebase Authentication — Authorized Domains
Ensure these domains are added under **Authentication -> Settings -> Authorized Domains**:
- `jamil8655.github.io`
- `localhost`

---

## 2. Cloud Firestore Security Rules (`firestore.rules`)
Copy and paste into **Firestore Database -> Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Core helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.admin == true ||
        request.auth.token.role == 'admin' ||
        request.auth.token.email == 'jrahmanansari132@gmail.com' ||
        request.auth.token.email == 'jamil8655@gmail.com'
      );
    }

    // User Profile Documents & User-Owned Sub-collections
    match /users/{userId} {
      allow read: if isSignedIn() && (isOwner(userId) || isAdmin());
      allow write: if isOwner(userId) || isAdmin();

      match /favorites/{favId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }

      match /history/{histId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }

      match /downloads/{dlId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }

      match /notifications/{notifId} {
        allow read, write: if isOwner(userId) || isAdmin();
      }
    }

    // Remote Tools Configuration
    match /tools/{toolId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Processing Jobs Queue
    match /jobs/{jobId} {
      allow read: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
      allow create: if isSignedIn() && request.resource.data.uid == request.auth.uid;
      allow update, delete: if isSignedIn() && (resource.data.uid == request.auth.uid || isAdmin());
    }

    // Global Settings
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Security Audit Logs
    match /audit_logs/{logId} {
      allow read: if isAdmin();
      allow write: if isSignedIn();
    }
  }
}
```

---

## 3. Firebase Cloud Storage Security Rules (`storage.rules`)
Copy and paste into **Storage -> Rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && (
        request.auth.token.admin == true ||
        request.auth.token.role == 'admin' ||
        request.auth.token.email == 'jrahmanansari132@gmail.com' ||
        request.auth.token.email == 'jamil8655@gmail.com'
      );
    }

    // User Profile Avatars (Max 5MB image upload)
    match /users/{userId}/profile/{allPaths=**} {
      allow read: if true;
      allow write: if (isOwner(userId) || isAdmin()) &&
                   request.resource.size < 5 * 1024 * 1024 &&
                   request.resource.contentType.matches('image/.*');
    }

    // User Private Documents & Conversions (Max 100MB)
    match /users/{userId}/documents/{allPaths=**} {
      allow read, write: if isOwner(userId) || isAdmin();
    }
  }
}
```
