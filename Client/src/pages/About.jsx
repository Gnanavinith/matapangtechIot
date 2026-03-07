import React from 'react';
import { PageHeader } from '../components/sections/page-header';
import AboutSection from '../components/sections/about';

export function About() {
  return (
    <main>
      <PageHeader title="About Us" />
      <AboutSection />
    </main>
  );
}
