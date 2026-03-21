'use server'

import { client, writeClient } from '@/app/lib/sanity'

export interface ApplicationFormData {
  // Section A: Personal Information
  fullName: string
  gender: string
  dateOfBirth: string
  nationality: string
  countryOfResidence: string
  currentInstitution: string
  department: string
  currentPosition: string
  yearsOncologyExperience: string
  professionalRegistrationNumber: string
  email: string
  phone: string

  // Section B: Professional Background
  nursingQualification: string
  nursingQualificationOther: string
  qualificationInstitution: string
  yearCompleted: string
  oncologyTraining: string
  areasOfPractice: string[]
  areaOfPracticeOther: string
  priorGeneticsTraining: boolean | null
  geneticsTrainingDetails: string

  // Section C: Motivation and Interest
  interestReason: string
  benefitDescription: string
  counselingExperience: string

  // Section D: Institutional Support
  institutionName: string
  supervisorName: string
  supervisorPosition: string
  supervisorContact: string

  // Section E: Availability
  canParticipateVirtually: boolean | null
  hasReliableInternet: boolean | null

  // Section G: Declaration
  declarationAgreed: boolean
  applicantSignatureName: string
  signatureDate: string
}

export interface SubmitApplicationResult {
  success: boolean
  message: string
  applicationId?: string
}

export async function submitApplication(
  formData: ApplicationFormData,
  files?: {
    cvFile?: File | null
    statementOfInterestFile?: File | null
    professionalLicenseFile?: File | null
    institutionalSupportLetterFile?: File | null
    supportLetterFile?: File | null
  }
): Promise<SubmitApplicationResult> {
  try {
    const normalizedEmail = formData.email.toLowerCase()

    // Check for existing application with this email
    const existingApplication = await client.fetch(
      `*[_type == "application" && email == $email][0]{
        _id,
        status,
        paymentStatus
      }`,
      { email: normalizedEmail }
    )

    // If application already exists and is fully submitted with payment, reject
    if (existingApplication && existingApplication.status === 'submitted_paid') {
      return {
        success: false,
        message: 'An application with this email address has already been submitted and paid. Each email can only submit one application.',
      }
    }

    // Upload files if provided
    const uploadedFiles: Record<string, { _type: 'file'; asset: { _type: 'reference'; _ref: string } }> = {}

    if (files) {
      const fileFields = [
        { key: 'cvFile', file: files.cvFile },
        { key: 'statementOfInterestFile', file: files.statementOfInterestFile },
        { key: 'professionalLicenseFile', file: files.professionalLicenseFile },
        { key: 'institutionalSupportLetterFile', file: files.institutionalSupportLetterFile },
        { key: 'supportLetter', file: files.supportLetterFile },
      ]

      for (const { key, file } of fileFields) {
        if (file) {
          const asset = await writeClient.assets.upload('file', file, {
            filename: file.name,
          })
          uploadedFiles[key] = {
            _type: 'file',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          }
        }
      }
    }

    let result

    if (existingApplication) {
      // Update existing application (from draft or previous submission)
      const updateData: Record<string, unknown> = {
        // Section A: Personal Information
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
        countryOfResidence: formData.countryOfResidence,
        currentInstitution: formData.currentInstitution,
        department: formData.department,
        currentPosition: formData.currentPosition,
        yearsOncologyExperience: formData.yearsOncologyExperience,
        professionalRegistrationNumber: formData.professionalRegistrationNumber,
        email: normalizedEmail,
        phone: formData.phone,

        // Section B: Professional Background
        nursingQualification: formData.nursingQualification,
        areasOfPractice: formData.areasOfPractice,
        priorGeneticsTraining: formData.priorGeneticsTraining,

        // Section C: Motivation and Interest
        interestReason: formData.interestReason,
        benefitDescription: formData.benefitDescription,
        counselingExperience: formData.counselingExperience,

        // Section D: Institutional Support
        institutionName: formData.institutionName,
        supervisorName: formData.supervisorName,
        supervisorPosition: formData.supervisorPosition,
        supervisorContact: formData.supervisorContact,

        // Section E: Availability
        canParticipateVirtually: formData.canParticipateVirtually,
        hasReliableInternet: formData.hasReliableInternet,

        // Section G: Declaration
        declarationAgreed: formData.declarationAgreed,
        applicantSignatureName: formData.applicantSignatureName,
        signatureDate: formData.signatureDate,

        // Metadata - mark as submitted but unpaid
        submittedAt: new Date().toISOString(),
        status: 'submitted_unpaid',
        paymentStatus: 'unpaid',

        // Uploaded files
        ...uploadedFiles,
      }

      // Add optional fields only if they have values
      if (formData.nursingQualificationOther) updateData.nursingQualificationOther = formData.nursingQualificationOther
      if (formData.qualificationInstitution) updateData.qualificationInstitution = formData.qualificationInstitution
      if (formData.yearCompleted) updateData.yearCompleted = formData.yearCompleted
      if (formData.oncologyTraining) updateData.oncologyTraining = formData.oncologyTraining
      if (formData.areaOfPracticeOther) updateData.areaOfPracticeOther = formData.areaOfPracticeOther
      if (formData.geneticsTrainingDetails) updateData.geneticsTrainingDetails = formData.geneticsTrainingDetails

      result = await writeClient
        .patch(existingApplication._id)
        .set(updateData)
        .commit()
    } else {
      // Create new application document
      const applicationDoc = {
        _type: 'application',

        // Section A: Personal Information
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
        countryOfResidence: formData.countryOfResidence,
        currentInstitution: formData.currentInstitution,
        department: formData.department,
        currentPosition: formData.currentPosition,
        yearsOncologyExperience: formData.yearsOncologyExperience,
        professionalRegistrationNumber: formData.professionalRegistrationNumber,
        email: normalizedEmail,
        phone: formData.phone,

        // Section B: Professional Background
        nursingQualification: formData.nursingQualification,
        nursingQualificationOther: formData.nursingQualificationOther || undefined,
        qualificationInstitution: formData.qualificationInstitution || undefined,
        yearCompleted: formData.yearCompleted || undefined,
        oncologyTraining: formData.oncologyTraining || undefined,
        areasOfPractice: formData.areasOfPractice,
        areaOfPracticeOther: formData.areaOfPracticeOther || undefined,
        priorGeneticsTraining: formData.priorGeneticsTraining,
        geneticsTrainingDetails: formData.geneticsTrainingDetails || undefined,

        // Section C: Motivation and Interest
        interestReason: formData.interestReason,
        benefitDescription: formData.benefitDescription,
        counselingExperience: formData.counselingExperience,

        // Section D: Institutional Support
        institutionName: formData.institutionName,
        supervisorName: formData.supervisorName,
        supervisorPosition: formData.supervisorPosition,
        supervisorContact: formData.supervisorContact,

        // Section E: Availability
        canParticipateVirtually: formData.canParticipateVirtually,
        hasReliableInternet: formData.hasReliableInternet,

        // Section G: Declaration
        declarationAgreed: formData.declarationAgreed,
        applicantSignatureName: formData.applicantSignatureName,
        signatureDate: formData.signatureDate,

        // Metadata - mark as submitted but unpaid (will pay after)
        submittedAt: new Date().toISOString(),
        status: 'submitted_unpaid',
        paymentStatus: 'unpaid',

        // Uploaded files
        ...uploadedFiles,
      }

      result = await writeClient.create(applicationDoc)
    }

    return {
      success: true,
      message: 'Application submitted successfully. Please proceed to payment.',
      applicationId: result._id,
    }
  } catch (error) {
    console.error('Error submitting application:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit application. Please try again.',
    }
  }
}
