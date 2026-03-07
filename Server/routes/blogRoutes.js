import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPublishedPosts,
} from '../models/blogModel.js';

const router = express.Router();

// GET /api/blog/posts - Get all blog posts
router.get('/posts', (req, res) => {
  try {
    const posts = getAllPosts();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// GET /api/blog/posts/published - Get published posts only
router.get('/posts/published', (req, res) => {
  try {
    const posts = getPublishedPosts();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching published posts:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// GET /api/blog/posts/:id - Get single blog post by ID
router.get('/posts/:id', (req, res) => {
  try {
    const post = getPostById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// POST /api/blog/posts - Create new blog post
router.post('/posts', (req, res) => {
  try {
    const { title, content, author, excerpt, featuredImage, category, tags, status } = req.body;
    
    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }
    
    const newPost = createPost({
      title,
      content,
      author,
      excerpt,
      featuredImage,
      category,
      tags,
      status,
    });
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// PUT /api/blog/posts/:id - Update existing blog post
router.put('/posts/:id', (req, res) => {
  try {
    const { title, content, author, excerpt, featuredImage, category, tags, status } = req.body;
    
    const updatedPost = updatePost(req.params.id, {
      title,
      content,
      author,
      excerpt,
      featuredImage,
      category,
      tags,
      status,
    });
    
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// DELETE /api/blog/posts/:id - Delete blog post
router.delete('/posts/:id', (req, res) => {
  try {
    const deleted = deletePost(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

export default router;
