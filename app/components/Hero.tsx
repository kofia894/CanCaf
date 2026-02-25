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
  return (
    <section className="relative h-[80vh] min-h-[450px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/hero.jpg')",
        }}
      >
        {/* Gradient Overlay - teal gradient for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/100 via-[#000000]/40 to-transparent" />
      </div>

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
              href="/programs"
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
