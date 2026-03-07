import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Mail, Phone, Twitter, Facebook, Linkedin, Instagram, ChevronRight, Loader2
} from 'lucide-react';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Use API URL from environment
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/mail/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Successfully subscribed!',
        });
        setNewsletterEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Failed to subscribe. Please try again.',
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus({
        type: 'error',
        message: 'Network error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="w-full">
      <style>{`
        @keyframes dotSlide {
          0%   { left: 0px; opacity: 1; }
          100% { left: 130px; opacity: 1; }
        }
        .footer-line-wrap {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 130px;
          height: 3px;
        }
        .footer-line-blue {
          width: 130px;
          height: 3px;
          background: #06A3DA;
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .footer-line-dot {
          width: 7px;
          height: 7px;
          background: #091E3E;
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          left: 0;
          box-shadow: 0 0 0 2px #06A3DA;
          animation: dotSlide 1.4s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Main Footer */}
      <div className="bg-[#091E3E] text-white">
        <div className="container mx-auto px-0">
          <div className="flex flex-col lg:flex-row">

            {/* Brand + Newsletter */}
            <div className="w-full lg:w-1/3 bg-[#06A3DA] p-8 md:p-10 flex flex-col items-center text-center">
              <div className="mb-4">
                <Link to="/">
                  <img
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/Matapang3bg-1.png"
                    alt="Matapang Logo"
                    className="brightness-0 invert h-auto object-contain max-w-[200px] md:max-w-[240px]"
                  />
                </Link>
              </div>
              <p className="text-white mb-6 text-[15px] md:text-[17px] leading-relaxed">
                Innovative IoT solutions enhancing efficiency and strategic decision-making for forward-thinking enterprises.
              </p>
              <form className="w-full max-w-[350px]" onSubmit={handleNewsletterSubmit}>
                <div className="flex bg-white p-1 rounded-sm shadow-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your Email"
                    className="flex-grow px-3 py-2 text-[#091E3E] focus:outline-none text-[14px] md:text-[15px] min-w-0"
                    required
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#091E3E] text-white px-4 py-2 font-semibold text-[14px] md:text-[15px] transition-colors hover:bg-black whitespace-nowrap disabled:opacity-70 flex items-center justify-center min-w-[80px]"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
                {status.message && (
                  <div className={`mt-2 p-2 rounded text-xs text-center ${
                    status.type === 'success' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {status.message}
                  </div>
                )}
              </form>
            </div>

            {/* Get In Touch */}
            <div className="w-full lg:w-1/3 p-8 md:p-10 lg:pl-12">
              <div className="relative pb-3 mb-6">
                <h3 className="text-[18px] md:text-[22px] font-bold text-white">Get In Touch</h3>
                <div className="footer-line-wrap">
                  <span className="footer-line-blue"></span>
                  <span className="footer-line-dot"></span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-[#06A3DA] w-5 h-5 mr-3 mt-1 shrink-0" />
                  <p className="text-[14px] md:text-[16px] leading-relaxed opacity-90">
                    Innov8 Mantri Commercio, Tower-A, Outer Ring Road, Bellandur, Bangalore-560103.
                  </p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-[#06A3DA] w-5 h-5 mr-3 shrink-0" />
                  <a href="mailto:info@matapangtech.com" className="text-[14px] md:text-[16px] hover:text-[#06A3DA] transition-colors opacity-90 break-all">
                    info@matapangtech.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="text-[#06A3DA] w-5 h-5 mr-3 shrink-0" />
                  <a href="tel:+918248742297" className="text-[14px] md:text-[16px] hover:text-[#06A3DA] transition-colors opacity-90">
                    +91 8248742297
                  </a>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                {[
                  { Icon: Twitter, href: "#" },
                  { Icon: Facebook, href: "#" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/matapang-a-424b463a3/" },
                  { Icon: Instagram, href: "#" },
                ].map(({ Icon, href }, idx) => (
                  <a key={idx} href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel={href !== "#" ? "noopener noreferrer" : undefined}
                    className="w-8 h-8 bg-[#06A3DA]/20 border border-[#06A3DA]/30 flex items-center justify-center rounded-sm hover:bg-[#06A3DA] hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="w-full lg:w-1/3 p-8 md:p-10">
              <div className="relative pb-3 mb-6">
                <h3 className="text-[18px] md:text-[22px] font-bold text-white">Quick Links</h3>
                <div className="footer-line-wrap">
                  <span className="footer-line-blue"></span>
                  <span className="footer-line-dot"></span>
                </div>
              </div>
              <nav className="grid grid-cols-2 gap-y-3">
                {[
                  { label: "Home", path: "/" },
                  { label: "About", path: "/about" },
                  { label: "Services", path: "/services" },
                  { label: "Team", path: "/team" },
                  { label: "Blog", path: "/blog" },
                  { label: "Contact", path: "/contact" },
                ].map(({ label, path }) => (
                  <Link key={path} to={path}
                    className="flex items-center text-[14px] md:text-[16px] opacity-90 hover:text-[#06A3DA] transition-all"
                  >
                    <ChevronRight className="w-3 h-3 mr-1 text-[#06A3DA] shrink-0" /> {label}
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#061429] py-4 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60 text-[13px] md:text-[15px] mb-0">
            &copy; {new Date().getFullYear()}{' '}
            <Link to="/" className="text-white hover:text-[#06A3DA] transition-all">
              matapangtech.com
            </Link>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;