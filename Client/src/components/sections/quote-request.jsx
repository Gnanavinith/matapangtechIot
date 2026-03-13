import React, { useState } from 'react';
import { Phone, Reply, ChevronDown, Loader2 } from 'lucide-react';

const QuoteRequest = () => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    // Use API URL from environment
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    console.log('Submitting to API URL:', API_URL);
    console.log('Form data:', formData);
    
    try {
      const response = await fetch(`${API_URL}/mail/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: '', service: formData.service, message: formData.message }),
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      
      if (result.success) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your quote request has been received. Our team will review your requirements and get back to you within 24 hours. A confirmation email has been sent to your inbox.' 
        });
        setFormData({ name: '', email: '', service: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message || 'Failed to send request. Please try again later.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Failed to send request. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="py-12 md:py-20 bg-white">
      <style>{`
        @keyframes dotSlide {
          0%   { left: 0px; opacity: 1; }
          100% { left: 130px; opacity: 1; }
        }
        .quote-line-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 130px;
          height: 4px;
        }
        .quote-line-blue {
          width: 130px;
          height: 4px;
          background: #06A3DA;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .quote-line-dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          left: 0;
          animation: dotSlide 1.4s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-[1320px]">
        <div className="flex flex-wrap -mx-4 md:-mx-6">

          {/* Left Side */}
          <div className="w-full lg:w-7/12 px-4 md:px-6 mb-10 lg:mb-0">
            <div className="relative pb-5 mb-8 md:mb-12">
              <h5 className="text-[1rem] md:text-[1.25rem] font-bold text-[#06A3DA] uppercase tracking-wider mb-2">
                Request A Quote
              </h5>
              <h1 className="text-[1.8rem] sm:text-[2.1rem] md:text-[2.5rem] font-extrabold text-[#091e3e] leading-tight mb-0">
                Need A Free Quote? Please Feel Free to Contact Us
              </h1>
              <div className="quote-line-wrap">
                <span className="quote-line-blue"></span>
                <span className="quote-line-dot"></span>
              </div>
            </div>

            <div className="flex flex-wrap mb-6 md:mb-8">
              <div className="w-full sm:w-1/2 flex items-center mb-4">
                <Reply className="text-[#06A3DA] w-6 h-6 mr-3 shrink-0" />
                <h5 className="text-[#091e3e] font-bold text-[0.95rem] md:text-[1.125rem] mb-0 normal-case tracking-normal">
                  Reply within 24 hours
                </h5>
              </div>
              <div className="w-full sm:w-1/2 flex items-center mb-4">
                <Phone className="text-[#06A3DA] w-5 h-5 mr-3 shrink-0" />
                <h5 className="text-[#091e3e] font-bold text-[0.95rem] md:text-[1.125rem] mb-0 normal-case tracking-normal">
                  24 hrs telephone support
                </h5>
              </div>
            </div>

            <p className="text-[#6b6a75] text-[0.9rem] md:text-[1rem] leading-[1.6] mb-6 md:mb-8">
              Get in touch with us for a personalized quote tailored to your needs. Our expert team is ready to help your business thrive with innovative solutions.
            </p>

            <div className="flex items-center mt-2">
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#06A3DA] flex items-center justify-center rounded-[2px] shrink-0">
                <Phone className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="ps-4">
                <h5 className="text-[#091e3e] font-bold text-[0.95rem] md:text-[1.125rem] mb-1 normal-case tracking-normal">
                  Call to ask any question
                </h5>
                <h4 className="text-[#06A3DA] font-bold text-[1.2rem] md:text-[1.5rem] mb-0 leading-none">
                  +91 8248742297
                </h4>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-5/12 px-4 md:px-6">
            <div className="bg-[#06A3DA] p-6 md:p-12 rounded-[2px] h-full flex flex-col justify-center shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full h-[50px] md:h-[55px] px-4 bg-[#f2f2f2] border-none text-[#6b6a75] focus:outline-none focus:ring-0 rounded-[2px] text-[0.9rem] md:text-base"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full h-[50px] md:h-[55px] px-4 bg-[#f2f2f2] border-none text-[#6b6a75] focus:outline-none focus:ring-0 rounded-[2px] text-[0.9rem] md:text-base"
                />
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full h-[50px] md:h-[55px] px-4 bg-[#f2f2f2] border-none text-[#6b6a75] appearance-none focus:outline-none focus:ring-0 rounded-[2px] text-[0.9rem] md:text-base"
                  >
                    <option value="" disabled hidden>Select A Service</option>
                    <option value="Internet of Things">Internet of Things</option>
                    <option value="Energy Efficiency">Energy Efficiency</option>
                    <option value="Production Monitoring System">Production Monitoring System</option>
                    <option value="MEP">MEP</option>
                    <option value="Lithium Ion Batteries">Lithium Ion Batteries</option>
                    <option value="IT Services">IT Services</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-[#6b6a75]" />
                  </div>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Message"
                  className="w-full p-4 bg-[#f2f2f2] border-none text-[#6b6a75] focus:outline-none focus:ring-0 rounded-[2px] resize-none text-[0.9rem] md:text-base"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 md:py-4 bg-[#091e3e] text-white font-bold text-[0.9rem] md:text-[1rem] uppercase tracking-wider rounded-[2px] hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending...</>
                  ) : 'Request A Quote'}
                </button>
                {status.message && (
                  <div className={`p-3 rounded text-sm text-center ${status.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuoteRequest;