import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/sections/header';
import Footer from './components/sections/footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesPage } from './pages/Services';
import { FeaturesPage } from './pages/Features';
import { ContactPage } from './pages/Contact';
import { PricingPage } from './pages/Pricing';
import { TeamPage } from './pages/Team';
import { TestimonialPage } from './pages/Testimonial';
import { BlogGridPage } from './pages/BlogGrid';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import { FloatingActions } from './components/FloatingActions';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/blog" element={<BlogGridPage />} />
          <Route path="/blog/:id" element={<BlogGridPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
        </Routes>
        <FloatingActions/>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
