@echo off
echo Starting DevnovateHub...
echo.

echo [1/2] Starting Backend Server...
start "DevnovateHub Backend" cmd /k "cd /d %~dp0backend && npm run dev"

echo [2/2] Starting Frontend Server...
start "DevnovateHub Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ✅ Both servers are starting...
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔗 Backend API: http://localhost:5000
echo 📖 API Docs: http://localhost:5000/api-docs
echo.
pause
