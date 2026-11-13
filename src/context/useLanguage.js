import { useContext } from 'react';
import { LanguageContext } from './languageContextInstance';
import { LANGUAGES, TRANSLATIONS } from '../constants/translations';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'uz',
      setLang: () => {},
      t: (key) => TRANSLATIONS.uz[key] || key,
      currentLangObj: LANGUAGES[0],
      languages: LANGUAGES,
    };
  }
  return context;
}
