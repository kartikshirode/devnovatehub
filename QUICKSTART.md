# 🚀 DevnovateHub Quick Start Guide

Welcome to DevnovateHub! Follow these steps to get your blogging platform up and running.

## 📋 Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v5 or higher (running locally or MongoDB Atlas)
- **Git** (for version control)

## 🛠️ Installation

### Method 1: Automated Setup (Recommended)

**For Windows:**
```bash
./setup.bat
```

**For Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Method 2: Manual Setup

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env file with your MongoDB URI and other settings
   mkdir uploads
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Configuration (.env)

Edit `backend/.env` with your settings:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devnovatehub
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:3000

# File Upload
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5000000

# Admin Settings
ADMIN_EMAIL=admin@devnovatehub.com
ADMIN_PASSWORD=admin123
```

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/devnovatehub`

**Option 2: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string and update MONGODB_URI in .env

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

### Start Frontend Server (New Terminal)
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:3000

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/api/health

## 🔧 Development Commands

### Backend Commands
```bash
cd backend
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data (coming soon)
npm run lint     # Run ESLint
```

### Frontend Commands
```bash
cd frontend
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Features Overview

### ✅ Currently Available
- User authentication (register/login)
- JWT-based security
- MongoDB integration
- Modern UI with Tailwind CSS
- TypeScript support
- API documentation with Swagger

### 🚧 Coming Soon
- Blog creation and editing
- Admin dashboard
- Content moderation
- Trending algorithms
- Image uploads
- Comments system
- Search functionality
- Email notifications

## 📁 Project Structure

```
DevnovateHub/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities
│   │   └── types/        # TypeScript types
│   └── package.json
├── backend/               # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── config/       # Configuration
│   └── package.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

**2. MongoDB Connection Issues**
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity (for Atlas)

**3. Package Installation Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. TypeScript Errors**
```bash
# Run type checking
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

## 📚 API Documentation

Visit http://localhost:5000/api-docs for interactive API documentation.

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Blog Endpoints (Coming Soon)
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/:slug` - Get blog by slug
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Support

- 📧 Email: support@devnovatehub.com
- 🐛 Issues: GitHub Issues
- 📖 Documentation: README.md

## 🎉 You're All Set!

Your DevnovateHub blogging platform is ready for development. Start building amazing features!

Happy coding! 🚀✨
