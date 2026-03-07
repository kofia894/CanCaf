'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

/**
 * Hero Section
 *
 * Animation approach (Healthcare UX):
 * - Blur-to-clear fade-up animation (calm, cinematic feel)
 * - Slower, smoother staggered reveal: headline → subtext → buttons
 * - Creates a gentle "coming into focus" effect
 * - Respects prefers-reduced-motion via motion library
 */

// Slower, smoother easing for hero animations
const heroEasing = [0.25, 0.1, 0.25, 1] as const // Smooth ease-in-out

export default function Hero() {
  const t = useTranslations('hero')
  const tCgcp = useTranslations('cgcpOnAfrica')

  return (
    <section className="relative h-screen min-h-[600px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/hero.webp')",
        }}
      >
        {/* Gradient Overlay - darker for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      {/* Programme Announcement - Slide-in Toast */}
      <motion.div
        className="absolute top-56 end-4 md:top-64 md:end-8 z-10 max-w-sm"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: heroEasing, delay: 0.8 }}
      >
        <Link
          href="/programs/cgcp-on-africa"
          className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full py-2 ps-2 pe-5 shadow-2xl hover:shadow-xl border border-white/20 hover:scale-[1.02] motion-fast"
        >
          {/* Icon Circle */}
          <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            {/* Ping indicator */}
            <span className="absolute -top-0.5 -end-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">{tCgcp('acceptingApplications')}</p>
            <p className="text-sm font-bold text-zinc-900 truncate">CGCP-ON Africa</p>
          </div>

          {/* Arrow */}
          <svg className="w-4 h-4 text-zinc-400 group-hover:text-[#0F766E] group-hover:translate-x-1 motion-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      </motion.div>

      {/* Content - Bottom Left */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 md:pb-24">
        <div className="max-w-2xl">
          {/* Headline - First to appear with blur effect */}
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-montserrat)] leading-snug"
            initial={{
              opacity: 0,
              y: 30,
              filter: 'blur(10px)'
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 0.9,
              ease: heroEasing,
              delay: 0.2,
            }}
          >
            {t('title')}
          </motion.h1>

          {/* Subtext - Second to appear with blur effect */}
          <motion.p
            className="mt-4 md:mt-6 text-lg md:text-xl text-white/90"
            initial={{
              opacity: 0,
              y: 25,
              filter: 'blur(8px)'
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 0.8,
              ease: heroEasing,
              delay: 0.5,
            }}
          >
            {t('subtitle')}
          </motion.p>

          {/* Buttons - Last to appear with blur effect */}
          <motion.div
            className="mt-6 md:mt-8 flex flex-wrap gap-4"
            initial={{
              opacity: 0,
              y: 20,
              filter: 'blur(6px)'
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 0.7,
              ease: heroEasing,
              delay: 0.8,
            }}
          >
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#0F766E] rounded-md text-sm font-medium motion-fast hover:bg-white/90 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t('cta')}
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#F59E0B] text-white rounded-md text-sm font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
