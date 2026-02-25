'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { staggerContainer, staggerItem, scrollRevealProps, duration, easing } from '@/lib/motion'

/**
 * About Section
 *
 * Animation approach (Healthcare UX):
 * - Scroll-triggered reveal with gentle upward motion
 * - Content and image stagger in sequence
 * - Button has subtle hover lift (2px max)
 * - No aggressive or attention-grabbing effects
 */
export default function AboutSection() {
  const t = useTranslations('aboutSection')
  const common = useTranslations('common')

  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <motion.div
            {...scrollRevealProps}
            variants={staggerContainer}
          >
            {/* Tag */}
            <motion.div
              className="flex items-center gap-2 mb-5"
              variants={staggerItem}
            >
              <span className="w-2 h-2 bg-[#F59E0B] rounded-full"></span>
              <span className="text-sm text-zinc-900">{t('tag')}</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-[1.15] mb-4"
              variants={staggerItem}
            >
              {t('title')}
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="text-zinc-500 text-sm leading-relaxed mb-6"
              variants={staggerItem}
            >
              {t('description')}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={staggerItem}>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-900 rounded-full text-sm font-medium text-zinc-900 motion-fast hover:bg-zinc-900 hover:text-white hover:-translate-y-0.5 active:scale-[0.98] group"
              >
                {common('learnMore')}
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: duration.slow,
              ease: easing.gentle,
              delay: 0.15,
            }}
          >
            <div className="rounded-2xl overflow-hidden border border-zinc-200">
              <Image
                src="/home/hero.jpg"
                alt="Community gathering in Africa"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
