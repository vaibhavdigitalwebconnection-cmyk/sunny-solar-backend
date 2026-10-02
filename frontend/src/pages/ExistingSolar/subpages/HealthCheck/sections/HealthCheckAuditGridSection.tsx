'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  Sun,
  ShieldAlert,
  Cpu,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Flame,
  Zap,
} from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { AnimatedGradientText } from '@/components/ui/AnimatedGradientText';
import { DotPattern } from '@/components/ui/DotPattern';

export interface AuditPillar {
  pillar: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradientBorder: string;
  gradientHeader: string;
  gradientIcon: string;
  gradientBadge: string;
  gradientProgress: string;
  accentColor: string;
  isHero?: boolean;
  heroTag?: string;
  silentRisk: string;
  riskTitle: string;
  checks: string[];
}

export const HealthCheckAuditGridSection: React.FC = () => {
  const pillars: AuditPillar[] = [
    {
      pillar: 'Pillar 01',
      title: 'Roof & Photovoltaic Panels',
      subtitle: 'Thermal cell integrity & structural security',
      icon: <Sun className="w-5 h-5 text-white" />,
      gradientBorder: 'from-amber-500/40 via-orange-500/20 to-transparent',
      gradientHeader: 'from-amber-500/15 via-orange-500/5 to-transparent',
      gradientIcon: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30',
      gradientBadge: 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-900 border-amber-300/70',
      gradientProgress: 'from-amber-500 to-orange-500',
      accentColor: '#F59E0B',
      riskTitle: 'Silent Cell & Diode Failure Risk',
      silentRisk:
        'Micro-cracks, diode burnouts, and delamination silently destroy 20% to 40% of generation while panels appear completely normal from ground level.',
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
      icon: <Flame className="w-5 h-5 text-white" />,
      gradientBorder: 'from-red-500/50 via-[#2B3CB8]/40 to-transparent',
      gradientHeader: 'from-red-500/20 via-[#2B3CB8]/10 to-transparent',
      gradientIcon: 'bg-gradient-to-br from-red-500 via-rose-600 to-[#2B3CB8] shadow-red-500/35',
      gradientBadge: 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-950 border-red-300/80',
      gradientProgress: 'from-red-500 via-rose-500 to-[#2B3CB8]',
      accentColor: '#EF4444',
      isHero: true, // "one to up" elevated middle card with BorderBeam & featured tag
      heroTag: "Australia's #1 Fire Risk Category",
      riskTitle: 'Recalled DC Isolator Fire Hazard',
      silentRisk:
        "Degraded or recalled rooftop DC isolators are Australia's #1 cause of solar house fires. Moisture ingress creates internal arcing that switchboards cannot detect.",
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
      icon: <Zap className="w-5 h-5 text-white" />,
      gradientBorder: 'from-blue-500/40 via-sky-500/20 to-transparent',
      gradientHeader: 'from-[#2B3CB8]/15 via-sky-500/5 to-transparent',
      gradientIcon: 'bg-gradient-to-br from-[#2B3CB8] to-sky-500 shadow-blue-500/30',
      gradientBadge: 'bg-gradient-to-r from-blue-500/15 to-sky-500/15 text-blue-950 border-blue-300/70',
      gradientProgress: 'from-[#2B3CB8] to-sky-500',
      accentColor: '#2B3CB8',
      riskTitle: 'Silent Inverter Throttling & Faults',
      silentRisk:
        'Inverters frequently throttle output due to dust buildup or enter silent standby mode after grid surges, costing you hundreds on each electricity bill.',
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
    <section id="audit-checklist" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Background Gradient & Subtle DotPattern */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-linear-to-r from-[#2B3CB8]/10 via-sky-400/10 to-amber-500/10 blur-3xl opacity-70" />
        <DotPattern
          width={28}
          height={28}
          cx={1}
          cy={1}
          cr={1}
          className="opacity-25 mask-[radial-gradient(ellipse_at_center,white,transparent_75%)]"
        />
      </div>

      {/* Section Header with Magic UI AnimatedGradientText */}
      <BlurFade delay={0.1} direction="up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">


        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          The 24-Point Solar Health & Safety Audit
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed px-1 sm:px-0">
          Every check is physically tested and certified by a SAA-accredited Master Electrician on your roof and switchboard — in full compliance with <span className="font-semibold text-slate-800">AS/NZS 5033</span> and <span className="font-semibold text-slate-800">AS/NZS 4777</span>.
        </p>
      </BlurFade>

      {/* Mobile Sliding Carousel (< lg: Cards Slide One-by-One with Touch Swipe) */}
      <div className="block lg:hidden">
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
              <div key={idx} className="w-full shrink-0 px-1 flex flex-col">
                <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-md flex flex-col justify-between h-full overflow-hidden">
                  {/* Top Gradient Header Accent */}
                  <div className={`h-1.5 w-full bg-linear-to-r ${pillar.gradientProgress}`} />

                  {/* Top Column: Identity & Risk */}
                  <div className={`p-4 sm:p-5 bg-linear-to-b ${pillar.gradientHeader} border-b border-slate-200/80`}>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${pillar.gradientBadge} font-mono shadow-2xs`}>
                        {pillar.pillar}
                      </span>
                      {pillar.isHero && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-linear-to-r from-red-600 to-[#2B3CB8] text-white shadow-xs">
                          Critical Safety
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 font-medium">8 Certified Checks</span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-xl ${pillar.gradientIcon} flex items-center justify-center shrink-0 shadow-md`}>
                        {pillar.icon}
                      </div>
                      <h3 className="text-base font-serif font-bold text-slate-950 leading-snug">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      {pillar.subtitle}
                    </p>

                    {/* Gradient Risk Callout */}
                    <div className="bg-white/95 backdrop-blur-xs rounded-xl p-3.5 border border-slate-200/90 text-xs leading-relaxed text-slate-700 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{pillar.riskTitle}:</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {pillar.silentRisk}
                      </p>
                    </div>
                  </div>

                  {/* Diagnostic Checks in Slide */}
                  <div className="p-4 sm:p-5 flex flex-col justify-center">
                    <div className="space-y-2.5">
                      {pillar.checks.map((check, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2.5 text-xs text-slate-700 py-0.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.2]" />
                          <span className="leading-snug">{check}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Verification Status */}
                  <div className="p-3 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">8 of 24 Points Verified</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Slider Controls */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {pillars.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === dotIdx
                    ? 'w-6 bg-linear-to-r from-[#2B3CB8] to-sky-500 shadow-xs'
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

      {/* Desktop Staggered 3-Card Grid ("One to Up, One Set" Alternating Elevation Layout) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-start pt-6">
        {pillars.map((pillar, idx) => {
          // Staggered vertical positioning: Pillar 2 (the fire safety pillar) is set higher ("one to up")
          const offsetClass = pillar.isHero ? 'lg:-translate-y-5 shadow-xl' : 'lg:translate-y-3 shadow-md';
          const delayTime = 0.15 * (idx + 1);

          return (
            <BlurFade
              key={idx}
              delay={delayTime}
              direction="up"
              className="h-full flex flex-col"
            >
              <div
                className={`relative group bg-white rounded-2xl border ${pillar.isHero ? 'border-red-400/60 ring-2 ring-red-500/20' : 'border-slate-200/90'
                  } ${offsetClass} hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full overflow-hidden`}
              >
                {/* Magic UI BorderBeam on the elevated Hero card (Pillar 02) */}
                {pillar.isHero && (
                  <BorderBeam
                    size={220}
                    duration={8}
                    borderWidth={2}
                    colorFrom="#EF4444"
                    colorTo="#2B3CB8"
                  />
                )}

                {/* Top Glowing Gradient Accent Bar */}
                <div className={`h-2 w-full bg-linear-to-r ${pillar.gradientProgress}`} />

                {/* Card Header & Risk Insight */}
                <div className={`p-6 bg-linear-to-b ${pillar.gradientHeader} border-b border-slate-200/80`}>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${pillar.gradientBadge} font-mono shadow-2xs`}>
                      {pillar.pillar}
                    </span>
                    {pillar.isHero ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-linear-to-r from-red-600 via-rose-600 to-[#2B3CB8] text-white shadow-xs animate-pulse">
                        {pillar.heroTag}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">8 Certified Checks</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className={`w-10 h-10 rounded-xl ${pillar.gradientIcon} flex items-center justify-center shrink-0 shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-slate-950 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Why This Matters Gradient Risk Advisory */}
                  <div className="mt-4 bg-white/95 backdrop-blur-xs rounded-xl p-3.5 border border-slate-200/90 text-xs leading-relaxed text-slate-700 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                      <AlertCircle className={`w-4 h-4 ${pillar.isHero ? 'text-red-600' : 'text-amber-600'} shrink-0`} />
                      <span className="text-[11px] uppercase tracking-wide font-extrabold">{pillar.riskTitle}:</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {pillar.silentRisk}
                    </p>
                  </div>
                </div>

                {/* 8 Itemized Checks */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {pillar.checks.map((check, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.2]" />
                        <span className="leading-snug">{check}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card Bottom Progress / Status */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-slate-700">8 Checks Certified</span>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      100% AS/NZS 5033
                    </span>
                  </div>
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
};

export default HealthCheckAuditGridSection;
