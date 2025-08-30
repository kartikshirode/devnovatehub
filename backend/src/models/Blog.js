import mongoose from 'mongoose'
import slugify from 'slugify'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [50, 'Content must be at least 50 characters']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'rejected', 'hidden'],
    default: 'draft',
    index: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  categories: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog.comments'
    },
    likes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      likedAt: {
        type: Date,
        default: Date.now
      }
    }],
    isEdited: {
      type: Boolean,
      default: false
    },
    editedAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0,
    index: true
  },
  readingTime: {
    type: Number, // in minutes
    default: 1
  },
  publishedAt: {
    type: Date,
    index: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  adminNotes: {
    type: String,
    maxlength: [500, 'Admin notes cannot be more than 500 characters']
  },
  rejectionReason: {
    type: String,
    maxlength: [500, 'Rejection reason cannot be more than 500 characters']
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  priority: {
    type: Number,
    default: 0,
    index: true
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogImage: String
  },
  analytics: {
    trendingScore: {
      type: Number,
      default: 0,
      index: true
    },
    engagementRate: {
      type: Number,
      default: 0
    },
    averageReadTime: {
      type: Number,
      default: 0
    },
    bounceRate: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Indexes for performance
blogSchema.index({ status: 1, publishedAt: -1 })
blogSchema.index({ author: 1, status: 1 })
blogSchema.index({ tags: 1, status: 1 })
blogSchema.index({ categories: 1, status: 1 })
blogSchema.index({ views: -1, status: 1 })
blogSchema.index({ 'analytics.trendingScore': -1, status: 1 })
blogSchema.index({ isFeatured: 1, priority: -1, publishedAt: -1 })

// Text index for search functionality
blogSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
  tags: 'text',
  categories: 'text'
}, {
  weights: {
    title: 10,
    excerpt: 5,
    tags: 3,
    categories: 2,
    content: 1
  }
})

// Virtuals
blogSchema.virtual('likeCount').get(function() {
  return this.likes?.length || 0
})

blogSchema.virtual('commentCount').get(function() {
  return this.comments?.length || 0
})

blogSchema.virtual('isLikedBy').get(function() {
  // This will be populated by the application logic
  return false
})

blogSchema.virtual('url').get(function() {
  return `/article/${this.slug}`
})

// Pre-save hooks
blogSchema.pre('save', function(next) {
  // Generate slug from title
  if (this.isModified('title') || this.isNew) {
    this.slug = this.generateUniqueSlug()
  }
  
  // Generate excerpt if not provided
  if (this.isModified('content') && !this.excerpt) {
    this.excerpt = this.generateExcerpt()
  }
  
  // Calculate reading time
  if (this.isModified('content')) {
    this.readingTime = this.calculateReadingTime()
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  
  // Update lastModified
  this.lastModified = new Date()
  
  next()
})

// Methods
blogSchema.methods.generateUniqueSlug = function() {
  let baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  })
  
  // Truncate if too long
  if (baseSlug.length > 50) {
    baseSlug = baseSlug.substring(0, 50).replace(/-$/, '')
  }
  
  return baseSlug
}

blogSchema.methods.generateExcerpt = function() {
  if (!this.content) return ''
  
  // Remove markdown and HTML, get plain text
  const plainText = this.content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n/g, ' ') // Replace newlines
    .trim()
  
  // Truncate to 150 characters
  if (plainText.length <= 150) return plainText
  return plainText.substring(0, 147).trim() + '...'
}

blogSchema.methods.calculateReadingTime = function() {
  if (!this.content) return 1
  
  const wordsPerMinute = 200
  const words = this.content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes)
}

blogSchema.methods.isLikedByUser = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString())
}

blogSchema.methods.toggleLike = function(userId) {
  const existingLikeIndex = this.likes.findIndex(
    like => like.user.toString() === userId.toString()
  )
  
  if (existingLikeIndex > -1) {
    // Unlike
    this.likes.splice(existingLikeIndex, 1)
    return false
  } else {
    // Like
    this.likes.push({ user: userId })
    return true
  }
}

blogSchema.methods.addComment = function(userId, content, parentCommentId = null) {
  const comment = {
    user: userId,
    content,
    parentComment: parentCommentId
  }
  
  this.comments.push(comment)
  return this.comments[this.comments.length - 1]
}

blogSchema.methods.updateTrendingScore = function() {
  const now = new Date()
  const publishedAt = this.publishedAt || this.createdAt
  const ageInHours = (now - publishedAt) / (1000 * 60 * 60)
  
  // Weights for different engagement metrics
  const LIKE_WEIGHT = 4
  const COMMENT_WEIGHT = 3
  const VIEW_WEIGHT = 0.15
  const HALF_LIFE_HOURS = 72 // 3 days
  
  // Calculate decay factor (exponential decay)
  const decay = Math.pow(0.5, ageInHours / HALF_LIFE_HOURS)
  
  // Calculate raw score
  const rawScore = (
    (this.likeCount * LIKE_WEIGHT) +
    (this.commentCount * COMMENT_WEIGHT) +
    (this.views * VIEW_WEIGHT)
  )
  
  // Apply decay and update
  this.analytics.trendingScore = rawScore * decay
  
  return this.analytics.trendingScore
}

// Static methods
blogSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug, status: 'published' })
    .populate('author', 'name email avatar bio')
    .populate('comments.user', 'name email avatar')
}

blogSchema.statics.findPublished = function(options = {}) {
  const { page = 1, limit = 10, sort = '-publishedAt' } = options
  
  return this.find({ status: 'published' })
    .populate('author', 'name email avatar bio')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-adminNotes -rejectionReason')
}

blogSchema.statics.findTrending = function(limit = 10) {
  return this.find({ status: 'published' })
    .populate('author', 'name email avatar bio')
    .sort({ 'analytics.trendingScore': -1, publishedAt: -1 })
    .limit(limit)
    .select('-adminNotes -rejectionReason')
}

blogSchema.statics.findFeatured = function(limit = 5) {
  return this.find({ status: 'published', isFeatured: true })
    .populate('author', 'name email avatar bio')
    .sort({ priority: -1, publishedAt: -1 })
    .limit(limit)
    .select('-adminNotes -rejectionReason')
}

blogSchema.statics.searchBlogs = function(query, options = {}) {
  const { page = 1, limit = 10, tags, categories } = options
  
  let searchQuery = {
    status: 'published',
    $text: { $search: query }
  }
  
  if (tags && tags.length > 0) {
    searchQuery.tags = { $in: tags }
  }
  
  if (categories && categories.length > 0) {
    searchQuery.categories = { $in: categories }
  }
  
  return this.find(searchQuery, { score: { $meta: 'textScore' } })
    .populate('author', 'name email avatar bio')
    .sort({ score: { $meta: 'textScore' }, publishedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-adminNotes -rejectionReason')
}

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
