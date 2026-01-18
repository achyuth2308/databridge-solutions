import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Mail Transporter Configuration
 * Uses SMTP (Gmail / Outlook / custom SMTP)
 */
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true', // true for 465, false for others
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

/**
 * Send email helper
 * @param {Object} options
 */
export async function sendMail({ to, subject, html }) {
    try {
        await transporter.sendMail({
            from: `"DataBridge Solutions" <${process.env.MAIL_USER}>`,
            to,
            subject,
            html,
        })
    } catch (error) {
        console.error('Email send error:', error)
        // Email failure should NOT crash API
    }
}
