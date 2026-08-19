import { ReactNode } from 'react'
import PageHero from './PageHero'

/**
 * Shared layout and typography for legal documents (Terms of Service,
 * Privacy Policy).
 *
 * Keeps both pages visually identical and gives the long-form content a
 * comfortable measure, since these are read rather than scanned.
 */

interface LegalPageProps {
  tag: string
  title: string
  subtitle?: string
  version: string
  effectiveDate: string
  nextReviewDate: string
  intro: ReactNode
  children: ReactNode
}

export function LegalPage({
  tag,
  title,
  subtitle,
  version,
  effectiveDate,
  nextReviewDate,
  intro,
  children,
}: LegalPageProps) {
  return (
    <div className="bg-white">
      <PageHero tag={tag} title={title} subtitle={subtitle} backgroundImage="/home/hero.webp" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Document control */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-zinc-50 rounded-2xl border border-zinc-200 mb-10">
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Version
            </dt>
            <dd className="text-sm font-semibold text-zinc-900">{version}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Effective Date
            </dt>
            <dd className="text-sm font-semibold text-zinc-900">{effectiveDate}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Next Review
            </dt>
            <dd className="text-sm font-semibold text-zinc-900">{nextReviewDate}</dd>
          </div>
        </dl>

        {/* Intro */}
        <div className="space-y-4 text-zinc-700 leading-relaxed text-lg mb-12">{intro}</div>

        {/* Body */}
        <div className="space-y-10">{children}</div>
      </div>
    </div>
  )
}

/** A numbered top-level clause. */
export function LegalSection({
  number,
  heading,
  children,
}: {
  number: number
  heading: string
  children: ReactNode
}) {
  return (
    <section id={`section-${number}`} className="scroll-mt-32">
      <h2 className="text-xl md:text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4 pb-3 border-b border-zinc-200">
        <span className="text-[#0F766E]">{number}.</span> {heading}
      </h2>
      <div className="space-y-4 text-zinc-700 leading-relaxed">{children}</div>
    </section>
  )
}

/** A sub-heading within a clause. */
export function LegalSubheading({ children }: { children: ReactNode }) {
  return <h3 className="font-semibold text-zinc-900 pt-2">{children}</h3>
}

/** Bulleted list with the site's teal markers. */
export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] flex-shrink-0 mt-2.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Contact block used to close both documents. */
export function LegalContact({ heading }: { heading: string }) {
  return (
    <div className="p-6 bg-[#0F766E]/5 rounded-2xl border border-[#0F766E]/20">
      <p className="mb-3">{heading}</p>
      <p className="font-semibold text-zinc-900 mb-2">Cancer Care Africa Foundation (CanCAF)</p>
      <ul className="space-y-1 text-zinc-700">
        <li>
          Website:{' '}
          <a href="https://cancaf.org" className="text-[#0F766E] hover:underline">
            cancaf.org
          </a>
        </li>
        <li>
          Email:{' '}
          <a href="mailto:info@cancaf.org" className="text-[#0F766E] hover:underline">
            info@cancaf.org
          </a>
        </li>
        <li>
          Telephone:{' '}
          <a href="tel:+233593443344" className="text-[#0F766E] hover:underline">
            +233 593 443 344
          </a>
        </li>
      </ul>
    </div>
  )
}
