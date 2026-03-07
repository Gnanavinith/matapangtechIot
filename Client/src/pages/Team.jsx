import React from 'react';
import { PageHeader } from '../components/sections/page-header';
import Team from '../components/sections/team';

export function TeamPage() {
  return (
    <main>
      <PageHeader title="Team Members" />
      <Team />
    </main>
  );
}
