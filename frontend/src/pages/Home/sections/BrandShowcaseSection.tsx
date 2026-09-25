import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Award, Sun } from 'lucide-react';
import MorphText from '../../../components/ui/MorphText';
import { Button } from '../../../components/ui/Button';

export const BrandShowcaseSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-950 via-[#060c23] to-slate-950 text-white overflow-hidden border-y border-white/5">
      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-[#2B3CB8]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#D1DCF8] bg-[#2B3CB8]/30 border border-[#6F8EE7]/30 shadow-md mb-6 sm:mb-8 backdrop-blur-md">
          <Sun className="w-3.5 h-3.5 text-[#6F8EE7] animate-pulse" />
          <span>The Sunny Solar Standard • Queensland</span>
        </div>

        {/* Morphing Website Title Showcase */}
       

        {/* Credibility Metric Badges */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl">
          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm hover:border-white/20 transition-all">
            <ShieldCheck className="w-4 h-4 text-[#6F8EE7] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Master Electrician Installers</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm hover:border-white/20 transition-all">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">Tier-1 Approved Technology</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm hover:border-white/20 transition-all">
            <Award className="w-4 h-4 text-[#6F8EE7] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">25-Year Performance Warranty</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10">
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="lg"
            className="rounded-xl shadow-xl shadow-[#2B3CB8]/30 bg-[#2B3CB8] hover:bg-[#1D2984] text-white border-0 font-bold px-7 py-3.5 transition-all duration-300 hover:shadow-[#2B3CB8]/50 hover:-translate-y-0.5 text-sm sm:text-base justify-center min-h-[48px]"
            icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            Get Your Free Solar Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcaseSection;
