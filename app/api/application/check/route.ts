import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/app/lib/sanity'

// Full application query for loading saved data
const FULL_APPLICATION_QUERY = `*[_type == "application" && email == $email][0]{
  _id,
  status,
  paymentStatus,
  currentStep,
  lastSavedAt,
  submittedAt,
  fullName,
  gender,
  dateOfBirth,
  nationality,
  countryOfResidence,
  currentInstitution,
  department,
  currentPosition,
  yearsOncologyExperience,
  professionalRegistrationNumber,
  email,
  phone,
  nursingQualification,
  nursingQualificationOther,
  qualificationInstitution,
  yearCompleted,
  oncologyTraining,
  areasOfPractice,
  areaOfPracticeOther,
  priorGeneticsTraining,
  geneticsTrainingDetails,
  interestReason,
  benefitDescription,
  counselingExperience,
  institutionName,
  supervisorName,
  supervisorPosition,
  supervisorContact,
  canParticipateVirtually,
  hasReliableInternet,
  declarationAgreed,
  applicantSignatureName,
  signatureDate,
  paymentClientReference,
  paidAt
}`

// Simpler query for payment status checks
const PAYMENT_STATUS_QUERY = `*[_type == "application" && email == $email][0]{
  _id,
  fullName,
  email,
  status,
  paymentStatus,
  paymentClientReference,
  paidAt
}`

const PAYMENT_STATUS_BY_ID_QUERY = `*[_type == "application" && _id == $appId][0]{
  _id,
  fullName,
  email,
  status,
  paymentStatus,
  paymentClientReference,
  paidAt
}`

// GET endpoint for quick payment status checks (used by success/cancelled pages)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const appId = searchParams.get('appId')

    if (!email && !appId) {
      return NextResponse.json(
        { error: 'Email or appId is required' },
        { status: 400 }
      )
    }

    let application

    if (appId) {
      application = await client.fetch(PAYMENT_STATUS_BY_ID_QUERY, { appId })
    } else if (email) {
      const normalizedEmail = email.toLowerCase()
      application = await client.fetch(PAYMENT_STATUS_QUERY, { email: normalizedEmail })
    }

    if (application) {
      return NextResponse.json({
        exists: true,
        paid: application.paymentStatus === 'paid',
        fullName: application.fullName,
        email: application.email,
        status: application.status,
        clientReference: application.paymentClientReference,
        paidAt: application.paidAt,
      })
    }

    return NextResponse.json({
      exists: false,
      paid: false,
    })
  } catch (error) {
    console.error('Application check error:', error)
    return NextResponse.json(
      { error: 'Failed to check application' },
      { status: 500 }
    )
  }
}

// POST endpoint for loading full application data (used by form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase()

    // Check if application exists for this email
    const application = await client.fetch(FULL_APPLICATION_QUERY, { email: normalizedEmail })

    if (application) {
      return NextResponse.json({
        exists: true,
        application,
      })
    }

    return NextResponse.json({
      exists: false,
      application: null,
    })
  } catch (error) {
    console.error('Application check error:', error)
    return NextResponse.json(
      { error: 'Failed to check application' },
      { status: 500 }
    )
  }
}
