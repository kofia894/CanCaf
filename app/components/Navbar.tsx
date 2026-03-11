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
 * Two-tier navbar with mini teal bar on top and main navbar below.
 * Main navbar has transparent background on hero, transitioning to solid on scroll.
 * Always uses colored logo.
 */

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
  isScrolled?: boolean
}

function NavLink({ href, children, onClick, className = '', isScrolled = false }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href as '/about' | '/programs' | '/partners' | '/news' | '/contact' | '/donate' | '/'}
      onClick={onClick}
      className={`relative inline-block px-3 py-2 rounded-lg transition-all duration-300 focus-ring ${
        isScrolled
          ? 'hover:bg-zinc-100'
          : 'hover:bg-black/10'
      } ${className}`}
    >
      <span className={`block whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
        isScrolled
          ? isActive ? 'text-[#0F766E]' : 'text-zinc-700 hover:text-[#0F766E]'
          : isActive ? 'text-[#0F766E]' : 'text-zinc-700 hover:text-[#0F766E]'
      }`}>
        {children}
      </span>
      {isActive && (
        <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#0F766E] transition-colors duration-300" />
      )}
    </Link>
  )
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const languageRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  // Pages with hero sections that should have transparent navbar
  const pagesWithHero = ['/', '/about', '/programs', '/partners', '/news', '/contact', '/donate', '/programs/cgcp-on-africa']
  const hasHero = pagesWithHero.includes(pathname)

  // Scroll detection for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      // Transition happens after scrolling ~300px (past the initial hero view)
      const scrollThreshold = 300
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Close mobile menu on scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrolled])

  const currentLanguage = localeNames[locale as Locale] || localeNames.en

  const handleLanguageChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setIsLanguageOpen(false)
  }

  // Determine navbar appearance based on scroll state and page
  const showTransparent = hasHero && !isScrolled

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Mini Top Bar - Teal */}
      <div className="bg-[#0F766E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            {/* Left side - Contact info */}
            <div className="hidden sm:flex items-center gap-4">
              <a href="mailto:info@cancaf.org" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>info@cancaf.org</span>
              </a>
            </div>

            {/* Right side - Language Selector + Tagline */}
            <div className="flex items-center gap-4 ms-auto">
              <span className="hidden md:inline text-white/80">Strengthening Cancer Care Across Africa</span>

              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 text-xs focus-ring text-white/90 hover:text-white hover:bg-white/10"
                  aria-expanded={isLanguageOpen}
                  aria-haspopup="listbox"
                >
                  {/* Language Icon */}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                  <span>{currentLanguage.flag}</span>
                  <span className="hidden sm:inline">{locale.toUpperCase()}</span>
                  {/* Chevron */}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
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
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
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
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-500 ease-out ${
        showTransparent
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/30'
          : 'bg-white shadow-md border-b border-zinc-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24 py-2 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 focus-ring">
              <div className="relative h-10 md:h-14 w-auto">
                <Image
                  src="/CancafLogoRemBg.png"
                  alt="CanCAF Logo"
                  width={280}
                  height={95}
                  className="h-10 md:h-14 w-auto"
                  priority
                />
              </div>
              {/* Text next to logo - shown on all screens */}
              <div>
                <p className="text-base md:text-lg font-bold font-[family-name:var(--font-montserrat)] text-[#0F766E] leading-tight">
                  CanCAF
                </p>
                <p className="text-[10px] md:text-xs text-zinc-500 font-medium leading-tight">
                  Cancer Care Africa Foundation
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink href="/about" isScrolled={!showTransparent}>{t('about')}</NavLink>
              <NavLink href="/programs" isScrolled={!showTransparent}>{t('programs')}</NavLink>
              <NavLink href="/partners" isScrolled={!showTransparent}>{t('partners')}</NavLink>
              <NavLink href="/news" isScrolled={!showTransparent}>{t('news')}</NavLink>
              <NavLink href="/contact" isScrolled={!showTransparent}>{t('contact')}</NavLink>
            </div>

            {/* Right side - Donate + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Donate Button - Desktop only (hidden on mobile, shown in mobile menu) */}
              <Link
                href="/donate"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D97706] hover:-translate-y-0.5 active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {t('donate')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 focus-ring text-zinc-600 hover:text-black hover:bg-zinc-100"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Animated */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-b border-zinc-200 shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: duration.normal,
              ease: easing.gentle,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <ul className="space-y-1">
                <li>
                  <NavLink href="/about" className="block w-full" isScrolled onClick={() => setIsMobileMenuOpen(false)}>
                    {t('about')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/programs" className="block w-full" isScrolled onClick={() => setIsMobileMenuOpen(false)}>
                    {t('programs')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/partners" className="block w-full" isScrolled onClick={() => setIsMobileMenuOpen(false)}>
                    {t('partners')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/news" className="block w-full" isScrolled onClick={() => setIsMobileMenuOpen(false)}>
                    {t('news')}
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/contact" className="block w-full" isScrolled onClick={() => setIsMobileMenuOpen(false)}>
                    {t('contact')}
                  </NavLink>
                </li>
              </ul>

              {/* Mobile Donate Button */}
              <div className="mt-4 pt-4 border-t border-zinc-200">
                <Link
                  href="/donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#F59E0B] text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#D97706] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {t('donate')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
