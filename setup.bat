@echo off
echo.
echo 🚀 Setting up DevnovateHub - Advanced Blogging Platform
echo ==================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not available.
    pause
    exit /b 1
)

echo.
echo 📦 Installing Backend Dependencies...
echo =====================================

REM Navigate to backend and install dependencies
cd backend
if not exist "package.json" (
    echo ❌ Backend package.json not found!
    pause
    exit /b 1
)

call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies!
    pause
    exit /b 1
)

REM Create .env file from example
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy .env.example .env
    echo ⚠️  Please update the .env file with your actual configuration values!
)

REM Create uploads directory
if not exist "uploads" mkdir uploads

echo ✅ Backend dependencies installed successfully!

echo.
echo 📦 Installing Frontend Dependencies...
echo ======================================

REM Navigate to frontend and install dependencies
cd ..\frontend
if not exist "package.json" (
    echo ❌ Frontend package.json not found!
    pause
    exit /b 1
)

call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies!
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed successfully!

echo.
echo ✅ DevnovateHub setup completed successfully!
echo.
echo 🚀 Quick Start:
echo ===============
echo.
echo 1. Start the backend server:
echo    cd backend
echo    npm run dev
echo.
echo 2. Start the frontend development server (in a new terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open your browser and visit:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:5000
echo.
echo 📚 Documentation:
echo ==================
echo - README.md - Complete project documentation
echo - backend\src\ - Backend API source code
echo - frontend\src\ - Frontend application source code
echo.
echo 🔧 Configuration:
echo ==================
echo - Update backend\.env with your MongoDB URI and other settings
echo - Modify frontend\src\lib\api.ts for API configuration
echo.
echo Happy coding! 🎉
echo.

cd ..
pause
