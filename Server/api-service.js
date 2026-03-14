// api/service.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mail API Services
export const mailAPI = {
  sendEmail: async (to, subject, text, html) => {
    const response = await fetch(`${API_BASE_URL}/mail/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, text, html }),
    });
    return await response.json();
  },

  submitContactForm: async (name, email, phone, message, service) => {
    const response = await fetch(`${API_BASE_URL}/mail/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message, service }),
    });
    return await response.json();
  },

  subscribe: async (email) => {
    const response = await fetch(`${API_BASE_URL}/mail/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  },
};

// Blog API Services
export const blogAPI = {
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`);
    return await response.json();
  },

  getPublishedPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/published`);
    return await response.json();
  },

  getPostById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`);
    return await response.json();
  },

  createPost: async (postData) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return await response.json();
  },

  updatePost: async (id, postData) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return await response.json();
  },

  deletePost: async (id) => {
    const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};

// Auth API Services
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  },

  signup: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  },
};