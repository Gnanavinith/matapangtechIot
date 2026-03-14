import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { User, Calendar, ArrowRight, Edit, Trash2, Plus, Tag, MessageSquare, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Use API URL from environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BlogGrid = () => {
  const { id } = useParams(); // Get blog ID from URL if viewing single post
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Extract unique categories from posts
  const categories = [...new Set(posts.map(post => post.category).filter(Boolean))];
  
  // Get recent posts (excluding current post if viewing detail)
  const recentPosts = posts
    .filter(post => !id || (post._id !== id && post.id !== id))
    .slice(0, 5)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    // Fetch blog posts from backend API
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log('Fetching from:', `${API_URL}/blog/posts/published`);
        const response = await fetch(`${API_URL}/blog/posts/published`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);
        
        if (result.success) {
          setPosts(result.data);
          
          // If viewing a specific post, find it in the results
          if (id) {
            const post = result.data.find(p => p._id === id || p.id === id);
            if (post) {
              setSelectedPost(post);
            } else {
              // Fetch individual post if not in published list
              await fetchSinglePost(id);
            }
          }
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Unable to connect to server. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    const fetchSinglePost = async (postId) => {
      try {
        const response = await fetch(`${API_URL}/blog/posts/${postId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setSelectedPost(result.data);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Unable to load blog post');
      }
    };

    if (id) {
      fetchSinglePost(id);
    } else {
      fetchPosts();
    }
  }, [id]);

  // If viewing a specific post, show detail view
  if (selectedPost) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedPost(null);
              navigate('/blog');
            }}
            className="inline-flex items-center gap-2 text-[#06A3DA] hover:text-[#091E3E] transition-colors mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <img 
                src={selectedPost.featuredImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop"} 
                alt={selectedPost.title} 
                className="w-full rounded mb-8"
              />
              
              <div className="flex items-center text-[#6B6A75] text-sm mb-6 space-x-6">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-[#06A3DA] mr-2" />
                  <span>{selectedPost.author || 'Admin'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-[#06A3DA] mr-2" />
                  <span>
                    {selectedPost.createdAt ? new Date(selectedPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
                  </span>
                </div>
                {selectedPost.category && (
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-[#06A3DA] mr-2" />
                    <span>{selectedPost.category}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-[#091E3E] text-4xl font-bold mb-6">{selectedPost.title}</h1>
              
              {selectedPost.excerpt && (
                <p className="text-xl text-[#6B6A75] italic mb-6 leading-relaxed">
                  {selectedPost.excerpt}
                </p>
              )}
              
              <div className="text-[#6B6A75] space-y-6 leading-relaxed text-lg whitespace-pre-line">
                {selectedPost.content}
              </div>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-[#F8FBFF] text-[#06A3DA] px-3 py-1 rounded text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories - Only show if categories exist */}
              {categories.length > 0 && (
                <div className="bg-[#F8FBFF] p-8 rounded mb-8">
                  <h4 className="text-[#091E3E] text-2xl font-bold mb-6 border-b pb-2">Categories</h4>
                  <ul className="space-y-4">
                    {categories.map((cat, i) => (
                      <li key={i} className="flex justify-between items-center text-[#6B6A75] hover:text-[#06A3DA] cursor-pointer transition-colors">
                        <span>{cat}</span>
                        <span className="bg-white px-2 py-1 rounded text-sm">
                          ({posts.filter(p => p.category === cat).length})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Recent Posts - Only show if recent posts exist */}
              {recentPosts.length > 0 && (
                <div className="bg-[#F8FBFF] p-8 rounded">
                  <h4 className="text-[#091E3E] text-2xl font-bold mb-6 border-b pb-2">Recent Posts</h4>
                  <div className="space-y-6">
                    {recentPosts.map((post, i) => (
                      <div key={i} className="flex space-x-4 cursor-pointer hover:opacity-80" onClick={() => {
                        setSelectedPost(post);
                        navigate(`/blog/${post._id || post.id}`);
                      }}>
                        <div 
                          className="w-20 h-20 bg-cover bg-center rounded shrink-0"
                          style={{ backgroundImage: `url(${post.featuredImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop'})` }}
                        ></div>
                        <div>
                          <h5 className="text-[#091E3E] font-bold text-sm hover:text-[#06A3DA] leading-tight line-clamp-2">
                            {post.title}
                          </h5>
                          <span className="text-[#6B6A75] text-xs">
                            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show grid view when no specific post is selected
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-[#06A3DA] font-bold uppercase tracking-widest mb-2">Latest Blog</h5>
          <h1 className="text-[#091E3E] text-4xl font-bold mb-4">Read The Latest Articles from Our Blog Post</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06A3DA] mx-auto mb-4"></div>
              <p className="text-[#6B6A75]">Loading blog posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded max-w-2xl mx-auto">
              <p className="font-semibold">Error Loading Posts</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Admin Controls */}
            {isAdmin() && (
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => navigate('/blog/create')}
                  className="flex items-center gap-2 bg-[#06A3DA] text-white px-6 py-3 rounded hover:bg-[#091E3E] transition-colors font-semibold"
                >
                  <Plus size={20} />
                  Create New Post
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div key={post.id || index} className="bg-[#F8FBFF] rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={post.featuredImage || `https://source.unsplash.com/random/800x600/?technology,${index}`} 
                    alt={`Blog post: ${post.title}`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 bg-[#06A3DA] text-white px-3 py-1 rounded text-sm font-semibold">
                    {post.category || 'IoT'}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-[#6B6A75] text-sm mb-4 space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-[#06A3DA] mr-1" />
                      {post.author || 'Admin'}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-[#06A3DA] mr-1" />
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
                    </div>
                  </div>
                  <h4 className="text-[#091E3E] text-xl font-bold mb-3 hover:text-[#06A3DA] transition-colors duration-300">
                    <Link to={`/blog/${post._id || post.id}`}>{post.title}</Link>
                  </h4>
                  <p className="text-[#6B6A75] mb-6 leading-relaxed">
                    {post.excerpt || post.content?.substring(0, 150) + '...' || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link to={`/blog/${post._id || post.id}`} className="flex items-center text-[#06A3DA] font-bold uppercase tracking-wider hover:text-[#091E3E] transition-colors duration-300">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    {isAdmin() && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/blog/edit/${post._id || post.id}`);
                          }}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit size={18} />
                          Edit
                        </button>
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            if (window.confirm('Are you sure you want to delete this post?')) {
                              try {
                                const response = await fetch(`${API_URL}/blog/posts/${post._id || post.id}`, {
                                  method: 'DELETE',
                                });
                                if (response.ok) {
                                  setPosts(posts.filter(p => p.id !== post.id));
                                }
                              } catch (err) {
                                console.error('Error deleting post:', err);
                              }
                            }
                          }}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
