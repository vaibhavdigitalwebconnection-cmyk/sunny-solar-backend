import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from './sections/HeroSection';
import { Reveal } from './components/Reveal';
import { TrustMarqueeSection } from './sections/TrustMarqueeSection';
import { ServicesOverviewSection } from './sections/ServicesOverviewSection';
import { FeaturedProjectsSection } from './sections/FeaturedProjectsSection';
import { ApprovedBrandsSection } from './sections/ApprovedBrandsSection';
import { TrustBarSection } from './sections/TrustBarSection';
import { PreferSunnySolarSection } from './sections/PreferSunnySolarSection';
import { CalculatorsTeaserSection } from './sections/CalculatorsTeaserSection';
import { ParallaxBannerSection } from './sections/ParallaxBannerSection';
import { ServiceAreasTeaserSection } from './sections/ServiceAreasTeaserSection';
import { SolarScatterSection } from './sections/SolarScatterSection';
import { TestimonialsSliderSection } from './sections/TestimonialsSliderSection';
import { FAQSection } from './sections/FAQSection';

import { LazyMountSection } from './components/LazyMountSection';

// Track if initial startup loader finished in current session so page transitions don't delay
let hasWebsiteStartupFinished =
  typeof window !== 'undefined' ? Boolean(sessionStorage.getItem('sunny_startup_loaded')) : false;

export const HomePage: React.FC = () => {
  // Hero animations trigger when isLoaded is true.
  // Synchronizes with the existing WebsiteStartupLoader if active, or triggers immediately.
  const [isLoaded, setIsLoaded] = useState(hasWebsiteStartupFinished);

  useEffect(() => {
    if (hasWebsiteStartupFinished) {
      setIsLoaded(true);
      return;
    }

    const handleStartupFinish = () => {
      hasWebsiteStartupFinished = true;
      setIsLoaded(true);
    };

    window.addEventListener('website-startup-loader-finish', handleStartupFinish, { once: true });
    window.addEventListener('website-startup-loader-complete', handleStartupFinish, { once: true });

    // Fallback: If startup loader already passed or isn't active, activate animations promptly
    const fallbackTimer = setTimeout(() => {
      handleStartupFinish();
    }, 450);

    return () => {
      window.removeEventListener('website-startup-loader-finish', handleStartupFinish);
      window.removeEventListener('website-startup-loader-complete', handleStartupFinish);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sunny Solar | Quality Residential Solar & Battery Solutions Gold Coast & Brisbane</title>
        <meta
          name="description"
          content="Power your home with clean, reliable solar energy and smart battery storage. Master Electrician installed solar systems with 25-year warranty across South East Nationwide."
        />
      </Helmet>

      {/* overflow-x: clip prevents horizontal scrollbars without breaking position: sticky */}
      <div className="flex flex-col min-h-screen overflow-x-clip w-full relative">
        {/* 1. Hero Section (Left side staggered from mixed directions + Right side sliding form) */}
        <HeroSection isLoaded={isLoaded} />

        {/* 2. Trust Marquee Section */}
        <Reveal direction="up">
          <TrustMarqueeSection />
        </Reveal>

        {/* 3. Services Overview Section (Heading from Left, Story from Right, Cards staggered) */}
        <ServicesOverviewSection />

        {/* 4. Calculators Teaser Section (Heading from Right, Paragraph from Left, Master card from Bottom) */}
        <CalculatorsTeaserSection />

        {/* 5. Featured Projects Section (Why Sunny Solar) */}
        <FeaturedProjectsSection />

        {/* 6. Approved Brands Section (Heading from Bottom) */}
        <ApprovedBrandsSection />

        {/* 7. Testimonials Slider Section */}
        <LazyMountSection minHeight={720}>
          <Reveal direction="up">
            <TestimonialsSliderSection />
          </Reveal>
        </LazyMountSection>

        {/* 8. Authority Awards Badges */}
        <LazyMountSection minHeight={700}>
          <PreferSunnySolarSection />
        </LazyMountSection>

        {/* 9. Real Numbers / Trust Bar Section (Left from Left, Right card from Right) */}
        <LazyMountSection minHeight={520}>
          <TrustBarSection />
        </LazyMountSection>

        {/* 10. Solar Scatter Animation Section */}
        <LazyMountSection minHeight={660}>
          <Reveal direction="up">
            <SolarScatterSection />
          </Reveal>
        </LazyMountSection>

        {/* 11. Service Areas Teaser Section */}
        <LazyMountSection minHeight={850}>
          <ServiceAreasTeaserSection />
        </LazyMountSection>

        {/* 12. Parallax Banner Section */}
        <LazyMountSection minHeight={800}>
          <ParallaxBannerSection />
        </LazyMountSection>

        {/* 13. FAQ Section (Eyebrow from Top, Heading from Left) */}
        <LazyMountSection minHeight={820}>
          <FAQSection />
        </LazyMountSection>
      </div>
    </>
  );
};

export default HomePage;
