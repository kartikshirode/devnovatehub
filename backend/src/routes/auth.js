import express from 'express'
import { body } from 'express-validator'
import { 
  register, 
  login, 
  logout, 
  refreshToken, 
  forgotPassword, 
  resetPassword,
  verifyEmail,
  resendVerification,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validation.js'

const router = express.Router()

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
]

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
]

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
]

const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
]

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot be more than 500 characters'),
  body('socialLinks.website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('socialLinks.twitter')
    .optional()
    .matches(/^@?[\w]+$/)
    .withMessage('Please provide a valid Twitter username'),
  body('socialLinks.linkedin')
    .optional()
    .isURL()
    .withMessage('Please provide a valid LinkedIn URL'),
  body('socialLinks.github')
    .optional()
    .matches(/^[\w-]+$/)
    .withMessage('Please provide a valid GitHub username')
]

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
]

// Public routes
router.post('/register', registerValidation, validate, register)
router.post('/login', loginValidation, validate, login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword)
router.post('/reset-password', resetPasswordValidation, validate, resetPassword)
router.get('/verify-email/:token', verifyEmail)
router.post('/resend-verification', forgotPasswordValidation, validate, resendVerification)

// Protected routes
router.get('/profile', authenticate, getProfile)
router.put('/profile', authenticate, updateProfileValidation, validate, updateProfile)
router.put('/change-password', authenticate, changePasswordValidation, validate, changePassword)

export default router
