import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  ThermometerSun,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';
import { GlareHover } from '@/components/ui/GlareHover';
import { DotPattern } from '@/components/ui/DotPattern';
import { BorderBeam } from '@/components/ui/BorderBeam';

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
  gradientIcon: string;
  gradientBorder: string;
  gradientGlow: string;
  statColor: string;
  badgeBg: string;
  colorFrom: string;
  colorTo: string;
  pingColor: string;
  dotColor: string;
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
      gradientIcon: 'from-emerald-500 to-[#2B3CB8]',
      gradientBorder: 'group-hover:border-emerald-400/80 group-hover:ring-2 group-hover:ring-emerald-500/20',
      gradientGlow: 'from-emerald-500/20 via-[#2B3CB8]/10 to-transparent',
      statColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
      colorFrom: '#10B981',
      colorTo: '#2B3CB8',
      pingColor: 'bg-emerald-400',
      dotColor: 'bg-emerald-500',
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
      gradientIcon: 'from-amber-500 to-orange-600',
      gradientBorder: 'group-hover:border-amber-400/80 group-hover:ring-2 group-hover:ring-amber-500/20',
      gradientGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
      statColor: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200/80',
      colorFrom: '#F59E0B',
      colorTo: '#EF4444',
      pingColor: 'bg-amber-400',
      dotColor: 'bg-amber-500',
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
      gradientIcon: 'from-[#2B3CB8] to-blue-600',
      gradientBorder: 'group-hover:border-blue-400/80 group-hover:ring-2 group-hover:ring-blue-500/20',
      gradientGlow: 'from-[#2B3CB8]/25 via-sky-500/10 to-transparent',
      statColor: 'text-[#2B3CB8]',
      badgeBg: 'bg-blue-50 text-blue-950 border-blue-200/80',
      colorFrom: '#2B3CB8',
      colorTo: '#38BDF8',
      pingColor: 'bg-blue-400',
      dotColor: 'bg-[#2B3CB8]',
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
      gradientIcon: 'from-purple-600 to-indigo-600',
      gradientBorder: 'group-hover:border-purple-400/80 group-hover:ring-2 group-hover:ring-purple-500/20',
      gradientGlow: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      statColor: 'text-purple-700',
      badgeBg: 'bg-purple-50 text-purple-950 border-purple-200/80',
      colorFrom: '#8B5CF6',
      colorTo: '#2563EB',
      pingColor: 'bg-purple-400',
      dotColor: 'bg-purple-500',
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
    <section className="py-12 xs:py-14 sm:py-18 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Ambient Mesh & DotPattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <DotPattern
          width={32}
          height={32}
          cx={1}
          cy={1}
          cr={1}
          className="opacity-20 mask-[radial-gradient(ellipse_at_center,white,transparent_80%)]"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-b from-blue-50/50 via-slate-50/20 to-transparent" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <BlurFade delay={0.1} direction="up" className="text-center max-w-6xl mx-auto mb-8 xs:mb-10 sm:mb-16 flex flex-col items-center">
          {/* Eyebrow Badge */}
         

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.12]">
            The Difference Between Cheap Solar & Engineered Solar
          </h2>

          <p className="mt-3 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-7xl mx-auto font-normal">
            Cut-price telemarketers use unaccredited subcontractors and low-grade tier-3 panels that fail within 4 years. We employ full-time Master Electricians delivering engineered installations that last decades.
          </p>
        </BlurFade>

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
                  className={`py-2 px-1 rounded-lg text-[11px] font-semibold transition-all duration-200 text-center truncate ${
                    isActive
                      ? 'bg-[#2B3CB8] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label={`View ${item.title}`}
                >
                  {item.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Swipeable Card Container with Animated BorderBeam */}
          <div
            className="relative bg-linear-to-b from-white to-slate-50/90 border border-slate-200/90 rounded-2xl p-5 overflow-hidden transition-all duration-300 shadow-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* BorderBeam on Mobile Card */}
            <BorderBeam
              size={180}
              duration={6}
              borderWidth={1.5}
              borderRadius="1rem"
              colorFrom={currentBenefit.colorFrom}
              colorTo={currentBenefit.colorTo}
            />

            {/* Top Auto-Slide Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
              <m.div
                key={activeMobileIndex}
                initial={{ width: '0%' }}
                animate={{ width: isPaused ? '100%' : '100%' }}
                transition={{ duration: isPaused ? 0 : 4, ease: 'linear' }}
                className="h-full bg-[#2B3CB8]"
              />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={activeMobileIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="flex flex-col justify-between min-h-80"
              >
                <div>
                  {/* Card Header with Icon & Stat */}
                  <div className="flex items-center justify-between mb-4 pt-1">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${currentBenefit.gradientIcon} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <CurrentIcon className="w-6 h-6" />
                    </div>

                    {/* Right Side Stat with Animated Pulse Indicator */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 mb-0.5">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentBenefit.pingColor} opacity-75`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${currentBenefit.dotColor}`} />
                        </span>
                        <span className={`text-2xl font-serif font-bold ${currentBenefit.statColor}`}>
                          {currentBenefit.stat}
                        </span>
                      </div>
                      <span className="block text-[10px] text-slate-400 font-medium">
                        {currentBenefit.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Highlight Pill */}
                  <div className={`inline-flex items-center gap-1 text-[11px] font-bold font-mono ${currentBenefit.badgeBg} px-2.5 py-0.5 rounded-md mb-2.5 uppercase tracking-wide border`}>
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
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
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-[#2B3CB8] transition-colors shadow-xs"
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
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === activeMobileIndex
                              ? 'w-6 bg-[#2B3CB8]'
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
              </m.div>
            </AnimatePresence>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
            Swipe left or right to explore benefits
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP & TABLET VIEW (>= sm): 4-Column Animated Cards   */}
        {/* ======================================================== */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch ">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <BlurFade
                key={item.id}
                delay={0.12 * idx}
                direction="up"
                className="h-full flex flex-col"
              >
                <GlareHover
                  color="#ffffff"
                  opacity={0.3}
                  duration={750}
                  className={`group bg-white border border-slate-200/90 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-full shadow-xl hover:shadow-2xl shadow-black/60 ${item.gradientBorder}`}
                >
                  {/* Magic UI BorderBeam Animated Border */}
                  <BorderBeam
                    size={180}
                    duration={7}
                    borderWidth={2}
                    borderRadius="1rem"
                    colorFrom={item.colorFrom}
                    colorTo={item.colorTo}
                  />

                  {/* Right-Side Animated Shimmer Accent Edge */}
                  <div
                    className="absolute top-0 right-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-current to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ color: item.colorFrom }}
                  />

                  {/* Ambient Glow Background on Hover */}
                  <div
                    className={`absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br ${item.gradientGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Top Section: Icon & Big Stat Metric with Animated Radar Ping */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.gradientIcon} text-white flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-360 transition-transform duration-300 shrink-0`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Bold Stat Counter with Right-Side Animated Pulse */}
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5 mb-0.5">
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.pingColor} opacity-75`} />
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${item.dotColor}`} />
                          </span>
                          <span className={`text-2xl font-serif font-extrabold tracking-tight ${item.statColor}`}>
                            {item.stat}
                          </span>
                        </div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {item.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Highlight Badge */}
                    <div
                      className={`inline-flex items-center gap-1 text-[11px] font-bold font-mono ${item.badgeBg} px-2.5 py-0.5 rounded-md mb-2.5 uppercase tracking-wide border shadow-2xs`}
                    >
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-lg text-slate-900 mb-2 leading-snug group-hover:text-[#2B3CB8] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Action Link with Animated Arrow Button on Right */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100">
                    <Link
                      to={item.linkTo}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2B3CB8] hover:text-[#1D2984] transition-colors group/btn w-full justify-between"
                    >
                      <span>{item.linkText}</span>
                      <div className="w-7 h-7 rounded-full bg-blue-50 group-hover/btn:bg-[#2B3CB8] group-hover/btn:text-white flex items-center justify-center transition-all duration-300 group-hover/btn:shadow-md group-hover/btn:shadow-[#2B3CB8]/30">
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </GlareHover>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolarLandingBenefitsSection;
