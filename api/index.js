// Main API endpoint
module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DevnovateHub API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
    },
    timestamp: new Date().toISOString(),
  })
}
