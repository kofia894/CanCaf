import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/app/lib/sanity'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if registration exists and is paid
    const registration = await client.fetch(
      `*[_type == "applicationRegistration" && email == $email][0]{
        _id,
        email,
        phone,
        paymentStatus,
        paidAt,
        clientReference
      }`,
      { email: email.toLowerCase() }
    )

    if (!registration) {
      return NextResponse.json({
        exists: false,
        paid: false,
      })
    }

    return NextResponse.json({
      exists: true,
      paid: registration.paymentStatus === 'paid',
      phone: registration.phone,
      paidAt: registration.paidAt,
      clientReference: registration.clientReference,
    })

  } catch (error) {
    console.error('Registration check error:', error)
    return NextResponse.json(
      { error: 'Failed to check registration' },
      { status: 500 }
    )
  }
}
