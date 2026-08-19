/**
 * Option lists for the LIT registration form.
 *
 * Single source of truth for the client form and the server action's
 * validation, so the two can't drift apart.
 *
 * The Sanity schema at studio-cancaf/schemaTypes/litRegistrationType.ts mirrors
 * these values manually — it lives in a separate package and can't import from
 * here. If you change a list, update the schema's matching `options.list` too,
 * or Sanity will reject the write with "did not match any allowed values".
 */

export const AGE_RANGES = [
  'Under 25',
  '25 - 34',
  '35 - 44',
  '45 - 54',
  '55 and above',
] as const

export const PROFESSIONS = ['Nurse', 'Midwife', 'Other'] as const

export const LEADERSHIP_AREAS = [
  'Self-leadership',
  'Communication & influence',
  'Team leadership',
  'Change & quality improvement',
  'Strategic leadership',
  'Other',
] as const

export const YES_NO = ['Yes', 'No'] as const
