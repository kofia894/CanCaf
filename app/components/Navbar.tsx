'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: string
  onClick?: () => void
  className?: string
}

function NavLink({ href, children, onClick, className = '' }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-block pr-1 ${className}`}
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Mini nav */}
      <div className="h-10 bg-[#0F766E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Left side - Quick Links */}
          <div className="flex items-center gap-4 text-xs">
            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              About Us
            </Link>
            <div className="w-px h-4 bg-white/30" />
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <Link href="/partners" className="hidden sm:flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              Partners & Supporters
            </Link>
          </div>

          {/* Right side - Language Selector */}
          <div className="flex items-center">
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
              {/* Language Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
              <span>Select language</span>
              {/* Chevron */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main nav - Logo section */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
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
                className="h-[48px] flex items-center justify-center gap-2 px-6 py-2 bg-[#F59E0B] text-white rounded-full text-sm font-medium hover:bg-[#D4A017] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 w-10 h-10 flex items-center justify-center text-zinc-600 hover:text-black transition-colors"
              aria-label="Toggle menu"
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
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors">
                About CanCAF
              </Link>
            </li>
            <li>
              <Link href="/programs" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/training" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors">
                Training
              </Link>
            </li>
            <li>
              <Link href="/news" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors">
                News
              </Link>
            </li>
            <li>
              <Link href="/resources" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ul className="space-y-4">
              <li>
                <NavLink href="/" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink href="/about" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink href="/programs" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Programs
                </NavLink>
              </li>
              <li>
                <NavLink href="/training" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Training
                </NavLink>
              </li>
              <li>
                <NavLink href="/news" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  News
                </NavLink>
              </li>
              <li>
                <NavLink href="/resources" className="block py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Resources
                </NavLink>
              </li>
              <li className="pt-2">
                <Link
                  href="/donate"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent text-white rounded-full text-sm font-medium hover:bg-accent-alt transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}
