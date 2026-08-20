import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import PageHero from '../../components/PageHero'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Explore CanCAF programmes focused on cancer care capacity building — including the LIT Leadership Development Series for Nurses & Midwives, now open for registration.',
  openGraph: {
    title: 'Programs - CanCAF',
    description: 'Our upcoming and past programmes, including the LIT Leadership Development Series for Nurses & Midwives and the CGCP-ON Africa certificate programme.',
    images: ['/home/capacitybuilding.webp'],
  },
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
    <div>
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/capacitybuilding.webp"
      />

      {/* ============================================================
          UPCOMING PROGRAMME — LIT (open for registration)
          ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F59E0B]"></span>
              </span>
              <span className="text-base font-medium text-zinc-600">Upcoming Programme</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-4">
              LIT
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              Leadership Development Series for Nurses &amp; Midwives
            </p>
            <p className="mt-3 text-base font-medium text-[#0F766E] tracking-[0.2em] uppercase">
              Lead · Influence · Transform
            </p>
          </div>

          {/* Programme Card */}
          <Link href="/programs/lit" className="block group">
            <div className="relative rounded-3xl overflow-hidden bg-zinc-900 ring-2 ring-[#F59E0B]/30 group-hover:ring-[#F59E0B]/60 motion-fast">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/litflyer.webp"
                  alt="LIT Leadership Development Series for Nurses & Midwives"
                  fill
                  className="object-cover object-top opacity-30 group-hover:opacity-40 group-hover:scale-105 motion-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F766E]/90 via-[#0F766E]/70 to-[#0F766E]/50" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-12 lg:p-16">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F59E0B] text-white text-sm font-medium rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                    </span>
                    Registration Open
                  </span>
                  <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full">
                    27 – 29 August 2026
                  </span>
                  <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full">
                    Virtual
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-3 max-w-3xl">
                  Leadership Development Series for Nurses &amp; Midwives
                </h3>

                <p className="text-[#F59E0B] font-medium tracking-[0.2em] uppercase text-sm mb-5">
                  Lead · Influence · Transform
                </p>

                {/* Brief Description */}
                <p className="text-white/85 text-lg leading-relaxed max-w-2xl mb-8">
                  Develop the leader within. Influence others. Transform healthcare. A flagship
                  leadership initiative of the 2025 Aster Guardians Global Nursing Award winner,
                  Mrs. Naomi Oyoe Ohene Oti — For CPD Points
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-3 px-6 py-3 bg-[#F59E0B] text-white rounded-full text-base font-medium group-hover:bg-[#D4A017] motion-fast">
                  Register Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 motion-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ============================================================
          PAST PROGRAMMES — CGCP-ON Africa (completed)
          ============================================================ */}
      <section className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-zinc-400 rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">Past Programmes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-4">
              Where We&apos;ve Been
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Programmes that have completed their cohort. Applications for these are closed.
            </p>
          </div>

          {/* CGCP-ON Africa — Past Programme Card */}
          <Link href="/programs/cgcp-on-africa" className="block group">
            <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden flex flex-col md:flex-row group-hover:border-zinc-300 group-hover:shadow-lg motion-all">
              {/* Image */}
              <div className="relative w-full md:w-[340px] lg:w-[420px] flex-shrink-0 aspect-[16/10] md:aspect-auto md:min-h-[280px]">
                <Image
                  src="/home/capacitybuilding.webp"
                  alt="CGCP-ON Africa Programme"
                  fill
                  className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 motion-slow"
                />
                <div className="absolute inset-0 bg-zinc-900/20" />
                {/* Completed Badge */}
                <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completed
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full">
                    {tCgcp('flagshipProgramme')}
                  </span>
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100">
                    Applications Closed
                  </span>
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full">
                    April – June 2026
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-2">
                  CGCP-ON Africa
                </h3>
                <p className="text-zinc-500 mb-4">
                  Cancer Genetic Counselling Certificate Programme for Oncology Nurses
                </p>

                <p className="text-zinc-600 leading-relaxed mb-6">
                  {t('flagshipBrief')}
                </p>

                {/* Partner logos + CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/CancafLogoRemBg.png"
                      alt="CanCAF"
                      width={100}
                      height={48}
                      className="w-auto h-9 object-contain opacity-70"
                    />
                    <span className="w-px h-8 bg-zinc-200"></span>
                    <Image
                      src="/wagmcAlone.png"
                      alt="WAGMC"
                      width={100}
                      height={48}
                      className="w-auto h-9 object-contain opacity-70"
                    />
                  </div>

                  <span className="inline-flex items-center gap-2 text-[#0F766E] font-medium text-sm group-hover:gap-3 motion-fast">
                    View Programme
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Programs Overview Section */}
      <section className="py-16 md:py-24 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">{t('programAreasTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-4">
              {t('programAreasTitle')}
            </h2>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              {t('introText')}
            </p>
          </div>

          {/* Programs Grid */}
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

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-[#0F766E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-montserrat)] mb-4">
            Interested in Our Programmes?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Registration is open for the LIT Leadership Development Series. Get in touch to
            explore partnership opportunities or learn about future cohorts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/programs/lit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-white rounded-full text-base font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5"
            >
              Register for LIT
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full text-base font-medium motion-fast hover:bg-white/20"
            >
              {t('partnerWithUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
