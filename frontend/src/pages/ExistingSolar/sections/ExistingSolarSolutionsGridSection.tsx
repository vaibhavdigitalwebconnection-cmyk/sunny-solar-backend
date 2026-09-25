import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, CheckCircle2, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

export interface ExistingSolarSolution {
  title: string;
  slug: string;
  image: string;
  badge: string;
  badgeVariant: 'amber' | 'emerald' | 'navy';
  metric: string;
  desc: string;
  bullets: string[];
  cta: string;
}

export const ExistingSolarSolutionsGridSection: React.FC = () => {
  const sections: ExistingSolarSolution[] = [
    {
      title: 'Solar Health Check',
      slug: '/existing-solar/health-check',
      image: '/hero-installer.jpg',
      badge: 'Safety & Audit',
      badgeVariant: 'amber',
      metric: '24-Point Thermal Scan',
      desc: 'Detect silent inverter faults, micro-cracks, and dangerous rooftop DC isolator degradation before costly bills arrive.',
      bullets: [
        'Infrared thermal imaging of cells',
        'DC isolator fire safety inspection',
        'Inverter efficiency & firmware testing',
      ],
      cta: 'Book Health Check ($189)',
    },
    {
      title: 'How Much Have I Saved?',
      slug: '/existing-solar/savings',
      image: '/images/solutions/net-metering.jpg',
      badge: 'Savings Audit',
      badgeVariant: 'emerald',
      metric: 'Benchmark Lifetime ROI',
      desc: 'Audit your existing solar system against Queensland historical radiation data to verify your true lifetime return on investment.',
      bullets: [
        'Lifetime retail bill savings audit',
        'Analyze low feed-in tariff losses',
        'Identify hidden degradation drops',
      ],
      cta: 'Calculate Historical ROI',
    },
    {
      title: 'Solar Array Expansion',
      slug: '/existing-solar/upgrade',
      image: '/images/about/solar-installation-aerial.jpg',
      badge: 'Capacity Boost',
      badgeVariant: 'navy',
      metric: 'Up to 4x More Daily Output',
      desc: 'Outgrown your 3kW or 5kW system? Add high-efficiency N-Type panels to vacant roof facets or re-power with modern 440W modules.',
      bullets: [
        'Double harvest in same roof footprint',
        'Swap aging inverters for Fronius units',
        'Claim Federal STC point-of-sale rebates',
      ],
      cta: 'Explore Upgrade Options',
    },
    {
      title: 'Add a Battery Retrofit',
      slug: '/existing-solar/add-battery',
      image: '/images/solutions/battery-bundle.jpg',
      badge: 'High Rebate',
      badgeVariant: 'emerald',
      metric: 'Zero Roof Disruption',
      desc: 'Keep your existing solar panels and connect an AC-coupled battery (Tesla Powerwall 3 or Sungrow) directly to your switchboard.',
      bullets: [
        '100% compatible with any inverter',
        'Whole-home storm blackout backup',
        'Eligible for Battery Booster rebates',
      ],
      cta: 'View Battery Retrofits',
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
    }, 5000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % sections.length);
  }, [sections.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  }, [sections.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    pauseTemporarily();
  };

  // Auto-slide every 4 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          Existing Solar Solutions & Services
        </h2>
        <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed px-1 sm:px-0">
          Whether you want to verify safety compliance, calculate historical ROI, expand panel capacity, or add smart battery storage, our Master Electricians are ready to help.
        </p>
      </div>

      {/* Mobile Sliding Carousel (< md: Cards Slide One-by-One with Autoplay & Swipe) */}
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
            {sections.map((sec, idx) => (
              <div key={idx} className="w-full shrink-0 px-0.5 flex flex-col">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    {/* Photo Container */}
                    <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                      <img
                        src={sec.image}
                        alt={sec.title}
                        className="w-full h-full object-cover opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge variant={sec.badgeVariant} size="sm">
                          {sec.badge}
                        </Badge>
                      </div>

                      {/* Bottom Metric inside Photo */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-xs border border-white/10 text-xs font-semibold text-emerald-300 max-w-full">
                          <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{sec.metric}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-950 mb-2 leading-snug">
                          {sec.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {sec.desc}
                        </p>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                        {sec.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100">
                      <Button
                        to={sec.slug}
                        variant="outline"
                        size="md"
                        fullWidth
                        icon={<ArrowRight className="w-4 h-4" />}
                        className="w-full font-bold hover:bg-[#2B3CB8] hover:text-white hover:border-[#2B3CB8] transition-all"
                      >
                        {sec.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {sections.map((_, dotIdx) => (
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
            <span className="text-xs font-mono font-bold text-slate-500 mr-1">
              0{activeSlide + 1} / 0{sections.length}
            </span>
            <button
              type="button"
              onClick={() => {
                prevSlide();
                pauseTemporarily();
              }}
              aria-label="Previous solution"
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
              aria-label="Next solution"
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
          <span>Solution {activeSlide + 1} of {sections.length} →</span>
        </div>
      </div>

      {/* Desktop & Tablet Grid (>= md): 4-Column Card Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#2B3CB8]/40 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Photo Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                <img
                  src={sec.image}
                  alt={sec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant={sec.badgeVariant} size="sm">
                    {sec.badge}
                  </Badge>
                </div>

                {/* Bottom Metric inside Photo */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/75 backdrop-blur-xs border border-white/10 text-xs font-semibold text-emerald-300 max-w-full">
                    <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{sec.metric}</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-950 group-hover:text-[#2B3CB8] transition-colors mb-1.5 leading-snug">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-12">
                    {sec.desc}
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-700">
                  {sec.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100">
                <Button
                  to={sec.slug}
                  variant="outline"
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />}
                  className="w-full text-xs sm:text-sm py-2 sm:py-2.5 font-semibold hover:bg-[#2B3CB8] hover:text-white hover:border-[#2B3CB8] transition-all"
                >
                  {sec.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExistingSolarSolutionsGridSection;
