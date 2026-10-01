import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sun, Moon, ShieldCheck, DollarSign, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../../../../../components/ui/Badge';
import { Button } from '../../../../../components/ui/Button';

export const SolarPlusBatterySavingsSliderSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps = [
    {
      step: '01',
      title: 'Daytime Solar Harvest',
      timeframe: 'Morning to Afternoon',
      badge: '100% Free Solar',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Sun,
      iconColor: 'text-amber-500 bg-amber-500/10',
      description:
        'Your high-efficiency rooftop panels power your daytime household appliances while directly filling your battery storage with surplus clean energy.',
      metric: 'Powers all daytime home loads',
    },
    {
      step: '02',
      title: 'Evening Peak Elimination',
      timeframe: '4:00 PM – 10:00 PM',
      badge: 'Zero Peak Rates',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Moon,
      iconColor: 'text-emerald-500 bg-emerald-500/10',
      description:
        'When energy retailers charge expensive peak rates (45¢–52¢/kWh), your battery seamlessly takes over to power cooking, TVs, lighting, and air-con.',
      metric: 'Saves up to 48¢/kWh during peak',
    },
    {
      step: '03',
      title: 'Instant Blackout Protection',
      timeframe: '24/7 Storm Defense',
      badge: 'Sub-100ms Switchover',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: ShieldCheck,
      iconColor: 'text-sky-500 bg-sky-500/10',
      description:
        'If severe Nationwide weather knocks down neighborhood power lines, your automatic transfer gateway keeps your refrigeration, lights, and Wi-Fi running uninterrupted.',
      metric: 'Seamless whole-home backup',
    },
    {
      step: '04',
      title: 'Up to 88% Bill Reduction',
      timeframe: 'Year-Round Financial Yield',
      badge: 'Max ROI',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: DollarSign,
      iconColor: 'text-indigo-500 bg-indigo-500/10',
      description:
        'By combining rooftop solar generation with intelligent battery storage, most households slash their quarterly electricity expense down to basic supply charges.',
      metric: 'Save $2,800 – $4,600+ annually',
    },
  ];

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  }, [steps.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    pauseTemporarily();
  };

  // Auto-slide every 4.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
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
    <section className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
      {/* Concise Section Header */}
      <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 mt-3 tracking-tight leading-snug">
          How a Solar + Battery System <br className="hidden sm:inline" /> Works for You
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          A matched solar and battery ecosystem operates automatically 24/7 to deliver free power, eliminate peak energy prices, and safeguard your home.
        </p>
      </div>

      {/* Mobile Sliding Carousel (< md: Cards Slide One-by-One with Autoplay & Swipe) */}
      <div className="block md:hidden mb-6">
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
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="w-full shrink-0 px-0.5 flex flex-col">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full">
                    <div>
                      {/* Top Row: Icon & Step Number */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                          Step {item.step}
                        </span>
                      </div>

                      {/* Badge & Timeframe */}
                      <div className="mb-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor} inline-block mb-1`}>
                          {item.badge}
                        </span>
                        <div className="text-[11px] font-medium text-slate-500">
                          {item.timeframe}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-serif font-bold text-slate-950 mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs xs:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Metric Pill */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                      <span>✓ {item.metric}</span>
                      <span className="text-[11px] font-mono text-slate-400">0{idx + 1}/0{steps.length}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Controls (Dots + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {steps.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to step ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === dotIdx
                    ? 'w-6 bg-[#2B3CB8]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 mr-1">
              0{activeSlide + 1} / 0{steps.length}
            </span>
            <button
              type="button"
              onClick={() => {
                prevSlide();
                pauseTemporarily();
              }}
              aria-label="Previous step"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                nextSlide();
                pauseTemporarily();
              }}
              aria-label="Next step"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Running Indicator / Swipe Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 px-1 font-medium">
          <span>← Swipe to explore</span>
          <span className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
            {isPaused ? 'Paused' : 'Auto-sliding'}
          </span>
          <span>Step {activeSlide + 1} of {steps.length} →</span>
        </div>
      </div>

      {/* Desktop & Tablet Grid (>= md): 4 Clean Content Cards */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-slate-50 rounded-xl p-5 border shadow-black/50 shadow-md border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/70 transition-all group"
            >
              <div>
                {/* Top Row: Icon & Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {item.step}
                  </span>
                </div>

                {/* Badge & Timeframe */}
                <div className="mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor} inline-block mb-1`}>
                    {item.badge}
                  </span>
                  <div className="text-[11px] font-medium text-slate-400">
                    {item.timeframe}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-950 mb-2 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Metric Pill */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-slate-700">
                ✓ {item.metric}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SolarPlusBatterySavingsSliderSection;
