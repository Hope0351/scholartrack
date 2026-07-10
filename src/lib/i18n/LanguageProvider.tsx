'use client'

import * as React from 'react'
import { Language, translations, LANGUAGES } from './translations'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
  languages: typeof LANGUAGES
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'scholartrack-lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>('en')

  // Load saved language on mount
  React.useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? (localStorage.getItem(STORAGE_KEY) as Language | null)
      : null
    if (saved && translations[saved]) {
      setLangState(saved)
    }
  }, [])

  const setLang = React.useCallback((newLang: Language) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }, [])

  const t = React.useCallback((key: string) => {
    const dict = translations[lang] || translations.en
    return dict[key] ?? translations.en[key] ?? key
  }, [lang])

  const value = React.useMemo(() => ({
    lang,
    setLang,
    t,
    languages: LANGUAGES,
  }), [lang, setLang, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
