/**
 * NEXORA Enterprise Firebase Admin Custom Claims Setter
 * 
 * Usage:
 * 1. Download Service Account JSON from Firebase Console -> Project Settings -> Service Accounts -> Generate new private key.
 * 2. Save it as `serviceAccountKey.json` in the root folder.
 * 3. Run: `node scripts/set-admin-claims.js jamil8655@gmail.com`
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('\n❌ Error: serviceAccountKey.json not found!');
  console.log('To set Custom Claims via Admin SDK:');
  console.log('1. Go to Firebase Console -> Project Settings -> Service accounts.');
  console.log('2. Click "Generate new private key" and save it as "serviceAccountKey.json" in the project root.');
  console.log('3. Run: node scripts/set-admin-claims.js <user-email-or-uid>\n');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const targetIdentifier = process.argv[2] || 'jamil8655@gmail.com';

async function setAdminCustomClaims(identifier) {
  try {
    let userRecord;
    if (identifier.includes('@')) {
      userRecord = await admin.auth().getUserByEmail(identifier);
    } else {
      userRecord = await admin.auth().getUser(identifier);
    }

    console.log(`Found user: ${userRecord.email} (${userRecord.uid})`);

    // Set Custom Claims
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true,
      super_admin: true,
      role: 'admin',
    });

    // Also update Firestore profile
    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set(
      {
        role: 'admin',
        isAdmin: true,
        claimsUpdatedAt: Date.now(),
      },
      { merge: true }
    );

    await db.collection('admins').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      assignedAt: Date.now(),
    });

    console.log(`\n✅ SUCCESS: User ${userRecord.email} has been granted Admin Custom Claims!`);
    console.log('Claims set: { admin: true, super_admin: true, role: "admin" }');
    console.log('When this user signs in, Firebase ID token will carry cryptographically signed admin claims.\n');
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

setAdminCustomClaims(targetIdentifier);
