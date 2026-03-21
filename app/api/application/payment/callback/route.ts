import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/app/lib/sanity'

interface HubtelCallbackData {
  ResponseCode: string
  Status: string
  Data: {
    CheckoutId: string
    SalesInvoiceId: string
    ClientReference: string
    Status: string
    Amount: number
    CustomerPhoneNumber: string
    PaymentDetails?: {
      PaymentType?: string
      MobileNumber?: string
      Channel?: string
    }
    Description: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const callbackData: HubtelCallbackData = await request.json()

    const { Data } = callbackData
    if (!Data || !Data.ClientReference) {
      console.error('Invalid callback data - missing ClientReference')
      return NextResponse.json({ success: false, error: 'Invalid callback data' }, { status: 400 })
    }

    const clientReference = Data.ClientReference

    // Find application by payment reference
    const application = await client.fetch(
      `*[_type == "application" && paymentClientReference == $clientReference][0]{ _id, email, phone, fullName, paymentStatus, paymentAmount, paymentMethod }`,
      { clientReference }
    )

    if (!application) {
      console.error(`No application found for reference: ${clientReference}`)
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 })
    }

    // Find or prepare to create applicationRegistration
    const existingRegistration = await client.fetch(
      `*[_type == "applicationRegistration" && clientReference == $clientReference][0]{ _id }`,
      { clientReference }
    )

    // Check if payment was successful
    const isSuccessful = Data.Status === 'Success' || Data.Status === 'Paid'
    const paidAt = new Date().toISOString()
    const paymentMethod = Data.PaymentDetails?.PaymentType || Data.PaymentDetails?.Channel || 'Unknown'

    if (isSuccessful) {
      // Update application as paid
      await writeClient
        .patch(application._id)
        .set({
          paymentStatus: 'paid',
          status: 'submitted_paid',
          paymentTransactionId: Data.SalesInvoiceId,
          paymentMethod,
          paidAt,
        })
        .commit()

      // Create or update applicationRegistration record
      if (existingRegistration) {
        // Update existing registration
        await writeClient
          .patch(existingRegistration._id)
          .set({
            paymentStatus: 'paid',
            transactionId: Data.SalesInvoiceId,
            paymentMethod,
            paidAt,
            hubtelResponse: JSON.stringify(callbackData),
            application: { _type: 'reference', _ref: application._id },
          })
          .commit()
      } else {
        // Create new registration linked to application
        await writeClient.create({
          _type: 'applicationRegistration',
          email: application.email,
          phone: application.phone || Data.CustomerPhoneNumber,
          paymentStatus: 'paid',
          clientReference,
          checkoutId: Data.CheckoutId,
          amount: Data.Amount || application.paymentAmount || 100,
          transactionId: Data.SalesInvoiceId,
          paymentMethod,
          selectedPaymentMethod: application.paymentMethod, // Preserve the method selected before payment
          paidAt,
          hubtelResponse: JSON.stringify(callbackData),
          application: { _type: 'reference', _ref: application._id },
          createdAt: paidAt,
        })
      }

      return NextResponse.json({ success: true, status: 'paid' })
    } else {
      // Update payment status as failed
      await writeClient
        .patch(application._id)
        .set({
          paymentStatus: 'failed',
        })
        .commit()

      // Update or create registration with failed status
      if (existingRegistration) {
        await writeClient
          .patch(existingRegistration._id)
          .set({
            paymentStatus: 'failed',
            hubtelResponse: JSON.stringify(callbackData),
          })
          .commit()
      } else {
        await writeClient.create({
          _type: 'applicationRegistration',
          email: application.email,
          phone: application.phone || Data.CustomerPhoneNumber,
          paymentStatus: 'failed',
          clientReference,
          checkoutId: Data.CheckoutId,
          amount: Data.Amount || application.paymentAmount || 100,
          selectedPaymentMethod: application.paymentMethod, // Preserve the method selected before payment
          hubtelResponse: JSON.stringify(callbackData),
          application: { _type: 'reference', _ref: application._id },
          createdAt: new Date().toISOString(),
        })
      }

      return NextResponse.json({ success: true, status: 'failed' })
    }
  } catch (error) {
    console.error('Application payment callback error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// GET endpoint to check payment status with Hubtel
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ref = searchParams.get('ref')
  const appId = searchParams.get('appId')

  if (!ref && !appId) {
    return NextResponse.json({ error: 'Missing ref or appId parameter' }, { status: 400 })
  }

  try {
    // Find the application
    let application
    if (appId) {
      application = await client.fetch(
        `*[_type == "application" && _id == $appId][0]{ _id, paymentClientReference, paymentStatus, paymentCheckoutId }`,
        { appId }
      )
    } else if (ref) {
      application = await client.fetch(
        `*[_type == "application" && paymentClientReference == $ref][0]{ _id, paymentClientReference, paymentStatus, paymentCheckoutId }`,
        { ref }
      )
    }

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    // If already paid, return immediately
    if (application.paymentStatus === 'paid') {
      return NextResponse.json({ success: true, status: 'Paid', alreadyPaid: true })
    }

    // If no checkout ID, can't check status
    if (!application.paymentCheckoutId) {
      return NextResponse.json({ success: true, status: application.paymentStatus || 'unpaid' })
    }

    // Check status with Hubtel RMSC API
    const hubtelClientId = process.env.HUBTEL_CLIENT_ID
    const hubtelClientSecret = process.env.HUBTEL_CLIENT_SECRET
    const hubtelSalesId = process.env.HUBTEL_SALES_ID

    if (!hubtelClientId || !hubtelClientSecret || !hubtelSalesId) {
      console.error('Missing Hubtel credentials for status check')
      return NextResponse.json({ success: true, status: application.paymentStatus || 'pending' })
    }

    const authString = Buffer.from(`${hubtelClientId}:${hubtelClientSecret}`).toString('base64')

    const statusResponse = await fetch(
      `https://rmsc.hubtel.com/v1/merchantaccount/merchants/${hubtelSalesId}/transactions/status?clientReference=${encodeURIComponent(application.paymentClientReference)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Cache-Control': 'no-cache',
        },
      }
    )

    const statusData = await statusResponse.json()

    // Check if payment is complete
    if (statusData.data?.transactionStatus === 'Success' || statusData.data?.status === 'Paid') {
      const paidAt = new Date().toISOString()
      const paymentMethod = statusData.data?.paymentMethod || 'Unknown'
      const transactionId = statusData.data?.transactionId || statusData.data?.salesInvoiceId

      // Update application as paid
      await writeClient
        .patch(application._id)
        .set({
          paymentStatus: 'paid',
          status: 'submitted_paid',
          paymentTransactionId: transactionId,
          paymentMethod,
          paidAt,
        })
        .commit()

      // Also update or create applicationRegistration
      const existingRegistration = await client.fetch(
        `*[_type == "applicationRegistration" && clientReference == $ref][0]{ _id }`,
        { ref: application.paymentClientReference }
      )

      if (existingRegistration) {
        await writeClient
          .patch(existingRegistration._id)
          .set({
            paymentStatus: 'paid',
            transactionId,
            paymentMethod,
            paidAt,
            hubtelStatusCheckResponse: JSON.stringify(statusData),
          })
          .commit()
      }

      return NextResponse.json({ success: true, status: 'Paid' })
    }

    return NextResponse.json({
      success: true,
      status: statusData.data?.transactionStatus || application.paymentStatus || 'pending',
      data: statusData.data,
    })
  } catch (error) {
    console.error('Payment status check error:', error)
    return NextResponse.json({ error: 'Failed to check payment status' }, { status: 500 })
  }
}
