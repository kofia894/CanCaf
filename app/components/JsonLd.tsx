const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cancaf.org'

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    '@id': `${siteUrl}/#organization`,
    name: 'CanCAF - Cancer Care Africa Foundation',
    alternateName: 'Cancer Care Africa Foundation',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/CancafLogoRemBg.png`,
      width: 280,
      height: 95,
    },
    image: `${siteUrl}/og-image.png`,
    description: 'CanCAF is dedicated to strengthening cancer care capacity  through training, awareness, partnerships, and capacity building initiatives.',
    email: 'info@cancaf.org',
    telephone: '+233593443344',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    areaServed: {
      '@type': 'Continent',
      name: 'Africa',
    },
    sameAs: [
      'https://www.facebook.com/share/v/18KQfsQ4sA/',
      'https://www.linkedin.com/company/cancer-care-africa-cancaf/',
      'https://twitter.com/CCancaf',
    ],
    foundingDate: '2025',
    knowsAbout: [
      'Cancer Care',
      'Oncology',
      'Cancer Prevention',
      'Cancer Treatment',
      'Healthcare Training',
      'Cancer Genetic Counselling',
    ],
    slogan: 'Strengthening Cancer Care ',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'CanCAF - Cancer Care Africa Foundation',
    description: 'Strengthening Cancer Care Capacity ',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: ['en', 'fr', 'ar', 'pt', 'sw', 'am', 'es'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ArticleJsonLdProps {
  title: string
  description: string
  publishedAt: string
  image?: string
  url: string
}

export function ArticleJsonLd({ title, description, publishedAt, image, url }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || `${siteUrl}/og-image.png`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Organization',
      name: 'CanCAF',
      url: siteUrl,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${siteUrl}${url}`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface CourseJsonLdProps {
  name: string
  description: string
  provider: string
  url: string
}

export function CourseJsonLd({ name, description, provider, url }: CourseJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: provider,
      sameAs: siteUrl,
    },
    url: url.startsWith('http') ? url : `${siteUrl}${url}`,
    courseMode: 'online',
    educationalCredentialAwarded: 'Certificate',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
