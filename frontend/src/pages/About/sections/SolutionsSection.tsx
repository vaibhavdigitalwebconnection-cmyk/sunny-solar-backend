import React, { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { Shield, Building2, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface SolutionCard {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  bgImage: string;
}

export const SolutionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  // Auto sliding every 4.5 seconds with pause support
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 35) {
      nextSlide();
    } else if (diff < -35) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 4000);
  };

  const cards: SolutionCard[] = [
    {
      icon: <Shield className="stroke-[1.8]" />,
      iconColor: 'text-amber-500',
      title: 'Adani & Polycab Partner',
      description:
        'Authorized partner delivering Tier-1 PV modules and world-class on-grid solar inverters.',
      bgImage: '/images/solutions/adani-polycab.webp',
    },
    {
      icon: <Building2 className="stroke-[1.8]" />,
      iconColor: 'text-sky-600',
      title: '1-Box Solar KIT (1-25 kW)',
      description:
        'Complete turnkey box with all components ready for fast rooftop solar PV installation.',
      bgImage: '/images/solutions/solar-kit.webp',
    },
    {
      icon: <Award className="stroke-[1.8]" />,
      iconColor: 'text-amber-500',
      title: 'Trained In-House Engineers',
      description:
        'Dedicated team of certified engineers supporting solar installers and system integrators.',
      bgImage: '/images/solutions/engineers.webp',
    },
    {
      icon: <TrendingUp className="stroke-[1.8]" />,
      iconColor: 'text-sky-600',
      title: 'DISCOM Net-Metering',
      description:
        'Sanctioned net-metering & generation meters (Secure & L&T DLMS Class 0.5S) with CTs.',
      bgImage: '/images/solutions/net-metering.webp',
    },
  ];

  const renderCard = (card: SolutionCard, isMobile = false) => (
    <div
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group bg-white ${
        isMobile
          ? 'p-3.5 xs:p-4 h-48 xs:h-[270px] justify-start'
          : 'p-7 sm:p-8 h-80 justify-center hover:-translate-y-1.5'
      }`}
    >
      {/* Card Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={card.bgImage}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-black/85" />
      </div>

      {/* Upper Content Layer */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        {/* Icon inside frosted container */}
        <div
          className={`rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
            isMobile ? 'w-10 h-10 xs:w-11 xs:h-11 mb-2.5 text-amber-500' : 'w-16 h-16 mb-6 text-amber-500'
          }`}
        >
          {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, {
            className: isMobile ? 'w-5 h-5 xs:w-5.5 xs:h-5.5 stroke-[1.8]' : 'w-8 h-8 stroke-[1.8]',
          })}
        </div>

        {/* Title */}
        <h3
          className={`font-serif font-bold text-white transition-colors group-hover:text-amber-400 ${
            isMobile
              ? 'text-xs xs:text-sm font-bold mb-1.5 leading-snug line-clamp-2'
              : 'text-lg sm:text-xl mb-3'
          }`}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          className={`text-white/90 leading-relaxed font-medium ${
            isMobile
              ? 'text-[10px] xs:text-[11px] line-clamp-4 leading-relaxed'
              : 'text-xs sm:text-sm'
          }`}
        >
          {card.description}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-14 lg:py-16 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#2B3CB8] animate-pulse" />
            <span>COMPLETE TURNKEY CAPABILITIES</span>
          </div>
        </div>

        {/* Section Heading */}
        <m.h2
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight text-center leading-[1.18] sm:leading-[1.15]"
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          One Stop Solution for All
          <br className="hidden sm:inline" />{' '}
          <span className="text-slate-900">Solar Rooftop </span>
          <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
            Projects
          </span>
        </m.h2>

        {/* Mobile View: Two-Card Grid Sliding Carousel */}
        <div className="block lg:hidden mt-8">
          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Slide 1: 2 Cards (0 & 1) */}
              <div className="w-full shrink-0 grid grid-cols-2 gap-2.5 xs:gap-3 px-0.5">
                {cards.slice(0, 2).map((card, idx) => (
                  <div key={idx}>{renderCard(card, true)}</div>
                ))}
              </div>

              {/* Slide 2: 2 Cards (2 & 3) */}
              <div className="w-full shrink-0 grid grid-cols-2 gap-2.5 xs:gap-3 px-0.5">
                {cards.slice(2, 4).map((card, idx) => (
                  <div key={idx}>{renderCard(card, true)}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Slider Navigation Controls */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous solutions"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-6 bg-[#2B3CB8]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next solutions"
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop View: 4 Cards Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
          {cards.map((card, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              {renderCard(card, false)}
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
