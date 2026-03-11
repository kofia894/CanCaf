import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'Donate - CanCAF',
  description: 'Support our mission to strengthen cancer care capacity across Africa.',
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

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Message */}
            <div>
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
            </div>

            {/* Right Column - Contact Card */}
            <div>
              <div className="bg-[#0F766E] rounded-2xl p-8 md:p-10 text-white">
                <h3 className="text-xl md:text-2xl font-semibold font-[family-name:var(--font-montserrat)] mb-4">
                  {t('contactToSupport')}
                </h3>
                <p className="text-white/80 mb-8">
                  {t('contactToSupportText')}
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Email</h4>
                      <a href="mailto:info@cancaf.org" className="text-white/80 hover:text-white motion-fast">
                        info@cancaf.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Phone / WhatsApp</h4>
                      <a href="tel:+233593443344" className="text-white/80 hover:text-white motion-fast">
                        +233 593 443 344
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Location</h4>
                      <p className="text-white/80">Accra, Ghana</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-3 bg-white text-[#0F766E] rounded-full text-sm font-medium motion-fast hover:bg-white/90"
                >
                  {t('contactUs')}
                  <svg className="w-4 h-4 rtl:rotate-180 ml-2 rtl:ml-0 rtl:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mt-20 pt-16 border-t border-zinc-200">
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
        </div>
      </section>
    </div>
  )
}
