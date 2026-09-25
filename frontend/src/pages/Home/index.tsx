import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from './sections/HeroSection';
import { TrustMarqueeSection } from './sections/TrustMarqueeSection';
import { ServicesOverviewSection } from './sections/ServicesOverviewSection';
import { FeaturedProjectsSection } from './sections/FeaturedProjectsSection';
import { ApprovedBrandsSection } from './sections/ApprovedBrandsSection';
import { BrandShowcaseSection } from './sections/BrandShowcaseSection';
import { TrustBarSection } from './sections/TrustBarSection';
import { PreferSunnySolarSection } from './sections/PreferSunnySolarSection';
import { CalculatorsTeaserSection } from './sections/CalculatorsTeaserSection';
import { ParallaxBannerSection } from './sections/ParallaxBannerSection';
import { ServiceAreasTeaserSection } from './sections/ServiceAreasTeaserSection';
import { SolarScatterSection } from './sections/SolarScatterSection';
import { TestimonialsSliderSection } from './sections/TestimonialsSliderSection';
import { FAQSection } from './sections/FAQSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Sunny Solar | Quality Residential Solar & Battery Solutions Gold Coast & Brisbane</title>
        <meta
          name="description"
          content="Power your home with clean, reliable solar energy and smart battery storage. Master Electrician installed solar systems with 25-year warranty across South East Queensland."
        />
      </Helmet>
      {/* 1 */}
      <HeroSection />
      {/* 2 */}
      <TrustMarqueeSection />
      {/* 3 */}
      <ServicesOverviewSection />
      {/* 4 */}
      <CalculatorsTeaserSection />
      {/* 5 */}
      <FeaturedProjectsSection />
      {/* 6 */}
      <ApprovedBrandsSection />
     
      {/* 8 */}
      <ParallaxBannerSection />
      {/* 9 */}
      <TrustBarSection />
      {/* Authority Awards Badges (After Section 8) */}
      <PreferSunnySolarSection />
      {/* 4th from last: Solar Scatter Animation Section */}
      <SolarScatterSection />
      {/* 9 */}
      <ServiceAreasTeaserSection />
      {/* 10 */}
      <TestimonialsSliderSection />
      {/* 11 */}
      <FAQSection />
    </div>
  );
};

export default HomePage;
