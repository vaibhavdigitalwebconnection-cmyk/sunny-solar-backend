import React from 'react';
import { motion } from 'framer-motion';
import { Particles } from '../../../components/ui/Particles';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { ImagesSlider } from '../../../components/ui/images-slider';
import { DiaTextReveal } from '@/registry/magicui/dia-text-reveal';

const HERO_IMAGES = [
  '/images/projects/dji-aerial-solar.webp',
  '/images/projects/project-rooftop-array.webp',
  '/images/projects/home-solar-brisbane.webp',
  '/images/projects/tesla-solar-roof.webp',
  '/images/projects/queensland-coastal-solar-home.webp',
  '/images/projects/sunny-solar-residential-dusk.webp',
  '/images/projects/homestead-overview.webp'
];

export const ProjectsHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden ">
      <ImagesSlider
        images={HERO_IMAGES}
        autoplay={true}
        direction="up"
        className="w-full pt-28 sm:pt-36 pb-16 sm:pb-20 min-h-145 sm:min-h-160"
        overlayClassName="bg-[#000000]/10"
      >
        {/* Ambient floating particles above slider */}
        <Particles
          className="absolute inset-0 z-10 opacity-35 pointer-events-none"
          quantity={35}
          color="#6F8EE7"
          size={0.6}
        />



        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center w-full">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 bg-[#2B3CB8]/10 border border-[#6F8EE7]/40 shadow-sm backdrop-blur-md mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white tracking-wide">Real South East Nationwide Rooftops</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-6xl mx-auto drop-shadow-md"
          >
            <DiaTextReveal
              text="Completed Solar & Battery Systems"
              colors={["#A97CF8", "#F38CB8", "#FDCC92"]}
              textColor="#ffffff"
              duration={1.5}
            />{' '}
            <DiaTextReveal
              text="Built to Last."
              colors={["#A97CF8", "#F38CB8", "#FDCC92"]}
              gradient="linear-gradient(90deg, #f97316, #fb923c, #fdba74)"
              textColor="#f97316"
              className="bg-linear-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent inline-block"
              duration={1.5}
              delay={0.35}
            />
          </motion.h1>

          {/* Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-white max-w-5xl mx-auto leading-relaxed font-normal drop-shadow-xs"
          >
            Inspect real rooftop and battery installations across australia, Gold Coast, and the Hinterland. Verified meter yields, unedited photos, and 100% in-house Master Electrician workmanship.
          </motion.p>

          
        </div>
      </ImagesSlider>
    </section>
  );
};

export default ProjectsHeroSection;

