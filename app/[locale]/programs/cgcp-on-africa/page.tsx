import { Metadata } from "next";
import { client, SITE_SETTINGS_QUERY, settingsFetchOptions, SiteSettings } from '../../../lib/sanity'
import CGCPOnAfricaClient from './CGCPOnAfricaClient'

export const metadata: Metadata = {
  title: 'CGCP-ON Africa - Cancer Genetic Counselling Programme',
  description: 'Apply for the Cancer Genetic Counselling Certificate Programme for Oncology Nurses (CGCP-ON Africa). A flagship programme by CanCAF, WAGMC, and Aster Guardians.',
  keywords: ['CGCP-ON Africa', 'cancer genetic counselling', 'oncology nurses', 'nursing certificate', 'Africa healthcare training', 'CanCAF programme'],
  openGraph: {
    title: 'CGCP-ON Africa - Cancer Genetic Counselling Programme',
    description: 'Cancer Genetic Counselling Certificate Programme for Oncology Nurses. Apply now to advance your career in oncology nursing.',
    images: ['/home/capacitybuilding.webp'],
  },
}

/**
 * CGCP-ON Africa Programme Page (Server Component)
 *
 * Fetches site settings from Sanity to determine if applications are open,
 * then renders the client component with the appropriate state.
 */

export default async function CGCPOnAfricaPage() {
  // Fetch site settings from Sanity
  const settings = await client.fetch<SiteSettings | null>(
    SITE_SETTINGS_QUERY,
    {},
    settingsFetchOptions
  )

  // Default to false if settings don't exist yet
  const applicationsOpen = settings?.cgcponApplicationsOpen ?? false
  const registrationFee = settings?.cgcponRegistrationFee ?? 50

  return (
    <CGCPOnAfricaClient
      applicationsOpen={applicationsOpen}
      registrationFee={registrationFee}
    />
  )
}
