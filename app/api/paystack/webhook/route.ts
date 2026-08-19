import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/app/lib/paystack'
import { confirmLitRegistrationPayment } from '@/app/lib/litRegistration'
import { confirmDonationPayment } from '@/app/lib/donation'

/**
 * Paystack webhook — the authoritative confirmation for LIT registrations
 * and donations.
 *
 * The browser redirect after checkout is a convenience; this is what marks a
 * payment as paid, so it still lands if the user closes the tab.
 *
 * Configure the URL in the Paystack dashboard under
 * Settings -> API Keys & Webhooks (set it for both test and live mode):
 *   https://cancaf.org/api/paystack/webhook
 */

interface PaystackWebhookEvent {
  event: string
  data: {
    reference: string
    status: string
  }
}

/** Route a reference to its document type using the prefix set at initialise time. */
function documentTypeFor(reference: string): 'litRegistration' | 'donation' | null {
  if (reference.startsWith('LIT-')) return 'litRegistration'
  if (reference.startsWith('DON-')) return 'donation'
  return null
}

export async function POST(request: NextRequest) {
  try {
    // Signature must be checked against the raw body, before any parsing
    const rawBody = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    if (!verifyWebhookSignature(rawBody, signature)) {
      console.warn('Paystack webhook rejected: invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(rawBody) as PaystackWebhookEvent

    // Only successful charges change state; ignore the rest
    if (event.event !== 'charge.success') {
      return NextResponse.json({ received: true })
    }

    const reference = event.data?.reference

    if (!reference) {
      return NextResponse.json({ received: true })
    }

    const documentType = documentTypeFor(reference)

    if (!documentType) {
      console.warn(`Paystack webhook: unrecognised reference prefix "${reference}"`)
      return NextResponse.json({ received: true })
    }

    // LIT shares its confirmation path with the post-checkout return page,
    // so the registration is confirmed and emailed exactly once either way
    if (documentType === 'litRegistration') {
      const result = await confirmLitRegistrationPayment(reference)
      console.log(`Paystack webhook: LIT ${reference} -> ${result.status}`)
      return NextResponse.json({ received: true })
    }

    // Donations share their confirmation path with the /donate/success page,
    // for the same reason LIT does — either route reconciles the record
    const result = await confirmDonationPayment(reference)
    console.log(`Paystack webhook: donation ${reference} -> ${result.status}`)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paystack webhook error:', error)
    // 200 so Paystack does not retry a payload we cannot process
    return NextResponse.json({ received: true, error: 'Processing error' })
  }
}
