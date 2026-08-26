@echo off
echo ======================================================================
echo           NEXORA TOOLS - ANDROID APPLICATION BUILD SCRIPT
echo ======================================================================
echo.

echo [1/3] Building Next.js Web Assets (Static Export)...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Web build failed!
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Syncing Web Assets with Android Project...
if not exist "node_modules\@capacitor\cli" (
    echo Installing Capacitor dependencies...
    call npm install @capacitor/core @capacitor/cli @capacitor/android
)

call npx cap sync android

echo.
echo [3/3] Android Project is Ready!
echo.
echo ----------------------------------------------------------------------
echo OPTIONS TO BUILD APK:
echo ----------------------------------------------------------------------
echo Option A (With Android Studio):
echo    Run: npx cap open android
echo    Then click "Build" -^> "Build Bundle(s) / APK(s)" -^> "Build APK(s)"
echo.
echo Option B (Direct Command Line with Gradle):
echo    cd android ^&^& gradlew assembleDebug
echo    Your APK will be generated at:
echo    android/app/build/outputs/apk/debug/app-debug.apk
echo ----------------------------------------------------------------------
echo.
pause
