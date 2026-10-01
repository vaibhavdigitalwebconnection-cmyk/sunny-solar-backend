import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SolarBatteriesHeroSection } from './sections/SolarBatteriesHeroSection';
import { SolarBatteriesCatalogSection } from './sections/SolarBatteriesCatalogSection';
import { SolarBatteriesRetrofitGuideSection } from './sections/SolarBatteriesRetrofitGuideSection';
import { SolarBatteriesSafetyStandardsSection } from './sections/SolarBatteriesSafetyStandardsSection';

export const SolarBatteriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Solar Battery Storage Options & Compatibility | Sunny Solar</title>
        <meta
          name="description"
          content="Compare premium home battery storage systems. AC-coupled and DC-coupled storage options tailored for South East Nationwide households."
        />
      </Helmet>
      {/* 1. Page Header */}
      <SolarBatteriesHeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* 2. Interactive Filter Tabs & Product Grid */}
        <SolarBatteriesCatalogSection />

        {/* 3. Retrofit Explainer Guide: AC vs DC Coupling */}
        <SolarBatteriesRetrofitGuideSection />

        {/* 4. AS/NZS 5139 Battery Safety Standards Callout */}
        <SolarBatteriesSafetyStandardsSection />


      </div>
    </div>
  );
};

export default SolarBatteriesPage;
