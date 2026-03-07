import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Calendar, Tag, MessageSquare, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use API URL from environment
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/blog/posts/${id}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setPost(result.data);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Unable to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06A3DA] mx-auto mb-4"></div>
          <p className="text-[#6B6A75]">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-[#091E3E] mb-4">Post Not Found</h1>
          <p className="text-[#6B6A75] mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-[#06A3DA] text-white px-6 py-3 rounded hover:bg-[#091E3E] transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-[#06A3DA] hover:text-[#091E3E] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img 
              src={post.featuredImage || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop"} 
              alt={post.title} 
              className="w-full rounded mb-8"
            />
            
            <div className="flex items-center text-[#6B6A75] text-sm mb-6 space-x-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-[#06A3DA] mr-2" />
                <span>{post.author || 'Admin'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-[#06A3DA] mr-2" />
                <span>
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
                </span>
              </div>
              {post.category && (
                <div className="flex items-center">
                  <Tag className="w-5 h-5 text-[#06A3DA] mr-2" />
                  <span>{post.category}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-[#091E3E] text-4xl font-bold mb-6">{post.title}</h1>
            
            {post.excerpt && (
              <p className="text-xl text-[#6B6A75] italic mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            
            <div className="text-[#6B6A75] space-y-6 leading-relaxed text-lg whitespace-pre-line">
              {post.content}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
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
            <div className="bg-[#F8FBFF] p-8 rounded mb-8">
              <h4 className="text-[#091E3E] text-2xl font-bold mb-6 border-b pb-2">Categories</h4>
              <ul className="space-y-4">
                {["Smart Connectivity", "Innovative Solutions", "Reliable Support", "Seamless Integration", "Data Analytics"].map((cat, i) => (
                  <li key={i} className="flex justify-between items-center text-[#6B6A75] hover:text-[#06A3DA] cursor-pointer transition-colors">
                    <span>{cat}</span>
                    <span className="bg-white px-2 py-1 rounded text-sm">(12)</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#F8FBFF] p-8 rounded">
              <h4 className="text-[#091E3E] text-2xl font-bold mb-6 border-b pb-2">Recent Posts</h4>
              <div className="space-y-6">
                {[
                  { title: "The Future of Smart Connectivity", date: "Dec 28, 2025" },
                  { title: "Optimizing Utility Usage", date: "Dec 25, 2025" },
                  { title: "Condition Monitoring Basics", date: "Dec 22, 2025" }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded shrink-0"></div>
                    <div>
                      <h5 className="text-[#091E3E] font-bold text-sm hover:text-[#06A3DA] cursor-pointer leading-tight">
                        {item.title}
                      </h5>
                      <span className="text-[#6B6A75] text-xs">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
