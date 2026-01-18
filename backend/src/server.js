import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Import routes
import jobsRoutes from './routes/jobs.routes.js'
import applicationsRoutes from './routes/applications.routes.js'
import contactRoutes from './routes/contact.routes.js'
import authRoutes, { adminRouter } from './routes/auth.routes.js'

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3001

/**
 * Middleware Configuration
 */
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})

/**
 * API Routes
 */
app.use('/api/jobs', jobsRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRouter)

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
})

/**
 * Start Server
 */
app.listen(PORT, () => {
    console.log(`
  ╔══════════════════════════════════════════╗
  ║   DataBridge Solutions API Server        ║
  ╠══════════════════════════════════════════╣
  ║   Status: Running                        ║
  ║   Port:   ${PORT}                            ║
  ║   Mode:   ${process.env.NODE_ENV || 'development'}                     ║
  ╚══════════════════════════════════════════╝
  `)
})

export default app
