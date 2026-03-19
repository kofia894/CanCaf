import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You for Your Donation',
  description: 'Your donation to CanCAF has been received. Thank you for supporting cancer care in Africa.',
}

interface PageProps {
  searchParams: Promise<{ ref?: string }>
}

export default async function DonationSuccessPage({ searchParams }: PageProps) {
  const t = await getTranslations('donate')
  const params = await searchParams
  const reference = params.ref

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
            Thank You!
          </h1>

          <p className="text-zinc-600 mb-6">
            Your donation has been received successfully. Your generosity helps us continue our mission to strengthen cancer care capacity across Africa.
          </p>

          {reference && (
            <div className="bg-zinc-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-zinc-500 mb-1">Reference Number</p>
              <p className="font-mono text-sm text-zinc-900">{reference}</p>
            </div>
          )}

          <p className="text-sm text-zinc-500 mb-8">
            A confirmation email will be sent to your email address shortly.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-[#0F766E] text-white rounded-lg font-medium hover:bg-[#0d665f] transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/donate"
              className="block w-full py-3 px-4 bg-zinc-100 text-zinc-700 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
            >
              Make Another Donation
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            Questions about your donation?{' '}
            <a
              href="mailto:info@cancaf.org"
              className="text-[#0F766E] hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
