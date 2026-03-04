import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'Programs - CanCAF',
  description: 'Explore our programs focused on cancer care capacity building across Africa.',
}

export default async function ProgramsPage() {
  const t = await getTranslations('programs')
  const tCgcp = await getTranslations('cgcpOnAfrica')

  const programs = [
    {
      key: 'capacityBuilding',
      tag: t('capacityBuildingTag'),
      title: t('capacityBuilding'),
      description: t('capacityBuildingDesc'),
      image: '/home/capacitybuilding.webp',
    },
    {
      key: 'awareness',
      tag: t('awarenessTag'),
      title: t('awareness'),
      description: t('awarenessDesc'),
      image: '/home/ealydetect.webp',
    },
    {
      key: 'earlyDetection',
      tag: t('earlyDetectionTag'),
      title: t('earlyDetection'),
      description: t('earlyDetectionDesc'),
      image: '/home/excelincare.webp',
    },
    {
      key: 'advocacy',
      tag: t('advocacyTag'),
      title: t('advocacy'),
      description: t('advocacyDesc'),
      image: '/home/advocacy.webp',
    },
    {
      key: 'partnerships',
      tag: t('partnershipsTag'),
      title: t('partnerships'),
      description: t('partnershipsDesc'),
      image: '/home/innandresearch.webp',
    },
  ]

  return (
    <div className="pt-20 md:pt-[calc(2.5rem+4rem+3rem)]">
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/capacitybuilding.webp"
      />

      {/* Featured Programme - CGCP-ON Africa */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs/cgcp-on-africa"
            className="block group"
          >
            <div className="relative rounded-3xl overflow-hidden bg-zinc-900">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/home/capacitybuilding.webp"
                  alt="CGCP-ON Africa Programme"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 motion-slow"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/80 via-[#0F766E]/60 to-transparent" />

              {/* Content */}
              <div className="relative p-8 md:p-12 lg:p-16 min-h-[350px] flex flex-col justify-between">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      {tCgcp('acceptingApplications')}
                    </span>
                    <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full">
                      {tCgcp('featuredProgramme')}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-4 max-w-2xl">
                    {tCgcp('title')}
                  </h2>

                  {/* Description */}
                  <p className="text-white/80 max-w-xl mb-8">
                    {tCgcp('subtitle')}
                  </p>
                </div>

                {/* CTA */}
                <div>
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-white rounded-full text-sm font-medium group-hover:bg-[#D4A017] motion-fast">
                    {tCgcp('learnAndApply')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 motion-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {programs.map((program) => (
              <div
                key={program.key}
                className="bg-white rounded-2xl p-4 md:p-6 border border-zinc-200 flex flex-col md:flex-row gap-6 md:gap-8"
              >
                {/* Image */}
                <div className="w-full md:w-[320px] lg:w-[400px] flex-shrink-0">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center py-2">
                  {/* Tag */}
                  <span className="inline-block w-fit px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] text-sm font-medium rounded-full mb-4">
                    {program.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-600 leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
