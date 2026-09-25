import React, { useState, useRef } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Flame,
  Activity,
  Clock,
  ShieldCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export const SavingsOptimizationSection: React.FC = () => {
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

  // Card 1: The Savings Leak (Unmonitored / Aging)
  const renderUnmonitoredCard = () => (
    <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-rose-200/90 p-4 sm:p-6 lg:p-8 shadow-xs relative flex flex-col justify-between h-full overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-bl-xl tracking-wider shadow-2xs">
        Savings Leakage
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3.5 sm:mb-4 pr-24 sm:pr-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              Unmonitored / Neglected System
            </h3>
            <p className="text-xs text-rose-600 font-semibold mt-0.5">
              Typical 4+ Year Old Rooftop Setup
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Without periodic inspections or production verification, systems silently degrade. Homeowners still receive an electricity bill, often unaware that their panels are generating far less than initial installation.
        </p>

        {/* Leak Breakdown List */}
        <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-rose-50/60 p-2.5 sm:p-3 rounded-xl border border-rose-100/80">
            <Flame className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block sm:inline">Surface Soiling & Hotspots:</span>{' '}
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-0 sm:inline">
                Dust and organic build-up cause up to 15% generation loss on sunny days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-rose-50/60 p-2.5 sm:p-3 rounded-xl border border-rose-100/80">
            <Activity className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block sm:inline">Inverter Throttling & Faults:</span>{' '}
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-0 sm:inline">
                Silent grid overvoltage trips or firmware drops can wipe out peak midday hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-rose-50/60 p-2.5 sm:p-3 rounded-xl border border-rose-100/80">
            <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block sm:inline">Mismatched Appliance Scheduling:</span>{' '}
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-0 sm:inline">
                Exporting power at 6¢ during the day while running appliances at 34¢ at night.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Small Warning Containers at bottom */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-rose-100">
        <div className="bg-rose-50/80 rounded-xl p-2.5 sm:p-3 border border-rose-200/70">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
            Estimated Annual Leak
          </span>
          <span className="text-sm sm:text-base lg:text-lg font-black text-rose-950 mt-0.5 block truncate">
            -$840 / year
          </span>
          <span className="text-[10px] text-rose-600 block mt-0.5">Uncaptured value</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Performance Grade
          </span>
          <span className="text-sm sm:text-base lg:text-lg font-black text-slate-900 mt-0.5 block truncate">
            Grade D (Sub-Par)
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Below factory spec</span>
        </div>
      </div>
    </div>
  );

  // Card 2: The Calibrated & Monitored Setup
  const renderCalibratedCard = () => (
    <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-emerald-300/90 p-4 sm:p-6 lg:p-8 shadow-xs relative flex flex-col justify-between h-full overflow-hidden">
      <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-bl-xl tracking-wider shadow-2xs">
        Optimized Solar
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3.5 sm:mb-4 pr-24 sm:pr-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              Audited & Calibrated Setup
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">
              Inspected by Master Electricians
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          With proactive string balancing, thermal inspection, and automated appliance timing, your system operates at peak capacity, converting virtually all solar daylight into direct bill relief.
        </p>

        {/* Optimization Breakdown List */}
        <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/60 p-2.5 sm:p-3 rounded-xl border border-emerald-100/80">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block sm:inline">Full Panel Output Restored:</span>{' '}
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-0 sm:inline">
                Clean surfaces and thermal hotspot repair reclaim +18% lost generation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/60 p-2.5 sm:p-3 rounded-xl border border-emerald-100/80">
            <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block sm:inline">Dynamic MPPT Peak Harvesting:</span>{' '}
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-0 sm:inline">
                Inverter firmware calibrated to Australian grid voltage standards to prevent dropouts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/60 p-2.5 sm:p-3 rounded-xl border border-emerald-100/80">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block sm:inline">Daytime Load Synchronization:</span>{' '}
              <p className="text-slate-500 text-[11px] sm:text-xs mt-0.5 sm:mt-0 sm:inline">
                Pool pumps, hot water cylinders, and EV charging run 100% on free solar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Small Success Containers at bottom */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-emerald-100">
        <div className="bg-emerald-50/80 rounded-xl p-2.5 sm:p-3 border border-emerald-200/70">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
            Recovered Cash Flow
          </span>
          <span className="text-sm sm:text-base lg:text-lg font-black text-emerald-950 mt-0.5 block truncate">
            +$1,120 / year
          </span>
          <span className="text-[10px] text-emerald-700 block mt-0.5">Guaranteed relief</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Performance Grade
          </span>
          <span className="text-sm sm:text-base lg:text-lg font-black text-slate-900 mt-0.5 block truncate">
            Grade A+ (Optimal)
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Technician certified</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Why Many Systems <span className="text-rose-600">Lose Up to 40%</span> of Their Savings
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          Over 38% of rooftop installations older than 4 years suffer from undetected inverter throttling, soiling, or shifted energy habits. See how an unmonitored setup compares directly against a calibrated system.
        </p>
      </div>

      {/* 1. Mobile Sliding Carousel (< lg: Tabs, Touch Swipe, Dots & Prev/Next) */}
      <div className="block lg:hidden mb-8">
        {/* Mobile Slide Switcher Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-3.5 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSlide === 0
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Unmonitored Leak</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSlide === 1
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Calibrated Setup</span>
          </button>
        </div>

        {/* Sliding Window */}
        <div
          className="relative overflow-hidden rounded-xl sm:rounded-2xl"
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
            {/* Slide 1 */}
            <div className="w-full shrink-0 px-0.5">
              {renderUnmonitoredCard()}
            </div>

            {/* Slide 2 */}
            <div className="w-full shrink-0 px-0.5">
              {renderCalibratedCard()}
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
              aria-label="View unmonitored system"
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === 0 ? 'w-6 bg-rose-500' : 'w-2 bg-slate-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setActiveSlide(1)}
              aria-label="View calibrated setup"
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

      {/* 2. Desktop Side-by-Side View (>= lg: Full 2 Columns) */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-stretch mb-10">
        {renderUnmonitoredCard()}
        {renderCalibratedCard()}
      </div>

      {/* Visual Diagnostic Banner with Photo & 4 Small Diagnostic Test Containers */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-6 lg:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* Image Left */}
          <div className="lg:col-span-4 rounded-xl overflow-hidden shadow-inner border border-slate-200 relative h-48 sm:h-56 lg:h-full lg:min-h-55">
            <img
              src="/images/about/gallery/electrician-testing-equipment.jpg"
              alt="Licensed electrician testing solar system efficiency"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Master Electrician Service</p>
              <p className="text-xs sm:text-sm font-bold mt-0.5">24-Point Comprehensive Diagnostic</p>
            </div>
          </div>

          {/* 4 Small Diagnostic Test Containers Right */}
          <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">
                How We Recover Your Lost Rooftop Savings
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                Our technicians test key physical and digital failure points to restore peak efficiency on existing solar setups across Queensland.
              </p>
            </div>

            {/* Test Cards: horizontally scrollable on small mobile, grid on sm+ */}
            <div className="flex sm:grid sm:grid-cols-2 gap-2.5 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x snap-mandatory">
              {/* Small Container 1 */}
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200/70 flex items-start gap-2.5 min-w-60 sm:min-w-0 shrink-0 snap-start">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  01
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Infrared Hotspot Thermography</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Identifies micro-fractured cells draining current before strings fail.</p>
                </div>
              </div>

              {/* Small Container 2 */}
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200/70 flex items-start gap-2.5 min-w-60 sm:min-w-0 shrink-0 snap-start">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  02
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Inverter MPPT Calibration</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Eliminates grid-overvoltage trip lockouts during peak sunshine.</p>
                </div>
              </div>

              {/* Small Container 3 */}
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200/70 flex items-start gap-2.5 min-w-60 sm:min-w-0 shrink-0 snap-start">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  03
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">DC Isolator Integrity Check</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Ensures no dangerous moisture ingress or thermal arcing hazards.</p>
                </div>
              </div>

              {/* Small Container 4 */}
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200/70 flex items-start gap-2.5 min-w-60 sm:min-w-0 shrink-0 snap-start">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  04
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Smart Export Verification</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">Audits meter feeds to ensure your energy provider credits every unit.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <span className="text-xs text-slate-600">
                Special audit rate: <strong className="text-slate-900 font-bold">$189 flat fee</strong> for existing rooftop solar systems.
              </span>
              <Button
                to="/existing-solar/health-check"
                variant="primary"
                size="sm"
                className="w-full sm:w-auto justify-center text-xs sm:text-sm"
              >
                Book System Check ($189)
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SavingsOptimizationSection;
