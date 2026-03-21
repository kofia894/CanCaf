import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/app/lib/sanity'

interface PaymentRequest {
  applicationId: string
  email: string
  phone: string
  fullName: string
  paymentMethod: 'momo' | 'card'
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()
    const { applicationId, email, phone, fullName, paymentMethod } = body

    // Validate required fields
    if (!applicationId || !email || !phone || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate payment method
    if (paymentMethod !== 'momo' && paymentMethod !== 'card') {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    // Verify application exists and is submitted
    const application = await client.fetch(
      `*[_type == "application" && _id == $applicationId][0]{ _id, status, paymentStatus }`,
      { applicationId }
    )

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // If already paid, return success
    if (application.paymentStatus === 'paid') {
      return NextResponse.json({
        success: true,
        alreadyPaid: true,
        message: 'Application is already paid',
      })
    }

    // Generate unique client reference
    const clientReference = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    // Get base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cancaf.org'

    // Hubtel API credentials
    const hubtelClientId = process.env.HUBTEL_CLIENT_ID
    const hubtelClientSecret = process.env.HUBTEL_CLIENT_SECRET
    const hubtelMerchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER

    if (!hubtelClientId || !hubtelClientSecret || !hubtelMerchantAccountNumber) {
      console.error('Missing Hubtel credentials')
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    // Create Basic Auth header
    const authString = Buffer.from(`${hubtelClientId}:${hubtelClientSecret}`).toString('base64')

    // Set amount based on payment method
    // Mobile Money: GHS 100 (local currency)
    // Card: $10 USD (approximately GHS 160 at current rates, but we charge GHS 100 equivalent)
    const amount = paymentMethod === 'momo' ? 100 : 100  // Both are GHS 100 for now (Hubtel handles card in local currency)

    // Prepare description
    const description = `CGCP-ON Africa Application Fee - ${fullName || email} (${paymentMethod === 'momo' ? 'Mobile Money' : 'Card'})`

    // Prepare Hubtel request payload
    // Note: URLs include /en locale prefix for proper routing
    const hubtelPayload = {
      totalAmount: amount,
      description,
      callbackUrl: `${baseUrl}/api/application/payment/callback`,
      returnUrl: `${baseUrl}/en/programs/cgcp-on-africa/payment-success?ref=${clientReference}&appId=${applicationId}&email=${encodeURIComponent(email)}`,
      merchantAccountNumber: hubtelMerchantAccountNumber,
      cancellationUrl: `${baseUrl}/en/programs/cgcp-on-africa/payment-cancelled?ref=${clientReference}&appId=${applicationId}&email=${encodeURIComponent(email)}`,
      clientReference,
      payeeName: fullName || email.split('@')[0],
      payeeMobileNumber: phone || undefined,
      payeeEmail: email,
    }

    // Call Hubtel API
    const hubtelResponse = await fetch('https://payproxyapi.hubtel.com/items/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(hubtelPayload),
    })

    const hubtelData = await hubtelResponse.json()

    if (hubtelData.responseCode !== '0000' || hubtelData.status !== 'Success') {
      console.error('Hubtel API error:', hubtelData)
      return NextResponse.json(
        { error: 'Failed to initiate payment', details: hubtelData },
        { status: 500 }
      )
    }

    // Update application with payment info
    try {
      await writeClient
        .patch(applicationId)
        .set({
          paymentStatus: 'pending',
          paymentClientReference: clientReference,
          paymentCheckoutId: hubtelData.data.checkoutId,
          paymentAmount: amount,
          paymentMethod: paymentMethod === 'momo' ? 'Mobile Money' : 'Bank Card',
        })
        .commit()
    } catch (sanityError) {
      console.error('Failed to update application with payment info:', sanityError)
      // Continue anyway - payment was initiated successfully
    }

    // Create applicationRegistration record with pending status
    try {
      // Check if registration already exists for this application
      const existingRegistration = await client.fetch(
        `*[_type == "applicationRegistration" && application._ref == $appId][0]{ _id }`,
        { appId: applicationId }
      )

      const paymentMethodLabel = paymentMethod === 'momo' ? 'Mobile Money' : 'Bank Card'

      if (existingRegistration) {
        // Update existing registration with new payment attempt
        await writeClient
          .patch(existingRegistration._id)
          .set({
            paymentStatus: 'pending',
            clientReference,
            checkoutId: hubtelData.data.checkoutId,
            amount,
            selectedPaymentMethod: paymentMethodLabel,
          })
          .commit()
      } else {
        // Create new registration linked to application
        await writeClient.create({
          _type: 'applicationRegistration',
          email: email.toLowerCase(),
          phone,
          paymentStatus: 'pending',
          clientReference,
          checkoutId: hubtelData.data.checkoutId,
          amount,
          selectedPaymentMethod: paymentMethodLabel,
          application: { _type: 'reference', _ref: applicationId },
          createdAt: new Date().toISOString(),
        })
      }
    } catch (regError) {
      console.error('Failed to create/update applicationRegistration:', regError)
      // Continue anyway - this is not critical for payment flow
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: hubtelData.data.checkoutUrl,
      checkoutId: hubtelData.data.checkoutId,
      clientReference: hubtelData.data.clientReference,
      checkoutDirectUrl: hubtelData.data.checkoutDirectUrl,
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
