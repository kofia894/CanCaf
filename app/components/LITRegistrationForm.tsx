'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Link } from '@/i18n/routing'
import { submitLitRegistration, LitRegistrationData } from '../actions/submitLitRegistration'
import { AGE_RANGES, PROFESSIONS, LEADERSHIP_AREAS } from '../lib/litOptions'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const TOTAL_STEPS = 4

const STEP_NAMES = ['Personal', 'Professional', 'Leadership', 'Confirm']

// Option lists live in app/lib/litOptions.ts so the form and the server
// action validate against exactly the same values

const EMPTY_FORM: LitRegistrationData = {
  fullName: '',
  email: '',
  ageRange: '',
  phone: '',
  country: '',
  profession: '',
  professionOther: '',
  currentRole: '',
  institution: '',
  highestQualification: '',
  yearsOfExperience: '',
  inLeadershipRole: '',
  previousLeadershipTraining: '',
  reasonForJoining: '',
  leadershipArea: '',
  leadershipAreaOther: '',
  biggestChallenge: '',
  hopeToGain: '',
  canAttendAllSessions: '',
  certificateName: '',
  consent: false,
}

/** Required text fields per step, used to gate the Continue button. */
const STEP_REQUIRED: Record<number, Array<{ key: keyof LitRegistrationData; label: string }>> = {
  1: [
    { key: 'fullName', label: 'Full name' },
    { key: 'email', label: 'Email address' },
    { key: 'ageRange', label: 'Age range' },
    { key: 'phone', label: 'WhatsApp/phone number' },
    { key: 'country', label: 'Country' },
  ],
  2: [
    { key: 'profession', label: 'Profession' },
    { key: 'currentRole', label: 'Current position/role' },
    { key: 'institution', label: 'Institution/organization' },
    { key: 'highestQualification', label: 'Highest qualification' },
    { key: 'yearsOfExperience', label: 'Years of professional experience' },
  ],
  3: [
    { key: 'inLeadershipRole', label: 'Current leadership role' },
    { key: 'previousLeadershipTraining', label: 'Previous leadership training' },
    { key: 'reasonForJoining', label: 'Main reason for joining' },
    { key: 'leadershipArea', label: 'Leadership area to develop' },
    { key: 'biggestChallenge', label: 'Biggest leadership challenge' },
    { key: 'hopeToGain', label: 'What you hope to gain' },
  ],
  4: [
    { key: 'canAttendAllSessions', label: 'Session availability' },
    { key: 'certificateName', label: 'Name for your certificate' },
  ],
}

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none motion-fast bg-white'

const labelClass = 'block text-sm font-medium text-zinc-700 mb-2'

/** Yes/No pill selector — used for questions 11, 12 and 17. */
function YesNo({
  name,
  value,
  onChange,
}: {
  name: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex gap-3">
      {['Yes', 'No'].map((option) => (
        <label
          key={option}
          className={`flex-1 sm:flex-none sm:min-w-[110px] cursor-pointer text-center px-5 py-2.5 rounded-xl border text-sm font-medium motion-fast ${
            value === option
              ? 'bg-[#0F766E] border-[#0F766E] text-white'
              : 'bg-white border-zinc-300 text-zinc-600 hover:border-[#0F766E]/50'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  )
}

/**
 * LIT Participant Registration Form
 *
 * Four-step wizard. A progress bar and step indicators sit at the top of the
 * container; the panel below swaps between step contents as you advance.
 */
export default function LITRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<LitRegistrationData>(EMPTY_FORM)
  const containerRef = useRef<HTMLDivElement>(null)

  const update = <K extends keyof LitRegistrationData>(
    key: K,
    value: LitRegistrationData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errorMessage) setErrorMessage('')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    update(name as keyof LitRegistrationData, value)
  }

  /**
   * Digits-only fields. Strips anything else as the user types rather than
   * relying on <input type="number">, which still accepts 'e', '+' and '-'
   * and changes value on an accidental scroll.
   */
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    update(name as keyof LitRegistrationData, value.replace(/[^0-9]/g, ''))
  }

  /** Returns an error message for the given step, or null when it's complete. */
  const validateStep = (step: number): string | null => {
    const missing = STEP_REQUIRED[step].filter(({ key }) => {
      const value = formData[key]
      return typeof value !== 'string' || value.trim() === ''
    })

    if (missing.length > 0) {
      return `Please complete: ${missing.map((f) => f.label).join(', ')}.`
    }

    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return 'Please enter a valid email address.'
    }

    if (step === 2 && formData.profession === 'Other' && !formData.professionOther.trim()) {
      return 'Please specify your profession.'
    }

    if (step === 3 && formData.leadershipArea === 'Other' && !formData.leadershipAreaOther.trim()) {
      return 'Please specify the leadership area you want to develop.'
    }

    if (step === 4 && !formData.consent) {
      return 'Please give consent to participate and receive programme communications.'
    }

    return null
  }

  const scrollToTop = () => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
    setErrorMessage('')
    setFormState('idle')
    scrollToTop()
  }

  const nextStep = () => {
    const error = validateStep(currentStep)

    if (error) {
      setFormState('error')
      setErrorMessage(error)
      return
    }

    if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) goToStep(currentStep - 1)
  }

  /** Allow jumping back to a completed step via the indicator. */
  const handleStepClick = (step: number) => {
    if (step < currentStep) goToStep(step)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Implicit submission on an earlier step should just advance instead
    if (currentStep < TOTAL_STEPS) {
      nextStep()
      return
    }

    const error = validateStep(TOTAL_STEPS)

    if (error) {
      setFormState('error')
      setErrorMessage(error)
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    try {
      const result = await submitLitRegistration(formData)

      if (result.success && result.paymentUrl) {
        // A fee applies — hand off to Paystack. Stay in the submitting state so
        // the button remains disabled while the browser navigates away.
        window.location.href = result.paymentUrl
        return
      }

      if (result.success) {
        setFormState('success')
        setFormData(EMPTY_FORM)
        scrollToTop()
      } else {
        setFormState('error')
        setErrorMessage(result.message)
      }
    } catch {
      setFormState('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (formState === 'success') {
    return (
      <div ref={containerRef} className="bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-2xl p-8 md:p-10 text-center">
        <div className="w-16 h-16 bg-[#0F766E]/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
          You&apos;re registered
        </h3>
        <p className="text-zinc-600 leading-relaxed max-w-md mx-auto">
          Thank you for registering for LIT. We&apos;ve sent a confirmation to your email and will
          follow up with session details and joining instructions.
        </p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="scroll-mt-32">
      {/* ===========================================================
          PROGRESS — bar + step indicators, pinned at the top
          =========================================================== */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-zinc-600">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-[#0F766E]">
            {STEP_NAMES[currentStep - 1]}
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

        {/* Step Indicators */}
        <div className="flex items-start justify-between mt-6">
          {STEP_NAMES.map((name, index) => {
            const step = index + 1
            const isComplete = step < currentStep
            const isCurrent = step === currentStep

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleStepClick(step)}
                disabled={!isComplete}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex flex-col items-center min-w-[60px] flex-1 ${
                  isComplete ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medium text-xs md:text-sm motion-fast ${
                    isComplete
                      ? 'bg-[#0F766E] text-white'
                      : isCurrent
                      ? 'bg-[#0F766E] text-white ring-4 ring-[#0F766E]/20'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {isComplete ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step
                  )}
                </span>
                <span
                  className={`mt-2 text-[10px] md:text-xs text-center ${
                    isCurrent ? 'text-[#0F766E] font-medium' : 'text-zinc-500'
                  }`}
                >
                  {name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {formState === 'error' && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
            {errorMessage}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* =======================================================
              STEP 1 — Personal Details (Q1-5)
              ======================================================= */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide mb-6 pb-4 border-b border-zinc-200">
                Personal Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* 1. Full Name */}
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* 2. Email Address */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* 3. Age Range */}
                <div>
                  <label htmlFor="ageRange" className={labelClass}>
                    Age Range <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ageRange"
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select age range</option>
                    {AGE_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. WhatsApp/Phone Number */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    id="phone"
                    international
                    defaultCountry="GH"
                    value={formData.phone}
                    onChange={(value) => update('phone', value || '')}
                    className="phone-input-wrapper"
                  />
                </div>

                {/* 5. Country */}
                <div className="sm:col-span-2">
                  <label htmlFor="country" className={labelClass}>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* =======================================================
              STEP 2 — Professional Background (Q6-10)
              ======================================================= */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide mb-6 pb-4 border-b border-zinc-200">
                Professional Background
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* 6. Profession */}
                <div>
                  <label htmlFor="profession" className={labelClass}>
                    Profession <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select profession</option>
                    {PROFESSIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.profession === 'Other' && (
                  <div>
                    <label htmlFor="professionOther" className={labelClass}>
                      Please specify <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="professionOther"
                      name="professionOther"
                      value={formData.professionOther}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                )}

                {/* 7. Current Position/Role */}
                <div>
                  <label htmlFor="currentRole" className={labelClass}>
                    Current Position / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentRole"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* 8. Institution/Organization */}
                <div>
                  <label htmlFor="institution" className={labelClass}>
                    Institution / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* 9. Highest Qualification */}
                <div>
                  <label htmlFor="highestQualification" className={labelClass}>
                    Highest Qualification Obtained <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="highestQualification"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* 10. Years of Experience — digits only */}
                <div>
                  <label htmlFor="yearsOfExperience" className={labelClass}>
                    Years of Professional Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      autoComplete="off"
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleNumericChange}
                      placeholder="e.g. 8"
                      className={`${inputClass} pr-16`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 pointer-events-none">
                      years
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =======================================================
              STEP 3 — Leadership (Q11-16)
              ======================================================= */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide mb-6 pb-4 border-b border-zinc-200">
                Leadership
              </h3>

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* 11. Currently in a leadership role? */}
                  <div>
                    <span className={labelClass}>
                      Are you currently in a leadership role? <span className="text-red-500">*</span>
                    </span>
                    <YesNo
                      name="inLeadershipRole"
                      value={formData.inLeadershipRole}
                      onChange={(value) => update('inLeadershipRole', value)}
                    />
                  </div>

                  {/* 12. Previous leadership training? */}
                  <div>
                    <span className={labelClass}>
                      Have you had previous leadership training? <span className="text-red-500">*</span>
                    </span>
                    <YesNo
                      name="previousLeadershipTraining"
                      value={formData.previousLeadershipTraining}
                      onChange={(value) => update('previousLeadershipTraining', value)}
                    />
                  </div>
                </div>

                {/* 13. Main reason for joining */}
                <div>
                  <label htmlFor="reasonForJoining" className={labelClass}>
                    What is your main reason for joining LIT? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reasonForJoining"
                    name="reasonForJoining"
                    rows={3}
                    value={formData.reasonForJoining}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* 14. Leadership area to develop */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="leadershipArea" className={labelClass}>
                      Which leadership area would you most like to develop?{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="leadershipArea"
                      name="leadershipArea"
                      value={formData.leadershipArea}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select an area</option>
                      {LEADERSHIP_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.leadershipArea === 'Other' && (
                    <div>
                      <label htmlFor="leadershipAreaOther" className={labelClass}>
                        Please specify <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="leadershipAreaOther"
                        name="leadershipAreaOther"
                        value={formData.leadershipAreaOther}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>

                {/* 15. Biggest leadership challenge */}
                <div>
                  <label htmlFor="biggestChallenge" className={labelClass}>
                    What is your biggest leadership challenge currently?{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="biggestChallenge"
                    name="biggestChallenge"
                    rows={3}
                    value={formData.biggestChallenge}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                  />
                </div>

                {/* 16. What do you hope to gain? */}
                <div>
                  <label htmlFor="hopeToGain" className={labelClass}>
                    What do you hope to gain from this programme?{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="hopeToGain"
                    name="hopeToGain"
                    rows={3}
                    value={formData.hopeToGain}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* =======================================================
              STEP 4 — Confirmation (Q17-19)
              ======================================================= */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wide mb-6 pb-4 border-b border-zinc-200">
                Confirm &amp; Submit
              </h3>

              <div className="space-y-6">
                {/* 17. Can you attend all three sessions? */}
                <div>
                  <span className={labelClass}>
                    Can you attend all three sessions? <span className="text-red-500">*</span>
                  </span>
                  <YesNo
                    name="canAttendAllSessions"
                    value={formData.canAttendAllSessions}
                    onChange={(value) => update('canAttendAllSessions', value)}
                  />
                </div>

                {/* 18. Name for certificate */}
                <div>
                  <label htmlFor="certificateName" className={labelClass}>
                    Name as it should appear on your certificate{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="certificateName"
                    name="certificateName"
                    value={formData.certificateName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Please check the spelling carefully — this is exactly how it will be printed.
                  </p>
                </div>

                {/* 19. Consent */}
                <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-zinc-200 bg-zinc-50">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-zinc-300 accent-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 flex-shrink-0"
                  />
                  <span className="text-sm text-zinc-600 leading-relaxed">
                    I consent to participate in the LIT programme and to receive programme
                    communications from CanCAF. <span className="text-red-500">*</span>
                    <br />
                    <span className="text-xs text-zinc-500">
                      Your information is handled in line with our{' '}
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="text-[#0F766E] hover:underline"
                      >
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="/terms"
                        target="_blank"
                        className="text-[#0F766E] hover:underline"
                      >
                        Terms of Service
                      </Link>
                      .
                    </span>
                  </span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===========================================================
            NAVIGATION
            =========================================================== */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200">
          <button
            type="button"
            onClick={prevStep}
            className={`inline-flex items-center gap-2 px-6 py-3 text-zinc-600 rounded-full text-sm font-medium motion-fast ${
              currentStep === 1 ? 'invisible' : 'hover:bg-zinc-100'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0d6b63] active:scale-[0.98]"
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={formState === 'submitting'}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#F59E0B] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#D4A017] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === 'submitting' ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Complete Registration
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
