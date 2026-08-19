import { NextRequest, NextResponse } from 'next/server'
import { confirmDonationPayment } from '@/app/lib/donation'

/**
 * Donation reconciliation endpoint.
 *
 * Confirmation normally happens on the /donate/success return page or via
 * /api/paystack/webhook. This is the manual hatch for a specific reference —
 * useful for backfilling a donation whose webhook never arrived.
 *
 * The old Hubtel POST webhook that lived here is gone; donations now run on
 * Paystack. CGCP-ON registration and application payments are unaffected and
 * still use their own Hubtel callback routes.
 */
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('ref')

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 })
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 })
  }

  const result = await confirmDonationPayment(reference)

  if (result.status === 'error') {
    return NextResponse.json({ success: false, error: result.message }, { status: 500 })
  }

  if (result.status === 'not_found') {
    return NextResponse.json({ success: false, error: 'Donation not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: result.status === 'confirmed' || result.status === 'already_confirmed',
    status: result.status,
    ...(result.status === 'not_successful' ? { paystackStatus: result.paystackStatus } : {}),
  })
}
