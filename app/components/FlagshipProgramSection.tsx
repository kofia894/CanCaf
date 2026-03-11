'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { scrollRevealProps, staggerContainer, staggerItem } from '@/lib/motion'

/**
 * Flagship Program Section
 *
 * Features the CGCPON Africa program with partner logos
 */
export default function FlagshipProgramSection() {
  const t = useTranslations('flagshipProgram')

  return (
    <section className="bg-gradient-to-b from-white to-zinc-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...scrollRevealProps}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            variants={staggerItem}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#F59E0B] rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">{t('tag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-4">
              {t('title')}
            </h2>
          </motion.div>

          {/* Main Card */}
          <motion.div
            variants={staggerItem}
            className="relative rounded-3xl overflow-hidden bg-zinc-900"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/home/capacitybuilding.webp"
                alt="CGCP-ON Africa Programme"
                fill
                className="object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/90 via-[#0F766E]/70 to-[#0F766E]/50" />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div>
                  {/* Partnership Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    {t('partnershipBadge')}
                  </div>

                  {/* Program Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-4">
                    {t('programTitle')}
                  </h3>

                  {/* Program Subtitle */}
                  <p className="text-xl md:text-2xl text-white/90 font-medium mb-6">
                    {t('programSubtitle')}
                  </p>

                  {/* Description */}
                  <p className="text-lg text-white/80 leading-relaxed mb-8">
                    {t('description')}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href="/programs/cgcp-on-africa"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#F59E0B] text-white rounded-full text-base font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    {t('learnMore')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Right - Partner Logos */}
                <div className="flex flex-col items-center lg:items-end">
                  <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-6">
                    {t('inPartnershipWith')}
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4">
                    {/* CanCAF Logo */}
                    <div className="bg-white rounded-2xl p-5 w-44 h-36 flex flex-col items-center justify-center shadow-lg">
                      <Image
                        src="/CancafLogoRemBg.png"
                        alt="CanCAF"
                        width={140}
                        height={80}
                        className="w-auto h-16 object-contain mb-3"
                      />
                      <span className="text-sm font-semibold text-zinc-700">CanCAF</span>
                    </div>

                    {/* WAGMC Logo */}
                    <div className="bg-white rounded-2xl p-5 w-44 h-36 flex flex-col items-center justify-center shadow-lg">
                      <Image
                        src="/wagmcAlone.png"
                        alt="WAGMC"
                        width={140}
                        height={80}
                        className="w-auto h-18 object-contain mb-3"
                      />
                      <span className="text-sm font-semibold text-zinc-700">WAGMC</span>
                    </div>

                    {/* Aster Guardians Logo */}
                    <div className="bg-white rounded-2xl p-5 w-44 h-36 flex flex-col items-center justify-center shadow-lg">
                      <Image
                        src="/asterLogoAlone.png"
                        alt="Aster Guardians"
                        width={140}
                        height={80}
                        className="w-auto h-18 object-contain mb-3"
                      />
                      <span className="text-sm font-semibold text-zinc-700">Aster Guardians</span>
                    </div>
                  </div>

                  {/* Partner Names */}
                  <div className="mt-6 text-center lg:text-end">
                    <p className="text-white/70 text-sm leading-relaxed">
                      West African Genetic Medicine Centre (WAGMC)
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Aster Guardian Global Nursing Award
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
