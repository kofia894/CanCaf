'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { duration, easing } from '@/lib/motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { locales, localeNames, Locale } from '@/i18n/routing'

/**
 * Navbar Component
 *
 * Animation approach (Healthcare UX):
 * - CSS transitions for hover states (fast, 200ms)
 * - Gentle slide-down for mobile menu
 * - No aggressive movements
 * - Focus states for accessibility
 */

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

function NavLink({ href, children, onClick, className = '' }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href as '/about' | '/programs' | '/partners' | '/news' | '/contact' | '/donate' | '/'}
      onClick={onClick}
      className={`relative inline-block pr-1 motion-colors focus-ring ${className}`}
    >
      <span className={`block whitespace-nowrap ${isActive ? 'text-primary font-medium' : 'text-primary hover:text-primary-alt'}`}>
        {children}
      </span>
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
      )}
    </Link>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const languageRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLanguage = localeNames[locale as Locale] || localeNames.en

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setIsLanguageOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Mini nav */}
      <div className="h-10 bg-[#0F766E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Left side - Quick Links */}
          <div className="flex items-center gap-4 text-xs">
            <Link href="/about" className="text-white/80 hover:text-white motion-colors focus-ring">
              {t('about')}
            </Link>
            <div className="w-px h-4 bg-white/30" />
            <Link href="/contact" className="text-white/80 hover:text-white motion-colors focus-ring">
              {t('contact')}
            </Link>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <Link href="/partners" className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white motion-colors focus-ring">
              {t('partners')}
            </Link>
          </div>

          {/* Right side - Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-2 text-white/80 hover:text-white motion-colors text-sm focus-ring"
              aria-expanded={isLanguageOpen}
              aria-haspopup="listbox"
            >
              {/* Language Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
              <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.nativeName}</span>
              <span className="sm:hidden">{currentLanguage.flag}</span>
              {/* Chevron */}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown */}
            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute end-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden z-50"
                  role="listbox"
                >
                  <div className="py-2">
                    <p className="px-4 py-2 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                      {t('selectLanguage')}
                    </p>
                    {locales.map((loc) => {
                      const langInfo = localeNames[loc]
                      return (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-zinc-50 motion-colors ${
                            locale === loc ? 'bg-[#0F766E]/5' : ''
                          }`}
                          role="option"
                          aria-selected={locale === loc}
                        >
                          <span className="text-lg">{langInfo.flag}</span>
                          <div className="flex-1">
                            <p className={`text-sm ${locale === loc ? 'text-[#0F766E] font-medium' : 'text-zinc-900'}`}>
                              {langInfo.nativeName}
                            </p>
                            <p className="text-xs text-zinc-500">{langInfo.name}</p>
                          </div>
                          {locale === loc && (
                            <svg className="w-4 h-4 text-[#0F766E]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main nav - Logo section */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 focus-ring">
              <Image
                src="/officiallogo.jpeg"
                alt="CanCAF Logo"
                width={280}
                height={95}
                className="h-12 md:h-14 lg:h-16 w-auto"
              />
              <div className="">
                <p className="text-lg font-semibold text-[#0F766E] font-[family-name:var(--font-montserrat)]">
                  CanCAF
                </p>
                <p className="text-xs text-zinc-500">
                  Cancer Capacity Building in Africa
                </p>
              </div>
            </Link>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/donate"
                className="h-[48px] flex items-center justify-center gap-2 px-6 py-2 bg-[#F59E0B] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98] focus-ring"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {t('donate')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-black motion-colors focus-ring"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom nav - Navigation links */}
      <div className="h-12 bg-[#0F766E] hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          {/* Navigation Links */}
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded motion-colors focus-ring">
                {t('about')}
              </Link>
            </li>
            <li>
              <Link href="/programs" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded motion-colors focus-ring">
                {t('programs')}
              </Link>
            </li>
            <li>
              <Link href="/partners" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded motion-colors focus-ring">
                {t('partners')}
              </Link>
            </li>
            <li>
              <Link href="/news" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded motion-colors focus-ring">
                {t('news')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded motion-colors focus-ring">
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu - Animated */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden border-b border-zinc-200 bg-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: duration.normal,
              ease: easing.gentle,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <ul className="space-y-4">
                <li>
                  <NavLink href="/about" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('about')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/programs" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('programs')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/partners" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('partners')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/news" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('news')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/contact" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('contact')}
                  </NavLink>
                </li>
                <li className="pt-2">
                  <Link
                    href="/donate"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#F59E0B] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#D4A017] active:scale-[0.98] focus-ring"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {t('donate')}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
