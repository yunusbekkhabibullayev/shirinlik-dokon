import React, { useState } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../constants/translations';
import { LanguageContext } from './languageContextInstance';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('shirinlik_lang') || 'uz';
    } catch {
      return 'uz';
    }
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('shirinlik_lang', newLang);
    } catch {
      // ignore
    }
  };

  const t = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.uz;
    return dict[key] || TRANSLATIONS.uz[key] || key;
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, currentLangObj, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}
