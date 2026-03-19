import { NextRequest, NextResponse } from 'next/server'
import { client, writeClient } from '@/app/lib/sanity'

interface HubtelCallback {
  ResponseCode: string
  Status: string
  Data: {
    CheckoutId: string
    SalesInvoiceId: string
    ClientReference: string
    Status: string
    Amount: number
    CustomerPhoneNumber: string
    PaymentDetails: {
      MobileMoneyNumber?: string
      PaymentType: string
      Channel: string
    }
    Description: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: HubtelCallback = await request.json()

    // ============ HUBTEL UAT: CALLBACK SAMPLE ============
    console.log('========================================')
    console.log('HUBTEL CALLBACK RECEIVED')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Raw Callback Data:')
    console.log(JSON.stringify(body, null, 2))
    console.log('========================================')

    const { ResponseCode, Status, Data } = body

    // Find the donation record in Sanity by clientReference
    const donationQuery = `*[_type == "donation" && clientReference == $ref][0]._id`
    const donationId = await writeClient.fetch(donationQuery, { ref: Data.ClientReference })

    if (ResponseCode === '0000' && Status === 'Success' && Data.Status === 'Success') {
      // Payment successful
      console.log(`Payment successful for reference: ${Data.ClientReference}`)
      console.log(`Amount: GHS ${Data.Amount}`)
      console.log(`Payment method: ${Data.PaymentDetails.PaymentType}`)

      // Update donation in Sanity
      if (donationId) {
        try {
          await writeClient.patch(donationId).set({
            status: 'successful',
            transactionId: Data.SalesInvoiceId,
            paymentMethod: Data.PaymentDetails.PaymentType,
            paidAt: new Date().toISOString(),
            hubtelResponse: JSON.stringify(body),
          }).commit()
          console.log(`Donation ${Data.ClientReference} marked as successful in Sanity`)
        } catch (sanityError) {
          console.error('Failed to update donation in Sanity:', sanityError)
        }
      } else {
        console.warn(`Donation record not found for reference: ${Data.ClientReference}`)
      }

    } else {
      // Payment failed or pending
      console.log(`Payment not successful for reference: ${Data.ClientReference}`)
      console.log(`Status: ${Data.Status}`)

      // Update donation status in Sanity
      if (donationId) {
        try {
          await writeClient.patch(donationId).set({
            status: 'failed',
            hubtelResponse: JSON.stringify(body),
          }).commit()
          console.log(`Donation ${Data.ClientReference} marked as failed in Sanity`)
        } catch (sanityError) {
          console.error('Failed to update donation in Sanity:', sanityError)
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Callback processing error:', error)
    // Still return 200 to prevent Hubtel from retrying
    return NextResponse.json({ received: true, error: 'Processing error' })
  }
}

// Transaction status check endpoint (using public RMSC API - no IP whitelisting required)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const clientReference = searchParams.get('ref')

  if (!clientReference) {
    return NextResponse.json(
      { error: 'Missing reference' },
      { status: 400 }
    )
  }

  // Check transaction status with Hubtel public API
  const hubtelClientId = process.env.HUBTEL_CLIENT_ID
  const hubtelClientSecret = process.env.HUBTEL_CLIENT_SECRET
  const hubtelMerchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER

  if (!hubtelClientId || !hubtelClientSecret || !hubtelMerchantAccountNumber) {
    return NextResponse.json(
      { error: 'Payment service not configured' },
      { status: 500 }
    )
  }

  const authString = Buffer.from(`${hubtelClientId}:${hubtelClientSecret}`).toString('base64')
  // Public RMSC API - no IP whitelisting required
  const statusUrl = `https://rmsc.hubtel.com/v1/merchantaccount/merchants/${hubtelMerchantAccountNumber}/transactions/status?clientReference=${clientReference}`

  try {
    const statusResponse = await fetch(
      statusUrl,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authString}`,
        },
      }
    )

    // Check if response is OK before parsing
    if (!statusResponse.ok) {
      const errorText = await statusResponse.text()
      console.error('Hubtel API Error:', errorText)
      return NextResponse.json({
        success: false,
        error: `Hubtel API returned ${statusResponse.status}`,
      })
    }

    const statusData = await statusResponse.json()

    // Store status check response in Sanity
    const donationQuery = `*[_type == "donation" && clientReference == $ref][0]._id`
    const donationId = await client.fetch(donationQuery, { ref: clientReference })

    if (donationId) {
      try {
        await writeClient.patch(donationId).set({
          hubtelStatusCheckResponse: JSON.stringify(statusData),
        }).commit()
      } catch (sanityError) {
        console.error('Failed to store status check response in Sanity:', sanityError)
      }
    }

    // RMSC API returns different response structure
    // Check if transaction is successful based on the response
    const transactionStatus = statusData.transactionStatus || statusData.status
    const isPaid = transactionStatus === 'Success' || transactionStatus === 'Paid'

    if (isPaid && donationId) {
      const donation = await client.fetch(
        `*[_type == "donation" && _id == $id][0]{ status }`,
        { id: donationId }
      )

      if (donation?.status !== 'successful') {
        try {
          await writeClient.patch(donationId).set({
            status: 'successful',
            transactionId: statusData.transactionId || statusData.hubtelTransactionId,
            paidAt: new Date().toISOString(),
          }).commit()
        } catch (updateError) {
          console.error('Failed to update donation status:', updateError)
        }
      }
    }

    return NextResponse.json({
      success: isPaid,
      status: transactionStatus,
      amount: statusData.amount,
      transactionId: statusData.transactionId || statusData.hubtelTransactionId,
      rawResponse: statusData,
    })

  } catch (error) {
    console.error('Donation status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    )
  }
}
