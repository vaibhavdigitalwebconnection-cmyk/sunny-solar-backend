import React, { useState, useRef } from 'react';
import {
  Sun,
  BatteryCharging,
  Moon,
  Activity,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const AddBatteryHowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const steps = [
    {
      number: '01',
      tabLabel: '01. Day Solar',
      title: 'Daytime Solar Powers Home First',
      badge: 'Panels Active',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      activeColor: 'bg-amber-500 text-white',
      dotColor: 'bg-amber-500',
      icon: Sun,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50 border-amber-200',
      description: 'Your existing rooftop panels continue converting sunlight into household AC power as normal. Daytime base loads (fridge, computers, air-con) are served immediately at $0 cost.',
      stat: '100% Free Daylight Power',
    },
    {
      number: '02',
      tabLabel: '02. Diversion',
      title: 'Smart Meter Diverts Excess Solar',
      badge: 'Zero Grid Leakage',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      activeColor: 'bg-emerald-600 text-white',
      dotColor: 'bg-emerald-600',
      icon: Cpu,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-200',
      description: 'Instead of dumping surplus solar into the grid for a measly 5¢/kWh feed-in tariff, the switchboard smart meter automatically redirects excess energy into your battery storage.',
      stat: 'Stores 100% Surplus Energy',
    },
    {
      number: '03',
      tabLabel: '03. Evening Peak',
      title: 'Evening Peak Grid Decoupling',
      badge: 'Peak Tariff Avoidance',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      activeColor: 'bg-sky-600 text-white',
      dotColor: 'bg-sky-600',
      icon: Moon,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-200',
      description: 'When the sun sets and grid electricity rates spike to 38¢–44¢/kWh (4 PM to 10 PM), your battery seamlessly discharges stored daylight solar to power your evening routines.',
      stat: 'Zero 38¢/kWh Peak Purchases',
    },
    {
      number: '04',
      tabLabel: '04. Overnight',
      title: 'Overnight Reserve & Storm Ready',
      badge: '24/7 Resilience',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      activeColor: 'bg-indigo-600 text-white',
      dotColor: 'bg-indigo-600',
      icon: BatteryCharging,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50 border-indigo-200',
      description: 'Clean battery power sustains refrigerators and lighting throughout the night. Built-in storm monitoring keeps an emergency reserve ready for unexpected grid dropouts.',
      stat: 'Automated Blackout Buffer',
    },
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
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
      nextStep();
    } else if (diff < -40) {
      prevStep();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const renderMobileStageCard = (step: (typeof steps)[0]) => {
    const Icon = step.icon;
    return (
      <div className="bg-white rounded-2xl border border-slate-200/85 p-4 sm:p-5 shadow-xs relative overflow-hidden flex flex-col justify-between h-full">
        {/* Subtle Step Glow indicator */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />

        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl ${step.iconBg} border flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${step.iconColor}`} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 font-mono block">STAGE {step.number}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block ${step.badgeColor}`}>
                  {step.badge}
                </span>
              </div>
            </div>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {step.title}
          </h4>

          <p className="text-xs text-slate-600 leading-relaxed mt-2">
            {step.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <Activity className="w-3.5 h-3.5 shrink-0" />
          <span>{step.stat}</span>
        </div>
      </div>
    );
  };

  const renderSwitchboardCard = () => (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
      <div className="relative h-52 sm:h-64 lg:h-full lg:min-h-85 bg-slate-900 group">
        <img
          src="/images/about/gallery/electrician-wiring-switchboard.jpg"
          alt="Licensed electrician installing AC-coupled battery smart meter at residential switchboard"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
        
        {/* Overlaid Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-md bg-slate-900/85 px-3 py-1 rounded-md border border-white/20 text-white text-[11px] sm:text-xs font-bold">
          Switchboard Connection
        </div>

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
          <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Zero Roof Intrusion</span>
          <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">
            Installed beside your switchboard in a single 4–6 hour visit.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 sm:mb-2">Why AC-Coupling Beats Inverter Replacement</h3>
        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
          If your current solar string inverter is working properly, replacing it with an expensive hybrid inverter is wasteful. An AC-coupled battery has its own dedicated bi-directional inverter, keeping both warranties 100% independent.
        </p>

        {/* Micro spec pills */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 sm:mt-4">
          <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 text-center">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">Single & 3-Phase</span>
            <span className="text-xs sm:text-xs font-extrabold text-slate-800">100% Compatible</span>
          </div>
          <div className="bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 text-center">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">Installation Time</span>
            <span className="text-xs sm:text-xs font-extrabold text-emerald-600">Same-Day Active</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="retrofit-flow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-6xl mx-auto mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-3xl mx-auto font-extrabold text-slate-900 tracking-tight">
          How Adding a Battery <br /> <span className="text-emerald-600">Supercharges Existing Solar</span>
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed px-1 sm:px-0">
          AC-coupling is the gold standard for retrofits. It connects directly at your main switchboard without touching your roof or replacing your solar inverter.
        </p>
      </div>

      {/* 1. Mobile Experience (< lg): 4-Stage Sliding Carousel + Compact Showcase */}
      <div className="block lg:hidden mb-10 space-y-6">
        {/* Mobile Switcher Tabs */}
        <div>
          

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
                transform: `translateX(-${activeStep * 100}%)`,
              }}
            >
              {steps.map((step) => (
                <div key={step.number} className="w-full shrink-0 px-0.5">
                  {renderMobileStageCard(step)}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Controls */}
          <div className="flex items-center justify-between mt-3 px-1">
            {/* Active indicator dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((s, idx) => (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  aria-label={`View stage ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeStep === idx ? `w-6 ${s.dotColor}` : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Swipe indicator & arrow buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-medium text-slate-500">
                {activeStep + 1} / 4 {activeStep === 0 ? '(Swipe →)' : activeStep === 3 ? '(← Swipe)' : ''}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevStep}
                  aria-label="Previous lifecycle stage"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  aria-label="Next lifecycle stage"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Switchboard Installation Card */}
        {renderSwitchboardCard()}
      </div>

      {/* 2. Desktop Experience (>= lg) - Exactly 100% Unchanged */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch mb-10">
        {/* Left Side: Real Switchboard Installation Showcase */}
        <div className="lg:col-span-5">
          {renderSwitchboardCard()}
        </div>

        {/* Right Side: 4 Connected Flow Stages */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white border border-slate-200/85 hover:border-emerald-300 p-4 sm:p-5 shadow-xs transition-all relative overflow-hidden group"
              >
                {/* Subtle Step Glow indicator */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />

                <div className="flex items-start gap-4">
                  {/* Step Number & Icon Pill */}
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                    <Icon className={`w-5 h-5 ${step.iconColor}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-400 font-mono">STAGE {step.number}</span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{step.title}</h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{step.stat}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AddBatteryHowItWorksSection;
