'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

/**
 * Hero Section
 *
 * Animation: Simple fade-up with staggered reveal
 */

export default function Hero() {
  const t = useTranslations('hero')
  const tCgcp = useTranslations('cgcpOnAfrica')
  const [flyerOpen, setFlyerOpen] = useState(false)

  return (
    <>
      {/* Fullscreen flyer overlay (mobile) */}
      <AnimatePresence>
        {flyerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
            onClick={() => setFlyerOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setFlyerOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Flyer image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/launchflyer.webp"
                alt="CGCP-ON Africa Programme Flyer"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* View programme link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <Link
                href="/programs/cgcp-on-africa"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white rounded-full text-sm font-semibold shadow-lg"
                onClick={() => setFlyerOpen(false)}
              >
                View Programme
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/hero.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content Container - Two Column Layout */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-48 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(95vh-10rem)]">
          {/* Left - Text Content */}
          <div>
            {/* Headline */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white font-[family-name:var(--font-montserrat)] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {t('title')}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/85 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-6 md:mt-8 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F766E] text-white rounded-full text-sm font-semibold motion-fast hover:bg-[#0D6B64] hover:-translate-y-0.5 active:scale-[0.98] shadow-lg"
              >
                {t('cta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full text-sm font-semibold motion-fast hover:bg-white/20 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>

            {/* Mobile Flyer */}
            <motion.div
              className="lg:hidden mt-8 flex justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            >
              <button onClick={() => setFlyerOpen(true)} className="block relative">
                <div className="relative">
                  {/* Shadow cards */}
                  <div className="absolute inset-0 bg-white/10 rounded-2xl rotate-2 translate-x-2 translate-y-2 border border-white/5" />
                  <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden w-[320px] sm:w-[360px] md:w-[400px] border border-white/20">
                    <Image
                      src="/launchflyer.webp"
                      alt="CGCP-ON Africa Programme Flyer"
                      width={400}
                      height={533}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <p className="text-center text-white/50 text-xs mt-3 font-medium">
                  Tap to view flyer
                </p>
              </button>
            </motion.div>
          </div>

          {/* Right - Flyer (desktop only) */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <Link href="/programs/cgcp-on-africa" className="block">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 3 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                className="relative"
              >
                {/* Shadow cards behind */}
                <div className="absolute inset-0 bg-white/10 rounded-3xl -rotate-3 translate-x-4 translate-y-4 border border-white/5" />
                <div className="absolute inset-0 bg-white/5 rounded-3xl rotate-1 -translate-x-2 translate-y-7 border border-white/5" />

                {/* Main flyer card */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-[380px] xl:w-[420px] border border-white/20 hover:rotate-0 hover:scale-110 transition-all duration-500 ease-out cursor-pointer group hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:z-20">
                  <Image
                    src="/launchflyer.webp"
                    alt="CGCP-ON Africa Programme Flyer"
                    width={420}
                    height={560}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  )
}
