import React from 'react';
import { PageHeader } from '../components/sections/page-header';
import Services from '../components/sections/services';
import Testimonial from '../components/sections/testimonial';

export function ServicesPage() {
  return (
    <main>
      <PageHeader title="Services" />
      <Services />
      <Testimonial />
    </main>
  );
}
