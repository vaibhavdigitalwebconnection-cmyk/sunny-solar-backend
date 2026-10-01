import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  ThermometerSun,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface BenefitItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortTitle: string;
  highlight: string;
  stat: string;
  statLabel: string;
  description: string;
  linkTo: string;
  linkText: string;
}

export const SolarLandingBenefitsSection: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      id: 'bills',
      icon: DollarSign,
      title: 'Crush Peak Power Bills',
      shortTitle: 'Bill Savings',
      highlight: 'Up to 85% Daytime Offset',
      stat: '85%',
      statLabel: 'Daytime Bill Reduction',
      description:
        'Run daytime power-hungry ducted air conditioning, electric heat pump hot water, and swimming pool pumps directly from free self-generated sunshine.',
      linkTo: '/calculators/solar-savings',
      linkText: 'Calculate Bill Savings',
    },
    {
      id: 'heat',
      icon: ThermometerSun,
      title: 'Ultra-Low Heat Degradation',
      shortTitle: 'Heat Proof',
      highlight: '-0.26%/°C Temp Coefficient',
      stat: '-0.26%',
      statLabel: 'Loss/°C over 25°C',
      description:
        'Standard cheap solar drops 25%+ efficiency when the mercury hits 38°C. Our N-Type TOPCon panels are specifically engineered for Nationwide summer heatwaves.',
      linkTo: '/solar/systems',
      linkText: 'View N-Type Systems',
    },
    {
      id: 'warranty',
      icon: ShieldCheck,
      title: '25-Year Triple Guarantee',
      shortTitle: '25-Yr Triple',
      highlight: 'Product, Output & Labor',
      stat: '25 Yrs',
      statLabel: 'Full Triple Guarantee',
      description:
        'Guaranteed minimum 89.4% electricity output after 25 years. Every single screw, bracket, and roof tile is backed by our 10-year in-house roof leak guarantee.',
      linkTo: '/solar/installation',
      linkText: 'Installation Standards',
    },
    {
      id: 'battery',
      icon: Zap,
      title: 'Future-Proof Battery Architecture',
      shortTitle: 'Battery Ready',
      highlight: 'Hybrid & AC-Coupled Ready',
      stat: '100%',
      statLabel: 'Storage Compatible',
      description:
        'Every solar inverter is engineered to accept a Tesla Powerwall 3, BYD, or Sungrow high-voltage battery on day one or whenever your budget allows.',
      linkTo: '/batteries',
      linkText: 'Explore Battery Options',
    },
  ];

  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveMobileIndex((prev) => (prev + 1) % benefits.length);
  }, [benefits.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveMobileIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  }, [benefits.length]);

  const selectSlide = (index: number) => {
    setDirection(index > activeMobileIndex ? 1 : -1);
    setActiveMobileIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Auto-rotation every 4 seconds on mobile
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 40) {
        nextSlide();
      } else if (diff < -40) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 4500);
  };

  const currentBenefit = benefits[activeMobileIndex];
  const CurrentIcon = currentBenefit.icon;

  return (
    <section className="py-10 xs:py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Background decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-50/50 via-slate-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-6xl mx-auto mb-6 xs:mb-8 sm:mb-14 flex flex-col items-center"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] xs:text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 shadow-2xs mb-2.5 sm:mb-4 w-fit">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
            <span>The Engineered Difference</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.12]">
            The Difference Between Cheap Solar & Engineered Solar
          </h2>

          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-6xl mx-auto font-normal">
            Cut-price telemarketers use unaccredited subcontractors and low-grade tier-3 panels that fail within 4 years. We employ full-time Master Electricians delivering engineered installations that last decades.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* MOBILE VIEW (< sm): Interactive Showcase with Touch & Tabs */}
        {/* ======================================================== */}
        <div className="block sm:hidden">
          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
            {benefits.map((item, idx) => {
              const isActive = idx === activeMobileIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => selectSlide(idx)}
                  className={`py-2 px-1 rounded-lg text-[11px] font-semibold transition-all duration-200 text-center truncate ${isActive
                      ? 'bg-amber-500 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                  aria-label={`View ${item.title}`}
                >
                  {item.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Swipeable Card Container */}
          <div
            className="relative bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 rounded-2xl p-5 shadow-sm overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top Auto-Slide Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
              <motion.div
                key={activeMobileIndex}
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '100%' : '100%' }}
                transition={{ duration: isPaused ? 0 : 4, ease: 'linear' }}
                className="h-full bg-amber-500"
              />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeMobileIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  {/* Card Header with Icon & Counter */}
                  <div className="flex items-center justify-between mb-3.5 pt-1">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-300/40 text-amber-600 flex items-center justify-center shrink-0">
                      <CurrentIcon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-mono font-bold">
                      <span className="text-amber-600">0{activeMobileIndex + 1}</span>
                      <span className="text-slate-400">/</span>
                      <span>0{benefits.length}</span>
                    </div>
                  </div>

                  {/* Highlight Pill */}
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md mb-2 uppercase tracking-wide">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                    <span>{currentBenefit.highlight}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-lg text-slate-900 mb-2 leading-snug">
                    {currentBenefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {currentBenefit.description}
                  </p>
                </div>

                {/* Bottom Action & Nav */}
                <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex flex-col gap-3">
                  <Link
                    to={currentBenefit.linkTo}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <span>{currentBenefit.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {benefits.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => selectSlide(dotIdx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === activeMobileIndex
                              ? 'w-6 bg-amber-500'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={prevSlide}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors active:scale-95"
                        aria-label="Previous benefit"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors active:scale-95"
                        aria-label="Next benefit"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
            Swipe left or right to explore benefits
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP & TABLET VIEW (>= sm): 2 to 4 Column Grid       */}
        {/* ======================================================== */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-5 xs:p-6 shadow-xs hover:shadow-md hover:border-amber-400/80 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 xs:w-12 xs:h-12 rounded-xl bg-amber-500/10 border border-amber-300/30 text-amber-600 flex items-center justify-center mb-3.5 xs:mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-5 h-5 xs:w-6 xs:h-6" />
                  </div>
                  <div className="text-[11px] xs:text-xs font-bold font-mono text-amber-600 mb-1 uppercase tracking-wider">
                    {item.highlight}
                  </div>
                  <h3 className="font-serif font-bold text-base xs:text-lg text-slate-900 mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs xs:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70">
                  <Link
                    to={item.linkTo}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors group/blink"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/blink:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
