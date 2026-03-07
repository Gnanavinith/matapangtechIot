import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Header from '../components/sections/header';
import { PageHeader } from '../components/sections/page-header';
import { X } from 'lucide-react';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    excerpt: '',
    featuredImage: '',
    category: '',
    tags: '',
    status: 'published',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Redirect if not admin
  if (!isAdmin()) {
    navigate('/blog');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Use API URL from environment
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${API_URL}/blog/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/blog');
      } else {
        setError(result.message || 'Failed to create post');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <PageHeader title="Create New Blog Post" parentLink="/blog" parentLabel="Blog" />
      <div className="min-h-screen bg-gray-50 py-12 px-4 -mt-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#091E3E]">Create New Blog Post</h1>
          <button
            onClick={() => navigate('/blog')}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} className="text-[#091E3E]" />
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#091E3E] mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
              placeholder="Enter blog title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#091E3E] mb-2">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
              placeholder="Short description of the blog post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#091E3E] mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="12"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#091E3E] mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#091E3E] mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
                placeholder="e.g., IoT, Technology"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#091E3E] mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#091E3E] mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
              placeholder="IoT, Technology, Innovation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#091E3E] mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#06A3DA]"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#06A3DA] text-white font-bold py-3 rounded hover:bg-[#091E3E] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="flex-1 bg-gray-300 text-[#091E3E] font-bold py-3 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateBlog;
