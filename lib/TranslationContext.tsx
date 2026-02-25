'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, languages, LanguageCode, TranslationKey } from './translations'

type TranslationContextType = {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: TranslationKey) => string
  languages: typeof languages
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const STORAGE_KEY = 'cancaf-language'

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')
  const [mounted, setMounted] = useState(false)

  // Load saved language preference on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    if (saved && translations[saved]) {
      setLanguageState(saved)
      // Set document direction for RTL languages
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = saved
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as LanguageCode
      if (translations[browserLang]) {
        setLanguageState(browserLang)
        document.documentElement.dir = browserLang === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = browserLang
      }
    }
  }, [])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    // Handle RTL for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: TranslationKey): string => {
    const langTranslations = translations[language]
    if (langTranslations && key in langTranslations) {
      return langTranslations[key as keyof typeof langTranslations]
    }
    // Fallback to English
    return translations.en[key as keyof typeof translations.en] || key
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <TranslationContext.Provider value={{ language: 'en', setLanguage, t, languages }}>
        {children}
      </TranslationContext.Provider>
    )
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
