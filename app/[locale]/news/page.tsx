import { getTranslations } from 'next-intl/server'
import PageHero from '../../components/PageHero'

export const metadata = {
  title: 'News & Activities - CanCAF',
  description: 'Stay updated with the latest news and activities from CanCAF.',
}

export default async function NewsPage() {
  const t = await getTranslations('news')

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
          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <article className="group">
              <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#0F766E]/20 to-[#0F766E]/5 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">Featured Image</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#0F766E] font-medium">Training</span>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors">
                  Healthcare Professional Training Program Launches in Kenya
                </h3>
                <p className="text-zinc-500 text-sm">
                  February 15, 2025
                </p>
              </div>
            </article>

            {/* News Card 2 */}
            <article className="group">
              <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#0F766E]/20 to-[#0F766E]/5 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">Featured Image</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#0F766E] font-medium">Partnership</span>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors">
                  New Partnership with WHO African Region Announced
                </h3>
                <p className="text-zinc-500 text-sm">
                  February 10, 2025
                </p>
              </div>
            </article>

            {/* News Card 3 */}
            <article className="group">
              <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#0F766E]/20 to-[#0F766E]/5 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">Featured Image</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#0F766E] font-medium">Awareness</span>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors">
                  World Cancer Day 2025: Our Commitment to Africa
                </h3>
                <p className="text-zinc-500 text-sm">
                  February 4, 2025
                </p>
              </div>
            </article>

            {/* News Card 4 */}
            <article className="group">
              <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#0F766E]/20 to-[#0F766E]/5 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">Featured Image</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#0F766E] font-medium">Research</span>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors">
                  Research Initiative: Understanding Cancer Patterns in West Africa
                </h3>
                <p className="text-zinc-500 text-sm">
                  January 28, 2025
                </p>
              </div>
            </article>

            {/* News Card 5 */}
            <article className="group">
              <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#0F766E]/20 to-[#0F766E]/5 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">Featured Image</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#0F766E] font-medium">Community</span>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors">
                  Community Screening Program Reaches 5,000 People in Ghana
                </h3>
                <p className="text-zinc-500 text-sm">
                  January 20, 2025
                </p>
              </div>
            </article>

            {/* News Card 6 */}
            <article className="group">
              <div className="aspect-[16/10] bg-zinc-200 rounded-2xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#0F766E]/20 to-[#0F766E]/5 flex items-center justify-center">
                  <span className="text-zinc-400 text-sm">Featured Image</span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-[#0F766E] font-medium">Event</span>
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] group-hover:text-[#0F766E] motion-colors">
                  Annual Cancer Care Summit 2025: Registration Now Open
                </h3>
                <p className="text-zinc-500 text-sm">
                  January 15, 2025
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
