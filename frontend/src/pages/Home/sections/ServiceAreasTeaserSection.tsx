import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sun,
  BatteryCharging,
  Activity,
  TrendingUp,
  Calculator,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface StackedCard {
  id: string;
  displayNumber: string;
  badge: string;
  title: string;
  description: string;
  cta: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  colors: {
    bg: string;
    text: string;
    numberText: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    ctaBg: string;
    ctaText: string;
    border: string;
  };
  rotation: string;
}

const solutionCards: StackedCard[] = [
  {
    id: '01',
    displayNumber: '01+',
    badge: 'RESIDENTIAL SOLAR',
    title: 'Solar Power for Your Home',
    description:
      'Engineered solar systems tailored to your roof geometry, household load, and maximum quarterly bill reduction.',
    cta: 'Explore Solar Systems',
    link: '/solar',
    icon: Sun,
    colors: {
      bg: 'bg-[#F4F6F9]',
      text: 'text-slate-900',
      numberText: 'text-[#2B3CB8]',
      badgeBg: 'bg-[#2B3CB8]/10',
      badgeText: 'text-[#2B3CB8]',
      iconBg: 'bg-[#2B3CB8] text-white',
      ctaBg: 'bg-[#2B3CB8] hover:bg-[#1D2984] text-white',
      ctaText: 'text-white',
      border: 'border-slate-300/80',
    },
    rotation: '-rotate-1',
  },
  {
    id: '02',
    displayNumber: '02+',
    badge: 'ENERGY STORAGE',
    title: 'Home Battery Storage',
    description:
      'Store surplus daytime solar to power your home through evening peaks, eliminate grid reliance, and maintain power in outages.',
    cta: 'Explore Battery Storage',
    link: '/batteries',
    icon: BatteryCharging,
    colors: {
      bg: 'bg-[#346820]',
      text: 'text-white',
      numberText: 'text-white',
      badgeBg: 'bg-white/20',
      badgeText: 'text-white',
      iconBg: 'bg-white text-[#5EA434]',
      ctaBg: 'bg-white text-[#5EA434] hover:bg-slate-50',
      ctaText: 'text-[#5EA434]',
      border: 'border-[#70BB4E]/60',
    },
    rotation: 'rotate-[1.2deg]',
  },
  {
    id: '03',
    displayNumber: '03+',
    badge: 'SYSTEM AUDIT',
    title: 'Solar Health Check',
    description:
      'Diagnose underperforming panels, faulty inverters, shading losses, and safety hazards with an accredited technician audit.',
    cta: 'Book Solar Health Check',
    link: '/existing-solar/health-check',
    icon: Activity,
    colors: {
      bg: 'bg-[#ED4F11]',
      text: 'text-white',
      numberText: 'text-white',
      badgeBg: 'bg-white/20',
      badgeText: 'text-white',
      iconBg: 'bg-white text-[#FF6854]',
      ctaBg: 'bg-white text-[#FF6854] hover:bg-slate-50',
      ctaText: 'text-[#FF6854]',
      border: 'border-[#FF6854]/60',
    },
    rotation: '-rotate-[0.8deg]',
  },
  {
    id: '04',
    displayNumber: '04+',
    badge: 'SYSTEM EXPANSION',
    title: 'Solar & Inverter Upgrades',
    description:
      'Modernise older setups with additional high-wattage panels, retrofitted battery storage, or smart inverter technology.',
    cta: 'Explore System Upgrades',
    link: '/existing-solar/upgrade',
    icon: TrendingUp,
    colors: {
      bg: 'bg-[#187584]',
      text: 'text-white',
      numberText: 'text-white',
      badgeBg: 'bg-white/20',
      badgeText: 'text-white',
      iconBg: 'bg-white text-[#187584]',
      ctaBg: 'bg-white text-[#187584] hover:bg-slate-50',
      ctaText: 'text-[#187584]',
      border: 'border-[#187584]/60',
    },
    rotation: 'rotate-[1deg]',
  },
  {
    id: '05',
    displayNumber: '05+',
    badge: 'INTERACTIVE TOOLS',
    title: 'Know Your Solar Numbers',
    description:
      'Calculate quarterly savings, payback periods, battery sizing, and clean energy ROI before spending a single dollar.',
    cta: 'Launch Free Calculators',
    link: '/calculators',
    icon: Calculator,
    colors: {
      bg: 'bg-[#0E1648]',
      text: 'text-white',
      numberText: 'text-white',
      badgeBg: 'bg-white/15',
      badgeText: 'text-white',
      iconBg: 'bg-white text-[#222426]',
      ctaBg: 'bg-white text-[#222426] hover:bg-slate-50',
      ctaText: 'text-[#222426]',
      border: 'border-white/10',
    },
    rotation: '-rotate-[0.5deg]',
  },
];

export const ServiceAreasTeaserSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Robust scroll tracking: supports both window scroll and Lenis
  useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled into the sticky section
      const navbarOffset = 80;
      const currentScroll = -(rect.top - navbarOffset);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));

      const step = 1 / solutionCards.length;
      const computedIndex = Math.min(
        solutionCards.length - 1,
        Math.max(0, Math.floor(progress / step))
      );

      setActiveCardIndex((prev) => (prev !== computedIndex ? computedIndex : prev));
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    calculateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    const lenis = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void; off: (event: string, cb: () => void) => void } }).__lenis;
    if (lenis) {
      lenis.on('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (lenis) {
        lenis.off('scroll', onScroll);
      }
    };
  }, []);

  const handleNext = () => {
    setActiveCardIndex((prev) => Math.min(solutionCards.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-linear-to-b from-white via-slate-50/70 to-white border-t border-slate-200/70 h-[260vh] sm:h-[280vh] lg:h-[300vh]"
    >
      {/* Background Subtle Dot-Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#18181b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Floating Ambient Brand Glow Orbs */}
        <div className="absolute top-1/4 -left-28 w-96 h-96 bg-[#2B3CB8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-12 -right-28 w-96 h-96 bg-[#2B3CB8]/5 rounded-full blur-3xl" />
      </div>

      {/* Sticky Viewport Container: Pinned in view while user scrolls through the 300vh section */}
      <div className="sticky top-16 sm:top-20 lg:top-24 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)] max-h-230 min-h-145 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Completely STATIC Section Heading, Copy & Action */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
                <span>SOLAR FOR AUSTRALIAN HOMES</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181b] tracking-tight font-serif leading-[1.18] sm:leading-[1.15]">
                Solar Solutions Built for{' '}
                <br className="hidden sm:inline" />
                <span className="text-[#2B3CB8] inline-block">
                  Australian Homes.
                </span>
              </h2>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                From solar panels and battery storage to existing-system health checks and upgrades, Sunny Solar helps Australian homeowners make the most of their energy.
              </p>

              {/* Key Value Proposition Highlights */}
              <div className="space-y-2.5 pt-1 text-left w-full max-w-md hidden sm:block">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2B3CB8] shrink-0" />
                  <span>Tailored to your roof geometry & power consumption</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#70BB4E] shrink-0" />
                  <span>Clean Energy Council accredited design & installation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6854] shrink-0" />
                  <span>25-year performance backing & local Nationwide support</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 w-full flex justify-center lg:justify-start">
                <Button
                  to="/solar"
                  variant="primary"
                  size="md"
                  className="w-full xs:w-auto group relative overflow-hidden rounded-xl shadow-lg shadow-[#2B3CB8]/25 bg-[#2B3CB8] hover:bg-[#1D2984] text-white border-0 font-bold px-6 sm:px-7 py-3 sm:py-3.5 transition-all duration-300 hover:shadow-[#2B3CB8]/40 hover:-translate-y-0.5 justify-center min-h-11.5 sm:min-h-12"
       
                >
                  <span>Explore Our Solutions</span>
                                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />

                </Button>
              </div>
            </div>

            {/* Right Column: Stacked Cards One Upon One Overlay */}
            <div className="lg:col-span-7 relative w-full flex flex-col items-center">

              {/* Card Deck Overlay Stage */}
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl h-[470px] sm:h-[490px] lg:h-[510px]">
                {solutionCards.map((card, index) => {
                  const IconComponent = card.icon;
                  const isStacked = index < activeCardIndex;
                  const isActive = index === activeCardIndex;
                  const isNextPeeking = index === activeCardIndex + 1;
                  const isHidden = index > activeCardIndex + 1;

                  // Vertical offset in pixels when resting in the stacked deck
                  // e.g. Card 0 -> 0px, Card 1 -> 42px, Card 2 -> 84px, etc.
                  const stackedTop = index * 42;

                  // Integer pixel values for 100% reliable GPU-accelerated spring animations
                  const targetY = isStacked || isActive
                    ? stackedTop
                    : isNextPeeking
                      ? 415
                      : 540;

                  const targetScale = isActive
                    ? 1
                    : isStacked
                      ? 1 - (activeCardIndex - index) * 0.02
                      : 0.98;

                  const targetZIndex = isActive
                    ? 30
                    : isStacked
                      ? 10 + index
                      : isNextPeeking
                        ? 20
                        : 5;

                  return (
                    <motion.div
                      key={card.id}
                      animate={{
                        y: targetY,
                        opacity: isHidden ? 0 : 1,
                        scale: targetScale,
                        zIndex: targetZIndex,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 28,
                        mass: 0.8,
                      }}
                      className="absolute inset-x-0 top-0 origin-top"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <Link
                        to={card.link}
                        onClick={(e) => {
                          // Clicking any stacked tab or peeking card activates it instead of navigating away
                          if (!isActive) {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveCardIndex(index);
                          }
                        }}
                        className={`group block relative rounded-3xl sm:rounded-4xl p-6 sm:p-7 lg:p-8 h-[370px] sm:h-[390px] lg:h-[400px] shadow-2xl shadow-black/20 transition-all duration-300 border cursor-pointer ${card.colors.bg} ${card.colors.border} ${card.rotation}`}
                        style={{
                          boxShadow:
                            '0 20px 45px -12px rgba(0, 0, 0, 0.28), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        {/* Top Header Row: Big Bold Number (01+) on left, Circular Icon Badge on right */}
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className={`text-5xl sm:text-6xl lg:text-7xl font-black font-sans tracking-tighter leading-none ${card.colors.numberText}`}
                          >
                            {card.displayNumber}
                          </span>
                          <div
                            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110 ${card.colors.iconBg}`}
                          >
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                        </div>

                        {/* Bottom Content Area: Visible on the currently active card */}
                        <div
                          className={`mt-auto pt-6 sm:pt-8 space-y-2.5 transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          {/* Category Badge Tag */}
                          <div className="inline-block">
                            <span
                              className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full ${card.colors.badgeBg} ${card.colors.badgeText}`}
                            >
                              {card.badge}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif tracking-tight leading-snug ${card.colors.text}`}
                          >
                            {card.title}
                          </h3>

                          {/* Description */}
                          <p
                            className={`text-xs sm:text-sm lg:text-base leading-relaxed opacity-95 max-w-lg line-clamp-2 sm:line-clamp-none ${card.colors.text}`}
                          >
                            {card.description}
                          </p>

                          {/* CTA Strip */}
                          <div className="pt-2 flex items-center justify-between">
                            <span
                              className={`inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-all duration-200 ${card.colors.ctaBg} ${card.colors.ctaText}`}
                            >
                              <span>{card.cta}</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interactive Card Navigation & Step Pills */}
              <div className="mt-4 flex items-center justify-between w-full max-w-md sm:max-w-lg lg:max-w-xl px-2">
                {/* Step Pills */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {solutionCards.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCardIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeCardIndex === i
                          ? 'w-7 sm:w-8 bg-[#2B3CB8]'
                          : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Counter & Arrow Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    0{activeCardIndex + 1} / 0{solutionCards.length}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={activeCardIndex === 0}
                      aria-label="Previous card"
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={activeCardIndex === solutionCards.length - 1}
                      aria-label="Next card"
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasTeaserSection;
