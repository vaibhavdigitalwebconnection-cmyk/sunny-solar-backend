import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SplitFlapText from '../../../components/ui/SplitFlapText';
import { HeroForm } from '../components/HeroForm';
import { useIsMobile } from '../useIsMobile';
import { ANIMATION_CONFIG } from '../animationConfig';

const heroBgImage = '/hero-installer.webp';

export interface HeroSectionProps {
  /**
   * Controlled by page-load intro loader.
   * Hero animations initiate only when isLoaded is true.
   */
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded = true }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Slide distances: on mobile, reduced to 40px as requested
  const dist = isMobile ? ANIMATION_CONFIG.mobileDistance : ANIMATION_CONFIG.distance;

  // Staggered variants for left side elements with mixed directions:
  // 1. Eyebrow badge: from TOP
  const badgeVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : dist.down,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        delay: 0.1,
      },
    },
  };

  // 2. Headline: from LEFT
  const headlineVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : dist.left,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        delay: 0.24,
      },
    },
  };

  // 3. Subtext: from RIGHT (different direction, staggered)
  const subtextVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : dist.right,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        delay: 0.38,
      },
    },
  };

  // 4. CTA Buttons: from BOTTOM
  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : dist.up,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
        delay: 0.52,
      },
    },
  };

  return (
    <section className="relative min-h-145 lg:min-h-auto flex items-center overflow-hidden">
      {/* Full-width Responsive Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBgImage}
          alt="Sunny Solar Installation"
          className="w-full h-full object-cover object-center transition-transform duration-[2500ms] ease-out"
          style={{
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
            opacity: isLoaded ? 1 : 0.8,
            transition: 'transform 2.5s ease-out, opacity 2.5s ease-out',
          }}
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
        />

        {/* Ambient Contrast Overlay */}
        <div className="absolute inset-0 bg-black/55 sm:bg-linear-to-t sm:from-black/65 sm:via-black/30 sm:to-black/10" />

        {/* Dynamic ambient lighting orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute -top-24 right-1/4 w-125 h-125 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[130px] pointer-events-none"
        />
      </div>

      {/* Hero Content & Responsive Enquiry Form Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pt-28 sm:pt-36 lg:pt-48 pb-20 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Side: Headline + Subtext + CTA, each sliding in from different directions, staggered */}
          <div className="lg:col-span-6 text-left space-y-3.5 sm:space-y-4">
            {/* Top Micro Eyebrow Badge (from TOP) */}
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={badgeVariants}
              className="relative overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-slate-900/80 border border-white/20 backdrop-blur-md shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#ED4F11] animate-pulse shrink-0" />
              <span className="text-[#D1DCF8] font-bold">SOLAR • BATTERY •  </span>
              <span className="text-white font-bold">SMART ENERGY</span>
              <motion.span
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', repeatDelay: 2 }}
                className="absolute inset-0 w-1/3 h-full bg-linear-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
              />
            </motion.div>

            {/* Headline Block (from LEFT) */}
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={headlineVariants}
              className="space-y-2.5"
            >
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2] drop-shadow-md">
                Solar That Makes Sense For Your Home.
              </h1>

              <div className="pt-0.5 sm:pt-1 flex items-center">
                <div className="inline-flex max-w-full overflow-x-auto scrollbar-none py-1">
                  <SplitFlapText
                    words={[
                      'SOLAR MADE SIMPLE',
                      'CLEAN GREEN POWER',
                      'LOWER POWER BILLS',
                      'SMART BATTERY HUB',
                    ]}
                    flipDuration={0.12}
                    stagger={0.05}
                    cycleDelay={2600}
                    charset="alphanumeric"
                    flipsPerChar={6}
                    tileColor="#0B132B"
                    textColor="#FFFFFF"
                    tileRadius="clamp(4px, 0.7vw, 7px)"
                    gap="clamp(3px, 0.5vw, 6px)"
                    fontSize="clamp(16px, 3.2vw, 36px)"
                    loop
                    padTo={17}
                    className="shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* Subtext Block (from RIGHT, staggered) */}
            <motion.p
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={subtextVariants}
              className="text-xs sm:text-base text-justify text-slate-100 sm:text-white leading-relaxed max-w-lg drop-shadow-sm"
            >
              Your home, your energy use, your solar system. Understand what you need, compare your options, and get a solar solution designed around how you actually use electricity.
            </motion.p>

            {/* CTA Buttons Block (from BOTTOM) */}
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              variants={ctaVariants}
              className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.025, boxShadow: '0 12px 25px -4px rgba(43, 60, 184, 0.45)' }}
                whileTap={{ scale: 0.98 }}
                href="#hero-quote-form"
                className="relative overflow-hidden group inline-flex items-center justify-center gap-2 font-bold px-5 sm:px-6 py-2.5 rounded-lg bg-[#1D2984] text-white shadow-md transition-all text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">See Your Solar Options →</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.025, boxShadow: '0 12px 25px -4px rgba(43, 60, 184, 0.45)' }}
                whileTap={{ scale: 0.98 }}
                href="#hero-quote-form"
                className="relative overflow-hidden group inline-flex items-center justify-center gap-2 font-bold px-5 sm:px-6 py-2.5 rounded-lg bg-[#366A23]  text-white shadow-md transition-all text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10">Explore Solar & Battery →</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side: Enquiry FORM slides in from the far right (x: 200 -> 0) and settles */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-4 sm:mt-8 lg:mt-0">
            <HeroForm isLoaded={isLoaded} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
