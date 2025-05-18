'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import en from '@/locales/en.json';
import vi from '@/locales/vn.json';
import no from '@/locales/no.json';
import jp from '@/locales/jp.json';
export type Locale = 'en' | 'vi' | 'no' | 'jp';
type TranslationKeys = keyof typeof en;

type LanguageContextType = {
  locale: Locale;
  t: (key: TranslationKeys) => string;
  setLocale: (lang: Locale) => void;
};

const translations: Record<Locale, typeof en> = { en, vi, no, jp };

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: (key) => key,
  setLocale: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale;
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: TranslationKeys): string => {
    const translation = translations[locale]?.[key];
    if (translation) return translation;

    const fallback = translations['en']?.[key];
    if (fallback) return fallback;

    return key;
  };

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
