import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { calculatorsList } from '../../../data/calculatorsData';
import { CalculatorCard } from '../../../components/calculators/CalculatorCard';
import { Sparkles, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

export const CalculatorsGridSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gridPages = [calculatorsList.slice(0, 4), calculatorsList.slice(4, 8)];

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % gridPages.length);
  }, [gridPages.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? gridPages.length - 1 : prev - 1));
  }, [gridPages.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    pauseTemporarily();
  };

  // Auto-slide every 5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    pauseTemporarily();
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-16">
      {/* Centered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.45 }}
        className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-12"
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-amber-300/40 mb-2 sm:mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Tool Suite</span>
        </div>

        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Available Solar & Battery Calculators
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 mt-2 sm:mt-3 max-w-xl mx-auto leading-relaxed px-1 sm:px-0">
          Select a specialized tool below to model your home's exact energy profile, battery ROI, and quarterly bill reductions.
        </p>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-500 bg-white px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-200 shadow-2xs mt-2.5 sm:mt-4">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
          <span>8 Verified Engineering Models</span>
        </div>
      </motion.div>

      {/* 1. Mobile Experience (< md): 2x2 Card Grid with Auto-Sliding & Touch Swipe */}
      <div className="block md:hidden">
        {/* Mobile Grid Category Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => goToSlide(0)}
            className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border cursor-pointer text-center truncate ${activeSlide === 0
                ? 'bg-[#2B3CB8] text-white border-[#2B3CB8] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            ☀️ Solar & ROI (1–4)
          </button>
          <button
            type="button"
            onClick={() => goToSlide(1)}
            className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border cursor-pointer text-center truncate ${activeSlide === 1
                ? 'bg-[#2B3CB8] text-white border-[#2B3CB8] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
          >
            🔋 Battery & Sizing (5–8)
          </button>
        </div>

        {/* Sliding 2x2 Grid Window */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {gridPages.map((page, pageIdx) => (
              <div key={pageIdx} className="w-full shrink-0 px-0.5">
                <div className="grid grid-cols-2 gap-2 xs:gap-2.5 sm:gap-3.5">
                  {page.map((calc, cardIdx) => (
                    <CalculatorCard
                      key={calc.id}
                      calculator={calc}
                      index={pageIdx * 4 + cardIdx}
                      compact
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-3 px-1">
          {/* Active indicator dots */}
          <div className="flex items-center gap-1.5">
            {gridPages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`View grid page ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx ? 'w-6 bg-[#2B3CB8]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>

          {/* Swipe indicator & arrow buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              Grid {activeSlide + 1} of {gridPages.length} {activeSlide === 0 ? '(Swipe →)' : '(← Swipe)'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  prevSlide();
                  pauseTemporarily();
                }}
                aria-label="Previous grid page"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  nextSlide();
                  pauseTemporarily();
                }}
                aria-label="Next grid page"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Running Indicator / Swipe Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1 font-medium">
          <span>← Swipe left or right</span>
          <span className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
            {isPaused ? 'Paused' : 'Auto-sliding'}
          </span>
          <span className="text-slate-600 font-semibold text-xs">
            {activeSlide === 0 ? 'Tools 1 – 4' : 'Tools 5 – 8'}
          </span>
        </div>
      </div>

      {/* 2. Desktop & Tablet Grid (>= md): Animated 4-Column Card Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-30px' }}
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6"
      >
        {calculatorsList.map((calc, index) => (
          <motion.div key={calc.id} variants={itemVariants}>
            <CalculatorCard calculator={calc} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CalculatorsGridSection;

