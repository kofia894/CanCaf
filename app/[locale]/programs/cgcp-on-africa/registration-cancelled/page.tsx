'use client'

import { motion } from 'motion/react'
import { Link } from '@/i18n/routing'

export default function RegistrationCancelledPage() {
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
            Your registration payment was cancelled. No charges have been made to your account. You can try again whenever you&apos;re ready.
          </p>

          <div className="space-y-3">
            <Link
              href="/programs/cgcp-on-africa"
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
