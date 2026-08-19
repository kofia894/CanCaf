import { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { confirmLitRegistrationPayment } from '@/app/lib/litRegistration'

export const metadata: Metadata = {
  title: 'LIT Registration Confirmed',
  robots: { index: false, follow: false },
}

/**
 * Paystack return page for LIT registration.
 *
 * Verifies the reference server-side rather than trusting the redirect — the
 * URL is user-controllable, so nobody can mark themselves paid by visiting it.
 * Shares confirmLitRegistrationPayment() with the webhook, so whichever lands
 * first wins and the confirmation email is sent exactly once.
 */
export default async function LITPaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; reference?: string }>
}) {
  const params = await searchParams
  // Paystack appends ?reference=... to the callback URL; ours carries ?ref=...
  const reference = params.reference || params.ref

  const result = reference
    ? await confirmLitRegistrationPayment(reference)
    : ({ status: 'not_found' } as const)

  const isConfirmed = result.status === 'confirmed' || result.status === 'already_confirmed'
  const name = isConfirmed ? result.registration.fullName : null

  return (
    <div className="min-h-screen bg-zinc-50 pt-[132px] pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-8 md:p-12 text-center">
          {isConfirmed ? (
            <>
              <div className="w-16 h-16 bg-[#0F766E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <p className="text-sm font-medium text-[#F59E0B] tracking-[0.25em] uppercase mb-3">
                Lead · Influence · Transform
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
                You&apos;re registered for LIT
              </h1>

              <p className="text-zinc-600 leading-relaxed mb-6">
                {name ? `Thank you, ${name}. ` : ''}Your payment was successful and your place on
                the Leadership Development Series is confirmed. We&apos;ve sent a confirmation to
                your email and will follow up with session details and joining instructions.
              </p>

              {reference && (
                <div className="bg-zinc-50 rounded-xl p-4 mb-8 border border-zinc-200">
                  <p className="text-xs text-zinc-500 mb-1">Payment reference</p>
                  <p className="font-mono text-sm text-zinc-900 break-all">{reference}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 font-[family-name:var(--font-montserrat)] mb-4">
                We couldn&apos;t confirm your payment
              </h1>

              <p className="text-zinc-600 leading-relaxed mb-6">
                {result.status === 'not_successful'
                  ? 'Your payment did not go through. Your registration details are saved, so you can try again without re-entering everything.'
                  : 'We could not match this payment to a registration. If money left your account, please contact us with the reference below and we will sort it out.'}
              </p>

              {reference && (
                <div className="bg-zinc-50 rounded-xl p-4 mb-8 border border-zinc-200">
                  <p className="text-xs text-zinc-500 mb-1">Reference</p>
                  <p className="font-mono text-sm text-zinc-900 break-all">{reference}</p>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/programs/lit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium motion-fast hover:bg-[#0d6b63] active:scale-[0.98]"
            >
              {isConfirmed ? 'Back to Programme' : 'Try Again'}
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium motion-fast hover:bg-zinc-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
