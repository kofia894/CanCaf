'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'

interface RegistrationStatus {
  exists: boolean
  paid: boolean
  phone?: string
  paidAt?: string
}

function RegistrationSuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error'>('loading')
  const [registrationData, setRegistrationData] = useState<RegistrationStatus | null>(null)

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!email) {
        setStatus('error')
        return
      }

      try {
        const response = await fetch('/api/registration/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data: RegistrationStatus = await response.json()
        setRegistrationData(data)

        if (data.paid) {
          setStatus('success')
        } else if (data.exists) {
          setStatus('pending')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    }

    checkPaymentStatus()
  }, [email])

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
              Registration Successful!
            </h1>

            <p className="text-zinc-600 mb-6">
              Your registration payment has been confirmed. You can now access the CGCP-ON Africa application form.
            </p>

            {registrationData?.paidAt && (
              <p className="text-sm text-zinc-500 mb-6">
                Registered on: {new Date(registrationData.paidAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}

            <Link
              href="/programs/cgcp-on-africa"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
            >
              Proceed to Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
              Payment Pending
            </h1>

            <p className="text-zinc-600 mb-6">
              Your payment is still being processed. This usually takes a few moments. Please wait or try again.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Check Again
              </button>

              <Link
                href="/programs/cgcp-on-africa"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-xl text-base font-medium motion-fast hover:bg-zinc-200 active:scale-[0.98] w-full"
              >
                Back to Registration
              </Link>
            </div>
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
            We couldn&apos;t verify your registration. Please try registering again or contact support if the problem persists.
          </p>

          <Link
            href="/programs/cgcp-on-africa"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
          >
            Try Again
          </Link>
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
export default function RegistrationSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegistrationSuccessContent />
    </Suspense>
  )
}
