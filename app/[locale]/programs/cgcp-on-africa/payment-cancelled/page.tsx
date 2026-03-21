'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'

function PaymentCancelledContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div className="min-h-screen bg-zinc-50 pt-32 md:pt-40 pb-12 md:pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-zinc-200 text-center"
        >
          <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
            Payment Cancelled
          </h1>

          <p className="text-zinc-600 mb-6">
            Your application payment was cancelled. No charges have been made to your account.
          </p>

          {/* Reassurance message */}
          <div className="bg-[#0F766E]/5 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#0F766E] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
                <p className="text-sm font-medium text-[#0F766E]">Your application is saved</p>
                <p className="text-sm text-zinc-600 mt-1">
                  Don&apos;t worry - all your application data has been saved. You can return anytime to complete the payment.
                </p>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-zinc-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-zinc-600 mb-2">
              <span className="font-medium">Application Fee:</span> GHS 100 or $10
            </p>
            <p className="text-xs text-zinc-500">
              Payment is required for your application to be considered for the CGCP-ON Africa Programme.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href={`/programs/cgcp-on-africa${email ? `?email=${encodeURIComponent(email)}` : ''}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-xl text-base font-medium motion-fast hover:bg-[#0D6B64] active:scale-[0.98] w-full"
            >
              Try Again
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-xl text-base font-medium motion-fast hover:bg-zinc-200 active:scale-[0.98] w-full"
            >
              Return Home
            </Link>
          </div>

          {/* Help info */}
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <p className="text-sm text-zinc-500">
              Having trouble with payment?{' '}
              <Link href="/contact" className="text-[#0F766E] hover:underline">
                Contact us
              </Link>
              {' '}for assistance.
            </p>
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
export default function PaymentCancelledPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentCancelledContent />
    </Suspense>
  )
}
