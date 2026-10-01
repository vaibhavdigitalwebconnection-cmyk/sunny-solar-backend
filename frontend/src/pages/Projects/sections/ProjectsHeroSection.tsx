import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { Particles } from '../../../components/ui/Particles';
import { NumberTicker } from '../../../components/ui/NumberTicker';

export const ProjectsHeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-10 bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white overflow-hidden ">
      {/* Magic UI Ambient Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-55"
        quantity={35}
        color="#2B3CB8"
        size={0.6}
      />
      {/* Background glow discs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
          <span className="animate-shiny-text font-bold">Real South East Nationwide Rooftops</span>
        </div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.12] max-w-4xl mx-auto"
        >
          Completed Solar & Battery Systems{' '}
          <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
            Built to Last.
          </span>
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-base sm:text-lg text-slate-700 max-w-6xl mx-auto leading-relaxed font-normal"
        >
          Inspect real rooftop and battery installations across australia, Gold Coast, and the Hinterland. Verified meter yields, unedited photos, and 100% in-house Master Electrician workmanship.
        </motion.p>

        {/* Key Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 "
        >
          <div className="p-4 text-center rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2B3CB8] block">
              <NumberTicker value={4200} />+
            </span>
            <span className="text-[11px] font-bold text-[#1D2984] uppercase tracking-wider mt-0.5 block">
              Systems Installed
            </span>
          </div>

          <div className="p-4 text-center rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2B3CB8] block">$3.4M+</span>
            <span className="text-[11px] font-bold text-[#1D2984] uppercase tracking-wider mt-0.5 block">
              Annual Client Savings
            </span>
          </div>

          <div className="p-4 text-center rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 block">
              <NumberTicker value={100} />%
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 block">
              In-House Tradesmen
            </span>
          </div>

          <div className="p-4 text-center rounded-xl bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2B3CB8] block">
              <NumberTicker value={4.98} decimalPlaces={2} />★
            </span>
            <span className="text-[11px] font-bold text-[#1D2984] uppercase tracking-wider mt-0.5 block">
              Google Rating (280+)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsHeroSection;
