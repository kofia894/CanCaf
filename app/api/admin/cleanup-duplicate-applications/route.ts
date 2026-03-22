import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/app/lib/sanity'

// One-time cleanup script for duplicate applications
// Run this once by visiting: /api/admin/cleanup-duplicate-applications?secret=YOUR_SECRET
// After running, you can delete this file

interface Application {
  _id: string
  email: string
  status: string
  paymentStatus: string
  fullName?: string
  submittedAt?: string
  _createdAt: string
}

export async function GET(request: NextRequest) {
  try {
    // Security: require a secret to run this
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const dryRun = searchParams.get('dryRun') !== 'false' // Default to dry run

    // Use CRON_SECRET or a custom secret
    const expectedSecret = process.env.CRON_SECRET || process.env.CLEANUP_SECRET

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized. Add ?secret=YOUR_SECRET' }, { status: 401 })
    }

    // Fetch all applications
    const allApplications: Application[] = await client.fetch(
      `*[_type == "application"] | order(email asc, _createdAt asc) {
        _id,
        email,
        status,
        paymentStatus,
        fullName,
        submittedAt,
        _createdAt
      }`
    )

    // Group by email (lowercase)
    const byEmail: Record<string, Application[]> = {}
    for (const app of allApplications) {
      const email = (app.email || '').toLowerCase()
      if (!email) continue
      if (!byEmail[email]) byEmail[email] = []
      byEmail[email].push(app)
    }

    // Find duplicates and decide which to keep
    const duplicates: { email: string; keep: Application; delete: Application[] }[] = []

    for (const [email, apps] of Object.entries(byEmail)) {
      if (apps.length <= 1) continue

      // Sort by priority: paid > submitted > draft, then by creation date (oldest first)
      const sorted = apps.sort((a, b) => {
        // Priority 1: Payment status (paid > pending > failed > unpaid)
        const paymentPriority: Record<string, number> = { paid: 0, pending: 1, failed: 2, unpaid: 3 }
        const aPay = paymentPriority[a.paymentStatus] ?? 4
        const bPay = paymentPriority[b.paymentStatus] ?? 4
        if (aPay !== bPay) return aPay - bPay

        // Priority 2: Status (submitted_paid > submitted_unpaid > draft)
        const statusPriority: Record<string, number> = { submitted_paid: 0, submitted_unpaid: 1, pending: 2, reviewing: 2, accepted: 0, rejected: 2, waitlisted: 2, draft: 3 }
        const aStat = statusPriority[a.status] ?? 4
        const bStat = statusPriority[b.status] ?? 4
        if (aStat !== bStat) return aStat - bStat

        // Priority 3: Has submittedAt
        if (a.submittedAt && !b.submittedAt) return -1
        if (!a.submittedAt && b.submittedAt) return 1

        // Priority 4: Creation date (oldest first to keep original)
        return new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
      })

      const keep = sorted[0]
      const toDelete = sorted.slice(1)

      duplicates.push({ email, keep, delete: toDelete })
    }

    if (duplicates.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No duplicates found!',
        totalApplications: allApplications.length,
      })
    }

    // Perform cleanup (or just report if dry run)
    const results = {
      totalApplications: allApplications.length,
      emailsWithDuplicates: duplicates.length,
      applicationsToDelete: duplicates.reduce((sum, d) => sum + d.delete.length, 0),
      deleted: 0,
      errors: [] as string[],
      details: duplicates.map(d => ({
        email: d.email,
        keeping: { id: d.keep._id, status: d.keep.status, paymentStatus: d.keep.paymentStatus, fullName: d.keep.fullName },
        deleting: d.delete.map(app => ({ id: app._id, status: app.status, paymentStatus: app.paymentStatus })),
      })),
    }

    if (!dryRun) {
      // Actually delete the duplicates
      for (const dup of duplicates) {
        for (const app of dup.delete) {
          try {
            // First, delete any applicationRegistration records linked to this application
            const linkedRegistrations = await client.fetch(
              `*[_type == "applicationRegistration" && application._ref == $appId]{ _id }`,
              { appId: app._id }
            )

            for (const reg of linkedRegistrations) {
              await writeClient.delete(reg._id)
            }

            // Then delete the application
            await writeClient.delete(app._id)
            results.deleted++
          } catch (error) {
            results.errors.push(`Failed to delete ${app._id}: ${error instanceof Error ? error.message : 'Unknown error'}`)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      dryRun,
      message: dryRun
        ? `DRY RUN: Would delete ${results.applicationsToDelete} duplicate applications. Add ?dryRun=false to actually delete.`
        : `Deleted ${results.deleted} duplicate applications.`,
      ...results,
    })
  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json(
      { error: 'Cleanup failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
