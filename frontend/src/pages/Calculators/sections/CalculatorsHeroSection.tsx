import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Sun
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const CalculatorsHeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-10 sm:pb-16 bg-linear-to-b from-[#2B3CB8]/10 via-[#2B3CB8]/5 to-white border-b border-slate-200/60 overflow-hidden">
      {/* Subtle ambient solar lighting glow */}
      <div className="absolute top-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Content Column (Top on mobile, Left on desktop) */}
          <div className="order-1 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Top Micro Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs max-w-full">
              <Calculator className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#2B3CB8] shrink-0" />
              <span className="truncate xs:whitespace-normal">Independent Energy Sizing Engine</span>
            </div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.18] sm:leading-[1.12]"
            >
              Interactive Solar & Battery{' '}
              <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
                Calculators & Sizing Tools.
              </span>
            </motion.h1>

            {/* Narrative Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="text-xs xs:text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Calculate estimated quarterly bill savings, ideal system capacity, battery payback horizons, and quote comparisons with transparent formulas built on real Queensland solar radiation data and network tariffs.
            </motion.p>

            {/* Guarantees / Trust Micro-list */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1 text-[11px] sm:text-xs text-slate-700 w-full max-w-md lg:max-w-none"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E8EDFB] text-[#2B3CB8] flex items-center justify-center shrink-0">
                  <Sun className="w-3 h-3" />
                </div>
                <span>4.8 – 5.4 SEQ Daily Peak Sun Hours</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#E8EDFB] text-[#2B3CB8] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span>100% Free • No Personal Info Needed</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full xs:w-auto pt-1 sm:pt-2"
            >
              <Button
                to="/calculators/solar-savings"
                variant="primary"
                size="md"
                className="w-full xs:w-auto font-bold shadow-md justify-center text-center text-xs sm:text-sm"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start with Solar Savings
              </Button>

              <Button
                to="/calculators/battery-savings"
                variant="outline"
                size="md"
                className="w-full xs:w-auto justify-center text-center font-semibold text-xs sm:text-sm"
                icon={<Calculator className="w-4 h-4 text-[#2B3CB8]" />}
              >
                Calculate Battery ROI
              </Button>
            </motion.div>

          </div>

          {/* Image Column (Bottom on mobile, Right on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="order-2 lg:order-2 lg:col-span-5 relative w-full"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-slate-950 group aspect-16/10 xs:aspect-4/3 max-w-lg mx-auto lg:max-w-none">
              <img
                src="/images/solutions/net-metering.jpg"
                alt="Solar and battery smart energy generation telemetry"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Bottom Status Strip */}
              <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between text-white text-[11px] sm:text-xs bg-slate-950/85 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-white/10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse shrink-0" />
                  <span className="font-semibold text-white truncate">CEC Certified Math</span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#D1DCF8] font-semibold shrink-0 ml-2">SEQ Irradiance</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section> 
  );
};

export default CalculatorsHeroSection;

