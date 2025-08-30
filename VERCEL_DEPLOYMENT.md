# Vercel Deployment Guide for DevnovateHub

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud MongoDB database at [mongodb.com/atlas](https://mongodb.com/atlas)
3. **GitHub Repository**: Push your code to a GitHub repository

## Deployment Steps

### 1. Prepare Environment Variables

Before deploying, you need to set up the following environment variables in Vercel:

#### Required Environment Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devnovatehub
JWT_SECRET=your_super_secure_jwt_secret_key_for_production
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app-name.vercel.app
UPLOAD_PATH=uploads
MAX_FILE_SIZE=5000000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ADMIN_EMAIL=admin@devnovatehub.com
ADMIN_PASSWORD=secure_admin_password
BCRYPT_ROUNDS=12
```

#### Optional Email Configuration:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts and set up environment variables

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install`

### 3. Configure Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Environment Variables"
3. Add all the environment variables listed above
4. Make sure to set the correct `FRONTEND_URL` to your Vercel app URL

### 4. MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for Vercel)
5. Get the connection string and update `MONGODB_URI`

## Important Notes

### File Uploads
- Vercel's serverless functions have limitations with file storage
- Consider using external storage services like:
  - **Cloudinary** for images
  - **AWS S3** for file storage
  - **Uploadcare** for file management

### Database Connections
- MongoDB Atlas is recommended for production
- Ensure your database allows connections from Vercel's IP ranges

### Performance Considerations
- Vercel functions have a 10-second execution limit for Hobby plans
- Consider upgrading to Pro plan for longer execution times
- Implement proper error handling and timeouts

## Troubleshooting

### Common Issues:

1. **Build Errors**: Check that all dependencies are in package.json
2. **Environment Variables**: Ensure all required variables are set
3. **Database Connection**: Verify MongoDB Atlas connection string
4. **CORS Issues**: Update FRONTEND_URL in environment variables

### Logs and Debugging:
- Check Vercel function logs in the dashboard
- Use `console.log` for debugging (visible in function logs)
- Monitor performance in Vercel Analytics

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Check file upload functionality
- [ ] Test admin features
- [ ] Verify email functionality (if configured)
- [ ] Check database connections
- [ ] Test responsive design on mobile devices

## Continuous Deployment

Vercel automatically deploys when you push to your main branch. For staging:

1. Create a `develop` branch
2. Set up a preview deployment
3. Test changes before merging to main

## Support

For issues specific to this deployment:
1. Check Vercel documentation
2. Review function logs
3. Verify environment variables
4. Test locally first

## Security Considerations

- Use strong JWT secrets
- Regularly rotate API keys
- Monitor for unusual activity
- Keep dependencies updated
- Use HTTPS only in production
