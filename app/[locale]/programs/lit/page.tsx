import { existsSync } from 'node:fs'
import path from 'node:path'
import { Metadata } from 'next'
import {
  client,
  SITE_SETTINGS_QUERY,
  settingsFetchOptions,
  SiteSettings,
} from '@/app/lib/sanity'
import LITClient from './LITClient'

export const metadata: Metadata = {
  title: 'LIT - Leadership Development Series for Nurses & Midwives',
  description:
    'Register for LIT, the CanCAF Leadership Development Series for Nurses & Midwives. 27-29 August 2026, virtual on Teams, 1:00-3:30 PM GMT daily. For CPD points',
  keywords: [
    'LIT',
    'leadership development',
    'nurses',
    'midwives',
    'nursing leadership Africa',
    'CanCAF programme',
    'Lead Influence Transform',
    'CPD accredited nursing Ghana',
    'Aster Guardians Global Nursing Award',
  ],
  openGraph: {
    title: 'LIT - Leadership Development Series for Nurses & Midwives',
    description:
      'Lead. Influence. Transform. 27-29 August 2026, virtual on Teams. CPD accredited. Registration is now open.',
    images: ['/litflyer.webp'],
  },
}

/**
 * Programme flyer at public/litflyer.webp. The lookup is kept so replacing the
 * artwork with a .png/.jpg still works, and so a missing file degrades to a
 * full-width form rather than a broken image.
 */
const FLYER_CANDIDATES = ['/litflyer.webp', '/litflyer.png', '/litflyer.jpg']

function resolveFlyer(): string | null {
  return (
    FLYER_CANDIDATES.find((candidate) =>
      existsSync(path.join(process.cwd(), 'public', candidate.replace(/^\//, '')))
    ) ?? null
  )
}

/**
 * LIT Programme Page
 *
 * Leadership Development Series for Nurses & Midwives — Lead · Influence · Transform.
 * The current open programme: flyer plus registration form, one page.
 *
 * Fee and open/closed state come from Sanity site settings, so the team can
 * change the price or close registration without a deploy. A fee of 0 means
 * registration is free and the Paystack step is skipped entirely.
 */
export default async function LITPage() {
  const settings = await client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
    {},
    settingsFetchOptions
  )

  return (
    <LITClient
      flyerSrc={resolveFlyer()}
      registrationOpen={settings?.litRegistrationOpen ?? true}
      fee={settings?.litRegistrationFee ?? 0}
      currency={settings?.litRegistrationCurrency || 'GHS'}
    />
  )
}
