import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ShieldCheck, Moon, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../../../../../components/ui/Badge';

export const SolarBatteriesRetrofitGuideSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const useCases = [
    {
      id: 'evening-savings',
      title: 'Store Daytime Solar for Evening Peak Rates',
      badge: 'Peak Tariff Elimination',
      badgeVariant: 'amber' as const,
      image: '/images/solutions/battery-hero.webp',
      alt: 'Tesla Powerwall home battery installed on garage wall',
      desc: 'Rooftop panels produce surplus electricity during midday when feed-in tariffs pay only 3¢–5¢. Your battery stores this clean power so you can run air-con, cooking, and lighting for free after the sun sets.',
      metric: 'Save Up to 88% on Evening Grid Bills',
      icon: Moon,
    },
    {
      id: 'blackout-backup',
      title: 'Instant Backup When Nationwide Storms Hit',
      badge: 'Sub-100ms Blackout Defense',
      badgeVariant: 'emerald' as const,
      image: '/images/solutions/battery-storm.webp',
      alt: 'Home brightly illuminated with battery backup during storm blackout',
      desc: 'When summer storms knock down transmission lines, your battery isolates your home from the grid in under 100ms. Lights stay on, refrigerators stay cold, and Wi-Fi remains connected without rebooting.',
      metric: 'Seamless Sub-100ms Outage Switchover',
      icon: ShieldCheck,
    },
    {
      id: 'high-power-loads',
      title: 'Power Heavy Ducted Air-Con & EV Charging',
      badge: 'High-Surge Autonomy',
      badgeVariant: 'navy' as const,
      image: '/images/solutions/battery-bundle.webp',
      alt: 'Integrated home solar and battery storage installation',
      desc: 'With massive motor-start surge capacities (up to 18.5kW), modern home batteries effortlessly start whole-home ducted air conditioners and charge electric vehicles directly from stored sunshine.',
      metric: 'Up to 18.5kW Motor-Start Surge Power',
      icon: Zap,
    },
  ];

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % useCases.length);
  }, [useCases.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? useCases.length - 1 : prev - 1));
  }, [useCases.length]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    pauseTemporarily();
  };

  // Auto-slide every 4.5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
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
    <div className="pt-8 border-t border-slate-200/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-2.5">
          Real-World Storage Applications
        </span>
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-snug">
          How You Use Your Solar Battery
        </h2>
        <p className="mt-2 text-xs xs:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          From eliminating 45¢ evening electricity rates to keeping your home running during severe Nationwide storm blackouts, here is how home batteries work for you every day.
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
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="w-full shrink-0 px-0.5 flex flex-col"
                >
                  <div className="rounded-2xl p-4.5 xs:p-5 flex flex-col justify-between h-full bg-white border border-slate-200/90 shadow-2xs">
                    <div>
                      {/* Visual Battery Photo Container */}
                      <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-950 shadow-xs mb-3.5">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                        {/* Top Floating Badge */}
                        <div className="absolute top-2.5 left-2.5">
                          <Badge variant={item.badgeVariant} size="sm">
                            {item.badge}
                          </Badge>
                        </div>

                        {/* Bottom Metric Pill inside Image */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{item.metric}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg xs:text-xl font-serif font-bold text-slate-950 tracking-tight mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Subtle Indicator */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                      <span>Certified Master Electrician Install</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
            {useCases.map((_, dotIdx) => (
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
              0{activeSlide + 1} / 0{useCases.length}
            </span>
            <button
              type="button"
              onClick={() => {
                prevSlide();
                pauseTemporarily();
              }}
              aria-label="Previous application"
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
              aria-label="Next application"
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
          <span>Application {activeSlide + 1} of {useCases.length} →</span>
        </div>
      </div>

      {/* Desktop & Tablet Grid (>= md): 3 Visual Use-Case Cards */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
        {useCases.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between group"
            >
              <div>
                {/* Visual Battery Photo Container */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-950 shadow-sm mb-4">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant={item.badgeVariant} size="sm">
                      {item.badge}
                    </Badge>
                  </div>

                  {/* Bottom Metric Pill inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{item.metric}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-950 tracking-tight mb-2 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>Certified Master Electrician Install</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SolarBatteriesRetrofitGuideSection;
