'use client'

import { motion } from 'motion/react'

/**
 * Page Hero Component
 *
 * Reusable hero section for interior pages (50vh height)
 * Design: Dark background with tag, large title, and subtitle
 * Animation approach (Healthcare UX):
 * - Blur-to-clear fade-up animation
 * - Slower, smoother staggered reveal
 */

interface PageHeroProps {
  tag: string
  title: string
  subtitle?: string
  backgroundImage?: string
}

const heroEasing = [0.25, 0.1, 0.25, 1] as const

export default function PageHero({
  tag,
  title,
  subtitle,
  backgroundImage = '/home/hero.webp',
}: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] w-full bg-zinc-900">
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
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-16">
        <div className="max-w-2xl">
          {/* Tag */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
              filter: 'blur(6px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.6,
              ease: heroEasing,
              delay: 0.1,
            }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#0F766E] text-white text-sm font-medium rounded-full mb-6">
              {tag}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-[1.1] tracking-tight"
            initial={{
              opacity: 0,
              y: 20,
              filter: 'blur(8px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.8,
              ease: heroEasing,
              delay: 0.2,
            }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="mt-5 text-base md:text-lg text-white/80 max-w-xl"
              initial={{
                opacity: 0,
                y: 15,
                filter: 'blur(6px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              transition={{
                duration: 0.7,
                ease: heroEasing,
                delay: 0.4,
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
