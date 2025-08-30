// API route handler for /api/auth
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// Auth endpoints
app.post('/login', (req, res) => {
  res.json({ 
    success: false, 
    message: 'Authentication not yet implemented in serverless deployment' 
  })
})

app.post('/register', (req, res) => {
  res.json({ 
    success: false, 
    message: 'Registration not yet implemented in serverless deployment' 
  })
})

app.post('/logout', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  })
})

module.exports = app
