import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/app/lib/sanity'
import { generateReference, initializeTransaction, DEFAULT_CURRENCY } from '@/app/lib/paystack'
import { getBaseUrl } from '@/app/lib/baseUrl'
import { isValidEmail, normalizeEmail } from '@/app/lib/email'
import { isValidPhone, PHONE_ERROR_MESSAGE } from '@/app/lib/phone'

/**
 * Start a donation payment via Paystack.
 *
 * Returns `checkoutUrl` to keep the existing DonateClient contract — it just
 * redirects the browser there. Confirmation happens in
 * /api/paystack/webhook, keyed on the `DON-` reference prefix.
 */

interface DonationRequest {
  amount: number
  donorInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: DonationRequest = await request.json()
    const { amount, donorInfo } = body

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    if (!donorInfo?.firstName || !donorInfo?.lastName || !donorInfo?.email) {
      return NextResponse.json(
        { error: 'Missing required donor information' },
        { status: 400 }
      )
    }

    // Paystack sends the receipt here, so a malformed address means the donor
    // silently never gets one
    if (!isValidEmail(donorInfo.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Phone is optional for donations, but reject a malformed one rather than
    // storing digits nobody can call back on
    if (donorInfo.phone?.trim() && !isValidPhone(donorInfo.phone)) {
      return NextResponse.json({ error: PHONE_ERROR_MESSAGE }, { status: 400 })
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      console.error('Missing PAYSTACK_SECRET_KEY')
      return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 })
    }

    const reference = generateReference('DON')
    // Resolved from the request so local, preview and production each return
    // to their own success page
    const baseUrl = await getBaseUrl()
    const donorEmail = normalizeEmail(donorInfo.email)
    const donorName = `${donorInfo.firstName} ${donorInfo.lastName}`.trim()
    const donationAmount = parseFloat(amount.toFixed(2))

    // Record the intent before leaving for Paystack so an abandoned payment
    // is still visible to the team
    let donationId: string | null = null

    try {
      const created = await writeClient.create({
        _type: 'donation',
        clientReference: reference,
        paymentReference: reference,
        amount: donationAmount,
        currency: DEFAULT_CURRENCY,
        status: 'pending',
        donorFirstName: donorInfo.firstName.trim(),
        donorLastName: donorInfo.lastName.trim(),
        donorEmail,
        donorPhone: donorInfo.phone?.trim() || '',
        message: donorInfo.message?.trim() || '',
      })
      donationId = created._id
    } catch (sanityError) {
      console.error('Failed to create donation in Sanity:', sanityError)
      // Continue — the webhook can still reconcile by reference
    }

    const { authorizationUrl } = await initializeTransaction({
      email: donorEmail,
      amount: donationAmount,
      currency: DEFAULT_CURRENCY,
      reference,
      callbackUrl: `${baseUrl}/donate/success?ref=${encodeURIComponent(reference)}`,
      metadata: {
        purpose: 'donation',
        donationId,
        donorName,
        donorPhone: donorInfo.phone || '',
        message: donorInfo.message || '',
      },
    })

    return NextResponse.json({
      success: true,
      checkoutUrl: authorizationUrl,
      clientReference: reference,
    })
  } catch (error) {
    console.error('Donation initiation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
