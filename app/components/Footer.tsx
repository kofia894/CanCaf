'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

/**
 * Footer Component
 *
 * Animation approach (Healthcare UX):
 * - Subtle hover transitions on links (200ms)
 * - Marquee animation: SLOW (20s), very subtle (20% opacity)
 * - The marquee is acceptable because:
 *   1. It's purely decorative, not content-critical
 *   2. Very low contrast (20% opacity)
 *   3. Slow enough to not cause distraction
 *   4. Users with motion sensitivity can rely on prefers-reduced-motion
 */

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cancer-care-africa-cancaf/' },
  { label: 'X/Twitter', href: 'https://twitter.com/CCancaf' },
]

const marqueeWords = [
  'Cancer Care', 'Training', 'Awareness', 'Partnerships', 'Capacity Building', 'Research', 'Prevention', 'Treatment', 'Support', 'Africa', 'Healthcare', 'Community',
  'Cancer Care', 'Training', 'Awareness', 'Partnerships', 'Capacity Building', 'Research', 'Prevention', 'Treatment', 'Support', 'Africa', 'Healthcare', 'Community'
]

function StarIcon() {
  return (
    <svg className="w-5 h-5 mx-6 text-white/20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
    </svg>
  )
}

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  const navigationLinks = [
    { label: nav('about'), href: '/about' as const },
    { label: nav('programs'), href: '/programs' as const },
    { label: nav('donate'), href: '/donate' as const },
  ]

  const otherLinks = [
    { label: nav('news'), href: '/news' as const },
    { label: nav('contact'), href: '/contact' as const },
    { label: nav('partners'), href: '/partners' as const },
  ]

  return (
    <footer className="bg-[#0a3d38] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 focus-ring">
              <Image
                src="/CancafLogoRemBg.png"
                alt="CanCAF Logo"
                width={60}
                height={60}
                className="h-12 w-auto rounded"
              />
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                CanCAF
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/50 text-sm mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center text-white hover:text-[#F59E0B] motion-colors text-sm focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-white/50 text-sm mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {otherLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center text-white hover:text-[#F59E0B] motion-colors text-sm focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white/50 text-sm mb-6">{t('connect')}</h4>
            <ul className="space-y-3 mb-8">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-[#F59E0B] motion-colors text-sm focus-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-white/50 text-sm mb-4">{nav('contact')}</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>info@cancaf.org</p>
              <p>
                <a href="tel:+233593443344" className="hover:text-[#F59E0B] motion-colors">
                  +233 593 443 344
                </a>
              </p>
              <p>Accra, Ghana</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} CanCAF. {t('rights')}
            </p>
            <p className="text-white/50 text-sm">
              {t('tagline')}
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Section - Decorative, respects prefers-reduced-motion via CSS */}
      <div className="bg-[#0a3d38] border-t border-white/10 py-6 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {marqueeWords.map((word, index) => (
            <span key={index} className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold text-white/20 font-[family-name:var(--font-montserrat)]">
                {word}
              </span>
              <StarIcon />
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
