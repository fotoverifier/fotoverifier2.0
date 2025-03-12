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

export type Locale = 'en' | 'vi';
type TranslationKeys = keyof typeof en;

type LanguageContextType = {
  locale: Locale;
  t: (key: TranslationKeys) => string;
  setLocale: (lang: Locale) => void;
};

const translations: Record<Locale, typeof en> = { en, vi };

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

  const t = (key: TranslationKeys): string =>
    translations[locale]?.[key] || translations['en'][key] || key;

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
