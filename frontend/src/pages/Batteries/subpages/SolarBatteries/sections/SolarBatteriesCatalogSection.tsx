import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../../../components/ui/Button';

export interface BatteryItem {
  id: string;
  name: string;
  shortTitle: string;
  brand: string;
  badge: string;
  capacity: string;
  output: string;
  warranty: string;
  featured?: boolean;
  bullets: string[];
}

export const SolarBatteriesCatalogSection: React.FC = () => {
  const batteries: BatteryItem[] = [
    {
      id: 'tesla-pw3',
      name: 'Tesla Powerwall 3',
      shortTitle: 'Tesla PW3',
      brand: 'Tesla',
      badge: 'Most Popular',
      capacity: '13.5 kWh',
      output: '11.5 kW Backup',
      warranty: '10 Yrs Unlimited',
      featured: true,
      bullets: [
        'Built-in 11.5kW solar inverter (6 MPPT)',
        'Starts heavy 15kW+ central ducted A/C',
        'Sub-100ms automatic blackout transfer',
        'Automated BOM severe storm pre-charge',
      ],
    },
    {
      id: 'sungrow-sbr',
      name: 'Sungrow SBR Modular',
      shortTitle: 'Sungrow SBR',
      brand: 'Sungrow',
      badge: 'Best Value Modular',
      capacity: '9.6 – 25.6 kWh',
      output: '6.0 – 10.0 kW',
      warranty: '10 Yrs / 6k Cycles',
      bullets: [
        'Stackable 3.2kWh blocks (expand anytime)',
        'Fast sub-20ms emergency switchover',
        'Cobalt-free LiFePO4 safe chemistry',
        'Pairs with 1-phase and 3-phase hybrids',
      ],
    },
    {
      id: 'enphase-5p',
      name: 'Enphase IQ 5P',
      shortTitle: 'Enphase 5P',
      brand: 'Enphase',
      badge: '15-Year Warranty',
      capacity: '5.0 – 20.0 kWh',
      output: '3.84 – 7.68 kW',
      warranty: '15 Yrs Standard',
      bullets: [
        '6 embedded microinverters per unit',
        'Safe 240V low-voltage AC wall wiring',
        'Double peak surge for compressor starts',
        'Industry-longest 15-year warranty',
      ],
    },
    {
      id: 'alpha-g3',
      name: 'AlphaESS SMILE-G3',
      shortTitle: 'AlphaESS',
      brand: 'AlphaESS',
      badge: 'All-in-One Tower',
      capacity: '10.1 – 20.2 kWh',
      output: '5.0 – 10.0 kW',
      warranty: '10 Yrs / 6k Cycles',
      bullets: [
        'Integrated hybrid inverter & storage column',
        '1C continuous fast solar charging rate',
        'Sub-10ms UPS cutover for home electronics',
        'Outdoor IP65 powder-coated enclosure',
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
    }, 5000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % batteries.length);
  }, [batteries.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? batteries.length - 1 : prev - 1));
  }, [batteries.length]);

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
      // Swiped left -> next
      nextSlide();
    } else if (diff < -40) {
      // Swiped right -> prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-6 sm:py-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
        <h2 className="text-2xl xs:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-snug">
          Compare Top Battery Systems
        </h2>
        <p className="mt-2 text-xs xs:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Tier-1 SAA-accredited lithium storage backed by direct Australian warranties.
        </p>
      </div>

      {/* Mobile Sliding Carousel (< md: Cards Slide One-by-One with Autoplay & Swipe) */}
      <div className="block md:hidden mb-8">
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
            {batteries.map((item) => (
              <div
                key={item.id}
                className="w-full shrink-0 px-0.5 flex flex-col"
              >
                <div
                  className={`rounded-2xl p-5 xs:p-6 flex flex-col justify-between h-full bg-white transition-all duration-200 ${item.featured
                      ? 'border-2 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'border border-slate-200/90 shadow-2xs'
                    }`}
                >
                  <div>
                    {item.featured && (
                      <div className="flex justify-center mb-3">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {/* Brand & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {item.brand}
                      </span>
                      {!item.featured && (
                        <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif font-bold text-slate-950 tracking-tight mb-3">
                      {item.name}
                    </h3>

                    {/* Key Specs Pill */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-4 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Capacity</span>
                        <span className="font-mono font-bold text-slate-950">{item.capacity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Backup</span>
                        <span className="font-mono font-bold text-emerald-700">{item.output}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Warranty</span>
                        <span className="font-semibold text-slate-700">{item.warranty}</span>
                      </div>
                    </div>

                    {/* Concise Highlights */}
                    <div className="space-y-2.5 mb-6">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-snug">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <Button
                      to="/get-started/free-assessment"
                      variant={item.featured ? 'accent-green' : 'outline'}
                      size="md"
                      fullWidth
                      icon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold py-3"
                    >
                      Get {item.brand} Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls (Dots + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {batteries.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToSlide(dotIdx)}
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
              0{activeSlide + 1} / 0{batteries.length}
            </span>
            <button
              type="button"
              onClick={() => {
                prevSlide();
                pauseTemporarily();
              }}
              aria-label="Previous battery"
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
              aria-label="Next battery"
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
          <span>Battery {activeSlide + 1} of {batteries.length} →</span>
        </div>
      </div>

      {/* Desktop & Tablet Grid (>= md): 4-Column Card Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {batteries.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-200 relative ${item.featured
                ? 'bg-white border-2 border-emerald-500 shadow-lg shadow-emerald-500/10'
                : 'bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md'
              }`}
          >
            {item.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {item.badge}
                </span>
              </div>
            )}

            <div>
              {/* Brand & Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {item.brand}
                </span>
                {!item.featured && (
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-serif font-bold text-slate-950 tracking-tight mb-4">
                {item.name}
              </h3>

              {/* Key Specs Pill */}
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mb-4 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Capacity</span>
                  <span className="font-mono font-bold text-slate-950">{item.capacity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Backup</span>
                  <span className="font-mono font-bold text-emerald-700">{item.output}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Warranty</span>
                  <span className="font-semibold text-slate-700">{item.warranty}</span>
                </div>
              </div>

              {/* Concise Highlights */}
              <div className="space-y-2 mb-6">
                {item.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="leading-snug">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3 border-t border-slate-100">
              <Button
                to="/get-started/free-assessment"
                variant={item.featured ? 'accent-green' : 'outline'}
                size="sm"
                fullWidth
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Get {item.brand} Quote
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sizing Advisory Prompt */}
      <div className="mt-8 text-center px-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          Need help sizing?{' '}
          <Link to="/calculators/battery-size" className="text-emerald-700 font-semibold hover:underline">
            Use our Free Battery Sizing Calculator
          </Link>{' '}
          or send a photo of your meter box for a 24-hour assessment.
        </p>
      </div>
    </section>
  );
};

export default SolarBatteriesCatalogSection;
