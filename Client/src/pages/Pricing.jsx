import React from 'react';
import { PageHeader } from '../components/sections/page-header';
import Pricing from '../components/sections/pricing';

export function PricingPage() {
  return (
    <main>
      <PageHeader title="Pricing Plan" />
      <Pricing />
    </main>
  );
}
