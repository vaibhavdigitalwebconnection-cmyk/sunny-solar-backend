import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import {
  ArrowRight,
  Phone,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  system: string;
  tag: string;
  text: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'sarah-david',
    name: 'Sarah & David M.',
    location: 'Burleigh Heads, QLD',
    system: '10.5kW Solar + Tesla Powerwall 2',
    tag: '85% Power Bill Drop',
    text: "Trent and his team were incredible — no pressure, honest advice, and a flawless installation. Our quarterly electricity bill went from over $1,200 down to under $180.",
    rating: 5,
    date: 'Verified Homeowner',
  },
  {
    id: 'mark-t',
    name: 'Mark T.',
    location: 'Robina, QLD',
    system: '6.6kW Jinko N-Type + SolaX Hybrid',
    tag: 'In-House Electricians',
    text: "After getting burned by a cheap solar company that went bust, Sunny Solar restored my faith. 100% in-house tradesmen, no pushy sales reps, and they answer the phone every time.",
    rating: 5,
    date: 'Verified Homeowner',
  },
  {
    id: 'lisa-greg',
    name: 'Lisa & Greg K.',
    location: 'Mudgeeraba, QLD',
    system: '13.2kW Commercial-Grade Array',
    tag: 'Above Engineering Forecast',
    text: "Seamless from consultation through to energisation. Trent personally oversaw the design, and our daily kilowatt-hour yields are consistently beating the initial engineering forecast.",
    rating: 5,
    date: 'Verified Homeowner',
  },
  {
    id: 'cameron-p',
    name: 'Cameron P.',
    location: 'Helensvale, QLD',
    system: '8.8kW Solar + Blackout Backup',
    tag: 'Sub-10ms Emergency Power',
    text: "During the recent summer storms, our whole street was blacked out for nearly 14 hours. Our Sunny Solar system kicked in instantly — fridge, aircon, and lights stayed on without a glitch.",
    rating: 5,
    date: 'Verified Homeowner',
  },
  {
    id: 'elena-marcus',
    name: 'Elena & Marcus R.',
    location: 'Currumbin Waters, QLD',
    system: '7.7kW Solar System',
    tag: 'Immaculate Roof Care',
    text: "Neatest trade workmanship I have ever seen. Conduit was hidden completely within wall cavities, zero broken tiles, and the site was left cleaner than when they arrived.",
    rating: 5,
    date: 'Verified Homeowner',
  },
  {
    id: 'andrew-w',
    name: 'Andrew W.',
    location: 'Pacific Pines, QLD',
    system: '9.9kW System + Smart Energy Meter',
    tag: 'Honest Gold Coast Local',
    text: "So refreshing to deal with real Master Electricians who actually know the AS/NZS wiring rules instead of commission-hungry salesmen. Best investment we made in our home.",
    rating: 5,
    date: 'Verified Homeowner',
  },
];

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Keep currentIndex in bounds when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Autoplay slider: advances by 1 review every 5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section ref={sectionRef} className="bg-white relative overflow-hidden">
      {/* Top subtle divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      {/* Testimonials Slider Section */}
      <div className="py-12 xs:py-14 sm:py-8 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row with Title, Badge, and Navigation Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 shadow-2xs mb-3 sm:mb-4 w-fit">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Verified Customer Reviews</span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.12]">
                Real Words From{' '}
                <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Real Families.
                </span>
              </h2>
            </motion.div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 shrink-0">
              <span className="text-xs font-mono font-semibold text-slate-400 tracking-wider">
                {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 xs:w-11 xs:h-11 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 xs:w-11 xs:h-11 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-xs transition-all duration-200 cursor-pointer active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Testimonial Cards Carousel Viewport */}
          <div
            className="overflow-hidden -mx-2 xs:-mx-3 py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {testimonials.map((t, idx) => {
                const isFirstVisible = idx === currentIndex;

                return (
                  <div
                    key={t.id}
                    className="shrink-0 px-2 xs:px-3 w-full md:w-1/2 lg:w-1/3  "
                  >
                    <div
                      className={`group relative rounded-xl sm:rounded-2xl p-4.5 xs:p-6 sm:p-7 bg-white border transition-all duration-500 flex flex-col justify-between h-full ${isFirstVisible
                          ? 'border-amber-300/90 shadow-md sm:shadow-xl shadow-amber-400/30 ring-1 ring-amber-300/40'
                          : 'border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
                        }`}
                    >
                      {/* Card Top Row: Rating & Highlight Tag */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: t.rating }, (_, i) => (
                              <Star
                                key={i}
                                className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>

                          <span className="inline-flex items-center px-2.5 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/70">
                            {t.tag}
                          </span>
                        </div>

                        {/* Quote icon */}
                        <Quote className="w-6 h-6 xs:w-7 xs:h-7 text-amber-400/25 mb-2" />

                        {/* Review Body */}
                        <p className="text-xs xs:text-sm sm:text-[15px] text-slate-700 leading-relaxed font-normal mb-5 min-h-[4rem] xs:min-h-[4.5rem]">
                          "{t.text}"
                        </p>
                      </div>

                      {/* Card Bottom Area: System Installed + Reviewer Profile */}
                      <div className="pt-4 border-t border-slate-100">
                        {/* System Specs Pill */}
                        <div className="inline-flex items-center gap-1.5 text-[10px] xs:text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg mb-3.5 border border-slate-200/60 max-w-full">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{t.system}</span>
                        </div>

                        {/* Author Profile */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs xs:text-sm shadow-xs shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs xs:text-sm font-bold text-slate-900 truncate">
                              {t.name}
                            </p>
                            <p className="text-[11px] xs:text-xs text-slate-500 flex items-center gap-1 truncate">
                              <CheckCircle2 className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-emerald-600 shrink-0" />
                              <span>{t.location}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pagination Dots Strip */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === dotIdx
                    ? 'w-6 sm:w-8 bg-amber-500'
                    : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-bleed CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about/happy-family-solar.webp"
            alt="Happy family with solar-powered home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 py-12 xs:py-16 sm:py-20 lg:py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              {/* Eyebrow badge on CTA banner */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xs mb-3.5 sm:mb-5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Queensland's Trusted Solar Installers</span>
              </div>

              <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.2] sm:leading-tight">
                Ready to Power Your Home{' '}
                <br className="hidden xs:inline" />
                <span className="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  the Right Way?
                </span>
              </h3>

              <p className="mt-3.5 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-100 leading-relaxed max-w-2xl mx-auto font-normal">
                Book your free, no-obligation design consultation. We'll assess your home, calculate real savings, and design a system that actually delivers.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl mx-auto w-full">
                <Button
                  to="/get-started/free-assessment"
                  variant="primary"
                  size="lg"
                  className="w-full text-center"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Book Free Consultation
                </Button>
                <Button
                  href="tel:1300030479"
                  variant="outline"
                  size="lg"
                  icon={<Phone className="w-4 h-4" />}
                  iconPosition="left"
                  className="w-full text-center border-white/30 text-white hover:border-amber-400 hover:text-amber-400"
                >
                  Call 1300 030 479
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 text-xs text-white/85">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Zero-Deposit Financing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Master Electrician Crew</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>No Sales Commission</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
