'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/routing'
import ApplicationForm from '../../../components/ApplicationForm'

interface CGCPOnAfricaClientProps {
  applicationsOpen: boolean
}

/**
 * CGCP-ON Africa Programme Page
 *
 * Cancer Genetic Counselling Certificate Programme for Oncology Nurses in Africa
 * A collaboration between WAGMC, Aster Guardians Global Nursing Award, and CanCAF
 */

export default function CGCPOnAfricaClient({ applicationsOpen }: CGCPOnAfricaClientProps) {
  const t = useTranslations('cgcpOnAfrica')
  const router = useRouter()
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const handleApplyClick = () => {
    if (applicationsOpen) {
      setShowApplicationForm(true)
    } else {
      router.push('/programs/cgcp-on-africa/applications-closed')
    }
  }

  const courseTopics = [
    { key: 'fundamentals', number: '01', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
    { key: 'cancerGenetics', number: '02', icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5' },
    { key: 'clinicalTesting', number: '03', icon: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { key: 'counsellingSkills', number: '04', icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' },
    { key: 'principlesCounselling', number: '05', icon: 'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
    { key: 'practiceCounselling', number: '06', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    { key: 'ethicalCultural', number: '07', icon: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z' },
    { key: 'psychosocial', number: '08', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    { key: 'healthEducation', number: '09', icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46' },
    { key: 'industrySymposium', number: '10', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
    { key: 'roleplayAssessment', number: '11', icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' },
  ]

  const eligibilityCriteria = [
    'registeredNurse',
    'workingInOncology',
    'institutionalSupport',
    'commitToService',
    'englishProficiency',
  ]

  if (showApplicationForm) {
    return <ApplicationForm onBack={() => setShowApplicationForm(false)} />
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-zinc-900 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/home/capacitybuilding.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-[#0F766E]/40 to-zinc-900/90" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Status Badges */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-wrap items-center gap-3 mb-6"
              >
                {applicationsOpen ? (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {t('acceptingApplications')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/80 text-white text-sm font-medium rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Applications Opening Soon
                  </span>
                )}
                <span className="px-4 py-1.5 bg-[#F59E0B] text-white text-sm font-medium rounded-full">
                  {t('featuredProgramme')}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-[1.1] tracking-tight mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              >
                CGCP-ON Africa
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-white/90 font-medium mb-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
              >
                Cancer Genetic Counselling Certificate Programme for Oncology Nurses
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-white/70 max-w-xl mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              >
                {t('subtitle')}
              </motion.p>

              {/* Key Info: Deadline, Duration & Fee - Only show deadline when applications are open */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
                className="flex flex-wrap items-center gap-3 mb-8"
              >
                {applicationsOpen && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                    <svg className="w-4 h-4 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t('deadline')}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                  <svg className="w-4 h-4 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Programme: April – June 2026
                </span>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              >
                <button
                  onClick={handleApplyClick}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] text-white rounded-full text-base font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98] shadow-lg"
                >
                  {t('applyNow')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Right - Partner Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-6 text-center">
                  {t('partnersTag')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* CanCAF Logo */}
                  <div className="bg-white rounded-2xl p-5 w-40 h-32 flex flex-col items-center justify-center shadow-lg">
                    <Image
                      src="/CancafLogoRemBg.png"
                      alt="CanCAF"
                      width={120}
                      height={60}
                      className="w-auto h-14 object-contain mb-2"
                    />
                    <span className="text-xs font-semibold text-zinc-700">CanCAF</span>
                  </div>

                  {/* WAGMC Logo */}
                  <div className="bg-white rounded-2xl p-5 w-40 h-32 flex flex-col items-center justify-center shadow-lg">
                    <Image
                      src="/wagmcAlone.png"
                      alt="WAGMC"
                      width={120}
                      height={60}
                      className="w-auto h-14 object-contain mb-2"
                    />
                    <span className="text-xs font-semibold text-zinc-700 text-center">WAGMC</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Logos - Mobile */}
      <section className="lg:hidden py-8 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-4 text-center">
            In Partnership With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-white rounded-xl p-4 w-28 h-24 flex flex-col items-center justify-center shadow-sm border border-zinc-200">
              <Image src="/CancafLogoRemBg.png" alt="CanCAF" width={80} height={40} className="w-auto h-10 object-contain mb-1" />
              <span className="text-xs font-medium text-zinc-600">CanCAF</span>
            </div>
            <div className="bg-white rounded-xl p-4 w-28 h-24 flex flex-col items-center justify-center shadow-sm border border-zinc-200">
              <Image src="/wagmcAlone.png" alt="WAGMC" width={80} height={40} className="w-auto h-10 object-contain mb-1" />
              <span className="text-xs font-medium text-zinc-600">WAGMC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview Section - Condensed */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm font-medium text-zinc-600">{t('aboutTag')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('aboutTitle')}
              </h2>

              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  <strong className="text-zinc-900">CGCP‑ON Africa</strong> is CanCAF&apos;s flagship training initiative, powered by the prestigious <strong className="text-[#F59E0B]">2025 Aster Guardians Global Nursing Award</strong> received by Mrs. Naomi Oyoe Ohene Oti.
                </p>
                <p>
                  Through this collaboration, <strong className="text-zinc-900">CanCAF</strong> leads the programme&apos;s vision while <strong className="text-zinc-900">WAGMC</strong> delivers the training, transforming Mrs. Ohene Oti&apos;s award-winning achievement into a continent‑wide movement advancing cancer genetic counselling for oncology nurses across Africa.
                </p>
              </div>

              {/* Key stat */}
              <div className="mt-6 flex items-center gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="w-14 h-14 bg-[#0F766E] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">90%</span>
                </div>
                <p className="text-sm text-zinc-600">
                  of African countries have <strong className="text-zinc-900">no genetic counsellors</strong>&mdash;this programme aims to change that.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/winningAster.webp"
                  alt="CGCP-ON Africa Training"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section - Condensed */}
      <section className="py-12 md:py-16 bg-[#0F766E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-4">
            &ldquo;When nurses are empowered, patients and families feel safer, better supported, and more hopeful.&rdquo;
          </p>
          <p className="text-white/70 text-sm">
            This programme is a <strong className="text-white">tribute</strong>, a <strong className="text-white">catalyst</strong>, and a <strong className="text-white">collective promise</strong> to make cancer care in Africa stronger and more humane.
          </p>
        </div>
      </section>

      {/* Course Outline Section - Redesigned */}
      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-sm font-medium text-zinc-600">Curriculum</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-4">
              What You&apos;ll Learn
            </h2>
            <p className="text-zinc-600 max-w-xl mx-auto">
              Include but not limited to the following comprehensive modules covering genetics, counselling skills, ethics, practical assessment.
            </p>
          </div>

          {/* Course Grid - New Design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseTopics.slice(0, 6).map((topic) => (
              <div
                key={topic.key}
                className="group bg-white rounded-xl p-5 border border-zinc-200 hover:border-[#0F766E]/40 hover:shadow-lg motion-all cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0F766E]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F766E] motion-colors">
                    <svg className="w-5 h-5 text-[#0F766E] group-hover:text-white motion-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={topic.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#0F766E]/60 uppercase tracking-wider">Module {topic.number}</span>
                    <h3 className="text-zinc-900 font-medium leading-snug mt-0.5">
                      {t(`courseOutline.${topic.key}`)}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Virtual Badge */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="font-medium text-zinc-900">100% Virtual</span>
              </div>
              <span className="w-px h-5 bg-zinc-200"></span>
              <span className="text-zinc-600 text-sm">April – June 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 md:py-24 bg-[#0F766E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span className="text-sm text-white/80">{t('eligibilityTag')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('eligibilityTitle')}
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                {t('eligibilityDesc')}
              </p>

              <ul className="space-y-4">
                {eligibilityCriteria.map((criteria) => (
                  <li key={criteria} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">{t(`eligibility.${criteria}`)}</span>
                  </li>
                ))}
              </ul>

              {/* Commitment Box */}
              <div className="mt-8 p-5 bg-white/10 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">{t('commitment')}</h4>
                <p className="text-sm text-white/80">{t('commitmentDesc')}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">{t('readyToApply')}</h3>
              <p className="text-white/80 mb-6">
                {t('readyToApplyDesc')}
              </p>

              {/* Key Info: Dates & Fee - Only show deadline when applications are open */}
              <div className="space-y-3 mb-6">
                {applicationsOpen ? (
                  <div className="flex items-center gap-3 text-white/90">
                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Applications close: <strong>March 24, 2026</strong></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-white/90">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Applications opening soon</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="text-sm">Programme duration: <strong>April – June 2026</strong></span>
                </div>
              </div>

              {/* Application Fee - Prominent */}
              <div className="mb-6 p-4 bg-[#F59E0B]/20 rounded-xl border border-[#F59E0B]/30">
              </div>

              <button
                onClick={handleApplyClick}
                className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-medium motion-fast active:scale-[0.98] ${
                  applicationsOpen
                    ? 'bg-[#F59E0B] text-white hover:bg-[#D4A017]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {applicationsOpen ? t('startApplication') : 'Learn More'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-sm text-zinc-600">{t('partnersTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-4">
              {t('partnersTitle')}
            </h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              {t('partnersDesc')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {/* CanCAF Logo */}
            <div className="bg-zinc-50 rounded-2xl p-6 w-52 h-44 flex flex-col items-center justify-center border border-zinc-200 hover:border-[#0F766E]/30 motion-colors">
              <Image
                src="/CancafLogoRemBg.png"
                alt="CanCAF"
                width={160}
                height={100}
                className="w-auto h-20 object-contain mb-3"
              />
              <span className="text-sm font-semibold text-zinc-700">CanCAF</span>
              <span className="text-xs text-zinc-500">Driving Partner</span>
            </div>

            {/* WAGMC Logo */}
            <div className="bg-zinc-50 rounded-2xl p-6 w-52 h-44 flex flex-col items-center justify-center border border-zinc-200 hover:border-[#0F766E]/30 motion-colors">
              <Image
                src="/wagmcAlone.png"
                alt="WAGMC"
                width={160}
                height={100}
                className="w-auto h-20 object-contain mb-3"
              />
              <span className="text-sm font-semibold text-zinc-700">WAGMC</span>
              <span className="text-xs text-zinc-500">Training Delivery</span>
            </div>
          </div>

          {/* Grant Funding Note */}
          <div className="max-w-2xl mx-auto text-center p-6 bg-[#F59E0B]/10 rounded-2xl border border-[#F59E0B]/20">
            <h4 className="font-semibold text-zinc-900 mb-2">{t('grantInfo')}</h4>
            <p className="text-sm text-zinc-600">{t('grantInfoDesc')}</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#0F766E]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleApplyClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] text-white rounded-full text-base font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98] shadow-lg"
            >
              {t('applyNow')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full text-base font-medium motion-fast hover:bg-white/20 active:scale-[0.98]"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
