'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'
import LITRegistrationForm from '../../../components/LITRegistrationForm'

interface LITClientProps {
  /** Path to the programme flyer in /public, or null if it hasn't been added yet. */
  flyerSrc: string | null
  registrationOpen: boolean
  /** Registration fee in major units. 0 means free — no payment step. */
  fee: number
  currency: string
}

/**
 * LIT — Leadership Development Series for Nurses & Midwives
 * Lead · Influence · Transform
 *
 * Deliberately short: a compact header, the programme flyer, and the
 * registration form. Details mirror the flyer artwork in text so they are
 * readable by search engines and screen readers, which cannot read the image.
 */

/** Programme facts, as printed on the flyer. */
const KEY_DETAILS = [
  {
    label: '27 – 29 August 2026',
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
  },
  {
    label: '1:00 – 3:30 PM GMT daily',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    label: 'Virtual — on Teams',
    icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z',
  },
  {
    label: 'CPD accredited (NMC Ghana)',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
  },
]

const HIGHLIGHTS = [
  'Lead from where you stand',
  'Move people, move care',
  'Build the future ward',
  'Interactive learning & pan-African networking',
]

const AUDIENCE = [
  'Nurses',
  'Midwives',
  'Nurse Managers',
  'Ward Managers',
  'Nurse Educators',
  'Clinical Coordinators',
  'Emerging Leaders',
]

const FACULTY = [
  {
    name: 'Dr. Barnabas Yeboah',
    role: 'Director of Nursing and Midwifery, Ministry of Health, Ghana',
  },
  {
    name: 'Dr. Stacy Bentil',
    role: 'CEO, Bentil Healthcare Consulting, USA',
  },
  {
    name: 'Dr. Jose Arnold Tariga',
    role: 'Founder, Bridge and Beyond Advisory LLC, USA',
  },
]

export default function LITClient({
  flyerSrc,
  registrationOpen,
  fee,
  currency,
}: LITClientProps) {
  const hasFee = fee > 0

  return (
    <div className="bg-zinc-50">
      {/* ============================================================
          COMPACT HEADER
          ============================================================ */}
      <section className="relative w-full bg-zinc-900 pt-[132px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/home/excelincare.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-[#0F766E]/40 to-zinc-900/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            {registrationOpen && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F59E0B] text-white text-sm font-medium rounded-full mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                Registration Open
              </span>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-montserrat)] leading-[1.05] tracking-tight mb-3">
              LIT
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-medium mb-3">
              Leadership Development Series for Nurses &amp; Midwives
            </p>

            <p className="text-sm md:text-base text-[#F59E0B] font-medium tracking-[0.25em] uppercase mb-5">
              Lead · Influence · Transform
            </p>

            <p className="text-white/75 text-base md:text-lg max-w-2xl mb-7">
              Develop the leader within. Influence others. Transform healthcare. A flagship
              leadership initiative of the 2025 Aster Guardians Global Nursing Award winner,
              Mrs. Naomi Oyoe Ohene Oti.
            </p>

            {/* Key details */}
            <div className="flex flex-wrap items-center gap-2.5">
              {KEY_DETAILS.map((detail) => (
                <span
                  key={detail.label}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm"
                >
                  <svg
                    className="w-4 h-4 text-[#F59E0B] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={detail.icon} />
                  </svg>
                  {detail.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FLYER + REGISTRATION FORM
          ============================================================ */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
            {/* Left column — flyer and programme detail */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="space-y-6"
            >
              {flyerSrc && (
                <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 shadow-lg bg-white">
                  <Image
                    src={flyerSrc}
                    alt="LIT — Leadership Development Series for Nurses & Midwives. 27–29 August 2026, virtual on Teams, 1:00–3:30 PM GMT daily. CPD accredited by the Nursing and Midwifery Council of Ghana."
                    width={762}
                    height={1080}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              )}

              {/* Programme highlights */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <h2 className="text-sm font-semibold text-[#0F766E] uppercase tracking-wider mb-4">
                  Programme Highlights
                </h2>
                <ul className="space-y-3">
                  {HIGHLIGHTS.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="text-zinc-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who should attend */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <h2 className="text-sm font-semibold text-[#0F766E] uppercase tracking-wider mb-4">
                  Who Should Attend
                </h2>
                <div className="flex flex-wrap gap-2">
                  {AUDIENCE.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1.5 bg-[#0F766E]/10 text-[#0F766E] text-sm font-medium rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Faculty */}
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <h2 className="text-sm font-semibold text-[#0F766E] uppercase tracking-wider mb-4">
                  Distinguished Faculty
                </h2>
                <ul className="space-y-4">
                  {FACULTY.map((person) => (
                    <li key={person.name}>
                      <p className="font-semibold text-zinc-900">{person.name}</p>
                      <p className="text-sm text-zinc-600 leading-snug">{person.role}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-5 border-t border-zinc-200">
                  <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-2">
                    Official Launch
                  </p>
                  <p className="font-semibold text-zinc-900">Dr. James Avoka Asamani</p>
                  <p className="text-sm text-zinc-600 leading-snug">
                    Health Workforce (HWF) Team Lead, World Health Organization (WHO), Africa Region
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right column — registration */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
              id="register"
              className={`scroll-mt-32 lg:sticky lg:top-[148px] ${
                flyerSrc ? '' : 'lg:col-span-2 max-w-3xl mx-auto w-full'
              }`}
            >
              <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 sm:p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-2">
                    Participant Registration
                  </h2>
                  <p className="text-zinc-600">
                    {registrationOpen
                      ? 'Complete the form below to register for LIT. It takes about five minutes.'
                      : 'Registration for this cohort is currently closed.'}
                  </p>

                  {registrationOpen && hasFee && (
                    <div className="mt-5 flex items-center gap-3 p-4 bg-[#F59E0B]/10 rounded-xl border border-[#F59E0B]/20">
                      <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900">
                          Registration fee: {currency} {fee.toFixed(2)}
                        </p>
                        <p className="text-xs text-zinc-600">
                          Payable securely by card or mobile money after the final step.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {registrationOpen ? (
                  <LITRegistrationForm />
                ) : (
                  <div className="text-center py-6">
                    <p className="text-zinc-600 mb-6">
                      Registration is closed for now. Get in touch and we&apos;ll let you know when
                      the next cohort opens.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-full text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98]"
                    >
                      Contact Us
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
