// Import the Express app
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config({ path: '../backend/.env' })

// Create a simple Express app for Vercel
const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// Basic API route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DevnovateHub API',
    version: '1.0.0',
  })
})

// Catch-all for other API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path,
  })
})

module.exports = app
