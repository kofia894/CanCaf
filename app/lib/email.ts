/**
 * Email validation shared by the client forms and the server actions.
 *
 * Single source of truth so the browser and the server agree on what counts as
 * valid — a server action is a public HTTP endpoint, so client-side checks
 * alone guarantee nothing about what actually reaches Sanity.
 *
 * The pattern is the WHATWG HTML `input[type=email]` grammar, tightened to
 * require a dot-separated domain (it otherwise accepts intranet addresses like
 * "nurse@localhost", which are never right for a public registration form).
 */

const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

/** RFC 5321 limits: 254 for the whole address, 64 for the local part. */
const MAX_TOTAL_LENGTH = 254
const MAX_LOCAL_LENGTH = 64

export function isValidEmail(value: string): boolean {
  const email = value.trim()

  if (!email || email.length > MAX_TOTAL_LENGTH) return false
  if (!EMAIL_PATTERN.test(email)) return false

  const atIndex = email.lastIndexOf('@')
  const local = email.slice(0, atIndex)
  const domain = email.slice(atIndex + 1)

  if (local.length > MAX_LOCAL_LENGTH) return false

  // The pattern allows dots in the local part but not these placements
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false
  if (domain.includes('..')) return false

  // A real TLD is alphabetic and at least two characters
  const tld = domain.slice(domain.lastIndexOf('.') + 1)
  if (!/^[a-zA-Z]{2,}$/.test(tld)) return false

  return true
}

/** Canonical form used for storage and duplicate checks. */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}
