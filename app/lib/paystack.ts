import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Paystack helpers — used by LIT registration and donations.
 *
 * CGCP-ON registration and application payments still run on Hubtel;
 * this module is deliberately independent of those routes.
 *
 * Note: Paystack works in the currency's smallest unit (pesewas for GHS,
 * cents for USD), so amounts cross this boundary multiplied by 100.
 */

const PAYSTACK_BASE_URL = 'https://api.paystack.co'

/** Default currency. Ghanaian Paystack accounts settle in GHS. */
export const DEFAULT_CURRENCY = 'GHS'

export interface PaystackInitializeParams {
  email: string
  /** Amount in major units (e.g. 50 for GHS 50.00). */
  amount: number
  reference: string
  callbackUrl: string
  currency?: string
  metadata?: Record<string, unknown>
}

export interface PaystackInitializeResult {
  authorizationUrl: string
  accessCode: string
  reference: string
}

export interface PaystackVerifyResult {
  /** Paystack transaction status — 'success', 'failed', 'abandoned', etc. */
  status: string
  isSuccessful: boolean
  reference: string
  /** Amount in major units, converted back from subunits. */
  amount: number
  currency: string
  /** Payment channel, e.g. 'card', 'mobile_money', 'bank_transfer'. */
  channel: string | null
  paidAt: string | null
  transactionId: string | null
  customerEmail: string | null
  raw: unknown
}

interface PaystackApiResponse<T> {
  status: boolean
  message: string
  data: T
}

function getSecretKey(): string {
  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured')
  }

  return secretKey
}

/** Convert major units to the smallest unit Paystack expects. */
function toSubunits(amount: number): number {
  return Math.round(amount * 100)
}

/**
 * Generate a unique transaction reference.
 * The prefix is how the webhook decides which document type to update.
 */
export function generateReference(prefix: 'LIT' | 'DON'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

/**
 * Create a Paystack transaction and return the hosted checkout URL.
 */
export async function initializeTransaction(
  params: PaystackInitializeParams
): Promise<PaystackInitializeResult> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: toSubunits(params.amount),
      currency: params.currency || DEFAULT_CURRENCY,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
    }),
  })

  const body = (await response.json()) as PaystackApiResponse<{
    authorization_url: string
    access_code: string
    reference: string
  }>

  if (!response.ok || !body.status || !body.data?.authorization_url) {
    console.error('Paystack initialize failed:', body)
    throw new Error(body.message || 'Failed to initialise payment')
  }

  return {
    authorizationUrl: body.data.authorization_url,
    accessCode: body.data.access_code,
    reference: body.data.reference,
  }
}

/**
 * Confirm a transaction's real status with Paystack.
 *
 * Always verify server-side — never trust the browser redirect alone, since
 * anyone can hit the success URL with an arbitrary reference.
 */
export async function verifyTransaction(reference: string): Promise<PaystackVerifyResult> {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
      },
      cache: 'no-store',
    }
  )

  const body = (await response.json()) as PaystackApiResponse<{
    status: string
    reference: string
    amount: number
    currency: string
    channel: string | null
    paid_at: string | null
    id: number | null
    customer: { email: string | null } | null
  }>

  if (!response.ok || !body.status || !body.data) {
    console.error('Paystack verify failed:', body)
    throw new Error(body.message || 'Failed to verify payment')
  }

  const data = body.data

  return {
    status: data.status,
    isSuccessful: data.status === 'success',
    reference: data.reference,
    amount: (data.amount ?? 0) / 100,
    currency: data.currency,
    channel: data.channel ?? null,
    paidAt: data.paid_at ?? null,
    transactionId: data.id ? String(data.id) : null,
    customerEmail: data.customer?.email ?? null,
    raw: body,
  }
}

/**
 * Validate the `x-paystack-signature` header on an incoming webhook.
 * Paystack signs the raw request body with HMAC-SHA512 using the secret key.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false

  const expected = createHmac('sha512', getSecretKey()).update(rawBody).digest('hex')
  const expectedBuffer = Buffer.from(expected, 'utf8')
  const receivedBuffer = Buffer.from(signature, 'utf8')

  if (expectedBuffer.length !== receivedBuffer.length) return false

  return timingSafeEqual(expectedBuffer, receivedBuffer)
}
