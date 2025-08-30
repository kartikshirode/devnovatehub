# DevnovateHub - Advanced Blogging & Article Platform

A modern, feature-rich blogging and article platform built with the MERN stack, combining the best ideas from multiple blog platform concepts with stunning UI/UX and animations.

## 🚀 Features

### 🎨 Modern UI/UX
- **Stunning Design**: Modern, responsive design with smooth animations and transitions
- **Dark/Light Mode**: Toggle between themes with beautiful transitions
- **Gradient Elements**: Eye-catching gradients and modern visual elements
- **Mobile-First**: Fully responsive design optimized for all devices
- **ShadCN/UI Components**: Beautiful, accessible UI components

### 👤 User Features
- **Authentication**: Secure JWT-based authentication with email verification
- **Profile Management**: Comprehensive user profiles with customization options
- **Blog Creation**: Rich markdown editor with image upload capabilities
- **Draft System**: Save drafts and publish when ready
- **Social Features**: Like, comment, and share articles
- **Personal Dashboard**: Manage your articles, drafts, and profile

### 👨‍💼 Admin Features
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Content Moderation**: Approve, reject, hide, or delete articles
- **User Management**: Manage user accounts and permissions
- **Analytics**: View platform statistics and trending content
- **Bulk Actions**: Perform actions on multiple articles at once

### 📊 Advanced Features
- **Trending Algorithm**: Smart trending system based on likes, comments, views, and recency
- **Search & Filter**: Full-text search with advanced filtering options
- **Tag System**: Organize content with tags and categories
- **Image Upload**: Drag-and-drop image upload with optimization
- **SEO Optimization**: Meta tags, structured data, and SEO-friendly URLs
- **Performance**: Optimized for speed with lazy loading and caching

### 🛡️ Security & Performance
- **Rate Limiting**: Prevent abuse with smart rate limiting
- **Input Validation**: Comprehensive input validation and sanitization
- **Image Optimization**: Automatic image compression and optimization
- **Caching**: Redis caching for improved performance
- **Security Headers**: Comprehensive security headers and protection

## 🏗️ Project Structure

```
DevnovateHub/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and configurations
│   │   ├── stores/          # State management (Zustand)
│   │   ├── types/           # TypeScript type definitions
│   │   └── styles/          # Global styles and themes
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── config/          # Configuration files
│   └── package.json
├── shared/                   # Shared types and utilities
└── docs/                    # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **ShadCN/UI** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Query** for data fetching and caching
- **Zustand** for state management
- **React Hook Form** for form handling
- **React Markdown** for markdown rendering

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **Multer** for file uploads
- **Bcrypt** for password hashing
- **Helmet** for security headers
- **Rate Limiting** for API protection
- **Nodemailer** for email services

### DevOps & Tools
- **ESLint** + **Prettier** for code quality
- **TypeScript** for type safety
- **Git** for version control
- **Environment Variables** for configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Blogging & Article Platform"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devnovatehub
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:3000
   UPLOAD_PATH=uploads
   MAX_FILE_SIZE=5000000
   ```

5. **Start Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## 📱 Features Overview

### 🏠 Homepage
- Hero section with call-to-action
- Featured articles carousel
- Trending articles section
- Categories and tags
- Recent articles grid

### ✍️ Article Creation
- Rich markdown editor with live preview
- Image upload with drag-and-drop
- Tag management
- Save as draft or publish
- SEO optimization fields

### 📊 Admin Dashboard
- Content moderation queue
- User management
- Analytics and statistics
- Bulk content actions
- System settings

### 🔍 Search & Discovery
- Full-text search across all content
- Filter by categories, tags, authors
- Sort by relevance, date, popularity
- Advanced search operators

### 📈 Trending Algorithm
Smart trending calculation based on:
- Article likes (weight: 4x)
- Comments count (weight: 3x)
- Views count (weight: 0.15x)
- Recency decay (72-hour half-life)

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3B82F6 to #1D4ED8)
- **Secondary**: Purple gradient (#8B5CF6 to #7C3AED)
- **Accent**: Emerald (#10B981)
- **Neutral**: Gray scales for text and backgrounds

### Typography
- **Headings**: Inter font family
- **Body**: System font stack for optimal readability
- **Code**: Fira Code for code blocks

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Loading states with skeletons
- Micro-interactions for better UX

## 🔒 Security Features

- **Input Validation**: Comprehensive validation on both client and server
- **Rate Limiting**: Prevent API abuse
- **CORS Configuration**: Proper cross-origin resource sharing
- **Helmet.js**: Security headers and protection
- **JWT Security**: Secure token-based authentication
- **File Upload Security**: Type validation and size limits

## 📈 Performance Optimizations

- **Code Splitting**: Dynamic imports for route-based code splitting
- **Image Optimization**: Automatic image compression and WebP conversion
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Browser caching and API response caching
- **Bundle Optimization**: Tree shaking and minification

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the Devnovate community
- Inspired by modern blogging platforms
- UI components from ShadCN/UI
- Icons from Lucide React

---

**DevnovateHub** - Where ideas come to life! 🚀✨
