import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import MorphText from '@/components/ui/MorphText';

export const ParallaxBannerSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center overflow-hidden bg-scroll md:bg-fixed"
      style={{
        backgroundImage: "url('/images/home/parallax-solar-home.webp')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Dark overlay with contrast for high readability on all screens */}
      <div className="w-full h-full min-h-[340px] sm:min-h-90 bg-black/65 flex items-center justify-center text-center py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle radial lighting accent */}
        <div className="absolute inset-0 bg-radial from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="max-w-4xl mx-auto relative z-20 space-y-4">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#D1DCF8] bg-[#2B3CB8]/40 border border-[#6F8EE7]/40 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#D1DCF8] animate-pulse" />
            <span>STILL FIGURING OUT SOLAR?</span>
          </div>

          {/* Headline */}
          <div className="w-full py-2">
          <MorphText
            words={['SUNNY SOLAR', 'CLEAN ENERGY', 'SMART BATTERY', 'LOWER BILLS']}
            interval={2800}
            fontSize="clamp(2.4rem, 7.5vw, 6.2rem)"
            textClassName="text-white drop-shadow-[0_4px_35px_rgba(43,60,184,0.5)] font-bold tracking-tight"
            subtext="Quality Residential Solar & Battery Systems Across South East Queensland"
            subtextClassName="text-slate-300 font-medium tracking-[0.18em] text-xs sm:text-sm max-w-2xl px-4 mt-6 sm:mt-8"
          />
        </div>

          {/* Supporting Copy */}
          <p className="mt-2 text-sm sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
            Solar, batteries, existing systems — there’s a lot to consider. Sunny Solar can help you work out what makes sense for your home and energy needs.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <Button
              to="/get-started/free-assessment"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto rounded-xl shadow-xl shadow-[#2B3CB8]/30 bg-[#2B3CB8] hover:bg-[#1D2984] text-white border-0 font-bold px-7 py-3.5 transition-all duration-300 hover:shadow-[#2B3CB8]/45 hover:-translate-y-0.5 text-sm sm:text-base justify-center min-h-[48px]"
              icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
            >
              Explore Your Solar Options
            </Button>

            <Button
              to="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-white/40 hover:border-white bg-white/10 hover:bg-white/20 text-white hover:text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-md min-h-[48px]"
              icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
            >
              Talk to Sunny Solar
            </Button>
          </div>

          {/* Small Reassurance Line */}
          <p className="pt-1 text-[11px] sm:text-xs text-slate-300/90 font-medium">
            No pressure. Just clear information to help you take the next step.
          </p>

        </div>
      </div>
    </section>
  );
};

export default ParallaxBannerSection;
