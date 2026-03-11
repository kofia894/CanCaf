import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import PageHero from '../../components/PageHero'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Partners & Supporters',
  description: 'Meet our partners and supporters who help CanCAF strengthen cancer care across Africa. Join our growing network of healthcare institutions, NGOs, and development organizations.',
  openGraph: {
    title: 'Partners & Supporters - CanCAF',
    description: 'Meet our partners and supporters who help strengthen cancer care across Africa.',
    images: ['/home/innandresearch.webp'],
  },
}

export default async function PartnersPage() {
  const t = await getTranslations('partners')

  const partnerTypes = [
    t('partnerTypes.governments'),
    t('partnerTypes.healthInstitutions'),
    t('partnerTypes.ngos'),
    t('partnerTypes.academic'),
    t('partnerTypes.development'),
  ]

  return (
    <div>
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/innandresearch.webp"
      />

      {/* Bento Grid Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:auto-rows-fr">
            {/* Left - Large Image Card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:row-span-2">
              <Image
                src="/partners/collabgridimg1.webp"
                alt="Partnership Impact"
                fill
                className="object-cover"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-2xl md:text-3xl font-bold leading-tight">
                  {t('together')}<br />
                  <span className="text-[#0F766E]">{t('difference')}</span>
                </p>
              </div>
            </div>

            {/* Middle Column - Two Content Cards */}
            <div className="flex flex-col gap-4 lg:gap-6 lg:row-span-2">
              {/* Policy & Advocacy Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 border border-zinc-200 lg:flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                  <span className="text-sm text-zinc-500 font-medium">{t('policyTag')}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-snug mb-4">
                  {t('policyTitle')}
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  {t('policyDesc')}
                </p>
              </div>

              {/* Systems Strengthening Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 border border-zinc-200 lg:flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                  <span className="text-sm text-zinc-500 font-medium">{t('systemsTag')}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-snug mb-4">
                  {t('systemsTitle')}
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  {t('systemsDesc')}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 lg:gap-6 lg:row-span-2">
              {/* Small Image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/partners/collabgridimg2.webp"
                  alt="Collaboration"
                  fill
                  className="object-cover"
                />
              </div>

              {/* CTA Card */}
              <div className="bg-zinc-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between lg:flex-1">
                <div>
                  <p className="text-white text-lg leading-relaxed mb-4">
                    {t('joinUs')}
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-[#0F766E] font-[family-name:var(--font-montserrat)]">
                    {t('growing')}
                  </p>
                  <p className="text-zinc-400 mt-2 text-sm">
                    {t('networkPartners')}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0d6b63] active:scale-[0.98] mt-6"
                >
                  {t('becomePartner')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm text-zinc-600">{t('partnerWithUs')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight">
                {t('welcomeCollaboration')}
              </h2>
            </div>
            <p className="text-zinc-500 max-w-sm mt-4 lg:mt-8 lg:text-right">
              {t('welcomeText')}
            </p>
          </div>

          {/* Partner Types Card */}
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src="/partners/welcomepartners.webp"
              alt="Partnership"
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
              <div className="max-w-lg">
                <p className="text-white text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-6">
                  {t('welcomeCollaborationLong')}
                </p>

                {/* Partner Types */}
                <div className="flex flex-wrap gap-3">
                  {partnerTypes.map((type) => (
                    <span
                      key={type}
                      className="px-4 py-2 bg-white/10 text-white text-sm rounded-full border border-white/20"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0d6b63] active:scale-[0.98]"
                >
                  {t('contactExplore')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
