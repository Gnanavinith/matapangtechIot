import React from 'react';
import { Link } from 'react-router-dom';

export function PageHeader({ title, subtitle, image }) {
  const bgImage = image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop';
  
  return (
    <div 
      className="relative py-35 mb-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(9, 30, 62, 0.8), rgba(9, 30, 62, 0.8)), url("${bgImage}")` }}
    >
      <div className="container mx-auto px-4 lg:px-[48px] text-center relative z-10">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 animate-fade-in-down">{title}</h1>
        <div className="flex items-center justify-center space-x-2 text-white text-lg font-medium">
          <Link to="/" className="text-[#06A3DA] hover:text-white transition-colors duration-300">Home</Link>
          <span className="text-white opacity-60">/</span>
          <span className="opacity-90">{subtitle || title}</span>
        </div>
      </div>
    </div>
  );
}
