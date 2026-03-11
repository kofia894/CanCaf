'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'motion/react'
import PageHero from '../../components/PageHero'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

export default function AboutClient() {
  const t = useTranslations('about')
  const values = useTranslations('values')

  const coreValues = [
    { key: 'compassion', title: values('compassion'), description: values('compassionDesc') },
    { key: 'equity', title: values('equity'), description: values('equityDesc') },
    { key: 'integrity', title: values('integrity'), description: values('integrityDesc') },
    { key: 'collaboration', title: values('collaboration'), description: values('collaborationDesc') },
    { key: 'innovation', title: values('innovation'), description: values('innovationDesc') },
    { key: 'excellence', title: values('excellence'), description: values('excellenceDesc') },
    { key: 'impact', title: values('impact'), description: values('impactDesc') },
  ]

  const valueIcons: Record<string, string> = {
    compassion: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    equity: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z',
    integrity: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    collaboration: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
    innovation: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
    excellence: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    impact: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  }

  return (
    <div>
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/home2.webp"
      />

      {/* Who We Are Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={sectionVariants}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-base font-medium text-zinc-600">{t('whoWeAreTag')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('whoWeAreTitle')}
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                {t('whoWeAreText')}
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/home/home2.webp"
                  alt="CanCAF Team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Origin Section */}
      <section className="py-20 md:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#F59E0B] rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">{t('originTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
              {t('originTitle')}
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed max-w-3xl mx-auto">
              {t('originText1')}
            </p>
          </motion.div>

          {/* Bento Grid Layout for Media */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-12 md:mb-16">
            {/* Main Feature Image */}
            <motion.div
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/winningAster.webp"
                  alt="Naomi Oyoe Ohene Oti - Aster Guardians Global Nursing Award Winner"
                  fill
                  className="object-cover"
                />
                {/* Award Badge */}
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-[#F59E0B] text-white px-4 py-3 rounded-xl shadow-lg">
                  <p className="text-xs font-medium uppercase tracking-wider opacity-80">2025</p>
                  <p className="text-sm font-bold">Aster Guardians Global Nursing Award</p>
                </div>
              </div>
            </motion.div>

            {/* Side Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
              {/* Video Embed */}
              <motion.div
                className="relative flex-1 min-h-[200px] rounded-2xl overflow-hidden shadow-xl bg-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              >
                <iframe
                  src="https://www.youtube.com/embed/28347lTWuL0?autoplay=1&mute=1&loop=1&playlist=28347lTWuL0"
                  title="Aster Guardians Award Ceremony"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                className="relative aspect-[16/9] lg:aspect-auto lg:flex-1 rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                <Image
                  src="/origin/origin0.webp"
                  alt="Award ceremony moment"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Gallery Row - 5 Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { src: '/origin/origin1.webp', alt: 'Award ceremony moment 1' },
              { src: '/origin/origin2.webp', alt: 'Award ceremony moment 2' },
              { src: '/origin/origin3.webp', alt: 'Award ceremony moment 3' },
              { src: '/origin/origin4.webp', alt: 'Award ceremony moment 4' },
              { src: '/origin/origin5.webp', alt: 'Award ceremony moment 5' },
            ].map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Caption Text */}
          <motion.p
            className="text-center text-zinc-600 mt-8 text-lg leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            {t('originText2')}
          </motion.p>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="py-20 md:py-28 bg-[#0F766E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-white/60 rounded-full"></span>
              <span className="text-base font-medium text-white/80">{t('purposeTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-tight mb-8">
              {t('purposeTitle')}
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              {t('purposeText1')}
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              {t('purposeText2')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">{t('missionVisionTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
              {t('missionVisionTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              className="bg-zinc-50 rounded-2xl p-8 md:p-10 border border-zinc-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-14 h-14 bg-[#0F766E] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
                {t('mission')}
              </h3>
              <p className="text-zinc-600 text-lg leading-relaxed">
                {t('missionText')}
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-[#0F766E] rounded-2xl p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)] mb-4">
                {t('vision')}
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {t('visionText')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">{t('coreValues')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)]">
              {t('whatGuidesUs')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.key}
                className="group bg-white rounded-2xl p-6 border border-zinc-200 hover:border-[#0F766E]/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.05 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F766E]/10 flex items-center justify-center mb-4 group-hover:bg-[#0F766E] transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-[#0F766E] group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={valueIcons[value.key]} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-600 text-base leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={sectionVariants}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
              <span className="text-base font-medium text-zinc-600">{t('advisoryBoardTag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-6">
              {t('advisoryBoardTitle')}
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              {t('advisoryBoardText')}
            </p>
          </motion.div>

          {/* Advisory Board Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Member Name', role: 'Position Title', image: '' },
              { name: 'Member Name', role: 'Position Title', image: '' },
              { name: 'Member Name', role: 'Position Title', image: '' },
              { name: 'Member Name', role: 'Position Title', image: '' },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-[#0F766E]/30 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-zinc-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#0F766E] font-medium">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Work Section */}
      <section className="py-20 md:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={sectionVariants}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#0F766E] rounded-full"></span>
                <span className="text-base font-medium text-zinc-600">{t('whereWeWork')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-tight mb-6">
                {t('whereWeWorkTitle')}
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed">
                {t('whereWeWorkText')}
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/about/accrossafrica.webp"
                  alt={t('whereWeWork')}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
