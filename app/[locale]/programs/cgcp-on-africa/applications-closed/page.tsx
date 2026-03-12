'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { submitNotificationInterest } from '@/app/actions/submitNotificationInterest'

/**
 * Applications Closed Page
 *
 * Displayed when CGCPON applications are not currently open
 */

// Note: Metadata for this page is defined in layout.tsx or parent route
// since this is a client component

export default function ApplicationsClosedPage() {
  const t = useTranslations('notifyMe')
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      const result = await submitNotificationInterest({
        name: formData.name,
        email: formData.email,
        programme: 'cgcpon-africa',
      })

      if (result.success) {
        setFormState('success')
      } else {
        setFormState('error')
        setErrorMessage(result.message)
      }
    } catch {
      setFormState('error')
      setErrorMessage(t('errorMessage'))
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full bg-zinc-900 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/home/capacitybuilding.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-[#0F766E]/30 to-zinc-900/90" />

        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full border border-amber-500/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Applications Opening Soon
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            CGCPON Africa Applications
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          >
            Applications for the Cancer Genetic Counselling Certificate Programme for Oncology Nurses are not currently open.
          </motion.p>

          {/* Notification Interest Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 max-w-xl mx-auto"
          >
            {formState === 'success' ? (
              <>
                <div className="w-16 h-16 bg-[#0F766E]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{t('successTitle')}</h3>
                <p className="text-white/70 text-sm mb-6">
                  {t('successMessage')}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/programs/cgcp-on-africa"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0F766E]/90 active:scale-[0.98]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Programme
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#0F766E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{t('title')}</h3>
                <p className="text-white/70 text-sm mb-6">
                  {t('description')}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder={t('namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent text-sm"
                  />
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent text-sm"
                  />

                  {formState === 'error' && errorMessage && (
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0F766E]/90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('submitting')}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                        {t('submit')}
                      </>
                    )}
                  </button>
                </form>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 pt-6 border-t border-white/10">
                  <Link
                    href="/programs/cgcp-on-africa"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full text-sm font-medium motion-fast hover:bg-white/20 active:scale-[0.98]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Programme
                  </Link>
                  <Link
                    href="/news"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full text-sm font-medium motion-fast hover:bg-white/20 active:scale-[0.98]"
                  >
                    View News
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Programme Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0F766E]/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#0F766E] rounded-full"></span>
              <span className="text-sm text-[#0F766E] font-medium">Programme Overview</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
              About the Programme
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
              While applications are currently closed, discover what makes CGCPON Africa unique.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 - Modules (Large) */}
            <div className="group relative bg-gradient-to-br from-[#0F766E] to-[#0d5f58] rounded-3xl p-8 md:p-10 text-white overflow-hidden lg:col-span-2">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <span className="text-6xl md:text-7xl font-bold text-white/20 font-[family-name:var(--font-montserrat)]">11</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 font-[family-name:var(--font-montserrat)]">Comprehensive Modules</h3>
                <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md">
                  From fundamentals of genetics to practical counselling skills, our curriculum covers everything you need.
                </p>
              </div>
            </div>

            {/* Card 2 - Virtual */}
            <div className="group relative bg-zinc-900 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full mb-4">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-emerald-400 font-medium">100% Online</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-montserrat)]">Virtual Learning</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Access from anywhere in Africa with flexible scheduling.
                </p>
              </div>
            </div>

            {/* Card 3 - Certificate */}
            <div className="group relative bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-3xl p-8 overflow-hidden border border-zinc-200">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#0F766E]/5 rounded-full"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-[#0F766E]/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2 font-[family-name:var(--font-montserrat)]">Recognized Certificate</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Earn a professional certificate in cancer genetic counselling upon completion.
                </p>
              </div>
            </div>

            {/* Card 4 - Duration */}
            <div className="group relative bg-gradient-to-br from-zinc-100 to-zinc-50 rounded-3xl p-8 overflow-hidden border border-zinc-200">
              <div className="relative">
                <div className="w-12 h-12 bg-[#0F766E]/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2 font-[family-name:var(--font-montserrat)]">3 Month Programme</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  April – June 2026. Intensive yet flexible training for working professionals.
                </p>
              </div>
            </div>

            {/* Card 5 - Application Fee (Highlighted) */}
            <div className="group relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm font-medium mb-1">Application Fee</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold font-[family-name:var(--font-montserrat)]">$20</span>
                  <span className="text-white/70 text-sm">USD</span>
                </div>
                <p className="text-white/70 text-sm">or GHS 200</p>
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-16 pt-10 border-t border-zinc-200">
            <p className="text-sm text-zinc-500 text-center mb-8 font-medium uppercase tracking-wider">In Partnership With</p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              <div className="group">
                <Image
                  src="/CancafLogoRemBg.png"
                  alt="CanCAF"
                  width={120}
                  height={60}
                  className="h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="group">
                <Image
                  src="/wagmcAlone.png"
                  alt="WAGMC"
                  width={120}
                  height={60}
                  className="h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-600 mb-4">Have questions about the programme?</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full text-sm font-medium motion-fast hover:bg-zinc-800 active:scale-[0.98]"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
