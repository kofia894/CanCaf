'use server'

import { writeClient, client, SITE_SETTINGS_QUERY, SiteSettings } from '@/app/lib/sanity'
import { generateReference, initializeTransaction, DEFAULT_CURRENCY } from '@/app/lib/paystack'
import { sendLitRegistrationEmails } from '@/app/lib/litRegistration'
import { getBaseUrl } from '@/app/lib/baseUrl'
import { AGE_RANGES, PROFESSIONS, LEADERSHIP_AREAS, YES_NO } from '@/app/lib/litOptions'
import { isValidCountry } from '@/app/lib/countries'

export interface LitRegistrationData {
  fullName: string
  email: string
  ageRange: string
  phone: string
  country: string
  profession: string
  professionOther: string
  currentRole: string
  institution: string
  highestQualification: string
  yearsOfExperience: string
  inLeadershipRole: string
  previousLeadershipTraining: string
  reasonForJoining: string
  leadershipArea: string
  leadershipAreaOther: string
  biggestChallenge: string
  hopeToGain: string
  canAttendAllSessions: string
  certificateName: string
  consent: boolean
}

export interface SubmitLitRegistrationResult {
  success: boolean
  message: string
  /** Present when a fee applies — the browser should redirect here to pay. */
  paymentUrl?: string
}

const REQUIRED_FIELDS: Array<{ key: keyof LitRegistrationData; label: string }> = [
  { key: 'fullName', label: 'Full name' },
  { key: 'email', label: 'Email address' },
  { key: 'ageRange', label: 'Age range' },
  { key: 'phone', label: 'WhatsApp/phone number' },
  { key: 'country', label: 'Country' },
  { key: 'profession', label: 'Profession' },
  { key: 'currentRole', label: 'Current position/role' },
  { key: 'institution', label: 'Institution/organization' },
  { key: 'highestQualification', label: 'Highest qualification' },
  { key: 'yearsOfExperience', label: 'Years of professional experience' },
  { key: 'inLeadershipRole', label: 'Current leadership role' },
  { key: 'previousLeadershipTraining', label: 'Previous leadership training' },
  { key: 'reasonForJoining', label: 'Reason for joining' },
  { key: 'leadershipArea', label: 'Leadership area to develop' },
  { key: 'biggestChallenge', label: 'Biggest leadership challenge' },
  { key: 'hopeToGain', label: 'What you hope to gain' },
  { key: 'canAttendAllSessions', label: 'Session availability' },
  { key: 'certificateName', label: 'Name for certificate' },
]

/** Fields whose value must come from a fixed list the Sanity schema also allows. */
const CHOICE_FIELDS: Array<{
  key: keyof LitRegistrationData
  label: string
  allowed: readonly string[]
}> = [
  { key: 'ageRange', label: 'age range', allowed: AGE_RANGES },
  { key: 'profession', label: 'profession', allowed: PROFESSIONS },
  { key: 'leadershipArea', label: 'leadership area', allowed: LEADERSHIP_AREAS },
  { key: 'inLeadershipRole', label: 'current leadership role', allowed: YES_NO },
  {
    key: 'previousLeadershipTraining',
    label: 'previous leadership training',
    allowed: YES_NO,
  },
  { key: 'canAttendAllSessions', label: 'session availability', allowed: YES_NO },
]

/**
 * Save a LIT registration, then start payment if a fee is configured.
 *
 * The document is always written before Paystack is called, so an abandoned
 * or failed payment never loses the submission — the same email can resume by
 * registering again, and the team can still see who dropped off.
 */
export async function submitLitRegistration(
  formData: LitRegistrationData
): Promise<SubmitLitRegistrationResult> {
  try {
    const missing = REQUIRED_FIELDS.filter(({ key }) => {
      const value = formData[key]
      return typeof value !== 'string' || value.trim() === ''
    })

    if (missing.length > 0) {
      return {
        success: false,
        message: `Please complete the following: ${missing.map((f) => f.label).join(', ')}.`,
      }
    }

    if (!formData.consent) {
      return {
        success: false,
        message: 'Please give consent to participate and receive programme communications.',
      }
    }

    // Catch option-list drift here rather than letting Sanity reject the write
    // with a raw "did not match any allowed values" error
    const invalidChoice = CHOICE_FIELDS.find(
      ({ key, allowed }) => !allowed.includes(formData[key] as string)
    )

    if (invalidChoice) {
      console.error(
        `LIT registration: invalid value "${formData[invalidChoice.key]}" for ${invalidChoice.key}`
      )
      return {
        success: false,
        message: `Please choose a valid option for ${invalidChoice.label}.`,
      }
    }

    if (!isValidCountry(formData.country.trim())) {
      return {
        success: false,
        message: 'Please select your country from the list.',
      }
    }

    const email = formData.email.toLowerCase().trim()

    const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {})

    if (settings?.litRegistrationOpen === false) {
      return {
        success: false,
        message: 'Registration for LIT is currently closed. Please check back soon.',
      }
    }

    const fee = settings?.litRegistrationFee ?? 0
    const currency = settings?.litRegistrationCurrency || DEFAULT_CURRENCY
    const requiresPayment = fee > 0

    // Block only registrations that actually completed; a pending or failed
    // payment should be able to try again.
    const existing = await client.fetch<{ _id: string; paymentStatus?: string } | null>(
      `*[_type == "litRegistration" && email == $email && paymentStatus in ["paid", "not_required"]][0]{_id, paymentStatus}`,
      { email }
    )

    if (existing) {
      return {
        success: false,
        message: 'This email address is already registered for LIT. Please check your inbox for your confirmation.',
      }
    }

    const reference = generateReference('LIT')

    const created = await writeClient.create({
      _type: 'litRegistration',
      fullName: formData.fullName.trim(),
      email,
      ageRange: formData.ageRange,
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      profession: formData.profession,
      professionOther: formData.professionOther?.trim() || undefined,
      currentRole: formData.currentRole.trim(),
      institution: formData.institution.trim(),
      highestQualification: formData.highestQualification.trim(),
      yearsOfExperience: formData.yearsOfExperience.trim(),
      inLeadershipRole: formData.inLeadershipRole,
      previousLeadershipTraining: formData.previousLeadershipTraining,
      reasonForJoining: formData.reasonForJoining.trim(),
      leadershipArea: formData.leadershipArea,
      leadershipAreaOther: formData.leadershipAreaOther?.trim() || undefined,
      biggestChallenge: formData.biggestChallenge.trim(),
      hopeToGain: formData.hopeToGain.trim(),
      canAttendAllSessions: formData.canAttendAllSessions,
      certificateName: formData.certificateName.trim(),
      consent: formData.consent,
      submittedAt: new Date().toISOString(),
      paymentStatus: requiresPayment ? 'pending' : 'not_required',
      paymentReference: requiresPayment ? reference : undefined,
      currency: requiresPayment ? currency : undefined,
      confirmationEmailSent: false,
    })

    // Free registration — confirm immediately, no payment step
    if (!requiresPayment) {
      await sendLitRegistrationEmails({
        _id: created._id,
        fullName: formData.fullName.trim(),
        email,
        country: formData.country.trim(),
        institution: formData.institution.trim(),
      })

      return {
        success: true,
        message: 'Your registration has been received. Check your email for confirmation.',
      }
    }

    // Resolved from the request so local, preview and production each return
    // to their own success page
    const baseUrl = await getBaseUrl()

    try {
      const { authorizationUrl } = await initializeTransaction({
        email,
        amount: fee,
        currency,
        reference,
        callbackUrl: `${baseUrl}/programs/lit/payment-success?ref=${encodeURIComponent(reference)}`,
        metadata: {
          programme: 'LIT',
          registrationId: created._id,
          fullName: formData.fullName.trim(),
          country: formData.country.trim(),
        },
      })

      return {
        success: true,
        message: 'Redirecting you to complete payment...',
        paymentUrl: authorizationUrl,
      }
    } catch (paymentError) {
      console.error('Failed to initialise LIT payment:', paymentError)
      return {
        success: false,
        message:
          'Your details were saved, but we could not start the payment. Please try again, or contact us if the problem persists.',
      }
    }
  } catch (error) {
    console.error('Error submitting LIT registration:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    }
  }
}
