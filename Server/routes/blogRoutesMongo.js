import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// GET /api/blog/posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// GET /api/blog/posts/published
router.get('/posts/published', async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// GET /api/blog/posts/:id
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// POST /api/blog/posts
router.post('/posts', async (req, res) => {
  try {
    const { title, content, author, excerpt, featuredImage, category, tags, status } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }
    const newPost = await BlogPost.create({ title, content, author, excerpt, featuredImage, category, tags, status });
    res.status(201).json({ success: true, message: 'Post created successfully', data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// PUT /api/blog/posts/:id
router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, author, excerpt, featuredImage, category, tags, status } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author, excerpt, featuredImage, category, tags, status },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post updated successfully', data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// DELETE /api/blog/posts/:id
router.delete('/posts/:id', async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

export default router;