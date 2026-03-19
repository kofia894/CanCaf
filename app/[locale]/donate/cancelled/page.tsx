import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donation Cancelled',
  description: 'Your donation was cancelled. You can try again anytime.',
}

interface PageProps {
  searchParams: Promise<{ ref?: string }>
}

export default async function DonationCancelledPage({ searchParams }: PageProps) {
  const params = await searchParams
  const reference = params.ref

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          {/* Cancelled Icon */}
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
            Donation Cancelled
          </h1>

          <p className="text-zinc-600 mb-6">
            Your donation was not completed. Don&apos;t worry - no payment was processed. You can try again whenever you&apos;re ready.
          </p>

          {reference && (
            <div className="bg-zinc-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-zinc-500 mb-1">Reference Number</p>
              <p className="font-mono text-sm text-zinc-900">{reference}</p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/donate"
              className="block w-full py-3 px-4 bg-[#0F766E] text-white rounded-lg font-medium hover:bg-[#0d665f] transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-zinc-100 text-zinc-700 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            Having trouble donating?{' '}
            <a
              href="mailto:info@cancaf.org"
              className="text-[#0F766E] hover:underline"
            >
              Contact us for help
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
