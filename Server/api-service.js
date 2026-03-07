// API Service for connecting frontend with backend server
// Import this file in your React components

const API_BASE_URL = 'http://localhost:5000/api';

// Mail API Services
export const mailAPI = {
  // Send email
  sendEmail: async (to, subject, text, html) => {
    const response = await fetch(`${API_BASE_URL}/mail/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, text, html }),
    });
    return await response.json();
  },

  // Submit contact form
  submitContactForm: async (name, email, phone, message) => {
    const response = await fetch(`${API_BASE_URL}/mail/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, message }),
    });
    return await response.json();
  },
};

// Blog API Services
export const blogAPI = {
  // Get all posts
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`);
    return await response.json();
  },

  // Get published posts
  getPublishedPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/published`);
    return await response.json();
  },

  // Get single post by ID
  getPostById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`);
    return await response.json();
  },

  // Create new post
  createPost: async (postData) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  },

  // Update post
  updatePost: async (id, postData) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  },

  // Delete post
  deletePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};

// Example usage in React components:
/*
import { mailAPI, blogAPI } from '../api/service';

// In your component:
const handleSubmitContact = async (e) => {
  e.preventDefault();
  const result = await mailAPI.submitContactForm(name, email, phone, message);
  if (result.success) {
    alert('Message sent successfully!');
  }
};

const loadBlogPosts = async () => {
  const result = await blogAPI.getPublishedPosts();
  if (result.success) {
    setPosts(result.data);
  }
};

const createNewPost = async () => {
  const result = await blogAPI.createPost({
    title: 'My Post',
    content: 'Content here...',
    status: 'published'
  });
  if (result.success) {
    alert('Post created!');
  }
};
*/
