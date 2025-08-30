#!/bin/bash

# DevnovateHub Setup Script
echo "🚀 Setting up DevnovateHub - Advanced Blogging Platform"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js v18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if MongoDB is running (optional check)
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is available"
else
    echo "⚠️  MongoDB not found. Please ensure MongoDB is installed and running."
fi

echo ""
echo "📦 Installing Backend Dependencies..."
echo "====================================="

# Navigate to backend and install dependencies
cd backend || exit 1

if [ ! -f "package.json" ]; then
    echo "❌ Backend package.json not found!"
    exit 1
fi

npm install

# Create .env file from example
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your actual configuration values!"
fi

# Create uploads directory
mkdir -p uploads
echo "✅ Backend dependencies installed successfully!"

echo ""
echo "📦 Installing Frontend Dependencies..."
echo "======================================"

# Navigate to frontend and install dependencies
cd ../frontend || exit 1

if [ ! -f "package.json" ]; then
    echo "❌ Frontend package.json not found!"
    exit 1
fi

npm install

echo "✅ Frontend dependencies installed successfully!"

echo ""
echo "🎨 Setting up Tailwind CSS and ShadCN/UI..."
echo "==========================================="

# Install shadcn/ui components
npx shadcn@latest init --yes
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add toast
npx shadcn@latest add alert

echo "✅ UI components installed successfully!"

echo ""
echo "🔧 Final Setup..."
echo "================="

# Navigate back to root
cd ..

echo "✅ DevnovateHub setup completed successfully!"
echo ""
echo "🚀 Quick Start:"
echo "==============="
echo ""
echo "1. Start the backend server:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "2. Start the frontend development server (in a new terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3. Open your browser and visit:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📚 Documentation:"
echo "=================="
echo "- README.md - Complete project documentation"
echo "- backend/src/ - Backend API source code"
echo "- frontend/src/ - Frontend application source code"
echo ""
echo "🔧 Configuration:"
echo "=================="
echo "- Update backend/.env with your MongoDB URI and other settings"
echo "- Modify frontend/src/lib/api.ts for API configuration"
echo ""
echo "Happy coding! 🎉"
