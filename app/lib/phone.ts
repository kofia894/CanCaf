/**
 * Phone validation shared by the LIT registration and donation forms.
 *
 * Counts digits in the full E.164 value (country code included) and requires
 * 7–13. That range was checked against libphonenumber's example mobile number
 * for all 245 countries it knows about: the shortest is 7 digits and the
 * longest is 13, so no legitimate mobile number falls outside it. Nigeria and
 * Côte d'Ivoire sit right at the 13-digit ceiling, so do not lower the maximum
 * without re-running that check.
 */

export const MIN_PHONE_DIGITS = 7
export const MAX_PHONE_DIGITS = 13

/** Digits only — strips '+', spaces, dashes and parentheses. */
export function countPhoneDigits(value: string): number {
  return (value || '').replace(/\D/g, '').length
}

export function isValidPhone(value: string): boolean {
  const digits = countPhoneDigits(value)
  return digits >= MIN_PHONE_DIGITS && digits <= MAX_PHONE_DIGITS
}

export const PHONE_ERROR_MESSAGE = `Please enter a valid phone number (${MIN_PHONE_DIGITS}–${MAX_PHONE_DIGITS} digits, including the country code).`
