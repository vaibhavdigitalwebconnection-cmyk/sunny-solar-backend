import React, { useState, useRef } from 'react';
import {
  RefreshCw,
  Layers,
  ArrowUpCircle,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const SolarUpgradesOptionsSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1); // Default to High ROI (Panel Capacity Expansion)
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const upgradeTypes = [
    {
      icon: RefreshCw,
      shortTitle: 'Inverter Swap',
      badge: 'Most Common',
      badgeVariant: 'slate' as const,
      title: 'Inverter Replacement',
      subtitle: 'Swap out faulty, noisy, or aging inverters',
      metric: 'Immediate Output Restoration',
      desc: 'Inverters installed between 2010 and 2018 commonly fail after 7–10 years. We replace dead units with smart European Fronius or Sungrow hybrid inverters featuring live smartphone app tracking, 10-year warranties, and battery upgrade support.',
      bullets: [
        'Immediate restoration of daily power generation',
        'Adds live smartphone app & Wi-Fi telemetry',
        'Direct hybrid battery upgrade capability',
        'Eliminates dangerous recalled DC isolator fire hazards',
      ],
      ctaText: 'Replace Faulted Inverter',
      ctaLink: '/existing-solar/health-check',
      primary: false,
    },
    {
      icon: Layers,
      shortTitle: 'Panel Expansion',
      badge: 'High ROI',
      badgeVariant: 'amber' as const,
      title: 'Panel Capacity Expansion',
      subtitle: 'Add 3kW to 6kW+ onto your existing roof array',
      metric: '+18 to +30 kWh / Day Added',
      desc: 'If your power bills have grown due to new ducted climate control, an electric vehicle, or a pool heat pump, we add high-efficiency N-Type panels to vacant roof facets using a secondary MPPT string without disturbing your working setup.',
      bullets: [
        'Zero need to tear down your working panels',
        'Fully eligible for current Federal STC discounts',
        'Maximizes east, west, and north sun exposure',
        'We manage all Energex network export approvals',
      ],
      ctaText: 'Expand Solar Capacity',
      ctaLink: '/get-started/free-assessment',
      primary: true,
    },
    {
      icon: ArrowUpCircle,
      shortTitle: 'Full Re-Power',
      badge: 'Maximum Output',
      badgeVariant: 'emerald' as const,
      title: 'Complete System Re-Power',
      subtitle: 'Replace obsolete 190W–250W panels with modern 10kW+',
      metric: 'Up to 400% More Output',
      desc: 'Replace legacy systems (e.g. 1.5kW to 3kW) with a modern 10kW high-density array in nearly the exact same roof footprint. Generate up to 400% more electricity every day with fresh 25-year manufacturer warranties.',
      bullets: [
        'Old panels safely decommissioned and recycled',
        'Upgraded to cyclone-rated Clenergy anodized racking',
        'Full 25-year manufacturer warranties renewed',
        'Unlocks direct compatibility with Tesla Powerwall 3',
      ],
      ctaText: 'Request Full Re-Power',
      ctaLink: '/get-started/free-assessment',
      primary: false,
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
      // Swiped left -> next slide
      nextSlide();
    } else if (diff < -40) {
      // Swiped right -> prev slide
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const prevSlide = () => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => Math.min(upgradeTypes.length - 1, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-12 border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="amber" className="mb-2.5 sm:mb-3">
              Upgrade Pathways
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 mt-1.5 sm:mt-2 tracking-tight leading-[1.18] sm:leading-[1.15]">
              Three Ways to Modernize Your Existing Solar
            </h2>
            <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              Whether your inverter has failed or your family's power consumption has doubled, we engineer the most cost-effective path forward.
            </p>
          </div>
        </div>

        {/* Mobile View (< lg): Interactive Tab Bar + Swipeable Sliding Carousel */}
        <div className="block lg:hidden pt-6">
          {/* Quick Segmented Option Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl mb-5">
            {upgradeTypes.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`flex-1 py-2 px-2 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${activeSlide === idx
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {idx === 1 && (
                  <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                )}
                <span className="truncate">{item.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Swipeable Carousel Window */}
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
              {upgradeTypes.map((item, idx) => {
                const Icon = item.icon;
                const isRecommended = item.primary;
                return (
                  <div key={idx} className="w-full shrink-0 px-0.5">
                    <div
                      className={`relative bg-slate-50/80 rounded-2xl p-5 xs:p-6 border transition-all flex flex-col justify-between min-h-[460px] ${isRecommended
                          ? 'border-amber-400 bg-amber-50/20 shadow-sm'
                          : 'border-slate-200/90 shadow-2xs'
                        }`}
                    >
                      <div>
                        {/* Top Badge & Icon */}
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isRecommended
                              ? 'bg-amber-500/15 border border-amber-300/80 text-amber-700'
                              : 'bg-white border border-slate-200 text-slate-700 shadow-2xs'
                            }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <Badge variant={item.badgeVariant} size="sm">
                            {item.badge}
                          </Badge>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-xl xs:text-2xl font-serif font-bold text-slate-950 tracking-tight mb-1">
                          {item.title}
                        </h3>
                        <div className="text-xs font-semibold text-amber-700 mb-3">
                          {item.subtitle}
                        </div>

                        {/* Impact Metric Strip */}
                        <div className={`inline-block text-[11px] font-mono font-bold px-2.5 py-1 rounded-md mb-3.5 ${isRecommended
                            ? 'bg-amber-500/15 text-amber-900 border border-amber-500/30'
                            : 'bg-slate-200/70 text-slate-800'
                          }`}>
                          {item.metric}
                        </div>

                        <p className="text-xs xs:text-sm text-slate-600 leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        {/* Bullets */}
                        <div className="space-y-2.5 pt-4 border-t border-slate-200/70">
                          {item.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Button */}
                      <div className="mt-6 pt-4 border-t border-slate-200/70">
                        <Button
                          to={item.ctaLink}
                          variant={item.primary ? 'primary' : 'outline'}
                          size="md"
                          fullWidth
                          icon={<ArrowRight className="w-4 h-4" />}
                          className="font-bold py-3"
                        >
                          {item.ctaText}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Carousel Controls (Dots + Prev/Next Buttons) */}
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex items-center gap-1.5">
              {upgradeTypes.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === dotIdx
                      ? 'w-6 bg-[#2B3CB8]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 mr-1">
                0{activeSlide + 1} / 0{upgradeTypes.length}
              </span>
              <button
                type="button"
                onClick={prevSlide}
                disabled={activeSlide === 0}
                aria-label="Previous upgrade option"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={activeSlide === upgradeTypes.length - 1}
                aria-label="Next upgrade option"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
            ← Swipe to compare all 3 upgrade paths →
          </p>
        </div>

        {/* Desktop View (>= lg): 3 Seamless Columns with Hairline Vertical Dividers */}
        <div className="hidden lg:grid pt-12 lg:grid-cols-3 divide-x divide-slate-200/90 items-stretch">
          {upgradeTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between"
              >
                <div>
                  {/* Top Eyebrow Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={item.badgeVariant} size="sm">
                      {item.badge}
                    </Badge>
                  </div>

                  {/* Title & Sizing */}
                  <h3 className="text-2xl font-serif font-bold text-slate-950 tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 mb-3">
                    {item.subtitle}
                  </div>

                  {/* Impact Metric Strip */}
                  <div className="inline-block text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 mb-4">
                    {item.metric}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Bullets */}
                  <div className="space-y-3 pt-6 border-t border-slate-100">
                    {item.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Button
                    to={item.ctaLink}
                    variant={item.primary ? 'primary' : 'outline'}
                    size="md"
                    fullWidth
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {item.ctaText}
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
