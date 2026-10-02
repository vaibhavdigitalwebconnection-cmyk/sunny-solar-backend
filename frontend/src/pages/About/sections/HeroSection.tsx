import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FlipText } from '@/components/ui/FlipText';


export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-0 lg:min-h-160 mt-20 bg-white overflow-hidden">
      {/* Ambient solar blue backdrop aura */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left side — typography and Right side image */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-0 lg:min-h-155">
        {/* Mobile image card (Top on mobile) */}
        <div className="lg:hidden px-4 sm:px-8 pt-24 pb-2">
          <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-slate-900/10 border border-slate-200/80 aspect-16/10 xs:aspect-16/9 max-w-lg mx-auto">
            <img
              src="/images/about/gallery/hero-about.webp"
              alt="Sunny Solar installation crew on a rooftop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nationwide Master Electricians on site</span>
            </div>
          </div>
        </div>

        {/* Left content panel (Bottom on mobile, Left on desktop) */}
        <div className="relative z-20 flex items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 lg:pt-0 pb-10 sm:pb-12 lg:pb-0">
          <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs mt-2 sm:mt-4 lg:mt-20 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
              <span>MASTER ELECTRICIAN FOUNDED • EST. 2011</span>
            </div>

            {/* Main heading — animated with FlipText */}
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-slate-950 leading-[1.18] sm:leading-[1.08] font-serif font-bold text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <FlipText className="text-slate-950">
                Solar Advice You Can Trust.
              </FlipText>{' '}
              <FlipText className="text-[#2B3CB8]" delay={0.3}>
                Experience You Can Rely On.
              </FlipText>
            </motion.h1>

            {/* Narrative copy */}
            <motion.p
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal text-justify lg:text-left max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Founded by Master Electrician Trent Packer, Sunny Solar was built around a simple belief: choosing solar should feel clear, not complicated.
              With 14+ years of industry experience, Trent and the Sunny Solar team help homeowners understand their energy needs, compare their options and choose a solar solution that makes sense for their home.
            </motion.p>

            

            {/* Call to action buttons */}
            <motion.div
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                to="/get-started"
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center min-h-11.5 sm:min-h-12"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Your Solar Options →

              </Button>
              <Button
                to="/about/trent"
                variant="outline"
                size="md"
                className="w-full sm:w-auto justify-center min-h-11.5 sm:min-h-12"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Meet Trent Packer →
              </Button>
            </motion.div>

          </div>
        </div>

        {/* Right side — image with diagonal clip */}
        <div className="relative hidden lg:block">
          <div
            className="absolute inset-0"
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            <img
              src="/images/about/gallery/hero-about.webp"
              alt="Sunny Solar installation crew on a rooftop"
              className="w-full h-full object-fill"
            />
            <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-white/40" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
