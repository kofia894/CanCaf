import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'About Us - CanCAF',
  description: 'Learn about CanCAF and our mission to strengthen cancer care capacity across Africa.',
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const values = await getTranslations('values')

  const coreValues = [
    { key: 'compassion', title: values('compassion'), description: values('compassionDesc') },
    { key: 'equity', title: values('equity'), description: values('equityDesc') },
    { key: 'integrity', title: values('integrity'), description: values('integrityDesc') },
    { key: 'collaboration', title: values('collaboration'), description: values('collaborationDesc') },
    { key: 'innovation', title: values('innovation'), description: values('innovationDesc') },
    { key: 'excellence', title: values('excellence'), description: values('excellenceDesc') },
    { key: 'impact', title: values('impact'), description: values('impactDesc') },
  ]

  return (
    <div>
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/home2.webp"
      />

      {/* Mission Section */}
      <section className="py-20 md:py-28 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm text-zinc-600">{t('mission')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('missionTitle')}
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                {t('missionText')}
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/about/mission.webp"
                  alt={t('mission')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 md:py-28 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image - Left side on desktop */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/about/qualityhealthcare.webp"
                  alt={t('vision')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content - Right side on desktop */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm text-zinc-600">{t('vision')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('visionTitle')}
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                {t('visionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goal & Stats Section */}
      {/* <section className="py-20 md:py-28 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-16">
            <p className="text-2xl md:text-3xl font-medium text-zinc-900 leading-relaxed">
              A purpose-driven non-profit organization working to create lasting{' '}
              <span className="text-[#0F766E]">change in cancer care across Africa.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
                15+
              </p>
              <p className="text-zinc-500 mt-2">Countries reached across Africa</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
                500+
              </p>
              <p className="text-zinc-500 mt-2">Healthcare workers trained</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
                10K+
              </p>
              <p className="text-zinc-500 mt-2">Community members reached</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
                50+
              </p>
              <p className="text-zinc-500 mt-2">Partner organizations</p>
            </div>
          </div>

          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
            <Image
              src="/home/hero.jpg"
              alt="Our Impact"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section> */}

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-sm text-zinc-600">{t('coreValues')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
              {t('whatGuidesUs')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div
                key={value.key}
                className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200"
              >
                <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 flex items-center justify-center mb-4">
                  <span className="text-[#0F766E] font-bold text-lg">
                    {value.title.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-2">
                  {value.title}
                </h3>
                <p className="text-zinc-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work Section */}
      <section className="py-20 md:py-28 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm text-zinc-600">{t('whereWeWork')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('whereWeWorkTitle')}
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                {t('whereWeWorkText')}
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/about/accrossafrica.webp"
                  alt={t('whereWeWork')}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
