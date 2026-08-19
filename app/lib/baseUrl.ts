import { headers } from 'next/headers'

/**
 * Resolve the origin of the current request.
 *
 * Payment callback and return URLs must point back at whichever host the user
 * is actually on — localhost during development, the preview domain on Vercel,
 * cancaf.org in production. Reading it from the request rather than from
 * NEXT_PUBLIC_BASE_URL means one env var can't send local checkouts to the
 * live site (or vice versa).
 *
 * Falls back to NEXT_PUBLIC_BASE_URL when there is no request scope, e.g. a
 * cron job or a build-time call.
 */
export async function getBaseUrl(): Promise<string> {
  try {
    const requestHeaders = await headers()

    // x-forwarded-* is what Vercel and other proxies set; host is the direct case
    const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host')

    if (host) {
      const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1')
      const protocol = requestHeaders.get('x-forwarded-proto') || (isLocal ? 'http' : 'https')

      return `${protocol}://${host}`
    }
  } catch {
    // headers() throws outside a request scope — fall through to the env var
  }

  return process.env.NEXT_PUBLIC_BASE_URL || 'https://cancaf.org'
}
