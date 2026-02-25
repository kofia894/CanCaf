import { getTranslations } from 'next-intl/server'
import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'Donate - CanCAF',
  description: 'Support our mission to strengthen cancer care capacity across Africa.',
}

export default async function DonatePage() {
  const t = await getTranslations('donate')

  return (
    <div className="pt-[calc(2.5rem+4rem+3rem)]">
      <PageHero
        tag={t('tag')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
              {t('makeDifference')}
            </h2>
            <p className="text-zinc-600">
              {t('makeDifferenceText')}
            </p>
          </div>

          {/* Donation Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Option 1 */}
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 text-center hover:border-[#0F766E] motion-fast">
              <div className="text-3xl font-bold text-[#0F766E] font-[family-name:var(--font-montserrat)] mb-2">
                $25
              </div>
              <p className="text-zinc-600 text-sm mb-6">
                {t('trainingMaterials')}
              </p>
              <button className="w-full py-3 border border-[#0F766E] text-[#0F766E] rounded-full text-sm font-medium motion-fast hover:bg-[#0F766E] hover:text-white">
                {t('donateButton')} $25
              </button>
            </div>

            {/* Option 2 - Featured */}
            <div className="bg-[#0F766E] rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F59E0B] text-white text-xs font-medium rounded-full">
                {t('mostPopular')}
              </div>
              <div className="text-3xl font-bold text-white font-[family-name:var(--font-montserrat)] mb-2">
                $100
              </div>
              <p className="text-white/80 text-sm mb-6">
                {t('screeningEvent')}
              </p>
              <button className="w-full py-3 bg-white text-[#0F766E] rounded-full text-sm font-medium motion-fast hover:bg-white/90">
                {t('donateButton')} $100
              </button>
            </div>

            {/* Option 3 */}
            <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200 text-center hover:border-[#0F766E] motion-fast">
              <div className="text-3xl font-bold text-[#0F766E] font-[family-name:var(--font-montserrat)] mb-2">
                $500
              </div>
              <p className="text-zinc-600 text-sm mb-6">
                {t('trainingWorkshop')}
              </p>
              <button className="w-full py-3 border border-[#0F766E] text-[#0F766E] rounded-full text-sm font-medium motion-fast hover:bg-[#0F766E] hover:text-white">
                {t('donateButton')} $500
              </button>
            </div>
          </div>

          {/* Custom Amount */}
          <div className="max-w-md mx-auto bg-zinc-50 rounded-2xl p-8 border border-zinc-200">
            <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4 text-center">
              {t('customAmount')}
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                <input
                  type="number"
                  placeholder={t('enterAmount')}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none motion-fast"
                />
              </div>
              <button className="px-6 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0d6b63] hover:-translate-y-0.5 active:scale-[0.98]">
                {t('donateButton')}
              </button>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mt-20">
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
