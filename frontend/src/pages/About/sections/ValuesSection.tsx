import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  HardHat,
  Sparkles,
  Sun,
  ArrowRight,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface AccordionItem {
  id: string;
  number: string;
  image: string;
  title: string;
  shortTitle: string;
  category: string;
  specs: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: 'master-electrician',
    number: '01',
    image: '/images/about/gallery/master-electrician-clean.jpg',
    title: 'Licensed Master Electricians On Every Roof',
    shortTitle: 'Master Electricians',
    category: '100% In-House Crew',
    specs: 'QLD Electrical Lic #38192 • Zero Subcontractors',
    description:
      'Every Sunny Solar installation is personally managed on-site by certified Nationwide Master Electricians. We never pawn off our reputation to third-party subbies.',
    icon: ShieldCheck,
  },
  {
    id: 'inverter-mounting',
    number: '02',
    image: '/images/about/gallery/inverter-mounting-clean.jpg',
    title: 'Laser-Leveled Inverter Architecture',
    shortTitle: 'Inverter Mounting',
    category: 'Clean Architecture',
    specs: 'AS/NZS 4777.2 Compliant • Heat-Shield Backing',
    description:
      'Engineered wall installations with non-combustible backing boards, internal UV conduit routing, and vibration dampers to maximize inverter lifespan.',
    icon: Zap,
  },
  {
    id: 'switchboard-wiring',
    number: '03',
    image: '/images/about/gallery/switchboard-wiring-clean.jpg',
    title: 'Switchboard Isolation & Surge Protection',
    shortTitle: 'Switchboard Wiring',
    category: 'Electrical Safety',
    specs: 'AS/NZS 3000 Standard • Sub-10ms Trip RCBOs',
    description:
      'Surgical circuit breaker isolation, busbar balancing, and lightning surge arresters configured to protect sensitive home electronics from voltage spikes.',
    icon: Sparkles,
  },
  {
    id: 'rooftop-drill',
    number: '04',
    image: '/images/about/gallery/rooftop-drill-clean.jpg',
    title: 'Cyclone-Rated Clamping & Torquing',
    shortTitle: 'Cyclone Fastening',
    category: 'Rooftop Engineering',
    specs: 'Wind Region C Certified • Calibrated Torque Guns',
    description:
      'Clenergy anodised aluminium rail brackets fastened with calibrated torque guns to prevent tile micro-fractures, roof leaks, and hurricane-force uplift.',
    icon: HardHat,
  },
  {
    id: 'carrying-panel',
    number: '05',
    image: '/images/about/gallery/carrying-panel-clean.jpg',
    title: 'Zero Micro-Cracking Handling Protocol',
    shortTitle: 'Zero Micro-Cracks',
    category: 'Care & Integrity',
    specs: 'Tethered Hoisting • Edge-Fall Protection',
    description:
      'Rigorous panel transport guidelines ensure high-efficiency silicon solar cells stay completely free of invisible micro-cracks during lifting and placement.',
    icon: CheckCircle2,
  },
];

export const ValuesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-hover / auto-play cycling through cards on mobile every 4s
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ACCORDION_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, lightboxIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + ACCORDION_ITEMS.length) % ACCORDION_ITEMS.length
        );
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % ACCORDION_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const handlePrevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + ACCORDION_ITEMS.length) % ACCORDION_ITEMS.length);
  }, []);

  const handleNextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % ACCORDION_ITEMS.length);
  }, []);

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
    if (diff > 40) {
      handleNextCard();
    } else if (diff < -40) {
      handlePrevCard();
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 xs:py-14 sm:py-20 lg:py-20 relative overflow-hidden"
    >
      {/* Top subtle divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with top-tier copy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 xs:mb-10 sm:mb-14">
          <motion.div
            className="max-w-5xl mx-auto text-center flex flex-col items-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 shadow-2xs mb-3.5 sm:mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Installation Standards</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.2] sm:leading-[1.12]">
              Craftsmanship We Put Our Name On —{' '}
              <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Zero Subcontractors.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* EXPANDING ACCORDION (Desktop & Tablet: md+)                  */}
        {/* ============================================================ */}
        <div className="hidden md:flex h-130 lg:h-140 gap-3 lg:gap-4 w-full  ">
          {ACCORDION_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-lg overflow-hidden cursor-pointer border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive
                  ? 'flex-5 shadow-2xl border-amber-400/80 ring-2 ring-amber-400/20'
                  : 'flex-1 hover:flex-[1.2] shadow-md border-slate-200/90 bg-slate-900 opacity-95 hover:opacity-100'
                  }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${isActive ? 'scale-105' : 'scale-100 grayscale-25'
                    }`}
                />

                {/* Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${isActive
                    ? 'bg-linear-to-t from-slate-950/95 via-slate-950/40 to-slate-950/15'
                    : 'bg-slate-950/70 hover:bg-slate-950/50'
                    }`}
                />

                {/* ACTIVE CARD EXPANDED CONTENT */}
                <div
                  className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ${isActive
                    ? 'opacity-100 pointer-events-auto delay-100'
                    : 'opacity-0 pointer-events-none'
                    }`}
                >
                  {/* Top Bar inside Active Card */}


                  {/* Bottom Text inside Active Card */}
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 mb-2.5 font-semibold bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.specs}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-slate-200 leading-relaxed max-w-xl font-normal">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center gap-4 pt-4 border-t border-white/15">
                      <span className="text-xs font-mono text-white/50 font-bold uppercase tracking-widest">
                        Standard {item.number} of 0{ACCORDION_ITEMS.length}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      <span className="text-xs text-amber-300 font-semibold">
                        Master Electrician Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* INACTIVE CARD COMPRESSED CONTENT (Vertical Spine) */}
                <div
                  className={`absolute inset-0 p-4 flex flex-col justify-between items-center transition-all duration-300 ${!isActive
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                >
                  {/* Top number */}
                  <span className="text-xs font-mono font-bold text-amber-400/90 pt-1">
                    {item.number}
                  </span>

                  {/* Vertical Rotated Title */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <span
                      className="text-sm font-bold text-white tracking-wider uppercase whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {item.shortTitle}
                    </span>
                  </div>

                  {/* Bottom Icon */}
                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white pb-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* MOBILE SHOWCASE & AUTO-HOVER (< md)                          */}
        {/* ============================================================ */}
        <div className="flex md:hidden flex-col gap-3.5">


          {/* Active Standard Card with Auto-Hover & Swipe (Fixed Height) */}
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-950 text-white flex flex-col h-112.5 xs:h-[470px] sm:h-122.5"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Image Container with Ambient Gradient (Fixed Height) */}
            <div className="relative h-48 xs:h-52 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={ACCORDION_ITEMS[activeIndex].id}
                  src={ACCORDION_ITEMS[activeIndex].image}
                  alt={ACCORDION_ITEMS[activeIndex].title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-black/25 pointer-events-none" />

              {/* Top badges inside image */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {React.createElement(ACCORDION_ITEMS[activeIndex].icon, { className: 'w-3.5 h-3.5' })}
                  <span>{ACCORDION_ITEMS[activeIndex].category}</span>
                </div>
              </div>

              {/* Auto-Hover Progress Bar */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 overflow-hidden">
                <motion.div
                  key={`${activeIndex}-${isPaused ? 'paused' : 'running'}`}
                  className="h-full bg-amber-400"
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '100%' : '100%' }}
                  transition={{ duration: isPaused ? 0 : 4, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Content Details (Flex-1 with Fixed Internal Distribution) */}
            <div className="p-4 xs:p-5 flex-1 flex flex-col justify-between bg-slate-950 min-h-0">
              <div className="flex-1 flex flex-col justify-start min-h-0">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400 mb-2 font-semibold bg-white/5 px-2.5 py-0.5 rounded-full border border-amber-400/25 max-w-full w-fit shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{ACCORDION_ITEMS[activeIndex].specs}</span>
                </div>

                <h3 className="text-base xs:text-lg font-serif font-bold text-white leading-snug line-clamp-2 min-h-10 xs:min-h-[2.75rem] flex items-center shrink-0">
                  {ACCORDION_ITEMS[activeIndex].title}
                </h3>

                <p className="mt-1.5 text-xs xs:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3">
                  {ACCORDION_ITEMS[activeIndex].description}
                </p>
              </div>

              {/* Navigation Footer with Arrows & Counter (Pinned at Bottom) */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/50 font-bold uppercase tracking-wider">
                    {ACCORDION_ITEMS[activeIndex].number} / 0{ACCORDION_ITEMS.length}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-amber-400" />
                  <span className="text-[11px] text-amber-300 font-semibold">
                    Verified
                  </span>
                </div>

                {/* Prev / Next Chevrons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    aria-label="Previous standard"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextCard}
                    aria-label="Next standard"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Indicator Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {ACCORDION_ITEMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === idx
                  ? 'w-6 bg-amber-500'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
              />
            ))}
          </div>
        </div>


      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && ACCORDION_ITEMS[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-950/92 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Close Button & Counter */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-semibold">
                {lightboxIndex + 1} / {ACCORDION_ITEMS.length}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(null);
                }}
                className="pointer-events-auto p-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-colors duration-200 cursor-pointer shadow-lg"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prev Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === null ? 0 : (prev - 1 + ACCORDION_ITEMS.length) % ACCORDION_ITEMS.length
                );
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === null ? 0 : (prev + 1) % ACCORDION_ITEMS.length
                );
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Inner Container */}
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden max-h-[70vh] shadow-2xl border border-white/15 bg-slate-900">
                <img
                  key={ACCORDION_ITEMS[lightboxIndex].id}
                  src={ACCORDION_ITEMS[lightboxIndex].image}
                  alt={ACCORDION_ITEMS[lightboxIndex].title}
                  className="max-h-[68vh] w-auto object-contain rounded-2xl"
                />
              </div>

              {/* Caption & Specs Underlay */}
              <div className="mt-4 max-w-2xl w-full text-center px-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 mb-2 shadow-sm">
                  {ACCORDION_ITEMS[lightboxIndex].category}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {ACCORDION_ITEMS[lightboxIndex].title}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {ACCORDION_ITEMS[lightboxIndex].description}
                </p>

                <div className="mt-2 text-xs font-mono text-amber-400 font-semibold">
                  {ACCORDION_ITEMS[lightboxIndex].specs}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ValuesSection;
