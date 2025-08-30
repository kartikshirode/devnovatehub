import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

// Helper function to create and send token
const sendTokenResponse = async (user, statusCode, res, message = 'Success') => {
  const token = user.generateAuthToken()
  
  // Update last login
  user.lastLogin = new Date()
  await user.save({ validateBeforeSave: false })
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
  
  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          socialLinks: user.socialLinks,
          stats: user.stats,
          preferences: user.preferences
        },
        token
      }
    })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      })
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password
    })
    
    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken()
    await user.save()
    
    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken)
    
    sendTokenResponse(user, 201, res, 'User registered successfully. Please check your email for verification.')
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    
    // Find user and include password for comparison
    const user = await User.findByEmail(email).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }
    
    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated. Please contact support.'
      })
    }
    
    // Validate password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }
    
    sendTokenResponse(user, 200, res, 'Login successful')
  } catch (error) {
    next(error)
  }
}

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
}

// @desc    Get current logged in user
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('articles', 'title slug status publishedAt views likes comments')
    
    res.status(200).json({
      success: true,
      data: { user }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar, socialLinks, preferences } = req.body
    
    const updateFields = {}
    if (name !== undefined) updateFields.name = name
    if (bio !== undefined) updateFields.bio = bio
    if (avatar !== undefined) updateFields.avatar = avatar
    if (socialLinks !== undefined) updateFields.socialLinks = { ...req.user.socialLinks, ...socialLinks }
    if (preferences !== undefined) updateFields.preferences = { ...req.user.preferences, ...preferences }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true, runValidators: true }
    )
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    
    const user = await User.findById(req.user.id).select('+password')
    
    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }
    
    // Update password
    user.password = newPassword
    await user.save()
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address'
      })
    }
    
    // Generate reset token
    const resetToken = user.generatePasswordResetToken()
    await user.save({ validateBeforeSave: false })
    
    // TODO: Send password reset email
    // await sendPasswordResetEmail(user.email, resetToken)
    
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await User.findOne({
      _id: decoded.id,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    })
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      })
    }
    
    // Set new password
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    
    sendTokenResponse(user, 200, res, 'Password reset successful')
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      })
    }
    next(error)
  }
}

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await User.findOne({
      _id: decoded.id,
      emailVerificationToken: token
    })
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token'
      })
    }
    
    // Mark email as verified
    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    await user.save({ validateBeforeSave: false })
    
    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      })
    }
    next(error)
  }
}

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body
    
    const user = await User.findByEmail(email)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address'
      })
    }
    
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      })
    }
    
    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken()
    await user.save({ validateBeforeSave: false })
    
    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken)
    
    res.status(200).json({
      success: true,
      message: 'Verification email sent'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      })
    }
    
    sendTokenResponse(user, 200, res, 'Token refreshed successfully')
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }
    next(error)
  }
}
