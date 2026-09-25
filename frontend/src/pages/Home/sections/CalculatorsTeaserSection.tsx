import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  Layers,
  BatteryCharging,
  Clock,
  ArrowRight,
  Calculator,
  Sparkles,
} from 'lucide-react';
import advisorAvatar from '@/assets/main.png';

/* ── Brand colors (monochromatic blue scale) ── */
const BRAND = {
  orange: '#2B3CB8',
  orangeLight: '#6F8EE7',
  gold: '#D1DCF8',
  green: '#2B3CB8',
  blue: '#2B3CB8',
};

interface CalculatorItem {
  id: string;
  slug: string;
  number: string;
  shortTitle: string;
  title: string;
  description: string;
  highlight: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaText: string;
}

const calculators: CalculatorItem[] = [
  {
    id: 'solar-savings',
    slug: 'solar-savings',
    number: '01',
    shortTitle: 'Savings',
    title: 'Solar Savings Calculator',
    description:
      'Get an estimate based on your energy use, electricity bill and solar setup.',
    highlight: 'How Much Could Solar Save You?',
    icon: DollarSign,
    ctaText: 'Calculate My Savings',
  },
  {
    id: 'system-size',
    slug: 'system-size',
    number: '02',
    shortTitle: 'System Size',
    title: 'System Size Calculator',
    description:
      'Find an indicative system size based on your energy use, electricity bill and home.',
    highlight: 'How Much Solar Does Your Home Need?',
    icon: Layers,
    ctaText: 'Find My System Size',
  },
  {
    id: 'battery-savings',
    slug: 'battery-savings',
    number: '03',
    shortTitle: 'Battery',
    title: 'Battery Calculator',
    description:
      'Explore the battery size that could suit your solar system and energy usage.',
    highlight: 'What Size Battery Is Right for You?',
    icon: BatteryCharging,
    ctaText: 'Find My Battery Size',
  },
  {
    id: 'payback',
    slug: 'payback',
    number: '04',
    shortTitle: 'Payback',
    title: 'Solar Payback Calculator',
    description:
      'See how your system cost and estimated savings could affect your indicative payback.',
    highlight: 'How Long Could Your Solar Take to Pay for Itself?',
    icon: Clock,
    ctaText: 'Calculate My Payback',
  },
];

export const CalculatorsTeaserSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = calculators[activeIndex];

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % calculators.length);
      }, 5000);
    }
  }, [isPaused]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    resetTimer();
  };

  return (
    <section className="py-14 sm:py-10 lg:py-14 bg-white relative overflow-hidden border-t border-slate-200/70">
      {/* Subtle ambient light accents with smooth floating animation */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 25, 0],
          y: [0, -15, 0],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 -right-20 w-80 h-80 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#2B3CB8]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 relative z-10">

        {/* Section Header with Scroll Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-5xl mx-auto mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181b] tracking-tight font-serif leading-[1.15]">
            Before You Buy Solar, <br />
            <span className="text-[#2B3CB8]">
              Run the Numbers.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-900 mt-2">
            See what could work for your home — from system size and savings to battery needs and payback.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            ONE UNIFIED MASTER BOX CONTAINER
           ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative border border-slate-200/90 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group/card"
        >

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-110">

            {/* ── LEFT SIDE: AVATAR ── */}
            <div className="lg:col-span-4 relative bg-linear-to-b from-[#2B3CB8] via-[#1D2984] to-[#0C123E] overflow-hidden flex flex-col justify-end h-auto lg:min-h-full group/avatar">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-0 left-0 w-64 h-64 bg-[#2B3CB8]/30 rounded-full blur-2xl pointer-events-none"
              />

              

              <img
                src={advisorAvatar}
                alt="Trent Palmer - Sunny Solar Master Electrician Advisor"
                className="w-full h-full object-contain object-bottom lg:object-cover lg:object-top lg:absolute lg:inset-0 transition-transform duration-700 ease-out group-hover/avatar:scale-105"
              />
            </div>

            {/* ── RIGHT SIDE: CALCULATOR DETAILS ── */}
            <div
              className="lg:col-span-8 p-4 sm:p-8 lg:p-10 flex flex-col justify-between relative bg-white"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Subtle ambient glows for brand colors */}
              <div
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: `${BRAND.blue}12` }}
              />
              <div
                className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: `${BRAND.green}08` }}
              />

              <div>
                {/* ── Tab Selector: Circular Number + Short Title ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-7">
                  {calculators.map((calc, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <motion.button
                        key={calc.id}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex items-center gap-2 sm:gap-2.5 p-2 sm:p-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer overflow-hidden border text-left min-h-11 ${
                          isActive
                            ? 'bg-[#F5F7FD] border-[#2B3CB8] shadow-xs'
                            : 'bg-slate-50/80 hover:bg-[#F5F7FD] border-slate-200/80 hover:border-[#D1DCF8]'
                        }`}
                      >
                        {/* Circular Number Badge in Brand Blue with animated pop */}
                        <motion.span
                          animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-extrabold transition-all duration-300 ${
                            isActive
                              ? 'bg-[#2B3CB8] text-white shadow-xs'
                              : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {calc.number}
                        </motion.span>

                        {/* Title */}
                        <span
                          className={`truncate text-left leading-tight text-xs sm:text-sm font-bold transition-colors duration-300 ${
                            isActive ? 'text-[#2B3CB8]' : 'text-slate-700'
                          }`}
                        >
                          {calc.shortTitle}
                        </span>

                        {/* Active bottom accent bar */}
                        {isActive && (
                          <motion.div
                            layoutId="active-calc-tab-bar"
                            className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#2B3CB8]"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* ── Active Calculator Content with Smooth Animated Transitions ── */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 14, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -14, filter: 'blur(2px)' }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="flex flex-col gap-4 sm:gap-5"
                  >
                    {/* Number / Icon Badge in Brand Blue + Title Row */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.div
                        initial={{ scale: 0.8, rotate: -8 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                        className="shrink-0"
                      >
                        {React.createElement(active.icon, {
                          className:
                            'w-9 h-9 sm:w-11 sm:h-11 p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#2B3CB8] to-[#1D2984] text-white shadow-md shadow-[#2B3CB8]/25',
                        })}
                      </motion.div>
                      <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight leading-snug">
                        {active.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-base text-slate-600 leading-relaxed text-justify sm:text-left">
                      {active.description}
                    </p>

                    {/* Key Projected Outcome Box */}
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="rounded-2xl p-4 sm:p-5 lg:p-6 border border-[#2B3CB8]/20 bg-linear-to-br from-[#2B3CB8]/5 via-[#F5F7FD] to-white relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs group/outcome"
                    >
                      {/* Ambient soft glow */}
                      <div
                        className="absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl pointer-events-none"
                        style={{ backgroundColor: `${BRAND.green}12` }}
                      />

                      {/* Continuous subtle animated shimmer sheen */}
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 5, ease: 'linear', repeatDelay: 3 }}
                        className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                      />

                      <div className="relative z-10">
                        <motion.div
                          key={active.highlight}
                          initial={{ scale: 0.92, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="text-lg sm:text-2xl lg:text-3xl font-black font-serif tracking-tight leading-snug"
                          style={{ color: BRAND.green }}
                        >
                          {active.highlight}
                        </motion.div>
                      </div>

                      <div className="relative z-10 shrink-0 self-start sm:self-auto">
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border text-xs font-bold shadow-xs"
                          style={{ borderColor: '#D1DCF8', color: BRAND.green }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 18, -18, 0], scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#2B3CB8]" />
                          </motion.div>
                          <span>Instant Results</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Launch Button in Brand Blue */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto"
                      >
                        <Link
                          to={`/calculators/${active.slug}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base bg-[#2B3CB8] hover:bg-[#1D2984] shadow-md shadow-[#2B3CB8]/25 hover:shadow-xl hover:shadow-[#2B3CB8]/35 transition-all duration-300 group relative overflow-hidden min-h-12"
                        >
                          {/* Animated Shimmer sweep on hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />
                          <Calculator className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                          <span>{active.ctaText}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100 relative overflow-hidden">
            <motion.div
              key={`${activeIndex}-${isPaused}`}
              className="h-full bg-[#2B3CB8] relative"
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '0%' : '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            >
              {/* Luminous glow at leading edge */}
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/70 blur-xs" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorsTeaserSection;


