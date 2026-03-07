import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Tag, MessageSquare } from 'lucide-react';

const BlogDetail = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop" 
              alt="Blog Detail" 
              className="w-full rounded mb-8"
            />
            
            <div className="flex items-center text-[#6B6A75] text-sm mb-6 space-x-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-[#06A3DA] mr-2" />
                <span>Admin</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-[#06A3DA] mr-2" />
                <span>Dec 30, 2025</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-[#06A3DA] mr-2" />
                <span>IoT Solutions</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-[#06A3DA] mr-2" />
                <span>5 Comments</span>
              </div>
            </div>
            
            <h1 className="text-[#091E3E] text-4xl font-bold mb-6">How IoT is Revolutionizing Industrial Maintenance</h1>
            
            <div className="text-[#6B6A75] space-y-6 leading-relaxed text-lg">
              <p>
                The industrial landscape is undergoing a massive transformation, driven by the integration of Internet of Things (IoT) technologies. One of the most significant impacts is seen in the realm of maintenance, where traditional reactive approaches are being replaced by proactive, data-driven strategies.
              </p>
              <p>
                At Matapang, our advanced IoT platform delivers real-time, condition-based monitoring for critical utilities and production equipment. This allows maintenance teams to identify potential issues before they escalate into costly failures, optimizing performance and boosting operational efficiency.
              </p>
              <blockquote className="border-l-4 border-[#06A3DA] bg-[#F8FBFF] p-8 italic text-[#091E3E] text-xl">
                "Condition-based monitoring is not just about catching failures; it's about understanding the health of your assets in real-time to make smarter decisions."
              </blockquote>
                <p>
                  By leveraging actionable analytics, businesses can move towards predictive maintenance, extending the lifespan of their equipment and ensuring continuous production. The future of industrial maintenance is connected, intelligent, and highly efficient.
                </p>
              </div>

              {/* Related Posts */}
              <div className="mt-16">
                <h3 className="text-[#091E3E] text-2xl font-bold mb-8 border-b pb-4">Related Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "The Future of Smart Connectivity in 2026",
                      date: "Dec 28, 2025",
                      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"
                    },
                    {
                      title: "Optimizing Utility Usage with Real-time Analytics",
                      date: "Dec 25, 2025",
                      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
                    }
                  ].map((post, i) => (
                    <div key={i} className="group">
                      <div className="relative overflow-hidden rounded mb-4 h-48">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div className="flex items-center text-[#6B6A75] text-xs mb-2">
                        <Calendar className="w-3 h-3 text-[#06A3DA] mr-1" />
                        {post.date}
                      </div>
                      <h4 className="text-[#091E3E] font-bold hover:text-[#06A3DA] transition-colors">
                        <Link to="/blog-detail">{post.title}</Link>
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
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
                ].map((post, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded shrink-0"></div>
                    <div>
                      <h5 className="text-[#091E3E] font-bold text-sm hover:text-[#06A3DA] cursor-pointer leading-tight">
                        {post.title}
                      </h5>
                      <span className="text-[#6B6A75] text-xs">{post.date}</span>
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
