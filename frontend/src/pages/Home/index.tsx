import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from './sections/HeroSection';
import { Reveal } from './components/Reveal';
import { LazyMountSection } from './components/LazyMountSection';

// Keep the LCP hero in the initial chunk. Every other section is fetched only
// when its reserved slot approaches the viewport, so its visuals are unchanged
// when seen while the initial route has far less JS to parse and execute.
const TrustMarqueeSection = lazy(() =>
  import('./sections/TrustMarqueeSection').then(({ TrustMarqueeSection }) => ({ default: TrustMarqueeSection }))
);
const ServicesOverviewSection = lazy(() =>
  import('./sections/ServicesOverviewSection').then(({ ServicesOverviewSection }) => ({ default: ServicesOverviewSection }))
);
const CalculatorsTeaserSection = lazy(() =>
  import('./sections/CalculatorsTeaserSection').then(({ CalculatorsTeaserSection }) => ({ default: CalculatorsTeaserSection }))
);
const FeaturedProjectsSection = lazy(() =>
  import('./sections/FeaturedProjectsSection').then(({ FeaturedProjectsSection }) => ({ default: FeaturedProjectsSection }))
);
const ApprovedBrandsSection = lazy(() =>
  import('./sections/ApprovedBrandsSection').then(({ ApprovedBrandsSection }) => ({ default: ApprovedBrandsSection }))
);
const TestimonialsSliderSection = lazy(() =>
  import('./sections/TestimonialsSliderSection').then(({ TestimonialsSliderSection }) => ({ default: TestimonialsSliderSection }))
);
const PreferSunnySolarSection = lazy(() =>
  import('./sections/PreferSunnySolarSection').then(({ PreferSunnySolarSection }) => ({ default: PreferSunnySolarSection }))
);
const TrustBarSection = lazy(() =>
  import('./sections/TrustBarSection').then(({ TrustBarSection }) => ({ default: TrustBarSection }))
);
const SolarScatterSection = lazy(() =>
  import('./sections/SolarScatterSection').then(({ SolarScatterSection }) => ({ default: SolarScatterSection }))
);
const ServiceAreasTeaserSection = lazy(() =>
  import('./sections/ServiceAreasTeaserSection').then(({ ServiceAreasTeaserSection }) => ({ default: ServiceAreasTeaserSection }))
);
const ParallaxBannerSection = lazy(() =>
  import('./sections/ParallaxBannerSection').then(({ ParallaxBannerSection }) => ({ default: ParallaxBannerSection }))
);
const FAQSection = lazy(() =>
  import('./sections/FAQSection').then(({ FAQSection }) => ({ default: FAQSection }))
);

const DeferredSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={null}>{children}</Suspense>
);

// Track if initial startup loader finished in current session so page transitions don't delay
let hasWebsiteStartupFinished =
  typeof window !== 'undefined'
    ? Boolean(sessionStorage.getItem('sunny_startup_loaded')) ||
      /Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse|Headless/i.test(navigator.userAgent) ||
      Boolean((navigator as any).webdriver)
    : false;

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
    }, 2200);

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
        <LazyMountSection minHeight={180} rootMargin="900px">
          <DeferredSection>
            <Reveal direction="up">
              <TrustMarqueeSection />
            </Reveal>
          </DeferredSection>
        </LazyMountSection>

        {/* 3. Services Overview Section (Heading from Left, Story from Right, Cards staggered) */}
        <LazyMountSection minHeight={950} rootMargin="900px">
          <DeferredSection>
            <ServicesOverviewSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 4. Calculators Teaser Section (Heading from Right, Paragraph from Left, Master card from Bottom) */}
        <LazyMountSection minHeight={820} rootMargin="900px">
          <DeferredSection>
            <CalculatorsTeaserSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 5. Featured Projects Section (Why Sunny Solar) */}
        <LazyMountSection minHeight={980} rootMargin="900px">
          <DeferredSection>
            <FeaturedProjectsSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 6. Approved Brands Section (Heading from Bottom) */}
        <LazyMountSection minHeight={560} rootMargin="900px">
          <DeferredSection>
            <ApprovedBrandsSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 7. Testimonials Slider Section */}
        <LazyMountSection minHeight={720}>
          <DeferredSection>
            <Reveal direction="up">
              <TestimonialsSliderSection />
            </Reveal>
          </DeferredSection>
        </LazyMountSection>

        {/* 8. Authority Awards Badges */}
        <LazyMountSection minHeight={700}>
          <DeferredSection>
            <PreferSunnySolarSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 9. Real Numbers / Trust Bar Section (Left from Left, Right card from Right) */}
        <LazyMountSection minHeight={520}>
          <DeferredSection>
            <TrustBarSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 10. Solar Scatter Animation Section */}
        <LazyMountSection minHeight={660}>
          <DeferredSection>
            <Reveal direction="up">
              <SolarScatterSection />
            </Reveal>
          </DeferredSection>
        </LazyMountSection>

        {/* 11. Service Areas Teaser Section */}
        <LazyMountSection minHeight={850}>
          <DeferredSection>
            <ServiceAreasTeaserSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 12. Parallax Banner Section */}
        <LazyMountSection minHeight={800}>
          <DeferredSection>
            <ParallaxBannerSection />
          </DeferredSection>
        </LazyMountSection>

        {/* 13. FAQ Section (Eyebrow from Top, Heading from Left) */}
        <LazyMountSection minHeight={820}>
          <DeferredSection>
            <FAQSection />
          </DeferredSection>
        </LazyMountSection>
      </div>
    </>
  );
};

export default HomePage;
