import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/app/lib/sanity'

interface ApplicationData {
  // Section A: Personal Information
  fullName?: string
  gender?: string
  dateOfBirth?: string
  nationality?: string
  countryOfResidence?: string
  currentInstitution?: string
  department?: string
  currentPosition?: string
  yearsOncologyExperience?: string
  professionalRegistrationNumber?: string
  email: string
  phone?: string

  // Section B: Professional Background
  nursingQualification?: string
  nursingQualificationOther?: string
  qualificationInstitution?: string
  yearCompleted?: string
  oncologyTraining?: string
  areasOfPractice?: string[]
  areaOfPracticeOther?: string
  priorGeneticsTraining?: boolean | null
  geneticsTrainingDetails?: string

  // Section C: Motivation and Interest
  interestReason?: string
  benefitDescription?: string
  counselingExperience?: string

  // Section D: Institutional Support
  institutionName?: string
  supervisorName?: string
  supervisorPosition?: string
  supervisorContact?: string

  // Section E: Availability
  canParticipateVirtually?: boolean | null
  hasReliableInternet?: boolean | null

  // Section G: Declaration
  declarationAgreed?: boolean
  applicantSignatureName?: string
  signatureDate?: string

  // Meta
  currentStep?: number
}

export async function POST(request: NextRequest) {
  try {
    // Check if write token is configured
    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error('SANITY_WRITE_TOKEN is not configured')
      return NextResponse.json(
        { error: 'Server configuration error: write token missing' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { applicationData, isSubmitting } = body as { applicationData: ApplicationData; isSubmitting?: boolean }

    // Validate email is present
    if (!applicationData.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const email = applicationData.email.toLowerCase()

    // Check if application already exists for this email
    const existingApplication = await client.fetch(
      `*[_type == "application" && email == $email][0]{ _id, status, paymentStatus }`,
      { email }
    )

    // Prepare the update data (without _type for patches)
    const updateData: Record<string, unknown> = {
      email,
      lastSavedAt: new Date().toISOString(),
      currentStep: applicationData.currentStep || 1,
    }

    // Add all other fields if they have values
    const fieldsToCopy = [
      'fullName', 'gender', 'dateOfBirth', 'nationality', 'countryOfResidence',
      'currentInstitution', 'department', 'currentPosition', 'yearsOncologyExperience',
      'professionalRegistrationNumber', 'phone', 'nursingQualification',
      'nursingQualificationOther', 'qualificationInstitution', 'yearCompleted',
      'oncologyTraining', 'areasOfPractice', 'areaOfPracticeOther', 'priorGeneticsTraining',
      'geneticsTrainingDetails', 'interestReason', 'benefitDescription', 'counselingExperience',
      'institutionName', 'supervisorName', 'supervisorPosition', 'supervisorContact',
      'canParticipateVirtually', 'hasReliableInternet', 'declarationAgreed',
      'applicantSignatureName', 'signatureDate'
    ]

    for (const field of fieldsToCopy) {
      const value = applicationData[field as keyof ApplicationData]
      if (value !== undefined && value !== null && value !== '') {
        updateData[field] = value
      }
    }

    // If submitting, update status
    if (isSubmitting) {
      updateData.submittedAt = new Date().toISOString()
      updateData.status = 'submitted_unpaid'
    }

    let result
    if (existingApplication) {
      // Update existing application (don't include _type in patch)
      result = await writeClient
        .patch(existingApplication._id)
        .set(updateData)
        .commit()
    } else {
      // Create new application (include _type for creation)
      const createData = {
        _type: 'application' as const,
        ...updateData,
        status: 'draft',
        paymentStatus: 'unpaid',
      }
      result = await writeClient.create(createData)
    }

    return NextResponse.json({
      success: true,
      applicationId: result._id,
      status: result.status,
      paymentStatus: result.paymentStatus || 'unpaid',
      isNew: !existingApplication,
    })
  } catch (error) {
    console.error('Application save error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'Failed to save application', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
