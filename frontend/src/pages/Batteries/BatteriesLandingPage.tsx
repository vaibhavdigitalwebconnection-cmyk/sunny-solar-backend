import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { BatteriesHeroSection } from './sections/BatteriesHeroSection';
import { BatteryBenefitsSection } from './sections/BatteryBenefitsSection';
import { BatteryGridSection } from './sections/BatteryGridSection';
import { BatteryTechComparisonSection } from './sections/BatteryTechComparisonSection';
import { BatteryProcessSection } from './sections/BatteryProcessSection';

export const BatteriesLandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Helmet>
        <title>Home Solar Battery Storage Systems | Sunny Solar</title>
        <meta
          name="description"
          content="Store your excess daytime solar power for evening use and blackout protection. Tesla Powerwall, Sungrow, Enphase, and AlphaESS battery solutions."
        />
      </Helmet>
      {/* 1. Hero with Live Telemetry HUD, Trust Badges & Dual CTA */}
      <BatteriesHeroSection />

      {/* 2. Interactive 24-Hour Solar Storage Cycle & 4 Core Pillars */}
      <BatteryBenefitsSection />

      {/* 3. Sub-Solutions Grid (Solar Batteries, Solar + Battery Bundles, Battery Backup) */}
      <BatteryGridSection />

      {/* 4. Technical Comparison: Tesla vs Sungrow vs Enphase vs AlphaESS */}
      <BatteryTechComparisonSection />

      {/* 5. Master Electrician 4-Step Installation & AS/NZS 5139 Process */}
      <BatteryProcessSection />
    </div>
  );
};

export default BatteriesLandingPage;
