import { query } from '../config/db.js'
import { sendMail } from '../utils/mailer.js'


/**
 * Applications Controller
 * Handles job application submissions and management
 */

// Get all applications (admin only)
export async function getAllApplications(req, res) {
    try {
        const result = await query(
            `SELECT a.*, j.title as job_title
       FROM job_applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.created_at DESC`
        )
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching applications:', error)
        res.status(500).json({ message: 'Error fetching applications' })
    }
}

// Get application by ID
export async function getApplicationById(req, res) {
    try {
        const { id } = req.params
        const result = await query(
            `SELECT a.*, j.title as job_title
       FROM job_applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE a.id = $1`,
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Application not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching application:', error)
        res.status(500).json({ message: 'Error fetching application' })
    }
}

// Submit new application (public)
export async function createApplication(req, res) {
    try {
        const { jobId, name, email, phone, resumeUrl, coverLetter } = req.body

        // Validation
        if (!jobId || !name || !email || !phone || !resumeUrl) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        // Check if job exists
        const jobCheck = await query(
            'SELECT id FROM jobs WHERE id = $1',
            [jobId]
        )

        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' })
        }

        // Insert application
        const result = await query(
            `INSERT INTO job_applications 
             (job_id, name, email, phone, resume_url, cover_letter, status)
             VALUES ($1, $2, $3, $4, $5, $6, 'pending')
             RETURNING *`,
            [jobId, name, email, phone, resumeUrl, coverLetter]
        )

        res.status(201).json({
            message: 'Application submitted successfully',
            application: result.rows[0],
        })

    } catch (error) {
        // 🔴 DUPLICATE APPLICATION HANDLING
        if (error.code === '23505') {
            return res.status(409).json({
                message: 'You have already applied for this job',
            })
        }

        console.error('Error creating application:', error)
        res.status(500).json({ message: 'Error submitting application' })
    }
}

// Update application status (admin only)
export async function updateApplicationStatus(req, res) {
    try {
        const { id } = req.params
        const { status } = req.body

        const validStatuses = ['pending', 'reviewed', 'interviewed', 'hired', 'rejected']
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        // Update application
        const result = await query(
            `UPDATE job_applications
             SET status = $1
             WHERE id = $2
             RETURNING id, name, email, status, job_id`,
            [status, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Application not found' })
        }

        const application = result.rows[0]

        // Get job title
        const jobResult = await query(
            'SELECT title FROM jobs WHERE id = $1',
            [application.job_id]
        )

        const jobTitle = jobResult.rows[0]?.title || 'the position'

        // ===============================
        // EMAIL CONTENT BASED ON STATUS
        // ===============================

        let subject = null
        let html = null

        // ✅ Application Submitted
        if (status === 'pending') {
            subject = `Application Received – ${jobTitle}`
            html = `
                <p>Dear ${application.name},</p>
                <p>Thank you for applying for the position of <strong>${jobTitle}</strong> at <strong>DataBridge Solutions</strong>.</p>
                <p>We have successfully received your application. Our recruitment team is currently reviewing it.</p>
                <p>You will hear from us soon regarding the next steps.</p>
                <br/>
                <p>Best regards,<br/>DataBridge Solutions HR Team</p>
            `
        }

        // ✅ Interview Shortlisted
       if (status === 'interviewed') {
    const meetLink = process.env.GOOGLE_MEET_LINK

    subject = `Interview Invitation – ${jobTitle}`
    html = `
        <p>Dear ${application.name},</p>
        <p>We are pleased to inform you that you have been <strong>shortlisted for an interview</strong> for the role of <strong>${jobTitle}</strong>.</p>

        <p><strong>Interview Details:</strong></p>
        <ul>
            <li>Mode: Google Meet</li>
            <li>Meeting Link: <a href="${meetLink}">${meetLink}</a></li>
        </ul>

        <p>Our recruitment team will contact you shortly with the interview schedule.</p>
        <br/>
        <p>Best regards,<br/>DataBridge Solutions HR Team</p>
    `
}


        // ✅ Selected / Hired
        if (status === 'hired') {
            subject = `Congratulations! You’ve Been Selected – ${jobTitle}`
            html = `
                <p>Dear ${application.name},</p>
                <p>We are delighted to inform you that you have been <strong>selected</strong> for the role of <strong>${jobTitle}</strong> at <strong>DataBridge Solutions</strong>.</p>
                <p>Our HR team will contact you shortly with offer details and next steps.</p>
                <br/>
                <p>Congratulations and welcome to the team!</p>
                <br/>
                <p>Warm regards,<br/>DataBridge Solutions HR Team</p>
            `
        }

        // ❌ Rejected
        if (status === 'rejected') {
            subject = `Application Update – ${jobTitle}`
            html = `
                <p>Dear ${application.name},</p>
                <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at <strong>DataBridge Solutions</strong>.</p>
                <p>After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
                <p>We truly appreciate your effort and encourage you to apply again in the future.</p>
                <br/>
                <p>Wishing you success,<br/>DataBridge Solutions HR Team</p>
            `
        }

        // SEND EMAIL IF CONTENT EXISTS
        if (subject && html) {
            sendMail({
                to: application.email,
                subject,
                html,
            })
        }

        res.json({
            message: 'Application status updated successfully',
            application,
        })
    } catch (error) {
        console.error('Error updating application status:', error)
        res.status(500).json({ message: 'Error updating application status' })
    }
}
