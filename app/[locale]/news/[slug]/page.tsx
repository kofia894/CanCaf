import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { client, NEWS_BY_SLUG_QUERY, fetchOptions, NewsItem, urlFor } from '@/app/lib/sanity'
import { PortableText } from '@portabletext/react'
import ImageGallery from './ImageGallery'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const news = await client.fetch<NewsItem | null>(NEWS_BY_SLUG_QUERY, { slug }, fetchOptions)

  if (!news) {
    return {
      title: 'News Not Found',
    }
  }

  const hasImage = news.image?.asset
  const imageUrl = hasImage ? urlFor(news.image).width(1200).height(630).fit('crop').crop('top').url() : '/home/ealydetect.webp'

  return {
    title: news.title,
    description: `Read about ${news.title} from CanCAF - Cancer Care Africa Foundation.`,
    openGraph: {
      title: news.title,
      description: `Read about ${news.title} from CanCAF.`,
      type: 'article',
      publishedTime: news.publishedAt,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      images: [imageUrl],
    },
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const news = await client.fetch<NewsItem | null>(NEWS_BY_SLUG_QUERY, { slug }, fetchOptions)

  if (!news) {
    notFound()
  }

  const hasImage = news.image?.asset
  const imageUrl = hasImage ? urlFor(news.image).width(1200).height(675).fit('crop').crop('top').url() : null
  const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Process gallery images
  const galleryImages = news.gallery?.map((img) => ({
    _key: img._key,
    url: urlFor(img).width(1600).url(), // Full image without cropping for lightbox
    thumbUrl: urlFor(img).width(400).height(300).fit('crop').crop('top').url(),
    caption: img.caption || '',
    alt: img.alt || news.title,
  })) || []

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] bg-zinc-900 pt-[132px]">
        {/* Background Image - blurred and grayscale */}
        <div className="absolute inset-0 overflow-hidden">
          {imageUrl ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-sm grayscale"
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                }}
              />
              {/* Teal gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/30 via-[#0F766E]/40 to-[#0F766E]/50" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
          )}
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all text-sm font-medium"
              >
                <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to News
              </Link>
              <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {formattedDate}
              </p>
            </div>
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

          {/* Image Gallery */}
          {galleryImages.length > 0 && (
            <div className="mt-12 pt-8 border-t border-zinc-200">
              <h2 className="text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-6">
                Photo Gallery
              </h2>
              <ImageGallery images={galleryImages} />
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#0F766E] font-medium hover:underline"
            >
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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
