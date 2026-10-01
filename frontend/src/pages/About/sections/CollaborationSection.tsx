import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Award,
  Sparkles,
  Flame,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import xsolaar from '../../../assets/xsolar.png';
import jinko from '../../../assets/jinkosolar.png';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { DotPattern } from '../../../components/ui/DotPattern';
import { AnimatedShinyText } from '../../../components/ui/AnimatedShinyText';
import { AnimatedGradientText } from '../../../components/ui/AnimatedGradientText';
import { SparklesText } from '../../../components/ui/SparklesText';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { Marquee } from '../../../components/ui/Marquee';

interface Partner {
  name: string;
  logo: string;
  beamFrom: string;
  beamTo: string;
}

export const CollaborationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const partners: Partner[] = [
    {
      name: 'SolaX Power',
      logo: xsolaar,
      beamFrom: '#2B3CB8',
      beamTo: '#6F8EE7',
    },
    {
      name: 'JinkoSolar',
      logo: jinko,
      beamFrom: '#1D2984',
      beamTo: '#38BDF8',
    },
  ];

  const accreditations = [
    { text: 'Clean Energy Council Approved', icon: ShieldCheck },
    { text: 'Tier-1 BloombergNEF Rated Hardware', icon: Award },
    { text: 'Sub-10ms Emergency Blackout Switching', icon: Zap },
    { text: 'N-Type TOPCon Cell Architecture', icon: Sparkles },
    { text: 'Tested for 42°C Nationwide Heat', icon: Flame },
    { text: 'Direct Manufacturer Warranty Backing', icon: ShieldCheck },
    { text: '30-Year Guaranteed Linear Output', icon: Award },
    { text: 'Australian Standard AS/NZS 5033 Compliant', icon: CheckCircle2 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 xs:py-16 sm:py-20 lg:py-24 bg-white overflow-hidden"
    >
      {/* Magic UI DotPattern Animated Background with Soft Radial Vignette */}
      <DotPattern
        width={24}
        height={24}
        cx={1}
        cy={1}
        cr={1.2}
        glow={true}
        className="text-[#2B3CB8]/12 mask-[radial-gradient(ellipse_75%_65%_at_50%_45%,#000_25%,transparent_100%)]"
      />

      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column — Narrative, Badges & Technical Value */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, x: -35 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow Badge with Magic UI AnimatedShinyText & Pulsing Radar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-linear-to-r from-[#F5F7FD] via-white to-[#F5F7FD] border border-[#D1DCF8] shadow-2xs mb-4 backdrop-blur-xs w-fit hover:border-[#2B3CB8]/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2B3CB8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B3CB8]" />
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2B3CB8]" />
              <AnimatedShinyText shimmerWidth={140} className="font-bold">
                Tier-1 Manufacturing Partnerships
              </AnimatedShinyText>
            </div>

            {/* Main Heading with Magic UI SparklesText & AnimatedGradientText */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.14] lg:leading-[1.08] text-center lg:text-left">
              Partnering with World-Class Manufacturers for{' '}
              <SparklesText
                sparklesCount={6}
                colors={{ first: '#2B3CB8', second: '#38BDF8' }}
                className="inline text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold"
              >
                <AnimatedGradientText
                  speed={1}
                  colorFrom="#2B3CB8"
                  colorTo="#0284C7"
                  className="font-serif font-bold"
                >
                  Maximum Solar Yield &amp; Reliability
                </AnimatedGradientText>
              </SparklesText>
            </h2>

            {/* Narrative Copy with Elevated Brand Badges */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal text-center lg:text-left max-w-2xl lg:max-w-none"
            >
              We reject cheap clearance hardware. Sunny Solar collaborates directly with global Tier-1 pioneers like{' '}
              <strong className="text-slate-950 font-semibold bg-linear-to-r from-blue-50 to-indigo-50/80 px-1.5 py-0.5 rounded border border-blue-100/80 inline-block shadow-2xs">SolaX Power</strong> and{' '}
              <strong className="text-slate-950 font-semibold bg-linear-to-r from-sky-50 to-blue-50/80 px-1.5 py-0.5 rounded border border-sky-100/80 inline-block shadow-2xs">JinkoSolar</strong> to deliver high-yield N-Type TOPCon
              solar modules and smart hybrid inverters engineered to endure Australia&apos;s extreme summer heat,
              cyclonic winds, and coastal salt mist.
            </motion.p>



            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-7 sm:mt-8 flex  items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full xs:w-auto"
            >
              <Button
                to="/solar/systems"
                variant="primary"
                size="md"
                className="group relative w-full xs:w-auto text-center shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer overflow-hidden"
              // icon={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Explore Tier-1 Systems
              </Button>
              <Button
                to="/resources/buying-checklist"
                variant="outline"
                size="md"
                className="w-full xs:w-auto text-center bg-white/80 backdrop-blur-xs hover:bg-slate-50 hover:border-[#2B3CB8]/40 transition-all cursor-pointer shadow-2xs"
              >
                View Quality Checklist
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column — Pure Tier-1 Brand Logos with Magic UI BorderBeam & Stage Illumination */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            initial={{ opacity: 0, x: 35 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Magic UI Stage Container */}
            <div className="relative p-5  overflow-hidden">
              {/* Radiant Ambient Flares */}
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#2B3CB8]/12 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

              {/* Inner Subtle Dot Pattern */}
              <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1.1}
                glow={false}
                className="text-[#2B3CB8]/10 mask-[radial-gradient(ellipse_at_center,#000_40%,transparent_100%)]"
              />

              {/* Logo Cards Stack */}
              <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
                {partners.map((partner, idx) => (
                  <div
                    key={partner.name}
                    className="group relative flex items-center justify-center p-6 sm:p-8 rounded-xl bg-white/95 border border-[#D1DCF8]/80 shadow-xs hover:shadow-xl  hover:border-[#2B3CB8]/40 transition-all duration-400 overflow-hidden cursor-default"
                  >
                    {/* Magic UI BorderBeam Animated Orbiting Light */}
                    <BorderBeam
                      size={150}
                      duration={idx === 0 ? 8 : 10}
                      reverse={idx === 1}
                      colorFrom={partner.beamFrom}
                      colorTo={partner.beamTo}
                      borderWidth={1.5}
                    />

                    {/* Radial Spotlight on Hover */}
                    <div className="pointer-events-none absolute inset-0 bg-radial from-[#2B3CB8]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Partner Logo Only */}
                    <div className="relative z-10 h-16 sm:h-20 flex items-center justify-center w-full px-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-12 sm:max-h-25 max-w-57.5 sm:max-w-65 w-auto h-auto object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Industry Accreditations: Infinite Smooth Scrolling Marquee (Magic UI) */}
        <motion.div
          className="mt-14 sm:mt-18 pt-6 border-t border-slate-200/70"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Compliance &amp; Engineering Standards
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
              Nationwide Clean Energy Network
            </span>
          </div>

          <div className="relative overflow-hidden py-1 rounded-xl bg-slate-50/60 border border-slate-200/60 mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <Marquee pauseOnHover={true} className="py-2 [--duration:28s]">
              {accreditations.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs text-xs font-semibold text-slate-700 shrink-0"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationSection;
