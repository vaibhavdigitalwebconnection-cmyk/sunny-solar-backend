import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { CalculatorsHeroSection } from './sections/CalculatorsHeroSection';
import { CalculatorsGridSection } from './sections/CalculatorsGridSection';
import { CalculatorsAddBatterySolarSection } from './sections/CalculatorsAddBatterySolarSection';

export const CalculatorsLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ScrollProgress />
      <Helmet>
        <title>Interactive Solar & Battery Calculators | Sunny Solar</title>
        <meta
          name="description"
          content="Free online estimation tools for Australian homeowners. Calculate solar savings, system size, payback periods, and battery requirements."
        />
      </Helmet>
      {/* 1. Page Hero with Quick Actions */}
      <CalculatorsHeroSection />

      {/* 2. Full Suite Calculators Grid */}
      <CalculatorsGridSection />

      {/* 3. Add Battery with Solar Synergy Showcase (Small Normal Container, Image & Non-Box Design) */}
      <CalculatorsAddBatterySolarSection />


    </div>
  );
};

export default CalculatorsLandingPage;
export * from './subpages';
