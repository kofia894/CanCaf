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
                  <p className="text-zinc-600 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Button */}
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center w-fit px-6 py-3 border border-zinc-900 text-zinc-900 rounded-full text-sm font-medium motion-fast hover:bg-zinc-900 hover:text-white"
                  >
                    {t('learnMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
