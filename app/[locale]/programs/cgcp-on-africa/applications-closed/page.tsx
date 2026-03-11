'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'

/**
 * Applications Closed Page
 *
 * Displayed when CGCPON applications are not currently open
 */

// Note: Metadata for this page is defined in layout.tsx or parent route
// since this is a client component

export default function ApplicationsClosedPage() {

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

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 max-w-xl mx-auto"
          >
            <div className="w-16 h-16 bg-[#0F766E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-6">
              Please check back later for future application periods. You can also follow our news section for announcements about when applications will open.
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
          </motion.div>
        </div>
      </section>

      {/* Programme Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
              About the Programme
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              While applications are currently closed, you can learn more about what the CGCPON Africa programme offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <div className="w-12 h-12 bg-[#0F766E]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">11 Modules</h3>
              <p className="text-sm text-zinc-600">Comprehensive curriculum covering genetics, counselling, and practical assessment.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <div className="w-12 h-12 bg-[#0F766E]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">100% Virtual</h3>
              <p className="text-sm text-zinc-600">Fully online programme accessible from anywhere in Africa.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <div className="w-12 h-12 bg-[#0F766E]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Certificate</h3>
              <p className="text-sm text-zinc-600">Earn a recognized certificate in cancer genetic counselling.</p>
            </div>

            {/* Card 4 - Application Fee */}
            <div className="bg-[#F59E0B]/10 rounded-xl p-6 border border-[#F59E0B]/30">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Application Fee</h3>
              <p className="text-sm text-zinc-600"><strong className="text-[#F59E0B]">GHS 200</strong> or <strong className="text-[#F59E0B]">$20 USD</strong></p>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p className="text-sm text-zinc-500 text-center mb-6">In Partnership With</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Image src="/CancafLogoRemBg.png" alt="CanCAF" width={100} height={50} className="h-10 w-auto opacity-70" />
              <Image src="/wagmcAlone.png" alt="WAGMC" width={100} height={50} className="h-10 w-auto opacity-70" />
              <Image src="/asterLogoAlone.png" alt="Aster Guardians" width={100} height={50} className="h-10 w-auto opacity-70" />
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
