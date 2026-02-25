'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import {
  duration,
  easing,
  easeOutQuart,
  scrollRevealProps,
  staggerContainer,
  staggerItem,
  fadeUp,
} from '@/lib/motion'

/**
 * Impact Stats Section
 *
 * Animation approach (Healthcare UX):
 * - Calm counter animation (1.2s, gentle deceleration)
 * - Scroll-triggered reveals with subtle upward motion
 * - No aggressive movements or attention-grabbing effects
 * - Statistics presented calmly to avoid causing anxiety
 */

interface AnimatedCounterProps {
  value: number
  suffix?: string
}

function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration.counter * 1000), 1)

      // Use centralized easing function
      const easedProgress = easeOutQuart(progress)
      setCount(Math.floor(easedProgress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function ImpactStatsSection() {
  const t = useTranslations('impact')

  return (
    <section className="relative bg-zinc-900 py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Accents - static, no animation needed */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F766E]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          {...scrollRevealProps}
          variants={staggerContainer}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-5"
            variants={staggerItem}
          >
            <span className="w-2 h-2 bg-[#F59E0B] rounded-full"></span>
            <span className="text-sm text-zinc-400">{t('tag')}</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-white font-[family-name:var(--font-montserrat)] leading-[1.15] max-w-3xl mx-auto"
            variants={staggerItem}
          >
            {t('title')}
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Stat Card 1 - New Cases */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50"
            {...scrollRevealProps}
            variants={fadeUp}
          >
            {/* Large background number - static decoration */}
            <div className="absolute -right-8 -top-8 text-[180px] lg:text-[220px] font-bold text-[#0F766E]/10 font-[family-name:var(--font-montserrat)] leading-none select-none">
              1.1
            </div>

            <div className="relative p-8 lg:p-10">
              {/* Main stat */}
              <div className="mb-2">
                <span className="text-7xl lg:text-8xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                  <AnimatedCounter value={1.1} suffix="" />M+
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-semibold text-white font-[family-name:var(--font-montserrat)] mb-2">
                {t('newCases')}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                {t('newCasesDesc')}
              </p>
            </div>
          </motion.div>

          {/* Stat Card 2 - Deaths */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: duration.slow,
              ease: easing.gentle,
              delay: 0.1,
            }}
          >
            {/* Large background number - static decoration */}
            <div className="absolute -right-20 lg:-right-28 -top-6 text-[180px] lg:text-[220px] font-bold text-[#0F766E]/10 font-[family-name:var(--font-montserrat)] leading-none select-none">
              700
            </div>

            <div className="relative p-8 lg:p-10">
              {/* Main stat */}
              <div className="mb-2">
                <span className="text-7xl lg:text-8xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                  <AnimatedCounter value={700} suffix="" />K+
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-semibold text-white font-[family-name:var(--font-montserrat)] mb-2">
                {t('livesLost')}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                {t('livesLostDesc')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hope Message */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: duration.slow,
            ease: easing.gentle,
            delay: 0.2,
          }}
        >
          <div className="inline-flex items-center gap-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-full px-6 py-4">
            <div className="w-10 h-10 rounded-full bg-[#0F766E]/20 border border-[#0F766E]/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#0F766E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-zinc-300 text-sm md:text-base">
              <span className="text-white font-medium">{t('earlyDetection')}</span>{' '}
              {t('earlyDetectionDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
