import express from 'express';
import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// Middleware to check DB connection
const requireDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected. Please try again shortly.',
    });
  }
  next();
};

router.get('/posts', requireDB, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

router.get('/posts/published', requireDB, async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

router.get('/posts/:id', requireDB, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

router.post('/posts', requireDB, async (req, res) => {
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

router.put('/posts/:id', requireDB, async (req, res) => {
  try {
    const { title, content, author, excerpt, featuredImage, category, tags, status } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author, excerpt, featuredImage, category, tags, status },
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, message: 'Post updated successfully', data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

router.delete('/posts/:id', requireDB, async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

export default router;