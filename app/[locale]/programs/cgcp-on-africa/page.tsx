'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import ApplicationForm from '../../../components/ApplicationForm'

/**
 * CGCPON Africa Programme Page
 *
 * Cancer Genetic Counselling Certificate Programme for Oncology Nurses in Africa
 * A collaboration between WAGMC, Aster Guardians Global Nursing Award, and CanCAF
 */

const heroEasing = [0.25, 0.1, 0.25, 1] as const

export default function CGCPOnAfricaPage() {
  const t = useTranslations('cgcpOnAfrica')
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const skillsLearned = [
    { key: 'genetics', icon: '🧬' },
    { key: 'riskAssessment', icon: '📋' },
    { key: 'counselling', icon: '💬' },
    { key: 'testing', icon: '🔬' },
    { key: 'precision', icon: '🎯' },
    { key: 'ethics', icon: '⚖️' },
  ]

  const trainingModules = [
    { key: 'module1', icon: '📚' },
    { key: 'module2', icon: '📑' },
    { key: 'module3', icon: '🎭' },
    { key: 'module4', icon: '🤝' },
  ]

  const eligibilityCriteria = [
    'registeredNurse',
    'workingInOncology',
    'institutionalSupport',
    'commitToService',
    'englishProficiency',
  ]

  const partners = [
    { name: 'West African Genetic Medicine Centre', abbr: 'WAGMC', location: 'West Africa' },
    { name: 'Aster Guardians Global Nursing Award', abbr: 'Aster Guardians', location: 'Global' },
    { name: 'Cancer Care Africa Foundation', abbr: 'CanCAF', location: 'Africa-wide' },
  ]

  if (showApplicationForm) {
    return <ApplicationForm onBack={() => setShowApplicationForm(false)} />
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[550px] w-full bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-sm"
          style={{
            backgroundImage: "url('/home/capacitybuilding.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/30 via-[#0F766E]/40 to-[#0F766E]/50" />

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-16">
          <div className="max-w-3xl">
            {/* Status Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: heroEasing, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                {t('acceptingApplications')}
              </span>
              <span className="px-4 py-1.5 bg-[#0F766E] text-white text-sm font-medium rounded-full">
                {t('tag')}
              </span>
              <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full">
                {t('programDates')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: heroEasing, delay: 0.2 }}
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-5 text-base md:text-lg text-white/80 max-w-xl"
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: heroEasing, delay: 0.4 }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Deadline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: heroEasing, delay: 0.5 }}
              className="mt-4"
            >
              <span className="inline-flex items-center gap-2 text-[#F59E0B] text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('deadline')}
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: heroEasing, delay: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={() => setShowApplicationForm(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {t('applyNow')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm text-zinc-600">{t('aboutTag')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('aboutTitle')}
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                {t('aboutDesc1')}
              </p>
              <p className="text-zinc-600 leading-relaxed">
                {t('aboutDesc2')}
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/home/capacitybuilding.webp"
                alt="CGCPON Africa Training"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-16 md:py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0F766E]/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
              {t('whyMatters')}
            </h2>
            <p className="text-zinc-600 leading-relaxed text-lg">
              {t('whyMattersDesc')}
            </p>

            {/* Statistic Highlight */}
            <div className="mt-10 inline-flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-zinc-200 shadow-sm">
              <span className="text-4xl md:text-5xl font-bold text-[#0F766E]">90%</span>
              <span className="text-left text-sm text-zinc-600 max-w-[200px]">
                of African countries have no genetic counsellors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Learned Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-sm text-zinc-600">{t('skillsTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight">
              {t('skillsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsLearned.map((skill) => (
              <div
                key={skill.key}
                className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 hover:border-[#0F766E]/30 motion-colors"
              >
                <span className="text-3xl mb-4 block">{skill.icon}</span>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {t(`skills.${skill.key}`)}
                </h3>
                <p className="text-sm text-zinc-600">
                  {t(`skills.${skill.key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Model Section */}
      <section className="py-16 md:py-24 bg-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-sm text-zinc-600">{t('trainingTag')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('trainingTitle')}
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-8">
                {t('trainingDesc')}
              </p>

              {/* Training Modules */}
              <div className="space-y-4">
                {trainingModules.map((module, index) => (
                  <div
                    key={module.key}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-zinc-200"
                  >
                    <div className="w-10 h-10 bg-[#0F766E] text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0 text-lg">
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-zinc-900">
                        {t(`training.${module.key}`)}
                      </h4>
                      <p className="text-sm text-zinc-600 mt-1">
                        {t(`training.${module.key}Desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-auto rounded-2xl overflow-hidden">
              <Image
                src="/home/excelincare.webp"
                alt="Virtual Training Model"
                fill
                className="object-cover"
              />
              {/* Virtual Badge */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#0F766E]">
                🌐 100% Virtual Programme
              </div>
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
              <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
                <h4 className="font-semibold text-white mb-2">{t('commitment')}</h4>
                <p className="text-sm text-white/80">{t('commitmentDesc')}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6">{t('readyToApply')}</h3>
              <p className="text-white/80 mb-6">
                {t('readyToApplyDesc')}
              </p>

              {/* Key Dates */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="text-sm">Applications close: <strong>May 31, 2025</strong></span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                  <span className="text-sm">Programme dates: <strong>July - November 2025</strong></span>
                </div>
              </div>

              <button
                onClick={() => setShowApplicationForm(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#D4A017] active:scale-[0.98]"
              >
                {t('startApplication')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 text-center"
              >
                <div className="w-16 h-16 bg-[#0F766E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-1">{partner.name}</h3>
                <p className="text-sm text-[#0F766E] font-medium mb-1">{partner.abbr}</p>
                <p className="text-sm text-zinc-500">{partner.location}</p>
              </div>
            ))}
          </div>

          {/* Grant Funding Note */}
          <div className="mt-12 max-w-2xl mx-auto text-center p-6 bg-[#F59E0B]/10 rounded-2xl border border-[#F59E0B]/20">
            <h4 className="font-semibold text-zinc-900 mb-2">{t('grantInfo')}</h4>
            <p className="text-sm text-zinc-600">{t('grantInfoDesc')}</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t('ctaDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#D4A017] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t('applyNow')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full text-sm font-medium motion-fast hover:bg-white/20 active:scale-[0.98]"
            >
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
