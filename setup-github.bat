@echo off
echo Setting up DevnovateHub for GitHub...
echo.

echo [1/4] Initializing Git repository...
git init

echo [2/4] Adding all files...
git add .

echo [3/4] Creating initial commit...
git commit -m "Initial commit: DevnovateHub - Advanced Blogging Platform

- Complete MERN stack application
- React 18 + TypeScript frontend with Vite
- Node.js + Express + MongoDB backend
- Beautiful UI with Tailwind CSS and Framer Motion
- JWT authentication system
- Admin panel and content management
- Swagger API documentation
- Production-ready architecture"

echo [4/4] Repository ready for GitHub!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Add remote: git remote add origin https://github.com/yourusername/devnovatehub.git
echo 3. Push to GitHub: git push -u origin main
echo.
pause
