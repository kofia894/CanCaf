import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/app/lib/sanity'

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
