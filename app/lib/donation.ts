import { writeClient } from '@/app/lib/sanity'
import { verifyTransaction } from '@/app/lib/paystack'

/**
 * Shared donation confirmation logic.
 *
 * Mirrors confirmLitRegistrationPayment: both the Paystack webhook and the
 * post-checkout success page call this, so a donation is reconciled even when
 * one path never lands (no webhook configured, webhook delivery failure, or a
 * user who closed the tab). Idempotent — re-running on a settled donation is a
 * no-op.
 */

export interface DonationDocument {
  _id: string
  status?: string
  amount?: number
  currency?: string
  donorFirstName?: string
  donorLastName?: string
  donorEmail?: string
}

export type ConfirmDonationResult =
  | { status: 'confirmed'; donation: DonationDocument }
  | { status: 'already_confirmed'; donation: DonationDocument }
  | { status: 'not_successful'; paystackStatus: string }
  | { status: 'not_found' }
  | { status: 'error'; message: string }

const DONATION_PROJECTION = `{
  _id, status, amount, currency, donorFirstName, donorLastName, donorEmail
}`

export async function confirmDonationPayment(reference: string): Promise<ConfirmDonationResult> {
  try {
    // Older Hubtel donations only have clientReference, so match either field
    const donation = await writeClient.fetch<DonationDocument | null>(
      `*[_type == "donation" && (paymentReference == $reference || clientReference == $reference)][0]${DONATION_PROJECTION}`,
      { reference }
    )

    if (!donation) {
      return { status: 'not_found' }
    }

    if (donation.status === 'successful') {
      return { status: 'already_confirmed', donation }
    }

    const verification = await verifyTransaction(reference)

    if (!verification.isSuccessful) {
      if (verification.status === 'failed' || verification.status === 'abandoned') {
        await writeClient.patch(donation._id).set({ status: 'failed' }).commit()
      }
      return { status: 'not_successful', paystackStatus: verification.status }
    }

    await writeClient
      .patch(donation._id)
      .set({
        status: 'successful',
        transactionId: verification.transactionId,
        paymentMethod: verification.channel,
        currency: verification.currency,
        paidAt: verification.paidAt || new Date().toISOString(),
        paystackResponse: JSON.stringify(verification.raw),
      })
      .commit()

    return {
      status: 'confirmed',
      donation: { ...donation, status: 'successful', currency: verification.currency },
    }
  } catch (error) {
    console.error('Donation confirmation error:', error)
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Confirmation failed',
    }
  }
}
