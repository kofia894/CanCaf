import { MetadataRoute } from 'next'
import { client, LATEST_NEWS_QUERY, NewsItem } from '@/app/lib/sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cancaf.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'fr', 'ar', 'pt', 'sw', 'am', 'es']

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/programs',
    '/programs/cgcp-on-africa',
    '/partners',
    '/news',
    '/contact',
    '/donate',
  ]

  // Generate static page entries for all locales
  const staticEntries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    // Default locale (en) - no prefix
    staticEntries.push({
      url: `${siteUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1 : page === '/about' ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(locale => [
            locale,
            locale === 'en' ? `${siteUrl}${page}` : `${siteUrl}/${locale}${page}`
          ])
        ),
      },
    })
  }

  // Fetch dynamic news articles
  let newsEntries: MetadataRoute.Sitemap = []
  try {
    const news = await client.fetch<NewsItem[]>(LATEST_NEWS_QUERY, {}, { next: { revalidate: 3600 } })

    newsEntries = news.map((article) => ({
      url: `${siteUrl}/news/${article.slug.current}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map(locale => [
            locale,
            locale === 'en'
              ? `${siteUrl}/news/${article.slug.current}`
              : `${siteUrl}/${locale}/news/${article.slug.current}`
          ])
        ),
      },
    }))
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
  }

  return [...staticEntries, ...newsEntries]
}
