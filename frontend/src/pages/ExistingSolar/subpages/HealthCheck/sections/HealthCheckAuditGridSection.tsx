import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  Sun,
  ShieldAlert,
  Cpu,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export interface AuditPillar {
  pillar: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  badgeBg: string;
  silentRisk: string;
  checks: string[];
}

export const HealthCheckAuditGridSection: React.FC = () => {
  const pillars: AuditPillar[] = [
    {
      pillar: 'Pillar 01',
      title: 'Roof & Photovoltaic Panels',
      subtitle: 'Thermal cell integrity & structural security',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
      iconBg: 'bg-amber-500/10',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
      silentRisk: 'Micro-cracks, diode burnouts, and delamination silently destroy 20% to 40% of generation while panels appear completely normal from ground level.',
      checks: [
        'Infrared thermal camera scan for cell micro-cracks & diode hot spots',
        'Visual examination for snail trails, browning, and glass delamination',
        'Structural clamp torque and anodized aluminum rail corrosion check',
        'Debris, lichen, leaf build-up, and bird nest obstruction audit',
        'Under-panel DC string cable sag and UV tie deterioration inspection',
        'Open-circuit voltage (Voc) string balance testing under ambient load',
        'Roof penetration flashings and tile bracket weather seal check',
        'Array earth continuity and equipotential bonding verification',
      ],
    },
    {
      pillar: 'Pillar 02',
      title: 'Electrical Safety & Isolators',
      subtitle: 'Fire prevention & Australian Standard compliance',
      icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
      iconBg: 'bg-red-500/10',
      badgeBg: 'bg-red-100 text-red-900 border-red-200',
      silentRisk: 'Degraded or recalled rooftop DC isolators are Australia\'s #1 cause of solar house fires. Moisture ingress creates internal arcing that switchboards cannot detect.',
      checks: [
        'Rooftop high-voltage DC isolator weather seal & recall audit',
        'Earth continuity and insulation resistance (Megger) testing',
        'Main switchboard AC circuit breaker & RCD rating verification',
        'Heavy-duty conduit UV degradation and waterproof gland check',
        'Emergency solar supply main switch hazard tagging & labeling',
        'Arc-fault prevention and AS/NZS 5033 fire safety audit',
        'Switchboard surge protection and lightning diverter check',
        'Grid impedance and fault loop impedance measurement',
      ],
    },
    {
      pillar: 'Pillar 03',
      title: 'Inverter Performance & Output',
      subtitle: 'DC-to-AC conversion & cloud telemetry',
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-500/10',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
      silentRisk: 'Inverters frequently throttle output due to dust buildup or enter silent standby mode after grid surges, costing you hundreds on each electricity bill.',
      checks: [
        'DC string input vs AC grid feed power conversion calibration',
        'Internal inverter error code log & historical fault review',
        'Heat sink thermal dissipation, fan operation, and capacitor test',
        'Anti-islanding and automated grid safety disconnect test',
        'Firmware update to latest manufacturer performance build',
        'Wi-Fi monitoring reconnection and cloud telemetry sync',
        'Benchmark actual daily kWh output against factory spec',
        'Supply voltage rise calculation to prevent midday curtailment',
      ],
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
  }, [pillars.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? pillars.length - 1 : prev - 1));
  }, [pillars.length]);

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
    <section id="audit-checklist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          The 24-Point Solar Health & Safety Audit
        </h2>
        <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed px-1 sm:px-0">
          Every check is physically tested and certified by a CEC-accredited Master Electrician on your roof and switchboard — in full compliance with AS/NZS 5033 and AS/NZS 4777.
        </p>
      </div>

      {/* Mobile Sliding Carousel (< md: Cards Slide One-by-One with Autoplay & Touch Swipe) */}
      <div className="block md:hidden">
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
            {pillars.map((pillar, idx) => (
              <div key={idx} className="w-full shrink-0 px-0.5 flex flex-col">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between h-full overflow-hidden">
                  {/* Top Column: Pillar Identity & Critical Risk */}
                  <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200/80">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${pillar.badgeBg} font-mono`}>
                        {pillar.pillar}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">8 Certified Checks</span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`w-8 h-8 rounded-lg ${pillar.iconBg} flex items-center justify-center shrink-0`}>
                        {pillar.icon}
                      </div>
                      <h3 className="text-base font-serif font-bold text-slate-950 leading-snug">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mb-3">
                      {pillar.subtitle}
                    </p>

                    <div className="bg-white rounded-lg p-3 border border-slate-200 text-xs leading-relaxed text-slate-700">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Why This Matters:</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {pillar.silentRisk}
                      </p>
                    </div>
                  </div>

                  {/* Diagnostic Checks in Slide */}
                  <div className="p-4 sm:p-5 flex flex-col justify-center">
                    <div className="space-y-2">
                      {pillar.checks.map((check, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 py-0.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.2]" />
                          <span className="leading-snug">{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Slider Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {pillars.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === dotIdx
                    ? 'w-6 bg-[#2B3CB8]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-slate-500">
              {activeSlide + 1} / {pillars.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  prevSlide();
                  pauseTemporarily();
                }}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer transition-colors active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  nextSlide();
                  pauseTemporarily();
                }}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs cursor-pointer transition-colors active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Full-Width Pillar Rows */}
      <div className="hidden md:block space-y-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Pillar Identity & Critical Risk Insight (4 cols) */}
              <div className="p-6 sm:p-7 lg:col-span-4 bg-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between sm:justify-start gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${pillar.badgeBg} font-mono`}>
                      {pillar.pillar}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">8 Certified Checks</span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-lg ${pillar.iconBg} flex items-center justify-center shrink-0`}>
                      {pillar.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-950">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mb-4">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Integrated Risk Advisory for this Pillar */}
                <div className="bg-white rounded-lg p-3.5 border border-slate-200 text-xs leading-relaxed text-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Why This Matters:</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {pillar.silentRisk}
                  </p>
                </div>
              </div>

              {/* Right Column: 8 Itemized Diagnostic Checks in 2 Columns (8 cols) */}
              <div className="p-6 sm:p-7 lg:col-span-8 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {pillar.checks.map((check, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.2]" />
                      <span className="leading-snug">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthCheckAuditGridSection;
