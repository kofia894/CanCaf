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
 * Single-bar navbar with transparent background on hero,
 * transitioning to solid background with colored logo on scroll.
 * Smooth, elegant transitions for healthcare UX.
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
          : 'hover:bg-white/15'
      } ${className}`}
    >
      <span className={`block whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
        isScrolled
          ? isActive ? 'text-[#0F766E]' : 'text-zinc-700 hover:text-[#0F766E]'
          : isActive ? 'text-white' : 'text-white/90 hover:text-white'
      }`}>
        {children}
      </span>
      {isActive && (
        <span className={`absolute bottom-1 left-3 right-3 h-[2px] transition-colors duration-300 ${
          isScrolled ? 'bg-[#0F766E]' : 'bg-white'
        }`} />
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
  const showWhiteLogo = showTransparent

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out">
      {/* Wrapper for centered pill navbar */}
      <div className="pt-4 px-4 transition-all duration-500 ease-out">
        <div className={`max-w-5xl mx-auto rounded-full border transition-all duration-500 ease-out ${
          showTransparent
            ? 'bg-black/40 backdrop-blur-md border-white/10'
            : 'bg-white shadow-lg border-zinc-200/50'
        }`}>
          <div className="flex items-center justify-between h-16 px-5 sm:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 focus-ring">
              <div className="relative h-10 md:h-12 w-auto">
                {/* White logo for transparent state */}
                <Image
                  src="/whitefilllogo.png"
                  alt="CanCAF Logo"
                  width={280}
                  height={95}
                  className={`h-10 md:h-12 w-auto transition-opacity duration-500 ${
                    showWhiteLogo ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  priority
                />
                {/* Colored logo for scrolled state */}
                <Image
                  src="/CancafLogoRemBg.png"
                  alt="CanCAF Logo"
                  width={280}
                  height={95}
                  className={`h-10 md:h-12 w-auto transition-opacity duration-500 ${
                    showWhiteLogo ? 'opacity-0 absolute inset-0' : 'opacity-100'
                  }`}
                  priority
                />
              </div>
              {/* Text next to logo - hidden on mobile for cleaner look */}
              <div className="hidden md:block">
                <p className={`text-base font-semibold font-[family-name:var(--font-montserrat)] transition-colors duration-500 ${
                  showWhiteLogo ? 'text-white' : 'text-[#0F766E]'
                }`}>
                  CanCAF
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

            {/* Right side - Language + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 text-sm focus-ring ${
                    showTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  aria-expanded={isLanguageOpen}
                  aria-haspopup="listbox"
                >
                  {/* Language Icon */}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                  <span className="hidden sm:inline">{currentLanguage.flag}</span>
                  {/* Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300 focus-ring ${
                  showTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                }`}
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
            className="lg:hidden mt-2 mx-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: duration.normal,
              ease: easing.gentle,
            }}
          >
            <div className={`rounded-2xl border transition-all duration-500 ${
              showTransparent
                ? 'bg-black/40 backdrop-blur-md border-white/10'
                : 'bg-white shadow-lg border-zinc-200/50'
            }`}>
              <div className="px-4 py-4">
                <ul className="space-y-1">
                  <li>
                    <NavLink href="/about" className="block w-full" isScrolled={!showTransparent} onClick={() => setIsMobileMenuOpen(false)}>
                      {t('about')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/programs" className="block w-full" isScrolled={!showTransparent} onClick={() => setIsMobileMenuOpen(false)}>
                      {t('programs')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/partners" className="block w-full" isScrolled={!showTransparent} onClick={() => setIsMobileMenuOpen(false)}>
                      {t('partners')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/news" className="block w-full" isScrolled={!showTransparent} onClick={() => setIsMobileMenuOpen(false)}>
                      {t('news')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="/contact" className="block w-full" isScrolled={!showTransparent} onClick={() => setIsMobileMenuOpen(false)}>
                      {t('contact')}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
