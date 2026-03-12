import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import PageHero from '../../components/PageHero'
import { client, PAGINATED_NEWS_QUERY, NEWS_COUNT_QUERY, fetchOptions, NewsItem, urlFor } from '@/app/lib/sanity'

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

const ITEMS_PER_PAGE = 9

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function NewsPage({ searchParams }: Props) {
  const t = await getTranslations('news')
  const { page } = await searchParams

  const currentPage = Math.max(1, parseInt(page || '1', 10))
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  // Fetch paginated news and total count
  const [news, totalCount] = await Promise.all([
    client.fetch<NewsItem[]>(PAGINATED_NEWS_QUERY, { start, end }, fetchOptions),
    client.fetch<number>(NEWS_COUNT_QUERY, {}, fetchOptions)
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

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
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => {
                  const hasImage = item.image?.asset
                  const imageUrl = hasImage ? urlFor(item.image).width(800).height(500).fit('crop').focalPoint(0.5, 0.25).url() : null
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
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {/* Previous Button */}
                  {currentPage > 1 ? (
                    <Link
                      href={`/news?page=${currentPage - 1}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
                    >
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Previous
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-100 rounded-full cursor-not-allowed">
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Previous
                    </span>
                  )}

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

                      if (!showPage && pageNum !== 2 && pageNum !== totalPages - 1) {
                        return null
                      }

                      if (pageNum === 2 && currentPage > 3) {
                        return <span key="ellipsis-start" className="px-2 text-zinc-400">...</span>
                      }

                      if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                        return <span key="ellipsis-end" className="px-2 text-zinc-400">...</span>
                      }

                      if (!showPage) return null

                      return (
                        <Link
                          key={pageNum}
                          href={`/news?page=${pageNum}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                            pageNum === currentPage
                              ? 'bg-[#0F766E] text-white'
                              : 'text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  {currentPage < totalPages ? (
                    <Link
                      href={`/news?page=${currentPage + 1}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors"
                    >
                      Next
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-100 rounded-full cursor-not-allowed">
                      Next
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  )}
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <p className="mt-4 text-center text-sm text-zinc-500">
                  Showing {start + 1}–{Math.min(end, totalCount)} of {totalCount} articles
                </p>
              )}
            </>
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
