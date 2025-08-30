#!/bin/bash

echo "🚀 Starting Vercel deployment process..."

# Install dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install

# Build frontend
echo "🏗️ Building frontend..."
npm run build

echo "✅ Build complete! Ready for Vercel deployment."
echo ""
echo "Next steps:"
echo "1. Run 'vercel' command in the project root"
echo "2. Follow the prompts to deploy"
echo "3. Set up environment variables in Vercel dashboard"
