import React, { useState, useRef } from 'react';
import {
  AlertTriangle,
  CloudLightning,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const AddBatteryBackupSection: React.FC = () => {
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

  const renderNoBatteryCard = () => (
    <div className="bg-white rounded-xl border-2 border-rose-200/90 p-4 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-lg tracking-wider">
        No Battery Installed
      </div>

      <div>
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 pr-24 sm:pr-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Standard Grid-Tied Solar System
            </h4>
            <p className="text-[11px] sm:text-xs text-rose-600 font-semibold mt-0.5">
              Automatic Anti-Islanding Safety Cutoff
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          By Australian standard AS4777, your solar inverter MUST immediately shut down the second the street grid drops. Even at noon on a blazing sunny day, you have zero power.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-3 border-t border-rose-100">
        <span className="flex items-center gap-1.5 text-rose-700 font-medium">
          ✕ Fridge stops running
        </span>
        <span className="flex items-center gap-1.5 text-rose-700 font-medium">
          ✕ Solar generates 0 Watts
        </span>
      </div>
    </div>
  );

  const renderWithBatteryCard = () => (
    <div className="bg-white rounded-xl border-2 border-emerald-300/90 p-4 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-lg tracking-wider">
        AC-Coupled Retrofit
      </div>

      <div>
        <div className="flex items-start gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 pr-24 sm:pr-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Solar + Smart AC Storage Gateway
            </h4>
            <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-0.5">
              Continuous Off-Grid Islanding Mode
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The backup gateway instantly forms a localized private mini-grid. Your existing solar inverter re-engages and continues harvesting solar daylight to power your home and refill the battery.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 pt-3 border-t border-emerald-100">
        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
          ✓ Continuous refrigeration & lights
        </span>
        <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
          ✓ Solar recharges battery daily
        </span>
      </div>
    </div>
  );

  const renderStormVisualCard = () => (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md relative h-56 sm:h-72 lg:h-full lg:min-h-105 flex flex-col justify-end group">
      <img
        src="/images/solutions/battery-storm.jpg"
        alt="Queensland severe summer storm with resilient battery powered home"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

      {/* Overlaid Bottom Content */}
      <div className="relative z-10 p-5 sm:p-8 text-white">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Multi-Day Infinite Energy Loop
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          When the street loses power, the battery gateway creates an isolated micro-grid. Your rooftop solar charges the battery by day, and the battery powers your home by night—indefinitely.
        </p>
      </div>
    </div>
  );

  const renderFeaturePills = () => (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-slate-50 border border-slate-300/70 p-2 sm:p-2.5 rounded-xl text-center">
        <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase block">Switch Speed</span>
        <span className="text-xs font-extrabold text-slate-900 mt-0.5 block">&lt;10 ms</span>
      </div>
      <div className="bg-slate-50 border border-slate-300/70 p-2 sm:p-2.5 rounded-xl text-center">
        <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase block">Recharging</span>
        <span className="text-xs font-extrabold text-emerald-600 mt-0.5 block">Full Daytime</span>
      </div>
      <div className="bg-slate-50 border border-slate-300/70 p-2 sm:p-2.5 rounded-xl text-center">
        <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase block">Warranty</span>
        <span className="text-xs font-extrabold text-slate-900 mt-0.5 block truncate">10 Yrs</span>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-10 lg:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200/80 mb-3">
          <CloudLightning className="w-3.5 h-3.5 text-indigo-600" />
          Storm Season & Grid Outage Resilience
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Why Your Solar Panels Need a Battery to <br />
          <span className="text-emerald-600">Survive Power Blackouts</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          Most homeowners assume solar panels work during an outage. In reality, standard solar inverters shut down immediately for lineman safety—leaving you in the dark unless backed by a smart battery.
        </p>
      </div>

      {/* 1. Mobile Experience (< lg): Storm Visual + Sliding Reality Comparison + Feature Pills */}
      <div className="block lg:hidden mb-10 space-y-4">
        {renderStormVisualCard()}

        {/* Sliding Window */}
        <div
          className="relative overflow-hidden rounded-xl"
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
              {renderNoBatteryCard()}
            </div>
            <div className="w-full shrink-0 px-0.5">
              {renderWithBatteryCard()}
            </div>
          </div>
        </div>

        {/* Mobile Carousel Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between px-1">
          {/* Active indicator dots */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSlide(0)}
              aria-label="View without battery"
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === 0 ? 'w-6 bg-rose-500' : 'w-2 bg-slate-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setActiveSlide(1)}
              aria-label="View with battery retrofit"
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
                aria-label="Previous situation"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next situation"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {renderFeaturePills()}
      </div>

      {/* 2. Desktop Experience (>= lg) - Exactly 100% Unchanged */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-stretch mb-10">
        <div className="lg:col-span-6">
          {renderStormVisualCard()}
        </div>
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {renderNoBatteryCard()}
          {renderWithBatteryCard()}
          {renderFeaturePills()}
        </div>
      </div>
    </section>
  );
};

export default AddBatteryBackupSection;
