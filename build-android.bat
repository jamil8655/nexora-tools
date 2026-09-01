@echo off
echo ======================================================================
echo           NEXORA TOOLS PRO - ANDROID APPLICATION BUILD SCRIPT
echo ======================================================================
echo.

echo [1/3] Building Next.js Web Assets (Static Export)...
set GITHUB_ACTIONS=true
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Web build failed!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Syncing Web Assets with Android Project...
call npx cap sync android

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Capacitor sync failed!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Android Project Synchronized Successfully!
echo.
echo ----------------------------------------------------------------------
echo OPTIONS TO BUILD APK / AAB:
echo ----------------------------------------------------------------------
echo Option A (With Android Studio):
echo    Run: npm run android:open
echo    - For Debug APK: Build -^> Build Bundle(s) / APK(s) -^> Build APK(s)
echo    - For Play Store AAB: Build -^> Generate Signed Bundle / APK...
echo.
echo Option B (Direct Command Line with Gradle):
echo    cd android ^&^& gradlew assembleDebug
echo    Output: android/app/build/outputs/apk/debug/app-debug.apk
echo ----------------------------------------------------------------------
echo.
pause
