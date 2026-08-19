import countryLabels from 'react-phone-number-input/locale/en.json'

/**
 * Alphabetical list of country names for form dropdowns.
 *
 * Derived from the locale data already shipped with react-phone-number-input
 * (used by the phone fields), so the country dropdown and the phone number
 * country picker always agree and no extra dependency is needed.
 *
 * The locale file also holds UI labels like "ext" and "country"; only the
 * two-letter ISO 3166-1 alpha-2 keys are country entries.
 */
const ISO_COUNTRY_CODE = /^[A-Z]{2}$/

export const COUNTRIES: string[] = Object.entries(countryLabels)
  .filter(([code]) => ISO_COUNTRY_CODE.test(code))
  .map(([, name]) => name)
  .sort((a, b) => a.localeCompare(b))

/** Fast membership check for server-side validation. */
const COUNTRY_SET = new Set(COUNTRIES)

export function isValidCountry(value: string): boolean {
  return COUNTRY_SET.has(value)
}
