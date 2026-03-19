'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

// Preset amounts in GHS (Ghana Cedis)
const presetAmounts = [50, 100, 200, 500, 1000, 2000]

interface DonorInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export default function DonateClient() {
  const t = useTranslations('donate')

  const [selectedAmount, setSelectedAmount] = useState<number | null>(200)
  const [customAmount, setCustomAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<'amount' | 'details' | 'payment'>('amount')
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [emailError, setEmailError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  // Phone validation function (basic check for non-empty)
  const validatePhone = (phone: string): boolean => {
    return phone.trim().length >= 10
  }

  const getFinalAmount = () => {
    if (customAmount) {
      return parseFloat(customAmount) || 0
    }
    return selectedAmount || 0
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const handleDonorInfoChange = (field: keyof DonorInfo, value: string | boolean) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleContinueToDetails = () => {
    if (getFinalAmount() > 0) {
      setStep('details')
    }
  }

  const handleContinueToPayment = () => {
    let hasErrors = false

    // Validate email
    if (!validateEmail(donorInfo.email)) {
      setEmailError('Please enter a valid email address')
      hasErrors = true
    } else {
      setEmailError(null)
    }

    // Validate phone
    if (!validatePhone(donorInfo.phone)) {
      setPhoneError('Please enter a valid phone number')
      hasErrors = true
    } else {
      setPhoneError(null)
    }

    if (!hasErrors && donorInfo.firstName && donorInfo.lastName && donorInfo.email && donorInfo.phone) {
      setStep('payment')
    }
  }

  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentError(null)

    try {
      const response = await fetch('/api/donate/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getFinalAmount(),
          donorInfo,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate payment')
      }

      // Redirect to Hubtel checkout page
      window.location.href = data.checkoutUrl

    } catch (error) {
      console.error('Payment error:', error)
      setPaymentError(error instanceof Error ? error.message : 'Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const renderAmountStep = () => (
    <div className="space-y-8">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-3">
          {t('selectAmount')} (GHS)
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`py-3 px-4 rounded-xl text-center font-medium transition-all duration-200 ${
                selectedAmount === amount && !customAmount
                  ? 'bg-[#0F766E] text-white ring-2 ring-[#0F766E] ring-offset-2'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              ₵{amount}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
            ₵
          </span>
          <input
            type="number"
            placeholder={t('customAmount')}
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all duration-200 ${
              customAmount
                ? 'border-[#0F766E] bg-[#0F766E]/5'
                : 'border-zinc-200 focus:border-[#0F766E]'
            }`}
          />
        </div>
      </div>

      {/* Impact Preview */}
      {getFinalAmount() > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#0F766E]/5 rounded-xl border border-[#0F766E]/20"
        >
          <p className="text-sm text-[#0F766E] font-medium mb-1">{t('yourImpact')}</p>
          <p className="text-zinc-600 text-sm">
            {getFinalAmount() >= 1000 ? t('impact250') :
             getFinalAmount() >= 500 ? t('impact100') :
             getFinalAmount() >= 200 ? t('impact50') :
             t('impact25')}
          </p>
        </motion.div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinueToDetails}
        disabled={getFinalAmount() <= 0}
        className={`w-full py-4 rounded-full font-medium transition-all duration-200 ${
          getFinalAmount() > 0
            ? 'bg-[#F59E0B] text-white hover:bg-[#D97706] active:scale-[0.98]'
            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
        }`}
      >
        {t('continueToDetails')} - ₵{getFinalAmount()}
      </button>
    </div>
  )

  const renderDetailsStep = () => (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setStep('amount')}
        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t('back')}
      </button>

      {/* Summary */}
      <div className="p-4 bg-zinc-50 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-zinc-600">{t('donationAmount')}</span>
          <span className="text-xl font-bold text-zinc-900">
            ₵{getFinalAmount()}
          </span>
        </div>
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-zinc-900">{t('yourInformation')}</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">{t('firstName')} *</label>
            <input
              type="text"
              value={donorInfo.firstName}
              onChange={(e) => handleDonorInfoChange('firstName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:border-[#0F766E] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">{t('lastName')} *</label>
            <input
              type="text"
              value={donorInfo.lastName}
              onChange={(e) => handleDonorInfoChange('lastName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:border-[#0F766E] transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-600 mb-1">{t('email')} *</label>
          <input
            type="email"
            value={donorInfo.email}
            onChange={(e) => {
              handleDonorInfoChange('email', e.target.value)
              if (emailError && validateEmail(e.target.value)) {
                setEmailError(null)
              }
            }}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
              emailError
                ? 'border-red-500 focus:border-red-500'
                : 'border-zinc-200 focus:border-[#0F766E]'
            }`}
            required
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-zinc-600 mb-1">{t('phone')} *</label>
          <input
            type="tel"
            value={donorInfo.phone}
            onChange={(e) => {
              // Only allow numbers
              const numbersOnly = e.target.value.replace(/[^0-9]/g, '')
              handleDonorInfoChange('phone', numbersOnly)
              if (phoneError && validatePhone(numbersOnly)) {
                setPhoneError(null)
              }
            }}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
              phoneError
                ? 'border-red-500 focus:border-red-500'
                : 'border-zinc-200 focus:border-[#0F766E]'
            }`}
            required
          />
          {phoneError && (
            <p className="text-red-500 text-xs mt-1">{phoneError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-zinc-600 mb-1">{t('leaveMessage')}</label>
          <textarea
            value={donorInfo.message}
            onChange={(e) => handleDonorInfoChange('message', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:border-[#0F766E] transition-colors resize-none"
            placeholder={t('messagePlaceholder')}
          />
        </div>

      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinueToPayment}
        disabled={!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email || !donorInfo.phone}
        className={`w-full py-4 rounded-full font-medium transition-all duration-200 ${
          donorInfo.firstName && donorInfo.lastName && donorInfo.email && donorInfo.phone
            ? 'bg-[#F59E0B] text-white hover:bg-[#D97706] active:scale-[0.98]'
            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
        }`}
      >
        {t('continueToPayment')}
      </button>
    </div>
  )

  const renderPaymentStep = () => (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setStep('details')}
        className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t('back')}
      </button>

      {/* Order Summary */}
      <div className="p-6 bg-zinc-50 rounded-xl space-y-4">
        <h3 className="font-medium text-zinc-900">{t('orderSummary')}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-600">{t('donor')}</span>
            <span className="text-zinc-900">
              {donorInfo.firstName} {donorInfo.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">{t('email')}</span>
            <span className="text-zinc-900">{donorInfo.email}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-zinc-900">{t('total')}</span>
            <span className="text-2xl font-bold text-[#0F766E]">
              ₵{getFinalAmount()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-medium text-zinc-900">{t('paymentMethod')}</h3>

        {/* Payment method buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#0F766E] text-white rounded-xl font-medium hover:bg-[#0F766E]/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('processing')}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {t('payWithCard')}
              </>
            )}
          </button>

          {/* Mobile Money option */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#F59E0B] text-white rounded-xl font-medium hover:bg-[#D97706] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {t('payWithMobileMoney')}
          </button>
        </div>
      </div>

      {/* Payment Error */}
      {paymentError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-800">Payment Error</p>
            <p className="text-xs text-red-600">{paymentError}</p>
          </div>
        </div>
      )}

      {/* Security Note */}
      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-green-800">{t('securePayment')}</p>
          <p className="text-xs text-green-600">{t('securePaymentNote')}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['amount', 'details', 'payment'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === s
                  ? 'bg-[#0F766E] text-white'
                  : i < ['amount', 'details', 'payment'].indexOf(step)
                  ? 'bg-green-500 text-white'
                  : 'bg-zinc-100 text-zinc-400'
              }`}
            >
              {i < ['amount', 'details', 'payment'].indexOf(step) ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < 2 && (
              <div
                className={`w-12 h-0.5 mx-1 ${
                  i < ['amount', 'details', 'payment'].indexOf(step)
                    ? 'bg-green-500'
                    : 'bg-zinc-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 'amount' && renderAmountStep()}
      {step === 'details' && renderDetailsStep()}
      {step === 'payment' && renderPaymentStep()}
    </div>
  )
}
