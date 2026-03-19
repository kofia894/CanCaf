import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/app/lib/sanity'

interface RegistrationRequest {
  email: string
  phone: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationRequest = await request.json()
    const { email, phone } = body

    // Validate required fields
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase()

    // Check if already registered and paid
    const existingRegistration = await client.fetch(
      `*[_type == "applicationRegistration" && email == $email][0]{
        _id,
        paymentStatus
      }`,
      { email: normalizedEmail }
    )

    if (existingRegistration?.paymentStatus === 'paid') {
      return NextResponse.json({
        alreadyPaid: true,
        message: 'You have already paid. You can proceed to the application form.',
      })
    }

    // Get registration fee from settings
    const settings = await client.fetch(
      `*[_type == "siteSettings"][0]{ cgcponRegistrationFee }`
    )
    const registrationFee = settings?.cgcponRegistrationFee || 50

    // Generate unique client reference
    const clientReference = `REG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

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

    // Prepare Hubtel request payload
    const hubtelPayload = {
      totalAmount: registrationFee,
      description: `CGCP-ON Africa Programme Registration`,
      callbackUrl: `${baseUrl}/api/registration/callback`,
      returnUrl: `${baseUrl}/programs/cgcp-on-africa/registration-success?email=${encodeURIComponent(normalizedEmail)}&ref=${clientReference}`,
      merchantAccountNumber: hubtelMerchantAccountNumber,
      cancellationUrl: `${baseUrl}/programs/cgcp-on-africa/registration-cancelled?email=${encodeURIComponent(normalizedEmail)}`,
      clientReference,
      payeeName: normalizedEmail,
      payeeMobileNumber: phone,
      payeeEmail: normalizedEmail,
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

    // ============ HUBTEL UAT: REGISTRATION INITIATE ============
    console.log('========================================')
    console.log('HUBTEL REGISTRATION INITIATE')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Email:', normalizedEmail)
    console.log('Response:')
    console.log(JSON.stringify(hubtelData, null, 2))
    console.log('========================================')

    if (hubtelData.responseCode !== '0000' || hubtelData.status !== 'Success') {
      console.error('Hubtel API error:', hubtelData)
      return NextResponse.json(
        { error: 'Failed to initiate payment', details: hubtelData },
        { status: 500 }
      )
    }

    // Create or update registration in Sanity
    try {
      if (existingRegistration) {
        // Update existing registration with new payment attempt
        await writeClient.patch(existingRegistration._id).set({
          phone,
          clientReference,
          checkoutId: hubtelData.data.checkoutId,
          amount: registrationFee,
          paymentStatus: 'pending',
        }).commit()
      } else {
        // Create new registration
        await writeClient.create({
          _type: 'applicationRegistration',
          email: normalizedEmail,
          phone,
          clientReference,
          checkoutId: hubtelData.data.checkoutId,
          amount: registrationFee,
          paymentStatus: 'pending',
          createdAt: new Date().toISOString(),
        })
      }
      console.log(`Registration record created/updated in Sanity: ${clientReference}`)
    } catch (sanityError) {
      console.error('Failed to create registration in Sanity:', sanityError)
      // Continue anyway - payment was initiated successfully
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: hubtelData.data.checkoutUrl,
      checkoutId: hubtelData.data.checkoutId,
      clientReference: hubtelData.data.clientReference,
      amount: registrationFee,
    })

  } catch (error) {
    console.error('Registration initiation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
