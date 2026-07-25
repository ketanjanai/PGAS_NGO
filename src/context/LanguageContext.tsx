'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    // Force English always
    setLangState('en');
  }, []);

  const setLang = (newLang: Language) => {
    // Do nothing, only English allowed
  };

  const t = translations[lang] || translations['en'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
