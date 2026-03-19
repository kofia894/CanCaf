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

    // ============ HUBTEL UAT: REGISTRATION CALLBACK ============
    console.log('========================================')
    console.log('HUBTEL REGISTRATION CALLBACK RECEIVED')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Raw Callback Data:')
    console.log(JSON.stringify(body, null, 2))
    console.log('========================================')

    const { ResponseCode, Status, Data } = body

    // Find the registration record in Sanity by clientReference
    const registrationQuery = `*[_type == "applicationRegistration" && clientReference == $ref][0]._id`
    const registrationId = await writeClient.fetch(registrationQuery, { ref: Data.ClientReference })

    if (ResponseCode === '0000' && Status === 'Success' && Data.Status === 'Success') {
      // Payment successful
      console.log(`Registration payment successful for reference: ${Data.ClientReference}`)
      console.log(`Amount: GHS ${Data.Amount}`)
      console.log(`Payment method: ${Data.PaymentDetails.PaymentType}`)

      // Update registration in Sanity
      if (registrationId) {
        try {
          await writeClient.patch(registrationId).set({
            paymentStatus: 'paid',
            transactionId: Data.SalesInvoiceId,
            paymentMethod: Data.PaymentDetails.PaymentType,
            paidAt: new Date().toISOString(),
            hubtelResponse: JSON.stringify(body),
          }).commit()
          console.log(`Registration ${Data.ClientReference} marked as paid in Sanity`)
        } catch (sanityError) {
          console.error('Failed to update registration in Sanity:', sanityError)
        }
      } else {
        console.warn(`Registration record not found for reference: ${Data.ClientReference}`)
      }

    } else {
      // Payment failed
      console.log(`Registration payment failed for reference: ${Data.ClientReference}`)
      console.log(`Status: ${Data.Status}`)

      // Update registration status in Sanity
      if (registrationId) {
        try {
          await writeClient.patch(registrationId).set({
            paymentStatus: 'failed',
            hubtelResponse: JSON.stringify(body),
          }).commit()
          console.log(`Registration ${Data.ClientReference} marked as failed in Sanity`)
        } catch (sanityError) {
          console.error('Failed to update registration in Sanity:', sanityError)
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Registration callback processing error:', error)
    // Still return 200 to prevent Hubtel from retrying
    return NextResponse.json({ received: true, error: 'Processing error' })
  }
}

// Transaction status check endpoint
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

    // ============ HUBTEL: REGISTRATION STATUS CHECK ============
    console.log('========================================')
    console.log('HUBTEL REGISTRATION TRANSACTION STATUS CHECK')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Client Reference:', clientReference)
    console.log('Raw Status Response:')
    console.log(JSON.stringify(statusData, null, 2))
    console.log('========================================')

    // Store status check response in Sanity
    const registrationQuery = `*[_type == "applicationRegistration" && clientReference == $ref][0]._id`
    const registrationId = await client.fetch(registrationQuery, { ref: clientReference })

    if (registrationId) {
      try {
        await writeClient.patch(registrationId).set({
          hubtelStatusCheckResponse: JSON.stringify(statusData),
        }).commit()
        console.log(`Status check response stored for registration ${clientReference}`)
      } catch (sanityError) {
        console.error('Failed to store status check response in Sanity:', sanityError)
      }
    }

    if (statusData.responseCode === '0000') {
      // If status check shows paid but registration isn't marked paid, update it
      if (statusData.data?.status === 'Paid' && registrationId) {
        const registration = await client.fetch(
          `*[_type == "applicationRegistration" && _id == $id][0]{ paymentStatus }`,
          { id: registrationId }
        )

        if (registration?.paymentStatus !== 'paid') {
          try {
            await writeClient.patch(registrationId).set({
              paymentStatus: 'paid',
              transactionId: statusData.data.transactionId,
              paidAt: new Date().toISOString(),
            }).commit()
            console.log(`Registration ${clientReference} marked as paid via status check`)
          } catch (updateError) {
            console.error('Failed to update registration status:', updateError)
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
    console.error('Registration status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    )
  }
}
