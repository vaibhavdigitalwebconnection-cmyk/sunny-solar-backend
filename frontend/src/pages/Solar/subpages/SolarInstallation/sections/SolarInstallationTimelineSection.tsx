import React, { useState, useRef } from 'react';
import {
  Clock,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Cable,
  Gauge,
  Smartphone,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const SolarInstallationTimelineSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const steps = [
    {
      time: '07:00 AM',
      icon: ShieldCheck,
      title: 'Site Arrival & Safety Induction',
      description:
        'Our lead Master Electrician introduces the crew, conducts the roof structural hazard review, installs fall-arrest harness points, and covers grounds and pathways below.',
      tag: 'Safety Protocol',
    },
    {
      time: '08:30 AM',
      icon: Wrench,
      title: 'Roof Racking & Precision Flashing',
      description:
        'Marine-grade Clenergy rails are mounted with cyclone-rated brackets. Tile roofs are diamond-notched and flashed to prevent cracked tiles. Tin roofs use heavy-gauge dektite waterproofing.',
      tag: 'Zero Roof Leaks',
    },
    {
      time: '11:00 AM',
      icon: Cable,
      title: 'DC String Cabling & Conduit Concealment',
      description:
        'Heavy-duty solar DC cabling is run inside internal wall cavities or neat powder-coated metal conduits where possible — never left draped loosely across your gutters.',
      tag: 'Clean Aesthetics',
    },
    {
      time: '01:00 PM',
      icon: Gauge,
      title: 'Inverter & Switchboard Protection Wiring',
      description:
        'The inverter and smart consumption meter are securely mounted. Switchboard protection circuits, safety switches, and isolation devices are wired strictly to AS/NZS 5033 standards.',
      tag: 'Electrical Safety',
    },
    {
      time: '02:30 PM',
      icon: Sparkles,
      title: 'Panel Securing & Torque Verification',
      description:
        'Modules are hoisted and secured using calibrated torque wrenches to manufacturer specifications. Earth continuity is verified across every single rail and frame.',
      tag: 'Precision Engineering',
    },
    {
      time: '03:30 PM',
      icon: Smartphone,
      title: 'Energisation, Testing & App Setup',
      description:
        'We power on the system, verify live voltage telemetry, connect the inverter to your home Wi-Fi, and walk you through the live smartphone monitoring dashboard.',
      tag: 'Handover & Training',
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const prevSlide = () => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => Math.min(steps.length - 1, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <Badge variant="amber" className="mb-2.5 sm:mb-3">
            Single-Day Turnaround
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-slate-950 mt-2 sm:mt-3 tracking-tight leading-tight">
            What Happens on Your Installation Day
          </h2>
          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-1 sm:px-0">
            Most residential systems are fully installed, safety-tested, and commissioned in a single seamless day by our full-time in-house tradesmen.
          </p>
        </div>

        {/* Mobile Sliding Carousel (< md) */}
        <div className="block md:hidden">
          {/* Step Progress Bar Indicator */}
          <div className="grid grid-cols-6 gap-1.5 mb-4 px-0.5">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Jump to step ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeSlide
                    ? 'bg-amber-500'
                    : i < activeSlide
                      ? 'bg-[#2B3CB8]'
                      : 'bg-slate-200'
                  }`}
              />
            ))}
          </div>

          {/* Swipeable Slide Window */}
          <div
            className="overflow-hidden   cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="w-full shrink-0 px-0.5">
                    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[300px]">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-md">
                              STEP 0{idx + 1}
                            </span>
                            <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20">
                              <Clock className="w-3 h-3 shrink-0" />
                              {step.time}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                            {step.tag}
                          </span>
                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                          <Icon className="w-5.5 h-5.5" />
                        </div>

                        <h3 className="font-serif font-bold text-base text-slate-950 mb-1.5 leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Quality Inspection Sign-Off</span>
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
                  onClick={() => setActiveSlide(dotIdx)}
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
                onClick={prevSlide}
                disabled={activeSlide === 0}
                aria-label="Previous step"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={activeSlide === steps.length - 1}
                aria-label="Next step"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
            ← Swipe to explore full installation day →
          </p>
        </div>

        {/* Desktop & Tablet Grid (>= md) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 hover:border-amber-400 hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-200/70 px-1.5 py-0.5 rounded">
                        0{idx + 1}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/20">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        {step.time}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-950 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Quality Inspection Sign-Off</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full text-center">
          <Button
            to="/get-started/free-assessment"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-bold shadow-md justify-center text-center sm:text-base sm:py-3.5 sm:px-6"
          >
            Book My Free 3D Roof Assessment
          </Button>
          <Button
            to="/about/trent"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto font-semibold justify-center text-center sm:text-base sm:py-3.5 sm:px-6"
          >
            Meet Trent Palmer, Lead Electrician
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SolarInstallationTimelineSection;
