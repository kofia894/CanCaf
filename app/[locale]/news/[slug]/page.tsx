import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { client, NEWS_BY_SLUG_QUERY, fetchOptions, NewsItem, urlFor } from '@/app/lib/sanity'
import { PortableText } from '@portabletext/react'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const news = await client.fetch<NewsItem | null>(NEWS_BY_SLUG_QUERY, { slug }, fetchOptions)

  if (!news) {
    return {
      title: 'News Not Found - CanCAF',
    }
  }

  return {
    title: `${news.title} - CanCAF`,
    description: `Read about ${news.title} from CanCAF.`,
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const news = await client.fetch<NewsItem | null>(NEWS_BY_SLUG_QUERY, { slug }, fetchOptions)

  if (!news) {
    notFound()
  }

  const hasImage = news.image?.asset
  const imageUrl = hasImage ? urlFor(news.image).width(1200).height(675).url() : null
  const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-zinc-900 pt-[132px]">
        {/* Background Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={news.title}
                fill
                className="object-cover opacity-40"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to News
            </Link>
            <p className="text-[#0F766E] text-sm font-medium mb-3">{formattedDate}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight">
              {news.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image (if exists) */}
          {imageUrl && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={imageUrl}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Body Content */}
          {news.body && news.body.length > 0 ? (
            <div className="prose prose-lg prose-zinc max-w-none prose-headings:font-[family-name:var(--font-montserrat)] prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-a:text-[#0F766E] prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900">
              <PortableText value={news.body} />
            </div>
          ) : (
            <p className="text-zinc-500 text-lg text-center py-8">
              No content available for this article.
            </p>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#0F766E] font-medium hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all news
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
