import { getTranslations } from 'next-intl/server'
import PageHero from '../../components/PageHero'
import DonateClient from './DonateClient'

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support CanCAF\'s mission to strengthen cancer care capacity . Your donation helps train healthcare workers and reach communities with cancer prevention and screening.',
  openGraph: {
    title: 'Donate - Support Cancer Care in Africa',
    description: 'Your donation helps train healthcare workers and reach communities with cancer prevention and screening.',
    images: ['/home/advocacy.webp'],
  },
}

export default async function DonatePage() {
  const t = await getTranslations('donate')

  return (
    <div>
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/home/advocacy.webp"
      />

      {/* Donation Form Section */}
      <section className="py-16 md:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Message */}
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-6">
                {t('makeDifference')}
              </h2>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                {t('makeDifferenceText')}
              </p>

              {/* What Your Support Enables */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#0F766E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-1">{t('trainingMaterials')}</h3>
                    <p className="text-zinc-500 text-sm">{t('trainedInCare')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#0F766E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-1">{t('screeningEvent')}</h3>
                    <p className="text-zinc-500 text-sm">{t('reachedScreening')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#0F766E]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 mb-1">{t('trainingWorkshop')}</h3>
                    <p className="text-zinc-500 text-sm">{t('acrossContinent')}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-6 bg-white rounded-2xl border border-zinc-200">
                <h4 className="font-medium text-zinc-900 mb-4">{t('contactToSupport')}</h4>
                <div className="space-y-3 text-sm">
                  <a href="mailto:info@cancaf.org" className="flex items-center gap-3 text-zinc-600 hover:text-[#0F766E] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@cancaf.org
                  </a>
                  <a href="tel:+233593443344" className="flex items-center gap-3 text-zinc-600 hover:text-[#0F766E] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +233 593 443 344
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Donation Form */}
            <div>
              <DonateClient />
            </div>
          </div>

        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-8 text-center">
            {t('yourImpact')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F766E]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#0F766E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
              </div>
              <h4 className="font-medium text-zinc-900 mb-2">500+ {t('healthcareWorkers')}</h4>
              <p className="text-zinc-500 text-sm">{t('trainedInCare')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F766E]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#0F766E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <h4 className="font-medium text-zinc-900 mb-2">10,000+ {t('communityMembers')}</h4>
              <p className="text-zinc-500 text-sm">{t('reachedScreening')}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0F766E]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#0F766E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h4 className="font-medium text-zinc-900 mb-2">15 {t('countries')}</h4>
              <p className="text-zinc-500 text-sm">{t('acrossContinent')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
