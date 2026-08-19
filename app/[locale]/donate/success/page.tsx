import Link from 'next/link'
import { Metadata } from 'next'
import { confirmDonationPayment } from '@/app/lib/donation'

export const metadata: Metadata = {
  title: 'Thank You for Your Donation',
  description: 'Your donation to CanCAF has been received. Thank you for supporting cancer care in Africa.',
}

interface PageProps {
  searchParams: Promise<{ ref?: string; reference?: string }>
}

/**
 * Paystack return page for donations.
 *
 * Verifies the reference server-side and marks the donation successful, so
 * confirmation does not depend on the webhook arriving. Shares
 * confirmDonationPayment() with /api/paystack/webhook — whichever lands first
 * wins, and re-running is a no-op.
 */
export default async function DonationSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams
  // Paystack appends ?reference=... to the callback URL; ours carries ?ref=...
  const reference = params.reference || params.ref

  const result = reference
    ? await confirmDonationPayment(reference)
    : ({ status: 'not_found' } as const)

  const isConfirmed = result.status === 'confirmed' || result.status === 'already_confirmed'

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          {/* Status Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isConfirmed ? 'bg-green-100' : 'bg-amber-100'
            }`}
          >
            {isConfirmed ? (
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
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
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            )}
          </div>

          <h1 className="text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-3">
            {isConfirmed ? 'Thank You!' : 'Payment not confirmed'}
          </h1>

          <p className="text-zinc-600 mb-6">
            {isConfirmed
              ? 'Your donation has been received successfully. Your generosity helps us continue our mission to strengthen cancer care capacity across Africa.'
              : 'We could not confirm this payment. If money left your account, please contact us with the reference below and we will resolve it right away.'}
          </p>

          {reference && (
            <div className="bg-zinc-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-zinc-500 mb-1">Reference Number</p>
              <p className="font-mono text-sm text-zinc-900 break-all">{reference}</p>
            </div>
          )}

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
