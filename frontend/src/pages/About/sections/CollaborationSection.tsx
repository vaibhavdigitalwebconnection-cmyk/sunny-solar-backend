import React, { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
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
import goodweLogo from '../../../assets/brand/GOODWELOGO.webp';
import growattLogo from '../../../assets/brand/Growatt-Logo.webp';
import sigenergyLogo from '../../../assets/brand/Sigenergy.webp';
import alphaessLogo from '../../../assets/brand/alphaess.webp';
import foxLogo from '../../../assets/brand/fox.webp';
import solisLogo from '../../../assets/brand/solis.webp';
import sungrowLogo from '../../../assets/brand/sungrow-logo.webp';
import { BorderBeam } from '../../../components/ui/BorderBeam';
import { DotPattern } from '../../../components/ui/DotPattern';
import { AnimatedShinyText } from '../../../components/ui/AnimatedShinyText';
import { AnimatedGradientText } from '../../../components/ui/AnimatedGradientText';
import { SparklesText } from '../../../components/ui/SparklesText';
import { NumberTicker } from '../../../components/ui/NumberTicker';
import { Marquee } from '../../../components/ui/Marquee';

interface Partner {
  name: string;
  tagline: string;
  category: string;
  logo: string;
  beamFrom: string;
  beamTo: string;
  badge: string;
}

export const CollaborationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const partners: Partner[] = [
    {
      name: 'Sigenergy',
      tagline: 'Next-Gen 5-in-1 AI Inverter & Energy Storage',
      category: 'Smart Hybrid & EV Ready',
      logo: sigenergyLogo,
      beamFrom: '#2B3CB8',
      beamTo: '#38BDF8',
      badge: 'CEC Approved',
    },
    {
      name: 'GoodWe',
      tagline: 'Smart PV Inverters & High-Voltage Storage',
      category: 'Residential & Commercial',
      logo: goodweLogo,
      beamFrom: '#E11D48',
      beamTo: '#FB7185',
      badge: 'Tier-1 Hardware',
    },
    {
      name: 'Sungrow',
      tagline: 'Global Clean Power: High-Yield Inverters',
      category: 'BloombergNEF Tier-1',
      logo: sungrowLogo,
      beamFrom: '#F59E0B',
      beamTo: '#EA580C',
      badge: 'Top Reliability',
    },
    {
      name: 'Growatt',
      tagline: 'Smart Energy Solutions & ARK Batteries',
      category: 'Hybrid Solar & Battery',
      logo: growattLogo,
      beamFrom: '#059669',
      beamTo: '#10B981',
      badge: 'CEC Approved',
    },
    {
      name: 'Solis',
      tagline: 'Ultra-Reliable 5G/6G Solar Inverters',
      category: 'High-Efficiency PV',
      logo: solisLogo,
      beamFrom: '#2563EB',
      beamTo: '#60A5FA',
      badge: 'Tier-1 Rated',
    },
    {
      name: 'Fox ESS',
      tagline: 'Advanced All-in-One Energy Storage',
      category: 'Modular Lithium',
      logo: foxLogo,
      beamFrom: '#DC2626',
      beamTo: '#F97316',
      badge: 'AS/NZS Compliant',
    },
    {
      name: 'AlphaESS',
      tagline: 'Plug-and-Play Smart Home Battery Systems',
      category: 'Residential Storage',
      logo: alphaessLogo,
      beamFrom: '#D97706',
      beamTo: '#F59E0B',
      badge: 'CEC Approved',
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
          <m.div
            className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, x: -35 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
           

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
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal text-center lg:text-left max-w-2xl lg:max-w-none"
            >
              We reject cheap clearance hardware. Sunny Solar collaborates directly with certified Tier-1 innovators like{' '}
              <strong className="text-slate-950 font-semibold bg-linear-to-r from-blue-50 to-indigo-50/80 px-1.5 py-0.5 rounded border border-blue-100/80 inline-block shadow-2xs">Sigenergy</strong>,{' '}
              <strong className="text-slate-950 font-semibold bg-linear-to-r from-rose-50 to-red-50/80 px-1.5 py-0.5 rounded border border-rose-100/80 inline-block shadow-2xs">GoodWe</strong>,{' '}
              <strong className="text-slate-950 font-semibold bg-linear-to-r from-amber-50 to-orange-50/80 px-1.5 py-0.5 rounded border border-amber-100/80 inline-block shadow-2xs">Sungrow</strong>, and{' '}
              <strong className="text-slate-950 font-semibold bg-linear-to-r from-emerald-50 to-green-50/80 px-1.5 py-0.5 rounded border border-emerald-100/80 inline-block shadow-2xs">Growatt</strong> to deliver high-yield solar modules,
              smart hybrid inverters, and modular battery systems engineered to endure Australia&apos;s extreme summer heat,
              cyclonic winds, and coastal salt mist.
            </m.p>

            {/* CTAs */}
            <m.div
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
            </m.div>
          </m.div>

          {/* Right Column — Pure Tier-1 Brand Logos with Bottom-to-Top Infinite Sliding Animation */}
          <m.div
            className="lg:col-span-5 flex flex-col justify-center"
            initial={{ opacity: 0, x: 35 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Magic UI Stage Container */}
            <div className="relativeoverflow-hidden">
             

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

              

              {/* Vertical Marquee Track with Top/Bottom Fade Masks (Bottom-to-Top Sliding) */}
              <div className="relative h-110 sm:h-120 overflow-hidden rounded-xl mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <Marquee
                  vertical={true}
                  pauseOnHover={true}
                  repeat={3}
                  className="py-1 [--duration:28s] [--gap:0.875rem]"
                >
                  {partners.map((partner, idx) => (
                    <div
                      key={`${partner.name}-${idx}`}
                      className="group relative flex items-center justify-between gap-6 sm:gap-4 p-3 transition-all duration-300 overflow-hidden cursor-default w-full"
                    >
                      

                      {/* Radial Spotlight on Hover */}
                      <div className="pointer-events-none absolute inset-0 bg-radial from-[#2B3CB8]/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                      {/* Partner Logo */}
                      <div className="relative z-10 h-12 sm:h-20 flex p-1 items-center  justify-center max-w-37.5 sm:max-w-60 mx-auto w-auto">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-20 sm:max-h-50 max-w-35 sm:max-w-60 w-auto h-auto object-contain mix-blend-multiply transition-transform duration-400 ease-out group-hover:scale-108"
                        />
                      </div>

                    </div>
                  ))}
                </Marquee>
              </div>

              
            </div>
          </m.div>
        </div>

        {/* Bottom Industry Accreditations: Infinite Smooth Scrolling Marquee (Magic UI) */}
        <m.div
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
        </m.div>
      </div>
    </section>
  );
};

export default CollaborationSection;
