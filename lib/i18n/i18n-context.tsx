'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, Translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('nexora_lang_v2') as Language;
    if (saved && ['en', 'ar', 'ur', 'hi'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexora_lang_v2', lang);
    }
    const dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.className = document.documentElement.className
      .replace(/\blang-(en|ur|ar|hi)\b/g, '')
      .trim() + ` lang-${lang}`;
  };

  useEffect(() => {
    const dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    document.documentElement.className = document.documentElement.className
      .replace(/\blang-(en|ur|ar|hi)\b/g, '')
      .trim() + ` lang-${language}`;
  }, [language]);

  const dir = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr';
  const isRtl = dir === 'rtl';
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir, isRtl, isRTL: isRtl }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
