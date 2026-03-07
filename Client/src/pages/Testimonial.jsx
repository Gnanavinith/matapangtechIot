import React from 'react';
import { PageHeader } from '../components/sections/page-header';
import Testimonial from '../components/sections/testimonial';

export function TestimonialPage() {
  return (
    <main>
      <PageHeader title="Testimonial" />
      <Testimonial />
    </main>
  );
}
