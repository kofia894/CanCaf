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

// Also handle GET for status check endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const clientReference = searchParams.get('ref')

  if (!clientReference) {
    return NextResponse.json(
      { error: 'Missing reference' },
      { status: 400 }
    )
  }

  // Check transaction status with Hubtel
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

  try {
    const statusResponse = await fetch(
      `https://api-txnstatus.hubtel.com/transactions/${hubtelMerchantAccountNumber}/status?clientReference=${clientReference}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authString}`,
        },
      }
    )

    const statusData = await statusResponse.json()

    // ============ HUBTEL: DONATION STATUS CHECK ============
    console.log('========================================')
    console.log('HUBTEL DONATION TRANSACTION STATUS CHECK')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Client Reference:', clientReference)
    console.log('Raw Status Response:')
    console.log(JSON.stringify(statusData, null, 2))
    console.log('========================================')

    // Store status check response in Sanity
    const donationQuery = `*[_type == "donation" && clientReference == $ref][0]._id`
    const donationId = await client.fetch(donationQuery, { ref: clientReference })

    if (donationId) {
      try {
        await writeClient.patch(donationId).set({
          hubtelStatusCheckResponse: JSON.stringify(statusData),
        }).commit()
        console.log(`Status check response stored for donation ${clientReference}`)
      } catch (sanityError) {
        console.error('Failed to store status check response in Sanity:', sanityError)
      }
    }

    if (statusData.responseCode === '0000') {
      // If status check shows paid but donation isn't marked successful, update it
      if (statusData.data?.status === 'Paid' && donationId) {
        const donation = await client.fetch(
          `*[_type == "donation" && _id == $id][0]{ status }`,
          { id: donationId }
        )

        if (donation?.status !== 'successful') {
          try {
            await writeClient.patch(donationId).set({
              status: 'successful',
              transactionId: statusData.data.transactionId,
              paidAt: new Date().toISOString(),
            }).commit()
            console.log(`Donation ${clientReference} marked as successful via status check`)
          } catch (updateError) {
            console.error('Failed to update donation status:', updateError)
          }
        }
      }

      return NextResponse.json({
        success: true,
        status: statusData.data.status,
        amount: statusData.data.amount,
        transactionId: statusData.data.transactionId,
      })
    }

    return NextResponse.json({
      success: false,
      message: statusData.message,
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    )
  }
}
