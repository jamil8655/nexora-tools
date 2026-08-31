'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { sendEmailVerification } from 'firebase/auth';

type TabKey = 'profile' | 'courses' | 'tools' | 'favorites' | 'history' | 'downloads' | 'notifications' | 'settings' | 'plan';

export default function AccountPage() {
  const { user, firebaseUser, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, t, isRtl } = useI18n();
  const {
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

  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

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

  const tabs: { id: TabKey; label: string; icon: any; count?: number }[] = [
    { id: 'profile', label: t.userDashboard.profileTitle, icon: User },
    { id: 'courses', label: t.courses.myCourses, icon: GraduationCap, count: Object.keys(enrolledCourses).length },
    { id: 'tools', label: t.userDashboard.myToolsTitle, icon: Wrench },
    { id: 'favorites', label: t.userDashboard.favoritesTitle, icon: Star, count: favorites.length },
    { id: 'history', label: t.userDashboard.historyTitle, icon: Clock, count: history.length },
    { id: 'downloads', label: t.userDashboard.downloadsTitle, icon: Download, count: downloads.length },
    { id: 'notifications', label: t.userDashboard.notificationsTitle, icon: Bell, count: unreadCount },
    { id: 'settings', label: t.nav.settings, icon: SettingsIcon },
    { id: 'plan', label: 'Plan & Tier', icon: Sparkles },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-w-0">
      <Breadcrumbs items={[{ label: t.nav.myProfile }]} />

      {/* Header Profile Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-brand-500/20 shrink-0">
            {isAuthenticated ? (user?.name?.charAt(0).toUpperCase() || 'U') : <User className="w-8 h-8" />}
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

      {/* Tab 1: Profile & Account */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.userDashboard.profileTitle}</h2>
              <p className="text-xs text-slate-500">Manage your public information and profile bio.</p>
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
              { title: 'PDF to Word OCR', href: '/tools/pdf-to-docx', cat: 'PDF' },
              { title: 'PDF Editor Pro', href: '/pdf-editor', cat: 'PDF' },
              { title: 'Compress PDF', href: '/tools/pdf-compress', cat: 'PDF' },
              { title: 'Image Studio', href: '/image-studio', cat: 'Image' },
              { title: 'OCR Image to Text', href: '/ocr', cat: 'OCR' },
              { title: 'JSON Formatter', href: '/tools/json-formatter', cat: 'Dev' },
              { title: 'Password Generator', href: '/tools/password-generator', cat: 'Security' },
              { title: 'QR Code Studio', href: '/qr-barcode', cat: 'QR' },
            ].map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/40 hover:shadow-md transition-all space-y-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">
                    {tool.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">{tool.cat}</span>
                </div>
              </Link>
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

      {/* Tab 8: Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t.nav.settings}</h2>
            <p className="text-xs text-slate-500">{t.settings.localStorageNotice}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-brand-600" />
                {t.settings.selectLanguage}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'en', label: 'English', native: 'English' },
                  { id: 'ur', label: 'Urdu', native: 'اردو' },
                  { id: 'ar', label: 'Arabic', native: 'العربية' },
                  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id as any)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                      language === lang.id
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <p>{lang.native}</p>
                    <p className="text-[10px] opacity-75">{lang.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Box */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                {t.settings.themeMode}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center space-y-1 transition-all ${
                    theme === 'light'
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sun className="w-4 h-4 mx-auto" />
                  <span>{t.settings.lightTheme}</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center space-y-1 transition-all ${
                    theme === 'dark'
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Moon className="w-4 h-4 mx-auto" />
                  <span>{t.settings.darkTheme}</span>
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center space-y-1 transition-all ${
                    theme === 'system'
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Laptop className="w-4 h-4 mx-auto" />
                  <span>{t.settings.systemTheme}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 9: Plan & Tier Architecture */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Plan & Membership Tiers</h2>
            <p className="text-xs text-slate-500">Transparent ecosystem architecture — all core features are 100% free.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
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

            {/* Pro Tier (Architecture Ready) */}
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

            {/* Enterprise Tier */}
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
