import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Flame,
  TrendingDown,
  SunDim,
  CloudRain,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export interface WarningSign {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badge: string;
  badgeColor: string;
  title: string;
  symptom: string;
  remedy: string;
  linkTo: string;
  linkText: string;
}

export const ExistingSolarWarningSignsSection: React.FC = () => {
  const warnings: WarningSign[] = [
    {
      icon: AlertTriangle,
      iconColor: 'text-[#2B3CB8] bg-[#2B3CB8]/10',
      badge: 'Unnoticed Loss',
      badgeColor: 'bg-[#F5F7FD] text-[#2B3CB8] border-[#D1DCF8]',
      title: 'Silent Inverter Trips & Fault Codes',
      symptom:
        'The inverter shows an intermittent red error LED, ground fault error, or shuts down during hot midday hours without alerting you.',
      remedy: 'Full DC string voltage testing, error log extraction, and capacitor diagnostics by a Master Electrician.',
      linkTo: '/existing-solar/health-check',
      linkText: 'Book Inverter Diagnostics',
    },
    {
      icon: Flame,
      iconColor: 'text-[#1D2984] bg-[#2B3CB8]/10',
      badge: 'Critical Fire Hazard',
      badgeColor: 'bg-[#F5F7FD] text-[#1D2984] border-[#D1DCF8]',
      title: 'Degraded or Recalled DC Isolators',
      symptom:
        'Queensland summer UV cracks switch housings, causing water ingress, internal arcing, and severe switchboard fire hazards.',
      remedy: 'Immediate replacement with certified weatherproof IP66 rotary isolators compliant with AS/NZS 5033.',
      linkTo: '/existing-solar/health-check',
      linkText: 'Inspect DC Isolators',
    },
    {
      icon: TrendingDown,
      iconColor: 'text-[#2B3CB8] bg-[#2B3CB8]/10',
      badge: 'Financial Drain',
      badgeColor: 'bg-[#F5F7FD] text-[#2B3CB8] border-[#D1DCF8]',
      title: 'The 5¢ Feed-In Tariff Cliff',
      symptom:
        'Legacy high feed-in tariffs have expired. You export surplus solar for just 3¢–5¢ while purchasing peak evening power at 45¢/kWh.',
      remedy: 'Retrofit an AC-coupled battery (Tesla Powerwall 3 or Sungrow) to store daytime solar for night use.',
      linkTo: '/existing-solar/add-battery',
      linkText: 'Explore Battery Retrofits',
    },
    {
      icon: SunDim,
      iconColor: 'text-[#1D2984] bg-[#2B3CB8]/10',
      badge: 'Generation Loss',
      badgeColor: 'bg-[#F5F7FD] text-[#1D2984] border-[#D1DCF8]',
      title: 'Micro-Cracks & Diode Hotspots',
      symptom:
        'Subtle snail trails, yellowing backsheets, and cracked silicon wafers can cut total panel output by 25% to 40%.',
      remedy: 'High-resolution infrared thermal imaging to identify dead cells and claim manufacturer warranty replacements.',
      linkTo: '/existing-solar/upgrade',
      linkText: 'Panel Upgrade Options',
    },
    {
      icon: CloudRain,
      iconColor: 'text-[#2B3CB8] bg-[#2B3CB8]/10',
      badge: 'Moisture Leakage',
      badgeColor: 'bg-[#F5F7FD] text-[#2B3CB8] border-[#D1DCF8]',
      title: 'Safety Trips During Storms & Rain',
      symptom:
        'Your main switchboard or solar safety switch trips whenever it rains or morning humidity rises above 85%.',
      remedy: 'Megger high-voltage insulation resistance testing to locate cracked conduit glands or degraded cables.',
      linkTo: '/existing-solar/health-check',
      linkText: 'Book Insulation Test',
    },
  ];

  const totalCards = warnings.length + 1; // 5 warning signs + 1 booking card
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
    setActiveSlide((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
  }, [totalCards]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  }, [totalCards]);

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#2B3CB8]/10 px-3 py-1 rounded-full inline-block mb-2 sm:mb-3">
          Diagnostics & Hazard Prevention
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          5 Signs Your Existing Solar Needs Attention
        </h2>
        <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed px-1 sm:px-0">
          Over 38% of rooftop systems older than 4 years suffer from silent electrical degradation. If you notice any of these symptoms, early inspection prevents costly damage.
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
            {/* 1-5: Warning Sign Slides */}
            {warnings.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="w-full shrink-0 px-0.5 flex flex-col">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full min-h-87.5">
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-slate-950 mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {item.symptom}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-xs flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-bold text-slate-900 block mb-0.5">Electrician Remedy:</span>
                        <span className="text-slate-600 leading-snug">{item.remedy}</span>
                      </div>
                      <Link
                        to={item.linkTo}
                        className="inline-flex items-center gap-1 font-bold text-[#2B3CB8] hover:text-[#1D2984] hover:underline transition-colors text-xs pt-1 group/wlink min-h-9"
                      >
                        <span>{item.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/wlink:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 6: Direct Health Check Booking Card Slide */}
            <div className="w-full shrink-0 px-0.5 flex flex-col">
              <div className="bg-linear-to-br from-[#0C123E] via-[#070A24] to-[#0C123E] text-white rounded-2xl p-5 border border-[#151E64] shadow-md flex flex-col justify-between h-full min-h-87.5">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D1DCF8] uppercase tracking-wider block mb-2">
                    Comprehensive Audit
                  </span>
                  <h3 className="text-xl font-bold font-serif mb-2 leading-snug">
                    Suspect Your Solar Isn't Performing?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Our CEC Master Electricians conduct infrared thermal scans, string voltage audits, and isolator safety checks across Brisbane and Gold Coast.
                  </p>
                  <div className="text-2xl font-bold font-mono text-[#D1DCF8] mb-1">
                    $189 Fixed Price
                  </div>
                  <span className="text-[11px] text-slate-400 block mb-4">
                    Includes full written compliance certificate & report
                  </span>
                </div>

                <Button
                  to="/existing-solar/health-check"
                  variant="primary"
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book 24-Point Health Check
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slider Controls (Dots + Counter + Prev/Next Buttons) */}
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCards }).map((_, dotIdx) => (
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
              {activeSlide + 1} / {totalCards}
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

      {/* Desktop Warning Signs Cards Grid (>= md: 3-column / 2-column grid) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warnings.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#2B3CB8]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-slate-950 mb-2 group-hover:text-[#2B3CB8] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.symptom}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs flex flex-col justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Electrician Remedy:</span>
                  <span className="text-slate-600 leading-snug">{item.remedy}</span>
                </div>
                <Link
                  to={item.linkTo}
                  className="inline-flex items-center gap-1 font-bold text-[#2B3CB8] hover:text-[#1D2984] hover:underline transition-colors text-xs pt-1 group/wlink"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3 h-3 group-hover/wlink:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}

        {/* 6th Card: Direct Health Check Booking Card */}
        <div className="bg-linear-to-br from-[#0C123E] via-[#070A24] to-[#0C123E] text-white rounded-2xl p-6 border border-[#151E64] shadow-md flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-[#D1DCF8] uppercase tracking-wider block mb-2">
              Comprehensive Audit
            </span>
            <h3 className="text-xl font-bold font-serif mb-2">
              Suspect Your Solar Isn't Performing?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Our CEC Master Electricians conduct infrared thermal scans, string voltage audits, and isolator safety checks across Brisbane and Gold Coast.
            </p>
            <div className="text-2xl font-bold font-mono text-[#D1DCF8] mb-1">
              $189 Fixed Price
            </div>
            <span className="text-[11px] text-slate-400 block mb-4">
              Includes full written compliance certificate & report
            </span>
          </div>

          <Button
            to="/existing-solar/health-check"
            variant="primary"
            size="sm"
            fullWidth
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Book 24-Point Health Check
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExistingSolarWarningSignsSection;
