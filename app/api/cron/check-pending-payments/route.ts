import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/app/lib/sanity'

// This cron job checks pending application payments and updates their status
// Runs every 5 minutes via Vercel cron

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find applications with pending payment status that are older than 2 minutes
    // This gives time for normal callback flow to complete
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString()

    const pendingApplications = await client.fetch(
      `*[_type == "application" && paymentStatus == "pending" && defined(paymentClientReference) && defined(paymentCheckoutId)]{
        _id,
        email,
        phone,
        paymentClientReference,
        paymentCheckoutId,
        paymentAmount,
        paymentMethod,
        _updatedAt
      }[0...50]`
    )

    if (!pendingApplications || pendingApplications.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pending payments to check',
        checked: 0
      })
    }

    // Filter to only process payments older than 2 minutes
    const paymentsToCheck = pendingApplications.filter(
      (app: { _updatedAt: string }) => new Date(app._updatedAt) < new Date(twoMinutesAgo)
    )

    if (paymentsToCheck.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All pending payments are recent, waiting for callbacks',
        checked: 0
      })
    }

    // Hubtel credentials
    const hubtelClientId = process.env.HUBTEL_CLIENT_ID
    const hubtelClientSecret = process.env.HUBTEL_CLIENT_SECRET
    const hubtelSalesId = process.env.HUBTEL_SALES_ID

    if (!hubtelClientId || !hubtelClientSecret || !hubtelSalesId) {
      console.error('Missing Hubtel credentials for cron job')
      return NextResponse.json({
        error: 'Payment service not configured'
      }, { status: 500 })
    }

    const authString = Buffer.from(`${hubtelClientId}:${hubtelClientSecret}`).toString('base64')

    const results = {
      checked: 0,
      updated: 0,
      paid: 0,
      failed: 0,
      stillPending: 0,
      errors: 0,
    }

    // Check each pending payment
    for (const application of paymentsToCheck) {
      results.checked++

      try {
        // Check status with Hubtel RMSC API
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

        if (!statusResponse.ok) {
          console.error(`Hubtel status check failed for ${application.paymentClientReference}: ${statusResponse.status}`)
          results.errors++
          continue
        }

        const statusData = await statusResponse.json()
        const transactionStatus = statusData.data?.transactionStatus || statusData.data?.status

        if (transactionStatus === 'Success' || transactionStatus === 'Paid') {
          // Payment successful - update application
          const paidAt = new Date().toISOString()
          const paymentMethod = statusData.data?.paymentMethod || 'Unknown'
          const transactionId = statusData.data?.transactionId || statusData.data?.salesInvoiceId

          await writeClient
            .patch(application._id)
            .set({
              paymentStatus: 'paid',
              status: 'submitted_paid',
              paymentTransactionId: transactionId,
              paidAt,
            })
            .commit()

          // Update applicationRegistration if exists
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

          results.paid++
          results.updated++
        } else if (transactionStatus === 'Failed' || transactionStatus === 'Cancelled' || transactionStatus === 'Expired') {
          // Payment failed - update application
          await writeClient
            .patch(application._id)
            .set({
              paymentStatus: 'failed',
            })
            .commit()

          // Update applicationRegistration if exists
          const existingRegistration = await client.fetch(
            `*[_type == "applicationRegistration" && clientReference == $ref][0]{ _id }`,
            { ref: application.paymentClientReference }
          )

          if (existingRegistration) {
            await writeClient
              .patch(existingRegistration._id)
              .set({
                paymentStatus: 'failed',
                hubtelStatusCheckResponse: JSON.stringify(statusData),
              })
              .commit()
          }

          results.failed++
          results.updated++
        } else {
          // Still pending or unknown status
          results.stillPending++
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200))
      } catch (error) {
        console.error(`Error checking payment for ${application.paymentClientReference}:`, error)
        results.errors++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Checked ${results.checked} pending payments`,
      results,
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { error: 'Cron job failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
