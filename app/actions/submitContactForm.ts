'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface SubmitContactFormResult {
  success: boolean
  message: string
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<SubmitContactFormResult> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
      }
    }

    // Send email to CanCAF team
    if (process.env.RESEND_API_KEY) {
      // Send notification to team
      await resend.emails.send({
        from: 'CanCAF Website <onboarding@resend.dev>',
        to: 'info@cancaf.org',
        replyTo: formData.email,
        subject: `Contact Form: ${formData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0F766E; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div style="padding: 32px; background-color: #f9fafb;">
              <h2 style="color: #18181b; margin-top: 0;">Message Details</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #71717a; width: 120px;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #18181b; font-weight: 500;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #18181b;">
                    <a href="mailto:${formData.email}" style="color: #0F766E;">${formData.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Phone:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #18181b;">
                    <a href="tel:${formData.phone}" style="color: #0F766E;">${formData.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #71717a;">Subject:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #18181b; font-weight: 500;">${formData.subject}</td>
                </tr>
              </table>

              <div style="margin-top: 24px;">
                <p style="color: #71717a; margin-bottom: 8px;">Message:</p>
                <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e4e4e7;">
                  <p style="color: #18181b; margin: 0; white-space: pre-wrap; line-height: 1.6;">${formData.message}</p>
                </div>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${formData.email}?subject=Re: ${encodeURIComponent(formData.subject)}"
                   style="background-color: #0F766E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 500; display: inline-block;">
                  Reply to ${formData.name}
                </a>
              </div>
            </div>
            <div style="background-color: #18181b; padding: 16px; text-align: center;">
              <p style="color: #a1a1aa; font-size: 12px; margin: 0;">
                This message was sent via the CanCAF website contact form.
              </p>
            </div>
          </div>
        `,
      })

      // Send confirmation to the user
      await resend.emails.send({
        from: 'CanCAF <onboarding@resend.dev>',
        to: formData.email,
        subject: 'Thank you for contacting CanCAF',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0F766E; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">CanCAF</h1>
            </div>
            <div style="padding: 32px; background-color: #f9fafb;">
              <h2 style="color: #18181b; margin-top: 0;">Hello ${formData.name},</h2>
              <p style="color: #52525b; line-height: 1.6;">
                Thank you for reaching out to Cancer Care Africa Foundation (CanCAF). We have received your message and will get back to you as soon as possible.
              </p>

              <div style="background-color: white; padding: 16px; border-radius: 8px; border: 1px solid #e4e4e7; margin: 24px 0;">
                <p style="color: #71717a; margin: 0 0 8px 0; font-size: 14px;">Your message:</p>
                <p style="color: #71717a; margin: 0 0 4px 0; font-size: 14px;"><strong>Subject:</strong> ${formData.subject}</p>
                <p style="color: #52525b; margin: 0; white-space: pre-wrap; font-size: 14px;">${formData.message}</p>
              </div>

              <p style="color: #52525b; line-height: 1.6;">
                In the meantime, feel free to explore our website to learn more about our programs and initiatives.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://cancaf.org"
                   style="background-color: #0F766E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 500; display: inline-block;">
                  Visit Our Website
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
                Strengthening Cancer Care
              </p>
            </div>
          </div>
        `,
      })
    }

    return {
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    }
  }
}
