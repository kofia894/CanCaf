import { NextRequest, NextResponse } from 'next/server'
import { writeClient, client } from '@/app/lib/sanity'

interface AttendanceRequest {
  fullName: string
  organisation: string
  email: string
  phone: string
}

export async function POST(request: NextRequest) {
  try {
    const body: AttendanceRequest = await request.json()
    const { fullName, organisation, email, phone } = body

    if (!fullName || !organisation || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if attendee already registered with this email
    const existing = await client.fetch(
      `*[_type == "attendance" && email == $email][0]{ _id, fullName }`,
      { email: normalizedEmail }
    )

    if (existing) {
      return NextResponse.json(
        { error: 'already_registered', fullName: existing.fullName },
        { status: 409 }
      )
    }

    const result = await writeClient.create({
      _type: 'attendance',
      fullName: fullName.trim(),
      organisation: organisation.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      registeredAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      id: result._id,
    })
  } catch (error) {
    console.error('Attendance registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register attendance' },
      { status: 500 }
    )
  }
}
