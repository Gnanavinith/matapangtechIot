import React, { useState } from 'react';
import { PageHeader } from '../components/sections/page-header';
import { MapPin, Phone, Mail, Send, ChevronDown, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
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

    try {
      await emailjs.send(
        'service_30opmx7',
        'template_uljya7m',
        {
          name: formData.name,
          email: formData.email,
          service: formData.subject || 'General Inquiry',
          message: `Phone: ${formData.phone}\n\n${formData.message}`,
        },
        '8xd-WGUEaxrhBsGCg'
      );

      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <PageHeader title="Contact Us" />
      
      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FBFE] p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#06A3DA] flex items-center justify-center rounded-full text-white mx-auto mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-[#091E3E] text-xl font-bold mb-4">Our Office</h4>
              <p className="text-[#6B6A75]">
                Innov8 Mantri Commercio - Bellandur,<br />
                Bangalore, Karnataka 560103
              </p>
            </div>

            <div className="bg-[#F8FBFE] p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#06A3DA] flex items-center justify-center rounded-full text-white mx-auto mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h4 className="text-[#091E3E] text-xl font-bold mb-4">Call Us</h4>
              <p className="text-[#6B6A75]">
                +91 8248742297<br />
                Mon - Sat: 9:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-[#F8FBFE] p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-[#06A3DA] flex items-center justify-center rounded-full text-white mx-auto mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h4 className="text-[#091E3E] text-xl font-bold mb-4">Email Us</h4>
              <p className="text-[#6B6A75]">
                info@matapangtech.com<br />
                support@matapangtech.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-lg shadow-xl border border-gray-100">
              <div className="mb-8">
                <h5 className="text-[#06A3DA] font-bold uppercase tracking-wider mb-2">Get In Touch</h5>
                <h2 className="text-[#091E3E] text-3xl font-extrabold">Have Any Questions?</h2>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full h-14 px-4 bg-[#F2F3F7] border-none rounded-md focus:ring-2 focus:ring-[#06A3DA] outline-none transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    className="w-full h-14 px-4 bg-[#F2F3F7] border-none rounded-md focus:ring-2 focus:ring-[#06A3DA] outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full h-14 px-4 bg-[#F2F3F7] border-none rounded-md focus:ring-2 focus:ring-[#06A3DA] outline-none transition-all"
                  />
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full h-14 px-4 bg-[#F2F3F7] border-none rounded-md focus:ring-2 focus:ring-[#06A3DA] outline-none appearance-none transition-all text-[#6B6A75]"
                    >
                      <option value="" disabled>Subject</option>
                      <option value="IoT Solutions">IoT Solutions</option>
                      <option value="Energy Efficiency">Energy Efficiency</option>
                      <option value="Production Monitoring">Production Monitoring</option>
                      <option value="Other Inquiry">Other Inquiry</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Message"
                  rows="5"
                  className="w-full p-4 bg-[#F2F3F7] border-none rounded-md focus:ring-2 focus:ring-[#06A3DA] outline-none transition-all resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#06A3DA] text-white font-bold rounded-md hover:bg-[#091E3E] transition-colors duration-300 flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-70"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {status.message && (
                  <div className={`p-3 rounded text-sm text-center ${status.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>

            {/* Google Map */}
            <div className="h-full min-h-[500px] rounded-lg overflow-hidden shadow-lg border-4 border-white">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.583025066601!2d77.6766073748408!3d12.934493387377508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13bc9414275f%3A0x6e2730623253b925!2sInnov8%20Mantri%20Commercio!5e0!3m2!1sen!2sin!4v1704021200000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
