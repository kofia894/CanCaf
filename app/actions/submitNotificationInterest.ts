'use server'

import { writeClient, client } from '@/app/lib/sanity'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface NotificationInterestData {
  name: string
  email: string
  programme?: string
}

export interface SubmitNotificationInterestResult {
  success: boolean
  message: string
}

export async function submitNotificationInterest(
  formData: NotificationInterestData
): Promise<SubmitNotificationInterestResult> {
  try {
    // Check if email already exists for this programme
    const existingEntry = await client.fetch(
      `*[_type == "notificationInterest" && email == $email && programme == $programme][0]`,
      {
        email: formData.email.toLowerCase().trim(),
        programme: formData.programme || 'cgcpon-africa'
      }
    )

    if (existingEntry) {
      return {
        success: true,
        message: 'You are already on our notification list. We will notify you when applications open.',
      }
    }

    // Create the notification interest document in Sanity
    await writeClient.create({
      _type: 'notificationInterest',
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      programme: formData.programme || 'cgcpon-africa',
      submittedAt: new Date().toISOString(),
      notified: false,
    })

    // Send confirmation email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'CanCAF <onboarding@resend.dev>',
          to: formData.email.toLowerCase().trim(),
          subject: 'CGCPON Africa - Application Notification Confirmed',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #0F766E; padding: 24px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">CanCAF</h1>
              </div>
              <div style="padding: 32px; background-color: #f9fafb;">
                <h2 style="color: #18181b; margin-top: 0;">Hello ${formData.name},</h2>
                <p style="color: #52525b; line-height: 1.6;">
                  Thank you for your interest in the <strong>Cancer Genetic Counselling Certificate Programme for Oncology Nurses (CGCPON Africa)</strong>.
                </p>
                <p style="color: #52525b; line-height: 1.6;">
                  We have added you to our notification list. You will receive an email as soon as applications open for the next cohort.
                </p>
                <p style="color: #52525b; line-height: 1.6;">
                  In the meantime, you can learn more about the programme on our website.
                </p>
                <div style="text-align: center; margin: 32px 0;">
                  <a href="https://cancaf.org/programs/cgcp-on-africa"
                     style="background-color: #0F766E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 500; display: inline-block;">
                    Learn More About CGCPON Africa
                  </a>
                </div>
                <p style="color: #71717a; font-size: 14px; margin-top: 32px;">
                  Best regards,<br/>
                  The CanCAF Team
                </p>
              </div>
              <div style="background-color: #18181b; padding: 16px; text-align: center;">
                <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                  Cancer Care Africa Foundation (CanCAF)<br/>
                  Strengthening Cancer Care Across Africa
                </p>
              </div>
            </div>
          `,
        })
      } catch (emailError) {
        // Log but don't fail the whole operation if email fails
        console.error('Failed to send confirmation email:', emailError)
      }
    }

    return {
      success: true,
      message: 'Success! We will notify you when applications open.',
    }
  } catch (error) {
    console.error('Error submitting notification interest:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    }
  }
}
