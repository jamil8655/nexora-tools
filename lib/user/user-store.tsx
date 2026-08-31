'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface EnrolledCourseState {
  courseId: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: number;
  lastAccessedAt: number;
}

export interface FavoriteItem {
  id: string;
  type: 'tool' | 'course';
  title: string;
  category: string;
  url: string;
  iconName?: string;
  addedAt: number;
}

export interface ActivityHistoryItem {
  id: string;
  type: 'tool' | 'course' | 'conversion';
  title: string;
  url: string;
  timestamp: number;
  meta?: string;
}

export interface DownloadItem {
  id: string;
  name: string;
  size: string;
  type: string;
  timestamp: number;
  downloadUrl?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'course' | 'tool' | 'security' | 'system';
  timestamp: number;
  read: boolean;
  link?: string;
}

interface UserStoreContextType {
  enrolledCourses: Record<string, EnrolledCourseState>;
  enrollInCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string, totalLessons: number) => void;
  isEnrolled: (courseId: string) => boolean;
  getCourseProgress: (courseId: string) => number;

  favorites: FavoriteItem[];
  toggleFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;

  history: ActivityHistoryItem[];
  addHistory: (item: Omit<ActivityHistoryItem, 'id' | 'timestamp'>) => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;

  downloads: DownloadItem[];
  addDownload: (item: Omit<DownloadItem, 'id' | 'timestamp'>) => void;
  removeDownload: (id: string) => void;
  clearDownloads: () => void;

  notifications: AppNotification[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

const UserStoreContext = createContext<UserStoreContextType | undefined>(undefined);

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-welcome',
    title: 'Welcome to NEXORA PRO!',
    message: 'Explore 75+ free client-side digital utilities and free developer courses with zero server tracking.',
    type: 'system',
    timestamp: Date.now() - 3600000 * 2,
    read: false,
    link: '/about',
  },
  {
    id: 'notif-course-1',
    title: 'New Course: Modern Full-Stack Web Mastery',
    message: 'Master React, Next.js 14, and TypeScript. All curriculum lessons and previews are free to study.',
    type: 'course',
    timestamp: Date.now() - 3600000 * 8,
    read: false,
    link: '/courses/modern-fullstack-web-mastery',
  },
  {
    id: 'notif-tool-1',
    title: 'PDF Studio Engine 2.0 Released',
    message: 'Enhanced client-side PDF OCR, compression, and 300 DPI conversion are now active.',
    type: 'tool',
    timestamp: Date.now() - 3600000 * 24,
    read: true,
    link: '/tools',
  },
];

export function UserStoreProvider({ children }: { children: React.ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, EnrolledCourseState>>({});
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [history, setHistory] = useState<ActivityHistoryItem[]>([]);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(DEFAULT_NOTIFICATIONS);

  useEffect(() => {
    try {
      const savedEnrolled = localStorage.getItem('nexora_enrolled_courses');
      if (savedEnrolled) setEnrolledCourses(JSON.parse(savedEnrolled));

      const savedFavs = localStorage.getItem('nexora_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedHistory = localStorage.getItem('nexora_history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedDownloads = localStorage.getItem('nexora_downloads');
      if (savedDownloads) setDownloads(JSON.parse(savedDownloads));

      const savedNotifs = localStorage.getItem('nexora_notifications');
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    } catch (e) {
      console.warn('Error loading user store from storage:', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexora_enrolled_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('nexora_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('nexora_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('nexora_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('nexora_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const enrollInCourse = (courseId: string) => {
    setEnrolledCourses((prev) => {
      if (prev[courseId]) return prev;
      return {
        ...prev,
        [courseId]: {
          courseId,
          progress: 0,
          completedLessons: [],
          enrolledAt: Date.now(),
          lastAccessedAt: Date.now(),
        },
      };
    });
  };

  const unenrollCourse = (courseId: string) => {
    setEnrolledCourses((prev) => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
  };

  const markLessonComplete = (courseId: string, lessonId: string, totalLessons: number) => {
    setEnrolledCourses((prev) => {
      const current = prev[courseId] || {
        courseId,
        progress: 0,
        completedLessons: [],
        enrolledAt: Date.now(),
        lastAccessedAt: Date.now(),
      };

      const completed = new Set(current.completedLessons);
      completed.add(lessonId);
      const completedArray = Array.from(completed);
      const progress = Math.min(100, Math.round((completedArray.length / Math.max(1, totalLessons)) * 100));

      return {
        ...prev,
        [courseId]: {
          ...current,
          completedLessons: completedArray,
          progress,
          lastAccessedAt: Date.now(),
        },
      };
    });
  };

  const isEnrolled = (courseId: string) => !!enrolledCourses[courseId];
  const getCourseProgress = (courseId: string) => enrolledCourses[courseId]?.progress || 0;

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      } else {
        return [{ ...item, addedAt: Date.now() }, ...prev];
      }
    });
  };

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);
  const removeFavorite = (id: string) => setFavorites((prev) => prev.filter((f) => f.id !== id));

  const addHistory = (item: Omit<ActivityHistoryItem, 'id' | 'timestamp'>) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.url !== item.url);
      const newItem: ActivityHistoryItem = {
        ...item,
        id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now(),
      };
      return [newItem, ...filtered].slice(0, 50);
    });
  };

  const removeHistoryItem = (id: string) => setHistory((prev) => prev.filter((h) => h.id !== id));
  const clearHistory = () => setHistory([]);

  const addDownload = (item: Omit<DownloadItem, 'id' | 'timestamp'>) => {
    setDownloads((prev) => {
      const newItem: DownloadItem = {
        ...item,
        id: `dl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now(),
      };
      return [newItem, ...prev].slice(0, 50);
    });
  };

  const removeDownload = (id: string) => setDownloads((prev) => prev.filter((d) => d.id !== id));
  const clearDownloads = () => setDownloads([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <UserStoreContext.Provider
      value={{
        enrolledCourses,
        enrollInCourse,
        unenrollCourse,
        markLessonComplete,
        isEnrolled,
        getCourseProgress,

        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,

        history,
        addHistory,
        removeHistoryItem,
        clearHistory,

        downloads,
        addDownload,
        removeDownload,
        clearDownloads,

        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
}

export function useUserStore() {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }
  return context;
}
