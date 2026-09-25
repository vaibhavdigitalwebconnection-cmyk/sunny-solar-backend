import React, { useState, useRef } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  AlertCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const UpgradeComparisonSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 1 ? 0 : 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
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

  // Legacy System (Outdated Architecture)
  const renderLegacyCard = () => (
    <div className="bg-slate-100/90 rounded-2xl border border-slate-300 p-5 sm:p-6 lg:p-8 relative flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4 flex-wrap">
          <span className="text-[11px] sm:text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-300 uppercase tracking-wide">
            Legacy Architecture (2012 – 2018)
          </span>
          <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Outdated Standard
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          The Early Boom Solar System
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Designed primarily to feed 44¢ or 50¢ export tariffs, these systems were built for high exports rather than self-consumption, resulting in high grid reliance today.
        </p>

        {/* Spec breakdown */}
        <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
            <ArrowDownRight className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">200W – 250W Polycrystalline:</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Low 15% efficiency rating with severe power drop-off in hot Queensland summers.</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
            <ArrowDownRight className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Single MPPT String Inverter:</span>
              <p className="text-slate-500 text-[11px] mt-0.5">If shade or bird droppings hit just one panel, the entire roof string output collapses.</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
            <ArrowDownRight className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Zero App Telemetry:</span>
              <p className="text-slate-500 text-[11px] mt-0.5">No way to check performance without walking out to the garage and reading faint LCD codes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Average Daily Yield: ~12–16 kWh</span>
        <span className="font-semibold text-rose-600">High Grid Reliance</span>
      </div>
    </div>
  );

  // Modernized System (Current Tier-1 Standard)
  const renderModernCard = () => (
    <div className="bg-white rounded-2xl border-2 border-emerald-400 p-5 sm:p-6 lg:p-8 shadow-sm relative flex flex-col justify-between h-full overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
        Current Tier-1 Standard
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4 pr-24 sm:pr-0">
          <span className="text-[11px] sm:text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 uppercase tracking-wide">
            Modernized Architecture (2025/2026)
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          The Self-Consumption Powerhouse
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Engineered specifically to power high-draw domestic loads (heat pumps, ducted AC, EV chargers) directly during the day while seamlessly integrating battery storage.
        </p>

        {/* Spec breakdown */}
        <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-700">
            <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">440W – 475W N-Type TOPCon:</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Ultra-high 22.5%+ efficiency with superior heat coefficient and early morning generation.</p>
            </div>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-700">
            <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Dual-MPPT Independent Tracking:</span>
              <p className="text-slate-500 text-[11px] mt-0.5">East and West facets operate independently; partial shade on one string never affects the other.</p>
            </div>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-xs text-slate-700">
            <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Instant Phone App & Wi-Fi Alerts:</span>
              <p className="text-slate-500 text-[11px] mt-0.5">Live solar generation, household usage, and instant notifications if grid voltage fluctuates.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
        <span>Average Daily Yield: ~34–48 kWh</span>
        <span className="font-bold text-emerald-700">85%+ Daytime Independence</span>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Technical Evolution: <br />
          <span className="text-slate-900">Legacy Systems vs. </span>
          <span className="text-emerald-600">Modernized Solar Architecture</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          Solar technology has advanced dramatically over the past decade. Upgrading transforms your rooftop from an inefficient daytime trickle into a smart, high-yield household power station.
        </p>
      </div>

      {/* 1. Mobile Sliding Carousel (< lg) */}
      <div className="block lg:hidden mb-10">
        {/* Mobile Slide Switcher Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-3.5 border border-slate-200/80 gap-1">
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSlide === 0
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Legacy (2012–18)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSlide === 1
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Modern (2025/26)</span>
          </button>
        </div>

        {/* Sliding Window */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            <div className="w-full shrink-0 px-0.5">
              {renderLegacyCard()}
            </div>
            <div className="w-full shrink-0 px-0.5">
              {renderModernCard()}
            </div>
          </div>
        </div>

        {/* Mobile Carousel Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-3 px-1">
          {/* Active indicator dots */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSlide(0)}
              aria-label="View legacy architecture"
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === 0 ? 'w-6 bg-rose-500' : 'w-2 bg-slate-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setActiveSlide(1)}
              aria-label="View modern architecture"
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === 1 ? 'w-6 bg-emerald-600' : 'w-2 bg-slate-300'
              }`}
            />
          </div>

          {/* Swipe indicator & arrow buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              {activeSlide === 0 ? '1 / 2 (Swipe →)' : '2 / 2 (← Swipe)'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Desktop Side-by-Side View (>= lg) */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch mb-10">
        {renderLegacyCard()}
        {renderModernCard()}
      </div>
    </section>
  );
};

export default UpgradeComparisonSection;
