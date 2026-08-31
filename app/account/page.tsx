'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useTheme } from '@/components/layout/ThemeContext';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useAuth } from '@/lib/auth/auth-context';
import { useUserStore } from '@/lib/user/user-store';
import { COURSES_CATALOG } from '@/lib/courses/courses-data';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  User,
  ShieldCheck,
  Languages,
  Sparkles,
  LogIn,
  LogOut,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  Star,
  Download,
  Bell,
  Settings as SettingsIcon,
  GraduationCap,
  Wrench,
  Trash2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sun,
  Moon,
  Laptop,
  Check,
  Send,
  Camera,
  Upload,
  Pin,
  PinOff,
  FileDown,
  Play,
  RotateCcw,
} from 'lucide-react';
import { sendEmailVerification } from 'firebase/auth';

type TabKey = 'dashboard' | 'profile' | 'courses' | 'tools' | 'favorites' | 'history' | 'downloads' | 'notifications' | 'settings' | 'privacy' | 'plan';

export default function AccountPage() {
  const { user, firebaseUser, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, isRtl } = useI18n();
  const {
    profilePhoto,
    updateProfilePhoto,
    pinnedTools,
    togglePinTool,
    isToolPinned,
    lastStudiedCourseId,
    enrolledCourses,
    favorites,
    removeFavorite,
    history,
    removeHistoryItem,
    clearHistory,
    downloads,
    removeDownload,
    clearDownloads,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useUserStore();

  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.name) setDisplayName(user.name);
    const savedBio = localStorage.getItem('nexora_user_bio') || '';
    setBio(savedBio);
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('nexora_user_bio', bio);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleResendVerification = async () => {
    if (firebaseUser) {
      try {
        await sendEmailVerification(firebaseUser);
        setVerificationSent(true);
        setTimeout(() => setVerificationSent(false), 4000);
      } catch (err) {
        console.error('Error sending verification email:', err);
      }
    }
  };

  // Profile Photo Upload with client-side compression and 256x256 resizing
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError('');
    const file = e.target.files?.[0];
    if (!file) return;

    // MIME Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setPhotoError('Invalid image format. Please select a JPG, PNG, or WEBP file.');
      return;
    }

    // Size Validation (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Image size exceeds 5 MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 256;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Crop and center
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          updateProfilePhoto(compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateProfilePhoto(null);
  };

  // Export User Data as JSON
  const handleDownloadMyData = () => {
    const exportData = {
      profile: {
        name: user?.name,
        email: user?.email,
        bio,
        role: user?.role,
        exportedAt: new Date().toISOString(),
      },
      enrolledCourses,
      favorites,
      history,
      downloads,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexora-user-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Delete Account Confirmation
  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your local profile, history, and preferences? This action is permanent.')) {
      localStorage.clear();
      logout();
      window.location.href = '/';
    }
  };

  const lastCourse = COURSES_CATALOG.find((c) => c.slug === lastStudiedCourseId || c.id === lastStudiedCourseId) || COURSES_CATALOG[0];
  const lastCourseState = enrolledCourses[lastCourse?.id];

  const tabs: { id: TabKey; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'profile', label: t.userDashboard.profileTitle, icon: User },
    { id: 'courses', label: t.courses.myCourses, icon: GraduationCap, count: Object.keys(enrolledCourses).length },
    { id: 'tools', label: t.userDashboard.myToolsTitle, icon: Wrench },
    { id: 'favorites', label: t.userDashboard.favoritesTitle, icon: Star, count: favorites.length },
    { id: 'history', label: t.userDashboard.historyTitle, icon: Clock, count: history.length },
    { id: 'downloads', label: t.userDashboard.downloadsTitle, icon: Download, count: downloads.length },
    { id: 'notifications', label: t.userDashboard.notificationsTitle, icon: Bell, count: unreadCount },
    { id: 'privacy', label: 'Privacy & Data', icon: ShieldCheck },
    { id: 'settings', label: t.nav.settings, icon: SettingsIcon },
    { id: 'plan', label: 'Plan & Tier', icon: Sparkles },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0">
      <Breadcrumbs items={[{ label: t.nav.myProfile }]} />

      {/* Header Profile Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative group shrink-0">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile Avatar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-lg shadow-brand-500/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-brand-500/20">
                {isAuthenticated ? (user?.name?.charAt(0).toUpperCase() || 'U') : <User className="w-8 h-8" />}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-slate-900 text-white hover:bg-brand-600 transition-colors shadow-md text-xs"
              title="Change Profile Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white truncate">
                {isAuthenticated ? (user?.name || 'Authenticated User') : 'Guest Explorer'}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isAdmin
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                  : isAuthenticated
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}>
                {isAdmin ? 'ADMINISTRATOR' : isAuthenticated ? 'PRO MEMBER' : 'FREE GUEST'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {isAuthenticated ? user?.email : 'All 75+ tools and course curriculums are 100% open and free.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-xs font-bold transition-all border border-purple-200 dark:border-purple-800 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {t.nav.admin}
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t.nav.logout}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {t.nav.login} / {t.nav.signup}
            </button>
          )}
        </div>
      </div>

      {photoError && (
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {photoError}
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && tab.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-brand-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 0: Personal Dashboard Hub */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Continue Where You Left Off */}
          <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-brand-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
                Continue Where You Left Off
              </span>
              <h2 className="text-xl sm:text-2xl font-black">{lastCourse?.title}</h2>
              <p className="text-xs text-brand-100 line-clamp-2">{lastCourse?.description}</p>
              {lastCourseState && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold pb-1">
                    <span>{lastCourseState.progress}% Completed</span>
                    <span>{lastCourseState.completedLessons.length} / {lastCourse.lessonsCount} lessons</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-white transition-all" style={{ width: `${lastCourseState.progress}%` }} />
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/courses/${lastCourse?.slug}`}
              className="px-6 py-3 rounded-2xl bg-white text-brand-600 font-bold text-xs shadow-md hover:bg-brand-50 transition-all shrink-0 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.courses.resume}</span>
            </Link>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-xs">
              <span className="text-xs text-slate-400 font-bold">Enrolled Courses</span>
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400">
                {Object.keys(enrolledCourses).length}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-xs">
              <span className="text-xs text-slate-400 font-bold">Favorites</span>
              <p className="text-2xl font-black text-amber-500">
                {favorites.length}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-xs">
              <span className="text-xs text-slate-400 font-bold">Activity Logs</span>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {history.length}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-xs">
              <span className="text-xs text-slate-400 font-bold">Generated Files</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {downloads.length}
              </p>
            </div>
          </div>

          {/* Pinned & Recommended Tools */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pin className="w-4 h-4 text-brand-600" />
                Pinned & Quick Utilities
              </h3>
              <Link href="/tools" className="text-xs font-bold text-brand-600 hover:underline">
                {t.common.viewAll} (75+) →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: 'pdf-to-docx', title: 'PDF to Word OCR', href: '/tools/pdf-to-docx', cat: 'PDF' },
                { id: 'pdf-compress', title: 'Compress PDF', href: '/tools/pdf-compress', cat: 'PDF' },
                { id: 'image-studio', title: 'Image Studio', href: '/image-studio', cat: 'Image' },
                { id: 'ocr', title: 'OCR Image to Text', href: '/ocr', cat: 'OCR' },
              ].map((tool) => (
                <div
                  key={tool.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/40 hover:shadow-md transition-all space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold text-xs">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <button
                      onClick={() => togglePinTool(tool.id)}
                      className="text-slate-300 hover:text-brand-600 transition-colors"
                      title={isToolPinned(tool.id) ? 'Unpin' : 'Pin'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${isToolPinned(tool.id) ? 'text-brand-600 fill-current' : ''}`} />
                    </button>
                  </div>
                  <Link href={tool.href} className="block space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors truncate">
                      {tool.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">{tool.cat}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.profileTitle}</h2>
              <p className="text-xs text-slate-500">Manage your public information and profile bio.</p>
            </div>

            {/* Photo Manage Actions */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-12 h-12 rounded-xl object-cover border border-brand-500 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 shrink-0">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Profile Photo</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-brand-600 hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    Upload Image
                  </button>
                  {profilePhoto && (
                    <button
                      onClick={handleRemovePhoto}
                      className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.auth.fullName}</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.auth.emailAddress}</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || 'guest@nexora.tools'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bio & Skill Summary</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t.userDashboard.bioPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
                />
              </div>

              {profileSaved && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.userDashboard.profileUpdated}
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {t.userDashboard.saveProfile}
              </button>
            </form>
          </div>

          {/* Account Security Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {t.auth.emailVerification}
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Status:</span>
                {firebaseUser?.emailVerified ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t.auth.emailVerified}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold text-[11px] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {t.auth.emailNotVerified}
                  </span>
                )}
              </div>

              {!firebaseUser?.emailVerified && isAuthenticated && (
                <button
                  onClick={handleResendVerification}
                  className="w-full py-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 hover:bg-brand-100 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t.auth.resendVerification}
                </button>
              )}

              {verificationSent && (
                <p className="text-[11px] text-emerald-600 font-bold text-center">
                  {t.auth.verificationSent}
                </p>
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-500">
              <p><strong>{t.userDashboard.joinedOn}:</strong> September 2026</p>
              <p><strong>Authentication Source:</strong> Google Firebase Authentication</p>
              <p><strong>Encryption:</strong> AES-256 / SHA-256 Web Crypto</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.courses.myCourses}</h2>
              <p className="text-xs text-slate-500">{t.courses.subtitle}</p>
            </div>
            <Link
              href="/courses"
              className="px-4 py-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 hover:bg-brand-100 text-xs font-bold transition-all"
            >
              {t.courses.browse}
            </Link>
          </div>

          {Object.keys(enrolledCourses).length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <GraduationCap className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No enrolled courses yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our full-stack web, Python AI, and document engineering courses. Free preview is available for all lessons.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-all shadow-md shadow-brand-500/20"
              >
                {t.courses.browse}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(enrolledCourses).map((courseId) => {
                const course = COURSES_CATALOG.find((c) => c.id === courseId);
                if (!course) return null;
                const state = enrolledCourses[courseId];

                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-[10px] font-bold">
                        {course.categoryLabel}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600">{state.progress}% Complete</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {course.title}
                    </h3>

                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: `${state.progress}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{state.completedLessons.length} / {course.lessonsCount} lessons</span>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="font-bold text-brand-600 hover:underline flex items-center gap-1"
                      >
                        {t.courses.resume}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: My Tools */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.myToolsTitle}</h2>
            <p className="text-xs text-slate-500">{t.userDashboard.myToolsSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { id: 'pdf-to-docx', title: 'PDF to Word OCR', href: '/tools/pdf-to-docx', cat: 'PDF' },
              { id: 'pdf-compress', title: 'Compress PDF', href: '/tools/pdf-compress', cat: 'PDF' },
              { id: 'image-studio', title: 'Image Studio', href: '/image-studio', cat: 'Image' },
              { id: 'ocr', title: 'OCR Image to Text', href: '/ocr', cat: 'OCR' },
              { id: 'json-formatter', title: 'JSON Formatter', href: '/tools/json-formatter', cat: 'Dev' },
              { id: 'password-generator', title: 'Password Generator', href: '/tools/password-generator', cat: 'Security' },
              { id: 'qr-barcode', title: 'QR Code Studio', href: '/qr-barcode', cat: 'QR' },
              { id: 'pdf-editor', title: 'PDF Editor Pro', href: '/pdf-editor', cat: 'PDF' },
            ].map((tool, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/40 hover:shadow-md transition-all space-y-2 group relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <button
                    onClick={() => togglePinTool(tool.id)}
                    className="text-slate-300 hover:text-brand-600 transition-colors"
                  >
                    <Pin className={`w-3.5 h-3.5 ${isToolPinned(tool.id) ? 'text-brand-600 fill-current' : ''}`} />
                  </button>
                </div>
                <Link href={tool.href} className="block">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">
                    {tool.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">{tool.cat}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.favoritesTitle}</h2>
            <p className="text-xs text-slate-500">{t.userDashboard.favoritesSubtitle}</p>
          </div>

          {favorites.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Star className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.userDashboard.noFavorites}</h3>
              <p className="text-xs text-slate-500">Bookmark any tool or course to access it here with one click.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-brand-600 dark:text-brand-400">
                      {item.category}
                    </span>
                    <Link
                      href={item.url}
                      className="text-xs font-bold text-slate-900 dark:text-white hover:text-brand-600 truncate block"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.historyTitle}</h2>
              <p className="text-xs text-slate-500">{t.userDashboard.historySubtitle}</p>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t.userDashboard.clearHistory}
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Clock className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.userDashboard.noHistory}</h3>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              {history.map((item) => (
                <div key={item.id} className="p-4 sm:px-6 flex items-center justify-between gap-4">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-slate-400">{item.type}</span>
                    <Link href={item.url} className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 truncate block">
                      {item.title}
                    </Link>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.url}
                      className="p-2 rounded-lg text-brand-600 hover:bg-brand-50 text-xs font-bold"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => removeHistoryItem(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Downloads */}
      {activeTab === 'downloads' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.downloadsTitle}</h2>
              <p className="text-xs text-slate-500">{t.userDashboard.downloadsSubtitle}</p>
            </div>
            {downloads.length > 0 && (
              <button
                onClick={clearDownloads}
                className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 text-xs font-bold hover:bg-rose-100"
              >
                {t.userDashboard.clearAll}
              </button>
            )}
          </div>

          {downloads.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <Download className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.userDashboard.noDownloads}</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {downloads.map((dl) => (
                <div
                  key={dl.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{dl.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{dl.size} • {new Date(dl.timestamp).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => removeDownload(dl.id)}
                    className="p-2 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 7: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.notificationsTitle}</h2>
              <p className="text-xs text-slate-500">{t.userDashboard.notificationsSubtitle}</p>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 text-xs font-bold hover:bg-brand-100"
              >
                {t.userDashboard.markAllAsRead}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75'
                    : 'bg-brand-50/40 dark:bg-brand-950/20 border-brand-200 dark:border-brand-800/60 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />}
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notif.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {new Date(notif.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: Privacy & Data Controls */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Privacy & Data Management</h2>
            <p className="text-xs text-slate-500">Export your local workspace records or permanently delete your account.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileDown className="w-4 h-4 text-brand-600" />
                Download My Data (JSON)
              </h4>
              <p className="text-xs text-slate-500">
                Export all your enrolled course progress, bookmarked favorite tools, and activity logs into a portable JSON file.
              </p>
              <button
                onClick={handleDownloadMyData}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Export JSON Archive
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-rose-600 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account & Purge Data
              </h4>
              <p className="text-xs text-slate-500">
                Permanently remove all local data, clear stored credentials, and sign out from this device.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Delete Everything & Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 9: Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.nav.settings}</h2>
            <p className="text-xs text-slate-500">{t.settings.localStorageNotice}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-brand-600" />
                {t.settings.selectLanguage}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'en', label: 'English', native: 'English' },
                  { id: 'ur', label: 'Urdu', native: 'اردو' },
                  { id: 'ar', label: 'Arabic', native: 'العربية' },
                  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id as any)}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left ${
                      language === lang.id
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                    }`}
                  >
                    <p className="text-sm">{lang.native}</p>
                    <p className="text-[10px] opacity-75 font-normal">{lang.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                {t.settings.themeMode}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center space-y-1.5 transition-all ${
                    theme === 'light'
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4 mx-auto" />
                  <p>{t.settings.lightTheme}</p>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center space-y-1.5 transition-all ${
                    theme === 'dark'
                  ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4 mx-auto" />
                  <p>{t.settings.darkTheme}</p>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold text-center space-y-1.5 transition-all ${
                    theme === 'system'
                      ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Laptop className="w-4 h-4 mx-auto" />
                  <p>{t.settings.systemTheme}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 10: Plan & Tier */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Plan & Membership Tiers</h2>
            <p className="text-xs text-slate-500">Transparent ecosystem architecture — all core features are 100% free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-brand-600 shadow-md space-y-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950 text-brand-600 text-[10px] font-bold">CURRENT ACTIVE TIER</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Free & Open</h3>
                <p className="text-2xl font-black text-emerald-600">$0 <span className="text-xs text-slate-400 font-normal">/ forever</span></p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Unlimited 75+ client-side tools</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 500 MB max file size engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free master course curriculums</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% local privacy (zero uploads)</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 opacity-80">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 text-[10px] font-bold">FUTURE EXPANSION</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Pro Developer</h3>
                <p className="text-xs text-slate-400">Automated cloud workers & verified certifications.</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Dedicated cloud compute clusters</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Automated scheduled batch conversions</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Verifiable PDF graduation diplomas</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 opacity-80">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 text-[10px] font-bold">CUSTOM INTEGRATIONS</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Enterprise Team</h3>
                <p className="text-xs text-slate-400">On-premise deployments & custom tools.</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Self-hosted offline Docker instance</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> Custom enterprise workflows & APIs</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-slate-400" /> 24/7 dedicated engineering SLA</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
