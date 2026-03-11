'use client'

import { motion } from 'motion/react'
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

  return (
    <section className="relative h-[95vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/hero.webp')",
        }}
      >
        {/* Gradient Overlay - Left side darker for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Main Content - Left Side */}
        <div className="max-w-2xl pt-24 md:pt-32">
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

        </div>

        {/* Application Card - Bottom Right */}
        <motion.div
          className="absolute bottom-8 end-4 md:bottom-12 md:end-8 lg:bottom-16 lg:end-16 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        >
          <Link
            href="/programs/cgcp-on-africa"
            className="group block bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/20 hover:scale-[1.02] motion-fast max-w-xs md:max-w-sm"
          >
            {/* Header with Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">
                  {tCgcp('acceptingApplications')}
                </span>
              </div>
            </div>

            {/* Programme Title */}
            <h3 className="text-lg font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-1">
              CGCP-ON Africa
            </h3>
            <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
              Cancer Genetic Counselling Certificate Programme for Oncology Nurses
            </p>

            {/* Partner Logos */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center border-2 border-zinc-200 shadow-md overflow-hidden">
                  <Image
                    src="/CancafLogoRemBg.png"
                    alt="CanCAF"
                    width={32}
                    height={32}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center border-2 border-zinc-200 shadow-md overflow-hidden">
                  <Image
                    src="/wagmcAlone.png"
                    alt="WAGMC"
                    width={32}
                    height={32}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center border-2 border-zinc-200 shadow-md overflow-hidden">
                  <Image
                    src="/asterLogoAlone.png"
                    alt="Aster"
                    width={32}
                    height={32}
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-600">In partnership with WAGMC & Aster</span>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0F766E] group-hover:text-[#0D6B64]">
                {tCgcp('applyNow')}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center group-hover:bg-[#0D6B64] transition-colors">
                <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
