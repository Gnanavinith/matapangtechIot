import React from 'react';
import { PageHeader } from '../components/sections/page-header';
import BlogGrid from '../components/sections/blog-grid';

export function BlogGridPage() {
  return (
    <main>
      <PageHeader title="Blog" subtitle="Blog" />
      <BlogGrid />
    </main>
  );
}
