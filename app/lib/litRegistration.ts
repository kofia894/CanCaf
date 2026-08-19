import { Resend } from 'resend'
import { writeClient } from '@/app/lib/sanity'
import { verifyTransaction } from '@/app/lib/paystack'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Shared LIT registration confirmation logic.
 *
 * Both the Paystack webhook and the post-checkout return page call
 * confirmLitRegistrationPayment(), so a registration is confirmed even if one
 * of the two never lands. It is idempotent: the patch is a no-op once paid and
 * emails are gated on a `confirmationEmailSent` flag.
 */

export interface LitRegistrationDocument {
  _id: string
  fullName: string
  email: string
  profession?: string
  professionOther?: string
  country?: string
  institution?: string
  currentRole?: string
  paymentStatus?: string
  confirmationEmailSent?: boolean
  amountPaid?: number
  currency?: string
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Send the team notification and the participant confirmation.
 * Best-effort — a delivery failure must never lose a registration.
 */
export async function sendLitRegistrationEmails(doc: LitRegistrationDocument): Promise<void> {
  if (!process.env.RESEND_API_KEY) return

  const name = doc.fullName || 'Participant'
  const paidLine =
    doc.amountPaid && doc.amountPaid > 0
      ? `<p style="color: #52525b; line-height: 1.6;">We've received your payment of <strong>${escapeHtml(doc.currency || 'GHS')} ${doc.amountPaid.toFixed(2)}</strong>.</p>`
      : ''

  try {
    await resend.emails.send({
      from: 'CanCAF Website <onboarding@resend.dev>',
      to: 'info@cancaf.org',
      replyTo: doc.email,
      subject: `LIT Registration confirmed: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background-color: #0F766E; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">LIT Registration Confirmed</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Lead &middot; Influence &middot; Transform</p>
          </div>
          <div style="padding: 28px; background-color: #f9fafb;">
            <p style="color: #18181b; font-size: 16px; margin-top: 0;">
              <strong>${escapeHtml(name)}</strong> has completed registration.
            </p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #71717a; width: 200px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #18181b;">${escapeHtml(doc.email)}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Country</td><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #18181b;">${escapeHtml(doc.country || '—')}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Institution</td><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #18181b;">${escapeHtml(doc.institution || '—')}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Payment</td><td style="padding: 10px 0; border-bottom: 1px solid #e4e4e7; color: #18181b;">${doc.amountPaid && doc.amountPaid > 0 ? `${escapeHtml(doc.currency || 'GHS')} ${doc.amountPaid.toFixed(2)}` : 'Free registration'}</td></tr>
            </table>
            <p style="color: #71717a; font-size: 13px; margin-top: 20px;">
              Full submission details are in the Sanity Studio under LIT Registration.
            </p>
          </div>
          <div style="background-color: #18181b; padding: 16px; text-align: center;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">Submitted via the CanCAF website.</p>
          </div>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'CanCAF <onboarding@resend.dev>',
      to: doc.email,
      subject: 'Your LIT registration is confirmed — CanCAF',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0F766E; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">CanCAF</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Lead &middot; Influence &middot; Transform</p>
          </div>
          <div style="padding: 32px; background-color: #f9fafb;">
            <h2 style="color: #18181b; margin-top: 0;">Hello ${escapeHtml(name)},</h2>
            <p style="color: #52525b; line-height: 1.6;">
              Your registration for <strong>LIT — the Leadership Development Series for Nurses &amp; Midwives</strong> is confirmed.
            </p>
            ${paidLine}
            <p style="color: #52525b; line-height: 1.6;">
              We'll be in touch by email with session details and joining instructions. Please keep an eye on your inbox.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://cancaf.org/programs/lit"
                 style="background-color: #0F766E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 500; display: inline-block;">
                View Programme
              </a>
            </div>
            <p style="color: #71717a; font-size: 14px; margin-top: 32px;">
              Warm regards,<br/>The CanCAF Team
            </p>
          </div>
          <div style="background-color: #18181b; padding: 16px; text-align: center;">
            <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
              Cancer Care Africa Foundation (CanCAF)<br/>Strengthening Cancer Care
            </p>
          </div>
        </div>
      `,
    })

    await writeClient.patch(doc._id).set({ confirmationEmailSent: true }).commit()
  } catch (error) {
    console.error('LIT confirmation email delivery failed:', error)
  }
}

export type ConfirmResult =
  | { status: 'confirmed'; registration: LitRegistrationDocument }
  | { status: 'already_confirmed'; registration: LitRegistrationDocument }
  | { status: 'not_successful'; paystackStatus: string }
  | { status: 'not_found' }
  | { status: 'error'; message: string }

const REGISTRATION_PROJECTION = `{
  _id, fullName, email, profession, professionOther, country, institution,
  currentRole, paymentStatus, confirmationEmailSent, amountPaid, currency
}`

/**
 * Verify a Paystack reference and mark the matching LIT registration as paid.
 * Safe to call repeatedly — used by both the webhook and the return page.
 */
export async function confirmLitRegistrationPayment(reference: string): Promise<ConfirmResult> {
  try {
    const registration = await writeClient.fetch<LitRegistrationDocument | null>(
      `*[_type == "litRegistration" && paymentReference == $reference][0]${REGISTRATION_PROJECTION}`,
      { reference }
    )

    if (!registration) {
      return { status: 'not_found' }
    }

    // Already settled — just make sure the emails went out
    if (registration.paymentStatus === 'paid') {
      if (!registration.confirmationEmailSent) {
        await sendLitRegistrationEmails(registration)
      }
      return { status: 'already_confirmed', registration }
    }

    const verification = await verifyTransaction(reference)

    if (!verification.isSuccessful) {
      if (verification.status === 'failed' || verification.status === 'abandoned') {
        await writeClient.patch(registration._id).set({ paymentStatus: 'failed' }).commit()
      }
      return { status: 'not_successful', paystackStatus: verification.status }
    }

    const updated: LitRegistrationDocument = {
      ...registration,
      paymentStatus: 'paid',
      amountPaid: verification.amount,
      currency: verification.currency,
    }

    await writeClient
      .patch(registration._id)
      .set({
        paymentStatus: 'paid',
        transactionId: verification.transactionId,
        paymentMethod: verification.channel,
        amountPaid: verification.amount,
        currency: verification.currency,
        paidAt: verification.paidAt || new Date().toISOString(),
        paystackResponse: JSON.stringify(verification.raw),
      })
      .commit()

    if (!registration.confirmationEmailSent) {
      await sendLitRegistrationEmails(updated)
    }

    return { status: 'confirmed', registration: updated }
  } catch (error) {
    console.error('LIT payment confirmation error:', error)
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Confirmation failed',
    }
  }
}
