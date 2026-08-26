# 📱 NEXORA Tools - Android Application Build Guide

This project is fully configured with **Capacitor** to build a native Android APK and Google Play Store Bundle (.aab).

---

## ⚡ Quick 1-Click Build

Simply double-click the **`build-android.bat`** file in the project root folder.

It will:
1. Compile and optimize all 60+ WebAssembly & TypeScript tools into the static bundle.
2. Synchronize web assets with the native Android project.
3. Prepare the Android project ready for compilation.

---

## 🛠️ Building the APK (2 Methods)

### Method 1: Using Android Studio (Recommended)
1. Open terminal in the project directory and run:
   ```bash
   npx cap open android
   ```
2. Android Studio will open the project automatically.
3. In the top menu, click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**.
4. Once built, click **Locate** to get your **`app-debug.apk`**.

---

### Method 2: Command Line (Gradle)
If you have JDK & Android SDK installed:
```bash
cd android
gradlew assembleDebug
```
Your compiled APK will be at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## ⚙️ App Configuration
- **App Name**: NEXORA Tools
- **Package ID**: `com.nexoratools.app`
- **Config File**: `capacitor.config.json`
- **Permissions Configured**: Internet, Storage read/write, Camera (for OCR/QR scanning)
