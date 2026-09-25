import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Zap, Award, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stats = [
  {
    icon: Zap,
    target: 4500,
    suffix: '+',
    decimals: 0,
    label: 'Homes & Sites Powered',
    description: 'Queensland residential and commercial installations completed with zero subcontractors.',
    accentColor: '#2B3CB8',
    iconBg: 'bg-[#2B3CB8]/10',
    linkTo: '/projects',
    linkText: 'Explore Project Portfolio',
  },
  {
    icon: Award,
    target: 15,
    suffix: '+',
    unit: 'Years',
    decimals: 0,
    label: 'Master Electrician Owned',
    description: 'Owner-operated by Trent Palmer, a licensed master electrician — not a sales company.',
    accentColor: '#2B3CB8',
    iconBg: 'bg-[#2B3CB8]/10',
    linkTo: '/about/trent',
    linkText: 'Meet Trent Palmer',
  },
  {
    icon: ShieldCheck,
    target: 25,
    suffix: '',
    unit: 'Year',
    decimals: 0,
    label: 'Performance Guarantee',
    description: 'Industry-leading workmanship and performance warranty for total peace of mind.',
    accentColor: '#2B3CB8',
    iconBg: 'bg-[#2B3CB8]/10',
    linkTo: '/solar/systems',
    linkText: 'View Guaranteed Systems',
  },
  {
    icon: Star,
    target: 4.9,
    suffix: '★',
    decimals: 1,
    label: 'Google Customer Rating',
    description: 'Hundreds of verified 5-star reviews from homeowners across South East Queensland.',
    accentColor: '#2B3CB8',
    iconBg: 'bg-[#2B3CB8]/10',
    linkTo: '/reviews',
    linkText: 'Read Verified Reviews',
  },
];

/* ── Animated number counter ── */
const AnimatedNumber: React.FC<{
  target: number;
  decimals: number;
  duration?: number;
}> = ({ target, decimals, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(ease * target);
            if (p < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
};

export const TrustBarSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number, dir: 'up' | 'down') => {
    setDirection(dir);
    setActiveIndex(idx);
  }, []);

  /* Auto-cycle every 4 s */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection('down');
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection('down');
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 4000);
  }, []);

  const handlePrev = () => {
    goTo((activeIndex - 1 + stats.length) % stats.length, 'up');
    resetTimer();
  };
  const handleNext = () => {
    goTo((activeIndex + 1) % stats.length, 'down');
    resetTimer();
  };

  const active = stats[activeIndex];
  const Icon = active.icon;

  const slideVariants = {
    enter: (dir: 'up' | 'down') => ({
      y: dir === 'down' ? 40 : -40,
      opacity: 0,
      scale: 0.97,
    }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (dir: 'up' | 'down') => ({
      y: dir === 'down' ? -40 : 40,
      opacity: 0,
      scale: 0.97,
    }),
  };

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14 relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full blur-[120px] pointer-events-none" style={{ background: `${active.accentColor}10` }} />
      <div className="absolute -bottom-40 -right-40 w-125 h-125 bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* ── Sliding Stat Showcase (order-1 on mobile so number is ON TOP) ── */}
          <div className="order-1 lg:order-1">
            <div className="flex flex-col justify-center min-h-65 sm:min-h-65 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3.5 sm:gap-5"
                >
                  {/* Icon badge */}
                  <div
                    className="w-13 h-13 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center transition-colors duration-500"
                    style={{ backgroundColor: `${active.accentColor}12` }}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: active.accentColor }} />
                  </div>

                  {/* Big number */}
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-serif tracking-tight text-slate-900 leading-none">
                      <AnimatedNumber
                        target={active.target}
                        decimals={active.decimals}
                        duration={1800}
                      />
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold font-serif tracking-tight" style={{ color: active.accentColor }}>
                      {active.suffix}
                    </span>
                    {active.unit && (
                      <span className="text-xl sm:text-3xl font-semibold text-slate-400 ml-1">
                        {active.unit}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <h3 className="text-xl sm:text-3xl font-bold text-slate-900 font-serif leading-snug">
                    {active.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-md text-justify sm:text-left">
                    {active.description}
                  </p>

                  {/* Contextual Link */}
                  <div className="pt-1">
                    <Link
                      to={active.linkTo}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all hover:underline group/statlink"
                      style={{ color: active.accentColor }}
                    >
                      <span>{active.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/statlink:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Animated accent bar */}
                  <motion.div
                    className="h-1 rounded-full mt-1"
                    style={{ backgroundColor: active.accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.8, ease: 'linear' }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Mobile Navigation Controls with Dots & Arrow buttons */}
              <div className="flex sm:hidden items-center justify-between mt-5 pt-1">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {stats.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        goTo(i, i > activeIndex ? 'down' : 'up');
                        resetTimer();
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#2B3CB8]' : 'w-2 bg-slate-200'
                        }`}
                      aria-label={`Go to stat ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow navigation buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs active:scale-95 cursor-pointer"
                    aria-label="Previous stat"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors shadow-2xs active:scale-95 cursor-pointer"
                    aria-label="Next stat"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Fixed Summary Card (order-2 on mobile so it sits underneath) ── */}
          <div className="order-2 lg:order-2">
            <div className="bg-[#0C123E] rounded-xl p-5 sm:p-8 lg:p-6 relative overflow-hidden shadow-2xl">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none" style={{ background: `${active.accentColor}25` }} />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-[1.12] mb-4">
                  Real Numbers.<br />
                  <span className="text-[#D1DCF8]">
                    Proven Impact.
                  </span>
                </h2>

                {/* Mini stat pills: 2x2 grid on mobile and desktop */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {stats.map((stat, idx) => {
                    const StatIcon = stat.icon;
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          goTo(idx, idx > activeIndex ? 'down' : 'up');
                          resetTimer();
                        }}
                        className="group relative text-left rounded-xl p-2.5 sm:p-4 transition-all duration-300 overflow-hidden cursor-pointer"
                        style={{
                          backgroundColor: isActive ? `${stat.accentColor}18` : 'rgba(255,255,255,0.04)',
                          borderWidth: '1px',
                          borderColor: isActive ? `${stat.accentColor}50` : 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3">
                          <StatIcon
                            className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors duration-300"
                            style={{ color: isActive ? stat.accentColor : '#94a3b8' }}
                          />
                          <div className="min-w-0">
                            <div className="text-base sm:text-lg font-extrabold text-white tabular-nums font-serif leading-tight">
                              {stat.target.toLocaleString(undefined, {
                                minimumFractionDigits: stat.decimals,
                                maximumFractionDigits: stat.decimals,
                              })}
                              {stat.suffix}
                            </div>
                            <div className="text-[10px] sm:text-xs font-medium text-slate-400 leading-tight mt-0.5 truncate">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Link to Calculator */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">See your home's numbers:</span>
                  <Link
                    to="/calculators/solar-savings"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D1DCF8] hover:text-white hover:underline transition-colors"
                  >
                    <span>Run Savings Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBarSection;
