import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { SolarLandingHeroSection } from './sections/landing/SolarLandingHeroSection';
import { SolarLandingBenefitsSection } from './sections/landing/SolarLandingBenefitsSection';
import { SolarLandingPackagesSection } from './sections/landing/SolarLandingPackagesSection';
import { SolarLandingProcessSection } from './sections/landing/SolarLandingProcessSection';

export const SolarLandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Helmet>
        <title>Residential Solar Systems & Installation | Sunny Solar</title>
        <meta
          name="description"
          content="High-performance residential solar systems engineered for Nationwide homes. Master Electrician installation, Tier-1 solar panels, and guaranteed energy savings."
        />
      </Helmet>
      <SolarLandingHeroSection />
      <SolarLandingBenefitsSection />
      <SolarLandingPackagesSection />
      <SolarLandingProcessSection />
    </div>
  );
};

export default SolarLandingPage;
