import { client, SITE_SETTINGS_QUERY, settingsFetchOptions, SiteSettings } from '../../../lib/sanity'
import CGCPOnAfricaClient from './CGCPOnAfricaClient'

/**
 * CGCPON Africa Programme Page (Server Component)
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

  return <CGCPOnAfricaClient applicationsOpen={applicationsOpen} />
}
