@echo off

echo 🚀 Starting Vercel deployment process...

REM Install dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install

REM Build frontend
echo 🏗️ Building frontend...
call npm run build

cd ..

echo ✅ Build complete! Ready for Vercel deployment.
echo.
echo Next steps:
echo 1. Run 'vercel' command in the project root
echo 2. Follow the prompts to deploy
echo 3. Set up environment variables in Vercel dashboard

pause
