import React, { useState, useRef } from 'react';
import {
  Check,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun,
  Cpu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../../../../components/ui/Badge';
import { Button } from '../../../../components/ui/Button';
import { BorderBeam } from '../../../../components/ui/BorderBeam';

interface PackageItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  capacity: string;
  panels: string;
  inverter: string;
  dailyYield: string;
  typicalSavings: string;
  stcDiscount: string;
  popular: boolean;
  features: string[];
}

export const SolarLandingPackagesSection: React.FC = () => {
  const packages: PackageItem[] = [
    {
      id: 'essential-6kw',
      name: 'Essential Home 6.6kW',
      shortName: '6.6kW Home',
      tagline: 'Ideal for 2-3 bedroom homes with moderate daytime usage',
      capacity: '6.6 kW DC',
      panels: '15x 440W Tier-1 N-Type TOPCon Panels',
      inverter: '5.0kW European Fronius Primo or Sungrow Inverter',
      dailyYield: '24 - 28 kWh / day',
      typicalSavings: '$1,800 - $2,400 / yr',
      stcDiscount: 'Up to $2,400 STC Rebate',
      popular: false,
      features: [
        'High-density N-Type bifacial dual-glass cells',
        '25-year panel product & performance warranty',
        'Smart consumption monitoring meter included',
        'Direct roof waterproofing leak guarantee',
        'Battery-upgrade ready hybrid architecture',
      ],
    },
    {
      id: 'family-10kw',
      name: 'Family High-Yield 10.0kW',
      shortName: '10.0kW Family',
      tagline: 'Our #1 best seller for ducted A/C, swimming pools & growing families',
      capacity: '10.0 kW DC',
      panels: '23x 440W All-Black AIKO Neostar or REC Alpha',
      inverter: '8.2kW European Fronius Primo / Sungrow Hybrid',
      dailyYield: '38 - 44 kWh / day',
      typicalSavings: '$2,800 - $3,600 / yr',
      stcDiscount: 'Up to $3,200 STC Rebate',
      popular: true,
      features: [
        'Ultra-aesthetic all-black modules matching your roofline',
        'Generates huge daytime surplus to eliminate power bills',
        'Zero export clipping with smart dynamic phase injection',
        '10-year comprehensive Master Electrician workmanship',
        'Direct plug-in compatibility with Tesla Powerwall 3',
      ],
    },
    {
      id: 'maximum-13kw',
      name: 'Maximum Power 13.2kW - 15kW',
      shortName: '13.2kW Max',
      tagline: 'Complete energy autonomy for large residences & electric vehicle owners',
      capacity: '13.2 - 15.0 kW DC',
      panels: '30-34x 440W REC Alpha Pure-R Heterojunction Panels',
      inverter: '10kW Single or Three-Phase Smart Inverter Setup',
      dailyYield: '52 - 64 kWh / day',
      typicalSavings: '$3,800 - $5,200 / yr',
      stcDiscount: 'Max Federal STC Rebate',
      popular: false,
      features: [
        'Multi-string design optimizing east, west and north facets',
        'Maximum allowable residential Energex grid capacity',
        'Level 2 EV smart solar diversion charging support',
        'Dedicated Master Electrician project manager',
        'Commercial-grade Clenergy cyclone mounting hardware',
      ],
    },
  ];

  // Default to index 1 (the popular 10kW package)
  const [activeMobileIndex, setActiveMobileIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const selectPackage = (index: number) => {
    setDirection(index > activeMobileIndex ? 1 : -1);
    setActiveMobileIndex(index);
  };

  const nextPackage = () => {
    setDirection(1);
    setActiveMobileIndex((prev) => (prev + 1) % packages.length);
  };

  const prevPackage = () => {
    setDirection(-1);
    setActiveMobileIndex((prev) => (prev - 1 + packages.length) % packages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) {
        nextPackage();
      } else if (diff < -40) {
        prevPackage();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentPkg = packages[activeMobileIndex];

  return (
    <section className="py-10 xs:py-12 sm:py-16 lg:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col items-center md:items-end md:flex-row justify-between mb-8 sm:mb-12 lg:mb-16 gap-5 sm:gap-6">
          <div className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start mx-auto md:mx-0">
            <Badge variant="amber" className="mb-2.5 sm:mb-3">
              Signature Configurations
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.12] text-center md:text-left">
              Engineered Residential Solar Packages
            </h2>
            <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base leading-relaxed text-center md:text-left">
              Transparent specifications with zero bait-and-switch hardware. Every package includes full STC paperwork management and local utility grid approval.
            </p>
          </div>
          <Button
            to="/solar/systems"
            variant="outline"
            size="md"
            className="w-full sm:w-auto shrink-0 justify-center"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All System Packages
          </Button>
        </div>

        {/* ======================================================== */}
        {/* MOBILE VIEW (< lg): Interactive Tabbed Carousel          */}
        {/* ======================================================== */}
        <div className="block lg:hidden">
          {/* Segmented Package Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/70 rounded-xl mb-4">
            {packages.map((pkg, idx) => {
              const isActive = idx === activeMobileIndex;
              return (
                <button
                  key={pkg.id}
                  onClick={() => selectPackage(idx)}
                  className={`relative py-2 px-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                    isActive
                      ? pkg.popular
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label={`Select ${pkg.name}`}
                >
                  <span className="font-bold truncate text-[11px] xs:text-xs">
                    {pkg.shortName}
                  </span>
                  {pkg.popular && (
                    <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-wider flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Swipeable Active Package Card */}
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPkg.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className={`rounded-2xl p-5 xs:p-6 transition-all duration-300 relative flex flex-col justify-between ${
                  currentPkg.popular
                    ? 'bg-slate-950 text-white shadow-xl border-2 border-amber-500'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-md'
                }`}
              >
                {/* Popular Floating Tag */}
                {currentPkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-amber-500 text-slate-950 text-[10px] xs:text-xs font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most Popular Choice
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Capacity & Rebate Header */}
                  <div className="flex items-center justify-between mb-2 pt-1">
                    <span
                      className={`text-xs font-bold font-mono uppercase tracking-wider ${
                        currentPkg.popular ? 'text-amber-400' : 'text-amber-600'
                      }`}
                    >
                      {currentPkg.capacity}
                    </span>
                    <span
                      className={`text-[10px] xs:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        currentPkg.popular
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {currentPkg.stcDiscount}
                    </span>
                  </div>

                  <h3
                    className={`text-xl xs:text-2xl font-serif font-bold mb-1.5 ${
                      currentPkg.popular ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {currentPkg.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      currentPkg.popular ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {currentPkg.tagline}
                  </p>

                  {/* Hardware Specs Pills */}
                  <div
                    className={`p-3 rounded-xl mb-4 space-y-2 text-xs ${
                      currentPkg.popular
                        ? 'bg-slate-900/80 border border-slate-800'
                        : 'bg-slate-50 border border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <span
                          className={`font-semibold ${
                            currentPkg.popular ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          Panels:{' '}
                        </span>
                        <span
                          className={currentPkg.popular ? 'text-slate-400' : 'text-slate-600'}
                        >
                          {currentPkg.panels}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Cpu className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <span
                          className={`font-semibold ${
                            currentPkg.popular ? 'text-slate-200' : 'text-slate-800'
                          }`}
                        >
                          Inverter:{' '}
                        </span>
                        <span
                          className={currentPkg.popular ? 'text-slate-400' : 'text-slate-600'}
                        >
                          {currentPkg.inverter}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Box */}
                  <div
                    className={`p-3.5 rounded-xl mb-4 grid grid-cols-2 gap-2 text-xs ${
                      currentPkg.popular
                        ? 'bg-slate-900 border border-slate-800'
                        : 'bg-slate-50 border border-slate-200/60'
                    }`}
                  >
                    <div>
                      <div className={currentPkg.popular ? 'text-slate-400' : 'text-slate-500'}>
                        Typical Savings
                      </div>
                      <div className="font-bold text-emerald-500 text-sm mt-0.5">
                        {currentPkg.typicalSavings}
                      </div>
                    </div>
                    <div>
                      <div className={currentPkg.popular ? 'text-slate-400' : 'text-slate-500'}>
                        Est. Daily Harvest
                      </div>
                      <div
                        className={`font-bold text-sm mt-0.5 ${
                          currentPkg.popular ? 'text-amber-400' : 'text-slate-900'
                        }`}
                      >
                        {currentPkg.dailyYield}
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-3 border-t border-slate-100/10">
                    {currentPkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span
                          className={
                            currentPkg.popular ? 'text-slate-200' : 'text-slate-700'
                          }
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Carousel Navigation */}
                <div className="mt-6 pt-4 border-t border-slate-100/10 space-y-3">
                  <Button
                    to="/get-started/free-assessment"
                    variant={currentPkg.popular ? 'primary' : 'outline'}
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Request Package Quote
                  </Button>

                  {/* Arrow controls & dots */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {packages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => selectPackage(dotIdx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === activeMobileIndex
                              ? currentPkg.popular
                                ? 'w-6 bg-amber-400'
                                : 'w-6 bg-slate-900'
                              : currentPkg.popular
                              ? 'w-2 bg-slate-700'
                              : 'w-2 bg-slate-300'
                          }`}
                          aria-label={`Go to package ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={prevPackage}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors active:scale-95 ${
                          currentPkg.popular
                            ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                        aria-label="Previous package"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextPackage}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors active:scale-95 ${
                          currentPkg.popular
                            ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                        aria-label="Next package"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-center text-[10px] text-slate-400 mt-2.5 font-medium">
            Swipe left or right or tap tabs above to compare systems
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= lg): 3-Column Comparative Grid          */}
        {/* ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 relative flex flex-col justify-between ${
                pkg.popular
                  ? 'bg-slate-950 text-white shadow-2xl border-2 border-amber-500 scale-100 -translate-y-2'
                  : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl'
              }`}
            >
              {pkg.popular && (
                <>
                  <BorderBeam size={200} duration={8} colorFrom="#F59E0B" colorTo="#2B3CB8" borderWidth={2} />
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-amber-500 w-52 text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md inline-flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Most Popular Choice
                    </span>
                  </div>
                </>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold font-mono uppercase tracking-wider ${
                      pkg.popular ? 'text-amber-400' : 'text-amber-600'
                    }`}
                  >
                    {pkg.capacity}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      pkg.popular ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {pkg.stcDiscount}
                  </span>
                </div>

                <h3
                  className={`text-2xl font-serif font-bold mb-2 ${
                    pkg.popular ? 'text-white' : 'text-slate-950'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-xs leading-relaxed mb-5 ${
                    pkg.popular ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {pkg.tagline}
                </p>

                {/* Hardware Specs Strip */}
                <div
                  className={`p-3 rounded-xl mb-5 space-y-1.5 text-xs ${
                    pkg.popular
                      ? 'bg-slate-900/80 border border-slate-800'
                      : 'bg-slate-50 border border-slate-200/60'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className={pkg.popular ? 'text-slate-300' : 'text-slate-600'}>
                      {pkg.panels}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Cpu className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className={pkg.popular ? 'text-slate-300' : 'text-slate-600'}>
                      {pkg.inverter}
                    </span>
                  </div>
                </div>

                {/* Metrics Box */}
                <div
                  className={`p-4 rounded-xl mb-6 grid grid-cols-2 gap-3 text-xs ${
                    pkg.popular
                      ? 'bg-slate-900 border border-slate-800'
                      : 'bg-slate-50 border border-slate-200/60'
                  }`}
                >
                  <div>
                    <div className={pkg.popular ? 'text-slate-400' : 'text-slate-500'}>
                      Typical Savings
                    </div>
                    <div className="font-bold text-emerald-500 text-sm mt-0.5">
                      {pkg.typicalSavings}
                    </div>
                  </div>
                  <div>
                    <div className={pkg.popular ? 'text-slate-400' : 'text-slate-500'}>
                      Est. Daily Harvest
                    </div>
                    <div
                      className={`font-bold text-sm mt-0.5 ${
                        pkg.popular ? 'text-amber-400' : 'text-slate-900'
                      }`}
                    >
                      {pkg.dailyYield}
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-100/10">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className={pkg.popular ? 'text-slate-200' : 'text-slate-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100/10">
                <Button
                  to="/get-started/free-assessment"
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request Package Quote
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

