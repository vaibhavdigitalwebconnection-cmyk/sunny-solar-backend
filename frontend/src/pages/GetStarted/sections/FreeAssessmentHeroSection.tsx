import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Particles } from '../../../components/ui/Particles';
import { DotPattern } from '../../../components/ui/DotPattern';
import { AnimatedShinyText } from '../../../components/ui/AnimatedShinyText';
import { SparklesText } from '../../../components/ui/SparklesText';

export const FreeAssessmentHeroSection: React.FC = () => {
  return (
    <section className="relative bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white pt-24 pb-14 border-b border-slate-200/80 overflow-hidden">
      {/* Magic UI Ambient Background Particles */}
      <Particles
        className="absolute inset-0 z-0 opacity-55"
        quantity={35}
        color="#2B3CB8"
        size={0.6}
      />
      {/* Magic UI DotPattern with Radial Mask */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1.2}
        glow={true}
        className="text-[#2B3CB8]/10 mask-[radial-gradient(ellipse_75%_65%_at_50%_45%,#000_25%,transparent_100%)]"
      />
      {/* Subtle ambient solar blue glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto text-center"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-linear-to-r from-blue-50 via-white to-blue-50 border border-[#D1DCF8] shadow-2xs mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B3CB8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B3CB8]" />
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#2B3CB8]" />
            <AnimatedShinyText shimmerWidth={130} className="font-bold text-[#2B3CB8]">
              100% Free Consultation • Zero Sales Pressure
            </AnimatedShinyText>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
            Get Your Free Solar Assessment{' '} <br />
            <SparklesText
              sparklesCount={5}
              colors={{ first: '#2B3CB8', second: '#4658D9' }}
              className="inline text-3xl sm:text-4xl lg:text-5xl font-serif font-bold"
            >
              <span className="bg-linear-to-r from-[#2B3CB8] to-[#4658D9] bg-clip-text text-transparent">
                & Engineering Quote
              </span>
            </SparklesText>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-900 leading-relaxed">
            Honest energy advice, high-resolution 3D roof analysis, and guaranteed fixed pricing. Speak directly with licensed solar electricians with zero sales pressure.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeAssessmentHeroSection;
