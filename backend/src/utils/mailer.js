import { Resend } from 'resend'
import dotenv from 'dotenv'

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail({ to, subject, html }) {
    try {
        await resend.emails.send({
            from: 'DataBridge Solutions <no-reply@databridge.com>',
            to,
            subject,
            html,
        })
        console.log('Email sent to:', to)
    } catch (error) {
        console.error('Email send error:', error)
    }
}
