import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../../components/ui/ScrollProgress';
import { BlogHeroSection } from './sections/BlogHeroSection';
import { BlogFeaturedSection } from './sections/BlogFeaturedSection';
import { BlogGridSection } from './sections/BlogGridSection';

export const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <ScrollProgress />
      <Helmet>
        <title>Latest Solar News, Articles & Market Insights | Sunny Solar</title>
        <meta
          name="description"
          content="Stay up to date with renewable industry updates, Nationwide energy rebate news, and solar technology reviews."
        />
      </Helmet>
      {/* 1. News & Market Analysis Hero */}
      <BlogHeroSection />

      {/* 2. Top Featured Editorial Story */}
      <BlogFeaturedSection />

      {/* 3. Filterable Article Grid */}
      <BlogGridSection />
    </div>
  );
};

export default BlogPage;
