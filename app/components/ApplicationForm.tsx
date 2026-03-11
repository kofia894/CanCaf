'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { submitApplication } from '@/app/actions/submitApplication'

/**
 * Multi-Step Application Form
 *
 * Comprehensive application form for CGCP-ON Africa Programme
 * Based on official application form structure
 * Steps: Personal Info → Professional Background → Motivation → Institutional Support → Availability & Documents → Declaration
 */

interface ApplicationFormProps {
  onBack: () => void
}

interface FormData {
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
  supportLetterFile: File | null

  // Section E: Availability
  canParticipateVirtually: boolean | null
  hasReliableInternet: boolean | null

  // Section F: Supporting Documents
  cvFile: File | null
  statementOfInterestFile: File | null
  professionalLicenseFile: File | null
  institutionalSupportLetterFile: File | null

  // Section G: Declaration
  declarationAgreed: boolean
  applicantSignatureName: string
  signatureDate: string
}

const TOTAL_STEPS = 6

const AREAS_OF_PRACTICE = [
  'medicalOncology',
  'radiationOncology',
  'surgicalOncology',
  'pediatricOncology',
  'palliativeCare',
  'hematology',
  'other',
]

export default function ApplicationForm({ onBack }: ApplicationFormProps) {
  const t = useTranslations('applicationForm')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // File input refs
  const supportLetterRef = useRef<HTMLInputElement>(null)
  const cvRef = useRef<HTMLInputElement>(null)
  const statementRef = useRef<HTMLInputElement>(null)
  const licenseRef = useRef<HTMLInputElement>(null)
  const institutionalLetterRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    // Section A
    fullName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    countryOfResidence: '',
    currentInstitution: '',
    department: '',
    currentPosition: '',
    yearsOncologyExperience: '',
    professionalRegistrationNumber: '',
    email: '',
    phone: '',

    // Section B
    nursingQualification: '',
    nursingQualificationOther: '',
    qualificationInstitution: '',
    yearCompleted: '',
    oncologyTraining: '',
    areasOfPractice: [],
    areaOfPracticeOther: '',
    priorGeneticsTraining: null,
    geneticsTrainingDetails: '',

    // Section C
    interestReason: '',
    benefitDescription: '',
    counselingExperience: '',

    // Section D
    institutionName: '',
    supervisorName: '',
    supervisorPosition: '',
    supervisorContact: '',
    supportLetterFile: null,

    // Section E
    canParticipateVirtually: null,
    hasReliableInternet: null,

    // Section F
    cvFile: null,
    statementOfInterestFile: null,
    professionalLicenseFile: null,
    institutionalSupportLetterFile: null,

    // Section G
    declarationAgreed: false,
    applicantSignatureName: '',
    signatureDate: '',
  })

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAreaOfPractice = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfPractice: prev.areasOfPractice.includes(area)
        ? prev.areasOfPractice.filter((a) => a !== area)
        : [...prev.areasOfPractice, area],
    }))
  }

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const result = await submitApplication(
        {
          // Section A
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
          email: formData.email,
          phone: formData.phone,
          // Section B
          nursingQualification: formData.nursingQualification,
          nursingQualificationOther: formData.nursingQualificationOther,
          qualificationInstitution: formData.qualificationInstitution,
          yearCompleted: formData.yearCompleted,
          oncologyTraining: formData.oncologyTraining,
          areasOfPractice: formData.areasOfPractice,
          areaOfPracticeOther: formData.areaOfPracticeOther,
          priorGeneticsTraining: formData.priorGeneticsTraining,
          geneticsTrainingDetails: formData.geneticsTrainingDetails,
          // Section C
          interestReason: formData.interestReason,
          benefitDescription: formData.benefitDescription,
          counselingExperience: formData.counselingExperience,
          // Section D
          institutionName: formData.institutionName,
          supervisorName: formData.supervisorName,
          supervisorPosition: formData.supervisorPosition,
          supervisorContact: formData.supervisorContact,
          // Section E
          canParticipateVirtually: formData.canParticipateVirtually,
          hasReliableInternet: formData.hasReliableInternet,
          // Section G
          declarationAgreed: formData.declarationAgreed,
          applicantSignatureName: formData.applicantSignatureName,
          signatureDate: formData.signatureDate,
        },
        {
          cvFile: formData.cvFile,
          statementOfInterestFile: formData.statementOfInterestFile,
          professionalLicenseFile: formData.professionalLicenseFile,
          institutionalSupportLetterFile: formData.institutionalSupportLetterFile,
          supportLetterFile: formData.supportLetterFile,
        }
      )

      if (result.success) {
        toast.success('Application submitted successfully!', {
          description: 'We will review your application and get back to you soon.',
        })
        setIsSubmitted(true)
      } else {
        toast.error('Submission failed', {
          description: result.message || 'Failed to submit application. Please try again.',
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('An error occurred', {
        description: 'Something went wrong while submitting. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-colors bg-white"
  const labelClasses = "block text-sm font-medium text-zinc-700 mb-2"
  const radioClasses = "w-4 h-4 text-[#0F766E] border-zinc-300 focus:ring-[#0F766E] focus:ring-offset-0"
  const checkboxClasses = "w-4 h-4 rounded border-zinc-300 text-[#0F766E] focus:ring-[#0F766E] focus:ring-offset-0"
  const sectionHeaderClasses = "text-lg font-bold text-zinc-900 uppercase tracking-wide"

  // File validation constants
  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB
  const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
  ]
  const ALLOWED_EXTENSIONS = '.pdf, .doc, .docx, .jpg, .jpeg'

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: `File size must be less than 2 MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)} MB.` }
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { valid: false, error: `Invalid file type. Accepted formats: PDF, DOC, DOCX, JPG, JPEG` }
    }
    return { valid: true }
  }

  // File Upload Component
  const FileUpload = ({
    label,
    file,
    inputRef,
    onChange,
  }: {
    label: string
    file: File | null
    inputRef: React.RefObject<HTMLInputElement | null>
    onChange: (file: File | null) => void
  }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (!selectedFile) return

      const validation = validateFile(selectedFile)
      if (!validation.valid) {
        toast.error('Invalid file', { description: validation.error })
        e.target.value = '' // Reset input
        return
      }
      onChange(selectedFile)
    }

    const formatFileSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
      <div className="border-2 border-dashed border-zinc-300 rounded-lg p-4 hover:border-[#0F766E] transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-700">{label}</p>
            {file ? (
              <div className="mt-1">
                <p className="text-xs text-[#0F766E] truncate">{file.name}</p>
                <p className="text-xs text-zinc-400">{formatFileSize(file.size)}</p>
              </div>
            ) : (
              <p className="text-xs text-zinc-500 mt-1">{t('noFileSelected')}</p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {file && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 text-sm font-medium text-[#0F766E] bg-[#0F766E]/10 rounded-lg hover:bg-[#0F766E]/20 transition-colors"
            >
              {file ? t('changeFile') : t('selectFile')}
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <span>Max 2 MB | {ALLOWED_EXTENSIONS}</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_EXTENSIONS}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 md:pt-[calc(2.5rem+4rem+3rem)] bg-zinc-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
              {t('successTitle')}
            </h2>
            <p className="text-zinc-600 mb-8">
              {t('successMessage')}
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium transition-all hover:bg-[#0d6b63] active:scale-[0.98]"
            >
              {t('backToProgramme')}
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  const stepNames = ['personal', 'professional', 'motivation', 'institutional', 'availability', 'declaration']

  return (
    <div className="min-h-screen pt-20 md:pt-[calc(2.5rem+4rem+3rem)] bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToProgramme')}
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-2">
            {t('title')}
          </h1>
          <p className="text-zinc-600">{t('subtitle')}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2">
            <span className="text-sm font-medium text-zinc-600">
              {t('step')} {currentStep} {t('of')} {TOTAL_STEPS}
            </span>
          </div>
          <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#0F766E]"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {stepNames.map((name, index) => {
            const step = index + 1
            return (
              <div key={step} className="flex flex-col items-center min-w-[60px]">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium text-xs md:text-sm ${
                    step < currentStep
                      ? 'bg-[#0F766E] text-white'
                      : step === currentStep
                      ? 'bg-[#0F766E] text-white ring-4 ring-[#0F766E]/20'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {step < currentStep ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className={`mt-2 text-[10px] md:text-xs text-center ${step === currentStep ? 'text-[#0F766E] font-medium' : 'text-zinc-500'}`}>
                  {t(`stepNames.step${step}`)}
                </span>
              </div>
            )
          })}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-sm">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">A</div>
                  <h2 className={sectionHeaderClasses}>{t('sectionA')}</h2>
                </div>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className={labelClasses}>
                      {t('fullName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className={inputClasses}
                      placeholder={t('fullNamePlaceholder')}
                    />
                  </div>

                  {/* Gender & Date of Birth */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('gender')} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={(e) => updateFormData('gender', e.target.value)}
                            className={radioClasses}
                          />
                          <span className="text-sm text-zinc-700">{t('male')}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={(e) => updateFormData('gender', e.target.value)}
                            className={radioClasses}
                          />
                          <span className="text-sm text-zinc-700">{t('female')}</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('dateOfBirth')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Nationality & Country of Residence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('nationality')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => updateFormData('nationality', e.target.value)}
                        className={inputClasses}
                        placeholder={t('nationalityPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('countryOfResidence')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.countryOfResidence}
                        onChange={(e) => updateFormData('countryOfResidence', e.target.value)}
                        className={inputClasses}
                        placeholder={t('countryOfResidencePlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Institution & Department */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('currentInstitution')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.currentInstitution}
                        onChange={(e) => updateFormData('currentInstitution', e.target.value)}
                        className={inputClasses}
                        placeholder={t('currentInstitutionPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('department')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => updateFormData('department', e.target.value)}
                        className={inputClasses}
                        placeholder={t('departmentPlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Position & Years of Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('currentPosition')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.currentPosition}
                        onChange={(e) => updateFormData('currentPosition', e.target.value)}
                        className={inputClasses}
                        placeholder={t('currentPositionPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('yearsOncologyExperience')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.yearsOncologyExperience}
                        onChange={(e) => updateFormData('yearsOncologyExperience', e.target.value)}
                        className={inputClasses}
                        placeholder={t('yearsOncologyExperiencePlaceholder')}
                      />
                    </div>
                  </div>

                  {/* Professional Registration Number */}
                  <div>
                    <label className={labelClasses}>
                      {t('professionalRegistrationNumber')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.professionalRegistrationNumber}
                      onChange={(e) => updateFormData('professionalRegistrationNumber', e.target.value)}
                      className={inputClasses}
                      placeholder={t('professionalRegistrationNumberPlaceholder')}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('email')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={inputClasses}
                        placeholder={t('emailPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('phoneWhatsApp')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className={inputClasses}
                        placeholder={t('phoneWhatsAppPlaceholder')}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">B</div>
                  <h2 className={sectionHeaderClasses}>{t('sectionB')}</h2>
                </div>

                <div className="space-y-8">
                  {/* 1. Nursing Qualification */}
                  <div className="bg-zinc-50 rounded-xl p-6">
                    <p className="text-sm font-semibold text-zinc-900 mb-4">1. {t('nursingQualification')} <span className="text-red-500">*</span></p>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 mb-4">
                      {['diploma', 'bachelors', 'masters', 'doctorate', 'other'].map((qual) => (
                        <label key={qual} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="nursingQualification"
                            value={qual}
                            checked={formData.nursingQualification === qual}
                            onChange={(e) => updateFormData('nursingQualification', e.target.value)}
                            className={checkboxClasses}
                          />
                          <span className="text-sm text-zinc-700">{t(`qualification.${qual}`)}</span>
                        </label>
                      ))}
                    </div>
                    {formData.nursingQualification === 'other' && (
                      <input
                        type="text"
                        value={formData.nursingQualificationOther}
                        onChange={(e) => updateFormData('nursingQualificationOther', e.target.value)}
                        className={`${inputClasses} mb-4`}
                        placeholder={t('specifyOther')}
                      />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-zinc-600 mb-1 block">{t('qualificationInstitution')}:</label>
                        <input
                          type="text"
                          value={formData.qualificationInstitution}
                          onChange={(e) => updateFormData('qualificationInstitution', e.target.value)}
                          className={inputClasses}
                          placeholder={t('qualificationInstitutionPlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-zinc-600 mb-1 block">{t('yearCompleted')}:</label>
                        <input
                          type="text"
                          value={formData.yearCompleted}
                          onChange={(e) => updateFormData('yearCompleted', e.target.value)}
                          className={inputClasses}
                          placeholder={t('yearCompletedPlaceholder')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Oncology Training */}
                  <div className="bg-zinc-50 rounded-xl p-6">
                    <p className="text-sm font-semibold text-zinc-900 mb-4">2. {t('oncologyTrainingLabel')}</p>
                    <textarea
                      value={formData.oncologyTraining}
                      onChange={(e) => updateFormData('oncologyTraining', e.target.value)}
                      rows={3}
                      className={`${inputClasses} resize-none`}
                      placeholder={t('oncologyTrainingPlaceholder')}
                    />
                  </div>

                  {/* 3. Current Area of Practice */}
                  <div className="bg-zinc-50 rounded-xl p-6">
                    <p className="text-sm font-semibold text-zinc-900 mb-2">3. {t('areasOfPractice')} <span className="text-red-500">*</span></p>
                    <p className="text-xs text-zinc-500 mb-4">{t('selectAllApply')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {AREAS_OF_PRACTICE.map((area) => (
                        <label key={area} className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.areasOfPractice.includes(area)}
                            onChange={() => toggleAreaOfPractice(area)}
                            className={checkboxClasses}
                          />
                          <span className="text-sm text-zinc-700">{t(`areaOfPractice.${area}`)}</span>
                        </label>
                      ))}
                    </div>
                    {formData.areasOfPractice.includes('other') && (
                      <input
                        type="text"
                        value={formData.areaOfPracticeOther}
                        onChange={(e) => updateFormData('areaOfPracticeOther', e.target.value)}
                        className={`${inputClasses} mt-4`}
                        placeholder={t('specifyOther')}
                      />
                    )}
                  </div>

                  {/* 4. Prior Genetics Training */}
                  <div className="bg-zinc-50 rounded-xl p-6">
                    <p className="text-sm font-semibold text-zinc-900 mb-4">4. {t('priorGeneticsTraining')} <span className="text-red-500">*</span></p>
                    <div className="flex gap-6 mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priorGeneticsTraining"
                          checked={formData.priorGeneticsTraining === true}
                          onChange={() => updateFormData('priorGeneticsTraining', true)}
                          className={checkboxClasses}
                        />
                        <span className="text-sm text-zinc-700">{t('yes')}</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priorGeneticsTraining"
                          checked={formData.priorGeneticsTraining === false}
                          onChange={() => updateFormData('priorGeneticsTraining', false)}
                          className={checkboxClasses}
                        />
                        <span className="text-sm text-zinc-700">{t('no')}</span>
                      </label>
                    </div>
                    {formData.priorGeneticsTraining === true && (
                      <div>
                        <label className="text-sm text-zinc-600 mb-1 block">{t('ifYesSpecify')}:</label>
                        <input
                          type="text"
                          value={formData.geneticsTrainingDetails}
                          onChange={(e) => updateFormData('geneticsTrainingDetails', e.target.value)}
                          className={inputClasses}
                          placeholder={t('geneticsTrainingDetailsPlaceholder')}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Motivation and Interest */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">C</div>
                  <h2 className={sectionHeaderClasses}>{t('sectionC')}</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>
                      1. {t('interestReason')} <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-zinc-500 mb-2">{t('maxWords')}</p>
                    <textarea
                      value={formData.interestReason}
                      onChange={(e) => updateFormData('interestReason', e.target.value)}
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder={t('interestReasonPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      2. {t('benefitDescription')} <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-zinc-500 mb-2">{t('maxWords')}</p>
                    <textarea
                      value={formData.benefitDescription}
                      onChange={(e) => updateFormData('benefitDescription', e.target.value)}
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder={t('benefitDescriptionPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>
                      3. {t('counselingExperience')} <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-zinc-500 mb-2">{t('maxWords')}</p>
                    <textarea
                      value={formData.counselingExperience}
                      onChange={(e) => updateFormData('counselingExperience', e.target.value)}
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder={t('counselingExperiencePlaceholder')}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Institutional Support */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">D</div>
                  <h2 className={sectionHeaderClasses}>{t('sectionD')}</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>
                      {t('institutionName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.institutionName}
                      onChange={(e) => updateFormData('institutionName', e.target.value)}
                      className={inputClasses}
                      placeholder={t('institutionNamePlaceholder')}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('supervisorName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.supervisorName}
                        onChange={(e) => updateFormData('supervisorName', e.target.value)}
                        className={inputClasses}
                        placeholder={t('supervisorNamePlaceholder')}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('supervisorPosition')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.supervisorPosition}
                        onChange={(e) => updateFormData('supervisorPosition', e.target.value)}
                        className={inputClasses}
                        placeholder={t('supervisorPositionPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>
                      {t('supervisorContact')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.supervisorContact}
                      onChange={(e) => updateFormData('supervisorContact', e.target.value)}
                      className={inputClasses}
                      placeholder={t('supervisorContactPlaceholder')}
                    />
                  </div>

                  {/* File Upload for Support Letter */}
                  <div>
                    <label className={labelClasses}>
                      {t('attachSupportLetter')} <span className="text-red-500">*</span>
                    </label>
                    <FileUpload
                      label={t('supportLetterFile')}
                      file={formData.supportLetterFile}
                      inputRef={supportLetterRef}
                      onChange={(file) => handleFileChange('supportLetterFile', file)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Availability & Supporting Documents */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-10">
                  {/* Section E: Availability */}
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                      <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">E</div>
                      <h2 className={sectionHeaderClasses}>{t('sectionE')}</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-zinc-50 rounded-xl p-6">
                        <p className="text-sm font-medium text-zinc-900 mb-4">{t('canParticipateVirtually')}</p>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="canParticipateVirtually"
                              checked={formData.canParticipateVirtually === true}
                              onChange={() => updateFormData('canParticipateVirtually', true)}
                              className={checkboxClasses}
                            />
                            <span className="text-sm text-zinc-700">{t('yes')}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="canParticipateVirtually"
                              checked={formData.canParticipateVirtually === false}
                              onChange={() => updateFormData('canParticipateVirtually', false)}
                              className={checkboxClasses}
                            />
                            <span className="text-sm text-zinc-700">{t('no')}</span>
                          </label>
                        </div>
                      </div>

                      <div className="bg-zinc-50 rounded-xl p-6">
                        <p className="text-sm font-medium text-zinc-900 mb-4">{t('hasReliableInternet')}</p>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="hasReliableInternet"
                              checked={formData.hasReliableInternet === true}
                              onChange={() => updateFormData('hasReliableInternet', true)}
                              className={checkboxClasses}
                            />
                            <span className="text-sm text-zinc-700">{t('yes')}</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="hasReliableInternet"
                              checked={formData.hasReliableInternet === false}
                              onChange={() => updateFormData('hasReliableInternet', false)}
                              className={checkboxClasses}
                            />
                            <span className="text-sm text-zinc-700">{t('no')}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section F: Supporting Documents */}
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                      <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">F</div>
                      <h2 className={sectionHeaderClasses}>{t('sectionF')}</h2>
                    </div>

                    <p className="text-sm text-zinc-600 mb-6">{t('documentsInstructions')}</p>

                    <div className="space-y-4">
                      <FileUpload
                        label={t('documentCV')}
                        file={formData.cvFile}
                        inputRef={cvRef}
                        onChange={(file) => handleFileChange('cvFile', file)}
                      />

                      <FileUpload
                        label={t('documentStatementOfInterest')}
                        file={formData.statementOfInterestFile}
                        inputRef={statementRef}
                        onChange={(file) => handleFileChange('statementOfInterestFile', file)}
                      />

                      <FileUpload
                        label={t('documentProfessionalLicense')}
                        file={formData.professionalLicenseFile}
                        inputRef={licenseRef}
                        onChange={(file) => handleFileChange('professionalLicenseFile', file)}
                      />

                      <FileUpload
                        label={t('documentInstitutionalSupportLetter')}
                        file={formData.institutionalSupportLetterFile}
                        inputRef={institutionalLetterRef}
                        onChange={(file) => handleFileChange('institutionalSupportLetterFile', file)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Declaration */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-bold text-sm">G</div>
                  <h2 className={sectionHeaderClasses}>{t('sectionG')}</h2>
                </div>

                <div className="space-y-6">
                  {/* Declaration Text */}
                  <div className="bg-[#0F766E]/5 rounded-xl p-6 border border-[#0F766E]/10">
                    <p className="text-sm text-zinc-700 leading-relaxed">
                      {t('declarationText')}
                    </p>
                  </div>

                  {/* Applicant Name */}
                  <div>
                    <label className={labelClasses}>
                      {t('applicantName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.applicantSignatureName}
                      onChange={(e) => updateFormData('applicantSignatureName', e.target.value)}
                      className={inputClasses}
                      placeholder={t('applicantNamePlaceholder')}
                    />
                  </div>

                  {/* Signature & Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>
                        {t('signature')} <span className="text-red-500">*</span>
                      </label>
                      <div className="h-24 border-2 border-dashed border-zinc-300 rounded-lg flex items-center justify-center bg-zinc-50">
                        <p className="text-sm text-zinc-500 italic">{t('signatureNote')}</p>
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>
                        {t('date')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.signatureDate}
                        onChange={(e) => updateFormData('signatureDate', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Agreement Checkbox */}
                  <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-[#0F766E] bg-[#0F766E]/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.declarationAgreed}
                      onChange={(e) => updateFormData('declarationAgreed', e.target.checked)}
                      className={`${checkboxClasses} mt-0.5`}
                    />
                    <span className="text-sm font-medium text-zinc-900">
                      {t('declarationAgree')}
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200">
            <button
              onClick={prevStep}
              className={`inline-flex items-center gap-2 px-6 py-3 text-zinc-600 rounded-full text-sm font-medium transition-colors ${
                currentStep === 1 ? 'invisible' : 'hover:bg-zinc-100'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t('previous')}
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium transition-all hover:bg-[#0d6b63] active:scale-[0.98]"
              >
                {t('continue')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.declarationAgreed || !formData.applicantSignatureName || !formData.signatureDate}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#F59E0B] text-white rounded-full text-sm font-medium transition-all hover:bg-[#D4A017] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    {t('submitApplication')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
