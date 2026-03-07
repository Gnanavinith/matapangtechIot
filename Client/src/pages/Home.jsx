import React from 'react';
import HeroCarousel from '../components/sections/hero-carousel';
import AboutSection from '../components/sections/about';
import Features from '../components/sections/features';
import Services from '../components/sections/services';
import QuoteRequest from '../components/sections/quote-request';

export function Home() {
  return (
    <main>
      <HeroCarousel />
      <AboutSection />
      <Features />
      <Services />
      <QuoteRequest />
    </main>
  );
}
