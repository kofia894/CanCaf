'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { scrollRevealProps, staggerContainer, staggerItem } from '@/lib/motion'
import { NewsItem, urlFor } from '@/app/lib/sanity'

/**
 * Home News Section
 *
 * Displays latest news/activities on the home page
 * Fetches news from Sanity CMS
 */

interface HomeNewsSectionProps {
  news?: NewsItem[]
}

export default function HomeNewsSection({ news }: HomeNewsSectionProps) {
  const t = useTranslations('homeNews')

  // If no news, don't render the section
  if (!news || news.length === 0) {
    return null
  }

  return (
    <section className="bg-zinc-100 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...scrollRevealProps}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
            variants={staggerItem}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-base font-medium text-zinc-600">{t('tag')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight">
                {t('title')}
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 mt-6 md:mt-0 text-[#0F766E] font-medium hover:underline"
            >
              {t('viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => {
              // Check if item has a Sanity image
              const hasImage = item.image?.asset
              const imageUrl = hasImage ? urlFor(item.image).width(800).height(500).url() : null
              const newsUrl = item.slug?.current ? `/news/${item.slug.current}` : '/news'
              const formattedDate = new Date(item.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              return (
                <motion.article
                  key={item._id}
                  variants={staggerItem}
                  className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-[#0F766E]/30 motion-fast hover:shadow-lg"
                >
                  <Link href={newsUrl} className="block">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 motion-slow"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300">
                          <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors leading-snug mb-3">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 text-sm">
                        {formattedDate}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
