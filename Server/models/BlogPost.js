import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [50000, 'Content cannot exceed 50000 characters']
  },
  author: {
    type: String,
    default: 'Admin',
    trim: true
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  featuredImage: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Index for better query performance
blogPostSchema.index({ status: 1, createdAt: -1 });
blogPostSchema.index({ category: 1, status: 1 });

// Virtual for URL slug
blogPostSchema.virtual('slug').get(function() {
  return this.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
});

// Method to get published posts only
blogPostSchema.statics.getPublished = function() {
  return this.find({ status: 'published' }).sort({ createdAt: -1 });
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
