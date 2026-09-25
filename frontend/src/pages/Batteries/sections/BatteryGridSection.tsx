import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Check, 
  BatteryCharging, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const BatteryGridSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1); // Default to Featured Solar + Battery Bundle
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const subpages = [
    {
      title: 'Solar Batteries',
      shortTitle: 'Batteries Only',
      slug: '/batteries/solar-batteries',
      icon: BatteryCharging,
      badge: 'Standalone & Retrofit',
      badgeVariant: 'emerald' as const,
      tagline: 'Retrofit to any existing solar inverter or choose premium standalone storage',
      description: 'Compare top Tier-1 battery hardware: Tesla Powerwall 3, Sungrow SBR, Enphase IQ 5P, and AlphaESS on usable capacity, cycle life, warranty, and thermal safety.',
      bullets: [
        'AC-coupled retrofit connects to any existing solar inverter brand',
        'Modular capacities scaling from 5.0 kWh to 25.6 kWh+',
        'Cobalt-free LiFePO4 (LFP) chemistries with extreme fire safety',
        '10 to 15-year full manufacturer replacement warranties',
        'Compatible with existing single-phase and 3-phase switchboards',
      ],
      cta: 'Explore Solar Batteries',
      image: '/images/solutions/battery-hero.jpg',
    },
    {
      title: 'Solar + Battery Bundles',
      shortTitle: 'Solar + Battery',
      slug: '/batteries/solar-plus-battery',
      icon: Zap,
      badge: 'Most Popular & Best ROI',
      badgeVariant: 'amber' as const,
      tagline: 'All-in-one engineered solar array + hybrid storage for maximum savings',
      description: 'Installing solar panels and home battery storage simultaneously cuts installation labor costs by up to $2,200 while maximizing DC-to-DC conversion efficiency.',
      bullets: [
        'Save up to $2,200 on bundled installation and switchboard upgrades',
        'Single high-efficiency European hybrid inverter powers both panels & battery',
        'Up to 97.5% DC roundtrip efficiency with zero clipping',
        'Combined Federal STC + QLD Battery Booster rebates applied upfront',
        'Unified single-app dashboard for real-time smartphone telemetry',
      ],
      cta: 'View Solar + Battery Packages',
      isFeatured: true,
      image: '/images/solutions/battery-bundle.jpg',
    },
    {
      title: 'Battery Backup & EPS',
      shortTitle: 'Backup & EPS',
      slug: '/batteries/battery-backup',
      icon: ShieldCheck,
      badge: 'Storm & Disaster Resilience',
      badgeVariant: 'navy' as const,
      tagline: 'Sub-100ms whole-home emergency power supply & BOM storm tracking',
      description: 'Severe Queensland summer storms regularly sever power transmission lines. Our automated Emergency Power Supply keeps your home running smoothly with zero downtime.',
      bullets: [
        'Sub-100 millisecond automatic grid isolation (computers & clocks never reboot)',
        'Option for Whole-Home Backup or protected Essential-Circuit sub-board',
        'BOM Weather Watch automatically pre-charges battery before severe storms hit',
        'Black-start capability: solar continues refilling battery during multi-day outages',
        'Full compliance with Australian Standards AS/NZS 3000 & AS/NZS 5139',
      ],
      cta: 'Explore Backup Solutions',
      image: '/images/solutions/battery-storm.jpg',
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
    setActiveSlide((prev) => Math.min(subpages.length - 1, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <Badge variant="emerald" className="mb-2.5 sm:mb-3">
            Home Energy Storage
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 mt-1.5 sm:mt-2 tracking-tight leading-[1.18] sm:leading-[1.15]">
            Our Battery Energy Storage Solutions
          </h2>
          <p className="mt-2.5 sm:mt-4 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-1 sm:px-0">
            Whether you want to add storage to an existing solar setup, install a complete matched solar + battery bundle, or blackout-proof your home against Queensland storms, we have engineered solutions.
          </p>
        </div>

        {/* Mobile View (< lg): Segmented Tabs + Touch Sliding Carousel */}
        <div className="block lg:hidden">
          {/* Quick Segmented Option Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl mb-5">
            {subpages.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`flex-1 py-2 px-1.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  activeSlide === idx
                    ? 'bg-white text-slate-950 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.isFeatured && (
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                )}
                <span className="truncate">{item.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Swipeable Slide Window */}
          <div
            className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {subpages.map((sub, idx) => {
                const Icon = sub.icon;
                return (
                  <div key={idx} className="w-full shrink-0 px-0.5">
                    <div
                      className={`rounded-2xl p-5 xs:p-6 transition-all duration-300 flex flex-col justify-between relative min-h-120 ${
                        sub.isFeatured
                          ? 'bg-slate-950 text-white shadow-xl border-2 border-amber-500'
                          : 'bg-white text-slate-900 border border-slate-200/90 shadow-2xs'
                      }`}
                    >
                      <div>
                        {sub.isFeatured && (
                          <div className="flex justify-center mb-3">
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-amber-400/80 inline-flex items-center gap-1.5 whitespace-nowrap">
                              <Sparkles className="w-3 h-3 fill-slate-950" />
                              Highest Savings Option
                            </span>
                          </div>
                        )}

                        {/* Top Row: Icon & Badge */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            sub.isFeatured
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
                              : 'bg-emerald-500/10 text-emerald-600 border border-emerald-300/40'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge variant={sub.badgeVariant} size="sm">
                            {sub.badge}
                          </Badge>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className={`text-xl xs:text-2xl font-bold tracking-tight mb-1.5 ${
                          sub.isFeatured ? 'text-white' : 'text-slate-950'
                        }`}>
                          {sub.title}
                        </h3>
                        <p className={`text-xs font-semibold mb-3 ${
                          sub.isFeatured ? 'text-amber-400' : 'text-emerald-700'
                        }`}>
                          {sub.tagline}
                        </p>

                        <p className={`text-xs xs:text-sm leading-relaxed mb-4 ${
                          sub.isFeatured ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {sub.description}
                        </p>

                        {/* Bullet Highlights */}
                        <div className={`space-y-2.5 pb-4 border-b ${
                          sub.isFeatured ? 'border-slate-800' : 'border-slate-100'
                        }`}>
                          {sub.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                              <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                                sub.isFeatured ? 'text-amber-400' : 'text-emerald-600'
                              }`} />
                              <span className={sub.isFeatured ? 'text-slate-200' : 'text-slate-700'}>
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="mt-6 pt-2">
                        <Button
                          to={sub.slug}
                          variant={sub.isFeatured ? 'primary' : 'outline'}
                          size="md"
                          fullWidth
                          icon={<ArrowRight className="w-4 h-4" />}
                          className="font-bold py-3"
                        >
                          {sub.cta}
                        </Button>
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
              {subpages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
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
              <span className="text-xs font-mono font-bold text-slate-500 mr-1">
                0{activeSlide + 1} / 0{subpages.length}
              </span>
              <button
                type="button"
                onClick={prevSlide}
                disabled={activeSlide === 0}
                aria-label="Previous battery option"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={activeSlide === subpages.length - 1}
                aria-label="Next battery option"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
            ← Swipe to compare battery options →
          </p>
        </div>

        {/* Desktop View (>= lg): 3 Pillars Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-stretch pt-4">
          {subpages.map((sub, idx) => {
            const Icon = sub.icon;
            return (
              <div
                key={idx}
                className={`rounded-xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                  sub.isFeatured
                    ? 'bg-slate-950 text-white shadow-2xl border-2 border-amber-500 scale-100 lg:-translate-y-4'
                    : 'bg-white text-slate-900 border border-slate-300/80 shadow-sm shadow-black/50 hover:shadow-xl hover:border-emerald-400'
                }`}
              >
                {sub.isFeatured && (
                  <div className="absolute w-60 -top-3.5 left-1/2 -translate-x-1/2 text-center">
                    <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md border border-amber-300/60 inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                      Highest Savings Option
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      sub.isFeatured
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-400/30'
                        : 'bg-emerald-500/10 text-emerald-600 border border-emerald-300/40'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={sub.badgeVariant} size="sm">
                      {sub.badge}
                    </Badge>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className={`text-2xl font-bold tracking-tight mb-2 ${
                    sub.isFeatured ? 'text-white' : 'text-slate-950'
                  }`}>
                    {sub.title}
                  </h3>
                  <p className={`text-xs font-semibold mb-4 ${
                    sub.isFeatured ? 'text-amber-400' : 'text-emerald-700'
                  }`}>
                    {sub.tagline}
                  </p>

                  <p className={`text-sm leading-relaxed mb-6 ${
                    sub.isFeatured ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {sub.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className={`space-y-3 pb-6 border-b ${
                    sub.isFeatured ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    {sub.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          sub.isFeatured ? 'text-amber-400' : 'text-emerald-600'
                        }`} />
                        <span className={sub.isFeatured ? 'text-slate-200' : 'text-slate-700'}>
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8">
                  <Button
                    to={sub.slug}
                    variant={sub.isFeatured ? 'primary' : 'outline'}
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {sub.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BatteryGridSection;
