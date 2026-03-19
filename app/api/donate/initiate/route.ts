import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/app/lib/sanity'

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

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
      return NextResponse.json(
        { error: 'Missing required donor information' },
        { status: 400 }
      )
    }

    // Generate unique client reference
    const clientReference = `DON-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

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

    // Amount is already in GHS
    const amountInGHS = amount

    // Prepare description
    const donorName = `${donorInfo.firstName} ${donorInfo.lastName}`
    const description = `CanCAF Donation from ${donorName}`

    // Prepare Hubtel request payload
    const hubtelPayload = {
      totalAmount: parseFloat(amountInGHS.toFixed(2)),
      description,
      callbackUrl: `${baseUrl}/api/donate/callback`,
      returnUrl: `${baseUrl}/donate/success?ref=${clientReference}`,
      merchantAccountNumber: hubtelMerchantAccountNumber,
      cancellationUrl: `${baseUrl}/donate/cancelled?ref=${clientReference}`,
      clientReference,
      payeeName: `${donorInfo.firstName} ${donorInfo.lastName}`,
      payeeMobileNumber: donorInfo.phone || undefined,
      payeeEmail: donorInfo.email,
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

    // Store donation in Sanity with pending status
    try {
      await writeClient.create({
        _type: 'donation',
        clientReference,
        checkoutId: hubtelData.data.checkoutId,
        amount: amountInGHS,
        status: 'pending',
        donorFirstName: donorInfo.firstName,
        donorLastName: donorInfo.lastName,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone || '',
        message: donorInfo.message || '',
      })
      console.log(`Donation record created in Sanity: ${clientReference}`)
    } catch (sanityError) {
      console.error('Failed to create donation in Sanity:', sanityError)
      // Continue anyway - payment was initiated successfully
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: hubtelData.data.checkoutUrl,
      checkoutId: hubtelData.data.checkoutId,
      clientReference: hubtelData.data.clientReference,
      // For onsite checkout (iframe)
      checkoutDirectUrl: hubtelData.data.checkoutDirectUrl,
    })

  } catch (error) {
    console.error('Donation initiation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
