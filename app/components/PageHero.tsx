'use client'

import { motion } from 'motion/react'

/**
 * Page Hero Component
 *
 * Reusable hero section for interior pages
 * Design: Dark background with tag, large title, and subtitle
 * Note: Includes pt-[132px] to account for fixed navbar (36px mini bar + 96px main nav)
 * Animation: Simple fade-up with staggered reveal
 */

interface PageHeroProps {
  tag: string
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHero({
  tag,
  title,
  subtitle,
  backgroundImage = '/home/hero.webp',
}: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] w-full bg-zinc-900 pt-[132px]">
      {/* Background Image - blurred and grayscale */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-sm grayscale"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Subtle teal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/30 via-[#0F766E]/40 to-[#0F766E]/50" />

      {/* Content - Bottom Left aligned */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#0F766E] text-white text-sm font-medium rounded-full mb-6">
              {tag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="mt-5 text-base md:text-lg text-white/80 max-w-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
