@echo off

echo 🧪 Testing deployment configuration...

echo 📁 Checking if API directory exists...
if exist "api\index.js" (
    echo ✅ API entry point found
) else (
    echo ❌ API entry point missing
    exit /b 1
)

echo 📁 Checking if frontend build directory exists...
if exist "frontend\dist" (
    echo ✅ Frontend dist directory found
) else (
    echo ⚠️ Frontend dist directory not found - building...
    cd frontend
    call npm run build
    cd ..
)

echo 📁 Checking if frontend/dist/index.html exists...
if exist "frontend\dist\index.html" (
    echo ✅ Frontend build successful
) else (
    echo ❌ Frontend build failed
    exit /b 1
)

echo 🧪 Testing API locally...
cd api
call npm install
node -e "const app = require('./index.js'); console.log('✅ API loads successfully');"
cd ..

echo ✅ All checks passed! Ready for Vercel deployment.
echo.
echo Next steps:
echo 1. Commit and push your changes: git add . && git commit -m "Fix Vercel deployment" && git push
echo 2. Deploy to Vercel: vercel --prod
echo 3. Check https://your-project.vercel.app/api/health

pause
