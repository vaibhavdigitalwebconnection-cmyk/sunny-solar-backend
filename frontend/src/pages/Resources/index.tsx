import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { ResourcesHeroSection } from './sections/ResourcesHeroSection';
import { ResourcesGridSection } from './sections/ResourcesGridSection';
import { ResourcesAddBatterySection } from './sections/ResourcesAddBatterySection';
import { ResourcesCTASection } from './sections/ResourcesCTASection';

export const ResourcesLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <ScrollProgress />
      <Helmet>
        <title>Free Solar Guides, Checklists & Downloadable Resources | Sunny Solar</title>
        <meta
          name="description"
          content="Download free comprehensive buyer guides, battery decision matrices, and pre-purchase checklists for Nationwide homeowners."
        />
      </Helmet>
      {/* Section 1: Hero Section */}
      <ResourcesHeroSection />

      {/* Section 2: Recreated Resources Grid */}
      <ResourcesGridSection />

      {/* Section 3: Add Battery with Solar Showcase (No Calculator, Organic Photography & Highlights) */}
      <ResourcesAddBatterySection />

      {/* Section 4: Engineering Audit CTA & Guarantees */}
      <ResourcesCTASection />
    </div>
  );
};

export default ResourcesLandingPage;
