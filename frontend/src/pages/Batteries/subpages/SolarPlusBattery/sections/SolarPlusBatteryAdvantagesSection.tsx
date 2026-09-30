import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const SolarPlusBatteryAdvantagesSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const comparisonData = [
    {
      feature: 'Inverter Hardware',
      bundle: '1 Unified Hybrid Inverter (serves panels & battery)',
      separate: '2 Separate Inverters (extra $1,800 – $2,400 cost)',
      winner: 'bundle',
    },
    {
      feature: 'Electrical Labor & Staging',
      bundle: 'Single deployment: 1 roof access, 1 conduit run',
      separate: 'Two separate trade callouts, double scaffold & labor',
      winner: 'bundle',
    },
    {
      feature: 'Solar Charging Efficiency',
      bundle: '97.5% Direct DC-to-DC hybrid charge path',
      separate: '88% – 90% (Lossy DC → AC → DC conversions)',
      winner: 'bundle',
    },
    {
      feature: 'Grid Network Approvals',
      bundle: '1 single utility grid application (Energex/Ergon)',
      separate: '2 separate network engineering review fees',
      winner: 'bundle',
    },
    {
      feature: 'Monitoring & Controls',
      bundle: '1 single smartphone app (live solar + battery + loads)',
      separate: '2 different manufacturer apps with conflicting data',
      winner: 'bundle',
    },
    {
      feature: 'Warranty & Accountability',
      bundle: 'Single SAA Master Electrician covers entire system',
      separate: 'Multiple installers blaming each other for faults',
      winner: 'bundle',
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
    setActiveSlide((prev) => (prev + 1) % comparisonData.length);
  }, [comparisonData.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? comparisonData.length - 1 : prev - 1));
  }, [comparisonData.length]);

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
    <section>
      {/* Header */}
      <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl max-w-3xl mx-auto font-serif font-bold text-slate-950 mt-3 tracking-tight leading-snug">
          The Engineering Advantage of Installing Bundles
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Why pairing high-efficiency solar panels with hybrid battery storage delivers superior electrical efficiency, lower lifetime costs, and complete peace of mind.
        </p>
      </div>

      {/* Mobile Head-to-Head Comparison Carousel (< md) */}
      <div className="block md:hidden mb-8">
        {/* Mobile Banner */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl mb-4 flex items-center justify-between gap-2 shadow-xs">
          <div>
            <h3 className="text-sm font-bold">Bundle vs. Retrofit</h3>
            <p className="text-[11px] text-slate-400">Why 78% choose turnkey bundles</p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full shrink-0">
            Avg. Save $2,200+
          </span>
        </div>

        {/* Carousel Window */}
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
            {comparisonData.map((row, idx) => (
              <div key={idx} className="w-full shrink-0 px-0.5 flex flex-col">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        System Aspect
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        Aspect 0{idx + 1} of 0{comparisonData.length}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-slate-950 mb-3.5">
                      {row.feature}
                    </h4>

                    {/* Options Comparison Stack */}
                    <div className="space-y-2.5">
                      {/* Turnkey Bundle (Winner) */}
                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-3.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            Turnkey Bundle
                          </span>
                          <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Recommended
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-slate-900 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-snug">{row.bundle}</span>
                        </div>
                      </div>

                      {/* Adding Battery Later */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                          Adding Battery Later (Retrofit)
                        </span>
                        <div className="flex items-start gap-2 text-xs text-slate-600">
                          <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{row.separate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Single installer warranty</span>
                    <span>1 utility application</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls (Dots + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {comparisonData.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to comparison aspect ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === dotIdx
                    ? 'w-6 bg-[#2B3CB8]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 mr-1">
              0{activeSlide + 1} / 0{comparisonData.length}
            </span>
            <button
              type="button"
              onClick={() => {
                prevSlide();
                pauseTemporarily();
              }}
              aria-label="Previous aspect"
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
              aria-label="Next aspect"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Running Indicator / Swipe Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 px-1 font-medium">
          <span>← Swipe to compare</span>
          <span className="flex items-center gap-1 text-emerald-600 font-mono text-[10px]">
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
            {isPaused ? 'Paused' : 'Auto-sliding'}
          </span>
          <span>Aspect {activeSlide + 1} of {comparisonData.length} →</span>
        </div>
      </div>

      {/* Desktop Head-to-Head Comparison Table (>= md) */}
      <div className="hidden md:block mb-14 overflow-hidden rounded-xl border border-slate-200 shadow-xs">
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold">Bundle vs. Phased Upgrade Comparison</h3>
            <p className="text-xs text-slate-400">See why 78% of our customers choose turnkey bundled installation</p>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
            Average Savings: $2,200+
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <th className="p-3.5 sm:p-4 w-1/4">System Aspect</th>
                <th className="p-3.5 sm:p-4 w-3/8 bg-emerald-50/70 text-emerald-950 border-x border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Turnkey Solar + Battery Bundle
                  </div>
                </th>
                <th className="p-3.5 sm:p-4 w-3/8 text-slate-500">
                  Adding Battery Later (Retrofit)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-slate-900">
                    {row.feature}
                  </td>
                  <td className="p-3.5 sm:p-4 bg-emerald-50/40 border-x border-emerald-100 font-medium text-slate-900">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{row.bundle}</span>
                    </div>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-500">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{row.separate}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SolarPlusBatteryAdvantagesSection;
