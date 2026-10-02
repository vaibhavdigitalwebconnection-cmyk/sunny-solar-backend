import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { EVHeroSection } from './sections/EVHeroSection';
import { EVSolarFlowSimulatorSection } from './sections/EVSolarFlowSimulatorSection';
import { EVBentoFeaturesSection } from './sections/EVBentoFeaturesSection';
import { EVChargingLevelsSection } from './sections/EVChargingLevelsSection';
import { EVInteractiveCalculatorSection } from './sections/EVInteractiveCalculatorSection';
import { EVInstallationProcessSection } from './sections/EVInstallationProcessSection';
import { EVFAQSection } from './sections/EVFAQSection';
import { EVCTASection } from './sections/EVCTASection';

export const EVChargerPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgress />
      <Helmet>
        <title>Smart Solar EV Chargers (7.4kW & 22kW) | Sunny Solar Australia</title>
        <meta
          name="description"
          content="Charge your electric vehicle with 100% free rooftop solar power. Fast Level 2 (7.4kW & 22kW) smart wallbox chargers with automatic solar surplus tracking and dynamic load balancing."
        />
        <meta
          name="keywords"
          content="EV charger, solar EV charger, electric vehicle home charger, level 2 wallbox, 7.4kw charger, 22kw charger, solar surplus charging Australia, Sunny Solar"
        />
        <link rel="canonical" href="https://sunnysolar.com.au/ev-charger" />
      </Helmet>

      {/* 1. Hero with Live Telemetry, Particles, BorderBeam & Unbranded Hero Visual */}
      <EVHeroSection />

      {/* 2. Interactive Power Architecture & Live Solar Flow (Magic UI AnimatedBeam) */}
      <EVSolarFlowSimulatorSection />

      {/* 3. Bento Grid Features with Magic UI Spotlight Cards */}
      <EVBentoFeaturesSection />


      {/* 7. Master Electrician 4-Step Installation Workflow */}
      <EVInstallationProcessSection />

      {/* 8. Frequently Asked Questions Accordion */}
      <EVFAQSection />

   
    </div>
  );
};

export default EVChargerPage;
