import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { m } from 'framer-motion';
import { Particles } from '../../../components/ui/Particles';
import { AnimatedShinyText } from '../../../components/ui/AnimatedShinyText';
import { SparklesText } from '../../../components/ui/SparklesText';
import { ThreeDMarquee } from '../../../components/ui/3d-marquee';

// 100% verified, local high-resolution solar imagery
const SOLAR_IMAGES = [
  '/images/projects/project-rooftop-array.webp',
  '/images/projects/clarity-existing-solar-battery.webp',
  '/images/projects/clarity-the-right-system.webp',
  '/images/projects/clarity-clear-choices.webp',
  '/images/projects/clarity-real-solar-expertise-consultation.webp',
  '/images/projects/clarity-beyond-installation-ev.webp',
  '/images/projects/home-solar-brisbane.webp',
  '/images/projects/homestead-overview.webp',
  '/images/projects/queensland-coastal-solar-home.webp',
  '/images/projects/dji-aerial-solar.webp',
  '/images/projects/bifacial-rows.webp',
  '/images/projects/tesla-solar-roof.webp',
  '/images/projects/sunny-solar-residential-dusk.webp',
  '/images/projects/ground-framework.webp',
  '/images/projects/ground-mount-array.webp',
  '/images/projects/panel-engineering.webp',
  '/images/projects/precision-torquing.webp',
  '/images/projects/project-aerial-perspective.webp',
  '/images/projects/project-cyclone-clamping.webp',
  '/images/projects/sunny-boy-inverter.webp',
  '/images/projects/3phase-gateway.webp',
  '/images/projects/photovoltaik-nk.webp',
  '/images/projects/pv-solar-thermal.webp',
  '/images/solutions/solar-kit.webp',
  '/images/solutions/net-metering.webp',
  '/images/solutions/battery-storage.jpg',
  '/images/solutions/engineers.webp',
];

export const FreeAssessmentHeroSection: React.FC = () => {
  return (
    <section className="relative bg-linear-to-b from-white  to-white pt-28  sm:pt-10 overflow-hidden">
      {/* Magic UI Ambient Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-35 pointer-events-none"
        quantity={24}
        color="#2B3CB8"
        size={0.6}
      />


      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-0 lg:pl-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* ── LEFT COLUMN: Content (Mobile: Bottom / Desktop: Left) ── */}
          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-5 xl:col-span-5 text-center lg:text-left pl-0 lg:pl-10 pb-10 lg:pb-0"
          >

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.28]">
              Get Your Free Solar Assessment{' '}
              <br className="hidden sm:inline" />
              <SparklesText
                sparklesCount={4}
                colors={{ first: '#2B3CB8', second: '#4658D9' }}
                className="inline text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold"
              >
                <span className="bg-linear-to-r from-[#2B3CB8] to-[#4658D9] bg-clip-text text-transparent">
                  & Engineering Quote
                </span>
              </SparklesText>
            </h1>

            {/* Concise Supporting Description */}
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
              Honest energy advice, high-resolution 3D LiDAR roof modeling, and guaranteed fixed pricing directly from licensed CEC solar electricians.
            </p>

            {/* Action CTA + Social Proof */}
            <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start">
              <a
                href="#assessment-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2B3CB8] hover:bg-[#2433A1] text-white font-semibold text-sm shadow-md shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Free Assessment Below</span>
                <ArrowRight className="w-4 h-4 animate-bounce" />
              </a>

            </div>
          </m.div>

          {/* ── RIGHT COLUMN: Full Width Continuous 3D Marquee (Mobile: Top / Desktop: Right) ── */}
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-7 xl:col-span-7 w-full relative"
          >
            {/* Full-width container using responsive height with zero outer/inner padding waste */}
            <div className="relative h-110 sm:h-130 lg:h-150 w-full overflow-hidden">
              {/* Subtle edge fades for seamless blending */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white via-white/70 to-transparent z-20" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/70 to-transparent z-20" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-25 bg-linear-to-r from-white via-white/80 to-transparent z-20" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white via-white/40 to-transparent z-20" />

              {/* Seamless, Continuously Running 3D Isometric Solar Marquee */}
              <ThreeDMarquee
                images={SOLAR_IMAGES}
                className="h-full w-full"
                scaleClassName="scale-[0.52] sm:scale-[0.68] lg:scale-[0.84] xl:scale-[0.94]"
              />


            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default FreeAssessmentHeroSection;
