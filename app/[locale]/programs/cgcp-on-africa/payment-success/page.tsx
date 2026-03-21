'use client'

import { useEffect, useState, Suspense, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'

interface ApplicationStatus {
  exists: boolean
  paid: boolean
  fullName?: string
  email?: string
  paidAt?: string
  clientReference?: string
  status?: string
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const appId = searchParams.get('appId')
  const email = searchParams.get('email')
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error'>('loading')
  const [applicationData, setApplicationData] = useState<ApplicationStatus | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [pollAttempt, setPollAttempt] = useState(0)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const maxPollAttempts = 6 // Poll for ~30 seconds (6 attempts x 5 seconds)

  // Function to check payment via Hubtel transaction status API
  const checkTransactionStatus = useCallback(async (clientRef: string) => {
    try {
      const response = await fetch(`/api/application/payment/callback?ref=${encodeURIComponent(clientRef)}`)
      const data = await response.json()

      if (data.success && data.status === 'Paid') {
        // Payment confirmed via status check
        setStatus('success')
        setIsPolling(false)
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current)
        }
        // Refresh application data
        const appResponse = await fetch(`/api/application/check?email=${encodeURIComponent(email || '')}`)
        const appData = await appResponse.json()
        setApplicationData(appData)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [email])

  // Function to check application status from Sanity
  const checkPaymentStatus = useCallback(async () => {
    if (!email && !appId) {
      setStatus('error')
      return
    }

    try {
      const queryParam = appId
        ? `appId=${encodeURIComponent(appId)}`
        : `email=${encodeURIComponent(email || '')}`
      const response = await fetch(`/api/application/check?${queryParam}`)
      const data: ApplicationStatus = await response.json()
      setApplicationData(data)

      if (data.paid) {
        setStatus('success')
        setIsPolling(false)
        // Also trigger status check in background for audit/logging purposes
        if (data.clientReference) {
          fetch(`/api/application/payment/callback?ref=${encodeURIComponent(data.clientReference)}`)
            .catch(() => {}) // Ignore errors, this is just for logging
        }
      } else if (data.exists && data.clientReference) {
        setStatus('pending')
        // Immediately check transaction status when we first detect a pending payment
        if (!isPolling && pollAttempt < maxPollAttempts) {
          // Trigger immediate status check
          checkTransactionStatus(data.clientReference)
          setIsPolling(true)
        }
      } else if (data.exists) {
        setStatus('pending')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }, [email, appId, isPolling, pollAttempt, maxPollAttempts, checkTransactionStatus])

  // Initial check on mount
  useEffect(() => {
    checkPaymentStatus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Polling effect for pending payments
  useEffect(() => {
    if (isPolling && applicationData?.clientReference && status === 'pending') {
      pollIntervalRef.current = setInterval(async () => {
        setPollAttempt(prev => {
          const newAttempt = prev + 1
          if (newAttempt >= maxPollAttempts) {
            setIsPolling(false)
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current)
            }
          }
          return newAttempt
        })

        // First check transaction status via Hubtel API
        const paid = await checkTransactionStatus(applicationData.clientReference!)
        if (!paid) {
          // If not paid via status check, also check Sanity in case callback arrived
          await checkPaymentStatus()
        }
      }, 5000) // Check every 5 seconds

      return () => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current)
        }
      }
    }
  }, [isPolling, applicationData?.clientReference, status, checkTransactionStatus, checkPaymentStatus, maxPollAttempts])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-zinc-50 pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-zinc-200 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
              Application Payment Confirmed!
            </h1>

            <p className="text-zinc-600 mb-6">
              Thank you{applicationData?.fullName ? `, ${applicationData.fullName.split(' ')[0]}` : ''}! Your application fee has been received. Your application will now be reviewed by our team.
            </p>

            {applicationData?.paidAt && (
              <p className="text-sm text-zinc-500 mb-6">
                Payment confirmed on: {new Date(applicationData.paidAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}

            <div className="bg-[#0F766E]/5 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-[#0F766E] mb-2">What&apos;s Next?</h3>
              <ul className="text-sm text-zinc-600 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#0F766E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your application is now under review
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#0F766E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  You&apos;ll receive an email confirmation shortly
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#0F766E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  We&apos;ll notify you once a decision is made
                </li>
              </ul>
            </div>

            <Link
              href="/programs/cgcp-on-africa"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
            >
              Back to Programme
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {applicationData?.clientReference && (
              <p className="text-xs text-zinc-400 mt-4">
                Reference: {applicationData.clientReference}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-zinc-50 pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-zinc-200 text-center"
          >
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {isPolling ? (
                <div className="w-10 h-10 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            <h1 className="text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
              {isPolling ? 'Verifying Payment...' : 'Payment Pending'}
            </h1>

            <p className="text-zinc-600 mb-6">
              {isPolling
                ? `Checking payment status with your provider... (${pollAttempt}/${maxPollAttempts})`
                : 'Your payment is still being processed. This usually takes a few moments.'}
            </p>

            <div className="space-y-3">
              {!isPolling && (
                <button
                  onClick={() => {
                    setPollAttempt(0)
                    setIsPolling(true)
                    checkPaymentStatus()
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Check Again
                </button>
              )}

              <Link
                href="/programs/cgcp-on-africa"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-xl text-base font-medium motion-fast hover:bg-zinc-200 active:scale-[0.98] w-full"
              >
                Back to Programme
              </Link>
            </div>

            <p className="text-sm text-zinc-500 mt-6">
              Don&apos;t worry - your application has been saved. You can return later to complete payment.
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen bg-zinc-50 pt-32 md:pt-40 pb-12 md:pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-zinc-200 text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
            Something Went Wrong
          </h1>

          <p className="text-zinc-600 mb-6">
            We couldn&apos;t verify your payment. Your application is saved and you can try paying again, or contact support if the problem persists.
          </p>

          <div className="space-y-3">
            <Link
              href="/programs/cgcp-on-africa"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
            >
              Try Again
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-xl text-base font-medium motion-fast hover:bg-zinc-200 active:scale-[0.98] w-full"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center pt-32">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#0F766E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-600">Loading...</p>
      </div>
    </div>
  )
}

// Main export with Suspense boundary
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
