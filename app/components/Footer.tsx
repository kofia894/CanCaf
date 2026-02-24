'use client'

import Link from 'next/link'
import Image from 'next/image'

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Donate', href: '/donate' },
]

const otherLinks = [
  { label: 'Training', href: '/training' },
  { label: 'News', href: '/news' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'X/Twitter', href: '#' },
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
  return (
    <footer className="bg-[#0a3d38] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
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
              Strengthening cancer care systems across Africa through capacity building, awareness, advocacy, and partnerships.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/50 text-sm mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center text-white hover:text-[#F59E0B] transition-colors text-sm group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-white/50 text-sm mb-6">Other Links</h4>
            <ul className="space-y-3">
              {otherLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center text-white hover:text-[#F59E0B] transition-colors text-sm group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white/50 text-sm mb-6">Social Connect</h4>
            <ul className="space-y-3 mb-8">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center text-white hover:text-[#F59E0B] transition-colors text-sm group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white/50 text-sm mb-4">Contact us</h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>info@cancaf.org</p>
              <p>Accra, Ghana</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              All copyrights reserved for @CanCAF
            </p>
            <p className="text-white/50 text-sm">
              Strengthening Cancer Care Capacity Across Africa
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
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
