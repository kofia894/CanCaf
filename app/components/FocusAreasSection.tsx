'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslations, useLocale } from 'next-intl'
import { duration, easing, scrollRevealProps, staggerContainer, staggerItem, transitions } from '@/lib/motion'

/**
 * Focus Areas Section
 *
 * Animation approach (Healthcare UX):
 * - Scroll-triggered header reveal
 * - Cards have subtle opacity fade based on distance from center
 * - Card hover: gentle 4px lift (not 8px - too aggressive)
 * - No spring physics (causes bounce) - use gentle easing instead
 * - No icon rotation on hover (too playful)
 * - Button hover: subtle, no scale animation
 */

const focusAreas = [
  {
    title: 'Capacity Building & Workforce Development',
    description: 'We strengthen the skills and knowledge of healthcare professionals and institutions to deliver quality cancer prevention, diagnosis, treatment, and supportive care.',
    image: '/home/capacitybuilding.webp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
      </svg>
    ),
  },
  {
    title: 'Cancer Awareness & Early Detection',
    description: 'We promote education and community engagement to improve cancer prevention, screening uptake, and early detection across Africa.',
    image: '/home/ealydetect.webp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    title: 'Advocacy & Policy Engagement',
    description: 'We engage with policymakers and stakeholders to advocate for cancer care policies that prioritize equitable access to services across Africa.',
    image: '/home/advocacy.webp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
  },
  {
    title: 'Innovation & Research',
    description: 'We support evidence-based solutions and innovative approaches to address cancer care challenges unique to the African context.',
    image: '/home/innandresearch.webp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Excellence in Care',
    description: 'We strive for high standards in cancer care delivery, ensuring patients receive the best possible treatment and support services.',
    image: '/home/excelincare.webp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  },
  {
    title: 'Lasting Impact',
    description: 'We are committed to creating sustainable change that transforms cancer care systems and improves outcomes for communities across Africa.',
    image: '/home/home2.webp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
]

const CARD_WIDTH = 360
const GAP = 24

export default function FocusAreasSection() {
  const t = useTranslations('focusAreas')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const isRTLRef = useRef(isRTL)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [cardOpacities, setCardOpacities] = useState<number[]>(
    focusAreas.map(() => 1)
  )

  const calculateCardOpacities = useCallback(() => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.width / 2
    const cards = container.querySelectorAll('[data-card]')

    const newOpacities: number[] = []

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenterRelativeToContainer = cardRect.left - containerRect.left + cardRect.width / 2
      const distanceFromCenter = Math.abs(containerCenter - cardCenterRelativeToContainer)

      // Cards within ~2 cards of center are fully visible
      const visibleThreshold = (CARD_WIDTH + GAP) * 2

      let opacity = 1
      if (distanceFromCenter > visibleThreshold) {
        const fadeDistance = distanceFromCenter - visibleThreshold
        const maxFadeDistance = CARD_WIDTH * 0.5
        // Gentler fade - minimum 0.4 opacity (not 0.05)
        opacity = Math.max(0.4, 1 - (fadeDistance / maxFadeDistance) * 0.6)
      }

      newOpacities.push(opacity)
    })

    setCardOpacities(newOpacities)
  }, [])

  const checkScrollPosition = useCallback(() => {
    if (!scrollRef.current) return

    const container = scrollRef.current
    const scrollLeft = container.scrollLeft
    const maxScroll = container.scrollWidth - container.clientWidth

    if (isRTLRef.current) {
      // In RTL mode, scrollLeft can be negative (Firefox) or positive (Chrome/Safari)
      // We need to handle both cases
      const absScrollLeft = Math.abs(scrollLeft)
      // Can scroll "left" (visually right in RTL) if not at the start
      setCanScrollLeft(absScrollLeft < maxScroll - 1)
      // Can scroll "right" (visually left in RTL) if not at the end
      setCanScrollRight(absScrollLeft > 1)
    } else {
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < maxScroll - 1)
    }

    calculateCardOpacities()
  }, [calculateCardOpacities])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Scroll to the third card (index 2) on mount to center it
    const scrollToThirdCard = () => {
      const cards = container.querySelectorAll('[data-card]')
      if (cards.length >= 3) {
        // In RTL, we want to center from the other side
        const rtl = isRTLRef.current
        const targetIndex = rtl ? cards.length - 3 : 2
        const targetCard = cards[targetIndex] as HTMLElement
        const containerWidth = container.clientWidth
        const cardOffsetLeft = targetCard.offsetLeft
        const cardWidth = targetCard.offsetWidth
        const scrollPosition = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2)
        container.scrollLeft = rtl ? -scrollPosition : scrollPosition
      }
      checkScrollPosition()
    }

    requestAnimationFrame(scrollToThirdCard)

    container.addEventListener('scroll', checkScrollPosition, { passive: true })
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [checkScrollPosition])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const scrollAmount = CARD_WIDTH + GAP
    // scrollBy with positive/negative values works correctly with dir="rtl"
    // The browser handles the RTL direction automatically
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      {/* Header with scroll reveal */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        {...scrollRevealProps}
        variants={staggerContainer}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-14">
          <div>
            {/* Tag */}
            <motion.div
              className="flex items-center gap-2 mb-5"
              variants={staggerItem}
            >
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-base font-medium text-zinc-900">{t('tag')}</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-[1.15]"
              variants={staggerItem}
            >
              {t('title')}
            </motion.h2>
          </div>

          {/* Subtext */}
          <motion.p
            className="text-zinc-600 text-lg max-w-md mt-4 lg:mt-8 lg:text-end"
            variants={staggerItem}
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              data-card
              style={{
                marginLeft: index === 0 && !isRTL ? 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))' :
                           index === focusAreas.length - 1 && isRTL ? 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))' : undefined,
                marginRight: index === focusAreas.length - 1 && !isRTL ? 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))' :
                            index === 0 && isRTL ? 'max(1rem, calc((100vw - 1280px) / 2 + 2rem))' : undefined,
              }}
              className="flex-shrink-0 w-[320px] md:w-[360px]"
              animate={{ opacity: cardOpacities[index] ?? 1 }}
              transition={transitions.default}
            >
              {/* Card with gentle hover */}
              <motion.div
                className="group relative bg-zinc-900 rounded-3xl overflow-hidden border-4 border-zinc-200 h-[480px] cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{
                  duration: duration.fast,
                  ease: easing.gentle,
                }}
              >
                {/* Background Image - Black and white */}
                <div className="absolute inset-0">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover motion-slow group-hover:scale-[1.02] grayscale"
                  />
                  {/* Gradient Mask - stronger for better text readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.4) 70%, transparent 100%)'
                    }}
                  />
                  {/* Teal Color Overlay */}
                  <div
                    className="absolute inset-0 bg-[#0F766E]/40"
                    style={{
                      maskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 50%, transparent 80%)'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
                  {/* Icon - no hover animation (too playful for healthcare) */}
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white mb-4">
                    {area.icon}
                  </div>

                  {/* Title - min-height ensures alignment, no line-clamp for readability */}
                  <h4 className="text-white text-2xl font-semibold font-[family-name:var(--font-montserrat)] mb-3 leading-snug min-h-[64px]">
                    {area.title}
                  </h4>

                  {/* Description - line-clamp-3 for more content, lighter color for contrast */}
                  <p className="text-white/80 text-base leading-relaxed line-clamp-3">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons - subtle hover, no scale */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 motion-fast hover:bg-zinc-100 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 motion-fast hover:bg-zinc-100 hover:border-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
