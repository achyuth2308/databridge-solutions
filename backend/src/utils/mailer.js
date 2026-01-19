import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Send email using Resend (Render-safe)
 */
export async function sendMail({ to, subject, html }) {
    try {
        const result = await resend.emails.send({
            from: 'DataBridge Solutions <onboarding@resend.dev>',
            to,
            subject,
            html,
        })

        console.log('✅ Email sent:', result.id)
    } catch (error) {
        console.error('❌ Email send failed:', error)
    }
}
