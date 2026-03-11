import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import PageHero from '../../components/PageHero'
import { client, ALL_NEWS_QUERY, fetchOptions, NewsItem, urlFor } from '@/app/lib/sanity'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'News & Activities',
  description: 'Stay updated with the latest news, events, and activities from CanCAF. Read about our work strengthening cancer care across Africa.',
  openGraph: {
    title: 'News & Activities - CanCAF',
    description: 'Stay updated with the latest news, events, and activities from CanCAF.',
    images: ['/home/ealydetect.webp'],
  },
}

export default async function NewsPage() {
  const t = await getTranslations('news')

  // Fetch all news from Sanity
  const news = await client.fetch<NewsItem[]>(ALL_NEWS_QUERY, {}, fetchOptions)

  return (
    <div>
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/ealydetect.webp"
      />

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {news && news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => {
                const hasImage = item.image?.asset
                const imageUrl = hasImage ? urlFor(item.image).width(800).height(500).url() : null
                const newsUrl = item.slug?.current ? `/news/${item.slug.current}` : '#'
                const formattedDate = new Date(item.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })

                return (
                  <Link key={item._id} href={newsUrl} className="group block">
                    <article>
                      {/* Image */}
                      <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden relative">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
                            <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 text-sm">
                          {formattedDate}
                        </p>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-lg">No news articles available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
