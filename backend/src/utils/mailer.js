import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Send email using Resend (Render-safe)
 */
export async function sendMail({ to, subject, html }) {
  try {
    await resend.emails.send({
      from: 'DataBridge HR <onboarding@resend.dev>', // VERIFIED sender
      to,
      reply_to: process.env.ADMIN_EMAIL, // replies come to YOU
      subject,
      html,
    })

    console.log('✅ Email sent to:', to)
  } catch (error) {
    console.error('❌ Email send failed:', error)
  }
}
